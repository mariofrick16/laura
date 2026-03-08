/*
  # Add scarf size and update color options

  1. Changes
    - Add `scarf_size` column to orders table (small or regular)
    - Update scarf_color check constraint to include new colors
    - Set default scarf_size to 'regular'
  
  2. New color options
    - kornblumen-blau (Cornflower Blue, 0463)
    - rose (Rose, 0477)
    - grau-braun (Grey-Brown, 0558)
    - kitt (Kitt, 2027)
    - himbeer (Raspberry, 2043)
  
  3. Size options
    - small (44 CHF)
    - regular (49 CHF)
*/

-- Add scarf_size column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'scarf_size'
  ) THEN
    ALTER TABLE orders ADD COLUMN scarf_size text NOT NULL DEFAULT 'regular' CHECK (scarf_size IN ('small', 'regular'));
  END IF;
END $$;

-- Drop the old constraint on scarf_color if it exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.constraint_column_usage
    WHERE table_name = 'orders' AND constraint_name = 'orders_scarf_color_check'
  ) THEN
    ALTER TABLE orders DROP CONSTRAINT orders_scarf_color_check;
  END IF;
END $$;

-- Add new constraint with updated colors
ALTER TABLE orders ADD CONSTRAINT orders_scarf_color_check 
  CHECK (scarf_color IN ('kornblumen-blau', 'rose', 'grau-braun', 'kitt', 'himbeer'));

-- Create index on scarf_size for faster queries
CREATE INDEX IF NOT EXISTS orders_size_idx ON orders (scarf_size);