
-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('vendor-images', 'Vendor Images', true),
  ('product-images', 'Product Images', true);

-- Set up policies for vendor-images bucket
CREATE POLICY "Public Access for vendor-images" ON storage.objects
  FOR SELECT TO public USING (bucket_id = 'vendor-images');

CREATE POLICY "Vendor Owners Only Upload" ON storage.objects
  FOR INSERT TO authenticated USING (
    bucket_id = 'vendor-images' AND 
    EXISTS (
      SELECT 1 FROM public.vendors 
      WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Vendor Owners Only Update" ON storage.objects
  FOR UPDATE TO authenticated USING (
    bucket_id = 'vendor-images' AND 
    EXISTS (
      SELECT 1 FROM public.vendors 
      WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Vendor Owners Only Delete" ON storage.objects
  FOR DELETE TO authenticated USING (
    bucket_id = 'vendor-images' AND 
    EXISTS (
      SELECT 1 FROM public.vendors 
      WHERE owner_id = auth.uid()
    )
  );

-- Set up policies for product-images bucket
CREATE POLICY "Public Access for product-images" ON storage.objects
  FOR SELECT TO public USING (bucket_id = 'product-images');

CREATE POLICY "Product Owners Only Upload" ON storage.objects
  FOR INSERT TO authenticated USING (
    bucket_id = 'product-images' AND 
    EXISTS (
      SELECT 1 FROM public.vendors 
      WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Product Owners Only Update" ON storage.objects
  FOR UPDATE TO authenticated USING (
    bucket_id = 'product-images' AND 
    EXISTS (
      SELECT 1 FROM public.vendors 
      WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Product Owners Only Delete" ON storage.objects
  FOR DELETE TO authenticated USING (
    bucket_id = 'product-images' AND 
    EXISTS (
      SELECT 1 FROM public.vendors 
      WHERE owner_id = auth.uid()
    )
  );
