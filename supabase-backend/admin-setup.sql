-- Admin Dashboard Database Schema
-- Run this in Supabase SQL Editor to set up the admin system

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Page layouts table for dynamic content management
CREATE TABLE IF NOT EXISTS page_layouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_name VARCHAR NOT NULL UNIQUE, -- 'homepage', 'about', etc.
  sections JSONB NOT NULL DEFAULT '[]', -- Dynamic section array
  meta JSONB DEFAULT '{}', -- SEO, settings
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Section templates library
CREATE TABLE IF NOT EXISTS section_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  category VARCHAR NOT NULL, -- 'hero', 'content', 'media', 'gallery', etc.
  template JSONB NOT NULL, -- Default section structure
  preview_image TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

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
  config_key VARCHAR UNIQUE NOT NULL,
  config_value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

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

-- Insert default homepage layout
INSERT INTO page_layouts (page_name, sections, is_published) 
VALUES ('homepage', '[]', true)
ON CONFLICT (page_name) DO NOTHING;

-- Insert default section templates
INSERT INTO section_templates (name, category, template) VALUES
('Hero Section', 'hero', '{
  "type": "hero",
  "layout": {
    "columns": 1,
    "grid": "full-width",
    "background": {"type": "color", "value": "#000000"}
  },
  "content": {
    "headline": "Welcome to Our Site",
    "subtitle": "Experience something amazing",
    "cta": {"text": "Get Started", "link": "#"}
  },
  "styling": {
    "textAlign": "center",
    "padding": "py-20",
    "textColor": "text-white"
  }
}'),
('Text Block', 'content', '{
  "type": "text",
  "layout": {
    "columns": 1,
    "grid": "container",
    "background": {"type": "color", "value": "#ffffff"}
  },
  "content": {
    "title": "Section Title",
    "text": "Your content goes here...",
    "alignment": "left"
  },
  "styling": {
    "padding": "py-12",
    "textColor": "text-gray-900"
  }
}'),
('Image Gallery', 'media', '{
  "type": "gallery",
  "layout": {
    "columns": 3,
    "grid": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    "background": {"type": "color", "value": "#f9fafb"}
  },
  "content": {
    "title": "Gallery",
    "images": []
  },
  "styling": {
    "padding": "py-16",
    "gap": "gap-6"
  }
}'),
('Video Section', 'media', '{
  "type": "video",
  "layout": {
    "columns": 1,
    "grid": "full-width",
    "background": {"type": "color", "value": "#000000"}
  },
  "content": {
    "title": "Video Title",
    "video_url": "",
    "poster_image": ""
  },
  "styling": {
    "padding": "py-16",
    "textColor": "text-white"
  }
}')
ON CONFLICT DO NOTHING;

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
CREATE INDEX IF NOT EXISTS idx_section_templates_category ON section_templates(category);
CREATE INDEX IF NOT EXISTS idx_media_assets_folder ON media_assets(folder);
CREATE INDEX IF NOT EXISTS idx_content_history_page_id ON content_history(page_layout_id);

-- Enable Row Level Security (RLS)
ALTER TABLE page_layouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE section_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE theme_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_history ENABLE ROW LEVEL SECURITY;

-- Create policies (for now, allow all operations - will be restricted later with proper auth)
CREATE POLICY "Allow all operations on page_layouts" ON page_layouts FOR ALL USING (true);
CREATE POLICY "Allow all operations on section_templates" ON section_templates FOR ALL USING (true);
CREATE POLICY "Allow all operations on media_assets" ON media_assets FOR ALL USING (true);
CREATE POLICY "Allow all operations on theme_config" ON theme_config FOR ALL USING (true);
CREATE POLICY "Allow all operations on admin_users" ON admin_users FOR ALL USING (true);
CREATE POLICY "Allow all operations on content_history" ON content_history FOR ALL USING (true);