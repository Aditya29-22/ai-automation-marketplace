'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { getSupabaseClient } from '@/lib/supabase/client';

function AuthSync() {
  const { setUser, setLoggedIn } = useStore();

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const name = session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User';
        setUser({
          id: session.user.id,
          name,
          email: session.user.email || '',
          avatar: name.split(' ').map((n: string) => n[0]).join('').toUpperCase(),
        });
        setLoggedIn(true);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const name = session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User';
        setUser({
          id: session.user.id,
          name,
          email: session.user.email || '',
          avatar: name.split(' ').map((n: string) => n[0]).join('').toUpperCase(),
        });
        setLoggedIn(true);
      } else {
        setUser(null);
        setLoggedIn(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [setUser, setLoggedIn]);

  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthSync />
      {children}
    </QueryClientProvider>
  );
}
