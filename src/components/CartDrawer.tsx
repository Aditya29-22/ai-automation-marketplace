import { X, Trash2, ShoppingBag, ArrowRight, Shield } from 'lucide-react';
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
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0f0f17] z-50 shadow-2xl shadow-black/50 flex flex-col animate-slide-in-right border-l border-white/[0.04]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.04]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-semibold text-white">Your Cart</h2>
            <span className="text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded-full font-medium">{cart.length}</span>
          </div>
          <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-white/[0.03] rounded-lg transition-colors text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-slate-700 mb-4" />
              <p className="text-white font-medium mb-1">Your cart is empty</p>
              <p className="text-sm text-slate-500 mb-4">Browse our marketplace to find the perfect automation</p>
              <button
                onClick={() => { setCartOpen(false); setCurrentPage('marketplace'); }}
                className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all"
              >
                Browse Automations
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.product.id} className="glass rounded-xl p-4 border border-white/[0.04]">
                  <div className="flex gap-3">
                    <img src={item.product.thumbnail} alt={item.product.name} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-white line-clamp-2 leading-snug">{item.product.name}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{item.product.subcategory}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-bold text-white">
                          {item.product.isFree ? 'FREE' : `${item.product.currency}${item.product.price.toLocaleString()}`}
                        </span>
                        <button onClick={() => removeFromCart(item.product.id)} className="p-1 text-slate-500 hover:text-red-400 transition-colors">
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
                          className="w-4 h-4 rounded border-slate-600 bg-white/[0.03] text-cyan-500 focus:ring-cyan-500/20"
                        />
                        <span className="text-xs text-slate-400">Add maintenance plan</span>
                      </label>

                      {item.withMaintenance && (
                        <div className="flex gap-2 mt-2 ml-6">
                          <button
                            onClick={() => setMaintenanceType(item.product.id, 'monthly')}
                            className={`px-3 py-1 text-[11px] rounded-lg border transition-colors ${
                              item.maintenanceType === 'monthly'
                                ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 font-medium'
                                : 'border-white/[0.06] text-slate-500 hover:border-white/[0.1]'
                            }`}
                          >
                            ₹{item.product.maintenancePlan.monthly}/mo
                          </button>
                          <button
                            onClick={() => setMaintenanceType(item.product.id, 'yearly')}
                            className={`px-3 py-1 text-[11px] rounded-lg border transition-colors ${
                              item.maintenanceType === 'yearly'
                                ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 font-medium'
                                : 'border-white/[0.06] text-slate-500 hover:border-white/[0.1]'
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
          <div className="px-6 py-4 border-t border-white/[0.04] bg-[#0f0f17]">
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Coupon code"
                className="flex-1 px-3 py-2 bg-white/[0.03] border border-white/[0.06] rounded-lg text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/30"
              />
              <button className="px-4 py-2 bg-white/[0.06] text-white text-sm font-medium rounded-lg hover:bg-white/[0.1] transition-colors border border-white/[0.06]">
                Apply
              </button>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-slate-400">Total</span>
              <span className="text-xl font-bold text-white font-[Space_Grotesk]">₹{total.toLocaleString()}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/10"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
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
