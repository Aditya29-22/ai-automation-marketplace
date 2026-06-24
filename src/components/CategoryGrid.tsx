import { categories } from '../data/products';
import { useStore } from '../store/useStore';

const colors = [
  '142, 249, 252', '142, 252, 204', '142, 252, 157', '215, 252, 142', '252, 252, 142', 
  '252, 208, 142', '252, 142, 142', '252, 142, 239', '204, 142, 252', '142, 202, 252',
  '236, 72, 153',  '168, 85, 247',  '59, 130, 246',  '16, 185, 129'
];

export default function CategoryGrid() {
  const { setSelectedCategory, setCurrentPage } = useStore();

  return (
    <section className="py-20 bg-[#0a0a0f] relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="relative max-w-7xl mx-auto px-4 mb-4">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Browse by Category
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Find the perfect automation for every part of your business
          </p>
        </div>
      </div>

      <div className="carousel-3d-wrapper">
        <div className="carousel-3d-inner" style={{ '--quantity': categories.length } as React.CSSProperties}>
          {categories.map((cat, i) => (
            <div
              key={cat.id}
              onClick={() => { setSelectedCategory(cat.id); setCurrentPage('marketplace'); }}
              className="carousel-3d-card"
              style={{ '--index': i, '--color-card': colors[i % colors.length] } as React.CSSProperties}
            >
              <span className="text-white font-semibold tracking-tight text-center text-lg leading-[1.1] mb-4 drop-shadow-md">{cat.name}</span>
              <span className="text-white bg-black/40 px-4 py-1.5 rounded-full font-mono font-bold tracking-tighter text-[13px] border border-white/10">{cat.count} items</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
