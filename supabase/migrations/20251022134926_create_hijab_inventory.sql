/*
  # Create Hijab Inventory System

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text, unique) - Category name (e.g., COTTON, GEORGETTE, JERSEY)
      - `display_order` (integer) - Order for display
      - `created_at` (timestamptz)
    
    - `subcategories`
      - `id` (uuid, primary key)
      - `category_id` (uuid, foreign key)
      - `name` (text) - Subcategory name (e.g., MODAL, LUXE MODAL)
      - `display_order` (integer)
      - `created_at` (timestamptz)
    
    - `products`
      - `id` (uuid, primary key)
      - `subcategory_id` (uuid, foreign key)
      - `name` (text)
      - `description` (text)
      - `price` (decimal)
      - `image_url` (text)
      - `stock` (integer)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated admin write access

  3. Initial Data
    - Populate categories based on the provided screenshot
    - Populate subcategories for each category
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS subcategories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  name text NOT NULL,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subcategory_id uuid REFERENCES subcategories(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text DEFAULT '',
  price decimal(10,2) DEFAULT 0,
  image_url text DEFAULT '',
  stock integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can view subcategories"
  ON subcategories FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert categories"
  ON categories FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update categories"
  ON categories FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete categories"
  ON categories FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert subcategories"
  ON subcategories FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update subcategories"
  ON subcategories FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete subcategories"
  ON subcategories FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (true);

INSERT INTO categories (name, display_order) VALUES
  ('COTTON', 1),
  ('GEORGETTE', 2),
  ('JERSEY', 3),
  ('PARTY WEAR', 4),
  ('CHIFFON', 5),
  ('SATIN', 6),
  ('LBH INSTANT', 7);

DO $$
DECLARE
  cotton_id uuid;
  georgette_id uuid;
  jersey_id uuid;
  party_wear_id uuid;
  chiffon_id uuid;
  satin_id uuid;
  lbh_instant_id uuid;
BEGIN
  SELECT id INTO cotton_id FROM categories WHERE name = 'COTTON';
  SELECT id INTO georgette_id FROM categories WHERE name = 'GEORGETTE';
  SELECT id INTO jersey_id FROM categories WHERE name = 'JERSEY';
  SELECT id INTO party_wear_id FROM categories WHERE name = 'PARTY WEAR';
  SELECT id INTO chiffon_id FROM categories WHERE name = 'CHIFFON';
  SELECT id INTO satin_id FROM categories WHERE name = 'SATIN';
  SELECT id INTO lbh_instant_id FROM categories WHERE name = 'LBH INSTANT';

  INSERT INTO subcategories (category_id, name, display_order) VALUES
    (cotton_id, 'MODAL', 1),
    (cotton_id, 'LUXE MODAL', 2),
    (cotton_id, 'ISTANBUL COTTON', 3),
    (cotton_id, 'WAFFLE LACE', 4),
    (cotton_id, 'PREMIUM COTTON', 5),
    (cotton_id, 'TURKISH COTTON', 6),
    
    (georgette_id, 'ALL GEORGETTE', 1),
    (georgette_id, 'HIJAB + CAP SET', 2),
    (georgette_id, 'PREMIUM GEORGETTE', 3),
    (georgette_id, 'PATTERNED BLACK', 4),
    (georgette_id, 'FISH TAIL KHIMARS', 5),
    (georgette_id, 'EMBROIDERED CLASSICS', 6),
    
    (jersey_id, 'RIBBED JERSEY', 1),
    (jersey_id, 'CLASSIC/COMFORT JERSEY', 2),
    (jersey_id, 'TEXTURED JERSEY', 3),
    (jersey_id, 'OMBRE PREMIUM', 4),
    (jersey_id, 'BAMBOO JERSEY', 5),
    
    (party_wear_id, 'LUXURY', 1),
    (party_wear_id, 'UAE LUXURY', 2),
    (party_wear_id, 'SILK CHIFFON', 3),
    (party_wear_id, 'ORGANZA', 4),
    (party_wear_id, 'SHIMMER STRETCH', 5),
    (party_wear_id, 'RHINESTONE SILK', 6),
    (party_wear_id, 'LUXE LACE 2.0', 7),
    
    (chiffon_id, 'BASIC CHIFFON', 1),
    (chiffon_id, 'SILK CHIFFON', 2),
    (chiffon_id, 'KOREAN CHIFFON', 3),
    
    (satin_id, 'BUBBLE SATIN', 1),
    (satin_id, 'VELVET SATIN', 2),
    (satin_id, 'MUNA SATIN', 3),
    (satin_id, 'SILK SATIN', 4),
    (satin_id, 'SILKATIN', 5),
    (satin_id, 'TURKISH PRINTS', 6),
    
    (lbh_instant_id, 'ALL HIJABS', 1),
    (lbh_instant_id, 'INSTANT HIJAB', 2);
END $$;