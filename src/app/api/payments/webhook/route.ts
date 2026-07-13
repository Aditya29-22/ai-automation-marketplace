import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabaseClient } from '@/lib/supabase/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const webhookSignature = request.headers.get('x-razorpay-signature');
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || process.env.RAZORPAY_KEY_SECRET;

    // Verify webhook signature
    if (webhookSecret && webhookSecret !== 'your_razorpay_key_secret_here' && webhookSignature) {
      const rawBody = JSON.stringify(body);
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(rawBody)
        .digest('hex');

      if (expectedSignature !== webhookSignature) {
        return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
      }
    }

    const event = body.event;
    const payload = body.payload;

    const supabase = await createAdminSupabaseClient();

    switch (event) {
      case 'payment.captured': {
        // Backup for the verify route — ensure order is marked as paid
        const paymentEntity = payload.payment?.entity;
        if (paymentEntity) {
          const orderId = paymentEntity.notes?.order_id;
          if (orderId) {
            const { data: order } = await supabase
              .from('orders')
              .select('status')
              .eq('id', orderId)
              .single();

            if (order && order.status !== 'paid') {
              await supabase
                .from('orders')
                .update({
                  status: 'paid',
                  payment_id: paymentEntity.id,
                  paid_at: new Date().toISOString(),
                })
                .eq('id', orderId);

              // Create purchase records if not already done
              const { data: existingPurchases } = await supabase
                .from('purchases')
                .select('id')
                .eq('order_id', orderId);

              if (!existingPurchases || existingPurchases.length === 0) {
                const { data: orderItems } = await supabase
                  .from('order_items')
                  .select('automation_id')
                  .eq('order_id', orderId);

                if (orderItems) {
                  const { data: orderData } = await supabase
                    .from('orders')
                    .select('user_id')
                    .eq('id', orderId)
                    .single();

                  if (orderData) {
                    const purchases = orderItems.map((item: any) => ({
                      user_id: orderData.user_id,
                      automation_id: item.automation_id,
                      order_id: orderId,
                      download_count: 0,
                      max_downloads: 10,
                    }));
                    await supabase.from('purchases').insert(purchases);
                  }
                }
              }
            }
          }
        }
        break;
      }

      case 'payment.failed': {
        const paymentEntity = payload.payment?.entity;
        if (paymentEntity) {
          const orderId = paymentEntity.notes?.order_id;
          if (orderId) {
            await supabase
              .from('orders')
              .update({ status: 'failed' })
              .eq('id', orderId);
          }
        }
        break;
      }

      case 'subscription.charged': {
        const subscriptionEntity = payload.subscription?.entity;
        if (subscriptionEntity) {
          // Extend maintenance access
          await supabase
            .from('subscriptions')
            .update({
              status: 'active',
              current_period_end: new Date(
                Date.now() + 30 * 24 * 60 * 60 * 1000
              ).toISOString(),
            })
            .eq('razorpay_subscription_id', subscriptionEntity.id);
        }
        break;
      }

      case 'refund.processed': {
        const refundEntity = payload.refund?.entity;
        if (refundEntity) {
          const paymentId = refundEntity.payment_id;
          const { data: order } = await supabase
            .from('orders')
            .select('id')
            .eq('payment_id', paymentId)
            .single();

          if (order) {
            await supabase
              .from('orders')
              .update({ status: 'refunded' })
              .eq('id', order.id);
          }
        }
        break;
      }
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
