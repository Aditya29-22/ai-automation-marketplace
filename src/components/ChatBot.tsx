import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, ShoppingCart } from 'lucide-react';
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
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-full shadow-2xl shadow-cyan-500/20 flex items-center justify-center transition-all hover:scale-105 z-40 animate-pulse-glow"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-[380px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100vh-6rem)] bg-[#111118] rounded-3xl shadow-2xl shadow-black/50 border border-white/[0.06] flex flex-col z-50 animate-fade-in-scale overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 px-5 py-4 flex items-center justify-between shrink-0 border-b border-white/[0.04]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center">
            <Bot className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">AutoBot AI</p>
            <p className="text-[10px] text-slate-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" /> Online • Smart recommendations
            </p>
          </div>
        </div>
        <button onClick={() => setChatOpen(false)} className="p-1.5 hover:bg-white/[0.03] rounded-lg transition-colors text-slate-500 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.map((msg, i) => (
          <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            {msg.role === 'bot' && (
              <div className="w-7 h-7 bg-cyan-500/10 border border-cyan-500/20 rounded-lg flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-cyan-400" />
              </div>
            )}
            <div className={`max-w-[80%] ${msg.role === 'user' ? 'ml-auto' : ''}`}>
              <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-br-md'
                  : 'bg-white/[0.03] text-slate-300 rounded-bl-md border border-white/[0.04]'
              }`}>
                {msg.text.split('\n').map((line, j) => (
                  <span key={j}>{line}<br /></span>
                ))}
              </div>

              {msg.products && msg.products.length > 0 && (
                <div className="mt-2 space-y-2">
                  {msg.products.map(p => (
                    <div key={p.id} className="bg-white/[0.02] rounded-xl border border-white/[0.04] p-3 hover:border-cyan-500/10 transition-colors">
                      <div className="flex gap-2.5">
                        <img src={p.thumbnail} alt={p.name} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-white line-clamp-1">{p.name}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">
                            {p.isFree ? '🎁 FREE' : `${p.currency}${p.price.toLocaleString()}`}
                            {' • '}★ {p.rating}
                          </p>
                          <div className="flex gap-1.5 mt-1.5">
                            <button
                              onClick={() => { setSelectedProductId(p.id); setCurrentPage('product'); setChatOpen(false); }}
                              className="px-2 py-1 bg-cyan-500/10 text-cyan-400 text-[10px] font-medium rounded-md hover:bg-cyan-500/20 transition-colors border border-cyan-500/10"
                            >
                              View
                            </button>
                            <button
                              onClick={() => addToCart(p)}
                              className="px-2 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[10px] font-medium rounded-md hover:from-cyan-400 hover:to-blue-500 transition-colors flex items-center gap-0.5"
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
            <div className="w-7 h-7 bg-cyan-500/10 border border-cyan-500/20 rounded-lg flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="bg-white/[0.03] rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1 border border-white/[0.04]">
              <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick actions */}
      <div className="px-4 pb-2 flex gap-1.5 overflow-x-auto shrink-0">
        {['Best sellers', 'Free tools', 'WhatsApp bots', 'E-commerce'].map(q => (
          <button
            key={q}
            onClick={() => { setInput(q); }}
            className="px-2.5 py-1 bg-white/[0.02] border border-white/[0.04] rounded-full text-[10px] text-slate-500 hover:bg-cyan-500/5 hover:text-cyan-400 hover:border-cyan-500/10 transition-colors whitespace-nowrap shrink-0"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="px-4 pb-4 shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything about automations..."
            className="flex-1 px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/30 focus:ring-1 focus:ring-cyan-500/10"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="px-3.5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/10"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
