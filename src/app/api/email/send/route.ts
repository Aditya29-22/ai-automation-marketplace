import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabaseClient } from '@/lib/supabase/server';

// Email templates as HTML strings (using React Email-style markup)
const templates = {
  purchase_confirmation: (data: any) => ({
    subject: `Order Confirmed — ${data.orderItems?.length || 0} automation${data.orderItems?.length !== 1 ? 's' : ''} ready!`,
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #f1f5f9; padding: 40px 24px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="font-size: 24px; font-weight: 700; margin: 0;">AutomateStore</h1>
          <p style="color: #64748b; font-size: 14px;">Order Confirmation</p>
        </div>
        <div style="background: #14141c; border: 1px solid #1e1e2e; border-radius: 16px; padding: 24px; margin-bottom: 24px;">
          <h2 style="font-size: 18px; margin: 0 0 8px;">Payment Successful! 🎉</h2>
          <p style="color: #94a3b8; font-size: 14px; margin: 0 0 16px;">Order #${data.orderId}</p>
          <div style="border-top: 1px solid #1e1e2e; padding-top: 16px;">
            ${(data.orderItems || []).map((item: any) => `
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                <div>
                  <p style="font-weight: 600; margin: 0; font-size: 14px;">${item.name}</p>
                  <p style="color: #64748b; margin: 0; font-size: 12px;">${item.category}</p>
                </div>
              </div>
            `).join('')}
          </div>
          <div style="border-top: 1px solid #1e1e2e; padding-top: 16px; margin-top: 8px;">
            <p style="font-size: 16px; font-weight: 700;">Total: ₹${data.totalAmount?.toLocaleString() || '0'}</p>
          </div>
        </div>
        ${data.downloadLinks ? `
        <div style="background: #14141c; border: 1px solid #1e1e2e; border-radius: 16px; padding: 24px; margin-bottom: 24px;">
          <h3 style="font-size: 16px; margin: 0 0 16px;">📦 Your Downloads</h3>
          ${data.downloadLinks.map((link: any) => `
            <a href="${link.url}" style="display: block; background: linear-gradient(135deg, #06b6d4, #3b82f6); color: white; text-align: center; padding: 12px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; margin-bottom: 8px;">
              Download ${link.name}
            </a>
          `).join('')}
          <p style="color: #64748b; font-size: 12px; margin-top: 12px;">Links expire in 72 hours. You can regenerate them from your dashboard.</p>
        </div>
        ` : ''}
        <div style="text-align: center; margin-top: 24px;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard" style="display: inline-block; background: #1e1e2e; color: #f1f5f9; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 500;">
            Go to Dashboard →
          </a>
        </div>
        <p style="text-align: center; color: #475569; font-size: 12px; margin-top: 32px;">
          Questions? Reply to this email or contact support@automatestore.com
        </p>
      </div>
    `,
  }),

  welcome: (data: any) => ({
    subject: 'Welcome to AutomateStore! 🚀',
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #f1f5f9; padding: 40px 24px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="font-size: 28px; font-weight: 700; margin: 0 0 8px;">Welcome, ${data.name}! 👋</h1>
          <p style="color: #94a3b8; font-size: 16px;">You're now part of India's #1 automation marketplace.</p>
        </div>
        <div style="background: #14141c; border: 1px solid #1e1e2e; border-radius: 16px; padding: 24px; margin-bottom: 24px;">
          <h3 style="font-size: 16px; margin: 0 0 16px;">Here's what you can do:</h3>
          <ul style="color: #94a3b8; font-size: 14px; line-height: 2;">
            <li>🛒 Browse 200+ pre-built automations</li>
            <li>🤖 Chat with our AI to find the perfect fit</li>
            <li>💰 Start with our free automations</li>
            <li>📦 Sell your own automations</li>
          </ul>
        </div>
        <div style="text-align: center;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/marketplace" style="display: inline-block; background: linear-gradient(135deg, #06b6d4, #3b82f6); color: white; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 14px;">
            Explore Marketplace
          </a>
        </div>
      </div>
    `,
  }),

  review_request: (data: any) => ({
    subject: `How's your automation working? Leave a review!`,
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #f1f5f9; padding: 40px 24px;">
        <h2 style="text-align: center;">How's "${data.automationName}" working for you?</h2>
        <p style="color: #94a3b8; text-align: center; font-size: 14px;">Your review helps other buyers make better decisions.</p>
        <div style="text-align: center; margin-top: 24px;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/product/${data.automationId}" style="display: inline-block; background: linear-gradient(135deg, #a855f7, #ec4899); color: white; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-weight: 600;">
            Leave a Review ⭐
          </a>
        </div>
      </div>
    `,
  }),

  seller_notification: (data: any) => ({
    subject: `🎉 New sale! You earned ₹${data.amount?.toLocaleString()}`,
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #f1f5f9; padding: 40px 24px;">
        <h2 style="text-align: center;">You made a sale! 🎉</h2>
        <div style="background: #14141c; border: 1px solid #1e1e2e; border-radius: 16px; padding: 24px; margin: 24px 0;">
          <p><strong>Product:</strong> ${data.automationName}</p>
          <p><strong>Amount:</strong> ₹${data.amount?.toLocaleString()}</p>
          <p><strong>Buyer:</strong> ${data.buyerName}</p>
        </div>
        <div style="text-align: center;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/seller" style="display: inline-block; background: #1e1e2e; color: #f1f5f9; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-size: 14px;">
            View Dashboard →
          </a>
        </div>
      </div>
    `,
  }),

  custom_request_confirmation: (data: any) => ({
    subject: 'Your custom automation request has been received!',
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #f1f5f9; padding: 40px 24px;">
        <h2 style="text-align: center;">Custom Request Received ✅</h2>
        <p style="color: #94a3b8; text-align: center;">We'll review your requirements and get back to you within 24-48 hours.</p>
        <div style="background: #14141c; border: 1px solid #1e1e2e; border-radius: 16px; padding: 24px; margin: 24px 0;">
          <p><strong>Request:</strong> ${data.description}</p>
          <p><strong>Budget:</strong> ${data.budget}</p>
          <p><strong>Timeline:</strong> ${data.timeline}</p>
        </div>
      </div>
    `,
  }),
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, to, ...data } = body;

    if (!type || !to) {
      return NextResponse.json({ error: 'Missing type or recipient' }, { status: 400 });
    }

    const templateFn = templates[type as keyof typeof templates];
    if (!templateFn) {
      return NextResponse.json({ error: 'Unknown email template' }, { status: 400 });
    }

    // Resolve email address if user ID was passed
    let toEmail = to;
    if (!to.includes('@')) {
      const supabase = await createAdminSupabaseClient();
      const { data: profile } = await supabase
        .from('profiles')
        .select('email')
        .eq('id', to)
        .single();
      toEmail = profile?.email || to;
    }

    const template = templateFn(data);

    // Send via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey && resendApiKey !== 'your_resend_api_key_here') {
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: 'AutomateStore <noreply@automatestore.com>',
          to: [toEmail],
          subject: template.subject,
          html: template.html,
        }),
      });

      if (!resendResponse.ok) {
        const error = await resendResponse.json();
        console.error('Resend error:', error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
      }

      const result = await resendResponse.json();
      return NextResponse.json({ success: true, id: result.id });
    }

    // Demo mode — log email
    console.log(`[EMAIL DEMO] To: ${toEmail}, Subject: ${template.subject}`);
    return NextResponse.json({
      success: true,
      demo: true,
      message: 'Email logged to console (Resend not configured)',
    });
  } catch (error: any) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
