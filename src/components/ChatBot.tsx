import { useState, useRef, useEffect } from 'react';
import {  MessageCircleIcon as MessageCircle, SendIcon as Send, ShoppingCartIcon as ShoppingCart  } from '../lib/icons';
import { X, Bot } from 'lucide-react';
import { useStore } from '../store/useStore';
import { products } from '../data/products';
import type { Product } from '../data/products';

function findRecommendations(query: string): { text: string; products: Product[] } {
  const q = query.toLowerCase();
  const matches: Product[] = [];
  let response = '';

  if (q.includes('invoice') || q.includes('billing') || q.includes('gst') || q.includes('payment')) {
    matches.push(...products.filter(p => p.category === 'finance' || p.name.toLowerCase().includes('invoice')));
    response = 'For invoicing and billing automation, I\'d recommend these solutions. The Invoice Generator handles GST-compliant invoices automatically!';
  } else if (q.includes('whatsapp') || q.includes('chat') || q.includes('message')) {
    matches.push(...products.filter(p => p.category === 'whatsapp' || p.tools.includes('webhook')));
    response = 'Great choice! WhatsApp automation is our most popular category. Here are the best options for you';
  } else if (q.includes('email') || q.includes('mail') || q.includes('newsletter')) {
    matches.push(...products.filter(p => p.category === 'email'));
    response = 'Email automation can save you hours! Here\'s what I recommend based on your needs';
  } else if (q.includes('social') || q.includes('instagram') || q.includes('linkedin') || q.includes('twitter') || q.includes('content')) {
    matches.push(...products.filter(p => p.category === 'social-media' || p.category === 'marketing'));
    response = 'Social media management made easy! These automations handle content creation and scheduling';
  } else if (q.includes('crm') || q.includes('lead') || q.includes('sales') || q.includes('customer')) {
    matches.push(...products.filter(p => p.category === 'crm' || p.category === 'customer-support'));
    response = 'Lead management and CRM automation — great for growing your sales pipeline!';
  } else if (q.includes('ecommerce') || q.includes('order') || q.includes('shop') || q.includes('store')) {
    matches.push(...products.filter(p => p.category === 'ecommerce'));
    response = 'E-commerce automation is a game-changer! Here are solutions for your online store';
  } else if (q.includes('free') || q.includes('no cost') || q.includes('₹0')) {
    matches.push(...products.filter(p => p.isFree));
    response = 'Here are our completely free automations — no cost, no catch! Perfect for getting started';
  } else if (q.includes('hr') || q.includes('hiring') || q.includes('onboarding') || q.includes('employee')) {
    matches.push(...products.filter(p => p.category === 'hr'));
    response = 'HR automation is essential for growing teams. Check these out';
  } else if (q.includes('data') || q.includes('dashboard') || q.includes('report') || q.includes('analytics')) {
    matches.push(...products.filter(p => p.category === 'data-analytics'));
    response = 'Data and analytics automation — see your metrics in real-time!';
  } else if (q.includes('document') || q.includes('ocr') || q.includes('pdf') || q.includes('extract')) {
    matches.push(...products.filter(p => p.category === 'document'));
    response = 'Document processing made easy with AI! Here\'s what I recommend';
  } else if (q.includes('cheap') || q.includes('budget') || q.includes('affordable')) {
    matches.push(...products.sort((a, b) => a.price - b.price).slice(0, 3));
    response = 'Here are our most affordable options that still pack a punch!';
  } else if (q.includes('best') || q.includes('popular') || q.includes('top') || q.includes('recommend')) {
    matches.push(...products.filter(p => p.isBestseller));
    response = 'Here are our bestsellers — trusted by hundreds of businesses!';
  } else if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
    response = 'Hey there! Tell me what kind of tasks you want to automate. For example:\n\n• "I want to automate invoicing"\n• "Help me with social media"\n• "What\'s best for e-commerce?"\n• "Show me free automations"';
  } else {
    const scored = products.map(p => {
      let score = 0;
      const words = q.split(' ').filter(w => w.length > 2);
      words.forEach(w => {
        if (p.name.toLowerCase().includes(w)) score += 3;
        if (p.description.toLowerCase().includes(w)) score += 2;
        if (p.category.includes(w)) score += 2;
        if (p.subcategory.toLowerCase().includes(w)) score += 1;
      });
      return { product: p, score };
    }).filter(s => s.score > 0).sort((a, b) => b.score - a.score);

    if (scored.length > 0) {
      matches.push(...scored.slice(0, 3).map(s => s.product));
      response = `I found some automations that might help! Here are my top picks for "${query}"`;
    } else {
      response = `I couldn't find an exact match for "${query}", but here are our most popular automations. You can also request a custom automation!`;
      matches.push(...products.filter(p => p.isBestseller));
    }
  }

  return { text: response, products: matches.slice(0, 3) };
}

export default function ChatBot() {
  const { isChatOpen, setChatOpen, chatMessages, addChatMessage, setCurrentPage, setSelectedProductId, addToCart } = useStore();
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, typing]);

  const handleSend = () => {
    if (!input.trim()) return;
    const query = input.trim();
    setInput('');
    addChatMessage({ role: 'user', text: query });

    setTyping(true);
    setTimeout(() => {
      const result = findRecommendations(query);
      addChatMessage({ role: 'bot', text: result.text, products: result.products.length > 0 ? result.products : undefined });
      setTyping(false);
    }, 800 + Math.random() * 700);
  };

  if (!isChatOpen) {
    return (
      <button
        onClick={() => setChatOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg shadow-xl shadow-black/10 dark:shadow-black/40 flex items-center justify-center transition-all hover:scale-105 z-40 border border-slate-800 dark:border-white"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-[380px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100vh-6rem)] bg-[#fafafa] dark:bg-[#151515] rounded-xl shadow-2xl shadow-black/20 border border-slate-200 dark:border-white/[0.08] flex flex-col z-50 transition-colors duration-300 overflow-hidden text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="bg-white dark:bg-[#111] px-5 py-4 flex items-center justify-between shrink-0 border-b border-slate-200 dark:border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 border-[2px] border-slate-900 dark:border-white rounded-md flex items-center justify-center">
            <Bot className="w-5 h-5 text-slate-900 dark:text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold">AutoBot AI</p>
            <p className="text-[10px] text-slate-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Online • Smart recommendations
            </p>
          </div>
        </div>
        <button onClick={() => setChatOpen(false)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/[0.05] rounded-md transition-colors text-slate-500 hover:text-slate-900 dark:hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.map((msg, i) => (
          <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            {msg.role === 'bot' && (
              <div className="w-7 h-7 border border-slate-300 dark:border-white/[0.2] rounded-md flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              </div>
            )}
            <div className={`max-w-[80%] ${msg.role === 'user' ? 'ml-auto' : ''}`}>
              <div className={`px-3.5 py-2.5 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-xl rounded-br-sm'
                  : 'bg-white dark:bg-[#111] text-slate-700 dark:text-slate-300 rounded-xl rounded-bl-sm border border-slate-200 dark:border-white/[0.08]'
              }`}>
                {msg.text.split('\n').map((line, j) => (
                  <span key={j}>{line}<br /></span>
                ))}
              </div>

              {msg.products && msg.products.length > 0 && (
                <div className="mt-2 space-y-2">
                  {msg.products.map(p => (
                    <div key={p.id} className="bg-white dark:bg-[#111] rounded-lg border border-slate-200 dark:border-white/[0.08] p-3 hover:border-slate-400 dark:hover:border-white/[0.2] transition-colors">
                      <div className="flex gap-2.5">
                        <img src={p.thumbnail} alt={p.name} className="w-12 h-12 rounded-md object-cover shrink-0 border border-slate-100 dark:border-white/[0.05]" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold line-clamp-1">{p.name}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">
                            {p.isFree ? '🎁 FREE' : `${p.currency}${p.price.toLocaleString()}`}
                            {' • '}★ {p.rating}
                          </p>
                          <div className="flex gap-1.5 mt-2">
                            <button
                              onClick={() => { setSelectedProductId(p.id); setCurrentPage('product'); setChatOpen(false); }}
                              className="px-2 py-1 bg-slate-100 dark:bg-white/[0.05] text-slate-700 dark:text-slate-300 text-[10px] font-medium rounded hover:bg-slate-200 dark:hover:bg-white/[0.1] transition-colors border border-slate-200 dark:border-white/[0.05]"
                            >
                              View
                            </button>
                            <button
                              onClick={() => addToCart(p)}
                              className="px-2 py-1 bg-slate-900 dark:bg-white text-white dark:text-black text-[10px] font-medium rounded hover:bg-slate-800 dark:hover:bg-gray-200 transition-colors flex items-center gap-0.5"
                            >
                              <ShoppingCart className="w-2.5 h-2.5" /> Add
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex gap-2">
            <div className="w-7 h-7 border border-slate-300 dark:border-white/[0.2] rounded-md flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            </div>
            <div className="bg-white dark:bg-[#111] rounded-xl rounded-bl-sm px-4 py-3 flex items-center gap-1 border border-slate-200 dark:border-white/[0.08]">
              <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick actions */}
      <div className="px-4 pb-2 flex gap-1.5 overflow-x-auto shrink-0 scrollbar-hide">
        {['Best sellers', 'Free tools', 'WhatsApp bots', 'E-commerce'].map(q => (
          <button
            key={q}
            onClick={() => { setInput(q); }}
            className="px-2.5 py-1 bg-white dark:bg-[#111] border border-slate-200 dark:border-white/[0.08] rounded-md text-[10px] text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/[0.05] hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 shrink-0 border-t border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#111]">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything..."
            className="flex-1 px-4 py-2 bg-transparent border border-slate-300 dark:border-white/[0.2] rounded-md text-sm placeholder:text-slate-500 focus:outline-none focus:border-slate-500 dark:focus:border-slate-400"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="px-3 py-2 bg-slate-900 dark:bg-white text-white dark:text-black rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center hover:bg-slate-800 dark:hover:bg-slate-200"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
