import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabaseClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }

    const supabase = await createAdminSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Auth required' }, { status: 401 });

    // Check if user is admin (check profile role)
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile || profile.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const body = await request.json();
    const { automation_id, action, reason } = body;

    if (!automation_id || !['approved', 'rejected'].includes(action)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('automations')
      .update({
        status: action,
        review_notes: reason || null,
        reviewed_at: new Date().toISOString(),
        reviewed_by: user.id,
      })
      .eq('id', automation_id)
      .select('*, seller:profiles(email, full_name)')
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // Notify seller via email
    if (data?.seller?.email) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/email/send`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'seller_notification',
            to: data.seller.email,
            automationName: data.name,
            amount: 0,
            buyerName: `Admin (${action})`,
          }),
        });
      } catch { /* non-critical */ }
    }

    return NextResponse.json({ success: true, automation: data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
