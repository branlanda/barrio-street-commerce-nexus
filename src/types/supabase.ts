
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          icon: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          icon: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          icon?: string
          description?: string | null
          created_at?: string
        }
      }
      products: {
        Row: {
          id: string
          vendor_id: string
          name: string
          description: string
          price: number
          currency: string
          image: string
          category_id: string
          available: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          vendor_id: string
          name: string
          description: string
          price: number
          currency: string
          image: string
          category_id: string
          available: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          vendor_id?: string
          name?: string
          description?: string
          price?: number
          currency?: string
          image?: string
          category_id?: string
          available?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          user_id: string
          vendor_id: string
          rating: number
          content: string
          created_at: string
          updated_at: string
          user_name: string
        }
        Insert: {
          id?: string
          user_id: string
          vendor_id: string
          rating: number
          content: string
          created_at?: string
          updated_at?: string
          user_name: string
        }
        Update: {
          id?: string
          user_id?: string
          vendor_id?: string
          rating?: number
          content?: string
          created_at?: string
          updated_at?: string
          user_name?: string
        }
      }
      vendor_followers: {
        Row: {
          id: string
          user_id: string
          vendor_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          vendor_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          vendor_id?: string
          created_at?: string
        }
      }
      vendors: {
        Row: {
          id: string
          name: string
          description: string
          profile_image: string
          cover_image: string | null
          location: string
          rating: number
          review_count: number
          is_verified: boolean
          created_at: string
          updated_at: string
          owner_id: string
          owner_name: string
          member_since: string
          hours: string | null
          category_ids: string[]
        }
        Insert: {
          id?: string
          name: string
          description: string
          profile_image: string
          cover_image?: string | null
          location: string
          rating?: number
          review_count?: number
          is_verified?: boolean
          created_at?: string
          updated_at?: string
          owner_id: string
          owner_name: string
          member_since?: string
          hours?: string | null
          category_ids?: string[]
        }
        Update: {
          id?: string
          name?: string
          description?: string
          profile_image?: string
          cover_image?: string | null
          location?: string
          rating?: number
          review_count?: number
          is_verified?: boolean
          created_at?: string
          updated_at?: string
          owner_id?: string
          owner_name?: string
          member_since?: string
          hours?: string | null
          category_ids?: string[]
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Convenient types for improved type safety with Supabase entities
export type Vendor = Database['public']['Tables']['vendors']['Row']
export type Product = Database['public']['Tables']['products']['Row']
export type Category = Database['public']['Tables']['categories']['Row']
export type Review = Database['public']['Tables']['reviews']['Row']
export type VendorFollower = Database['public']['Tables']['vendor_followers']['Row']

// Update types for inserting/updating
export type VendorInsert = Database['public']['Tables']['vendors']['Insert']
export type VendorUpdate = Database['public']['Tables']['vendors']['Update']
export type ProductInsert = Database['public']['Tables']['products']['Insert']
export type ProductUpdate = Database['public']['Tables']['products']['Update']
export type ReviewInsert = Database['public']['Tables']['reviews']['Insert']
