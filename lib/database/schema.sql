-- Photography Studio Database Schema
-- Created for Madiun Photography

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table for authentication
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('admin', 'user')),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Portfolio items table
CREATE TABLE portfolio_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    image_url TEXT NOT NULL,
    featured BOOLEAN DEFAULT FALSE,
    tags TEXT[], -- Array of tags
    metadata JSONB, -- Additional metadata like camera settings, location, etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services table
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price_from DECIMAL(10,2),
    duration VARCHAR(100),
    features TEXT[], -- Array of features
    category VARCHAR(100),
    image_url TEXT,
    popular BOOLEAN DEFAULT FALSE,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings table
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
    service_id UUID REFERENCES services(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages/Contact table
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
    priority VARCHAR(50) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews/Testimonials table
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
    booking_id UUID REFERENCES bookings(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image TEXT,
    category VARCHAR(100),
    tags TEXT[],
    published BOOLEAN DEFAULT FALSE,
    author_id UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Settings table for site configuration
CREATE TABLE settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(255) UNIQUE NOT NULL,
    value JSONB,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
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

-- Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_portfolio_items_updated_at BEFORE UPDATE ON portfolio_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_messages_updated_at BEFORE UPDATE ON messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default admin user (password: admin123)
INSERT INTO users (email, password_hash, name, role) VALUES 
('admin@madiunphotography.com', '$2b$10$rQZ9QmjytWIeJqvGiK6kKOYrDf8fxXxXxXxXxXxXxXxXxXxXxXxXx', 'Admin User', 'admin');

-- Insert default services
INSERT INTO services (name, description, price_from, duration, features, category, popular) VALUES 
('Wedding Photography', 'Complete wedding day coverage with professional editing', 2500.00, '8-12 hours', 
 ARRAY['Full day coverage', 'Engagement session', 'Online gallery', 'Print release'], 'Wedding', true),
('Portrait Session', 'Professional portrait photography for individuals or couples', 350.00, '1-2 hours',
 ARRAY['Studio or location', 'Wardrobe consultation', 'Retouched images', 'Print options'], 'Portrait', false),
('Family Photography', 'Beautiful family portraits capturing your loved ones', 450.00, '2-3 hours',
 ARRAY['Multiple locations', 'All family members', 'Lifestyle shots', 'Digital gallery'], 'Family', false),
('Corporate Events', 'Professional event photography for business occasions', 800.00, '4-8 hours',
 ARRAY['Event coverage', 'Team photos', 'Branding focus', 'Quick delivery'], 'Corporate', false);

-- Insert default settings
INSERT INTO settings (key, value, description) VALUES 
('site_title', '"Madiun Photography"', 'Website title'),
('site_description', '"Professional photography services in Madiun"', 'Website description'),
('contact_email', '"info@madiunphotography.com"', 'Contact email'),
('contact_phone', '"+62 123 456 7890"', 'Contact phone'),
('social_instagram', '"@madiunphotography"', 'Instagram handle'),
('social_facebook', '"madiunphotography"', 'Facebook page'),
('business_hours', '{"monday": "9:00-17:00", "tuesday": "9:00-17:00", "wednesday": "9:00-17:00", "thursday": "9:00-17:00", "friday": "9:00-17:00", "saturday": "10:00-16:00", "sunday": "Closed"}', 'Business hours');
