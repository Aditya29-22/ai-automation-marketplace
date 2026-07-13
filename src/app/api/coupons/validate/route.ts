import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/data/products';

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();
    if (!code) return NextResponse.json({ error: 'Coupon code required' }, { status: 400 });

    // Demo coupons (always available)
    const demoCoupons: Record<string, { discount: number; type: string; description: string }> = {
      'LAUNCH50': { discount: 50, type: 'percentage', description: '50% off launch discount' },
      'FIRST20': { discount: 20, type: 'percentage', description: '20% off first purchase' },
      'AUTOMATE10': { discount: 10, type: 'percentage', description: '10% off any automation' },
    };

    const coupon = demoCoupons[code.toUpperCase()];
    if (coupon) {
      return NextResponse.json({
        valid: true,
        code: code.toUpperCase(),
        discount: coupon.discount,
        type: coupon.type,
        description: coupon.description,
      });
    }

    return NextResponse.json({ valid: false, error: 'Invalid coupon code' }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
