-- ============================================
-- AutomateStore — Complete Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================

-- 1. PROFILES (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'buyer' CHECK (role IN ('buyer', 'seller', 'admin')),
  phone TEXT,
  bio TEXT,
  website TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. CATEGORIES
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image TEXT,
  icon TEXT,
  count INTEGER DEFAULT 0,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. AUTOMATIONS (product listings)
CREATE TABLE IF NOT EXISTS public.automations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  seller_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  category TEXT REFERENCES public.categories(id),
  subcategory TEXT DEFAULT '',
  price NUMERIC DEFAULT 0,
  original_price NUMERIC DEFAULT 0,
  currency TEXT DEFAULT '₹',
  rating NUMERIC DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  tools TEXT[] DEFAULT '{}',
  complexity TEXT DEFAULT 'Beginner' CHECK (complexity IN ('Beginner', 'Intermediate', 'Advanced')),
  setup_time TEXT DEFAULT '30 mins',
  thumbnail TEXT,
  is_free BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false,
  is_bestseller BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT true,
  features TEXT[] DEFAULT '{}',
  requirements TEXT[] DEFAULT '{}',
  what_you_get TEXT[] DEFAULT '{}',
  roi_time_saved TEXT DEFAULT '',
  roi_cost_reduction TEXT DEFAULT '',
  roi_efficiency TEXT DEFAULT '',
  maintenance_monthly NUMERIC DEFAULT 0,
  maintenance_yearly NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'pending_review' CHECK (status IN ('draft', 'pending_review', 'approved', 'rejected', 'archived')),
  review_notes TEXT,
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES public.profiles(id),
  file_path TEXT,
  demo_video_url TEXT,
  before_image TEXT,
  after_image TEXT,
  pricing_tiers JSONB DEFAULT '{}',
  is_hosted BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. ORDERS
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  total_amount NUMERIC NOT NULL DEFAULT 0,
  subtotal NUMERIC DEFAULT 0,
  discount NUMERIC DEFAULT 0,
  currency TEXT DEFAULT 'INR',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed', 'refunded', 'cancelled')),
  payment_id TEXT,
  razorpay_order_id TEXT,
  coupon_code TEXT,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. ORDER ITEMS
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  automation_id UUID REFERENCES public.automations(id) NOT NULL,
  price NUMERIC NOT NULL DEFAULT 0,
  with_maintenance BOOLEAN DEFAULT false,
  maintenance_type TEXT CHECK (maintenance_type IN ('monthly', 'yearly', NULL)),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. PURCHASES (download access)
CREATE TABLE IF NOT EXISTS public.purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  automation_id UUID REFERENCES public.automations(id) NOT NULL,
  order_id UUID REFERENCES public.orders(id),
  download_count INTEGER DEFAULT 0,
  max_downloads INTEGER DEFAULT 10,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. REVIEWS
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  automation_id UUID REFERENCES public.automations(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(automation_id, user_id)
);

-- 8. WISHLISTS
CREATE TABLE IF NOT EXISTS public.wishlists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  automation_id UUID REFERENCES public.automations(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, automation_id)
);

-- 9. CUSTOM REQUESTS
CREATE TABLE IF NOT EXISTS public.custom_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  description TEXT NOT NULL,
  budget TEXT,
  timeline TEXT,
  tools TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 10. SUBSCRIPTIONS (maintenance plans + API key model)
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  automation_id UUID REFERENCES public.automations(id) NOT NULL,
  tier TEXT DEFAULT 'self_service' CHECK (tier IN ('self_service', 'done_with_you', 'done_for_you', 'maintenance')),
  api_key TEXT UNIQUE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled', 'paused')),
  razorpay_subscription_id TEXT,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 11. PAYOUTS
CREATE TABLE IF NOT EXISTS public.payouts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  seller_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  payout_method TEXT DEFAULT 'bank_transfer',
  details TEXT,
  transaction_id TEXT,
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 12. CHAT SESSIONS
CREATE TABLE IF NOT EXISTS public.chat_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  messages JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 13. COUPONS
CREATE TABLE IF NOT EXISTS public.coupons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  type TEXT DEFAULT 'percentage' CHECK (type IN ('percentage', 'fixed')),
  value NUMERIC NOT NULL,
  max_discount NUMERIC,
  min_order NUMERIC DEFAULT 0,
  usage_count INTEGER DEFAULT 0,
  max_usage INTEGER,
  is_active BOOLEAN DEFAULT true,
  valid_from TIMESTAMPTZ DEFAULT now(),
  valid_until TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 14. AUTOMATION VIEWS (analytics)
CREATE TABLE IF NOT EXISTS public.automation_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  automation_id UUID REFERENCES public.automations(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id),
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_automations_category ON public.automations(category);
CREATE INDEX IF NOT EXISTS idx_automations_seller ON public.automations(seller_id);
CREATE INDEX IF NOT EXISTS idx_automations_status ON public.automations(status);
CREATE INDEX IF NOT EXISTS idx_automations_slug ON public.automations(slug);
CREATE INDEX IF NOT EXISTS idx_orders_user ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_user ON public.purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_automation ON public.purchases(automation_id);
CREATE INDEX IF NOT EXISTS idx_reviews_automation ON public.reviews(automation_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_api_key ON public.subscriptions(api_key);
CREATE INDEX IF NOT EXISTS idx_automation_views_automation ON public.automation_views(automation_id);

-- ============================================
-- TRIGGERS
-- ============================================

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at_profiles ON public.profiles;
CREATE TRIGGER set_updated_at_profiles BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_automations ON public.automations;
CREATE TRIGGER set_updated_at_automations BEFORE UPDATE ON public.automations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_orders ON public.orders;
CREATE TRIGGER set_updated_at_orders BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_reviews ON public.reviews;
CREATE TRIGGER set_updated_at_reviews BEFORE UPDATE ON public.reviews FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Update automation rating when review is added
CREATE OR REPLACE FUNCTION public.update_automation_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.automations SET
    rating = (SELECT COALESCE(AVG(rating), 0) FROM public.reviews WHERE automation_id = NEW.automation_id),
    review_count = (SELECT COUNT(*) FROM public.reviews WHERE automation_id = NEW.automation_id)
  WHERE id = NEW.automation_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS update_rating_on_review ON public.reviews;
CREATE TRIGGER update_rating_on_review
  AFTER INSERT OR UPDATE OR DELETE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_automation_rating();
