import { useRef, useState } from 'react';
import { Star, ShoppingCart, Heart, Clock, CheckCircle, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { Product } from '../data/products';
import { tools as allTools } from '../data/products';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const { addToCart, cart, setCurrentPage, setSelectedProductId, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  const inCart = cart.some(i => i.product.id === product.id);
  const wishlisted = isInWishlist(product.id);
  const discount = product.originalPrice > 0 ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -12, y: x * 12 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleClick = () => {
    setSelectedProductId(product.id);
    setCurrentPage('product');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`group relative animate-fade-in-up opacity-0 stagger-${Math.min(index + 1, 8)}`}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Glow effect behind card */}
      <div
        className={`absolute -inset-0.5 rounded-2xl transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(135deg, rgba(0,212,255,0.3), rgba(168,85,247,0.3), rgba(0,212,255,0.3))',
          backgroundSize: '200% 200%',
          animation: 'gradient-shift 3s ease infinite',
          filter: 'blur(8px)',
        }}
      />

      <div
        className="relative glass-card rounded-2xl overflow-hidden flex flex-col cursor-pointer"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
        }}
        onClick={handleClick}
      >
        {/* Thumbnail */}
        <div className="relative overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {product.isFree && (
              <span className="px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold rounded-md uppercase tracking-wide backdrop-blur-sm">
                Free
              </span>
            )}
            {product.isBestseller && (
              <span className="px-2 py-0.5 bg-amber-500/20 border border-amber-500/30 text-amber-400 text-[10px] font-bold rounded-md flex items-center gap-1 backdrop-blur-sm">
                <Sparkles className="w-3 h-3" /> Bestseller
              </span>
            )}
            {product.isNew && (
              <span className="px-2 py-0.5 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-[10px] font-bold rounded-md backdrop-blur-sm">
                New
              </span>
            )}
            {product.isVerified && (
              <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-emerald-400 text-[10px] font-bold rounded-md flex items-center gap-0.5 backdrop-blur-sm">
                <CheckCircle className="w-3 h-3" /> Verified
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={(e) => { e.stopPropagation(); wishlisted ? removeFromWishlist(product.id) : addToWishlist(product); }}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all backdrop-blur-sm ${
              wishlisted ? 'bg-pink-500/80 text-white' : 'bg-black/30 text-white/60 hover:text-pink-400 hover:bg-pink-500/20'
            }`}
          >
            <Heart className="w-4 h-4" fill={wishlisted ? 'currentColor' : 'none'} />
          </button>

          {/* Discount badge */}
          {!product.isFree && discount > 0 && (
            <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold rounded-md backdrop-blur-sm">
              {discount}% OFF
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold text-cyan-400 bg-cyan-500/5 border border-cyan-500/10 px-2 py-0.5 rounded-md uppercase tracking-wider">
              {product.subcategory}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-slate-500">
              <Clock className="w-3 h-3" /> {product.setupTime}
            </span>
          </div>

          <h3 className="text-sm font-semibold text-white mb-1.5 line-clamp-2 hover:text-cyan-400 transition-colors leading-snug">
            {product.name}
          </h3>

          <p className="text-xs text-slate-500 mb-3 line-clamp-2 leading-relaxed">{product.description}</p>

          {/* Tool icons */}
          <div className="flex items-center gap-1.5 mb-3">
            {product.tools.map(toolId => {
              const tool = allTools.find(t => t.id === toolId);
              return tool ? (
                <span
                  key={toolId}
                  className="px-2 py-0.5 text-[9px] font-medium rounded-md border backdrop-blur-sm"
                  style={{
                    borderColor: tool.color + '30',
                    color: tool.color,
                    backgroundColor: tool.color + '08',
                  }}
                >
                  {tool.name}
                </span>
              ) : null;
            })}
          </div>

          {/* Seller */}
          <div className="flex items-center gap-2 mb-3 pb-3 border-b border-white/[0.04]">
            <div className="w-5 h-5 bg-gradient-to-br from-slate-600 to-slate-700 rounded-md flex items-center justify-center text-[9px] font-bold text-slate-300">
              {product.seller.avatar}
            </div>
            <span className="text-[11px] text-slate-500">{product.seller.name}</span>
            {product.seller.verified && <CheckCircle className="w-3 h-3 text-cyan-500" />}
          </div>

          {/* Rating + Price + Button */}
          <div className="mt-auto">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-0.5">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="text-sm font-semibold text-white">{product.rating}</span>
              </div>
              <span className="text-xs text-slate-500">({product.reviewCount})</span>
              <span className="text-[10px] text-slate-700 mx-1">|</span>
              <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                product.complexity === 'Beginner' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                product.complexity === 'Intermediate' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}>{product.complexity}</span>
            </div>

            <div className="flex items-end justify-between">
              <div>
                {product.isFree ? (
                  <span className="text-lg font-bold text-emerald-400 font-[Space_Grotesk]">FREE</span>
                ) : (
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-white font-[Space_Grotesk]">{product.currency}{product.price.toLocaleString()}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-xs text-slate-600 line-through">{product.currency}{product.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                )}
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                disabled={inCart}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  inCart
                    ? 'bg-white/[0.03] text-slate-600 cursor-default border border-white/[0.04]'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/10'
                }`}
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                {inCart ? 'In Cart' : product.isFree ? 'Get Free' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
