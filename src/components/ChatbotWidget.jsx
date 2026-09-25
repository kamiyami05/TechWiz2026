import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare, X, Send, Bot, AlertCircle, RefreshCw, Sparkles, Sprout, ArrowRight
} from 'lucide-react';
import chatbotKB from '../data/chatbot-kb.json';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hello! I am FarmBot AI—your personal assistant for locating verified organic farmers markets, checking live stall hours, and discovering peak seasonal produce. How can I help your market trip today?',
      time: 'Just now'
    }
  ]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleAsk = (queryText) => {
    const text = (queryText || inputQuestion).trim();
    if (!text) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuestion('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = text.toLowerCase();
      let matched = null;

      for (const entry of chatbotKB.knowledgeBase) {
        if (entry.keywords.some(k => lower.includes(k.toLowerCase()))) {
          matched = entry;
          break;
        }
      }

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: matched ? matched.answer : chatbotKB.fallbackMessage,
        relatedSection: matched ? matched.relatedSection : null,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleReset = () => {
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        text: 'Conversation refreshed! Feel free to ask a question or tap one of the suggested prompts below.',
        time: 'Just now'
      }
    ]);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open FarmBot AI Assistant"
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full shadow-xl shadow-emerald-700/40 hover:scale-110 active:scale-95 transition-all flex items-center justify-center cursor-pointer focus:outline-none focus:ring-4 focus:ring-emerald-400 group overflow-hidden"
        >
          <img 
            src="/chatbot-avatar.png" 
            alt="FarmBot AI" 
            className="w-full h-full object-cover rounded-full filter drop-shadow-md group-hover:scale-105 transition-transform"
          />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[92vw] sm:w-[400px] h-[550px] max-h-[85vh] bg-white dark:bg-slate-900 border border-emerald-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-slide-up">

          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 flex items-center justify-center filter drop-shadow-xs">
                <img 
                  src="/chatbot-avatar.png" 
                  alt="FarmBot AI" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <h4 className="font-extrabold text-sm font-display">
                  FarmBot AI Assistant
                </h4>
                <span className="text-[10px] text-emerald-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  Ready to assist 24/7
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                title="Restart chat"
                className="p-1.5 rounded-lg hover:bg-white/20 text-white cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-emerald-50 dark:bg-emerald-950/40 px-3.5 py-1.5 border-b border-emerald-100 dark:border-emerald-900/60 text-[10px] text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
            <span className="truncate">{chatbotKB.disclaimer}</span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 flex items-center justify-center filter drop-shadow-xs">
                    <img
                      src="/chatbot-avatar.png"
                      alt="FarmBot AI"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                )}
                <div
                  className={`p-3.5 rounded-2xl max-w-[82%] leading-relaxed ${m.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-none'
                    : 'bg-stone-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-none border border-slate-200 dark:border-slate-700'
                    }`}
                >
                  <p>{m.text}</p>
                  {m.relatedSection && (
                    <div className="mt-2 pt-2 border-t border-emerald-200 dark:border-slate-700 text-[11px]">
                      <a
                        href={`#${m.relatedSection}`}
                        onClick={() => setIsOpen(false)}
                        className="text-emerald-700 dark:text-emerald-400 hover:underline font-bold inline-flex items-center gap-1"
                      >
                        <ArrowRight className="w-3 h-3" />
                        <span>View on website</span>
                      </a>
                    </div>
                  )}
                  <span className={`block text-[9px] mt-1 text-right ${m.sender === 'user' ? 'text-emerald-200' : 'text-slate-400'
                    }`}>
                    {m.time}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <Sprout className="w-3.5 h-3.5 text-emerald-600 animate-bounce" />
                <span className="animate-pulse">FarmBot AI is searching agricultural database...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts */}
          <div className="px-3 pt-2 pb-1 border-t border-slate-100 dark:border-slate-800 bg-stone-50/80 dark:bg-slate-900/80">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Suggested Questions:
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {chatbotKB.suggestedPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAsk(p)}
                  className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 text-emerald-800 dark:text-emerald-300 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition-colors shrink-0 cursor-pointer"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk();
            }}
            className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuestion}
              onChange={e => setInputQuestion(e.target.value)}
              placeholder="Ask about market hours, seasonal crops, food miles..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              disabled={!inputQuestion.trim()}
              aria-label="Send message"
              className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-40 cursor-pointer transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
