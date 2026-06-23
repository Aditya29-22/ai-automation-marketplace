import { Zap, Mail, Phone, MapPin, ArrowUpRight, Globe, MessageSquare, Briefcase } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useState, useEffect } from 'react';

export default function Footer() {
  const { setCurrentPage } = useStore();
  const [theme, setTheme] = useState('dark');

  const toggleTheme = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setTheme('dark');
    } else {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    }
  }, []);

  return (
    <footer className="bg-[#fafafa] dark:bg-[#151515] text-slate-900 dark:text-slate-100 transition-colors duration-300 border-t border-slate-200 dark:border-white/[0.08]">
      {/* CTA Section (Kept Original Content) */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="relative overflow-hidden rounded-3xl p-10 sm:p-16 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-600/10 to-purple-500/10 dark:from-cyan-500/5 dark:via-blue-600/5 dark:to-purple-500/5" />
          <div className="absolute inset-0 dot-grid opacity-20 dark:opacity-10" />
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]" />

          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-[Space_Grotesk]">
              Can&apos;t Find What You Need?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-lg mx-auto">
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

      <div className="border-t border-slate-200 dark:border-white/[0.08]">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 py-16">
          
          {/* Logo Section */}
          <div className="mb-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border-[3px] border-slate-900 dark:border-white flex items-center justify-center p-1">
                <div className="w-full h-full bg-slate-900 dark:bg-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight">AutomateStore</span>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-8">
            {/* Column 1 */}
            <div className="flex flex-col">
              <h4 className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-6">Marketplace</h4>
              <ul className="space-y-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                {['All Automations', 'Free Automations', 'Bestsellers', 'New Arrivals', 'Custom Order'].map(item => (
                  <li key={item}>
                    <button onClick={() => setCurrentPage('marketplace')} className="hover:text-black dark:hover:text-white transition-colors w-full text-left">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col">
              <h4 className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-6">Categories</h4>
              <ul className="space-y-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                {['WhatsApp Bots', 'Email Automation', 'CRM & Sales', 'E-Commerce', 'Marketing'].map(item => (
                  <li key={item}>
                    <button onClick={() => setCurrentPage('marketplace')} className="hover:text-black dark:hover:text-white transition-colors w-full text-left">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col">
              <h4 className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-6">Company</h4>
              <ul className="space-y-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                {['About Us', 'Sell on AutomateStore', 'Affiliate Program', 'Blog', 'Contact'].map(item => (
                  <li key={item}>
                    <button className="hover:text-black dark:hover:text-white transition-colors w-full text-left">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 - Contact & Newsletter */}
            <div className="flex flex-col">
              <h4 className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-6">Contact & Newsletter</h4>
              <div className="space-y-4 text-sm font-medium text-slate-700 dark:text-slate-300 mb-6">
                <div className="flex items-center gap-2 hover:text-black dark:hover:text-white transition-colors cursor-pointer"><Mail className="w-4 h-4" /> hello@automatestore.in</div>
                <div className="flex items-center gap-2 hover:text-black dark:hover:text-white transition-colors cursor-pointer"><Phone className="w-4 h-4" /> +91 98765 43210</div>
                <div className="flex items-center gap-2 hover:text-black dark:hover:text-white transition-colors cursor-pointer"><MapPin className="w-4 h-4" /> Mumbai, India</div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 flex items-center bg-transparent border border-slate-300 dark:border-white/[0.2] px-3 py-1.5 rounded-sm">
                  <Mail className="w-4 h-4 text-slate-400 mr-2" />
                  <input 
                    type="email" 
                    placeholder="your@email.com" 
                    className="bg-transparent border-none outline-none text-sm w-full text-slate-900 dark:text-slate-100 placeholder:text-slate-500"
                  />
                </div>
                <button className="bg-slate-200 hover:bg-slate-300 dark:bg-white dark:hover:bg-gray-200 text-black px-3 py-1.5 rounded-sm flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Section */}
      <div className="border-t border-b border-slate-200 dark:border-white/[0.08] overflow-hidden bg-[#fafafa] dark:bg-[#151515]">
        <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center text-7xl md:text-[8.5rem] font-black tracking-[-0.05em] uppercase shrink-0 px-6 py-2 opacity-90 dark:opacity-100 text-slate-800 dark:text-white" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              AUTOMATE STORE <span className="mx-6 opacity-30">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Social Links */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-[13px] font-medium text-slate-700 dark:text-slate-300">
          <button className="flex items-center gap-2 hover:text-black dark:hover:text-white transition-colors">
            <Globe className="w-4 h-4" /> Website
          </button>
          <button className="flex items-center gap-2 hover:text-black dark:hover:text-white transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>
            Discord
          </button>
          <button className="flex items-center gap-2 hover:text-black dark:hover:text-white transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </button>
        </div>

        {/* Theme Toggle & Copyright */}
        <div className="flex flex-col md:flex-row items-center gap-6 text-[13px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-4">
            <p>© 2026 AutomateStore.</p>
            <button className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">Privacy</button>
            <button className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">Terms</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
