'use client';

import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

const tiers = [
  {
    name: 'Self-Service API Key',
    tier: 'Tier 1',
    description: 'Get an API key, connect it yourself with our docs and email support.',
    priceRange: '₹499 – ₹4,999/mo',
    features: [
      'API key access',
      'Full documentation',
      'Email support',
      'Auto-updates',
      'Usage dashboard',
    ],
    highlight: false,
    cta: 'Get Started',
  },
  {
    name: 'Done-With-You Setup',
    tier: 'Tier 2',
    description: 'Everything in Tier 1 plus a live 30-minute video call to walk you through setup.',
    priceRange: '₹2,000 – ₹5,000 one-time + monthly plan',
    features: [
      'Everything in Tier 1',
      '30-min video call setup',
      'Live configuration help',
      'Priority support (48hr)',
      'Custom settings walkthrough',
    ],
    highlight: true,
    cta: 'Book a Call',
  },
  {
    name: 'Done-For-You Installation',
    tier: 'Tier 3',
    description: 'We access your accounts, set everything up, test it, document it, and hand over a working system.',
    priceRange: '₹5,000 – ₹15,000 one-time + monthly plan',
    features: [
      'Everything in Tier 2',
      'Full hands-on installation',
      'Account configuration',
      'End-to-end testing',
      'Dedicated support (24hr)',
      'Custom documentation',
    ],
    highlight: false,
    cta: 'Contact Sales',
  },
];

const categoryPricing = [
  {
    category: 'Simple Automations',
    examples: 'Email auto-responders, form data loggers, notification bots',
    hosted: '₹499/mo',
    oneTime: '₹2,999',
    setup: '—',
  },
  {
    category: 'Standard Automations',
    examples: 'WhatsApp bots, invoice processors, social media schedulers',
    hosted: '₹1,499/mo',
    oneTime: '₹5,999',
    setup: '₹3,000',
  },
  {
    category: 'Advanced Automations',
    examples: 'AI support bots, multi-platform sync, business workflows',
    hosted: '₹2,999/mo',
    oneTime: '₹9,999',
    setup: '₹7,000',
  },
  {
    category: 'Enterprise Automations',
    examples: 'ERP integrations, multi-department workflows, custom AI',
    hosted: '₹4,999/mo',
    oneTime: '₹19,999',
    setup: '₹15,000',
  },
];

export default function PricingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Hero */}
      <section className="relative pt-24 pb-16 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-full text-xs font-medium text-slate-400 mb-6">
            Flexible Pricing
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-[Space_Grotesk]">
            Choose How You Want{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Your Automation
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Buy once and own forever, subscribe for managed hosting, or let us install it for you. 
            Pick what works for your business.
          </p>
        </div>
      </section>

      {/* Tiers */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl p-8 border transition-all ${
                tier.highlight
                  ? 'bg-gradient-to-b from-purple-500/[0.08] to-transparent border-purple-500/20 shadow-lg shadow-purple-500/5'
                  : 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.12]'
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xs font-bold text-white">
                  Most Popular
                </div>
              )}
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">{tier.tier}</div>
              <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
              <p className="text-sm text-slate-400 mb-4 min-h-[48px]">{tier.description}</p>
              <div className="text-lg font-bold text-white mb-6 font-[Space_Grotesk]">{tier.priceRange}</div>
              <ul className="space-y-3 mb-8">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => router.push('/marketplace')}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                  tier.highlight
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-400 hover:to-pink-400 shadow-lg shadow-purple-500/20'
                    : 'bg-white/[0.05] text-white border border-white/[0.08] hover:bg-white/[0.1]'
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Category Pricing Table */}
      <section className="px-4 pb-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-2 text-center font-[Space_Grotesk]">Pricing by Category</h2>
          <p className="text-slate-400 text-center mb-10">Detailed pricing across automation complexity levels</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left py-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                  <th className="text-center py-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Hosted API</th>
                  <th className="text-center py-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">One-Time (ZIP)</th>
                  <th className="text-center py-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">DFY Setup</th>
                </tr>
              </thead>
              <tbody>
                {categoryPricing.map((row) => (
                  <tr key={row.category} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4">
                      <div className="text-sm font-medium text-white">{row.category}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{row.examples}</div>
                    </td>
                    <td className="text-center py-4 px-4 text-sm font-semibold text-cyan-400">{row.hosted}</td>
                    <td className="text-center py-4 px-4 text-sm font-medium text-white">{row.oneTime}</td>
                    <td className="text-center py-4 px-4 text-sm font-medium text-purple-400">{row.setup}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
