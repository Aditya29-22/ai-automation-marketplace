'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

const ROUTE_MAP: Record<string, string> = {
  home: '/',
  marketplace: '/marketplace',
  free: '/free',
  'seller-dashboard': '/seller',
  seller: '/seller',
  dashboard: '/dashboard',
  checkout: '/checkout',
  pricing: '/pricing',
  product: '/product',
};

export function useNavigation() {
  const router = useRouter();

  const navigate = useCallback((page: string) => {
    router.push(ROUTE_MAP[page] || '/');
  }, [router]);

  const navigateToProduct = useCallback((productId: string) => {
    router.push(`/product/${productId}`);
  }, [router]);

  return { navigate, navigateToProduct, router };
}
