import { Zap, Mail, Phone, MapPin, ArrowUpRight, Globe, MessageSquare, Briefcase } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Footer() {
  const { setCurrentPage } = useStore();

  return (
    <footer className="bg-[#0a0a0f] border-t border-white/[0.04]">
      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="relative overflow-hidden rounded-3xl p-10 sm:p-16 text-center">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-600/10 to-purple-500/10" />
          <div className="absolute inset-0 dot-grid opacity-20" />
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]" />

          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-[Space_Grotesk]">
              Can&apos;t Find What You Need?
            </h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
              Tell us what you want automated and we&apos;ll build it for you. Custom automations starting at ₹9,999.
            </p>
            <button
              onClick={() => setCurrentPage('custom-request')}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/15 flex items-center gap-2 mx-auto"
            >
              Request Custom Automation <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 py-12 border-t border-white/[0.04]">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg blur-[2px] opacity-80" />
                <div className="relative w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
              </div>
              <span className="text-lg font-bold text-white font-[Space_Grotesk]">AutomateStore</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              India&apos;s #1 marketplace for pre-built AI automations. Buy, deploy, and scale — in minutes.
            </p>
            <div className="space-y-2 text-sm text-slate-500">
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-slate-600" /> hello@automatestore.in</div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-slate-600" /> +91 98765 43210</div>
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-600" /> Mumbai, India</div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">Marketplace</h4>
            <ul className="space-y-2.5 text-sm text-slate-500">
              {['All Automations', 'Free Automations', 'Bestsellers', 'New Arrivals', 'Custom Order'].map(item => (
                <li key={item}>
                  <button onClick={() => setCurrentPage('marketplace')} className="hover:text-cyan-400 transition-colors flex items-center gap-1 group">
                    {item} <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">Categories</h4>
            <ul className="space-y-2.5 text-sm text-slate-500">
              {['WhatsApp Bots', 'Email Automation', 'CRM & Sales', 'E-Commerce', 'Marketing'].map(item => (
                <li key={item}>
                  <button onClick={() => setCurrentPage('marketplace')} className="hover:text-cyan-400 transition-colors flex items-center gap-1 group">
                    {item} <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm text-slate-500">
              {['About Us', 'Sell on AutomateStore', 'Affiliate Program', 'Blog', 'Contact'].map(item => (
                <li key={item}>
                  <button className="hover:text-cyan-400 transition-colors flex items-center gap-1 group">
                    {item} <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3 mt-6">
              {[Globe, MessageSquare, Briefcase].map((Icon, i) => (
                <button key={i} className="w-9 h-9 glass rounded-lg flex items-center justify-center text-slate-500 hover:text-cyan-400 hover:border-cyan-500/20 transition-all">
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
          <p>© 2025 AutomateStore by Devesh & Vineet. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button className="hover:text-slate-400 transition-colors">Privacy Policy</button>
            <button className="hover:text-slate-400 transition-colors">Terms of Service</button>
            <button className="hover:text-slate-400 transition-colors">Refund Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
