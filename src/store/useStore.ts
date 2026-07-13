import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  withMaintenance: boolean;
  maintenanceType: 'monthly' | 'yearly';
}

export interface WishlistItem {
  product: Product;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface AppState {
  // Auth (synced from Supabase via AuthSync provider)
  isLoggedIn: boolean;
  user: UserData | null;
  setUser: (user: UserData | null) => void;
  setLoggedIn: (v: boolean) => void;
  // Legacy login for demo mode (when Supabase isn't configured)
  loginDemo: (name: string, email: string) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authMode: 'login' | 'signup' | 'forgot';
  setAuthMode: (mode: 'login' | 'signup' | 'forgot') => void;

  // Cart (persisted)
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  toggleMaintenance: (productId: string) => void;
  setMaintenanceType: (productId: string, type: 'monthly' | 'yearly') => void;
  clearCart: () => void;
  cartTotal: () => number;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;

  // Wishlist
  wishlist: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Custom Request
  isCustomRequestOpen: boolean;
  setCustomRequestOpen: (open: boolean) => void;

  // Search & Filter
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  selectedTools: string[];
  toggleTool: (tool: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedComplexity: string | null;
  setSelectedComplexity: (c: string | null) => void;
  showFreeOnly: boolean;
  setShowFreeOnly: (v: boolean) => void;
  sortBy: string;
  setSortBy: (s: string) => void;

  // Chatbot
  isChatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  chatMessages: { role: 'user' | 'bot'; text: string; products?: Product[] }[];
  addChatMessage: (msg: { role: 'user' | 'bot'; text: string; products?: Product[] }) => void;
  clearChatMessages: () => void;

  // Purchases (local fallback when Supabase isn't connected)
  purchases: Product[];
  addPurchase: (products: Product[]) => void;

  // Checkout
  isCheckoutComplete: boolean;
  setCheckoutComplete: (v: boolean) => void;

  // Coupon
  appliedCoupon: { code: string; discount: number } | null;
  setAppliedCoupon: (coupon: { code: string; discount: number } | null) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Auth
      isLoggedIn: false,
      user: null,
      setUser: (user) => set({ user }),
      setLoggedIn: (v) => set({ isLoggedIn: v }),
      loginDemo: (name, email) => set({
        isLoggedIn: true,
        user: { id: 'demo-user', name, email, avatar: name.split(' ').map(n => n[0]).join('').toUpperCase() },
        isAuthModalOpen: false,
      }),
      logout: () => set({ isLoggedIn: false, user: null }),
      isAuthModalOpen: false,
      setAuthModalOpen: (open) => set({ isAuthModalOpen: open }),
      authMode: 'login',
      setAuthMode: (mode) => set({ authMode: mode }),

      // Cart
      cart: [],
      addToCart: (product) => {
        const existing = get().cart.find(i => i.product.id === product.id);
        if (existing) return;
        set({ cart: [...get().cart, { product, quantity: 1, withMaintenance: false, maintenanceType: 'monthly' }] });
      },
      removeFromCart: (productId) => set({ cart: get().cart.filter(i => i.product.id !== productId) }),
      toggleMaintenance: (productId) => set({
        cart: get().cart.map(i => i.product.id === productId ? { ...i, withMaintenance: !i.withMaintenance } : i)
      }),
      setMaintenanceType: (productId, type) => set({
        cart: get().cart.map(i => i.product.id === productId ? { ...i, maintenanceType: type } : i)
      }),
      clearCart: () => set({ cart: [] }),
      cartTotal: () => {
        const coupon = get().appliedCoupon;
        const subtotal = get().cart.reduce((total, item) => {
          let itemTotal = item.product.price;
          if (item.withMaintenance) {
            itemTotal += item.maintenanceType === 'monthly'
              ? item.product.maintenancePlan.monthly
              : item.product.maintenancePlan.yearly;
          }
          return total + itemTotal;
        }, 0);
        if (coupon) {
          return Math.max(0, subtotal - (subtotal * coupon.discount / 100));
        }
        return subtotal;
      },
      isCartOpen: false,
      setCartOpen: (open) => set({ isCartOpen: open }),

      // Wishlist
      wishlist: [],
      addToWishlist: (product) => {
        if (get().wishlist.find(i => i.product.id === product.id)) return;
        set({ wishlist: [...get().wishlist, { product }] });
      },
      removeFromWishlist: (productId) => set({ wishlist: get().wishlist.filter(i => i.product.id !== productId) }),
      isInWishlist: (productId) => !!get().wishlist.find(i => i.product.id === productId),

      // Custom Request
      isCustomRequestOpen: false,
      setCustomRequestOpen: (open) => set({ isCustomRequestOpen: open }),

      // Search & Filter
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      selectedCategory: null,
      setSelectedCategory: (cat) => set({ selectedCategory: cat }),
      selectedTools: [],
      toggleTool: (tool) => {
        const tools = get().selectedTools;
        set({ selectedTools: tools.includes(tool) ? tools.filter(t => t !== tool) : [...tools, tool] });
      },
      priceRange: [0, 20000],
      setPriceRange: (range) => set({ priceRange: range }),
      selectedComplexity: null,
      setSelectedComplexity: (c) => set({ selectedComplexity: c }),
      showFreeOnly: false,
      setShowFreeOnly: (v) => set({ showFreeOnly: v }),
      sortBy: 'popular',
      setSortBy: (s) => set({ sortBy: s }),

      // Chatbot
      isChatOpen: false,
      setChatOpen: (open) => set({ isChatOpen: open }),
      chatMessages: [
        { role: 'bot', text: 'Hey! 👋 I\'m AutoBot, your AI assistant. Tell me what you want to automate and I\'ll find the perfect solution for you. Try: "I want to automate my invoices" or "Help me with social media"' }
      ],
      addChatMessage: (msg) => set({ chatMessages: [...get().chatMessages, msg] }),
      clearChatMessages: () => set({
        chatMessages: [{ role: 'bot', text: 'Hey! 👋 I\'m AutoBot, your AI assistant. Tell me what you want to automate and I\'ll find the perfect solution for you.' }]
      }),

      // Purchases
      purchases: [],
      addPurchase: (prods) => set({ purchases: [...get().purchases, ...prods] }),

      // Checkout
      isCheckoutComplete: false,
      setCheckoutComplete: (v) => set({ isCheckoutComplete: v }),

      // Coupon
      appliedCoupon: null,
      setAppliedCoupon: (coupon) => set({ appliedCoupon: coupon }),
    }),
    {
      name: 'automate-store',
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        purchases: state.purchases,
      }),
    }
  )
);
