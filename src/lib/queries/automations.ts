import { useQuery } from '@tanstack/react-query';
import { getSupabaseClient } from '@/lib/supabase/client';
import { products as localProducts, categories as localCategories } from '@/data/products';
import type { Product } from '@/data/products';

interface AutomationFilters {
  category?: string | null;
  tools?: string[];
  complexity?: string | null;
  freeOnly?: boolean;
  search?: string;
  sortBy?: string;
  priceRange?: [number, number];
}

// Fetch automations with filters — falls back to local data when Supabase isn't configured
async function fetchAutomations(filters: AutomationFilters): Promise<Product[]> {
  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      let query = supabase
        .from('automations')
        .select('*, reviews(*)')
        .eq('status', 'approved');

      if (filters.category) query = query.eq('category', filters.category);
      if (filters.freeOnly) query = query.eq('is_free', true);
      if (filters.complexity) query = query.eq('complexity', filters.complexity);
      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }
      if (filters.priceRange) {
        query = query.gte('price', filters.priceRange[0]).lte('price', filters.priceRange[1]);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data as unknown as Product[];
      }
    } catch {
      // Fall back to local data
    }
  }

  // Fallback: filter local data
  let filtered = [...localProducts];
  if (filters.category) filtered = filtered.filter(p => p.category === filters.category);
  if (filters.freeOnly) filtered = filtered.filter(p => p.isFree);
  if (filters.complexity) filtered = filtered.filter(p => p.complexity === filters.complexity);
  if (filters.tools && filters.tools.length > 0) {
    filtered = filtered.filter(p => filters.tools!.some(t => p.tools.includes(t)));
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }
  if (filters.priceRange) {
    filtered = filtered.filter(p => p.price >= filters.priceRange![0] && p.price <= filters.priceRange![1]);
  }

  switch (filters.sortBy) {
    case 'price-low': filtered.sort((a, b) => a.price - b.price); break;
    case 'price-high': filtered.sort((a, b) => b.price - a.price); break;
    case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
    case 'newest': filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
    default: filtered.sort((a, b) => b.reviewCount - a.reviewCount);
  }

  return filtered;
}

async function fetchAutomation(id: string): Promise<Product | null> {
  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('automations')
        .select('*, reviews(*)')
        .eq('id', id)
        .single();

      if (!error && data) {
        // Track view
        supabase.from('automation_views').insert({ automation_id: id }).then(() => {});
        return data as unknown as Product;
      }
    } catch {
      // Fall back
    }
  }

  return localProducts.find(p => p.id === id) || null;
}

async function fetchCategories() {
  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      const { data, error } = await supabase.from('categories').select('*').order('name');
      if (!error && data && data.length > 0) return data;
    } catch {
      // Fall back
    }
  }

  return localCategories;
}

// ===== HOOKS =====

export function useAutomations(filters: AutomationFilters) {
  return useQuery({
    queryKey: ['automations', filters],
    queryFn: () => fetchAutomations(filters),
  });
}

export function useAutomation(id: string | null) {
  return useQuery({
    queryKey: ['automation', id],
    queryFn: () => (id ? fetchAutomation(id) : null),
    enabled: !!id,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
}
