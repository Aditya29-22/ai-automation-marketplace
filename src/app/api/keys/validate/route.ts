import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabaseClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { api_key } = await request.json();
    if (!api_key) return NextResponse.json({ error: 'API key required' }, { status: 400 });

    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        valid: api_key.startsWith('ak_'),
        tier: 'demo',
        automation_id: 'demo',
        demo: true,
      });
    }

    const supabase = await createAdminSupabaseClient();
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('api_key', api_key)
      .eq('status', 'active')
      .single();

    if (!subscription) {
      return NextResponse.json({ valid: false, error: 'Invalid or inactive API key' }, { status: 401 });
    }

    // Check if subscription is still valid
    if (subscription.current_period_end && new Date(subscription.current_period_end) < new Date()) {
      await supabase.from('subscriptions').update({ status: 'expired' }).eq('id', subscription.id);
      return NextResponse.json({ valid: false, error: 'Subscription expired' }, { status: 401 });
    }

    return NextResponse.json({
      valid: true,
      tier: subscription.tier,
      automation_id: subscription.automation_id,
      user_id: subscription.user_id,
      expires_at: subscription.current_period_end,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
