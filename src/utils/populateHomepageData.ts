import { supabase } from '@/lib/supabase'

// Homepage sections based on current static layout
const homepageSections = [
  {
    id: "hero-section-main",
    type: "hero",
    visible: true,
    layout: {
      columns: 1,
      grid: "grid-cols-1",
      background: {
        type: "image",
        value: "#000000",
        url: "https://d64gsuwffb70l.cloudfront.net/68b1c96bae343289de113d06_1756568030709_0f9cfae8.jpeg"
      }
    },
    content: {
      title: "King Tut Royal",
      subtitle: "Experience Ancient Egypt Like Never Before",
      description: "Discover the treasures and mysteries of ancient Egypt with our exclusive VIP tours",
      buttonText: "Explore Packages", 
      buttonLink: "#packages",
      imageUrl: "https://d64gsuwffb70l.cloudfront.net/68b1c96bae343289de113d06_1756568030709_0f9cfae8.jpeg",
      imageAlt: "Egyptian Pharaoh"
    },
    styling: {
      textColor: "#ffffff",
      padding: "pt-16",
      alignment: "center"
    }
  },
  {
    id: "packages-section-main",
    type: "packages", 
    visible: true,
    layout: {
      columns: 2,
      grid: "md:grid-cols-2",
      background: {
        type: "color",
        value: "#000000"
      }
    },
    content: {
      title: "Choose Your Royal Experience",
      subtitle: "Exclusive packages designed for the discerning traveler",
      packages: [
        {
          title: "Royal VIP Experience",
          price: "€2,900",
          duration: "5 Days",
          image: "https://images.unsplash.com/photo-1543650876-ca2e94d4e5b6?ixlib=rb-4.0.3",
          highlights: [
            "Private Egyptologist guide",
            "Exclusive pyramid access", 
            "5-star luxury accommodations",
            "Private transportation",
            "Fine dining experiences"
          ],
          isPopular: true,
          icon: "👑"
        },
        {
          title: "One Day Essentials",
          price: "€900",
          duration: "1 Day", 
          image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3",
          highlights: [
            "Professional guide",
            "Pyramid complex visit",
            "Premium transportation",
            "Authentic lunch"
          ],
          isPopular: false,
          icon: "🏺"
        }
      ]
    },
    styling: {
      padding: "py-20",
      titleColor: "#ffffff",
      subtitleColor: "#fbbf24"
    }
  },
  {
    id: "why-choose-section",
    type: "features",
    visible: true,
    layout: {
      columns: 3,
      grid: "md:grid-cols-3",
      background: {
        type: "color",
        value: "#000000"
      }
    },
    content: {
      title: "Why Choose King Tut Royal",
      features: [
        {
          icon: "👑",
          title: "VIP Access",
          description: "Exclusive access to restricted areas and private chambers"
        },
        {
          icon: "🏺",
          title: "Expert Guides", 
          description: "Professional Egyptologists with deep historical knowledge"
        },
        {
          icon: "✨",
          title: "Luxury Experience",
          description: "Five-star accommodations and premium transportation"
        }
      ]
    },
    styling: {
      padding: "py-20",
      titleColor: "#ffffff",
      textColor: "#fbbf24"
    }
  },
  {
    id: "booking-section-main",
    type: "booking",
    visible: true,
    layout: {
      columns: 1,
      grid: "grid-cols-1",
      background: {
        type: "color",
        value: "#000000"
      }
    },
    content: {
      title: "Book Your Royal Journey",
      subtitle: "Reserve your exclusive Egyptian experience today",
      formFields: ["name", "email", "package", "date", "guests"]
    },
    styling: {
      padding: "py-20",
      titleColor: "#ffffff",
      backgroundColor: "#000000"
    }
  }
]

// Default theme configuration
const defaultTheme = {
  name: 'King Tut Royal Default',
  config: {
    colors: {
      primary: "#fbbf24",
      secondary: "#000000", 
      accent: "#f59e0b",
      background: "#000000",
      surface: "#1a1a1a",
      text: "#ffffff",
      textSecondary: "#fbbf24"
    },
    typography: {
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
      fontSize: {
        base: "16px",
        sm: "14px",
        lg: "18px",
        xl: "20px",
        "2xl": "24px", 
        "3xl": "30px",
        "4xl": "36px"
      }
    },
    layout: {
      spacingUnit: "4px",
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px", 
        xl: "16px"
      },
      containerMaxWidth: "1200px"
    }
  },
  is_active: true,
  is_default: true
}

// Section templates
const sectionTemplates = [
  {
    name: 'Hero Section',
    type: 'hero',
    category: 'headers',
    preview_image: 'https://images.unsplash.com/photo-1543650876-ca2e94d4e5b6?ixlib=rb-4.0.3&w=400&h=200&fit=crop',
    default_config: {
      layout: {
        columns: 1,
        grid: "grid-cols-1",
        background: {
          type: "image",
          value: "#000000"
        }
      },
      content: {
        title: "Your Amazing Title",
        subtitle: "Your compelling subtitle", 
        description: "Your detailed description here",
        buttonText: "Call to Action",
        buttonLink: "#"
      },
      styling: {
        textColor: "#ffffff",
        padding: "py-20",
        alignment: "center"
      }
    },
    is_active: true
  },
  {
    name: 'Features Grid',
    type: 'features',
    category: 'content',
    preview_image: 'https://images.unsplash.com/photo-1460472178825-e5240623afd5?ixlib=rb-4.0.3&w=400&h=200&fit=crop',
    default_config: {
      layout: {
        columns: 3,
        grid: "md:grid-cols-3",
        background: {
          type: "color",
          value: "#000000"
        }
      },
      content: {
        title: "Features Title",
        features: [
          {
            icon: "⚡",
            title: "Feature 1",
            description: "Description for feature 1"
          }
        ]
      },
      styling: {
        padding: "py-20",
        titleColor: "#ffffff"
      }
    },
    is_active: true
  }
]

export async function populateHomepageData() {
  try {
    console.log('🚀 Starting homepage data population...')
    
    // Check if tables exist and create them if needed
    const response = await fetch(`${supabase.supabaseUrl}/functions/v1/save-page-layout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabase.supabaseKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pageName: 'homepage',
        sections: homepageSections,
        meta: {
          title: "King Tut Royal - Exclusive Egyptian Tours",
          description: "Experience ancient Egypt with our exclusive VIP tours and packages",
          keywords: "Egypt tours, VIP tours, Pyramids, King Tut, luxury travel"
        },
        isPublished: true
      })
    })

    if (response.ok) {
      console.log('✅ Homepage layout saved successfully')
      return { success: true, message: 'Homepage data populated successfully!' }
    } else {
      const error = await response.text()
      console.error('❌ Error saving homepage layout:', error)
      return { success: false, error: `Failed to save homepage layout: ${error}` }
    }
    
  } catch (error) {
    console.error('💥 Error during data population:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}