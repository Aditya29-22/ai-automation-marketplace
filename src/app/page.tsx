'use client';

import HeroSection from '@/components/HeroSection';
import CategoryGrid from '@/components/CategoryGrid';
import FeaturedSection from '@/components/FeaturedSection';
import TrustSection from '@/components/TrustSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryGrid />
      <FeaturedSection />
      <TrustSection />
    </>
  );
}
