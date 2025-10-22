import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Category {
  id: string;
  name: string;
  display_order: number;
  created_at: string;
}

export interface Subcategory {
  id: string;
  category_id: string;
  name: string;
  display_order: number;
  created_at: string;
}

export interface Product {
  id: string;
  subcategory_id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock: number;
  created_at: string;
}
