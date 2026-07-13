-- ============================================
-- Row Level Security Policies
-- Run AFTER schema.sql
-- ============================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automation_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- PROFILES
CREATE POLICY "Public profiles viewable" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- CATEGORIES
CREATE POLICY "Categories viewable by all" ON public.categories FOR SELECT USING (true);

-- AUTOMATIONS
CREATE POLICY "Approved automations viewable" ON public.automations FOR SELECT USING (status = 'approved' OR seller_id = auth.uid());
CREATE POLICY "Sellers can insert automations" ON public.automations FOR INSERT WITH CHECK (auth.uid() = seller_id);
CREATE POLICY "Sellers can update own automations" ON public.automations FOR UPDATE USING (auth.uid() = seller_id);
CREATE POLICY "Sellers can delete own automations" ON public.automations FOR DELETE USING (auth.uid() = seller_id);

-- ORDERS
CREATE POLICY "Users see own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Service can update orders" ON public.orders FOR UPDATE USING (auth.uid() = user_id);

-- ORDER ITEMS
CREATE POLICY "Users see own order items" ON public.order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);
CREATE POLICY "Users can create order items" ON public.order_items FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);

-- PURCHASES
CREATE POLICY "Users see own purchases" ON public.purchases FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System can create purchases" ON public.purchases FOR INSERT WITH CHECK (true);

-- REVIEWS
CREATE POLICY "Reviews viewable by all" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Purchasers can write reviews" ON public.reviews FOR INSERT WITH CHECK (
  auth.uid() = user_id AND
  EXISTS (SELECT 1 FROM public.purchases WHERE purchases.user_id = auth.uid() AND purchases.automation_id = reviews.automation_id)
);
CREATE POLICY "Users can update own reviews" ON public.reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own reviews" ON public.reviews FOR DELETE USING (auth.uid() = user_id);

-- WISHLISTS
CREATE POLICY "Users see own wishlist" ON public.wishlists FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can add to wishlist" ON public.wishlists FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove from wishlist" ON public.wishlists FOR DELETE USING (auth.uid() = user_id);

-- CUSTOM REQUESTS
CREATE POLICY "Users see own requests" ON public.custom_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Anyone can create requests" ON public.custom_requests FOR INSERT WITH CHECK (true);

-- SUBSCRIPTIONS
CREATE POLICY "Users see own subscriptions" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System can manage subscriptions" ON public.subscriptions FOR INSERT WITH CHECK (true);
CREATE POLICY "System can update subscriptions" ON public.subscriptions FOR UPDATE USING (true);

-- PAYOUTS
CREATE POLICY "Sellers see own payouts" ON public.payouts FOR SELECT USING (auth.uid() = seller_id);
CREATE POLICY "Sellers can request payouts" ON public.payouts FOR INSERT WITH CHECK (auth.uid() = seller_id);

-- CHAT SESSIONS
CREATE POLICY "Users see own chats" ON public.chat_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create chats" ON public.chat_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own chats" ON public.chat_sessions FOR UPDATE USING (auth.uid() = user_id);

-- COUPONS
CREATE POLICY "Active coupons viewable" ON public.coupons FOR SELECT USING (is_active = true);

-- AUTOMATION VIEWS
CREATE POLICY "Anyone can create views" ON public.automation_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Sellers see own automation views" ON public.automation_views FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.automations WHERE automations.id = automation_views.automation_id AND automations.seller_id = auth.uid())
);
