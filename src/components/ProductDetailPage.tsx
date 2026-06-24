import { useState } from 'react';
import {  StarIcon as Star, ShoppingCartIcon as ShoppingCart, HeartIcon as Heart, DownloadIcon as Download, PlayIcon as Play, HeadphonesIcon as Headphones  } from '../lib/icons';
import { Clock, CheckCircle, Shield, Package, FileText, Video, Calculator, ArrowLeft } from 'lucide-react';
import { useStore } from '../store/useStore';
import { products, tools as allTools } from '../data/products';

export default function ProductDetailPage() {
  const { selectedProductId, setCurrentPage, addToCart, cart, addToWishlist, removeFromWishlist, isInWishlist, setCartOpen } = useStore();
  const [activeTab, setActiveTab] = useState('description');
  const [roiInputs, setRoiInputs] = useState({ hours: 4, hourlyRate: 500, workdays: 22 });

  const product = products.find(p => p.id === selectedProductId);
  if (!product) return null;

  const inCart = cart.some(i => i.product.id === product.id);
  const wishlisted = isInWishlist(product.id);
  const discount = product.originalPrice > 0 ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  const roiSavings = roiInputs.hours * roiInputs.hourlyRate * roiInputs.workdays;
  const roiMultiple = product.price > 0 ? Math.round(roiSavings / product.price) : 0;

  const handleBuyNow = () => {
    addToCart(product);
    setCartOpen(true);
  };

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'whatyouget', label: 'What You Get' },
    { id: 'requirements', label: 'Requirements' },
    { id: 'reviews', label: `Reviews (${product.reviewCount})` },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <button onClick={() => setCurrentPage('marketplace')} className="flex items-center gap-2 text-sm text-slate-500 hover:text-cyan-400 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to marketplace
        </button>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left */}
          <div className="lg:col-span-3">
            <div className="relative glass rounded-2xl border border-white/[0.04] overflow-hidden mb-6">
              <img src={product.thumbnail} alt={product.name} className="w-full h-72 sm:h-96 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent flex items-end p-6">
                <button className="flex items-center gap-2 px-5 py-2.5 glass-strong rounded-xl text-sm font-semibold text-white hover:bg-white/[0.08] transition-colors shadow-lg">
                  <Play className="w-4 h-4 text-cyan-400" fill="currentColor" /> Watch Demo
                </button>
              </div>
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {product.isVerified && (
                  <span className="px-2.5 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold rounded-lg flex items-center gap-1 backdrop-blur-sm">
                    <CheckCircle className="w-3.5 h-3.5" /> Verified & Tested
                  </span>
                )}
                {product.isBestseller && (
                  <span className="px-2.5 py-1 bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold rounded-lg backdrop-blur-sm">⭐ Bestseller</span>
                )}
              </div>
            </div>

            {/* Before/After */}
            <div className="glass rounded-2xl border border-white/[0.04] p-6 mb-6">
              <h3 className="text-base font-semibold text-white mb-4">Before → After Workflow</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-red-500/5 rounded-xl border border-red-500/10">
                  <p className="text-xs font-semibold text-red-400 uppercase mb-3">❌ Before (Manual)</p>
                  <div className="space-y-2">
                    {['Receive request manually', 'Copy data to spreadsheet', 'Create document by hand', 'Send via email one by one', 'Track status in head'].map((step, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-red-300/70">
                        <span className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center text-[10px] font-bold shrink-0">{i + 1}</span>
                        {step}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-red-400/50 mt-3 font-medium">~4 hours/day manual work</p>
                </div>
                <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
                  <p className="text-xs font-semibold text-emerald-400 uppercase mb-3">✅ After (Automated)</p>
                  <div className="space-y-2">
                    {['Auto-triggered on event', 'Data synced instantly', 'Documents generated via AI', 'Delivered via WhatsApp + email', 'Real-time dashboard tracking'].map((step, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-emerald-300/70">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-[10px] font-bold shrink-0">{i + 1}</span>
                        {step}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-emerald-400/50 mt-3 font-medium">~5 minutes setup, runs forever</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="glass rounded-2xl border border-white/[0.04] overflow-hidden">
              <div className="flex border-b border-white/[0.04] overflow-x-auto">
                {tabs.map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`px-5 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                      activeTab === tab.id ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-500 hover:text-slate-300'
                    }`}>
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === 'description' && (
                  <div>
                    <p className="text-sm text-slate-300 leading-relaxed mb-6">{product.longDescription}</p>
                    <h4 className="text-sm font-semibold text-white mb-3">Key Features</h4>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {product.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-slate-400">
                          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'whatyouget' && (
                  <div className="space-y-3">
                    {product.whatYouGet.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/[0.03]">
                        {item.includes('JSON') || item.includes('workflow') || item.includes('scenario') ? <Package className="w-5 h-5 text-cyan-400" /> :
                         item.includes('PDF') || item.includes('guide') || item.includes('doc') ? <FileText className="w-5 h-5 text-amber-400" /> :
                         item.includes('video') || item.includes('Video') ? <Video className="w-5 h-5 text-purple-400" /> :
                         item.includes('support') || item.includes('Support') ? <Headphones className="w-5 h-5 text-emerald-400" /> :
                         <Download className="w-5 h-5 text-slate-500" />}
                        <span className="text-sm text-slate-300">{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'requirements' && (
                  <div className="space-y-3">
                    {product.requirements.map((req, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-amber-500/5 rounded-xl text-sm text-amber-300/80 border border-amber-500/10">
                        <span className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                        {req}
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    {product.reviews.map(review => (
                      <div key={review.id} className="p-4 bg-white/[0.02] rounded-xl border border-white/[0.03]">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {review.avatar}
                            </div>
                            <div>
                              <span className="text-sm font-medium text-white">{review.user}</span>
                              {review.verified && <CheckCircle className="inline w-3.5 h-3.5 text-cyan-400 ml-1" />}
                            </div>
                          </div>
                          <span className="text-xs text-slate-600">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-0.5 mb-2">
                          {[1,2,3,4,5].map(s => (
                            <Star key={s} className={`w-3.5 h-3.5 ${s <= review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}`} />
                          ))}
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-4">
              {/* Price card */}
              <div className="glass rounded-2xl border border-white/[0.04] p-6">
                <div className="flex items-center gap-2 mb-1">
                  {product.tools.map(toolId => {
                    const tool = allTools.find(t => t.id === toolId);
                    return tool ? (
                      <span key={toolId} className="px-2 py-0.5 text-[10px] font-medium rounded-md border backdrop-blur-sm"
                        style={{ borderColor: tool.color + '30', color: tool.color, backgroundColor: tool.color + '08' }}>
                        {tool.name}
                      </span>
                    ) : null;
                  })}
                </div>

                <h1 className="text-lg font-bold text-white mt-3 mb-2 leading-snug">{product.name}</h1>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-0.5">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className={`w-4 h-4 ${s <= Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}`} />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-white">{product.rating}</span>
                  <span className="text-sm text-slate-500">({product.reviewCount} reviews)</span>
                </div>

                <div className="mb-4 pb-4 border-b border-white/[0.04]">
                  {product.isFree ? (
                    <span className="text-3xl font-extrabold text-emerald-400 font-[Space_Grotesk]">FREE</span>
                  ) : (
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-extrabold text-white font-[Space_Grotesk]">{product.currency}{product.price.toLocaleString()}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-lg text-slate-600 line-through">{product.currency}{product.originalPrice.toLocaleString()}</span>
                      )}
                      {discount > 0 && <span className="px-2 py-0.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold rounded-md">{discount}% OFF</span>}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <span>Setup: {product.setupTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <span className={`w-2 h-2 rounded-full ${product.complexity === 'Beginner' ? 'bg-emerald-400' : product.complexity === 'Intermediate' ? 'bg-amber-400' : 'bg-red-400'}`} />
                    <span>{product.complexity}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Download className="w-4 h-4 text-purple-400" />
                    <span>Instant download</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span>30-day guarantee</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-5 p-3 bg-white/[0.02] rounded-xl border border-white/[0.03]">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-cyan-500/10">
                    {product.seller.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white flex items-center gap-1">
                      {product.seller.name}
                      {product.seller.verified && <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />}
                    </p>
                    <p className="text-xs text-slate-500">Verified Seller</p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <button onClick={handleBuyNow}
                    className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/10 flex items-center justify-center gap-2 text-sm">
                    <ShoppingCart className="w-4 h-4" />
                    {product.isFree ? 'Get for Free' : 'Buy Now'}
                  </button>
                  <button onClick={() => addToCart(product)} disabled={inCart}
                    className={`w-full py-3 font-semibold rounded-xl transition-all flex items-center justify-center gap-2 text-sm ${
                      inCart ? 'bg-white/[0.02] text-slate-600 cursor-default border border-white/[0.03]' : 'bg-white/[0.05] hover:bg-white/[0.08] text-white border border-white/[0.06]'
                    }`}>
                    {inCart ? '✓ Added to Cart' : 'Add to Cart'}
                  </button>
                  <button onClick={() => wishlisted ? removeFromWishlist(product.id) : addToWishlist(product)}
                    className="w-full py-3 border border-white/[0.06] text-slate-300 font-medium rounded-xl hover:bg-white/[0.03] transition-all flex items-center justify-center gap-2 text-sm">
                    <Heart className={`w-4 h-4 ${wishlisted ? 'text-pink-400 fill-pink-400' : ''}`} />
                    {wishlisted ? 'Wishlisted' : 'Add to Wishlist'}
                  </button>
                </div>
              </div>

              {/* ROI Calculator */}
              <div className="glass rounded-2xl border border-white/[0.04] p-6">
                <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-cyan-400" />
                  ROI Calculator
                </h3>
                <div className="space-y-3">
                  {[
                    { label: 'Hours saved per day', key: 'hours' as const },
                    { label: 'Hourly cost (₹)', key: 'hourlyRate' as const },
                    { label: 'Working days per month', key: 'workdays' as const },
                  ].map(field => (
                    <div key={field.key}>
                      <label className="text-xs text-slate-500 mb-1 block">{field.label}</label>
                      <input type="number" value={roiInputs[field.key]} onChange={(e) => setRoiInputs(p => ({ ...p, [field.key]: +e.target.value }))}
                        className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.06] rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500/30" />
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
                  <p className="text-xs text-emerald-400 font-medium mb-1">Monthly savings</p>
                  <p className="text-2xl font-extrabold text-emerald-400 font-[Space_Grotesk]">₹{roiSavings.toLocaleString()}</p>
                  {product.price > 0 && (
                    <p className="text-xs text-emerald-400/50 mt-1">
                      That&apos;s <span className="font-bold">{roiMultiple}x</span> return on your ₹{product.price.toLocaleString()} investment
                    </p>
                  )}
                </div>
              </div>

              {/* Quick metrics */}
              <div className="glass rounded-2xl border border-white/[0.04] p-6">
                <h3 className="text-sm font-semibold text-white mb-3">Expected Impact</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Time saved', value: product.roiMetrics.timeSaved, color: 'text-white' },
                    { label: 'Cost reduction', value: product.roiMetrics.costReduction, color: 'text-emerald-400' },
                    { label: 'Efficiency gain', value: product.roiMetrics.efficiency, color: 'text-cyan-400' },
                  ].map(m => (
                    <div key={m.label} className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">{m.label}</span>
                      <span className={`text-sm font-semibold ${m.color}`}>{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
