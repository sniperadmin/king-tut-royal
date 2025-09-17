export interface MediaItem {
  type: 'image' | 'video';
  src: string;
  thumbnail?: string; // Optional thumbnail for videos
  srcSet?: string; // Add srcSet for responsive images
  sizes?: string; // Add sizes for responsive images
}

export interface Partner {
  id: string;
  name: string;
  logo: {
    small: string;
    medium: string;
    large: string;
  };
  description: string;
  website?: string;
  about?: string;
  services?: string[];
  media?: MediaItem[]; // Changed from images to media
}

export const ALL_PARTNERS: Partner[] = [
  {
    id: 'semiramis-intercontinental',
    name: 'Semiramis Intercontinental Hotels & Resorts',
    logo: {
      small: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/3D_logo1_RGB_LP_SC_small.png',
      medium: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/3D_logo1_RGB_LP_SC_medium.png',
      large: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/3D_logo1_RGB_LP_SC_large.png',
    },
    description: 'Luxury 5-star hotel located in the heart of Cairo with breathtaking views of the Nile River.',
    website: 'https://www.booking.com/hotel/eg/intercontinental-cairo-semiramis.html?msockid=281e045335e26e1b1208112b349e6f83',
    about: 'The InterContinental Cairo Semiramis is a landmark hotel in Egypt\'s capital, offering unparalleled luxury and service.\n\nWith its prime location on the Nile Corniche, the hotel provides easy access to Cairo\'s most famous attractions including the Egyptian Museum, Khan el-Khalili bazaar, and the Giza Pyramids.\n\nThe hotel features 432 elegantly appointed rooms and suites, multiple dining options, a spa, and extensive meeting facilities.',
    services: [
      'Luxury accommodations',
      'Fine dining restaurants',
      'Spa and wellness center',
      'Business facilities',
      'Concierge services'
    ],
    media: [
      {
        type: 'image',
        src: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/ICSemiramis%20lobby.webp',
        srcSet: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/ICSemiramis%20lobby-412w.webp 412w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/ICSemiramis%20lobby-853w.webp 853w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/ICSemiramis%20lobby.webp 1920w',
        sizes: '(max-width: 412px) 412px, (max-width: 853px) 853px, 1920px'
      },
      {
        type: 'image',
        src: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/CROHA%20Exterior%20ByDay.webp',
        srcSet: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/CROHA%20Exterior%20ByDay-412w.webp 412w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/CROHA%20Exterior%20ByDay-853w.webp 853w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/CROHA%20Exterior%20ByDay.webp 1920w',
        sizes: '(max-width: 412px) 412px, (max-width: 853px) 853px, 1920px'
      },
      {
        type: 'image',
        src: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/Intercontinental%20rooms9207.webp',
        srcSet: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/Intercontinental%20rooms9207-412w.webp 412w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/Intercontinental%20rooms9207-853w.webp 853w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/Intercontinental%20rooms9207.webp 1920w',
        sizes: '(max-width: 412px) 412px, (max-width: 853px) 853px, 1920px'
      },
      {
        type: 'image',
        src: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/Intercontinental%20rooms9166.webp',
        srcSet: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/Intercontinental%20rooms9166-412w.webp 412w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/Intercontinental%20rooms9166-853w.webp 853w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/Intercontinental%20rooms9166.webp 1920w',
        sizes: '(max-width: 412px) 412px, (max-width: 853px) 853px, 1920px'
      },
      {
        type: 'image',
        src: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/Intercontinental%20rooms9196.webp',
        srcSet: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/Intercontinental%20rooms9196-412w.webp 412w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/Intercontinental%20rooms9196-853w.webp 853w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/Intercontinental%20rooms9196.webp 1920w',
        sizes: '(max-width: 412px) 412px, (max-width: 853px) 853px, 1920px'
      }
    ]
  },
  {
    id: '1001-luxury',
    name: '1001 Luxury',
    logo: {
      small: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/1001logo_small.jpeg',
      medium: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/1001logo_medium.jpeg',
      large: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/1001logo_large.jpeg',
    },
    description: '1001 Luxury offers exclusive, tailor-made luxury travel experiences.',
    website: 'https://www.sherinyosry.com/1001-luxury.html/',
    about: '1001 Luxury specializes in crafting bespoke journeys for discerning travelers. We provide unparalleled access to unique destinations and experiences, ensuring every detail is meticulously planned and executed.\n\nOur services range from private jet charters and luxury yacht rentals to personalized cultural tours and exclusive event access. We pride ourselves on delivering exceptional service and unforgettable memories.',
    services: [
      'Bespoke travel planning',
      'Private jet and yacht charters',
      'Luxury accommodations',
      'Exclusive cultural experiences',
      '24/7 concierge service'
    ],
    media: [
      { 
        type: 'image', 
        src: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/1001/wedding1_large.webp', 
        srcSet: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/1001/wedding1_small.webp 640w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/1001/wedding1_medium.webp 1024w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/1001/wedding1_large.webp 1920w',
        sizes: '(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px'
      },
      { 
        type: 'image', 
        src: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/1001/wedding2_large.webp', 
        srcSet: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/1001/wedding2_small.webp 640w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/1001/wedding2_medium.webp 1024w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/1001/wedding2_large.webp 1920w',
        sizes: '(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px'
      },
      { 
        type: 'image', 
        src: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/1001/wedding3_large.webp', 
        srcSet: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/1001/wedding3_small.webp 640w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/1001/wedding3_medium.webp 1024w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/1001/wedding3_large.webp 1920w',
        sizes: '(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px'
      },
      { 
        type: 'image', 
        src: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/1001/wedding4_large.webp', 
        srcSet: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/1001/wedding4_small.webp 640w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/1001/wedding4_medium.webp 1024w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/1001/wedding4_large.webp 1920w',
        sizes: '(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px'
      }
    ]
  }
]
