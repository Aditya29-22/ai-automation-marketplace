import {  FlameIcon as Flame, ZapIcon as Zap  } from '../lib/icons';
import { ArrowUpRight, Gift } from 'lucide-react';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import { useStore } from '../store/useStore';

export default function FeaturedSection() {
  const { setCurrentPage } = useStore();
  const featured = products.filter(p => p.isBestseller);
  const freeProducts = products.filter(p => p.isFree);
  const newProducts = products.filter(p => p.isNew);

  return (
    <>
      {/* Bestsellers */}
      <section className="py-20 bg-[#0a0a0f] relative border-t border-white/[0.04]">
        <div className="absolute inset-0 aurora-bg opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Flame className="w-4 h-4 text-white" />
                <span className="text-[11px] font-mono font-bold text-white uppercase tracking-widest">Most Popular</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight">
                Bestselling Automations
              </h2>
            </div>
            <button
              onClick={() => setCurrentPage('marketplace')}
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-white hover:text-slate-300 transition-all group"
            >
              View All <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Free Section */}
      <section className="py-20 bg-[#0a0a0f] relative border-t border-white/[0.04]">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(255,255,255,0.02), transparent)'
        }} />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Gift className="w-4 h-4 text-white" />
                <span className="text-[11px] font-mono font-bold text-white uppercase tracking-widest">No Cost</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight">
                Free Automations
              </h2>
              <p className="text-slate-400 mt-2 text-lg">Start automating without spending a single rupee.</p>
            </div>
            <button
              onClick={() => { setCurrentPage('free'); }}
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-white hover:text-slate-300 transition-all group"
            >
              See All Free <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {freeProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 bg-[#0a0a0f] relative border-t border-white/[0.04]">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 60% 40% at 70% 30%, rgba(255,255,255,0.02), transparent)'
        }} />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-white" />
                <span className="text-[11px] font-mono font-bold text-white uppercase tracking-widest">Just Added</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight">
                New Arrivals
              </h2>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
