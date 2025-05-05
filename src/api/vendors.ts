
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Vendor, VendorInsert, VendorUpdate } from '@/types/supabase';

// Fetch all vendors
export const useVendors = (categoryId?: string) => {
  return useQuery({
    queryKey: ['vendors', categoryId],
    queryFn: async () => {
      let query = supabase
        .from('vendors')
        .select('*');
      
      if (categoryId) {
        query = query.contains('category_ids', [categoryId]);
      }
      
      const { data, error } = await query;
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as Vendor[];
    }
  });
};

// Fetch a single vendor by ID
export const useVendor = (id?: string) => {
  return useQuery({
    queryKey: ['vendor', id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from('vendors')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as Vendor;
    },
    enabled: !!id,
  });
};

// Update a vendor
export const useUpdateVendor = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string, updates: VendorUpdate }) => {
      const { data, error } = await supabase
        .from('vendors')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as Vendor;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['vendor', data.id]
      });
      queryClient.invalidateQueries({
        queryKey: ['vendors']
      });
    }
  });
};

// Check if a user is following a vendor
export const useIsFollowing = (vendorId?: string, userId?: string) => {
  return useQuery({
    queryKey: ['following', vendorId, userId],
    queryFn: async () => {
      if (!vendorId || !userId) return false;
      
      const { data, error } = await supabase
        .from('vendor_followers')
        .select('*')
        .eq('vendor_id', vendorId)
        .eq('user_id', userId);
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data.length > 0;
    },
    enabled: !!vendorId && !!userId,
  });
};

// Follow a vendor
export const useFollowVendor = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ vendorId, userId }: { vendorId: string, userId: string }) => {
      const { data, error } = await supabase
        .from('vendor_followers')
        .insert({
          vendor_id: vendorId,
          user_id: userId
        })
        .select()
        .single();
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['following', variables.vendorId, variables.userId]
      });
    }
  });
};

// Unfollow a vendor
export const useUnfollowVendor = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ vendorId, userId }: { vendorId: string, userId: string }) => {
      const { error } = await supabase
        .from('vendor_followers')
        .delete()
        .eq('vendor_id', vendorId)
        .eq('user_id', userId);
      
      if (error) {
        throw new Error(error.message);
      }
      
      return { success: true };
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['following', variables.vendorId, variables.userId]
      });
    }
  });
};
