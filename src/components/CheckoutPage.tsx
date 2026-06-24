import { useState } from 'react';
import {  LockIcon as Lock, DownloadIcon as Download, SparklesIcon as Sparkles  } from '../lib/icons';
import { Shield, CheckCircle, ArrowLeft } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart, setCurrentPage, isLoggedIn, user, setAuthModalOpen, addPurchase, isCheckoutComplete, setCheckoutComplete } = useStore();
  const [processing, setProcessing] = useState(false);

  if (!isLoggedIn) {
    setAuthModalOpen(true);
    setCurrentPage('home');
    return null;
  }

  if (isCheckoutComplete) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4">
        <div className="glass rounded-3xl border border-white/[0.04] p-12 text-center max-w-lg shadow-2xl animate-fade-in-scale">
          <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
            <CheckCircle className="w-10 h-10 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2 font-[Space_Grotesk]">Payment Successful!</h1>
          <p className="text-slate-500 mb-6">Your automations are ready for download. We&apos;ve also sent them to your email.</p>
          <div className="space-y-3 mb-8">
            <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/10">
              <Download className="w-5 h-5" /> Download All (ZIP)
            </button>
            <button onClick={() => { setCheckoutComplete(false); setCurrentPage('dashboard'); }}
              className="w-full px-6 py-3 bg-white/[0.03] text-slate-300 font-medium rounded-xl hover:bg-white/[0.06] transition-all border border-white/[0.06]">
              Go to Dashboard
            </button>
          </div>
          <p className="text-xs text-slate-600">Order confirmation has been sent to {user?.email}</p>
        </div>
      </div>
    );
  }

  const total = cartTotal();

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      addPurchase(cart.map(i => i.product));
      clearCart();
      setProcessing(false);
      setCheckoutComplete(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button onClick={() => setCurrentPage('marketplace')}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-cyan-400 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to shopping
        </button>

        <h1 className="text-2xl font-bold text-white font-[Space_Grotesk] mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <div className="glass rounded-2xl border border-white/[0.04] overflow-hidden">
              <div className="px-6 py-4 border-b border-white/[0.04]">
                <h2 className="text-base font-semibold text-white">Order Summary</h2>
              </div>
              <div className="divide-y divide-white/[0.04]">
                {cart.map(item => (
                  <div key={item.product.id} className="px-6 py-4 flex items-center gap-4">
                    <img src={item.product.thumbnail} alt={item.product.name} className="w-16 h-14 rounded-lg object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-white truncate">{item.product.name}</h4>
                      <p className="text-xs text-slate-500">{item.product.subcategory}</p>
                      {item.withMaintenance && (
                        <span className="text-[10px] px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded-full font-medium mt-1 inline-block border border-cyan-500/10">
                          + Maintenance ({item.maintenanceType})
                        </span>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold text-white">
                        {item.product.isFree ? 'FREE' : `${item.product.currency}${item.product.price.toLocaleString()}`}
                      </p>
                      {item.withMaintenance && (
                        <p className="text-xs text-cyan-400">
                          +₹{item.maintenanceType === 'monthly' ? item.product.maintenancePlan.monthly.toLocaleString() : item.product.maintenancePlan.yearly.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="glass rounded-2xl border border-white/[0.04] p-6 sticky top-24">
              <h2 className="text-base font-semibold text-white mb-4">Payment Details</h2>

              <div className="space-y-2 mb-4 pb-4 border-b border-white/[0.04]">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="text-white">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">GST (18%)</span>
                  <span className="text-white">₹{Math.round(total * 0.18).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Launch discount</span>
                  <span className="text-emerald-400">-₹{Math.round(total * 0.18).toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="text-base font-semibold text-white">Total</span>
                <span className="text-xl font-extrabold text-white font-[Space_Grotesk]">₹{total.toLocaleString()}</span>
              </div>

              <button onClick={handlePayment} disabled={processing}
                className={`w-full py-3.5 font-semibold rounded-xl transition-all flex items-center justify-center gap-2 text-sm ${
                  processing ? 'bg-slate-700 text-slate-500 cursor-wait' : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/10'
                }`}>
                {processing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Pay ₹{total.toLocaleString()} with Razorpay
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 mt-3 text-xs text-slate-600">
                <Shield className="w-3.5 h-3.5" />
                <span>256-bit SSL encrypted payment</span>
              </div>

              <div className="mt-4 pt-4 border-t border-white/[0.04]">
                <p className="text-[10px] text-slate-600 uppercase tracking-wider mb-2">Accepted methods</p>
                <div className="flex flex-wrap gap-2">
                  {['UPI', 'Cards', 'Net Banking', 'Wallets'].map(m => (
                    <span key={m} className="px-2 py-1 bg-white/[0.02] border border-white/[0.04] rounded text-[10px] text-slate-500">{m}</span>
                  ))}
                </div>
              </div>

              <div className="mt-4 p-3 bg-amber-500/5 rounded-xl border border-amber-500/10 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-300/70">
                  <span className="font-medium">Instant delivery:</span> Your automation files will be available for download immediately after payment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
