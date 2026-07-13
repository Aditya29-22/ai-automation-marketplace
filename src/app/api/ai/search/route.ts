import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/data/products';

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query) {
      return NextResponse.json({ error: 'Query required' }, { status: 400 });
    }

    const anthropicKey = process.env.ANTHROPIC_API_KEY;

    if (anthropicKey && anthropicKey !== 'your_anthropic_api_key_here') {
      // Use Claude to extract structured search parameters
      const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': anthropicKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 256,
          system: `You extract search parameters from natural language queries about business automations.

Available categories: whatsapp, email, crm, ecommerce, social-media, finance, hr, customer-support, data-analytics, document, bpa, rpa, marketing, industrial
Available tools: n8n, zapier, make, python, gpt, sheets, notion, slack, webhook, airtable
Complexity levels: Beginner, Intermediate, Advanced

Respond ONLY with a JSON object (no markdown, no backticks):
{"keywords": ["word1", "word2"], "category": "category_id or null", "tools": ["tool1"], "priceMax": number_or_null, "complexity": "level_or_null", "freeOnly": boolean}`,
          messages: [{ role: 'user', content: query }],
        }),
      });

      if (claudeResponse.ok) {
        const data = await claudeResponse.json();
        const text = data.content?.[0]?.text || '{}';

        try {
          const params = JSON.parse(text);

          // Filter products using extracted parameters
          let results = [...products];

          if (params.category) {
            results = results.filter(p => p.category === params.category);
          }
          if (params.tools && params.tools.length > 0) {
            results = results.filter(p => params.tools.some((t: string) => p.tools.includes(t)));
          }
          if (params.complexity) {
            results = results.filter(p => p.complexity === params.complexity);
          }
          if (params.freeOnly) {
            results = results.filter(p => p.isFree);
          }
          if (params.priceMax) {
            results = results.filter(p => p.price <= params.priceMax);
          }
          if (params.keywords && params.keywords.length > 0) {
            const keywords = params.keywords.map((k: string) => k.toLowerCase());
            results = results.filter(p =>
              keywords.some((k: string) =>
                p.name.toLowerCase().includes(k) ||
                p.description.toLowerCase().includes(k) ||
                p.category.toLowerCase().includes(k)
              )
            );
          }

          // If no results after filtering, fall back to keyword search
          if (results.length === 0) {
            results = basicSearch(query);
          }

          return NextResponse.json({
            results: results.slice(0, 12),
            params,
            aiPowered: true,
          });
        } catch {
          // JSON parse failed, fall back
        }
      }
    }

    // Fallback: basic keyword search
    const results = basicSearch(query);
    return NextResponse.json({
      results: results.slice(0, 12),
      params: { keywords: query.toLowerCase().split(' ') },
      aiPowered: false,
    });
  } catch (error: any) {
    console.error('Smart search error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}

function basicSearch(query: string) {
  const q = query.toLowerCase();
  const words = q.split(/\s+/).filter(w => w.length > 2);

  return products
    .map(p => {
      const searchText = `${p.name} ${p.description} ${p.category} ${p.subcategory} ${p.tools.join(' ')}`.toLowerCase();
      const score = words.reduce((s, word) => s + (searchText.includes(word) ? 1 : 0), 0);
      return { ...p, score };
    })
    .filter(p => p.score > 0)
    .sort((a, b) => b.score - a.score);
}
