export interface MediaItem {
  type: 'image' | 'video';
  src: string;
  thumbnail?: string; // Optional thumbnail for videos
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
    website: 'https://www.ihg.com/intercontinental/hotels/us/en/cairo/caica/hoteldetail',
    about: 'The InterContinental Cairo Semiramis is a landmark hotel in Egypt\'s capital, offering unparalleled luxury and service.\n\nWith its prime location on the Nile Corniche, the hotel provides easy access to Cairo\'s most famous attractions including the Egyptian Museum, Khan el-Khalili bazaar, and the Giza Pyramids.\n\nThe hotel features 432 elegantly appointed rooms and suites, multiple dining options, a spa, and extensive meeting facilities.',
    services: [
      'Luxury accommodations',
      'Fine dining restaurants',
      'Spa and wellness center',
      'Business facilities',
      'Concierge services'
    ],
    media: [
      { type: 'image', src: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/ICSemiramis%20lobby.jpg' },
      { type: 'image', src: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/semiramis%20ic%20exterior.JPG' }
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
    website: 'https://www.1001luxury.com/',
    about: '1001 Luxury specializes in crafting bespoke journeys for discerning travelers. We provide unparalleled access to unique destinations and experiences, ensuring every detail is meticulously planned and executed.\n\nOur services range from private jet charters and luxury yacht rentals to personalized cultural tours and exclusive event access. We pride ourselves on delivering exceptional service and unforgettable memories.',
    services: [
      'Bespoke travel planning',
      'Private jet and yacht charters',
      'Luxury accommodations',
      'Exclusive cultural experiences',
      '24/7 concierge service'
    ],
    media: [
      { type: 'image', src: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/1001logo.jpeg' }
    ]
  }
]