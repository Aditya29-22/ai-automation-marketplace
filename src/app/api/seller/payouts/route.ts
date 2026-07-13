import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/server';

export async function GET() {
  try {
    if (!isSupabaseConfigured()) return NextResponse.json({ payouts: [] });
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Auth required' }, { status: 401 });

    const { data } = await supabase
      .from('payouts')
      .select('*')
      .eq('seller_id', user.id)
      .order('created_at', { ascending: false });

    return NextResponse.json({ payouts: data || [] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Auth required' }, { status: 401 });

    const body = await request.json();
    const { data, error } = await supabase
      .from('payouts')
      .insert({
        seller_id: user.id,
        amount: body.amount,
        status: 'pending',
        payout_method: body.payout_method || 'bank_transfer',
        details: body.details || '',
      })
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ payout: data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
