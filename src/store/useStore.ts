import { create } from 'zustand';
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

interface AppState {
  // Navigation
  currentPage: string;
  setCurrentPage: (page: string) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;

  // Cart
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

  // Auth
  isLoggedIn: boolean;
  user: { name: string; email: string; avatar: string } | null;
  login: (name: string, email: string) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authMode: 'login' | 'signup' | 'forgot';
  setAuthMode: (mode: 'login' | 'signup' | 'forgot') => void;

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

  // Purchases
  purchases: Product[];
  addPurchase: (products: Product[]) => void;

  // Checkout
  isCheckoutComplete: boolean;
  setCheckoutComplete: (v: boolean) => void;
}

export const useStore = create<AppState>((set, get) => ({
  currentPage: 'home',
  setCurrentPage: (page) => set({ currentPage: page, selectedProductId: page === 'home' ? null : get().selectedProductId }),
  selectedProductId: null,
  setSelectedProductId: (id) => set({ selectedProductId: id }),

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
    return get().cart.reduce((total, item) => {
      let itemTotal = item.product.price;
      if (item.withMaintenance) {
        itemTotal += item.maintenanceType === 'monthly'
          ? item.product.maintenancePlan.monthly
          : item.product.maintenancePlan.yearly;
      }
      return total + itemTotal;
    }, 0);
  },
  isCartOpen: false,
  setCartOpen: (open) => set({ isCartOpen: open }),

  wishlist: [],
  addToWishlist: (product) => {
    if (get().wishlist.find(i => i.product.id === product.id)) return;
    set({ wishlist: [...get().wishlist, { product }] });
  },
  removeFromWishlist: (productId) => set({ wishlist: get().wishlist.filter(i => i.product.id !== productId) }),
  isInWishlist: (productId) => !!get().wishlist.find(i => i.product.id === productId),

  isLoggedIn: false,
  user: null,
  login: (name, email) => set({ isLoggedIn: true, user: { name, email, avatar: name.split(' ').map(n => n[0]).join('').toUpperCase() }, isAuthModalOpen: false }),
  logout: () => set({ isLoggedIn: false, user: null }),
  isAuthModalOpen: false,
  setAuthModalOpen: (open) => set({ isAuthModalOpen: open }),
  authMode: 'login',
  setAuthMode: (mode) => set({ authMode: mode }),

  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  selectedCategory: null,
  setSelectedCategory: (cat) => set({ selectedCategory: cat }),
  selectedTools: [],
  toggleTool: (tool) => {
    const tools = get().selectedTools;
    set({ selectedTools: tools.includes(tool) ? tools.filter(t => t !== tool) : [...tools, tool] });
  },
  priceRange: [0, 15000],
  setPriceRange: (range) => set({ priceRange: range }),
  selectedComplexity: null,
  setSelectedComplexity: (c) => set({ selectedComplexity: c }),
  showFreeOnly: false,
  setShowFreeOnly: (v) => set({ showFreeOnly: v }),
  sortBy: 'popular',
  setSortBy: (s) => set({ sortBy: s }),

  isChatOpen: false,
  setChatOpen: (open) => set({ isChatOpen: open }),
  chatMessages: [
    { role: 'bot', text: 'Hey! 👋 I\'m AutoBot, your AI assistant. Tell me what you want to automate and I\'ll find the perfect solution for you. Try: "I want to automate my invoices" or "Help me with social media"' }
  ],
  addChatMessage: (msg) => set({ chatMessages: [...get().chatMessages, msg] }),

  purchases: [],
  addPurchase: (prods) => set({ purchases: [...get().purchases, ...prods] }),

  isCheckoutComplete: false,
  setCheckoutComplete: (v) => set({ isCheckoutComplete: v }),
}));
