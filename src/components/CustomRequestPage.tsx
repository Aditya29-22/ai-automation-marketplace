import { useState, useEffect, useRef } from 'react';
import { Send, CheckCircle, Zap, Clock, Shield, Sparkles, X, ArrowUpRight, ChevronDown } from 'lucide-react';
import { COUNTRY_CODES } from '../data/countryCodes';

export default function CustomRequestPage({ isOpen, onClose }: { isOpen?: boolean, onClose?: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', business: '', phone: '', countryCode: '+91', countryIso: 'in', description: '', budget: '', timeline: '', tools: '' });
  const [isCountryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setCountryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/40 dark:bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#111] border border-slate-200 dark:border-white/[0.08] rounded-2xl shadow-2xl animate-fade-in-scale">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/[0.05] transition-colors z-10">
          <X className="w-5 h-5 text-slate-500 dark:text-slate-400" />
        </button>

        {submitted ? (
          <div className="p-16 text-center">
            <div className="w-20 h-20 bg-slate-100 dark:bg-white/[0.05] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-slate-900 dark:text-white" />
            </div>
            <h2 className="text-3xl font-medium text-slate-900 dark:text-white mb-2" style={{ fontFamily: 'system-ui, sans-serif' }}>Request Submitted</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">We'll review your requirements and get back within 24 hours. Typical turnaround: 3-7 business days.</p>
            <button onClick={onClose} className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full font-medium text-sm hover:scale-105 transition-transform">
              Close Window
            </button>
          </div>
        ) : (
          <div className="p-8 sm:p-12">
            <div className="text-center mb-12">
              <div className="relative inline-flex overflow-hidden rounded-full p-[1px] mb-6">
                <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_50%,#000_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_50%,#fff_100%)]" />
                <div className="relative inline-flex items-center justify-center px-4 py-1.5 bg-slate-50 dark:bg-[#151515] rounded-full text-xs font-medium text-slate-900 dark:text-white">
                  Custom Automation Service
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl font-medium text-slate-900 dark:text-white mb-4" style={{ fontFamily: 'system-ui, sans-serif' }}>
                Can&apos;t Find It? We&apos;ll Build It.
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
                Tell us what you want automated and our team will build a custom solution tailored to your business.
              </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-12">
              <div className="lg:col-span-3">
                <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-8" style={{ fontFamily: 'system-ui, sans-serif' }}>Tell Us About Your Project</h3>
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Your Name *</label>
                      <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-[#151515] border border-slate-200 dark:border-white/[0.08] rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-slate-400 dark:focus:border-white/[0.2] transition-colors" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email *</label>
                      <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-[#151515] border border-slate-200 dark:border-white/[0.08] rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-slate-400 dark:focus:border-white/[0.2] transition-colors" placeholder="john@company.com" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Business / Company</label>
                      <input type="text" value={form.business} onChange={e => setForm(f => ({ ...f, business: e.target.value }))}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-[#151515] border border-slate-200 dark:border-white/[0.08] rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-slate-400 dark:focus:border-white/[0.2] transition-colors" placeholder="Your company name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Phone Number</label>
                      <div className="flex bg-slate-50 dark:bg-[#151515] border border-slate-200 dark:border-white/[0.08] rounded-xl focus-within:border-slate-400 dark:focus-within:border-white/[0.2] transition-colors relative" ref={countryDropdownRef}>
                        <button 
                          type="button"
                          onClick={() => setCountryDropdownOpen(!isCountryDropdownOpen)}
                          className="flex items-center gap-1.5 pl-3 pr-2 py-3 text-sm text-slate-900 dark:text-white focus:outline-none cursor-pointer border-r border-slate-200 dark:border-white/[0.08] hover:bg-slate-100 dark:hover:bg-white/[0.02] transition-colors rounded-l-xl shrink-0"
                        >
                          <img src={`https://flagcdn.com/w20/${form.countryIso}.png`} alt="" className="w-4 h-4 rounded-full object-cover shrink-0 border border-slate-200 dark:border-white/[0.1]" />
                          <span className="text-xs font-medium">{form.countryCode}</span>
                          <ChevronDown className="w-3 h-3 text-slate-400" />
                        </button>

                        {isCountryDropdownOpen && (
                          <div className="absolute top-[calc(100%+8px)] left-0 w-[280px] max-h-60 overflow-y-auto bg-white dark:bg-[#151515] border border-slate-200 dark:border-white/[0.08] rounded-xl shadow-xl z-[150] py-2">
                            {COUNTRY_CODES.sort((a, b) => a.name.localeCompare(b.name)).map(c => (
                              <button
                                key={c.iso + c.code}
                                type="button"
                                onClick={() => {
                                  setForm(f => ({ ...f, countryCode: c.code, countryIso: c.iso }));
                                  setCountryDropdownOpen(false);
                                }}
                                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-left hover:bg-slate-50 dark:hover:bg-white/[0.05] transition-colors"
                              >
                                <img src={`https://flagcdn.com/w20/${c.iso}.png`} alt="" className="w-4 h-4 rounded-full object-cover shrink-0 border border-slate-200 dark:border-white/[0.1]" />
                                <span className="text-slate-900 dark:text-white truncate flex-1">{c.name}</span>
                                <span className="text-slate-500 text-xs shrink-0 font-mono">{c.code}</span>
                              </button>
                            ))}
                          </div>
                        )}

                        <input type="tel" value={form.phone || ''} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                          className="w-full px-3 py-3 bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none rounded-r-xl min-w-0" placeholder="555-000-0000" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">What do you want to automate? *</label>
                    <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={5}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-[#151515] border border-slate-200 dark:border-white/[0.08] rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-slate-400 dark:focus:border-white/[0.2] resize-none transition-colors"
                      placeholder="Describe your current workflow and what you'd like automated. The more details, the better our estimate." />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Budget Range</label>
                      <select value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-[#151515] border border-slate-200 dark:border-white/[0.08] rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-slate-400 dark:focus:border-white/[0.2] transition-colors appearance-none">
                        <option value="">Select budget</option>
                        <option value="9999-19999">₹9,999 - ₹19,999</option>
                        <option value="20000-49999">₹20,000 - ₹49,999</option>
                        <option value="50000-99999">₹50,000 - ₹99,999</option>
                        <option value="100000+">₹1,00,000+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Timeline</label>
                      <select value={form.timeline} onChange={e => setForm(f => ({ ...f, timeline: e.target.value }))}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-[#151515] border border-slate-200 dark:border-white/[0.08] rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-slate-400 dark:focus:border-white/[0.2] transition-colors appearance-none">
                        <option value="">Select timeline</option>
                        <option value="asap">ASAP (3-5 days)</option>
                        <option value="week">Within a week</option>
                        <option value="2weeks">2 weeks</option>
                        <option value="month">1 month</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Preferred Tools (optional)</label>
                    <input type="text" value={form.tools} onChange={e => setForm(f => ({ ...f, tools: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-[#151515] border border-slate-200 dark:border-white/[0.08] rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-slate-400 dark:focus:border-white/[0.2] transition-colors" placeholder="e.g., n8n, Zapier, Make, Python" />
                  </div>
                  <button onClick={() => setSubmitted(true)}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 dark:bg-white text-white dark:text-black font-medium rounded-xl hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors mt-4 shadow-sm group">
                    Submit Request <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-8 lg:border-l lg:border-slate-200 dark:lg:border-white/[0.08] lg:pl-12 lg:sticky lg:top-0 h-fit">
                <div>
                  <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-6" style={{ fontFamily: 'system-ui, sans-serif' }}>How It Works</h3>
                  <div className="space-y-6">
                    {[
                      { step: '1', title: 'Submit your request', desc: 'Tell us what you need automated' },
                      { step: '2', title: 'Get a quote', desc: 'We\'ll estimate cost and timeline within 24hrs' },
                      { step: '3', title: 'We build it', desc: 'Our team creates and tests the automation' },
                      { step: '4', title: 'You deploy', desc: 'Get the complete package with documentation' },
                    ].map(item => (
                      <div key={item.step} className="flex gap-4">
                        <div className="w-8 h-8 rounded-full border border-slate-300 dark:border-white/[0.2] flex items-center justify-center text-xs font-medium text-slate-900 dark:text-white shrink-0">
                          {item.step}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">{item.title}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-200 dark:border-white/[0.08]">
                  <h3 className="text-2xl font-normal text-slate-900 dark:text-white mb-6 tracking-tight" style={{ fontFamily: 'system-ui, sans-serif' }}>Starting at ₹9,999</h3>
                  <div className="space-y-4 mb-8">
                    {[
                      { icon: <Zap className="w-4 h-4" />, text: 'Custom-built for your business' },
                      { icon: <Clock className="w-4 h-4" />, text: 'Delivered in 3-14 days' },
                      { icon: <Shield className="w-4 h-4" />, text: '30-day money-back guarantee' },
                      { icon: <CheckCircle className="w-4 h-4" />, text: 'Full documentation included' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                        <span className="text-slate-900 dark:text-white">{item.icon}</span>
                        {item.text}
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-6 border-t border-slate-200 dark:border-white/[0.08]">
                    <h3 className="text-base font-medium text-slate-900 dark:text-white mb-3" style={{ fontFamily: 'system-ui, sans-serif' }}>Maintenance Plans</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">Keep your automations running smoothly with our optional maintenance plans.</p>
                    <div className="space-y-3">
                      {[
                        { tier: 'Basic', price: '₹999/mo', features: 'Bug fixes, API updates' },
                        { tier: 'Standard', price: '₹2,499/mo', features: 'Above + Priority support' },
                        { tier: 'Premium', price: '₹4,999/mo', features: 'Above + Modifications + SLA' },
                      ].map(plan => (
                        <div key={plan.tier} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-[#151515] rounded-xl border border-slate-200 dark:border-white/[0.08]">
                          <div>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">{plan.tier}</p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{plan.features}</p>
                          </div>
                          <span className="text-sm font-medium text-slate-900 dark:text-white">{plan.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
