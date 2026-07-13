'use client';

import { useParams } from 'next/navigation';
import ProductDetailPage from '@/components/ProductDetailPage';

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;

  return <ProductDetailPage productId={productId} />;
}
