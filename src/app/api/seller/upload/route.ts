import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ error: 'Storage not configured' }, { status: 503 });
    }

    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Auth required' }, { status: 401 });

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const bucket = formData.get('bucket') as string || 'automation-media';
    const automationId = formData.get('automation_id') as string;

    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

    const allowedBuckets = ['automation-files', 'automation-media', 'avatars', 'documents'];
    if (!allowedBuckets.includes(bucket)) {
      return NextResponse.json({ error: 'Invalid bucket' }, { status: 400 });
    }

    const ext = file.name.split('.').pop();
    const path = automationId
      ? `${user.id}/${automationId}/${Date.now()}.${ext}`
      : `${user.id}/${Date.now()}.${ext}`;

    const arrayBuffer = await file.arrayBuffer();
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, arrayBuffer, {
        contentType: file.type,
        upsert: true,
      });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // Get public URL for public buckets
    let url = '';
    if (['automation-media', 'avatars'].includes(bucket)) {
      const { data: publicUrl } = supabase.storage.from(bucket).getPublicUrl(data.path);
      url = publicUrl.publicUrl;
    } else {
      url = data.path; // For private buckets, return the path
    }

    return NextResponse.json({ url, path: data.path, bucket });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
