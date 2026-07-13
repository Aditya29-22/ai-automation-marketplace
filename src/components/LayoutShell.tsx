'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import AuthModal from '@/components/AuthModal';
import ChatBot from '@/components/ChatBot';
import CustomRequestPage from '@/components/CustomRequestPage';
import { useStore } from '@/store/useStore';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const { isCustomRequestOpen, setCustomRequestOpen } = useStore();

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <CartDrawer />
      <AuthModal />
      <CustomRequestPage isOpen={isCustomRequestOpen} onClose={() => setCustomRequestOpen(false)} />
      <ChatBot />
    </>
  );
}
