-- ============================================================
-- Photography Studio - Database Schema
-- Gunakan file ini untuk setup database manual di Neon/Supabase
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── Trigger helper ──────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- ─── Users ───────────────────────────────────────────────────
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Portfolio Items ──────────────────────────────────────────
CREATE TABLE portfolio_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100) NOT NULL,
  image_url TEXT NOT NULL,
  featured BOOLEAN DEFAULT FALSE,
  tags TEXT[],
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Services ────────────────────────────────────────────────
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price_from DECIMAL(10,2),
  duration VARCHAR(100),
  features TEXT[],
  category VARCHAR(100),
  image_url TEXT,
  popular BOOLEAN DEFAULT FALSE,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Bookings ────────────────────────────────────────────────
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  event_type VARCHAR(100) NOT NULL,
  event_date DATE NOT NULL,
  event_time TIME,
  location TEXT,
  duration VARCHAR(100),
  price DECIMAL(10,2),
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  notes TEXT,
  service_id UUID REFERENCES services(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Messages ────────────────────────────────────────────────
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  priority VARCHAR(50) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Reviews ─────────────────────────────────────────────────
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  content TEXT NOT NULL,
  service_type VARCHAR(100),
  location VARCHAR(255),
  image_url TEXT,
  video_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  approved BOOLEAN DEFAULT FALSE,
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Blog Posts ──────────────────────────────────────────────
-- CATATAN: Kolom berbeda dari schema.sql lama (slug, featured_image, author_id dihapus)
-- Sekarang pakai: author (text), date (varchar), read_time, image, views, likes
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  author VARCHAR(255) NOT NULL,
  date VARCHAR(50) NOT NULL,
  read_time VARCHAR(50),
  category VARCHAR(100),
  tags TEXT[],
  image TEXT,
  featured BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT FALSE,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Settings ────────────────────────────────────────────────
-- PENTING: value adalah TEXT biasa, BUKAN JSONB
-- Karena context memperlakukannya sebagai string
CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(255) UNIQUE NOT NULL,
  value TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── FAQs ────────────────────────────────────────────────────
-- Tabel ini TIDAK ADA di schema lama - wajib dibuat manual
CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(100) NOT NULL DEFAULT 'General',
  "order" INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Indexes ─────────────────────────────────────────────────
CREATE INDEX idx_portfolio_category ON portfolio_items(category);
CREATE INDEX idx_portfolio_featured ON portfolio_items(featured);
CREATE INDEX idx_portfolio_created_at ON portfolio_items(created_at DESC);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_event_date ON bookings(event_date);
CREATE INDEX idx_bookings_created_at ON bookings(created_at DESC);
CREATE INDEX idx_messages_status ON messages(status);
CREATE INDEX idx_messages_priority ON messages(priority);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_reviews_featured ON reviews(featured);
CREATE INDEX idx_reviews_approved ON reviews(approved);
CREATE INDEX idx_blog_published ON blog_posts(published);
CREATE INDEX idx_blog_category ON blog_posts(category);
CREATE INDEX idx_blog_created_at ON blog_posts(created_at DESC);
CREATE INDEX idx_faq_category ON faqs(category);
CREATE INDEX idx_faq_order ON faqs("order");

-- ─── Triggers ────────────────────────────────────────────────
CREATE TRIGGER trg_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_portfolio_updated_at BEFORE UPDATE ON portfolio_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_messages_updated_at BEFORE UPDATE ON messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_settings_updated_at BEFORE UPDATE ON settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_faqs_updated_at BEFORE UPDATE ON faqs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ─── Seed: Default Settings ──────────────────────────────────
INSERT INTO settings (key, value, description) VALUES
('site_title', 'Madiun Photography', 'Judul website'),
('business_name', 'Madiun Photography Studio', 'Nama bisnis'),
('business_tagline', 'Mengabadikan Momen Terbaik Anda', 'Tagline bisnis'),
('site_description', 'Layanan fotografi profesional di Madiun untuk pernikahan, potret, dan acara spesial.', 'Deskripsi website'),
('business_about', 'Kami adalah tim fotografer berpengalaman yang berdedikasi mengabadikan momen berharga Anda dengan sentuhan artistik dan pelayanan profesional.', 'Tentang bisnis'),
('contact_email', 'info@madiunphotography.com', 'Email kontak'),
('contact_phone', '+62 123 456 7890', 'Nomor telepon'),
('contact_whatsapp', '+62 123 456 7890', 'Nomor WhatsApp'),
('contact_address', 'Jl. Pahlawan No. 1, Madiun, Jawa Timur 63100', 'Alamat bisnis'),
('contact_hours', 'Senin-Jumat: 09:00-18:00, Sabtu: 10:00-16:00', 'Jam operasional'),
('social_instagram', 'https://instagram.com/madiunphotography', 'URL Instagram'),
('social_facebook', 'https://facebook.com/madiunphotography', 'URL Facebook'),
('social_tiktok', 'https://tiktok.com/@madiunphotography', 'URL TikTok'),
('booking_enabled', 'true', 'Aktifkan booking online'),
('booking_advance_days', '7', 'Minimum hari pemesanan di muka'),
('booking_deposit_percentage', '25', 'Persentase deposit');

-- ─── Seed: Default Services ──────────────────────────────────
INSERT INTO services (name, description, price_from, duration, features, category, popular) VALUES
('Wedding Photography', 'Dokumentasi hari pernikahan Anda dari awal hingga akhir', 5000000, '8-12 jam', ARRAY['Full day coverage', 'Engagement session', 'Online gallery', 'Print release'], 'Wedding', true),
('Foto Potret', 'Foto potret profesional untuk individu atau pasangan', 750000, '1-2 jam', ARRAY['Studio atau outdoor', 'Konsultasi outfit', 'Foto retouch', 'Galeri digital'], 'Portrait', false),
('Foto Keluarga', 'Abadikan momen bersama keluarga dengan indah', 1000000, '2-3 jam', ARRAY['Multi lokasi', 'Semua anggota keluarga', 'Lifestyle shots', 'Galeri digital'], 'Family', false),
('Foto Produk', 'Foto produk berkualitas tinggi untuk bisnis Anda', 500000, '2-4 jam', ARRAY['White background', 'Lifestyle shots', 'Quick delivery', 'Branding focus'], 'Commercial', false);

-- ─── Seed: Default FAQs ──────────────────────────────────────
INSERT INTO faqs (question, answer, category, "order", active) VALUES
('Berapa biaya minimal untuk sesi foto?', 'Biaya minimal dimulai dari Rp 500.000 untuk sesi foto produk. Setiap paket memiliki harga berbeda tergantung durasi dan jenis fotografinya.', 'Harga', 1, true),
('Berapa lama waktu pengiriman foto?', 'Foto siap dalam 3-7 hari kerja setelah sesi foto. Untuk wedding, pengiriman 2-3 minggu.', 'Proses', 2, true),
('Apakah bisa foto di luar kota Madiun?', 'Ya, kami melayani klien di seluruh Jawa Timur. Biaya transportasi akan dikenakan sesuai jarak.', 'Layanan', 3, true),
('Format file apa yang diterima?', 'Foto dikirim dalam format JPEG resolusi tinggi. RAW file tersedia dengan biaya tambahan.', 'Teknis', 4, true),
('Apakah tersedia paket cicilan?', 'Ya, tersedia pembayaran dengan DP 25% saat booking dan pelunasan sebelum hari H.', 'Pembayaran', 5, true);
