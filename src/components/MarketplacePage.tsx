import { useState } from 'react';
import {  SlidersHorizontalIcon as SlidersHorizontal  } from '../lib/icons';
import { Filter, X, Workflow, Network, FileJson, MessageSquare, Database, Bot, Table, Code2 } from 'lucide-react';

const toolIcons: Record<string, React.ReactNode> = {
  n8n: <Network className="w-[14px] h-[14px]" />,
  zapier: <Workflow className="w-[14px] h-[14px]" />,
  make: <Network className="w-[14px] h-[14px]" />,
  python: <Code2 className="w-[14px] h-[14px]" />,
  gpt: <Bot className="w-[14px] h-[14px]" />,
  sheets: <Table className="w-[14px] h-[14px]" />,
  notion: <Database className="w-[14px] h-[14px]" />,
  slack: <MessageSquare className="w-[14px] h-[14px]" />,
  webhook: <FileJson className="w-[14px] h-[14px]" />,
  airtable: <Database className="w-[14px] h-[14px]" />,
};
import ProductCard from './ProductCard';
import { products, categories, tools as allTools } from '../data/products';
import { useStore } from '../store/useStore';

export default function MarketplacePage() {
  const {
    searchQuery, selectedCategory, setSelectedCategory,
    selectedTools, toggleTool, selectedComplexity, setSelectedComplexity,
    showFreeOnly, setShowFreeOnly, sortBy, setSortBy,
  } = useStore();

  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 9;

  let filtered = products.filter(p => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.description.toLowerCase().includes(q) && !p.category.toLowerCase().includes(q) && !p.subcategory.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (selectedCategory && p.category !== selectedCategory) return false;
    if (selectedTools.length > 0 && !selectedTools.some(t => p.tools.includes(t))) return false;
    if (selectedComplexity && p.complexity !== selectedComplexity) return false;
    if (showFreeOnly && !p.isFree) return false;
    return true;
  });

  switch (sortBy) {
    case 'price-low': filtered.sort((a, b) => a.price - b.price); break;
    case 'price-high': filtered.sort((a, b) => b.price - a.price); break;
    case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
    case 'newest': filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
    default: filtered.sort((a, b) => b.reviewCount - a.reviewCount);
  }

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const clearFilters = () => {
    setSelectedCategory(null);
    selectedTools.forEach(t => toggleTool(t));
    setSelectedComplexity(null);
    setShowFreeOnly(false);
  };

  const hasFilters = selectedCategory || selectedTools.length > 0 || selectedComplexity || showFreeOnly;

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-[Space_Grotesk]">
              {selectedCategory ? categories.find(c => c.id === selectedCategory)?.name : 'All Automations'}
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">{filtered.length} automations found</p>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm font-medium text-slate-300 hover:bg-white/[0.06] transition-all">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {hasFilters && <span className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />}
            </button>

            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-slate-300 focus:outline-none focus:border-cyan-500/30 appearance-none cursor-pointer pr-8"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3E%3Cpath stroke=\'%2364748b\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'m6 8 4 4 4-4\'/%3E%3C/svg%3E")', backgroundPosition: 'right 8px center', backgroundRepeat: 'no-repeat', backgroundSize: '20px' }}>
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Filters sidebar */}
          <aside className={`${showFilters ? 'fixed inset-0 z-50 bg-black/60 lg:static lg:bg-transparent' : 'hidden lg:block'} lg:w-64 shrink-0`}>
            <div className={`${showFilters ? 'absolute right-0 top-0 h-full w-80 bg-[#0a0a0f] shadow-2xl shadow-black/50 overflow-y-auto animate-slide-in-right border-l border-white/[0.04]' : ''} lg:static lg:shadow-none lg:rounded-2xl lg:border lg:border-white/[0.04] lg:bg-white/[0.02]`}>
              <div className="p-5">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <Filter className="w-4 h-4 text-pink-500" /> Filters
                  </h3>
                  <div className="flex items-center gap-2">
                    {hasFilters && <button onClick={clearFilters} className="text-xs text-pink-500 hover:text-pink-400 transition-colors">Clear all</button>}
                    <button onClick={() => setShowFilters(false)} className="lg:hidden p-1 hover:bg-white/[0.03] rounded text-slate-500"><X className="w-4 h-4" /></button>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">Category</h4>
                  <div className="space-y-0.5 max-h-52 overflow-y-auto">
                    {categories.map(cat => (
                      <button key={cat.id}
                        onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedCategory === cat.id ? 'bg-white/[0.08] text-white font-medium border border-white/[0.2]' : 'text-slate-400 hover:bg-white/[0.03] hover:text-slate-200'
                        }`}>
                        <span className="text-base">{cat.icon}</span>
                        <span className="flex-1 text-left">{cat.name}</span>
                        <span className="text-[10px] text-slate-600 font-mono">{cat.count}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">Tools</h4>
                  <div className="space-y-1.5">
                    {allTools.slice(0, 6).map(tool => (
                      <label key={tool.id} className="flex items-center gap-2 cursor-pointer group">
                        <div className="relative flex items-center justify-center">
                          <input 
                            type="checkbox" 
                            checked={selectedTools.includes(tool.id)} 
                            onChange={() => toggleTool(tool.id)}
                            className="appearance-none w-5 h-5 bg-[#171717] rounded-full shadow-[inset_2px_5px_10px_rgb(5,5,5)] transition-all duration-[400ms] ease-in-out cursor-pointer hover:scale-110 hover:shadow-none checked:shadow-none checked:border checked:border-white peer"
                          />
                          <div className="pointer-events-none absolute w-[6px] h-[6px] rounded-[10px] bg-white scale-0 transition-all duration-[400ms] ease-in-out peer-checked:scale-100 peer-checked:rotate-[360deg]" />
                        </div>
                        <span className="shrink-0 ml-2 mr-1 flex items-center justify-center transition-colors drop-shadow-md" style={{ color: tool.color }}>
                          {toolIcons[tool.id]}
                        </span>
                        <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">{tool.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">Complexity</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Beginner', 'Intermediate', 'Advanced'].map(c => (
                      <button key={c} onClick={() => setSelectedComplexity(selectedComplexity === c ? null : c)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                          selectedComplexity === c ? 'bg-white/[0.08] border-white/[0.2] text-white' : 'border-white/[0.06] text-slate-400 hover:border-white/[0.1]'
                        }`}>
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div className={`relative w-10 h-5 rounded-full transition-colors ${showFreeOnly ? 'bg-emerald-500' : 'bg-slate-700'}`}
                      onClick={() => setShowFreeOnly(!showFreeOnly)}>
                      <div className={`absolute top-[2px] w-[18px] h-[18px] bg-white rounded-full shadow transition-transform ${showFreeOnly ? 'translate-x-5' : 'translate-x-0.5'}`} />
                    </div>
                    <span className="text-sm text-slate-400">Free only</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Product grid */}
          <main className="flex-1">
            {hasFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {selectedCategory && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/[0.08] text-white text-xs font-medium rounded-lg border border-white/[0.2]">
                    {categories.find(c => c.id === selectedCategory)?.name}
                    <button onClick={() => setSelectedCategory(null)} className="ml-1 hover:text-slate-300"><X className="w-3 h-3" /></button>
                  </span>
                )}
                {selectedTools.map(t => (
                  <span key={t} className="inline-flex items-center gap-1 px-3 py-1 bg-white/[0.08] text-white text-xs font-medium rounded-lg border border-white/[0.2]">
                    {allTools.find(tool => tool.id === t)?.name}
                    <button onClick={() => toggleTool(t)} className="ml-1 hover:text-slate-300"><X className="w-3 h-3" /></button>
                  </span>
                ))}
                {selectedComplexity && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/[0.08] text-white text-xs font-medium rounded-lg border border-white/[0.2]">
                    {selectedComplexity}
                    <button onClick={() => setSelectedComplexity(null)} className="ml-1 hover:text-slate-300"><X className="w-3 h-3" /></button>
                  </span>
                )}
                {showFreeOnly && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/[0.08] text-white text-xs font-medium rounded-lg border border-white/[0.2]">
                    Free only
                    <button onClick={() => setShowFreeOnly(false)} className="ml-1 hover:text-slate-300"><X className="w-3 h-3" /></button>
                  </span>
                )}
              </div>
            )}

            {paginated.length === 0 ? (
              <div className="text-center py-20">
                <div 
                  className="w-16 h-16 mx-auto mb-6 flex items-center justify-center overflow-hidden pointer-events-none"
                  style={{
                    maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='m21 21-4.3-4.3'/%3E%3C/svg%3E")`,
                    maskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='m21 21-4.3-4.3'/%3E%3C/svg%3E")`,
                    WebkitMaskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                  }}
                >
                  <div 
                    className="w-[200%] aspect-square bg-[conic-gradient(from_0deg,#ec4899,#ef4444,#a855f7,#ec4899)]"
                    style={{ animation: 'spin-center 4s linear infinite' }}
                  />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No automations found</h3>
                <p className="text-sm text-slate-500 mb-4">Try adjusting your filters or search query</p>
                <button onClick={clearFilters} className="relative px-5 py-2.5 text-white text-sm font-medium rounded-xl shadow-lg overflow-hidden group/btn mx-auto">
                  <div className="absolute inset-0 -z-10">
                    <div 
                      className="absolute top-1/2 left-1/2 w-[300%] aspect-square bg-[conic-gradient(from_0deg,#ec4899,#ef4444,#a855f7,#ec4899)]"
                      style={{ animation: 'spin-center 4s linear infinite' }}
                    />
                  </div>
                  <div className="absolute inset-[1px] bg-[#0a0a0f] rounded-[11px] -z-10 transition-colors group-hover/btn:bg-white/5" />
                  <span className="relative z-10">Clear all filters</span>
                </button>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {paginated.map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} />
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button key={i} onClick={() => setPage(i + 1)}
                        className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${
                          page === i + 1 ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg' : 'bg-white/[0.03] border border-white/[0.06] text-slate-400 hover:bg-white/[0.06]'
                        }`}>
                        {i + 1}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
