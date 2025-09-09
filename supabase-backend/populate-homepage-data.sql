-- Populate homepage with current layout data
-- This script will add the current static homepage sections as dynamic data

-- First, insert the homepage layout
INSERT INTO page_layouts (page_name, sections, meta, is_published) 
VALUES (
  'homepage',
  '[
    {
      "id": "hero-section-main",
      "type": "hero",
      "visible": true,
      "layout": {
        "columns": 1,
        "grid": "grid-cols-1",
        "background": {
          "type": "image",
          "value": "#000000",
          "url": "https://d64gsuwffb70l.cloudfront.net/68b1c96bae343289de113d06_1756568030709_0f9cfae8.jpeg"
        }
      },
      "content": {
        "title": "King Tut Royal",
        "subtitle": "Experience Ancient Egypt Like Never Before",
        "description": "Discover the treasures and mysteries of ancient Egypt with our exclusive VIP tours",
        "buttonText": "Explore Packages",
        "buttonLink": "#packages",
        "imageUrl": "https://d64gsuwffb70l.cloudfront.net/68b1c96bae343289de113d06_1756568030709_0f9cfae8.jpeg",
        "imageAlt": "Egyptian Pharaoh"
      },
      "styling": {
        "textColor": "#ffffff",
        "padding": "pt-16",
        "alignment": "center"
      }
    },
    {
      "id": "media-slider-section",
      "type": "media",
      "visible": true,
      "layout": {
        "columns": 1,
        "grid": "grid-cols-1",
        "background": {
          "type": "color",
          "value": "#000000"
        }
      },
      "content": {
        "title": "Experience Egypt",
        "images": [
          {
            "url": "https://images.unsplash.com/photo-1543650876-ca2e94d4e5b6?ixlib=rb-4.0.3",
            "alt": "Ancient Egyptian temple"
          },
          {
            "url": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3",
            "alt": "Pyramids of Giza"
          }
        ]
      },
      "styling": {
        "padding": "py-12"
      }
    },
    {
      "id": "packages-section-main",
      "type": "packages",
      "visible": true,
      "layout": {
        "columns": 2,
        "grid": "md:grid-cols-2",
        "background": {
          "type": "color",
          "value": "#000000"
        }
      },
      "content": {
        "title": "Choose Your Royal Experience",
        "subtitle": "Exclusive packages designed for the discerning traveler",
        "packages": [
          {
            "title": "Royal VIP Experience",
            "price": "€2,900",
            "duration": "5 Days",
            "image": "https://images.unsplash.com/photo-1543650876-ca2e94d4e5b6?ixlib=rb-4.0.3",
            "highlights": [
              "Private Egyptologist guide",
              "Exclusive pyramid access",
              "5-star luxury accommodations",
              "Private transportation",
              "Fine dining experiences"
            ],
            "isPopular": true,
            "icon": "👑"
          },
          {
            "title": "One Day Essentials",
            "price": "€900",
            "duration": "1 Day",
            "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3",
            "highlights": [
              "Professional guide",
              "Pyramid complex visit",
              "Premium transportation",
              "Authentic lunch"
            ],
            "isPopular": false,
            "icon": "🏺"
          }
        ]
      },
      "styling": {
        "padding": "py-20",
        "titleColor": "#ffffff",
        "subtitleColor": "#fbbf24"
      }
    },
    {
      "id": "why-choose-section",
      "type": "features",
      "visible": true,
      "layout": {
        "columns": 3,
        "grid": "md:grid-cols-3",
        "background": {
          "type": "color",
          "value": "#000000"
        }
      },
      "content": {
        "title": "Why Choose King Tut Royal",
        "features": [
          {
            "icon": "👑",
            "title": "VIP Access",
            "description": "Exclusive access to restricted areas and private chambers"
          },
          {
            "icon": "🏺",
            "title": "Expert Guides",
            "description": "Professional Egyptologists with deep historical knowledge"
          },
          {
            "icon": "✨",
            "title": "Luxury Experience",
            "description": "Five-star accommodations and premium transportation"
          }
        ]
      },
      "styling": {
        "padding": "py-20",
        "titleColor": "#ffffff",
        "textColor": "#fbbf24"
      }
    },
    {
      "id": "booking-section-main",
      "type": "booking",
      "visible": true,
      "layout": {
        "columns": 1,
        "grid": "grid-cols-1",
        "background": {
          "type": "color",
          "value": "#000000"
        }
      },
      "content": {
        "title": "Book Your Royal Journey",
        "subtitle": "Reserve your exclusive Egyptian experience today",
        "formFields": [
          "name",
          "email",
          "package",
          "date",
          "guests"
        ]
      },
      "styling": {
        "padding": "py-20",
        "titleColor": "#ffffff",
        "backgroundColor": "#000000"
      }
    }
  ]'::jsonb,
  '{
    "title": "King Tut Royal - Exclusive Egyptian Tours",
    "description": "Experience ancient Egypt with our exclusive VIP tours and packages",
    "keywords": "Egypt tours, VIP tours, Pyramids, King Tut, luxury travel"
  }'::jsonb,
  true
) ON CONFLICT (page_name) DO UPDATE SET
  sections = EXCLUDED.sections,
  meta = EXCLUDED.meta,
  updated_at = CURRENT_TIMESTAMP;

-- Insert section templates for the page builder
INSERT INTO section_templates (name, type, category, preview_image, default_config, is_active)
VALUES 
  (
    'Hero Section',
    'hero',
    'headers',
    'https://images.unsplash.com/photo-1543650876-ca2e94d4e5b6?ixlib=rb-4.0.3&w=400&h=200&fit=crop',
    '{
      "layout": {
        "columns": 1,
        "grid": "grid-cols-1",
        "background": {
          "type": "image",
          "value": "#000000",
          "url": "https://d64gsuwffb70l.cloudfront.net/68b1c96bae343289de113d06_1756568030709_0f9cfae8.jpeg"
        }
      },
      "content": {
        "title": "Your Amazing Title",
        "subtitle": "Your compelling subtitle",
        "description": "Your detailed description here",
        "buttonText": "Call to Action",
        "buttonLink": "#",
        "imageUrl": "https://images.unsplash.com/photo-1543650876-ca2e94d4e5b6?ixlib=rb-4.0.3",
        "imageAlt": "Hero image"
      },
      "styling": {
        "textColor": "#ffffff",
        "padding": "py-20",
        "alignment": "center"
      }
    }'::jsonb,
    true
  ),
  (
    'Text Content',
    'text',
    'content',
    'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&w=400&h=200&fit=crop',
    '{
      "layout": {
        "columns": 1,
        "grid": "grid-cols-1",
        "background": {
          "type": "color",
          "value": "#000000"
        }
      },
      "content": {
        "title": "Section Title",
        "content": "<p>Your content here. You can use <strong>HTML</strong> formatting.</p>",
        "alignment": "left"
      },
      "styling": {
        "textColor": "#ffffff",
        "padding": "py-12"
      }
    }'::jsonb,
    true
  ),
  (
    'Image Gallery',
    'gallery',
    'media',
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&w=400&h=200&fit=crop',
    '{
      "layout": {
        "columns": 3,
        "grid": "md:grid-cols-3",
        "background": {
          "type": "color",
          "value": "#000000"
        }
      },
      "content": {
        "title": "Gallery Title",
        "images": [
          {
            "url": "https://images.unsplash.com/photo-1543650876-ca2e94d4e5b6?ixlib=rb-4.0.3",
            "alt": "Gallery image 1"
          },
          {
            "url": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3",
            "alt": "Gallery image 2"
          }
        ]
      },
      "styling": {
        "padding": "py-12"
      }
    }'::jsonb,
    true
  ),
  (
    'Features Grid',
    'features',
    'content',
    'https://images.unsplash.com/photo-1460472178825-e5240623afd5?ixlib=rb-4.0.3&w=400&h=200&fit=crop',
    '{
      "layout": {
        "columns": 3,
        "grid": "md:grid-cols-3",
        "background": {
          "type": "color",
          "value": "#000000"
        }
      },
      "content": {
        "title": "Features Title",
        "features": [
          {
            "icon": "⚡",
            "title": "Feature 1",
            "description": "Description for feature 1"
          },
          {
            "icon": "🎯",
            "title": "Feature 2",
            "description": "Description for feature 2"
          },
          {
            "icon": "🚀",
            "title": "Feature 3",
            "description": "Description for feature 3"
          }
        ]
      },
      "styling": {
        "padding": "py-20",
        "titleColor": "#ffffff"
      }
    }'::jsonb,
    true
  ),
  (
    'Call to Action',
    'cta',
    'marketing',
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&w=400&h=200&fit=crop',
    '{
      "layout": {
        "columns": 1,
        "grid": "grid-cols-1",
        "background": {
          "type": "gradient",
          "value": "bg-gradient-to-r from-amber-400 to-orange-500"
        }
      },
      "content": {
        "title": "Ready to Get Started?",
        "description": "Take action today and transform your business",
        "buttonText": "Get Started Now",
        "buttonLink": "#contact",
        "secondaryButtonText": "Learn More",
        "secondaryButtonLink": "#about"
      },
      "styling": {
        "textColor": "#ffffff",
        "padding": "py-16",
        "alignment": "center"
      }
    }'::jsonb,
    true
  ),
  (
    'Contact Form',
    'contact',
    'forms',
    'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&w=400&h=200&fit=crop',
    '{
      "layout": {
        "columns": 1,
        "grid": "grid-cols-1",
        "background": {
          "type": "color",
          "value": "#000000"
        }
      },
      "content": {
        "title": "Get In Touch",
        "description": "Contact us for more information",
        "fields": [
          {"name": "name", "label": "Full Name", "type": "text", "required": true},
          {"name": "email", "label": "Email Address", "type": "email", "required": true},
          {"name": "message", "label": "Message", "type": "textarea", "required": true}
        ],
        "buttonText": "Send Message"
      },
      "styling": {
        "padding": "py-20",
        "titleColor": "#ffffff"
      }
    }'::jsonb,
    true
  )
ON CONFLICT (name) DO UPDATE SET
  default_config = EXCLUDED.default_config,
  updated_at = CURRENT_TIMESTAMP;

-- Insert default theme configuration
INSERT INTO theme_config (name, config, is_active, is_default)
VALUES (
  'King Tut Royal Default',
  '{
    "colors": {
      "primary": "#fbbf24",
      "secondary": "#000000",
      "accent": "#f59e0b",
      "background": "#000000",
      "surface": "#1a1a1a",
      "text": "#ffffff",
      "textSecondary": "#fbbf24"
    },
    "typography": {
      "fontFamily": "Inter, system-ui, -apple-system, sans-serif",
      "fontSize": {
        "base": "16px",
        "sm": "14px",
        "lg": "18px",
        "xl": "20px",
        "2xl": "24px",
        "3xl": "30px",
        "4xl": "36px"
      },
      "fontWeight": {
        "normal": "400",
        "medium": "500",
        "semibold": "600",
        "bold": "700"
      },
      "lineHeight": {
        "tight": "1.25",
        "normal": "1.5",
        "relaxed": "1.75"
      }
    },
    "layout": {
      "spacingUnit": "4px",
      "borderRadius": {
        "sm": "4px",
        "md": "8px",
        "lg": "12px",
        "xl": "16px"
      },
      "containerMaxWidth": "1200px",
      "sectionPadding": {
        "sm": "40px",
        "md": "60px",
        "lg": "80px"
      }
    },
    "effects": {
      "boxShadow": {
        "sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
      },
      "transition": {
        "fast": "150ms",
        "normal": "300ms",
        "slow": "500ms"
      }
    }
  }'::jsonb,
  true,
  true
) ON CONFLICT (name) DO UPDATE SET
  config = EXCLUDED.config,
  updated_at = CURRENT_TIMESTAMP;

-- Add some sample media assets
INSERT INTO media_assets (filename, original_filename, file_path, file_url, file_type, file_size, folder, alt_text, caption, metadata)
VALUES 
  (
    'hero-pharaoh.jpeg',
    'pharaoh.jpeg',
    '/uploads/hero-pharaoh.jpeg',
    'https://d64gsuwffb70l.cloudfront.net/68b1c96bae343289de113d06_1756568030709_0f9cfae8.jpeg',
    'image/jpeg',
    245760,
    'hero',
    'Egyptian Pharaoh statue in golden light',
    'Main hero image showing ancient Egyptian pharaoh',
    '{"width": 1200, "height": 800, "usage": "hero_background"}'::jsonb
  ),
  (
    'pyramid-giza.jpeg',
    'pyramid.jpeg', 
    '/uploads/pyramid-giza.jpeg',
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3',
    'image/jpeg',
    567890,
    'gallery',
    'Great Pyramid of Giza at sunset',
    'Iconic pyramid view for gallery section',
    '{"width": 1200, "height": 800, "source": "unsplash"}'::jsonb
  ),
  (
    'temple-ancient.jpeg',
    'temple.jpeg',
    '/uploads/temple-ancient.jpeg', 
    'https://images.unsplash.com/photo-1543650876-ca2e94d4e5b6?ixlib=rb-4.0.3',
    'image/jpeg',
    432190,
    'gallery',
    'Ancient Egyptian temple interior with columns',
    'Historical temple architecture for content sections',
    '{"width": 1200, "height": 800, "source": "unsplash"}'::jsonb
  )
ON CONFLICT (filename) DO NOTHING;