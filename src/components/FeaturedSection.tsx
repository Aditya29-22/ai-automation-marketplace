import { ArrowRight, Flame, Gift, Zap } from 'lucide-react';
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
      <section className="py-20 bg-[#0a0a0f] relative">
        <div className="absolute inset-0 aurora-bg" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-4 h-4 text-amber-400" />
                <span className="text-[11px] font-mono text-amber-400 uppercase tracking-[0.2em]">Most Popular</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-[Space_Grotesk]">
                Bestselling Automations
              </h2>
            </div>
            <button
              onClick={() => setCurrentPage('marketplace')}
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-cyan-400 hover:text-cyan-300 hover:gap-2.5 transition-all group"
            >
              View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Free Section */}
      <section className="py-20 bg-[#0a0a0f] relative">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(16,185,129,0.04), transparent)'
        }} />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Gift className="w-4 h-4 text-emerald-400" />
                <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-[0.2em]">No Cost</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-[Space_Grotesk]">
                Free Automations
              </h2>
              <p className="text-slate-500 mt-1">Start automating without spending a single rupee</p>
            </div>
            <button
              onClick={() => { setCurrentPage('free'); }}
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-emerald-400 hover:text-emerald-300 hover:gap-2.5 transition-all group"
            >
              See All Free <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {freeProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 bg-[#0a0a0f] relative">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 60% 40% at 70% 30%, rgba(0,212,255,0.04), transparent)'
        }} />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-[0.2em]">Just Added</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-[Space_Grotesk]">
                New Arrivals
              </h2>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {newProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
