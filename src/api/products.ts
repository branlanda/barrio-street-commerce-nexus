
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Product, ProductInsert, ProductUpdate } from '@/types/supabase';

// Fetch all products
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*');
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as Product[];
    }
  });
};

// Fetch products by vendor ID
export const useVendorProducts = (vendorId?: string) => {
  return useQuery({
    queryKey: ['vendor-products', vendorId],
    queryFn: async () => {
      if (!vendorId) return [];
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('vendor_id', vendorId);
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as Product[];
    },
    enabled: !!vendorId,
  });
};

// Create a new product
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (newProduct: ProductInsert) => {
      const { data, error } = await supabase
        .from('products')
        .insert(newProduct)
        .select()
        .single();
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as Product;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['vendor-products', data.vendor_id]
      });
      queryClient.invalidateQueries({
        queryKey: ['products']
      });
    }
  });
};

// Update a product
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string, updates: ProductUpdate }) => {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as Product;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['vendor-products', data.vendor_id]
      });
      queryClient.invalidateQueries({
        queryKey: ['products']
      });
    }
  });
};

// Delete a product
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, vendorId }: { id: string, vendorId: string }) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw new Error(error.message);
      }
      
      return { id, vendorId };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['vendor-products', data.vendorId]
      });
      queryClient.invalidateQueries({
        queryKey: ['products']
      });
    }
  });
};
