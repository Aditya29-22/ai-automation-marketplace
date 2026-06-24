import { useState, cloneElement, useEffect } from 'react';
import { StarIcon as Star, TrendingUpIcon as TrendingUp, UsersIcon as Users, ChevronLeftIcon as ChevronLeft, ChevronRightIcon as ChevronRight  } from '../lib/icons';
import { Quote, Award, ArrowUpRight, ArrowRight } from 'lucide-react';
import { CircleCheckBigIcon as BadgeCheck, ShieldCheckIcon as Shield, ZapIcon as Zap, RocketIcon as Clock, SparklesIcon as RefreshCcw, HeadphonesIcon as Headphones } from '@animateicons/react/lucide';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Founder, DigitalFirst Agency',
    avatar: 'RK',
    text: 'We replaced a ₹30,000/month tool with a ₹5,000 one-time automation. The ROI was insane — paid for itself on day one.',
    rating: 5,
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh&backgroundColor=b6e3f4',
  },
  {
    name: 'Priya Sharma',
    role: 'CEO, QuickCommerce',
    avatar: 'PS',
    text: 'Setup took 20 minutes. Now our order processing runs on autopilot. We handle 3x more orders with the same team.',
    rating: 5,
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya&backgroundColor=c0aede',
  },
  {
    name: 'Arjun Patel',
    role: 'Marketing Head, ScaleUp Inc',
    avatar: 'AP',
    text: 'The AI chatbot recommended exactly what we needed. Customer support response time dropped from 2 hours to 5 seconds.',
    rating: 5,
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun&backgroundColor=ffdfbf',
  },
];

const caseStudies = [
  {
    company: 'TechStartup.io',
    industry: 'SaaS',
    metric: '85%',
    label: 'Less manual work',
    description: 'Automated their entire onboarding flow, saving 20+ hours per week.',
    image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=300&w=400',
  },
  {
    company: 'FashionBrand Co',
    industry: 'E-Commerce',
    metric: '₹2.5L',
    label: 'Saved per month',
    description: 'Order processing, inventory sync, and customer notifications — fully automated.',
    image: 'https://images.pexels.com/photos/3184431/pexels-photo-3184431.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=300&w=400',
  },
  {
    company: 'ConsultFirm LLP',
    industry: 'Professional Services',
    metric: '3x',
    label: 'More clients served',
    description: 'Invoice generation, follow-ups, and reporting run without human intervention.',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=300&w=400',
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
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <>
      {/* Trust Badges */}
      <section className="py-24 bg-[#0a0a0f] relative border-t border-white/[0.04]">
        <div className="absolute inset-0 aurora-bg opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight mb-4 leading-tight">
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
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] z-0 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_280deg,#ec4899_320deg,#a855f7_360deg)] transition-opacity duration-500 ${isLarge ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                  
                  {/* Inner background mask */}
                  <div className={`absolute inset-[1px] z-0 rounded-[calc(1.5rem-1px)] transition-colors duration-500 ${isLarge ? 'bg-gradient-to-br from-[#0f0f13] to-[#050508]' : 'bg-[#0a0a0f]'}`} />

                  {/* Graphic */}
                  <div className="absolute -top-8 -right-8 w-40 h-[138px] opacity-30 transition-all duration-700 ease-out pointer-events-none z-0">
                    <div className="w-full h-full bg-[#1c1c1c] border border-white/[0.05] flex items-center justify-center shadow-2xl text-white pt-6 sm:pt-10" style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}>
                      {cloneElement(item.icon as React.ReactElement, { className: isLarge ? "w-20 h-20" : "w-12 h-12" })}
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="relative z-10 mt-auto">
                    <div className="flex items-center gap-3 mb-2 sm:mb-3">
                      <div className={`w-2 h-2 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)] ${isLarge ? 'bg-cyan-400' : 'bg-white/40'}`} />
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
      <section 
        className="py-24 bg-[#0a0a0f] border-t border-white/[0.04] relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(168,85,247,0.03), transparent)'
        }} />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight mb-4 leading-tight">
              Loved by Business Owners
            </h2>
            <p className="text-slate-400 text-lg">Real results from real businesses</p>
          </div>

          <div className="max-w-4xl mx-auto relative mt-16 sm:mt-24 mb-12 sm:mb-20">
            {/* Straight Background Path */}
            <svg className="absolute top-1/2 left-0 w-full h-32 -translate-y-1/2 text-white/[0.05] pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1000 100" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 6">
              <line x1="0" y1="50" x2="1000" y2="50" />
            </svg>
            
            {/* Avatars */}
            <div className="relative flex items-center justify-center gap-12 sm:gap-24 lg:gap-32 h-32">
              {testimonials.map((t, i) => {
                const isActive = activeIndex === i;
                
                return (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className="relative z-10 transition-all duration-500"
                  >
                    <div className={`rounded-full transition-all duration-500 ${isActive ? 'p-1 bg-gradient-to-tr from-yellow-400 via-red-500 to-fuchsia-600 scale-125' : 'p-1 border border-transparent opacity-50 hover:opacity-100 hover:scale-110 scale-100'}`}>
                      <div className={`rounded-full ${isActive ? 'bg-[#0a0a0f] p-[2px]' : ''}`}>
                        <img src={t.image} alt={t.name} className="w-14 h-14 sm:w-20 sm:h-20 rounded-full object-cover shadow-2xl" />
                      </div>
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
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors shrink-0"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="flex-1 min-h-[160px] flex flex-col justify-center items-center text-center">
              <p className="text-lg sm:text-2xl text-slate-200 leading-relaxed font-light mb-8 transition-opacity duration-300">
                &ldquo;{testimonials[activeIndex].text}&rdquo;
              </p>
              <div>
                <p className="text-white font-medium mb-1">{testimonials[activeIndex].name}</p>
                <p className="text-sm text-slate-400">{testimonials[activeIndex].role}</p>
              </div>
            </div>

            <button 
              onClick={() => setActiveIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1))}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors shrink-0"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </section>

    </>
  );
}
