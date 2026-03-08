/*
  # Sophie Scarf Orders Database Schema

  1. New Tables
    - `orders`
      - `id` (uuid, primary key) - Unique order identifier
      - `customer_name` (text) - Customer's full name
      - `customer_email` (text) - Customer's email address
      - `customer_phone` (text) - Customer's phone number
      - `delivery_street` (text) - Delivery street address
      - `delivery_postal_code` (text) - Delivery postal code
      - `delivery_city` (text) - Delivery city
      - `scarf_color` (text) - Selected scarf color (grey, blue, brown, yellow, red)
      - `order_status` (text) - Order status (pending, paid, delivered)
      - `payment_reference` (text, optional) - Twint payment reference
      - `total_price` (numeric) - Total price in CHF (default 39.00)
      - `created_at` (timestamptz) - Order creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `orders` table
    - Add policy for public insert (anyone can create an order)
    - Add policy for public select (anyone can view orders - for admin dashboard)
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  delivery_street text NOT NULL,
  delivery_postal_code text NOT NULL,
  delivery_city text NOT NULL,
  scarf_color text NOT NULL CHECK (scarf_color IN ('grey', 'blue', 'brown', 'yellow', 'red')),
  order_status text NOT NULL DEFAULT 'pending' CHECK (order_status IN ('pending', 'paid', 'delivered')),
  payment_reference text,
  total_price numeric NOT NULL DEFAULT 39.00,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone to create orders (public ordering)
CREATE POLICY "Anyone can create orders"
  ON orders
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy to allow anyone to view orders (for admin dashboard)
CREATE POLICY "Anyone can view orders"
  ON orders
  FOR SELECT
  TO public
  USING (true);

-- Policy to allow anyone to update orders (for status updates)
CREATE POLICY "Anyone can update orders"
  ON orders
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS orders_created_at_idx ON orders (created_at DESC);
CREATE INDEX IF NOT EXISTS orders_status_idx ON orders (order_status);