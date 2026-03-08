import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Order = {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  delivery_street: string;
  delivery_postal_code: string;
  delivery_city: string;
  scarf_color: 'kornblumen-blau' | 'rose' | 'grau-braun' | 'kitt' | 'himbeer';
  scarf_size: 'small' | 'regular';
  order_status: 'pending' | 'paid' | 'delivered';
  payment_reference: string | null;
  total_price: number;
  created_at: string;
  updated_at: string;
};
