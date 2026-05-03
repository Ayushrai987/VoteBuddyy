'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { useLanguage } from '@/components/providers/LanguageProvider';
import Markdown from 'markdown-to-jsx';
import { Send, Bot, User, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { ChatMessage } from '@/types';

const INITIAL_MESSAGE_EN: ChatMessage = {
  id: 'init',
  role: 'assistant',
  content: 'Namaste! I am VoteBuddy, your AI Election Assistant. How can I help you today? You can ask me about:\n\n*   Your polling booth location\n*   Voter registration process\n*   Election dates for your state\n*   ECI guidelines and rules\n*   Candidate information',
  timestamp: Date.now()
};

const INITIAL_MESSAGE_HI: ChatMessage = {
  id: 'init-hi',
  role: 'assistant',
  content: 'नमस्ते! मैं वोटबडी हूं, आपका एआई चुनाव सहायक। मैं आज आपकी क्या मदद कर सकता हूं? आप मुझसे इनके बारे में पूछ सकते हैं:\n\n*   आपका मतदान केंद्र (बूथ)\n*   मतदाता पंजीकरण प्रक्रिया\n*   आपके राज्य के लिए चुनाव की तारीखें\n*   ईसीआई के दिशा-निर्देश और नियम\n*   उम्मीदवार की जानकारी',
  timestamp: Date.now()
};

const SUGGESTED_QUESTIONS_EN = [
  "How do I register to vote?",
  "When are the elections in Uttar Pradesh?",
  "What is the Model Code of Conduct?",
  "How do I find my polling booth?",
];

const SUGGESTED_QUESTIONS_HI = [
  "मैं वोट देने के लिए पंजीकरण कैसे करूं?",
  "उत्तर प्रदेश में चुनाव कब हैं?",
  "आदर्श आचार संहिता क्या है?",
  "मैं अपना मतदान केंद्र कैसे खोजूं?",
];

export default function AIAssistantPage() {
  const { user } = useAuth();
  const { language, t } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize message based on language
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([language === 'en' ? INITIAL_MESSAGE_EN : INITIAL_MESSAGE_HI]);
    } else {
      // Switch initial message if language changes and it's the only message
      if (messages.length === 1 && (messages[0].id === 'init' || messages[0].id === 'init-hi')) {
        setMessages([language === 'en' ? INITIAL_MESSAGE_EN : INITIAL_MESSAGE_HI]);
      }
    }
  }, [language, messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e?: React.FormEvent, predefinedInput?: string) => {
    e?.preventDefault();
    const query = predefinedInput || input;
    if (!query.trim() || isLoading) return;

    setInput('');
    setError(null);
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: query.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';

      if (reader) {
        setMessages((prev) => [
          ...prev,
          { id: (Date.now() + 1).toString(), role: 'assistant', content: '', timestamp: Date.now() },
        ]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          assistantContent += chunk;

          setMessages((prev) => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage.role === 'assistant') {
              lastMessage.content = assistantContent;
            }
            return newMessages;
          });
        }
      }
    } catch (err) {
      console.error(err);
      setError(language === 'en' 
        ? 'Sorry, I encountered an error while processing your request. Please try again.'
        : 'क्षमा करें, आपके अनुरोध को संसाधित करते समय मुझे एक त्रुटि हुई। कृपया पुन: प्रयास करें।');
      // Remove the last user message if we failed to get a response
      setMessages((prev) => prev.slice(0, prev.length - 1));
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = language === 'en' ? SUGGESTED_QUESTIONS_EN : SUGGESTED_QUESTIONS_HI;

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto p-4 md:p-6">
      <div className="flex items-center gap-3 mb-6 p-4 rounded-2xl bg-gradient-to-r from-saffron-500/10 via-white/5 to-india-green/10 border border-[var(--border-color)]">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-saffron-500 to-saffron-600 flex items-center justify-center text-white shadow-lg">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[var(--text-primary)]">VoteBuddy AI Assistant</h1>
          <p className="text-sm text-[var(--text-muted)]">
            {language === 'en' 
              ? 'Ask me anything about Indian elections, ECI rules, or voter services.'
              : 'मुझसे भारतीय चुनावों, ईसीआई नियमों या मतदाता सेवाओं के बारे में कुछ भी पूछें।'}
          </p>
        </div>
      </div>

      <div 
        className="flex-1 overflow-y-auto rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4 mb-4 space-y-6"
        aria-live="polite"
        role="log"
        aria-label="Chat messages"
      >
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-saffron-500 to-saffron-600 flex-shrink-0 flex items-center justify-center text-white mt-1">
                <Bot className="w-5 h-5" />
              </div>
            )}
            
            <div className={`max-w-[80%] rounded-2xl p-4 ${
              message.role === 'user' 
                ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-tr-sm' 
                : 'bg-[var(--bg-glass)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-tl-sm'
            }`}>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <Markdown>{message.content}</Markdown>
              </div>
            </div>

            {message.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center text-white mt-1 overflow-hidden">
                {user?.photoURL ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={user.photoURL} alt="User" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-5 h-5" />
                )}
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-saffron-500 to-saffron-600 flex-shrink-0 flex items-center justify-center text-white mt-1">
              <Bot className="w-5 h-5" />
            </div>
            <div className="bg-[var(--bg-glass)] border border-[var(--border-color)] rounded-2xl rounded-tl-sm p-4 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-[var(--text-muted)]" />
              <span className="text-sm text-[var(--text-muted)]">
                {language === 'en' ? 'VoteBuddy is typing...' : 'वोटबडी टाइप कर रहा है...'}
              </span>
            </div>
          </div>
        )}
        
        {error && (
          <div className="flex gap-3 justify-center">
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg p-3 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="space-y-4">
        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2 justify-center">
            {suggestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSubmit(undefined, q)}
                className="px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--border-color)] bg-[var(--bg-glass)] text-[var(--text-secondary)] hover:text-saffron-500 hover:border-saffron-500/30 transition-colors flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                {q}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={language === 'en' ? "Ask about elections, voter ID, or ECI rules..." : "चुनाव, वोटर आईडी, या ईसीआई नियमों के बारे में पूछें..."}
            className="w-full pl-4 pr-12 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-saffron-500 focus:ring-1 focus:ring-saffron-500 transition-all shadow-sm"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-white bg-gradient-to-r from-saffron-500 to-saffron-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-center text-[10px] text-[var(--text-muted)]">
          {language === 'en' 
            ? 'AI can make mistakes. Always verify important information with official ECI sources.'
            : 'एआई गलतियां कर सकता है। महत्वपूर्ण जानकारी को हमेशा आधिकारिक ईसीआई स्रोतों से सत्यापित करें।'}
        </p>
      </div>
    </div>
  );
}
