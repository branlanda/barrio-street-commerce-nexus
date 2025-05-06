
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Get environment variables or use empty strings as fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a mock Supabase client if environment variables are not available
let supabaseClient;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are missing. Using mock client.');
  
  // Create a mock client that doesn't actually connect to Supabase
  // This allows the app to run without actual Supabase credentials
  const mockFunctionResponse = () => Promise.resolve({ data: [], error: null });
  
  supabaseClient = {
    from: () => ({
      select: () => ({
        eq: mockFunctionResponse,
        order: mockFunctionResponse,
        limit: mockFunctionResponse,
        single: mockFunctionResponse,
        contains: mockFunctionResponse,
        match: mockFunctionResponse,
        in: mockFunctionResponse,
        or: mockFunctionResponse,
        neq: mockFunctionResponse,
        gt: mockFunctionResponse,
        lt: mockFunctionResponse,
        gte: mockFunctionResponse,
        lte: mockFunctionResponse,
        range: mockFunctionResponse,
        like: mockFunctionResponse,
        ilike: mockFunctionResponse,
        is: mockFunctionResponse,
        delete: mockFunctionResponse,
        update: mockFunctionResponse,
        insert: mockFunctionResponse,
      }),
      insert: mockFunctionResponse,
      update: mockFunctionResponse,
      delete: mockFunctionResponse,
    }),
    auth: {
      signUp: mockFunctionResponse,
      signIn: mockFunctionResponse,
      signOut: mockFunctionResponse,
      onAuthStateChange: () => ({ data: {}, error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    },
    storage: {
      from: () => ({
        upload: mockFunctionResponse,
        getPublicUrl: () => ({ data: { publicUrl: '' } }),
        list: mockFunctionResponse,
        remove: mockFunctionResponse,
      }),
    },
  };
} else {
  // Create a real Supabase client if environment variables are available
  supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey);
}

export const supabase = supabaseClient;
