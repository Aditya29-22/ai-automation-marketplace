import { useState } from 'react';
import {  StarIcon as Star, DollarSignIcon as DollarSign, TrendingUpIcon as TrendingUp, PlusIcon as Plus, EyeIcon as Eye, Trash2Icon as Trash2  } from '../lib/icons';
import { BarChart3, Package, Edit2, CheckCircle } from 'lucide-react';
import { products } from '../data/products';
import { useStore } from '../store/useStore';

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const { isLoggedIn, setAuthModalOpen } = useStore();

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-cyan-500/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-500/10">
            <Package className="w-10 h-10 text-cyan-400/40" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Seller Dashboard</h2>
          <p className="text-slate-500 mb-4">Login to manage your automation listings</p>
          <button onClick={() => setAuthModalOpen(true)}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/10">
            Sign In
          </button>
        </div>
      </div>
    );
  }

  const sellerProducts = products.slice(0, 5);
  const stats = [
    { label: 'Total Revenue', value: '₹3,24,500', change: '+12.5%', icon: <DollarSign className="w-5 h-5" />, color: 'emerald' },
    { label: 'Products Listed', value: '12', change: '+2', icon: <Package className="w-5 h-5" />, color: 'blue' },
    { label: 'Avg Rating', value: '4.7', change: '+0.2', icon: <Star className="w-5 h-5" />, color: 'amber' },
    { label: 'Total Sales', value: '89', change: '+8', icon: <TrendingUp className="w-5 h-5" />, color: 'purple' },
  ];

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const revenueData = [28500, 42000, 35600, 51200, 48900, 67800];
  const maxRevenue = Math.max(...revenueData);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'listings', label: 'My Listings' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'payouts', label: 'Payouts' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white font-[Space_Grotesk]">Seller Dashboard</h1>
            <p className="text-sm text-slate-500">Manage your automation listings and track performance</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/10">
            <Plus className="w-4 h-4" /> New Listing
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="glass rounded-2xl border border-white/[0.04] p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  stat.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400' :
                  stat.color === 'blue' ? 'bg-cyan-500/10 text-cyan-400' :
                  stat.color === 'amber' ? 'bg-amber-500/10 text-amber-400' :
                  'bg-purple-500/10 text-purple-400'
                }`}>
                  {stat.icon}
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  stat.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400' :
                  stat.color === 'blue' ? 'bg-cyan-500/10 text-cyan-400' :
                  stat.color === 'amber' ? 'bg-amber-500/10 text-amber-400' :
                  'bg-purple-500/10 text-purple-400'
                }`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-white font-[Space_Grotesk]">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-1 mb-6 bg-[#111118]/50 rounded-xl border border-white/[0.04] p-1 overflow-x-auto">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/10' : 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.02]'
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3 glass rounded-2xl border border-white/[0.04] p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-semibold text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-cyan-400" /> Revenue Overview
                </h3>
                <select className="px-3 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-lg text-xs text-slate-400">
                  <option>Last 6 months</option>
                </select>
              </div>
              <div className="flex items-end gap-3 h-48">
                {months.map((month, i) => (
                  <div key={month} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-[10px] text-slate-500 font-medium">₹{(revenueData[i] / 1000).toFixed(0)}K</span>
                    <div className="w-full bg-white/[0.03] rounded-t-lg relative" style={{ height: '100%' }}>
                      <div className="absolute bottom-0 w-full bg-gradient-to-t from-cyan-500/60 to-cyan-400/30 rounded-t-lg transition-all duration-500"
                        style={{ height: `${(revenueData[i] / maxRevenue) * 100}%` }} />
                    </div>
                    <span className="text-[10px] text-slate-600">{month}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 glass rounded-2xl border border-white/[0.04] p-6">
              <h3 className="text-base font-semibold text-white mb-4">Recent Sales</h3>
              <div className="space-y-3">
                {[
                  { buyer: 'Rajesh S.', product: 'WhatsApp Bot', amount: '₹4,999', time: '2h ago' },
                  { buyer: 'Priya M.', product: 'Email Sequence', amount: '₹3,499', time: '5h ago' },
                  { buyer: 'Arjun P.', product: 'E-Commerce Pipeline', amount: '₹6,999', time: '1d ago' },
                  { buyer: 'Sneha R.', product: 'Social Media AI', amount: '₹2,999', time: '2d ago' },
                  { buyer: 'Vikram S.', product: 'Invoice Generator', amount: '₹3,999', time: '3d ago' },
                ].map((sale, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/[0.03]">
                    <div className="w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center text-cyan-400 text-xs font-bold border border-cyan-500/10">
                      {sale.buyer.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white">{sale.buyer}</p>
                      <p className="text-[10px] text-slate-500 truncate">{sale.product}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold text-emerald-400">{sale.amount}</p>
                      <p className="text-[10px] text-slate-600">{sale.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'listings' && (
          <div className="glass rounded-2xl border border-white/[0.04] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.04]">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Product</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Price</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Sales</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Rating</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="text-right px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {sellerProducts.map(p => (
                    <tr key={p.id} className="hover:bg-white/[0.01] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={p.thumbnail} alt={p.name} className="w-12 h-10 rounded-lg object-cover" />
                          <div>
                            <p className="text-sm font-medium text-white line-clamp-1">{p.name}</p>
                            <p className="text-[10px] text-slate-500">{p.subcategory}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-white">{p.isFree ? 'Free' : `${p.currency}${p.price.toLocaleString()}`}</td>
                      <td className="px-6 py-4 text-sm text-slate-400">{p.reviewCount}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          <span className="text-sm font-medium text-white">{p.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-medium rounded-lg flex items-center gap-1 w-fit border border-emerald-500/10">
                          <CheckCircle className="w-3 h-3" /> Active
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1.5 text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/5 rounded-lg transition-colors"><Eye className="w-4 h-4" /></button>
                          <button className="p-1.5 text-slate-500 hover:text-amber-400 hover:bg-amber-500/5 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                          <button className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/5 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-3">
            {products.slice(0, 4).flatMap(p => p.reviews).map((review, i) => (
              <div key={i} className="glass rounded-xl border border-white/[0.04] p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-cyan-500/10 rounded-full flex items-center justify-center text-cyan-400 text-xs font-bold border border-cyan-500/10">
                      {review.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{review.user}</p>
                      <p className="text-[10px] text-slate-500">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className={`w-3.5 h-3.5 ${s <= review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-slate-400">{review.comment}</p>
                <div className="flex gap-2 mt-3">
                  <button className="px-3 py-1.5 bg-cyan-500/10 text-cyan-400 text-xs font-medium rounded-lg hover:bg-cyan-500/20 transition-colors border border-cyan-500/10">Reply</button>
                  <button className="px-3 py-1.5 bg-white/[0.02] text-slate-500 text-xs font-medium rounded-lg hover:bg-white/[0.04] transition-colors border border-white/[0.04]">Flag</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'payouts' && (
          <div className="glass rounded-2xl border border-white/[0.04] p-6">
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
                <p className="text-xs text-emerald-400/50 mb-1">Available Balance</p>
                <p className="text-2xl font-bold text-emerald-400 font-[Space_Grotesk]">₹67,800</p>
              </div>
              <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/10">
                <p className="text-xs text-cyan-400/50 mb-1">Pending</p>
                <p className="text-2xl font-bold text-cyan-400 font-[Space_Grotesk]">₹12,498</p>
              </div>
              <div className="p-4 bg-white/[0.02] rounded-xl border border-white/[0.04]">
                <p className="text-xs text-slate-500 mb-1">Total Earned</p>
                <p className="text-2xl font-bold text-white font-[Space_Grotesk]">₹3,24,500</p>
              </div>
            </div>

            <button className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-emerald-500/10">
              Request Payout
            </button>

            <div className="mt-6 pt-6 border-t border-white/[0.04]">
              <h4 className="text-sm font-semibold text-white mb-3">Payout History</h4>
              <div className="space-y-2">
                {[
                  { date: 'Dec 15, 2024', amount: '₹45,200', status: 'Completed' },
                  { date: 'Nov 15, 2024', amount: '₹38,500', status: 'Completed' },
                  { date: 'Oct 15, 2024', amount: '₹51,800', status: 'Completed' },
                ].map((payout, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white/[0.02] rounded-xl border border-white/[0.03]">
                    <div>
                      <p className="text-sm font-medium text-white">{payout.amount}</p>
                      <p className="text-[10px] text-slate-500">{payout.date}</p>
                    </div>
                    <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-medium rounded-lg border border-emerald-500/10">{payout.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
