-- Admin Dashboard Database Schema
-- Run this in Supabase SQL Editor to set up the admin system

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Component templates library
CREATE TABLE IF NOT EXISTS component_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  type VARCHAR NOT NULL, -- 'hero', 'text', 'image', etc.
  default_props JSONB NOT NULL DEFAULT '{}', -- Default properties for the component
  preview_image TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert default component templates
INSERT INTO component_templates (name, type, default_props) VALUES
('Hero Section', 'hero', '{"headline": "Welcome to Our Site", "subtitle": "Experience something amazing", "cta": {"text": "Get Started", "link": "#"}}'),
('Text Block', 'text', '{"title": "Section Title", "text": "Your content goes here..."}'),
('Image Gallery', 'gallery', '{"title": "Gallery", "images": []}'),
('Video Section', 'video', '{"title": "Video Title", "video_url": "", "poster_image": ""}')
ON CONFLICT DO NOTHING;

-- Enable RLS for component_templates
ALTER TABLE component_templates ENABLE ROW LEVEL SECURITY;

-- Policy for component_templates
CREATE POLICY "Allow all operations for authenticated users on component_templates" ON component_templates
    FOR ALL USING (auth.role() = 'authenticated');

-- Media assets management
CREATE TABLE IF NOT EXISTS media_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename VARCHAR NOT NULL,
  original_filename VARCHAR NOT NULL,
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  alt_text TEXT,
  file_size INTEGER,
  mime_type VARCHAR,
  section VARCHAR, -- Associated section if any
  folder VARCHAR DEFAULT 'general', -- Organization folder
  uploaded_at TIMESTAMP DEFAULT NOW()
);

-- Theme configuration
CREATE TABLE IF NOT EXISTS theme_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  config_key VARCHAR NOT NULL UNIQUE,
  config_value JSONB NOT NULL DEFAULT '{}',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an updated_at trigger for theme_config
CREATE TRIGGER update_theme_config_updated_at 
    BEFORE UPDATE ON theme_config 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS for theme_config
ALTER TABLE theme_config ENABLE ROW LEVEL SECURITY;

-- Policy for theme_config
CREATE POLICY "Allow all operations for authenticated users on theme_config" ON theme_config
    FOR ALL USING (auth.role() = 'authenticated');

-- Create page_layouts table for storing page builder layouts
CREATE TABLE IF NOT EXISTS page_layouts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    page_name VARCHAR(255) NOT NULL UNIQUE,
    sections JSONB NOT NULL DEFAULT '[]',
    meta JSONB DEFAULT '{}',
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an updated_at trigger
CREATE TRIGGER update_page_layouts_updated_at 
    BEFORE UPDATE ON page_layouts 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS (Row Level Security)
ALTER TABLE page_layouts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations for authenticated users
-- In production, you might want to restrict this to admin users only
CREATE POLICY "Allow all operations for authenticated users" ON page_layouts
    FOR ALL USING (auth.role() = 'authenticated');


-- Admin users table (simple auth for now)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR NOT NULL,
  name VARCHAR,
  role VARCHAR DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Content history/versioning
CREATE TABLE IF NOT EXISTS content_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_layout_id UUID REFERENCES page_layouts(id) ON DELETE CASCADE,
  sections_snapshot JSONB NOT NULL,
  change_description TEXT,
  admin_user_id UUID REFERENCES admin_users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert default homepage layout (placeholder - will be populated via admin)
INSERT INTO page_layouts (page_name, sections, meta, is_published) 
VALUES (
  'homepage', 
  '[]'::jsonb,
  '{"title": "King Tut Royal - Exclusive Egyptian Tours", "description": "Experience ancient Egypt with our exclusive VIP tours"}'::jsonb,
  false
)
ON CONFLICT (page_name) DO NOTHING;

-- Insert default theme configuration
INSERT INTO theme_config (config_key, config_value, description) VALUES
('primary_color', '{"value": "#000000", "name": "Primary Color"}', 'Main brand color'),
('secondary_color', '{"value": "#ffffff", "name": "Secondary Color"}', 'Secondary brand color'),
('accent_color', '{"value": "#d4af37", "name": "Accent Color"}', 'Accent/highlight color'),
('font_family', '{"value": "Cormorant Garamond", "name": "Primary Font"}', 'Main typography'),
('background_color', '{"value": "#000000", "name": "Background Color"}', 'Default background color')
ON CONFLICT (config_key) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_page_layouts_name ON page_layouts(page_name);
CREATE INDEX IF NOT EXISTS idx_media_assets_folder ON media_assets(folder);
CREATE INDEX IF NOT EXISTS idx_content_history_page_id ON content_history(page_layout_id);

-- Enable Row Level Security (RLS)
ALTER TABLE page_layouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE theme_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_history ENABLE ROW LEVEL SECURITY;

-- Create policies (for now, allow all operations - will be restricted later with proper auth)
CREATE POLICY "Allow all operations on page_layouts" ON page_layouts FOR ALL USING (true);
CREATE POLICY "Allow all operations on media_assets" ON media_assets FOR ALL USING (true);
CREATE POLICY "Allow all operations on theme_config" ON theme_config FOR ALL USING (true);
CREATE POLICY "Allow all operations on admin_users" ON admin_users FOR ALL USING (true);
CREATE POLICY "Allow all operations on content_history" ON content_history FOR ALL USING (true);