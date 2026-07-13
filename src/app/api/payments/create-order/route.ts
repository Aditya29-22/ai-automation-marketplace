import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, coupon_code } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 });
    }

    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      // Demo mode: return mock Razorpay order
      const mockTotal = items.reduce((sum: number, item: any) => sum + (item.price || 4999), 0);
      return NextResponse.json({
        orderId: 'demo_order_' + Date.now(),
        razorpayOrderId: 'order_demo_' + crypto.randomBytes(8).toString('hex'),
        razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_demo',
        amount: mockTotal * 100,
        currency: 'INR',
        demo: true,
      });
    }

    const supabase = await createServerSupabaseClient();

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Validate prices from database — NEVER trust frontend prices
    const automationIds = items.map((item: any) => item.automation_id);
    const { data: automations, error: fetchError } = await supabase
      .from('automations')
      .select('id, price, name, is_free, maintenance_monthly, maintenance_yearly')
      .in('id', automationIds);

    if (fetchError || !automations) {
      return NextResponse.json({ error: 'Failed to validate items' }, { status: 500 });
    }

    // Calculate total from DB prices
    let subtotal = 0;
    const validatedItems = items.map((item: any) => {
      const automation = automations.find((a: any) => a.id === item.automation_id);
      if (!automation) throw new Error(`Automation ${item.automation_id} not found`);

      let itemPrice = automation.price;
      if (item.with_maintenance) {
        itemPrice += item.maintenance_type === 'yearly'
          ? (automation.maintenance_yearly || 0)
          : (automation.maintenance_monthly || 0);
      }
      subtotal += itemPrice;
      return { ...item, validated_price: itemPrice, automation_name: automation.name };
    });

    // Apply coupon if provided
    let discount = 0;
    if (coupon_code) {
      const { data: coupon } = await supabase
        .from('coupons')
        .select('*')
        .eq('code', coupon_code.toUpperCase())
        .eq('is_active', true)
        .single();

      if (coupon) {
        if (coupon.type === 'percentage') {
          discount = subtotal * (coupon.value / 100);
          if (coupon.max_discount) discount = Math.min(discount, coupon.max_discount);
        } else {
          discount = coupon.value;
        }
        // Update usage count
        await supabase.from('coupons').update({ usage_count: (coupon.usage_count || 0) + 1 }).eq('id', coupon.id);
      }
    }

    const totalAmount = Math.max(0, Math.round(subtotal - discount));

    // Create order in database
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        total_amount: totalAmount,
        subtotal: subtotal,
        discount: discount,
        coupon_code: coupon_code || null,
        status: 'pending',
        currency: 'INR',
      })
      .select()
      .single();

    if (orderError || !order) {
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }

    // Create order items
    const orderItems = validatedItems.map((item: any) => ({
      order_id: order.id,
      automation_id: item.automation_id,
      price: item.validated_price,
      with_maintenance: item.with_maintenance || false,
      maintenance_type: item.maintenance_type || null,
    }));

    await supabase.from('order_items').insert(orderItems);

    // Create Razorpay order
    const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!razorpayKeyId || !razorpayKeySecret || razorpayKeyId === 'your_razorpay_key_id_here') {
      // Demo mode — return order without Razorpay
      return NextResponse.json({
        orderId: order.id,
        razorpayOrderId: 'order_demo_' + crypto.randomBytes(8).toString('hex'),
        razorpayKeyId: 'rzp_test_demo',
        amount: totalAmount * 100,
        currency: 'INR',
        demo: true,
      });
    }

    // Call Razorpay Orders API
    const razorpayAuth = Buffer.from(`${razorpayKeyId}:${razorpayKeySecret}`).toString('base64');
    const rpResponse = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${razorpayAuth}`,
      },
      body: JSON.stringify({
        amount: totalAmount * 100, // Razorpay uses paise
        currency: 'INR',
        receipt: order.id,
        notes: {
          order_id: order.id,
          user_id: user.id,
        },
      }),
    });

    const rpOrder = await rpResponse.json();

    if (!rpResponse.ok) {
      return NextResponse.json({ error: 'Failed to create payment order' }, { status: 500 });
    }

    // Update order with Razorpay order ID
    await supabase
      .from('orders')
      .update({ razorpay_order_id: rpOrder.id })
      .eq('id', order.id);

    return NextResponse.json({
      orderId: order.id,
      razorpayOrderId: rpOrder.id,
      razorpayKeyId: razorpayKeyId,
      amount: totalAmount * 100,
      currency: 'INR',
      demo: false,
    });
  } catch (error: any) {
    console.error('Create order error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
