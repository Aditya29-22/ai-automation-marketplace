import { useState, useEffect, useRef } from 'react';
import { Search, ArrowUpRight, Shield, Zap, Clock, Terminal, Cpu, Workflow } from 'lucide-react';
import { useStore } from '../store/useStore';

function AnimatedCounter({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function HeroSection() {
  const [query, setQuery] = useState('');
  const [activeFile, setActiveFile] = useState('automation-workflow.n8n');
  const { setSearchQuery, setCurrentPage, setCustomRequestOpen } = useStore();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchQuery(query);
      setCurrentPage('marketplace');
    }
  };

  const popularSearches = ['WhatsApp Bot', 'Invoice Automation', 'Email Sequence', 'Lead Scoring', 'Social Media'];

  return (
    <section ref={heroRef} className="relative min-h-[90vh] overflow-hidden bg-[#fafafa] dark:bg-[#111] transition-colors duration-300 flex items-center">
      {/* Animated background layers */}
      <div className="absolute inset-0">
        {/* Grid */}
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 dot-grid opacity-30" />

        {/* Gradient orbs */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[120px] transition-all duration-1000 ease-out"
          style={{
            background: 'radial-gradient(circle, rgba(0,212,255,0.4), transparent 70%)',
            left: `${mousePos.x * 0.3}%`,
            top: `${mousePos.y * 0.3}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-[100px] transition-all duration-1000 ease-out"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.4), transparent 70%)',
            right: `${(100 - mousePos.x) * 0.2}%`,
            bottom: `${(100 - mousePos.y) * 0.2}%`,
            transform: 'translate(50%, 50%)',
          }}
        />

        {/* Static orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500/5 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] animate-float-slow" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] animate-float" style={{ animationDelay: '2s' }} />

        {/* Animated rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/[0.02] rounded-full animate-spin-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/[0.03] rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-cyan-500/[0.05] rounded-full animate-spin-slow" style={{ animationDuration: '15s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full pt-16 lg:pt-24">
        <div className="flex flex-col items-center text-center">
          {/* Centered text content */}
          <div className="animate-fade-in-up flex flex-col items-center w-full max-w-4xl mx-auto">
          <div className="animate-fade-in-up flex flex-col items-center w-full max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-medium text-slate-900 dark:text-white leading-[1.05] mb-6 tracking-tight transition-colors">
              Buy Ready-Made AI Automations
              <br className="hidden sm:block" />
              <span className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#a09fa6] transition-colors mt-2 block">Save 100+ hrs/month</span>
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto transition-colors">
              Pre-built, tested, and ready to deploy. From WhatsApp bots to CRM pipelines — set up in minutes, not weeks. Starting at <span className="font-semibold text-emerald-500 dark:text-emerald-400 font-mono">₹0</span>.
            </p>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="mb-6 w-full max-w-xl mx-auto">
              <div className="relative flex items-center group">
                <div className="relative w-full flex items-center">
                  <div 
                    className="absolute left-4 w-5 h-5 flex items-center justify-center overflow-hidden z-10"
                    style={{
                      maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='m21 21-4.3-4.3'/%3E%3C/svg%3E")`,
                      maskSize: 'contain',
                      maskRepeat: 'no-repeat',
                      maskPosition: 'center',
                      WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='m21 21-4.3-4.3'/%3E%3C/svg%3E")`,
                      WebkitMaskSize: 'contain',
                      WebkitMaskRepeat: 'no-repeat',
                      WebkitMaskPosition: 'center',
                    }}
                  >
                    <div 
                      className="absolute top-1/2 left-1/2 w-[200%] aspect-square bg-[conic-gradient(from_0deg,#ec4899,#ef4444,#a855f7,#ec4899)]"
                      style={{ animation: 'spin-center 4s linear infinite' }}
                    />
                  </div>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder='Try "automate my invoices" or "WhatsApp bot"'
                    className="w-full pl-12 pr-36 py-4 bg-white dark:bg-[#1d1c26] border border-slate-200 dark:border-white/[0.08] rounded-2xl text-sm text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-[#a09fa6] focus:outline-none focus:border-white focus:shadow-none transition-all shadow-sm dark:shadow-none"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 px-5 py-2.5 text-white text-sm font-semibold rounded-xl transition-all flex items-center gap-1.5 shadow-lg overflow-hidden group/btn"
                  >
                    <div className="absolute inset-0 -z-10">
                      <div 
                        className="absolute top-1/2 left-1/2 w-[200%] aspect-square bg-[conic-gradient(from_0deg,#ec4899,#ef4444,#a855f7,#ec4899)]"
                        style={{ animation: 'spin-center 4s linear infinite' }}
                      />
                    </div>
                    <span className="relative z-10">Search</span>
                    <ArrowUpRight className="w-4 h-4 relative z-10" />
                  </button>
                </div>
              </div>
            </form>

            {/* Popular searches */}
            <div className="flex flex-wrap justify-center items-center gap-2 mb-10">
              <span className="text-xs text-slate-500 dark:text-slate-600">Popular:</span>
              {popularSearches.map(s => (
                <button
                  key={s}
                  onClick={() => { setSearchQuery(s); setCurrentPage('marketplace'); }}
                  className="relative group overflow-hidden px-3 py-1.5 bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] rounded-lg text-xs text-slate-600 dark:text-slate-400 transition-all shadow-sm dark:shadow-none"
                >
                  <span className="relative z-10">{s}</span>
                  <div className="search-border-mask opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ borderRadius: '8px' }}>
                    <div className="search-border-spin" />
                  </div>
                </button>
              ))}
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-slate-500 mb-16">
              {[
                { icon: <Shield className="w-4 h-4 text-white" />, text: '30-Day Guarantee' },
                { icon: <Zap className="w-4 h-4 text-white" />, text: 'Instant Delivery' },
                { icon: <Clock className="w-4 h-4 text-white" />, text: 'Setup in Minutes' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* New IDE Visual - Full Width Centered */}
          <div className="hidden lg:block relative w-full max-w-5xl mx-auto animate-fade-in-up stagger-3">
            {/* The Huge Glowing Aura matching the design */}
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[100%] h-[400px] bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 rounded-[100%] blur-[120px] opacity-30 dark:opacity-40 mix-blend-screen pointer-events-none" />

            <div className="relative rounded-2xl w-full">
              <div className="ide-border-mask">
                <div className="ide-border-spin" />
              </div>
              <div className="relative flex w-full glass rounded-2xl overflow-hidden border border-transparent shadow-2xl shadow-black/40 text-left bg-[#0c0c0e]">
              
              {/* Sidebar */}
              <div className="w-64 border-r border-white/[0.04] bg-[#070709] flex flex-col hidden md:flex">
                {/* Header */}
                <div className="h-12 border-b border-white/[0.04] flex items-center px-4">
                  <span className="text-xs font-semibold text-white tracking-wide">AutomateStore IDE</span>
                </div>
                {/* File Explorer */}
                <div className="p-4">
                  <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mb-4 block">Content</span>
                  <div className="flex items-center gap-2 text-slate-300 text-xs mb-3">
                    <span className="text-slate-500">v</span>
                    <span className="font-medium">workflows</span>
                  </div>
                  <div className="ml-4 space-y-3 text-[12px] font-mono">
                    <div onClick={() => setActiveFile('automation-workflow.n8n')} className={`pl-3 py-0.5 cursor-pointer transition-colors ${activeFile === 'automation-workflow.n8n' ? 'text-pink-400 border-l-2 border-pink-500' : 'text-slate-400 hover:text-slate-300'}`}>automation-workflow.n8n</div>
                    <div onClick={() => setActiveFile('leads-sync.json')} className={`pl-3 py-0.5 cursor-pointer transition-colors ${activeFile === 'leads-sync.json' ? 'text-pink-400 border-l-2 border-pink-500' : 'text-slate-400 hover:text-slate-300'}`}>leads-sync.json</div>
                    <div onClick={() => setActiveFile('crm-pipeline.make')} className={`pl-3 py-0.5 cursor-pointer transition-colors ${activeFile === 'crm-pipeline.make' ? 'text-pink-400 border-l-2 border-pink-500' : 'text-slate-400 hover:text-slate-300'}`}>crm-pipeline.make</div>
                    <div onClick={() => setActiveFile('whatsapp-bot.js')} className={`pl-3 py-0.5 cursor-pointer transition-colors ${activeFile === 'whatsapp-bot.js' ? 'text-pink-400 border-l-2 border-pink-500' : 'text-slate-400 hover:text-slate-300'}`}>whatsapp-bot.js</div>
                    <div onClick={() => setActiveFile('package.json')} className={`pl-3 py-0.5 cursor-pointer transition-colors ${activeFile === 'package.json' ? 'text-pink-400 border-l-2 border-pink-500' : 'text-slate-400 hover:text-slate-300'}`}>package.json</div>
                  </div>
                </div>
              </div>

              {/* Main Code Area */}
              <div className="flex-1 bg-[#101014] flex flex-col">
                {/* Header Buttons */}
                <div className="h-12 border-b border-white/[0.04] flex items-center justify-between px-4 bg-[#101014]">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-1.5 bg-white/[0.03] hover:bg-white/[0.06] rounded-md border border-white/[0.08] text-[12px] font-medium text-white transition-colors">Run</button>
                    <button className="px-4 py-1.5 bg-white/[0.03] hover:bg-white/[0.06] rounded-md border border-white/[0.08] text-[12px] font-medium text-white transition-colors">Save</button>
                  </div>
                </div>

                {/* Code Content */}
                <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto flex-1">
                  {activeFile === 'automation-workflow.n8n' && (
                    <>
                      <div className="flex items-start gap-4 mb-2">
                        <span className="text-slate-600 select-none w-4 text-right">1</span>
                        <div className="flex gap-1">
                          <span className="text-purple-400">const</span>
                          <span className="text-cyan-400">automation</span>
                          <span className="text-slate-400">=</span>
                          <span className="text-amber-400">new</span>
                          <span className="text-emerald-400">Workflow</span>
                          <span className="text-slate-400">{'('}{'{'}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 mb-2">
                        <span className="text-slate-600 select-none w-4 text-right">2</span>
                        <div className="pl-6 flex gap-1">
                          <span className="text-slate-400">trigger:</span>
                          <span className="text-emerald-400">&apos;webhook&apos;</span><span className="text-slate-400">,</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 mb-2">
                        <span className="text-slate-600 select-none w-4 text-right">3</span>
                        <div className="pl-6 flex gap-1">
                          <span className="text-slate-400">ai:</span>
                          <span className="text-emerald-400">&apos;gpt-4&apos;</span><span className="text-slate-400">,</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 mb-2">
                        <span className="text-slate-600 select-none w-4 text-right">4</span>
                        <div className="pl-6 flex gap-1">
                          <span className="text-slate-400">output: [</span>
                          <span className="text-emerald-400">&apos;email&apos;</span><span className="text-slate-400">,</span>
                          <span className="text-emerald-400">&apos;whatsapp&apos;</span><span className="text-slate-400">,</span>
                          <span className="text-emerald-400">&apos;crm&apos;</span>
                          <span className="text-slate-400">]</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 mb-2">
                        <span className="text-slate-600 select-none w-4 text-right">5</span>
                        <div><span className="text-slate-400">{'}'}{')'};</span></div>
                      </div>
                      <div className="flex items-start gap-4 mb-2">
                        <span className="text-slate-600 select-none w-4 text-right">6</span>
                      </div>
                      <div className="flex items-start gap-4 mb-4">
                        <span className="text-slate-600 select-none w-4 text-right">7</span>
                        <div className="flex gap-1">
                          <span className="text-purple-400">await</span>
                          <span className="text-cyan-400">automation</span><span className="text-slate-400">.</span>
                          <span className="text-blue-400">deploy</span><span className="text-slate-400">{'()'};</span>
                          <span className="ml-3 text-emerald-400 animate-pulse font-sans text-xs flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" /> Live
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                  {activeFile === 'leads-sync.json' && (
                    <>
                      <div className="flex items-start gap-4 mb-2">
                        <span className="text-slate-600 select-none w-4 text-right">1</span>
                        <div className="flex gap-1"><span className="text-slate-400">{'{'}</span></div>
                      </div>
                      <div className="flex items-start gap-4 mb-2">
                        <span className="text-slate-600 select-none w-4 text-right">2</span>
                        <div className="pl-6 flex gap-1"><span className="text-cyan-400">&quot;name&quot;</span><span className="text-slate-400">: </span><span className="text-emerald-400">&quot;Leads Sync&quot;</span><span className="text-slate-400">,</span></div>
                      </div>
                      <div className="flex items-start gap-4 mb-2">
                        <span className="text-slate-600 select-none w-4 text-right">3</span>
                        <div className="pl-6 flex gap-1"><span className="text-cyan-400">&quot;nodes&quot;</span><span className="text-slate-400">: [</span></div>
                      </div>
                      <div className="flex items-start gap-4 mb-2">
                        <span className="text-slate-600 select-none w-4 text-right">4</span>
                        <div className="pl-12 flex gap-1"><span className="text-slate-400">{'{'} </span><span className="text-cyan-400">&quot;type&quot;</span><span className="text-slate-400">: </span><span className="text-emerald-400">&quot;webhook&quot;</span><span className="text-slate-400"> {'}'},</span></div>
                      </div>
                      <div className="flex items-start gap-4 mb-2">
                        <span className="text-slate-600 select-none w-4 text-right">5</span>
                        <div className="pl-12 flex gap-1"><span className="text-slate-400">{'{'} </span><span className="text-cyan-400">&quot;type&quot;</span><span className="text-slate-400">: </span><span className="text-emerald-400">&quot;hubspot&quot;</span><span className="text-slate-400"> {'}'}</span></div>
                      </div>
                      <div className="flex items-start gap-4 mb-2">
                        <span className="text-slate-600 select-none w-4 text-right">6</span>
                        <div className="pl-6 flex gap-1"><span className="text-slate-400">],</span></div>
                      </div>
                      <div className="flex items-start gap-4 mb-4">
                        <span className="text-slate-600 select-none w-4 text-right">7</span>
                        <div className="flex gap-1"><span className="text-slate-400">{'}'}</span></div>
                      </div>
                    </>
                  )}
                  {activeFile === 'crm-pipeline.make' && (
                    <>
                      <div className="flex items-start gap-4 mb-2">
                        <span className="text-slate-600 select-none w-4 text-right">1</span>
                        <div className="flex gap-1"><span className="text-slate-400">{'{'}</span></div>
                      </div>
                      <div className="flex items-start gap-4 mb-2">
                        <span className="text-slate-600 select-none w-4 text-right">2</span>
                        <div className="pl-6 flex gap-1"><span className="text-cyan-400">&quot;name&quot;</span><span className="text-slate-400">: </span><span className="text-emerald-400">&quot;CRM Pipeline&quot;</span><span className="text-slate-400">,</span></div>
                      </div>
                      <div className="flex items-start gap-4 mb-2">
                        <span className="text-slate-600 select-none w-4 text-right">3</span>
                        <div className="pl-6 flex gap-1"><span className="text-cyan-400">&quot;flow&quot;</span><span className="text-slate-400">: [</span></div>
                      </div>
                      <div className="flex items-start gap-4 mb-2">
                        <span className="text-slate-600 select-none w-4 text-right">4</span>
                        <div className="pl-12 flex gap-1"><span className="text-slate-400">{'{'} </span><span className="text-cyan-400">&quot;module&quot;</span><span className="text-slate-400">: </span><span className="text-emerald-400">&quot;CustomWebhook&quot;</span><span className="text-slate-400"> {'}'},</span></div>
                      </div>
                      <div className="flex items-start gap-4 mb-2">
                        <span className="text-slate-600 select-none w-4 text-right">5</span>
                        <div className="pl-12 flex gap-1"><span className="text-slate-400">{'{'} </span><span className="text-cyan-400">&quot;module&quot;</span><span className="text-slate-400">: </span><span className="text-emerald-400">&quot;SalesforceCreate&quot;</span><span className="text-slate-400"> {'}'}</span></div>
                      </div>
                      <div className="flex items-start gap-4 mb-2">
                        <span className="text-slate-600 select-none w-4 text-right">6</span>
                        <div className="pl-6 flex gap-1"><span className="text-slate-400">]</span></div>
                      </div>
                      <div className="flex items-start gap-4 mb-4">
                        <span className="text-slate-600 select-none w-4 text-right">7</span>
                        <div className="flex gap-1"><span className="text-slate-400">{'}'}</span></div>
                      </div>
                    </>
                  )}
                  {activeFile === 'whatsapp-bot.js' && (
                    <>
                      <div className="flex items-start gap-4 mb-2">
                        <span className="text-slate-600 select-none w-4 text-right">1</span>
                        <div className="flex gap-1"><span className="text-purple-400">import</span><span className="text-cyan-400"> {'{'} Client {'}'} </span><span className="text-purple-400">from</span><span className="text-emerald-400"> &apos;whatsapp-web.js&apos;</span><span className="text-slate-400">;</span></div>
                      </div>
                      <div className="flex items-start gap-4 mb-2">
                        <span className="text-slate-600 select-none w-4 text-right">2</span>
                        <div className="flex gap-1"><span className="text-purple-400">const</span><span className="text-cyan-400"> client </span><span className="text-slate-400">=</span><span className="text-amber-400"> new</span><span className="text-emerald-400"> Client</span><span className="text-slate-400">();</span></div>
                      </div>
                      <div className="flex items-start gap-4 mb-2">
                        <span className="text-slate-600 select-none w-4 text-right">3</span>
                        <div className="flex gap-1"><span className="text-cyan-400">client</span><span className="text-slate-400">.</span><span className="text-blue-400">on</span><span className="text-slate-400">(</span><span className="text-emerald-400">&apos;message&apos;</span><span className="text-slate-400">, </span><span className="text-amber-400">msg</span><span className="text-purple-400"> =&gt;</span><span className="text-slate-400"> {'{'}</span></div>
                      </div>
                      <div className="flex items-start gap-4 mb-2">
                        <span className="text-slate-600 select-none w-4 text-right">4</span>
                        <div className="pl-6 flex gap-1"><span className="text-purple-400">if</span><span className="text-slate-400"> (msg.body === </span><span className="text-emerald-400">&apos;!ping&apos;</span><span className="text-slate-400">) {'{'}</span></div>
                      </div>
                      <div className="flex items-start gap-4 mb-2">
                        <span className="text-slate-600 select-none w-4 text-right">5</span>
                        <div className="pl-12 flex gap-1"><span className="text-cyan-400">msg</span><span className="text-slate-400">.</span><span className="text-blue-400">reply</span><span className="text-slate-400">(</span><span className="text-emerald-400">&apos;pong&apos;</span><span className="text-slate-400">);</span></div>
                      </div>
                      <div className="flex items-start gap-4 mb-2">
                        <span className="text-slate-600 select-none w-4 text-right">6</span>
                        <div className="pl-6 flex gap-1"><span className="text-slate-400">{'}'}</span></div>
                      </div>
                      <div className="flex items-start gap-4 mb-4">
                        <span className="text-slate-600 select-none w-4 text-right">7</span>
                        <div className="flex gap-1"><span className="text-slate-400">{'}'});</span></div>
                      </div>
                    </>
                  )}
                  {activeFile === 'package.json' && (
                    <>
                      <div className="flex items-start gap-4 mb-2">
                        <span className="text-slate-600 select-none w-4 text-right">1</span>
                        <div className="flex gap-1"><span className="text-slate-400">{'{'}</span></div>
                      </div>
                      <div className="flex items-start gap-4 mb-2">
                        <span className="text-slate-600 select-none w-4 text-right">2</span>
                        <div className="pl-6 flex gap-1"><span className="text-cyan-400">&quot;name&quot;</span><span className="text-slate-400">: </span><span className="text-emerald-400">&quot;ai-automations&quot;</span><span className="text-slate-400">,</span></div>
                      </div>
                      <div className="flex items-start gap-4 mb-2">
                        <span className="text-slate-600 select-none w-4 text-right">3</span>
                        <div className="pl-6 flex gap-1"><span className="text-cyan-400">&quot;version&quot;</span><span className="text-slate-400">: </span><span className="text-emerald-400">&quot;1.0.0&quot;</span><span className="text-slate-400">,</span></div>
                      </div>
                      <div className="flex items-start gap-4 mb-2">
                        <span className="text-slate-600 select-none w-4 text-right">4</span>
                        <div className="pl-6 flex gap-1"><span className="text-cyan-400">&quot;dependencies&quot;</span><span className="text-slate-400">: {'{'}</span></div>
                      </div>
                      <div className="flex items-start gap-4 mb-2">
                        <span className="text-slate-600 select-none w-4 text-right">5</span>
                        <div className="pl-12 flex gap-1"><span className="text-cyan-400">&quot;n8n-core&quot;</span><span className="text-slate-400">: </span><span className="text-emerald-400">&quot;^1.0.0&quot;</span><span className="text-slate-400">,</span></div>
                      </div>
                      <div className="flex items-start gap-4 mb-2">
                        <span className="text-slate-600 select-none w-4 text-right">6</span>
                        <div className="pl-12 flex gap-1"><span className="text-cyan-400">&quot;whatsapp-web.js&quot;</span><span className="text-slate-400">: </span><span className="text-emerald-400">&quot;^1.23.0&quot;</span></div>
                      </div>
                      <div className="flex items-start gap-4 mb-4">
                        <span className="text-slate-600 select-none w-4 text-right">7</span>
                        <div className="pl-6 flex gap-1"><span className="text-slate-400">{'}'}</span></div>
                      </div>
                    </>
                  )}

                  {/* Progress bar */}
                  <div className="mt-8 p-4 bg-emerald-500/[0.03] border border-emerald-500/10 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <Terminal className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs text-emerald-400 font-medium uppercase tracking-wider">Deployment Complete</span>
                    </div>
                    <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                      <div className="h-full w-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Bottom stats bar - Bento Design */}
        <div className="mt-24 pt-16 border-t border-slate-200 dark:border-white/[0.08] transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            
            {/* Heading */}
            <div className="md:col-span-2 flex items-start p-2 mb-6 md:mb-0">
              <h2 className="text-[2.5rem] md:text-5xl lg:text-[4rem] font-semibold text-slate-900 dark:text-white tracking-tight leading-[1.05] transition-colors">
                Numbers<br />speak.
              </h2>
            </div>

            {/* Card 1 */}
            <div className="bg-white rounded-3xl p-6 md:p-8 flex flex-col justify-between min-h-[220px] md:col-span-1 hover:scale-[1.02] transition-transform">
              <p className="text-slate-500 text-[15px] leading-snug">Happy<br/>Customers.</p>
              <p className="text-black text-[3.5rem] md:text-6xl font-black tracking-tighter mt-8 font-mono">
                <AnimatedCounter end={500} suffix="+" />
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-3xl p-6 md:p-8 flex flex-col justify-between min-h-[220px] md:col-span-1 hover:scale-[1.02] transition-transform">
              <p className="text-slate-500 text-[15px] leading-snug">Automations<br/>Sold.</p>
              <p className="text-black text-[3.5rem] md:text-6xl font-black tracking-tighter mt-8 font-mono">
                <AnimatedCounter end={1200} suffix="+" />
              </p>
            </div>

            {/* Card 3 (Wide) */}
            <div className="bg-white rounded-3xl p-6 md:p-8 flex flex-col justify-between min-h-[240px] md:col-span-2 hover:scale-[1.02] transition-transform">
              <p className="text-slate-500 text-[15px] leading-snug">Saved for<br/>Clients.</p>
              <p className="text-black text-6xl md:text-[5.5rem] font-black tracking-tighter mt-8 font-mono leading-none">
                ₹<AnimatedCounter end={2} suffix="Cr+" />
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-3xl p-6 md:p-8 flex flex-col justify-between min-h-[240px] md:col-span-1 hover:scale-[1.02] transition-transform">
              <p className="text-slate-500 text-[15px] leading-snug">Success<br/>Rate.</p>
              <p className="text-black text-[3.5rem] md:text-6xl font-black tracking-tighter mt-8 font-mono">
                <AnimatedCounter end={99} suffix="%" />
              </p>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-end justify-end p-6 md:col-span-1 min-h-[240px]">
              <svg className="w-24 h-24 text-slate-900 dark:text-white opacity-90 hover:translate-x-2 hover:-translate-y-2 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter">
                <path d="M6 6h12v12M18 6L6 18" />
              </svg>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
