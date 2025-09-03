-- Create theme_config table for storing theme customization settings
CREATE TABLE IF NOT EXISTS theme_config (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    primary_color VARCHAR(7) NOT NULL DEFAULT '#3b82f6',
    secondary_color VARCHAR(7) NOT NULL DEFAULT '#64748b',
    accent_color VARCHAR(7) NOT NULL DEFAULT '#f59e0b',
    background_color VARCHAR(7) NOT NULL DEFAULT '#ffffff',
    background_image TEXT,
    font_family VARCHAR(255) NOT NULL DEFAULT 'Inter, system-ui, sans-serif',
    font_size_base INTEGER NOT NULL DEFAULT 16,
    line_height DECIMAL(3,1) NOT NULL DEFAULT 1.5,
    spacing_unit INTEGER NOT NULL DEFAULT 4,
    border_radius INTEGER NOT NULL DEFAULT 8,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_theme_config_updated_at 
    BEFORE UPDATE ON theme_config 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS (Row Level Security)
ALTER TABLE theme_config ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations for authenticated users
-- In production, you might want to restrict this to admin users only
CREATE POLICY "Allow all operations for authenticated users" ON theme_config
    FOR ALL USING (auth.role() = 'authenticated');

-- Insert default theme configuration
INSERT INTO theme_config (
    primary_color,
    secondary_color,
    accent_color,
    background_color,
    font_family,
    font_size_base,
    line_height,
    spacing_unit,
    border_radius
) VALUES (
    '#3b82f6',
    '#64748b',
    '#f59e0b',
    '#ffffff',
    'Inter, system-ui, sans-serif',
    16,
    1.5,
    4,
    8
) ON CONFLICT DO NOTHING;