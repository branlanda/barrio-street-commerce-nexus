
import { supabase } from '@/integrations/supabase/client';

/**
 * Uploads a file to Supabase Storage
 * @param file The file to upload
 * @param bucket The storage bucket name
 * @param folder Optional folder path within the bucket
 * @returns The public URL of the uploaded file or null if upload failed
 */
export async function uploadFile(file: File, bucket: string, folder: string = ''): Promise<string | null> {
  try {
    // Create a unique file name to avoid collisions
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    
    // Construct the file path
    const filePath = folder ? `${folder}/${fileName}` : fileName;
    
    // Upload the file
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (uploadError) {
      console.error('Error uploading file:', uploadError.message);
      return null;
    }
    
    // Get the public URL
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);
    
    return data.publicUrl;
  } catch (error: any) {
    console.error('Error in file upload:', error.message);
    return null;
  }
}

/**
 * Deletes a file from Supabase Storage
 * @param fileUrl The full public URL of the file to delete
 * @param bucket The storage bucket name
 * @returns Boolean indicating success or failure
 */
export async function deleteFile(fileUrl: string, bucket: string): Promise<boolean> {
  try {
    // Extract the file path from the URL
    const urlObj = new URL(fileUrl);
    const pathWithBucket = urlObj.pathname;
    
    // The path in the URL includes the bucket name, so we need to remove it
    // Format is typically /storage/v1/object/public/bucket-name/file-path
    const parts = pathWithBucket.split(`/${bucket}/`);
    if (parts.length < 2) return false;
    
    const filePath = parts[1];
    
    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);
    
    if (error) {
      console.error('Error deleting file:', error.message);
      return false;
    }
    
    return true;
  } catch (error: any) {
    console.error('Error in file deletion:', error.message);
    return false;
  }
}
