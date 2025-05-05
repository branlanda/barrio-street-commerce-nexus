
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Review, ReviewInsert } from '@/types/supabase';

// Fetch reviews for a vendor
export const useVendorReviews = (vendorId?: string) => {
  return useQuery({
    queryKey: ['vendor-reviews', vendorId],
    queryFn: async () => {
      if (!vendorId) return [];
      
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('vendor_id', vendorId)
        .order('created_at', { ascending: false });
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as Review[];
    },
    enabled: !!vendorId,
  });
};

// Create a new review
export const useCreateReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (newReview: ReviewInsert) => {
      const { data, error } = await supabase
        .from('reviews')
        .insert(newReview)
        .select()
        .single();
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as Review;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['vendor-reviews', data.vendor_id]
      });
      // Also invalidate the vendor query to update rating
      queryClient.invalidateQueries({
        queryKey: ['vendor', data.vendor_id]
      });
    }
  });
};

// Delete a review
export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, vendorId }: { id: string, vendorId: string }) => {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw new Error(error.message);
      }
      
      return { id, vendorId };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['vendor-reviews', data.vendorId]
      });
      // Also invalidate the vendor query to update rating
      queryClient.invalidateQueries({
        queryKey: ['vendor', data.vendorId]
      });
    }
  });
};
