import { useState } from 'react';
import { Send, CheckCircle, Zap, Clock, Shield, Sparkles } from 'lucide-react';

export default function CustomRequestPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', business: '', description: '', budget: '', timeline: '', tools: '' });

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4">
        <div className="glass rounded-3xl border border-white/[0.04] p-12 text-center max-w-lg animate-fade-in-scale">
          <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
            <CheckCircle className="w-10 h-10 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2 font-[Space_Grotesk]">Request Submitted!</h1>
          <p className="text-slate-500 mb-2">We&apos;ll review your requirements and get back within 24 hours.</p>
          <p className="text-sm text-slate-600">Typical turnaround: 3-7 business days</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/5 border border-amber-500/10 rounded-full text-xs font-medium text-amber-400 mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Custom Automation Service
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white font-[Space_Grotesk] mb-3">
            Can&apos;t Find It? We&apos;ll Build It.
          </h1>
          <p className="text-slate-500 max-w-lg mx-auto">
            Tell us what you want automated and our team will build a custom solution tailored to your business.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <div className="glass rounded-2xl border border-white/[0.04] p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-white mb-6">Tell Us About Your Project</h2>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Your Name *</label>
                    <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/30" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Email *</label>
                    <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/30" placeholder="john@company.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Business / Company</label>
                  <input type="text" value={form.business} onChange={e => setForm(f => ({ ...f, business: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/30" placeholder="Your company name" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">What do you want to automate? *</label>
                  <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={5}
                    className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/30 resize-none"
                    placeholder="Describe your current workflow and what you'd like automated. The more details, the better our estimate." />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Budget Range</label>
                    <select value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500/30 appearance-none">
                      <option value="" className="bg-[#111118]">Select budget</option>
                      <option value="9999-19999" className="bg-[#111118]">₹9,999 - ₹19,999</option>
                      <option value="20000-49999" className="bg-[#111118]">₹20,000 - ₹49,999</option>
                      <option value="50000-99999" className="bg-[#111118]">₹50,000 - ₹99,999</option>
                      <option value="100000+" className="bg-[#111118]">₹1,00,000+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Timeline</label>
                    <select value={form.timeline} onChange={e => setForm(f => ({ ...f, timeline: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500/30 appearance-none">
                      <option value="" className="bg-[#111118]">Select timeline</option>
                      <option value="asap" className="bg-[#111118]">ASAP (3-5 days)</option>
                      <option value="week" className="bg-[#111118]">Within a week</option>
                      <option value="2weeks" className="bg-[#111118]">2 weeks</option>
                      <option value="month" className="bg-[#111118]">1 month</option>
                      <option value="flexible" className="bg-[#111118]">Flexible</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Preferred Tools (optional)</label>
                  <input type="text" value={form.tools} onChange={e => setForm(f => ({ ...f, tools: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/30" placeholder="e.g., n8n, Zapier, Make, Python" />
                </div>
                <button onClick={() => setSubmitted(true)}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/10">
                  <Send className="w-4 h-4" /> Submit Request
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="glass rounded-2xl border border-white/[0.04] p-6">
              <h3 className="text-base font-semibold text-white mb-4">How It Works</h3>
              <div className="space-y-4">
                {[
                  { step: '1', title: 'Submit your request', desc: 'Tell us what you need automated' },
                  { step: '2', title: 'Get a quote', desc: 'We\'ll estimate cost and timeline within 24hrs' },
                  { step: '3', title: 'We build it', desc: 'Our team creates and tests the automation' },
                  { step: '4', title: 'You deploy', desc: 'Get the complete package with documentation' },
                ].map(item => (
                  <div key={item.step} className="flex gap-3">
                    <div className="w-8 h-8 bg-cyan-500/10 text-cyan-400 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 border border-cyan-500/10">
                      {item.step}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{item.title}</p>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl border border-white/[0.04] p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl" />
              <h3 className="text-base font-semibold text-white mb-3 relative">Starting at ₹9,999</h3>
              <div className="space-y-2 relative">
                {[
                  { icon: <Zap className="w-4 h-4" />, text: 'Custom-built for your business' },
                  { icon: <Clock className="w-4 h-4" />, text: 'Delivered in 3-14 days' },
                  { icon: <Shield className="w-4 h-4" />, text: '30-day money-back guarantee' },
                  { icon: <CheckCircle className="w-4 h-4" />, text: 'Full documentation included' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-400">
                    <span className="text-cyan-400">{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl border border-white/[0.04] p-6">
              <h3 className="text-base font-semibold text-white mb-3">Maintenance Plans</h3>
              <p className="text-sm text-slate-500 mb-4">Keep your automations running smoothly with our maintenance plans.</p>
              <div className="space-y-2">
                {[
                  { tier: 'Basic', price: '₹999/mo', features: 'Bug fixes, API updates' },
                  { tier: 'Standard', price: '₹2,499/mo', features: 'Above + Priority support' },
                  { tier: 'Premium', price: '₹4,999/mo', features: 'Above + Modifications + SLA' },
                ].map(plan => (
                  <div key={plan.tier} className="flex items-center justify-between p-3 bg-white/[0.02] rounded-xl border border-white/[0.03]">
                    <div>
                      <p className="text-sm font-medium text-white">{plan.tier}</p>
                      <p className="text-[10px] text-slate-500">{plan.features}</p>
                    </div>
                    <span className="text-sm font-semibold text-cyan-400">{plan.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
