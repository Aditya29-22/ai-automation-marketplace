import { useState, useEffect } from 'react';
import { Search, ShoppingCart, Heart, User, Menu, X, Zap, ChevronDown, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';
import { categories } from '../data/products';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catDropdown, setCatDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const {
    cart, setCartOpen, currentPage, setCurrentPage,
    searchQuery, setSearchQuery, isLoggedIn, user,
    setAuthModalOpen, wishlist, setSelectedCategory,
  } = useStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) setCurrentPage('marketplace');
  };

  const navLinks = [
    { label: 'Home', page: 'home' },
    { label: 'Marketplace', page: 'marketplace' },
    { label: 'Free', page: 'free' },
    { label: 'Sellers', page: 'seller-dashboard' },
  ];

  return (
    <>
      {/* Top announcement bar */}
      <div className="relative z-50 bg-gradient-to-r from-slate-900 via-[#0f172a] to-slate-900 border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Verified & Tested
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-400 animate-pulse-text">
              <Sparkles className="w-3 h-3 text-amber-400" />
              30-Day Money Back
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <span className="text-[11px] font-mono gradient-text font-bold animate-slide-back-forth inline-block">🔥 50% OFF LAUNCH</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-strong shadow-2xl shadow-black/20'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <button
              onClick={() => { setCurrentPage('home'); setSelectedCategory(null); }}
              className="flex items-center gap-2.5 shrink-0 group"
            >
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl opacity-80 group-hover:opacity-100 transition-opacity blur-[2px]" />
                <div className="relative w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                  <Zap className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="text-lg font-bold text-white font-[Space_Grotesk] tracking-tight">Automate</span>
                <span className="text-lg font-bold gradient-text font-[Space_Grotesk] tracking-tight">Store</span>
              </div>
            </button>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-xl hidden md:block">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Search automations... try "invoice bot" or "WhatsApp"'
                  className="w-full pl-11 pr-4 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/30 focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(0,212,255,0.08)] transition-all"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 bg-white/[0.05] border border-white/[0.06] rounded text-[10px] text-slate-500 font-mono">⌘K</kbd>
                </div>
              </div>
            </form>

            {/* Right actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setCurrentPage('marketplace')}
                className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-sm text-slate-400 hover:text-cyan-400 hover:bg-white/[0.03] rounded-xl transition-all relative"
                onMouseEnter={() => setCatDropdown(true)}
                onMouseLeave={() => setCatDropdown(false)}
              >
                Categories <ChevronDown className="w-3.5 h-3.5" />
                {catDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-64 glass-strong rounded-2xl shadow-2xl shadow-black/40 py-2 z-50 border border-white/[0.06]">
                    {categories.slice(0, 10).map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => { setSelectedCategory(cat.id); setCurrentPage('marketplace'); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/[0.04] hover:text-cyan-400 transition-colors"
                      >
                        <span className="text-base">{cat.icon}</span>
                        <span>{cat.name}</span>
                        <span className="ml-auto text-[10px] text-slate-600 font-mono">{cat.count}</span>
                      </button>
                    ))}
                  </div>
                )}
              </button>

              <button
                onClick={() => setCurrentPage('dashboard')}
                className="relative p-2.5 text-slate-400 hover:text-pink-400 hover:bg-pink-500/5 rounded-xl transition-all"
                title="Wishlist"
              >
                <Heart className="w-[18px] h-[18px]" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-pink-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-pink-500/30">
                    {wishlist.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2.5 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/5 rounded-xl transition-all"
                title="Cart"
              >
                <ShoppingCart className="w-[18px] h-[18px]" />
                {cart.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-cyan-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30 animate-pulse-glow">
                    {cart.length}
                  </span>
                )}
              </button>

              {isLoggedIn ? (
                <button
                  onClick={() => setCurrentPage('dashboard')}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] rounded-xl transition-all"
                >
                  <div className="w-7 h-7 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-[10px] font-bold shadow-lg shadow-cyan-500/20">
                    {user?.avatar}
                  </div>
                  <span className="hidden sm:inline text-sm font-medium text-slate-300">{user?.name?.split(' ')[0]}</span>
                </button>
              ) : (
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/15"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Login</span>
                </button>
              )}

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-white/[0.05] rounded-xl transition-all"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-1 -mb-px pb-0">
            {navLinks.map(link => (
              <button
                key={link.page}
                onClick={() => setCurrentPage(link.page)}
                className={`relative px-4 py-2.5 text-sm font-medium transition-colors ${
                  currentPage === link.page
                    ? 'text-cyan-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {link.label}
                {currentPage === link.page && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
                )}
              </button>
            ))}
            <button
              onClick={() => setCustomRequestOpen(true)}
              className="ml-auto px-4 py-2 text-sm font-medium text-amber-300 bg-amber-500/[0.08] border border-amber-500/20 rounded-xl hover:bg-amber-500/[0.12] transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" /> Build for Me
            </button>
          </nav>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden glass-strong border-t border-white/[0.04] shadow-2xl">
            <div className="px-4 py-4">
              <form onSubmit={handleSearch} className="mb-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search automations..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/30"
                  />
                </div>
              </form>
              {navLinks.map(link => (
                <button
                  key={link.page}
                  onClick={() => { setCurrentPage(link.page); setMobileOpen(false); }}
                  className={`block w-full text-left px-4 py-3 text-sm rounded-xl transition-colors ${
                    currentPage === link.page ? 'bg-cyan-500/10 text-cyan-400 font-medium' : 'text-slate-300 hover:bg-white/[0.03]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => { setCustomRequestOpen(true); setMobileOpen(false); }}
                className="block w-full text-left px-4 py-3 text-sm text-amber-300 hover:bg-amber-500/5 rounded-xl font-medium"
              >
                <Sparkles className="inline w-3.5 h-3.5 mr-1.5" /> Build for Me — Custom Automation
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
