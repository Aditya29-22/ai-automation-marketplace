import { useState, useEffect } from 'react';
import { Search, ShoppingCart, Heart, User, Menu, X, Zap, ChevronDown, Sparkles, MessageSquare, Mail, Users, ShoppingBag, Smartphone, DollarSign, Briefcase, HeadphonesIcon, BarChart, FileText, Settings, Bot, Target, Factory } from 'lucide-react';
import { BuildForMeButton } from './BuildForMeButton';

const categoryIcons: Record<string, React.ReactNode> = {
  'whatsapp': <MessageSquare className="w-4 h-4" />,
  'email': <Mail className="w-4 h-4" />,
  'crm': <Users className="w-4 h-4" />,
  'ecommerce': <ShoppingBag className="w-4 h-4" />,
  'social-media': <Smartphone className="w-4 h-4" />,
  'finance': <DollarSign className="w-4 h-4" />,
  'hr': <Briefcase className="w-4 h-4" />,
  'customer-support': <HeadphonesIcon className="w-4 h-4" />,
  'data-analytics': <BarChart className="w-4 h-4" />,
  'document': <FileText className="w-4 h-4" />,
  'bpa': <Settings className="w-4 h-4" />,
  'rpa': <Bot className="w-4 h-4" />,
  'marketing': <Target className="w-4 h-4" />,
  'industrial': <Factory className="w-4 h-4" />,
};
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
    setCustomRequestOpen,
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
      <div className="relative z-50 bg-gradient-to-r from-[#90F4B1] via-[#A6A2F8] to-[#90F4B1] bg-[length:200%_auto] animate-[shimmer_8s_linear_infinite] overflow-hidden whitespace-nowrap py-1.5 border-b border-black/10">
        <div className="animate-marquee inline-block w-max">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="inline-flex items-center text-[12px] font-bold text-black uppercase tracking-[0.15em] font-sans">
              <span className="mx-4">VERIFIED & TESTED</span>
              <span className="text-black">→</span>
              <span className="mx-4">30-DAY MONEY BACK</span>
              <span className="text-black">→</span>
              <span className="mx-4">🔥 50% OFF LAUNCH</span>
              <span className="text-black">→</span>
            </span>
          ))}
        </div>
      </div>
           {/* Main nav */}
      <header className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/[0.04]' : 'bg-transparent border-b border-transparent'
      }`}>
        <div className="max-w-[90rem] mx-auto px-4 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => { setCurrentPage('home'); setSelectedCategory(null); }}
              className="flex items-center gap-3 shrink-0 group"
            >
              <div className="w-7 h-7 lg:w-8 lg:h-8 border-[3px] border-white flex items-center justify-center p-0.5 lg:p-1 transition-transform group-hover:scale-105">
                <div className="w-full h-full bg-white" />
              </div>
              <div className="hidden sm:block">
                <span className="text-lg lg:text-xl font-bold text-white tracking-tight">AutomateStore</span>
              </div>
            </button>
          </div>

          {/* Center: Desktop Nav Links */}
          <div className="hidden lg:flex flex-1 items-center justify-center min-w-0 px-2">
            <nav className="flex items-center gap-5 lg:gap-8 h-full">
              <div className="relative group/cat h-full flex items-center">
              <button className="flex items-center gap-1.5 text-[13px] font-medium text-slate-300 hover:text-white transition-colors">
                Categories <ChevronDown className="w-3 h-3 opacity-50 group-hover/cat:rotate-180 transition-transform duration-300" />
              </button>
              
              {/* Mega Dropdown */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[700px] opacity-0 invisible group-hover/cat:opacity-100 group-hover/cat:visible transition-all duration-300 transform translate-y-2 group-hover/cat:translate-y-0 z-50 pointer-events-none group-hover/cat:pointer-events-auto">
                <div className="bg-[#161618] border border-white/[0.06] rounded-2xl shadow-2xl p-6 flex gap-6 relative overflow-hidden">
                  {/* Subtle background glow */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl" />
                  
                  {/* Left: Categories Grid */}
                  <div className="flex-1">
                    <h3 className="text-[10px] font-semibold tracking-widest text-slate-500 uppercase mb-4 pl-2">Platform</h3>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                      {categories.slice(0, 10).map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => { setSelectedCategory(cat.id); setCurrentPage('marketplace'); }}
                          className="flex items-center gap-3 text-left group/item p-2 rounded-xl hover:bg-white/[0.04] transition-colors"
                        >
                          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.02] border border-white/[0.04] group-hover/item:border-white/[0.1] text-sm transition-all shadow-sm text-slate-300">
                            {categoryIcons[cat.id] || cat.icon}
                          </span>
                          <div>
                            <div className="text-[13px] font-medium text-slate-300 group-hover/item:text-white transition-colors">{cat.name}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right: Feature Card */}
                  <div className="w-64 bg-[#0a0a0c] border border-white/[0.04] rounded-xl p-5 flex flex-col relative z-10">
                    <div className="w-full h-28 bg-[#1a1a1e] rounded-lg mb-5 relative overflow-hidden border border-white/[0.02]">
                      {/* Abstract geometric shapes for the image feature */}
                      <div className="absolute top-4 left-4 w-12 h-6 bg-rose-500/20 border border-rose-500/30 rounded-full flex items-center justify-center">
                        <span className="text-[8px] text-rose-300">Primary</span>
                      </div>
                      <div className="absolute bottom-4 right-4 w-16 h-6 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center">
                        <span className="text-[8px] text-blue-300">16px</span>
                      </div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                         <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/40" />
                      </div>
                    </div>
                    <h4 className="text-[13px] font-medium text-white mb-2">Advance Customization</h4>
                    <p className="text-[11px] text-slate-400 mb-5 leading-relaxed">Personalize your workflow experience with custom built solutions.</p>
                    <div className="mt-auto flex items-center gap-3">
                      <button 
                        onClick={() => setCustomRequestOpen(true)}
                        className="px-3 py-1.5 bg-transparent border border-white/10 hover:bg-white/5 text-[11px] font-medium text-white rounded-md transition-colors"
                      >
                        Learn More
                      </button>
                      <button 
                        onClick={() => setCustomRequestOpen(true)}
                        className="px-3 py-1.5 bg-[#2786FF] hover:bg-blue-600 text-[11px] font-medium text-white rounded-md transition-colors"
                      >
                        View Docs
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {navLinks.map(link => (
              <button
                key={link.page}
                onClick={() => setCurrentPage(link.page)}
                className={`text-[13px] font-medium transition-colors ${
                  currentPage === link.page ? 'text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
            </nav>
          </div>

          {/* Right actions */}
          <div className="flex-shrink-0 flex items-center gap-3 lg:gap-5">
            
            {/* Search (Icon + expanding input) */}
            <form onSubmit={handleSearch} className="hidden lg:flex items-center relative group rounded-md">
              <div className="search-border-mask opacity-0 group-focus-within:opacity-100 transition-opacity duration-300">
                <div className="search-border-spin" />
              </div>
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 z-10 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-24 focus:w-48 xl:focus:w-64 pl-8 pr-3 py-1.5 bg-transparent hover:bg-white/[0.02] border border-transparent focus:bg-white/[0.02] rounded-md text-[13px] text-slate-200 placeholder:text-slate-500 focus:outline-none transition-all z-10 relative"
              />
            </form>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentPage('dashboard')}
                className="relative text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Heart className="w-4 h-4" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-pink-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setCartOpen(true)}
                className="relative text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <ShoppingCart className="w-4 h-4" />
                {cart.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-cyan-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-3 lg:gap-4 border-l border-white/10 pl-3 lg:pl-5 whitespace-nowrap">
              {isLoggedIn ? (
                <button
                  onClick={() => setCurrentPage('dashboard')}
                  className="flex items-center gap-2 text-[13px] font-medium text-slate-300 hover:text-white transition-colors"
                >
                  <div className="w-5 h-5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded flex items-center justify-center text-white text-[10px] font-bold">
                    {user?.avatar}
                  </div>
                  <span>{user?.name?.split(' ')[0]}</span>
                </button>
              ) : (
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="flex items-center gap-1.5 text-[13px] font-medium text-slate-300 hover:text-white transition-colors"
                >
                  <User className="w-3.5 h-3.5" />
                  Sign In
                </button>
              )}

              <BuildForMeButton onClick={() => setCustomRequestOpen(true)} className="ml-2" />
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-[#0a0a0f] border-t border-white/[0.04]">
            <div className="px-4 py-4 flex flex-col gap-1">
              <form onSubmit={handleSearch} className="mb-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full pl-9 pr-4 py-2.5 bg-white/[0.02] border border-white/[0.05] rounded-lg text-[13px] text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/30"
                  />
                </div>
              </form>
              {navLinks.map(link => (
                <button
                  key={link.page}
                  onClick={() => { setCurrentPage(link.page); setMobileOpen(false); }}
                  className={`text-left px-3 py-2.5 text-[13px] rounded-lg transition-colors ${
                    currentPage === link.page ? 'bg-white/[0.05] text-white font-medium' : 'text-slate-300 hover:bg-white/[0.02]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="h-px bg-white/[0.04] my-2" />
              {!isLoggedIn && (
                <button
                  onClick={() => { setAuthModalOpen(true); setMobileOpen(false); }}
                  className="flex items-center gap-2 px-3 py-2.5 text-[13px] text-slate-300 hover:bg-white/[0.02] rounded-lg"
                >
                  <User className="w-4 h-4" /> Sign In
                </button>
              )}
              <div className="mt-2 w-full">
                <BuildForMeButton onClick={() => { setCustomRequestOpen(true); setMobileOpen(false); }} className="w-full justify-center" />
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
