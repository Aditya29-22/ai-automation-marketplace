-- ============================================
-- Seed Data
-- Run AFTER schema.sql and rls.sql
-- ============================================

-- Categories
INSERT INTO public.categories (id, name, image, count, sort_order) VALUES
  ('whatsapp', 'WhatsApp Automation', 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=200&h=200', 24, 1),
  ('email', 'Email Automation', 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&q=80&w=200&h=200', 31, 2),
  ('crm', 'CRM Automation', 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=200&h=200', 18, 3),
  ('ecommerce', 'E-Commerce', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=200&h=200', 22, 4),
  ('social-media', 'Social Media', 'https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&q=80&w=200&h=200', 27, 5),
  ('finance', 'Finance & Invoicing', 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=200&h=200', 15, 6),
  ('hr', 'HR & Recruitment', 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=200&h=200', 12, 7),
  ('customer-support', 'Customer Support', 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&q=80&w=200&h=200', 19, 8),
  ('data-analytics', 'Data & Analytics', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=200&h=200', 14, 9),
  ('document', 'Document Processing', 'https://images.unsplash.com/photo-1618044733300-9472054094ee?auto=format&fit=crop&q=80&w=200&h=200', 11, 10),
  ('bpa', 'Business Process', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=200&h=200', 20, 11),
  ('rpa', 'RPA Bots', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=200&h=200', 16, 12),
  ('marketing', 'Marketing Automation', 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=200&h=200', 25, 13),
  ('industrial', 'Industrial IoT', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=200&h=200', 8, 14)
ON CONFLICT (id) DO NOTHING;

-- Coupons
INSERT INTO public.coupons (code, type, value, max_discount, is_active) VALUES
  ('LAUNCH50', 'percentage', 50, 5000, true),
  ('FIRST20', 'percentage', 20, 3000, true),
  ('AUTOMATE10', 'percentage', 10, NULL, true),
  ('WELCOME', 'fixed', 500, NULL, true)
ON CONFLICT (code) DO NOTHING;
