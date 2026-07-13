import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSupabaseClient } from '@/lib/supabase/client';

interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: string;
  payment_id: string | null;
  razorpay_order_id: string | null;
  coupon_code: string | null;
  created_at: string;
  order_items: OrderItem[];
}

interface OrderItem {
  id: string;
  order_id: string;
  automation_id: string;
  price: number;
  with_maintenance: boolean;
  maintenance_type: string | null;
  automation: {
    name: string;
    thumbnail: string;
    category: string;
  };
}

interface Purchase {
  id: string;
  user_id: string;
  automation_id: string;
  order_id: string;
  download_count: number;
  max_downloads: number;
  expires_at: string | null;
  created_at: string;
  automation: {
    id: string;
    name: string;
    thumbnail: string;
    category: string;
    subcategory: string;
    description: string;
  };
}

async function fetchOrders(): Promise<Order[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*, automation:automations(name, thumbnail, category))')
    .order('created_at', { ascending: false });

  if (error) return [];
  return (data || []) as unknown as Order[];
}

async function fetchPurchases(): Promise<Purchase[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('purchases')
    .select('*, automation:automations(id, name, thumbnail, category, subcategory, description)')
    .order('created_at', { ascending: false });

  if (error) return [];
  return (data || []) as unknown as Purchase[];
}

export function useOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  });
}

export function usePurchases() {
  return useQuery({
    queryKey: ['purchases'],
    queryFn: fetchPurchases,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { items: Array<{ automation_id: string; with_maintenance: boolean; maintenance_type: string }>; coupon_code?: string }) => {
      const res = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to create order');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

export function useVerifyPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => {
      const res = await fetch('/api/payments/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Payment verification failed');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['purchases'] });
    },
  });
}
