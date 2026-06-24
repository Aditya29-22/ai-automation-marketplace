import { useRef, useState } from 'react';
import {  StarIcon as Star, ShoppingCartIcon as ShoppingCart, HeartIcon as Heart, SparklesIcon as Sparkles  } from '../lib/icons';
import { Clock, CheckCircle } from 'lucide-react';
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
    setTilt({ x: y * -8, y: x * 8 });
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
      <div
        className="relative bg-[#0a0a0f] border border-white/[0.08] hover:border-white/[0.15] rounded-2xl overflow-hidden flex flex-col cursor-pointer"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out, border-color 0.3s ease',
        }}
        onClick={handleClick}
      >
        {/* Thumbnail */}
        <div className="relative overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-full h-48 object-cover transition-transform duration-700 filter grayscale-[20%]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/20 to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {product.isFree && (
              <span className="px-2 py-0.5 bg-white/10 border border-white/20 text-white text-[10px] font-bold rounded-md uppercase tracking-widest backdrop-blur-sm">
                Free
              </span>
            )}
            {product.isBestseller && (
              <span className="px-2 py-0.5 bg-white/10 border border-white/20 text-white text-[10px] font-bold rounded-md flex items-center gap-1 uppercase tracking-widest backdrop-blur-sm">
                <Sparkles className="w-3 h-3" /> Bestseller
              </span>
            )}
            {product.isNew && (
              <span className="px-2 py-0.5 bg-white/10 border border-white/20 text-white text-[10px] font-bold rounded-md uppercase tracking-widest backdrop-blur-sm">
                New
              </span>
            )}
            {product.isVerified && (
              <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-white text-[10px] font-bold rounded-md flex items-center gap-1 uppercase tracking-widest backdrop-blur-sm">
                <CheckCircle className="w-3 h-3" /> Verified
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={(e) => { e.stopPropagation(); wishlisted ? removeFromWishlist(product.id) : addToWishlist(product); }}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all backdrop-blur-sm border ${
              wishlisted ? 'bg-white text-black border-transparent' : 'bg-black/40 border-white/10 text-white/60 hover:text-white hover:bg-white/20 hover:border-white/20'
            }`}
          >
            <Heart className="w-4 h-4" fill={wishlisted ? 'currentColor' : 'none'} />
          </button>

          {/* Discount badge */}
          {!product.isFree && discount > 0 && (
            <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-white/10 border border-white/20 text-white text-xs font-bold font-mono tracking-tighter rounded-md backdrop-blur-sm">
              {discount}% OFF
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[10px] font-bold text-slate-400 border border-white/10 px-2.5 py-0.5 rounded-md uppercase tracking-widest">
              {product.subcategory}
            </span>
            <span className="flex items-center gap-1 text-[10px] font-medium text-slate-500 uppercase tracking-widest">
              <Clock className="w-3 h-3" /> {product.setupTime}
            </span>
          </div>

          <h3 className="text-[1.1rem] font-semibold tracking-tight text-white mb-2 line-clamp-2 leading-[1.2]">
            {product.name}
          </h3>

          <p className="text-sm text-slate-400 mb-4 line-clamp-2 leading-relaxed font-medium">{product.description}</p>

          {/* Tool icons */}
          <div className="flex items-center gap-1.5 mb-4">
            {product.tools.map(toolId => {
              const tool = allTools.find(t => t.id === toolId);
              return tool ? (
                <span
                  key={toolId}
                  className="px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase rounded-md border border-white/10 bg-white/5 text-slate-300 backdrop-blur-sm"
                >
                  {tool.name}
                </span>
              ) : null;
            })}
          </div>



          {/* Rating + Price + Button */}
          <div className="mt-auto">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-white fill-white" />
                <span className="text-sm font-bold text-white font-mono tracking-tighter">{product.rating}</span>
              </div>
              <span className="text-xs font-medium text-slate-500 font-mono tracking-tighter">({product.reviewCount})</span>
              <span className="text-[10px] text-white/10 mx-1">|</span>
              <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded border border-white/10 text-slate-300 bg-white/5">
                {product.complexity}
              </span>
            </div>

            <div className="flex items-end justify-between">
              <div>
                {product.isFree ? (
                  <span className="text-2xl font-bold font-mono tracking-tighter text-white">FREE</span>
                ) : (
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white font-mono tracking-tighter">{product.currency}{product.price.toLocaleString()}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm font-medium text-slate-500 line-through font-mono tracking-tighter">{product.currency}{product.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                )}
              </div>
              
              <button
                onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                disabled={inCart}
                className="group/cartbtn relative flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-all bg-[#0a0a0f] focus:outline-none overflow-hidden"
              >
                {/* Border gradient mask */}
                {!inCart && (
                  <div 
                    className="absolute inset-0 rounded-xl p-[1px] pointer-events-none" 
                    style={{
                      WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                    }}
                  >
                    <div 
                      className="absolute top-1/2 left-1/2 w-[300%] aspect-square bg-[conic-gradient(from_0deg,#ec4899,#ef4444,#a855f7,#ec4899)]"
                      style={{ animation: 'spin-center 4s linear infinite' }}
                    />
                  </div>
                )}
                {inCart && (
                  <div className="absolute inset-0 border border-white/[0.06] rounded-xl pointer-events-none bg-white/[0.02]" />
                )}

                {/* Animated gradient icon */}
                {!inCart ? (
                  <div 
                    className="relative w-4 h-4 overflow-hidden z-10 group-hover/cartbtn:scale-110 transition-transform"
                    style={{
                      maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='8' cy='21' r='1'/%3E%3Ccircle cx='19' cy='21' r='1'/%3E%3Cpath d='M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12'/%3E%3C/svg%3E")`,
                      maskSize: 'contain',
                      maskRepeat: 'no-repeat',
                      maskPosition: 'center',
                      WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='8' cy='21' r='1'/%3E%3Ccircle cx='19' cy='21' r='1'/%3E%3Cpath d='M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12'/%3E%3C/svg%3E")`,
                      WebkitMaskSize: 'contain',
                      WebkitMaskRepeat: 'no-repeat',
                      WebkitMaskPosition: 'center',
                    }}
                  >
                    <div 
                      className="absolute top-1/2 left-1/2 w-[300%] aspect-square bg-[conic-gradient(from_0deg,#ec4899,#ef4444,#a855f7,#ec4899)]"
                      style={{ animation: 'spin-center 4s linear infinite' }}
                    />
                  </div>
                ) : (
                  <ShoppingCart className="w-4 h-4 text-slate-500" />
                )}

                <span className={`relative z-10 ${inCart ? 'text-slate-500' : 'text-white'}`}>
                  {inCart ? 'In Cart' : product.isFree ? 'Get Free' : 'Add'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
