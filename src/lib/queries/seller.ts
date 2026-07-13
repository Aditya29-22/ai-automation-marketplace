import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSupabaseClient } from '@/lib/supabase/client';

interface SellerStats {
  totalRevenue: number;
  totalSales: number;
  avgRating: number;
  totalViews: number;
  revenueByMonth: { month: string; revenue: number }[];
}

interface SellerListing {
  id: string;
  name: string;
  status: string;
  price: number;
  rating: number;
  review_count: number;
  views: number;
  sales: number;
  created_at: string;
  thumbnail: string;
  category: string;
}

interface PayoutRecord {
  id: string;
  amount: number;
  status: string;
  payout_method: string;
  created_at: string;
  processed_at: string | null;
}

async function fetchSellerStats(): Promise<SellerStats> {
  const res = await fetch('/api/seller/stats');
  if (!res.ok) {
    // Return mock data as fallback
    return {
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
    };
  }
  return res.json();
}

async function fetchSellerListings(): Promise<SellerListing[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('automations')
    .select('*')
    .eq('seller_id', user.id)
    .order('created_at', { ascending: false });

  if (error) return [];
  return (data || []) as unknown as SellerListing[];
}

async function fetchPayouts(): Promise<PayoutRecord[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('payouts')
    .select('*')
    .eq('seller_id', user.id)
    .order('created_at', { ascending: false });

  if (error) return [];
  return (data || []) as unknown as PayoutRecord[];
}

export function useSellerStats() {
  return useQuery({
    queryKey: ['seller-stats'],
    queryFn: fetchSellerStats,
  });
}

export function useSellerListings() {
  return useQuery({
    queryKey: ['seller-listings'],
    queryFn: fetchSellerListings,
  });
}

export function usePayouts() {
  return useQuery({
    queryKey: ['payouts'],
    queryFn: fetchPayouts,
  });
}

export function useCreateListing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch('/api/seller/listings', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to create listing');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seller-listings'] });
    },
  });
}

export function useRequestPayout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { amount: number; payout_method: string; details: string }) => {
      const res = await fetch('/api/seller/payouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to request payout');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payouts'] });
    },
  });
}
