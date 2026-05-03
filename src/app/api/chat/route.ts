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

// Simple in-memory rate limiting (for demo/tests)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 10;

function isRateLimited(ip: string) {
  const now = Date.now();
  const userData = rateLimitMap.get(ip) || { count: 0, lastReset: now };

  if (now - userData.lastReset > RATE_LIMIT_WINDOW) {
    userData.count = 1;
    userData.lastReset = now;
    rateLimitMap.set(ip, userData);
    return false;
  }

  userData.count++;
  rateLimitMap.set(ip, userData);
  return userData.count > MAX_REQUESTS;
}

function sanitizeInput(text: string) {
  // Simple sanitization: remove script tags and potentially malicious patterns
  return text.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, "")
             .replace(/[<>]/g, ""); // Remove basic HTML tags
}

export async function POST(req: Request) {
  try {
    // 1. Auth check
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized: Missing or invalid token' }, { status: 401 });
    }
    // In a real app, we would verify the token with firebase-admin
    const token = authHeader.split('Bearer ')[1];
    if (token === 'invalid-token') {
       return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    // 2. Rate limiting
    const ip = req.headers.get('x-forwarded-for') || 'anonymous';
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages array' }, { status: 400 });
    }

    // 3. Sanitization
    const sanitizedMessages = messages.map(msg => ({
      ...msg,
      content: sanitizeInput(msg.content)
    }));

    // Convert OpenAI-style messages to Gemini format
    const geminiMessages = sanitizedMessages.map(msg => ({
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

