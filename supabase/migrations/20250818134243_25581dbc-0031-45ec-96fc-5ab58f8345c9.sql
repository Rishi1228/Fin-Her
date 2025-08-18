-- Make the user-documents bucket public so we can access files for verification
UPDATE storage.buckets 
SET public = true 
WHERE id = 'user-documents';

-- Create policy to allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload files" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'user-documents' 
  AND auth.role() = 'authenticated'
);

-- Create policy to allow authenticated users to read their own files
CREATE POLICY "Users can read their own files" ON storage.objects
FOR SELECT USING (
  bucket_id = 'user-documents' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Create policy to allow authenticated users to delete their own files
CREATE POLICY "Users can delete their own files" ON storage.objects
FOR DELETE USING (
  bucket_id = 'user-documents' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);