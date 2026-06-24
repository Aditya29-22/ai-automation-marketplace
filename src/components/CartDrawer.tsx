import {  Trash2Icon as Trash2, ShoppingBagIcon as ShoppingBag  } from '../lib/icons';
import { X, ArrowRight, Shield } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function CartDrawer() {
  const {
    isCartOpen, setCartOpen, cart, removeFromCart,
    toggleMaintenance, setMaintenanceType, cartTotal,
    setCurrentPage, isLoggedIn, setAuthModalOpen,
  } = useStore();

  if (!isCartOpen) return null;

  const total = cartTotal();

  const handleCheckout = () => {
    if (!isLoggedIn) {
      setAuthModalOpen(true);
      return;
    }
    setCartOpen(false);
    setCurrentPage('checkout');
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0a0a0f] z-50 shadow-2xl shadow-black flex flex-col animate-slide-in-right border-l border-white/[0.04]">
        {/* Header */}
        <div className="flex items-start justify-between px-8 pt-8 pb-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <div 
                className="relative w-7 h-7 flex items-center justify-center overflow-hidden z-10 pointer-events-none"
                style={{
                  maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z'/%3E%3Cpath d='M3 6h18'/%3E%3Cpath d='M16 10a4 4 0 0 1-8 0'/%3E%3C/svg%3E")`,
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z'/%3E%3Cpath d='M3 6h18'/%3E%3Cpath d='M16 10a4 4 0 0 1-8 0'/%3E%3C/svg%3E")`,
                  WebkitMaskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                }}
              >
                <div 
                  className="absolute top-1/2 left-1/2 w-[200%] aspect-square bg-[conic-gradient(from_0deg,#ec4899,#ef4444,#a855f7,#ec4899)]"
                  style={{ animation: 'spin-center 4s linear infinite' }}
                />
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Cart</h2>
              {cart.length > 0 && (
                <span className="text-xs font-semibold bg-white/[0.05] text-white border border-white/[0.1] px-2.5 py-0.5 rounded-md ml-1">{cart.length}</span>
              )}
            </div>
            <p className="text-[13px] text-slate-500 mt-1">
              {cart.length === 0 ? "You haven't added anything yet." : `You have ${cart.length} ${cart.length === 1 ? 'item' : 'items'} ready.`}
            </p>
          </div>
          <button onClick={() => setCartOpen(false)} className="p-2.5 bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.05] rounded-xl transition-colors text-slate-400 hover:text-white group">
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div 
                className="mb-8 w-20 h-20 flex items-center justify-center overflow-hidden z-10 pointer-events-none opacity-80"
                style={{
                  maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z'/%3E%3Cpath d='M3 6h18'/%3E%3Cpath d='M16 10a4 4 0 0 1-8 0'/%3E%3C/svg%3E")`,
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z'/%3E%3Cpath d='M3 6h18'/%3E%3Cpath d='M16 10a4 4 0 0 1-8 0'/%3E%3C/svg%3E")`,
                  WebkitMaskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                }}
              >
                <div 
                  className="absolute top-1/2 left-1/2 w-[200%] aspect-square bg-[conic-gradient(from_0deg,#ec4899,#ef4444,#a855f7,#ec4899)]"
                  style={{ animation: 'spin-center 4s linear infinite' }}
                />
              </div>
              <p className="text-white text-lg font-medium mb-2">Your cart is empty</p>
              <p className="text-sm text-slate-400 mb-8 max-w-[250px]">Browse our marketplace to find the perfect automation for your workflow.</p>
              <button
                onClick={() => { setCartOpen(false); setCurrentPage('marketplace'); }}
                className="relative px-6 py-3.5 text-white text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg overflow-hidden group/btn w-full max-w-[240px]"
              >
                <div className="absolute inset-0 -z-10">
                  <div 
                    className="absolute top-1/2 left-1/2 w-[200%] aspect-square bg-[conic-gradient(from_0deg,#ec4899,#ef4444,#a855f7,#ec4899)]"
                    style={{ animation: 'spin-center 4s linear infinite' }}
                  />
                </div>
                <span className="relative z-10">Browse Automations</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.product.id} className="bg-white/[0.02] hover:bg-white/[0.04] transition-colors rounded-xl p-4 border border-white/[0.04]">
                  <div className="flex gap-3">
                    <img src={item.product.thumbnail} alt={item.product.name} className="w-16 h-16 rounded-lg object-cover shrink-0 border border-white/10" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-white line-clamp-2 leading-snug">{item.product.name}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{item.product.subcategory}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-bold text-[#2786FF]">
                          {item.product.isFree ? 'FREE' : `${item.product.currency}${item.product.price.toLocaleString()}`}
                        </span>
                        <button onClick={() => removeFromCart(item.product.id)} className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {!item.product.isFree && (
                    <div className="mt-3 pt-3 border-t border-white/[0.04]">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.withMaintenance}
                          onChange={() => toggleMaintenance(item.product.id)}
                          className="w-4 h-4 rounded border-slate-600 bg-white/[0.03] text-[#2786FF] focus:ring-[#2786FF]/20"
                        />
                        <span className="text-xs text-slate-300">Add maintenance plan</span>
                      </label>

                      {item.withMaintenance && (
                        <div className="flex gap-2 mt-3 ml-6">
                          <button
                            onClick={() => setMaintenanceType(item.product.id, 'monthly')}
                            className={`px-3 py-1.5 text-[11px] rounded-lg border transition-colors ${
                              item.maintenanceType === 'monthly'
                                ? 'bg-[#2786FF]/10 border-[#2786FF]/30 text-[#2786FF] font-medium'
                                : 'border-white/[0.06] text-slate-400 hover:border-white/[0.1] hover:text-white'
                            }`}
                          >
                            ₹{item.product.maintenancePlan.monthly}/mo
                          </button>
                          <button
                            onClick={() => setMaintenanceType(item.product.id, 'yearly')}
                            className={`px-3 py-1.5 text-[11px] rounded-lg border transition-colors ${
                              item.maintenanceType === 'yearly'
                                ? 'bg-[#2786FF]/10 border-[#2786FF]/30 text-[#2786FF] font-medium'
                                : 'border-white/[0.06] text-slate-400 hover:border-white/[0.1] hover:text-white'
                            }`}
                          >
                            ₹{item.product.maintenancePlan.yearly}/yr
                            <span className="ml-1 text-emerald-400 font-bold">Save 17%</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="px-6 py-5 border-t border-white/[0.04] bg-[#0a0a0f]">
            <div className="flex gap-2 mb-5">
              <input
                type="text"
                placeholder="Coupon code"
                className="flex-1 px-4 py-2.5 bg-white/[0.02] border border-white/[0.06] rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-white/20 transition-colors"
              />
              <button className="px-5 py-2.5 bg-white/[0.04] text-white text-sm font-medium rounded-xl hover:bg-white/[0.08] transition-colors border border-white/[0.06]">
                Apply
              </button>
            </div>

            <div className="flex items-center justify-between mb-5">
              <span className="text-sm text-slate-400 font-medium">Total</span>
              <span className="text-2xl font-bold text-white font-[Space_Grotesk]">₹{total.toLocaleString()}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="relative w-full flex items-center justify-center gap-2 px-6 py-4 text-white font-semibold rounded-xl transition-all shadow-lg overflow-hidden group/btn text-[15px]"
            >
              <div className="absolute inset-0 -z-10">
                <div 
                  className="absolute top-1/2 left-1/2 w-[200%] aspect-square bg-[conic-gradient(from_0deg,#ec4899,#ef4444,#a855f7,#ec4899)]"
                  style={{ animation: 'spin-center 4s linear infinite' }}
                />
              </div>
              <span className="relative z-10">Proceed to Checkout</span> 
              <ArrowRight className="w-4 h-4 relative z-10" />
            </button>

            <div className="flex items-center justify-center gap-2 mt-3 text-xs text-slate-600">
              <Shield className="w-3.5 h-3.5" />
              <span>Secure payment • 30-day money-back guarantee</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
