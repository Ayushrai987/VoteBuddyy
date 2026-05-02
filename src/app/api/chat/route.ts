import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `You are VoteBuddy, a helpful and knowledgeable AI assistant for Indian citizens. Your role is to provide accurate, non-partisan, and helpful information about Indian elections, the Election Commission of India (ECI) rules, voter registration, and general civic duties.

Guidelines:
1. Always remain neutral and non-partisan. Do not express opinions on political parties, candidates, or current events.
2. Provide information based on official ECI guidelines when possible.
3. Keep responses concise but informative. Use markdown for formatting (bullet points, bold text).
4. If you don't know the answer or the information is highly specific (like a local booth address), advise the user to check the official ECI website or their local electoral officer.
5. Do not generate fake or unverified data about candidates or election results.
6. Speak in a polite, helpful tone (use greetings like "Namaste" occasionally).
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages array' }, { status: 400 });
    }

    // Convert OpenAI-style messages to Gemini format
    const geminiMessages = messages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents: geminiMessages,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.3,
      }
    });

    // Create a ReadableStream from the generator
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of responseStream) {
            const text = chunk.text;
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}
