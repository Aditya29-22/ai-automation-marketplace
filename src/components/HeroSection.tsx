import { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight, Shield, Zap, Clock, Terminal, Cpu, Workflow } from 'lucide-react';
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500/5 dark:bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs font-medium text-cyan-600 dark:text-cyan-400 mb-8 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
              </span>
              India's #1 AI Automation Marketplace
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white leading-[1.05] mb-6 font-[Space_Grotesk] tracking-tight transition-colors">
              Buy Ready-Made
              <br />
              <span className="gradient-text">AI Automations</span>
              <br />
              <span className="text-3xl sm:text-4xl lg:text-5xl font-medium text-slate-500 dark:text-slate-400 transition-colors">Save 100+ hrs/month</span>
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-lg transition-colors">
              Pre-built, tested, and ready to deploy. From WhatsApp bots to CRM pipelines — set up in minutes, not weeks. Starting at <span className="font-semibold text-emerald-500 dark:text-emerald-400 font-mono">₹0</span>.
            </p>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="mb-5">
              <div className="relative flex items-center max-w-lg group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                <div className="relative w-full flex items-center">
                  <Search className="absolute left-4 w-5 h-5 text-slate-400 dark:text-slate-500 group-focus-within:text-cyan-500 dark:group-focus-within:text-cyan-400 transition-colors" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder='Try "automate my invoices" or "WhatsApp bot"'
                    className="w-full pl-12 pr-36 py-4 bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] rounded-2xl text-sm text-slate-900 dark:text-slate-200 placeholder:text-slate-500 dark:placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/30 focus:bg-white dark:focus:bg-white/[0.05] focus:shadow-[0_0_40px_rgba(0,212,255,0.1)] transition-all shadow-sm dark:shadow-none"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm font-semibold rounded-xl transition-all flex items-center gap-1.5 shadow-lg shadow-cyan-500/15"
                  >
                    Search <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>

            {/* Popular searches */}
            <div className="flex flex-wrap items-center gap-2 mb-10">
              <span className="text-xs text-slate-500 dark:text-slate-600">Popular:</span>
              {popularSearches.map(s => (
                <button
                  key={s}
                  onClick={() => { setSearchQuery(s); setCurrentPage('marketplace'); }}
                  className="px-3 py-1.5 bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] rounded-lg text-xs text-slate-600 dark:text-slate-400 hover:border-cyan-500/20 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-50/50 dark:hover:bg-cyan-500/5 transition-all shadow-sm dark:shadow-none"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
              {[
                { icon: <Shield className="w-4 h-4 text-emerald-400" />, text: '30-Day Guarantee' },
                { icon: <Zap className="w-4 h-4 text-amber-400" />, text: 'Instant Delivery' },
                { icon: <Clock className="w-4 h-4 text-cyan-400" />, text: 'Setup in Minutes' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right visual - Terminal / Code editor mockup */}
          <div className="hidden lg:block relative animate-fade-in-up stagger-3">
            <div className="relative">
              {/* Glow behind */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-blue-500/10 rounded-3xl blur-2xl" />

              {/* Main card */}
              <div className="relative glass rounded-2xl overflow-hidden border border-white/[0.06] shadow-2xl shadow-black/40">
                {/* Window chrome */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.04] bg-white/[0.02]">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-[10px] text-slate-600 font-mono">automation-workflow.n8n — ~/projects</span>
                  </div>
                  <div className="w-16" />
                </div>

                {/* Code content */}
                <div className="p-5 font-mono text-xs leading-relaxed">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-slate-600 select-none">1</span>
                    <span className="text-purple-400">const</span>
                    <span className="text-cyan-400"> automation</span>
                    <span className="text-slate-400"> = </span>
                    <span className="text-amber-400">new</span>
                    <span className="text-emerald-400"> Workflow</span>
                    <span className="text-slate-400">{'('}{'{'}</span>
                  </div>
                  <div className="flex items-start gap-3 mb-4 pl-4">
                    <span className="text-slate-600 select-none">2</span>
                    <span className="text-slate-400">  trigger: </span>
                    <span className="text-emerald-400">&apos;webhook&apos;</span>
                    <span className="text-slate-400">,</span>
                  </div>
                  <div className="flex items-start gap-3 mb-4 pl-4">
                    <span className="text-slate-600 select-none">3</span>
                    <span className="text-slate-400">  ai: </span>
                    <span className="text-emerald-400">&apos;gpt-4&apos;</span>
                    <span className="text-slate-400">,</span>
                  </div>
                  <div className="flex items-start gap-3 mb-4 pl-4">
                    <span className="text-slate-600 select-none">4</span>
                    <span className="text-slate-400">  output: [</span>
                    <span className="text-emerald-400">&apos;email&apos;</span>
                    <span className="text-slate-400">, </span>
                    <span className="text-emerald-400">&apos;whatsapp&apos;</span>
                    <span className="text-slate-400">, </span>
                    <span className="text-emerald-400">&apos;crm&apos;</span>
                    <span className="text-slate-400">]</span>
                  </div>
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-slate-600 select-none">5</span>
                    <span className="text-slate-400">{'}'}{')'};</span>
                  </div>
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-slate-600 select-none">6</span>
                  </div>
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-slate-600 select-none">7</span>
                    <span className="text-purple-400">await</span>
                    <span className="text-cyan-400"> automation</span>
                    <span className="text-slate-400">.</span>
                    <span className="text-blue-400">deploy</span>
                    <span className="text-slate-400">{'()'};</span>
                    <span className="ml-2 text-emerald-400 animate-pulse">{'✓'} Live</span>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-4 p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-[10px] text-emerald-400 font-medium uppercase tracking-wider">Deployment Complete</span>
                    </div>
                    <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
                      <div className="h-full w-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating stat cards */}
              <div className="absolute -bottom-6 -left-8 animate-float bg-white dark:bg-[#1a1a1a]/80 backdrop-blur-md rounded-xl p-3 border border-slate-200 dark:border-white/[0.06] shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                    <Cpu className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white font-mono transition-colors">4 hrs/day</p>
                    <p className="text-[10px] text-slate-500">Time Saved</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-6 animate-float bg-white dark:bg-[#1a1a1a]/80 backdrop-blur-md rounded-xl p-3 border border-slate-200 dark:border-white/[0.06] shadow-xl" style={{ animationDelay: '1.5s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                    <Workflow className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white font-mono transition-colors">₹25K/mo</p>
                    <p className="text-[10px] text-slate-500">Cost Saved</p>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 -right-12 animate-float bg-white dark:bg-[#1a1a1a]/80 backdrop-blur-md rounded-xl p-3 border border-slate-200 dark:border-white/[0.06] shadow-xl" style={{ animationDelay: '3s' }}>
                <div className="flex items-center gap-1.5">
                  {[1,2,3,4,5].map(i => (
                    <span key={i} className="text-amber-400 text-xs">★</span>
                  ))}
                  <span className="text-xs text-slate-900 dark:text-white font-bold ml-1 transition-colors">4.8</span>
                </div>
                <p className="text-[10px] text-slate-500">1,200+ sold</p>
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
