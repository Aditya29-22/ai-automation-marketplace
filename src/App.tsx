import { useEffect } from 'react';
import { useStore } from './store/useStore';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CategoryGrid from './components/CategoryGrid';
import FeaturedSection from './components/FeaturedSection';
import TrustSection from './components/TrustSection';
import Footer from './components/Footer';
import MarketplacePage from './components/MarketplacePage';
import ProductDetailPage from './components/ProductDetailPage';
import DashboardPage from './components/DashboardPage';
import CheckoutPage from './components/CheckoutPage';
import CustomRequestPage from './components/CustomRequestPage';
import SellerDashboard from './components/SellerDashboard';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import ChatBot from './components/ChatBot';

function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryGrid />
      <FeaturedSection />
      <TrustSection />
    </>
  );
}

function FreePage() {
  const { setShowFreeOnly, setCurrentPage } = useStore();

  useEffect(() => {
    setShowFreeOnly(true);
    setCurrentPage('marketplace');
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-slate-500">Loading free automations...</p>
      </div>
    </div>
  );
}

export default function App() {
  const { currentPage, isCustomRequestOpen, setCustomRequestOpen } = useStore();

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />;
      case 'marketplace': return <MarketplacePage />;
      case 'product': return <ProductDetailPage />;
      case 'dashboard': return <DashboardPage />;
      case 'checkout': return <CheckoutPage />;
      case 'seller-dashboard': return <SellerDashboard />;
      case 'free': return <FreePage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <Navbar />
      <main>{renderPage()}</main>
      <Footer />
      <CartDrawer />
      <AuthModal />
      <CustomRequestPage isOpen={isCustomRequestOpen} onClose={() => setCustomRequestOpen(false)} />
      <ChatBot />
    </div>
  );
}
