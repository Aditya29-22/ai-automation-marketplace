import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { automation_id } = await request.json();

    if (!automation_id) {
      return NextResponse.json({ error: 'Automation ID required' }, { status: 400 });
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        downloadUrl: '#demo-download',
        expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
        demo: true,
      });
    }

    const supabase = await createServerSupabaseClient();

    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Verify user has purchased this automation
    const { data: purchase, error: purchaseError } = await supabase
      .from('purchases')
      .select('*')
      .eq('user_id', user.id)
      .eq('automation_id', automation_id)
      .single();

    if (purchaseError || !purchase) {
      return NextResponse.json({ error: 'No valid purchase found' }, { status: 403 });
    }

    // Check download limits
    if (purchase.max_downloads && purchase.download_count >= purchase.max_downloads) {
      return NextResponse.json({ error: 'Download limit reached. Contact support.' }, { status: 403 });
    }

    // Check expiry
    if (purchase.expires_at && new Date(purchase.expires_at) < new Date()) {
      return NextResponse.json({ error: 'Download link expired. Contact support.' }, { status: 403 });
    }

    // Generate signed URL from Supabase Storage (72-hour expiry)
    const filePath = `automations/${automation_id}/automation.zip`;
    const { data: signedUrl, error: urlError } = await supabase.storage
      .from('automation-files')
      .createSignedUrl(filePath, 72 * 60 * 60); // 72 hours in seconds

    if (urlError || !signedUrl) {
      return NextResponse.json({ error: 'Failed to generate download URL' }, { status: 500 });
    }

    // Increment download count
    await supabase
      .from('purchases')
      .update({ download_count: purchase.download_count + 1 })
      .eq('id', purchase.id);

    return NextResponse.json({
      downloadUrl: signedUrl.signedUrl,
      expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
      downloadsRemaining: purchase.max_downloads ? purchase.max_downloads - purchase.download_count - 1 : null,
    });
  } catch (error: any) {
    console.error('Download error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
