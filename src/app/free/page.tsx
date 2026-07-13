'use client';

import MarketplacePage from '@/components/MarketplacePage';
import { useEffect } from 'react';
import { useStore } from '@/store/useStore';

export default function FreePage() {
  const { setShowFreeOnly } = useStore();

  useEffect(() => {
    setShowFreeOnly(true);
    return () => setShowFreeOnly(false);
  }, [setShowFreeOnly]);

  return <MarketplacePage />;
}
