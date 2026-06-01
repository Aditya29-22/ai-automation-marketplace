import { categories } from '../data/products';
import { useStore } from '../store/useStore';

export default function CategoryGrid() {
  const { setSelectedCategory, setCurrentPage } = useStore();

  return (
    <section className="py-20 bg-[#0a0a0f] relative">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-[0.2em] mb-3 block">Explore</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-[Space_Grotesk] mb-3">
            Browse by Category
          </h2>
          <p className="text-slate-500">Find the perfect automation for every part of your business</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {categories.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => { setSelectedCategory(cat.id); setCurrentPage('marketplace'); }}
              className={`group flex flex-col items-center gap-2.5 p-4 glass-card rounded-2xl hover:border-cyan-500/20 transition-all duration-300 animate-fade-in-up opacity-0 stagger-${Math.min(i + 1, 8)}`}
            >
              <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{cat.icon}</span>
              <span className="text-xs font-medium text-slate-300 text-center leading-tight group-hover:text-cyan-400 transition-colors">{cat.name}</span>
              <span className="text-[10px] text-slate-600 bg-white/[0.03] px-2 py-0.5 rounded-full font-mono">{cat.count}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
