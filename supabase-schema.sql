-- ══════════════════════════════════════════════════════
--  WINK STORE — Supabase Schema
--  نفّذ هذا الكود كاملاً في Supabase SQL Editor
-- ══════════════════════════════════════════════════════

-- 1. أسعار الشحن (58 ولاية)
CREATE TABLE IF NOT EXISTS shipping_rates (
  id          INTEGER PRIMARY KEY,
  name        TEXT NOT NULL,
  delay       TEXT NOT NULL,
  domicile    INTEGER NOT NULL,
  bureau      INTEGER,
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2. التصنيفات
CREATE TABLE IF NOT EXISTS categories (
  id    SERIAL PRIMARY KEY,
  name  TEXT NOT NULL,
  icon  TEXT NOT NULL,
  count INTEGER DEFAULT 0
);

-- 3. المنتجات
CREATE TABLE IF NOT EXISTS products (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  description TEXT,
  price       INTEGER NOT NULL,
  old_price   INTEGER,
  category_id INTEGER REFERENCES categories(id),
  tags        TEXT[] DEFAULT '{}',
  specs       TEXT[] DEFAULT '{}',
  rating      NUMERIC(3,1) DEFAULT 4.5,
  reviews     INTEGER DEFAULT 0,
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 4. صور المنتجات
CREATE TABLE IF NOT EXISTS product_images (
  id         SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  url        TEXT NOT NULL,
  is_main    BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0
);

-- 5. موديلات المنتجات
CREATE TABLE IF NOT EXISTS product_variants (
  id          SERIAL PRIMARY KEY,
  product_id  INTEGER REFERENCES products(id) ON DELETE CASCADE,
  label       TEXT NOT NULL,
  price       INTEGER NOT NULL,
  description TEXT,
  image_url   TEXT,
  sort_order  INTEGER DEFAULT 0
);

-- 6. الكوبونات
CREATE TABLE IF NOT EXISTS coupons (
  id          SERIAL PRIMARY KEY,
  code        TEXT UNIQUE NOT NULL,
  discount    INTEGER NOT NULL CHECK (discount > 0 AND discount <= 100),
  is_active   BOOLEAN DEFAULT TRUE,
  used_count  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 7. العملاء
CREATE TABLE IF NOT EXISTS customers (
  id         SERIAL PRIMARY KEY,
  name       TEXT NOT NULL,
  phone      TEXT NOT NULL,
  wilaya     TEXT,
  commune    TEXT,
  address    TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. الطلبات
CREATE TABLE IF NOT EXISTS orders (
  id              SERIAL PRIMARY KEY,
  customer_id     INTEGER REFERENCES customers(id),
  customer_name   TEXT NOT NULL,
  customer_phone  TEXT NOT NULL,
  wilaya          TEXT NOT NULL,
  commune         TEXT NOT NULL,
  address         TEXT NOT NULL,
  ship_method     TEXT NOT NULL DEFAULT 'domicile',
  ship_cost       INTEGER NOT NULL DEFAULT 0,
  subtotal        INTEGER NOT NULL,
  discount_pct    INTEGER DEFAULT 0,
  discount_amt    INTEGER DEFAULT 0,
  total           INTEGER NOT NULL,
  coupon_code     TEXT,
  status          TEXT DEFAULT 'pending'
                  CHECK (status IN ('pending','confirmed','shipped','delivered','cancelled')),
  notes           TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 9. تفاصيل الطلب
CREATE TABLE IF NOT EXISTS order_items (
  id          SERIAL PRIMARY KEY,
  order_id    INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  product_id  INTEGER REFERENCES products(id),
  product_name TEXT NOT NULL,
  variant     TEXT,
  price       INTEGER NOT NULL,
  qty         INTEGER NOT NULL,
  total       INTEGER NOT NULL
);

-- ══════════════════════════════════════════════════════
--  بيانات أولية
-- ══════════════════════════════════════════════════════

-- التصنيفات
INSERT INTO categories (name, icon, count) VALUES
  ('إلكترونيات', '💻', 0),
  ('ملابس',      '👕', 0),
  ('منزل ومطبخ', '🏠', 0),
  ('رياضة',      '⚽', 0),
  ('جمال وعناية','✨', 0),
  ('كتب وتعليم', '📚', 0)
ON CONFLICT DO NOTHING;

-- الكوبونات الافتراضية
INSERT INTO coupons (code, discount) VALUES
  ('WINK10',    10),
  ('WELCOME20', 20),
  ('DZ30',      30)
ON CONFLICT (code) DO NOTHING;

-- أسعار الشحن (Anderson Ecommerce — 58 ولاية)
INSERT INTO shipping_rates (id, name, delay, domicile, bureau) VALUES
  (1,  'Adrar',               'J+1/J+5', 1400, 700),
  (2,  'Chlef',               'J/J+1',   650,  450),
  (3,  'Laghouat',            'J/J+1',   750,  600),
  (4,  'Oum-El-Bouaghi',      'J/J+1',   850,  600),
  (5,  'Batna',               'J/J+1',   850,  500),
  (6,  'Béjaïa',              'J/J+1',   850,  500),
  (7,  'Biskra',              'J/J+1',   750,  600),
  (8,  'Béchar',              'J/J+3',   1100, 650),
  (9,  'Blida',               'J/J+1',   750,  450),
  (10, 'Bouira',              'J/J+1',   750,  450),
  (11, 'Tamanrasset',         'J/J+7',   1600, 1000),
  (12, 'Tébessa',             'J/J+1',   850,  500),
  (13, 'Tlemcen',             'J/J+1',   700,  500),
  (14, 'Tiaret',              'J/J+2',   650,  450),
  (15, 'Tizi-Ouzou',         'J/J+1',   750,  500),
  (16, 'Alger',               'J/J+1',   600,  450),
  (17, 'Djelfa',              'J/J+1',   750,  600),
  (18, 'Jijel',               'J/J+2',   850,  550),
  (19, 'Sétif',               'J/J+1',   850,  550),
  (20, 'Saïda',               'J/J+2',   650,  450),
  (21, 'Skikda',              'J/J+1',   800,  550),
  (22, 'Sidi Bel Abbès',      'J/J+1',   700,  450),
  (23, 'Annaba',              'J/J+1',   800,  450),
  (24, 'Guelma',              'J/J+1',   800,  450),
  (25, 'Constantine',         'J/J+1',   800,  450),
  (26, 'Médéa',               'J/J+1',   750,  500),
  (27, 'Mostaganem',          'J/J+1',   550,  450),
  (28, 'M''sila',             'J/J+1',   800,  500),
  (29, 'Mascara',             'J/J+1',   550,  400),
  (30, 'Ouargla',             'J/J+2',   950,  600),
  (31, 'Oran',                'J/J+1',   550,  450),
  (32, 'El Bayadh',           'J/J+3',   950,  600),
  (33, 'Illizi',              'J/J+7',   2000, 800),
  (34, 'Bordj Bou Arreridj',  'J/J+1',   800,  500),
  (35, 'Boumerdès',           'J/J+1',   750,  500),
  (36, 'El-Tarf',             'J/J+1',   850,  600),
  (37, 'Tindouf',             'J/J+7',   1300, NULL),
  (38, 'Tissemsilt',          'J/J+2',   650,  NULL),
  (39, 'El-Oued',             'J/J+1',   950,  600),
  (40, 'Khenchela',           'J/J+2',   950,  500),
  (41, 'Souk-Ahras',          'J/J+1',   850,  500),
  (42, 'Tipaza',              'J/J+1',   750,  450),
  (43, 'Mila',                'J/J+1',   800,  500),
  (44, 'Aïn-Defla',           'J/J+1',   650,  450),
  (45, 'Naâma',               'J/J+3',   1000, 500),
  (46, 'Aïn-Témouchent',      'J/J+1',   700,  450),
  (47, 'Ghardaïa',            'J/J+2',   900,  600),
  (48, 'Relizane',            'J/J+1',   500,  350),
  (49, 'Timimoune',           'j/j+5',   1400, NULL),
  (50, 'Bordj Badji Mokhtar', 'j/j+6',   2000, NULL),
  (51, 'Ouled Djellal',       'j/j+2',   1000, 600),
  (52, 'Beni Abbès',          'j/j+4',   1100, NULL),
  (53, 'In Salah',            'j/j+6',   1600, 800),
  (54, 'In Guezzam',          'j/j+6',   2000, NULL),
  (55, 'Touggourt',           'j/j+3',   850,  500),
  (56, 'Djanet',              'j/j+6',   2000, 800),
  (57, 'El Mghair',           'j/j+3',   1000, NULL),
  (58, 'El Meniaa',           'j/j+3',   1000, NULL)
ON CONFLICT (id) DO NOTHING;

-- ══════════════════════════════════════════════════════
--  Row Level Security (RLS) — الأمان
-- ══════════════════════════════════════════════════════

ALTER TABLE shipping_rates   ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories       ENABLE ROW LEVEL SECURITY;
ALTER TABLE products         ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images   ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons          ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers        ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders           ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items      ENABLE ROW LEVEL SECURITY;

-- السماح للجميع بالقراءة (عرض المنتجات والشحن)
CREATE POLICY "public_read_shipping"   ON shipping_rates   FOR SELECT USING (true);
CREATE POLICY "public_read_categories" ON categories       FOR SELECT USING (true);
CREATE POLICY "public_read_products"   ON products         FOR SELECT USING (is_active = true);
CREATE POLICY "public_read_images"     ON product_images   FOR SELECT USING (true);
CREATE POLICY "public_read_variants"   ON product_variants FOR SELECT USING (true);
CREATE POLICY "public_read_coupons"    ON coupons          FOR SELECT USING (is_active = true);

-- السماح بإضافة الطلبات والعملاء (أي زائر يمكنه الطلب)
CREATE POLICY "public_insert_customers" ON customers    FOR INSERT WITH CHECK (true);
CREATE POLICY "public_insert_orders"    ON orders       FOR INSERT WITH CHECK (true);
CREATE POLICY "public_insert_items"     ON order_items  FOR INSERT WITH CHECK (true);

-- الإدارة الكاملة (anon key — سنحمي الإدارة بكلمة مرور في الكود)
CREATE POLICY "admin_all_products"   ON products         FOR ALL USING (true);
CREATE POLICY "admin_all_images"     ON product_images   FOR ALL USING (true);
CREATE POLICY "admin_all_variants"   ON product_variants FOR ALL USING (true);
CREATE POLICY "admin_all_coupons"    ON coupons          FOR ALL USING (true);
CREATE POLICY "admin_all_shipping"   ON shipping_rates   FOR ALL USING (true);
CREATE POLICY "admin_all_customers"  ON customers        FOR ALL USING (true);
CREATE POLICY "admin_all_orders"     ON orders           FOR ALL USING (true);
CREATE POLICY "admin_all_items"      ON order_items      FOR ALL USING (true);
CREATE POLICY "admin_all_categories" ON categories       FOR ALL USING (true);

-- ══════════════════════════════════════════════════════
--  Storage Bucket للصور
-- ══════════════════════════════════════════════════════

INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT DO NOTHING;

CREATE POLICY "public_read_images_storage"
  ON storage.objects FOR SELECT USING (bucket_id = 'product-images');

CREATE POLICY "admin_upload_images"
  ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "admin_delete_images"
  ON storage.objects FOR DELETE USING (bucket_id = 'product-images');
