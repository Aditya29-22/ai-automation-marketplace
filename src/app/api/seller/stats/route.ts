import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/server';

export async function GET() {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        totalRevenue: 324500,
        totalSales: 89,
        avgRating: 4.7,
        totalViews: 12450,
        revenueByMonth: [
          { month: 'Jan', revenue: 28500 },
          { month: 'Feb', revenue: 42000 },
          { month: 'Mar', revenue: 35600 },
          { month: 'Apr', revenue: 51200 },
          { month: 'May', revenue: 48900 },
          { month: 'Jun', revenue: 67800 },
        ],
      });
    }

    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Auth required' }, { status: 401 });

    const { data: listings } = await supabase
      .from('automations')
      .select('id, price, rating, review_count')
      .eq('seller_id', user.id);

    const { data: orderItems } = await supabase
      .from('order_items')
      .select('price, order:orders(status)')
      .in('automation_id', (listings || []).map(l => l.id));

    const paidItems = (orderItems || []).filter((i: any) => i.order?.status === 'paid');
    const totalRevenue = paidItems.reduce((s: number, i: any) => s + (i.price || 0), 0);
    const avgRating = listings && listings.length > 0
      ? listings.reduce((s, l) => s + (l.rating || 0), 0) / listings.length
      : 0;

    return NextResponse.json({
      totalRevenue,
      totalSales: paidItems.length,
      avgRating: Math.round(avgRating * 10) / 10,
      totalViews: 0,
      revenueByMonth: [],
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
