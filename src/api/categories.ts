
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Category } from '@/types/supabase';

// Fetch all categories
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*');
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as Category[];
    }
  });
};

// Fetch a category by ID
export const useCategory = (id?: string) => {
  return useQuery({
    queryKey: ['category', id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as Category;
    },
    enabled: !!id,
  });
};
