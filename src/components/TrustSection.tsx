import { useState, cloneElement } from 'react';
import { Shield, Zap, Clock, BadgeCheck, RefreshCcw, Headphones, Star, Quote, TrendingUp, Users, Award, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Founder, DigitalFirst Agency',
    avatar: 'RK',
    text: 'We replaced a ₹30,000/month tool with a ₹5,000 one-time automation. The ROI was insane — paid for itself on day one.',
    rating: 5,
    image: 'https://images.pexels.com/photos/5308640/pexels-photo-5308640.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=100&w=100',
  },
  {
    name: 'Priya Sharma',
    role: 'CEO, QuickCommerce',
    avatar: 'PS',
    text: 'Setup took 20 minutes. Now our order processing runs on autopilot. We handle 3x more orders with the same team.',
    rating: 5,
    image: 'https://images.pexels.com/photos/6942776/pexels-photo-6942776.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=100&w=100',
  },
  {
    name: 'Arjun Patel',
    role: 'Marketing Head, ScaleUp Inc',
    avatar: 'AP',
    text: 'The AI chatbot recommended exactly what we needed. Customer support response time dropped from 2 hours to 5 seconds.',
    rating: 5,
    image: 'https://images.pexels.com/photos/14950779/pexels-photo-14950779.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=100&w=100',
  },
];

const caseStudies = [
  {
    company: 'TechStartup.io',
    industry: 'SaaS',
    metric: '85%',
    label: 'Less manual work',
    description: 'Automated their entire onboarding flow, saving 20+ hours per week.',
  },
  {
    company: 'FashionBrand Co',
    industry: 'E-Commerce',
    metric: '₹2.5L',
    label: 'Saved per month',
    description: 'Order processing, inventory sync, and customer notifications — fully automated.',
  },
  {
    company: 'ConsultFirm LLP',
    industry: 'Professional Services',
    metric: '3x',
    label: 'More clients served',
    description: 'Invoice generation, follow-ups, and reporting run without human intervention.',
  },
];

const trustFeatures = [
  { icon: <BadgeCheck className="w-6 h-6" />, color: 'cyan', title: 'Verified & Tested', desc: 'Every automation is manually tested by our team before listing. Quality guaranteed.' },
  { icon: <Shield className="w-6 h-6" />, color: 'emerald', title: '30-Day Money Back', desc: 'Not satisfied? Get a full refund within 30 days. No questions asked.' },
  { icon: <Zap className="w-6 h-6" />, color: 'amber', title: 'Instant Delivery', desc: 'Download your automation immediately after purchase. ZIP + complete documentation.' },
  { icon: <Clock className="w-6 h-6" />, color: 'purple', title: 'Setup in Minutes', desc: 'Clear step-by-step guides and video walkthroughs. Average setup time: 25 minutes.' },
  { icon: <RefreshCcw className="w-6 h-6" />, color: 'pink', title: 'Free Updates', desc: 'All automations include free updates for 6 months when APIs or tools change.' },
  { icon: <Headphones className="w-6 h-6" />, color: 'blue', title: 'Expert Support', desc: 'Need help? Our automation experts respond within 24 hours via email or WhatsApp.' },
];

export default function TrustSection() {
  const [activeIndex, setActiveIndex] = useState(1);
  return (
    <>
      {/* Trust Badges */}
      <section className="py-24 bg-[#111] relative">
        <div className="absolute inset-0 aurora-bg opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-medium text-white tracking-tight mb-4" style={{ fontFamily: 'system-ui, sans-serif' }}>
              Why 500+ Businesses Trust Us
            </h2>
            <p className="text-slate-400 text-lg max-w-lg mx-auto">Every automation is verified, tested, and backed by our guarantee</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 auto-rows-[220px] sm:auto-rows-[240px]">
            {trustFeatures.map((item, i) => {
              const isLarge = i === 0;
              
              return (
                <div
                  key={i}
                  className={`group relative overflow-hidden rounded-3xl p-6 sm:p-8 transition-all duration-500 flex flex-col justify-end animate-fade-in-up opacity-0 stagger-${Math.min(i + 1, 6)} ${
                    isLarge ? "md:col-span-2 md:row-span-2" : "col-span-1 row-span-1"
                  }`}
                >
                  {/* Static Border Layer (for non-hover state of small cards) */}
                  {!isLarge && (
                    <div className="absolute inset-0 z-0 border border-white/[0.05] rounded-3xl transition-opacity duration-500 opacity-100 group-hover:opacity-0 pointer-events-none" />
                  )}

                  {/* Animated border gradient */}
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] z-0 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(255,255,255,0.4)_360deg)] transition-opacity duration-500 ${isLarge ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                  
                  {/* Inner background mask */}
                  <div className={`absolute inset-[1px] z-0 rounded-[calc(1.5rem-1px)] transition-colors duration-500 ${isLarge ? 'bg-gradient-to-br from-[#0f0f13] to-[#050508]' : 'bg-[#0a0a0f] group-hover:bg-[#0f0f13]'}`} />

                  {/* Glow effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-t from-white/[0.02] to-transparent pointer-events-none z-0" />

                  {/* Graphic */}
                  <div className="absolute -top-8 -right-8 w-40 h-[138px] opacity-30 group-hover:opacity-70 transition-all duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-2 pointer-events-none z-0">
                    <div className="w-full h-full bg-[#1c1c1c] border border-white/[0.05] flex items-center justify-center shadow-2xl text-white pt-6 sm:pt-10" style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}>
                      {cloneElement(item.icon as React.ReactElement, { className: isLarge ? "w-20 h-20" : "w-12 h-12" })}
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="relative z-10 mt-auto">
                    <div className="flex items-center gap-3 mb-2 sm:mb-3">
                      <div className={`w-2 h-2 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)] ${isLarge ? 'bg-cyan-400' : 'bg-white/40 group-hover:bg-cyan-400'}`} />
                      <h3 className={`font-medium text-white tracking-wide ${isLarge ? 'text-xl sm:text-2xl' : 'text-lg'}`}>{item.title}</h3>
                    </div>
                    <p className={`text-slate-400 leading-relaxed ${isLarge ? 'text-sm sm:text-base max-w-sm' : 'text-xs sm:text-sm'}`}>{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[#fafafa] dark:bg-[#111] transition-colors duration-300 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(168,85,247,0.03), transparent)'
        }} />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-medium text-slate-900 dark:text-white tracking-tight mb-4" style={{ fontFamily: 'system-ui, sans-serif' }}>
              Loved by Business Owners
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">Real results from real businesses</p>
          </div>

          <div className="max-w-4xl mx-auto relative mt-16 sm:mt-24 mb-12 sm:mb-20">
            {/* Wavy Background Path */}
            <svg className="absolute top-1/2 left-0 w-full h-32 -translate-y-1/2 text-slate-900/[0.05] dark:text-white/[0.05] pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1000 100" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 6">
              <path d="M-100,50 Q250,0 500,50 T1100,50" />
            </svg>
            
            {/* Avatars */}
            <div className="relative flex items-center justify-center gap-12 sm:gap-24 lg:gap-32 h-32">
              {testimonials.map((t, i) => {
                const isActive = activeIndex === i;
                const yOffset = i === 1 ? 20 : -20;
                
                return (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className="relative z-10 transition-all duration-500"
                    style={{ transform: `translateY(${yOffset}px)` }}
                  >
                    <div className={`rounded-full p-1 transition-all duration-500 ${isActive ? 'border-2 border-rose-500/80 scale-125' : 'border border-transparent opacity-50 hover:opacity-100 hover:scale-110 scale-100'}`}>
                      <img src={t.image} alt={t.name} className="w-14 h-14 sm:w-20 sm:h-20 rounded-full object-cover shadow-2xl" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Testimonial Content */}
          <div className="flex items-center gap-4 sm:gap-8 max-w-3xl mx-auto relative z-20">
            <button 
              onClick={() => setActiveIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1))}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-slate-200 dark:border-white/[0.08] flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.05] transition-colors shrink-0"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="flex-1 min-h-[160px] flex flex-col justify-center items-center text-center">
              <p className="text-lg sm:text-2xl text-slate-700 dark:text-slate-200 leading-relaxed font-light mb-8 transition-opacity duration-300">
                &ldquo;{testimonials[activeIndex].text}&rdquo;
              </p>
              <div>
                <p className="text-slate-900 dark:text-white font-medium mb-1">{testimonials[activeIndex].name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{testimonials[activeIndex].role}</p>
              </div>
            </div>

            <button 
              onClick={() => setActiveIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1))}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-slate-200 dark:border-white/[0.08] flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.05] transition-colors shrink-0"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Case Studies & Stats (Redesigned) */}
      <section className="py-24 bg-[#fafafa] dark:bg-[#111] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Top Part: Stats */}
          <div className="flex flex-col md:flex-row gap-16 md:gap-8 mb-24">
            {/* Left */}
            <div className="flex-1 md:pr-12">
              <h2 className="text-4xl sm:text-5xl font-medium text-slate-900 dark:text-white tracking-tight mb-6" style={{ fontFamily: 'system-ui, sans-serif' }}>
                Real Results,<br/>Real Numbers
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed mb-10 max-w-md">
                Case studies from businesses using our automations.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full font-medium text-sm hover:scale-105 transition-transform">
                  Get in touch
                </button>
                <button className="px-6 py-2.5 bg-transparent border border-slate-300 dark:border-white/[0.2] text-slate-900 dark:text-white rounded-full font-medium text-sm hover:bg-slate-100 dark:hover:bg-white/[0.05] transition-colors">
                  Case studies
                </button>
              </div>
            </div>
            
            {/* Right Stats */}
            <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-12">
              {[
                { value: '500+', label: 'Happy Customers' },
                { value: '1,200+', label: 'Automations Sold' },
                { value: '₹2Cr+', label: 'Saved for Clients' },
                { value: '99%', label: 'Success Rate' },
              ].map((stat, i) => (
                <div key={i} className="border-t border-slate-300 dark:border-white/[0.2] pt-6 flex flex-col justify-between h-full">
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{stat.label}</p>
                  </div>
                  <p className="text-5xl sm:text-[3.5rem] font-normal text-slate-900 dark:text-white mt-8 tracking-tighter" style={{ fontFamily: 'system-ui, sans-serif' }}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Part: Case Studies */}
          <div className="border-t border-slate-200 dark:border-white/[0.08] pt-16">
            <h3 className="text-2xl font-medium text-slate-900 dark:text-white mb-12" style={{ fontFamily: 'system-ui, sans-serif' }}>
              Trusted by great companies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {caseStudies.map((cs, i) => (
                <div key={i} className="border-t border-slate-300 dark:border-white/[0.2] pt-6 flex flex-col h-full group cursor-pointer">
                  <p className="text-sm font-medium text-slate-900 dark:text-white mb-8 min-h-[40px] leading-relaxed pr-4">
                    {cs.label} for {cs.company}
                  </p>
                  <p className="text-[3.5rem] sm:text-[4rem] font-normal text-slate-900 dark:text-white mb-4 tracking-tighter" style={{ fontFamily: 'system-ui, sans-serif' }}>
                    {cs.metric}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-12 flex-1 pr-4">
                    {cs.description}
                  </p>
                  <div className="mt-auto">
                    <span className="text-sm font-medium text-slate-900 dark:text-white underline underline-offset-4 decoration-slate-300 dark:decoration-slate-600 group-hover:decoration-slate-900 dark:group-hover:decoration-white transition-colors">
                      Read Case Study
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
