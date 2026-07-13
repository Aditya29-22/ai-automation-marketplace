-- ============================================
-- Storage Buckets & Policies
-- Run in Supabase SQL Editor or set up via Dashboard
-- ============================================

-- Create buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('automation-files', 'automation-files', false) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('automation-media', 'automation-media', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', false) ON CONFLICT (id) DO NOTHING;

-- AUTOMATION FILES (private — only purchased users via signed URLs)
CREATE POLICY "Sellers can upload automation files" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'automation-files' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Sellers can update own files" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'automation-files' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- AUTOMATION MEDIA (public — thumbnails, screenshots)
CREATE POLICY "Anyone can view media" ON storage.objects
  FOR SELECT USING (bucket_id = 'automation-media');

CREATE POLICY "Sellers can upload media" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'automation-media' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Sellers can update own media" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'automation-media' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- AVATARS (public)
CREATE POLICY "Anyone can view avatars" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload own avatar" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'avatars' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can update own avatar" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'avatars' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- DOCUMENTS (private — setup guides, PDFs)
CREATE POLICY "Sellers can upload documents" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'documents' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Sellers can update own documents" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'documents' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );
