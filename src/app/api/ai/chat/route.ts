import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/data/products';

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message required' }, { status: 400 });
    }

    const anthropicKey = process.env.ANTHROPIC_API_KEY;

    // Build context from available automations
    const automationContext = products.map(p =>
      `ID:${p.id} | "${p.name}" | Category: ${p.category} | Price: ${p.isFree ? 'FREE' : `₹${p.price}`} | Rating: ${p.rating}/5 (${p.reviewCount} reviews) | Tools: ${p.tools.join(', ')} | Complexity: ${p.complexity} | ${p.description}`
    ).join('\n');

    if (anthropicKey && anthropicKey !== 'your_anthropic_api_key_here') {
      // Real Claude API call
      const messages = [
        ...(history || []).map((h: any) => ({
          role: h.role === 'bot' ? 'assistant' : 'user',
          content: h.text,
        })),
        { role: 'user', content: message },
      ];

      const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': anthropicKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1024,
          system: `You are AutoBot, an AI assistant for AutomateStore — India's #1 automation marketplace. You help users find the right automation for their business needs.

Available automations:
${automationContext}

Rules:
1. Recommend 1-3 automations that match the user's need
2. Be concise and friendly, use emojis occasionally
3. Always include the automation IDs in your response in this exact format: [RECOMMEND:id1,id2,id3]
4. If no automation matches, suggest they use the "Build for Me" custom request feature
5. Mention key benefits like time saved, cost reduction
6. Prices are in Indian Rupees (₹)
7. Keep responses under 200 words`,
          messages,
        }),
      });

      if (claudeResponse.ok) {
        const claudeData = await claudeResponse.json();
        const responseText = claudeData.content?.[0]?.text || 'I couldn\'t process that. Could you try rephrasing?';

        // Extract recommended IDs
        const idMatch = responseText.match(/\[RECOMMEND:([\d,]+)\]/);
        const recommendedIds = idMatch ? idMatch[1].split(',') : [];
        const cleanText = responseText.replace(/\[RECOMMEND:[\d,]+\]/, '').trim();

        const recommendedProducts = recommendedIds
          .map((id: string) => products.find(p => p.id === id.trim()))
          .filter(Boolean);

        return NextResponse.json({
          text: cleanText,
          products: recommendedProducts,
        });
      }
    }

    // Fallback: Local keyword matching
    const result = localRecommend(message);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Chat AI error:', error);
    const result = localRecommend(message || '');
    return NextResponse.json(result);
  }
}

function localRecommend(query: string): { text: string; products: typeof products } {
  const q = query.toLowerCase();
  let matches: typeof products = [];
  let response = '';

  if (q.includes('invoice') || q.includes('billing') || q.includes('gst') || q.includes('payment')) {
    matches = products.filter(p => p.category === 'finance' || p.name.toLowerCase().includes('invoice'));
    response = 'For invoicing and billing automation, I\'d recommend these solutions. The Invoice Generator handles GST-compliant invoices automatically! 📄';
  } else if (q.includes('whatsapp') || q.includes('chat') || q.includes('message')) {
    matches = products.filter(p => p.category === 'whatsapp' || p.tools.includes('webhook'));
    response = 'Great choice! WhatsApp automation is our most popular category. Here are the best options for you 📱';
  } else if (q.includes('email') || q.includes('mail') || q.includes('newsletter')) {
    matches = products.filter(p => p.category === 'email');
    response = 'Email automation can save you hours! Here\'s what I recommend based on your needs ✉️';
  } else if (q.includes('social') || q.includes('instagram') || q.includes('linkedin') || q.includes('twitter') || q.includes('content')) {
    matches = products.filter(p => p.category === 'social-media' || p.category === 'marketing');
    response = 'Social media management made easy! These automations handle content creation and scheduling 📱';
  } else if (q.includes('crm') || q.includes('lead') || q.includes('sales') || q.includes('customer')) {
    matches = products.filter(p => p.category === 'crm' || p.category === 'customer-support');
    response = 'Lead management and CRM automation — great for growing your sales pipeline! 📈';
  } else if (q.includes('ecommerce') || q.includes('order') || q.includes('shop') || q.includes('store')) {
    matches = products.filter(p => p.category === 'ecommerce');
    response = 'E-commerce automation is a game-changer! Here are solutions for your online store 🛒';
  } else if (q.includes('free') || q.includes('no cost') || q.includes('₹0')) {
    matches = products.filter(p => p.isFree);
    response = 'Here are our completely free automations — no cost, no catch! Perfect for getting started 🎁';
  } else if (q.includes('hr') || q.includes('hiring') || q.includes('onboarding') || q.includes('employee')) {
    matches = products.filter(p => p.category === 'hr');
    response = 'HR automation is essential for growing teams. Check these out 👥';
  } else if (q.includes('data') || q.includes('dashboard') || q.includes('report') || q.includes('analytics')) {
    matches = products.filter(p => p.category === 'data-analytics');
    response = 'Data and analytics automation — see your metrics in real-time! 📊';
  } else if (q.includes('document') || q.includes('ocr') || q.includes('pdf') || q.includes('extract')) {
    matches = products.filter(p => p.category === 'document');
    response = 'Document processing made easy with AI! Here\'s what I recommend 📑';
  } else if (q.includes('cheap') || q.includes('budget') || q.includes('affordable')) {
    matches = [...products].sort((a, b) => a.price - b.price).slice(0, 3);
    response = 'Here are our most affordable options that still pack a punch! 💰';
  } else if (q.includes('best') || q.includes('popular') || q.includes('top') || q.includes('recommend')) {
    matches = products.filter(p => p.isBestseller);
    response = 'Here are our bestsellers — trusted by hundreds of businesses! ⭐';
  } else if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
    response = 'Hey there! 👋 Tell me what kind of tasks you want to automate. For example:\n\n• "I want to automate invoicing"\n• "Help me with social media"\n• "What\'s best for e-commerce?"\n• "Show me free automations"';
  } else {
    matches = products.filter(p => p.isBestseller).slice(0, 3);
    response = 'I\'m not quite sure what you\'re looking for, but here are our top-rated automations. You can also try our "Build for Me" feature for custom solutions! 🤖';
  }

  return { text: response, products: matches.slice(0, 3) };
}
