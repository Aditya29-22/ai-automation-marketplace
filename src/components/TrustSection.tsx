import { Shield, Zap, Clock, BadgeCheck, RefreshCcw, Headphones, Star, Quote, TrendingUp, Users, Award } from 'lucide-react';

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
  return (
    <>
      {/* Trust Badges */}
      <section className="py-24 bg-[#0a0a0f] relative">
        <div className="absolute inset-0 aurora-bg" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-[0.2em] mb-3 block">Trust</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-[Space_Grotesk] mb-3">
              Why 500+ Businesses Trust Us
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto">Every automation is verified, tested, and backed by our guarantee</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {trustFeatures.map((item, i) => (
              <div
                key={i}
                className={`group p-6 glass-card rounded-2xl hover:border-${item.color}-500/20 transition-all duration-500 animate-fade-in-up opacity-0 stagger-${Math.min(i + 1, 6)}`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${
                  item.color === 'cyan' ? 'bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20' :
                  item.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20' :
                  item.color === 'amber' ? 'bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20' :
                  item.color === 'purple' ? 'bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20' :
                  item.color === 'pink' ? 'bg-pink-500/10 text-pink-400 group-hover:bg-pink-500/20' :
                  'bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20'
                }`}>
                  {item.icon}
                </div>
                <h3 className="text-base font-semibold text-white mb-1.5">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[#0a0a0f] relative">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 60% 50% at 30% 50%, rgba(168,85,247,0.03), transparent)'
        }} />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[11px] font-mono text-purple-400 uppercase tracking-[0.2em] mb-3 block">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-[Space_Grotesk] mb-3">
              Loved by Business Owners
            </h2>
            <p className="text-slate-500">Real results from real businesses</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="relative p-6 glass rounded-2xl border border-white/[0.04] hover:border-white/[0.08] transition-all duration-300 animate-fade-in-up opacity-0 stagger-${i + 1}"
              >
                <Quote className="absolute top-4 right-4 w-8 h-8 text-cyan-500/10" />
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-white/[0.06]" />
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24 bg-[#0a0a0f] relative overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,212,255,0.03), transparent)'
        }} />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-[0.2em] mb-3 block">Results</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-[Space_Grotesk] mb-3">
              Real Results, Real Numbers
            </h2>
            <p className="text-slate-500">Case studies from businesses using our automations</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.map((cs, i) => (
              <div
                key={i}
                className="p-6 glass rounded-2xl border border-white/[0.04] hover:border-cyan-500/10 transition-all duration-300 group"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-medium px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/10">{cs.industry}</span>
                  <span className="text-xs text-slate-600">{cs.company}</span>
                </div>
                <p className="text-4xl font-extrabold gradient-text mb-1 font-[Space_Grotesk]">{cs.metric}</p>
                <p className="text-sm font-medium text-white mb-2">{cs.label}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{cs.description}</p>
              </div>
            ))}
          </div>

          {/* Stats bar */}
          <div className="mt-16 text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-6 sm:gap-0 px-6 sm:px-8 py-5 glass rounded-2xl border border-white/[0.04]">
              {[
                { icon: <Users className="w-4 h-4" />, value: '500+', label: 'Happy Customers', color: 'cyan' },
                { icon: <TrendingUp className="w-4 h-4" />, value: '1,200+', label: 'Automations Sold', color: 'purple' },
                { icon: <Award className="w-4 h-4" />, value: '₹2Cr+', label: 'Saved for Clients', color: 'emerald' },
              ].map((stat, i) => (
                <div key={i} className={`flex items-center gap-4 ${i > 0 ? 'sm:border-l sm:border-white/[0.06] sm:pl-8' : ''}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    stat.color === 'cyan' ? 'bg-cyan-500/10 text-cyan-400' :
                    stat.color === 'purple' ? 'bg-purple-500/10 text-purple-400' :
                    'bg-emerald-500/10 text-emerald-400'
                  }`}>
                    {stat.icon}
                  </div>
                  <div className="text-left">
                    <p className="text-xl sm:text-2xl font-extrabold text-white font-[Space_Grotesk]">{stat.value}</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">{stat.label}</p>
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
