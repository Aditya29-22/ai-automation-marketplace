import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/server';

export async function GET() {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ listings: [] });
    }
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Auth required' }, { status: 401 });

    const { data, error } = await supabase
      .from('automations')
      .select('*')
      .eq('seller_id', user.id)
      .order('created_at', { ascending: false });

    return NextResponse.json({ listings: data || [] });
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
      .from('automations')
      .insert({
        seller_id: user.id,
        name: body.name,
        slug: body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: body.description,
        long_description: body.longDescription || body.description,
        category: body.category,
        subcategory: body.subcategory || '',
        price: body.price || 0,
        original_price: body.originalPrice || body.price || 0,
        tools: body.tools || [],
        complexity: body.complexity || 'Beginner',
        setup_time: body.setupTime || '30 mins',
        thumbnail: body.thumbnail || '',
        is_free: (body.price || 0) === 0,
        features: body.features || [],
        requirements: body.requirements || [],
        what_you_get: body.whatYouGet || [],
        maintenance_monthly: body.maintenanceMonthly || 0,
        maintenance_yearly: body.maintenanceYearly || 0,
        status: 'pending_review',
      })
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ listing: data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Auth required' }, { status: 401 });

    const body = await request.json();
    const { id, ...updates } = body;

    const { data, error } = await supabase
      .from('automations')
      .update(updates)
      .eq('id', id)
      .eq('seller_id', user.id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ listing: data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Auth required' }, { status: 401 });

    const { id } = await request.json();
    const { error } = await supabase
      .from('automations')
      .delete()
      .eq('id', id)
      .eq('seller_id', user.id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
