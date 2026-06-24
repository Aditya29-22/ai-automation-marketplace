import { useState, useEffect } from 'react';
import {  DownloadIcon as Download, HeartIcon as Heart, Trash2Icon as Trash2, ShoppingBagIcon as ShoppingBag, ExternalLinkIcon as ExternalLink, UserIcon as User  } from '../lib/icons';
import { Package, FileText } from 'lucide-react';
import { useStore } from '../store/useStore';

const carouselTexts = [
  "Automate your workflow,<br/>Scale your business",
  "Eliminate manual tasks,<br/>Boost productivity",
  "AI-powered solutions,<br/>Seamless integration",
  "Work smarter,<br/>Not harder"
];

export default function DashboardPage() {
  const { purchases, wishlist, removeFromWishlist, isLoggedIn, user, setAuthModalOpen, setCurrentPage, setSelectedProductId, logout, setCustomRequestOpen } = useStore();
  const [activeTab, setActiveTab] = useState('purchases');
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    if (!isLoggedIn) {
      const interval = setInterval(() => {
        setCarouselIndex(prev => (prev + 1) % carouselTexts.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="h-[calc(100vh-6.5rem)] min-h-[600px] bg-[#0a0a0f] flex">
        {/* Left Side - Image Panel */}
        <div className="hidden lg:flex lg:w-1/2 p-4">
          <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#4a3b8c] to-[#201b44] flex flex-col justify-between p-12">
            {/* Background Image */}
            <div 
              className="absolute inset-0 opacity-50 mix-blend-overlay"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center' }}
            />
            
            {/* Top Bar */}
            <div className="relative z-10 flex justify-between items-center w-full">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border-[3px] border-white flex items-center justify-center p-1">
                  <div className="w-full h-full bg-white" />
                </div>
              </div>
              <button 
                onClick={() => setCurrentPage('home')}
                className="flex items-center gap-2 px-5 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white text-[13px] transition-colors"
              >
                Back to website <span className="text-lg leading-none">&rarr;</span>
              </button>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 max-w-md text-center mx-auto pb-8">
              <h1 
                className="text-[2.5rem] font-medium text-white leading-[1.2] mb-8 tracking-tight transition-opacity duration-500"
                dangerouslySetInnerHTML={{ __html: carouselTexts[carouselIndex] }}
              />
              {/* Carousel Indicators */}
              <div className="flex items-center justify-center gap-2.5">
                {carouselTexts.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1 rounded-full transition-all duration-500 ${
                      i === carouselIndex ? 'w-10 bg-white' : 'w-6 bg-white/30'
                    }`} 
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Content Panel */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-[#0a0a0f]">
          <div className="w-full max-w-[440px] animate-fade-in-up">
            <h2 className="text-[2.75rem] font-medium text-white tracking-tight mb-4 leading-tight">
              Login Required
            </h2>
            <p className="text-[#a09fa6] text-[15px] mb-12 leading-relaxed">
              Sign in to access your dashboard, view your purchases, and manage your wishlist.
            </p>

            <button 
              onClick={() => setAuthModalOpen(true)}
              className="relative w-full py-4 text-white font-medium rounded-xl transition-all text-[15px] overflow-hidden group/btn"
            >
              <div className="absolute inset-0 -z-10">
                <div 
                  className="absolute top-1/2 left-1/2 w-[200%] aspect-square bg-[conic-gradient(from_0deg,#ec4899,#ef4444,#a855f7,#ec4899)]"
                  style={{ animation: 'spin-center 4s linear infinite' }}
                />
              </div>
              <span className="relative z-10">Sign In</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'purchases', label: 'My Automations', icon: <Package className="w-4 h-4" />, count: purchases.length },
    { id: 'wishlist', label: 'Wishlist', icon: <Heart className="w-4 h-4" />, count: wishlist.length },
    { id: 'custom', label: 'Custom Requests', icon: <FileText className="w-4 h-4" />, count: 0 },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="glass rounded-2xl border border-white/[0.04] p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-cyan-500/20">
                {user?.avatar}
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">{user?.name}</h1>
                <p className="text-sm text-slate-500">{user?.email}</p>
              </div>
            </div>
            <button onClick={logout} className="px-4 py-2 text-sm text-slate-500 hover:text-red-400 hover:bg-red-500/5 rounded-lg transition-colors border border-transparent hover:border-red-500/10">
              Logout
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            {[
              { value: purchases.length, label: 'Automations', color: 'cyan' },
              { value: `₹${purchases.reduce((s, p) => s + (p.price > 0 ? Math.round(p.price * 0.1 * 22) : 0), 0).toLocaleString()}`, label: 'Monthly Savings', color: 'emerald' },
              { value: purchases.length * 4, label: 'Hours Saved', color: 'amber' },
            ].map((stat, i) => (
              <div key={i} className={`p-4 bg-${stat.color}-500/5 rounded-xl border border-${stat.color}-500/10 text-center`}>
                <p className={`text-2xl font-bold text-${stat.color}-400 font-[Space_Grotesk]`}>{stat.value}</p>
                <p className={`text-xs text-${stat.color}-400/50`}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-1 mb-6 bg-[#111118]/50 rounded-xl border border-white/[0.04] p-1 overflow-x-auto">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/10' : 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.02]'
              }`}>
              {tab.icon}
              {tab.label}
              {tab.count > 0 && <span className="px-1.5 py-0.5 bg-white/[0.03] text-slate-500 text-[10px] rounded-full">{tab.count}</span>}
            </button>
          ))}
        </div>

        {activeTab === 'purchases' && (
          <div>
            {purchases.length === 0 ? (
              <div className="glass rounded-2xl border border-white/[0.04] p-12 text-center">
                <ShoppingBag className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No purchases yet</h3>
                <p className="text-sm text-slate-500 mb-4">Browse our marketplace to find your first automation</p>
                <button onClick={() => setCurrentPage('marketplace')} className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all">
                  Browse Marketplace
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {purchases.map(product => (
                  <div key={product.id} className="glass rounded-xl border border-white/[0.04] p-4 flex items-center gap-4">
                    <img src={product.thumbnail} alt={product.name} className="w-20 h-16 rounded-lg object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-white truncate">{product.name}</h4>
                      <p className="text-xs text-slate-500">{product.subcategory} • {product.setupTime} setup</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/10">
                        <Download className="w-3.5 h-3.5" /> Download
                      </button>
                      <button onClick={() => { setSelectedProductId(product.id); setCurrentPage('product'); }}
                        className="p-2 text-slate-500 hover:text-white hover:bg-white/[0.03] rounded-lg transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'wishlist' && (
          <div>
            {wishlist.length === 0 ? (
              <div className="glass rounded-2xl border border-white/[0.04] p-12 text-center">
                <Heart className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Your wishlist is empty</h3>
                <p className="text-sm text-slate-500 mb-4">Save automations you like for later</p>
              </div>
            ) : (
              <div className="space-y-3">
                {wishlist.map(({ product }) => (
                  <div key={product.id} className="glass rounded-xl border border-white/[0.04] p-4 flex items-center gap-4">
                    <img src={product.thumbnail} alt={product.name} className="w-20 h-16 rounded-lg object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-white truncate">{product.name}</h4>
                      <p className="text-xs text-slate-500">{product.isFree ? 'FREE' : `${product.currency}${product.price.toLocaleString()}`}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => { setSelectedProductId(product.id); setCurrentPage('product'); }}
                        className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all">
                        View
                      </button>
                      <button onClick={() => removeFromWishlist(product.id)}
                        className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/5 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'custom' && (
          <div className="glass rounded-2xl border border-white/[0.04] p-8 text-center">
            <div className="text-5xl mb-4">🤖</div>
            <h3 className="text-lg font-semibold text-white mb-2">Need a Custom Automation?</h3>
            <p className="text-sm text-slate-500 mb-4 max-w-md mx-auto">
              Tell us what you need and we&apos;ll build a custom automation tailored to your business. Starting at ₹9,999.
            </p>
            <button onClick={() => setCustomRequestOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/10">
              Request Custom Automation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
