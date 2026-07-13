import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = body;

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return NextResponse.json({ error: 'Missing payment details' }, { status: 400 });
    }

    const razorpaySecret = process.env.RAZORPAY_KEY_SECRET;

    // Verify signature using HMAC-SHA256
    if (razorpaySecret && razorpaySecret !== 'your_razorpay_key_secret_here') {
      const expectedSignature = crypto
        .createHmac('sha256', razorpaySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      if (expectedSignature !== razorpay_signature) {
        return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
      }
    }

    if (!isSupabaseConfigured()) {
      // Demo mode
      return NextResponse.json({
        success: true,
        orderId: 'demo_order',
        message: 'Payment verified (demo mode)',
        demo: true,
      });
    }

    const supabase = await createServerSupabaseClient();

    // Find the order by Razorpay order ID
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*, order_items(*, automation:automations(id, name, thumbnail))')
      .eq('razorpay_order_id', razorpay_order_id)
      .single();

    if (orderError || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Update order status to paid
    await supabase
      .from('orders')
      .update({
        status: 'paid',
        payment_id: razorpay_payment_id,
        paid_at: new Date().toISOString(),
      })
      .eq('id', order.id);

    // Create purchase records for download access
    const purchases = order.order_items.map((item: any) => ({
      user_id: order.user_id,
      automation_id: item.automation_id,
      order_id: order.id,
      download_count: 0,
      max_downloads: 10,
      expires_at: null, // No expiry for one-time purchases
    }));

    await supabase.from('purchases').insert(purchases);

    // Trigger delivery email (fire and forget)
    try {
      await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/email/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'purchase_confirmation',
          to: order.user_id,
          orderId: order.id,
        }),
      });
    } catch {
      console.error('Failed to send delivery email');
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      message: 'Payment verified successfully',
      purchases: purchases.length,
    });
  } catch (error: any) {
    console.error('Verify payment error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
