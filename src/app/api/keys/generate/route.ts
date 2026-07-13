import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    if (!isSupabaseConfigured()) {
      const demoKey = 'ak_demo_' + crypto.randomBytes(16).toString('hex');
      return NextResponse.json({ apiKey: demoKey, demo: true });
    }

    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Auth required' }, { status: 401 });

    const { automation_id, tier } = await request.json();

    // Verify purchase
    const { data: purchase } = await supabase
      .from('purchases')
      .select('*')
      .eq('user_id', user.id)
      .eq('automation_id', automation_id)
      .single();

    if (!purchase) return NextResponse.json({ error: 'No purchase found' }, { status: 403 });

    // Generate API key
    const apiKey = `ak_${tier || 'self'}_${crypto.randomBytes(24).toString('hex')}`;

    // Store API key (could be in a separate api_keys table)
    await supabase.from('subscriptions').insert({
      user_id: user.id,
      automation_id,
      api_key: apiKey,
      tier: tier || 'self_service',
      status: 'active',
      current_period_start: new Date().toISOString(),
      current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    });

    return NextResponse.json({ apiKey, tier: tier || 'self_service' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
