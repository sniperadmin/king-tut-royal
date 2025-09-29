export interface BookingDetails {
  price: string;
  whatsapp: string;
  email: string;
  website: string;
  address: string;
  companyName: string;
}

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

export interface PackageData {
  key?: string;
  slug: string;
  id: string;
  title: string;
  price: string;
  duration: string;
  image: string;
  icon?: string;
  highlights: string[];
  isPopular?: boolean;
  partners?: Partner[];
  videos?: Array<{ id: number; url: string; title: string; muted: boolean }>;
  details: {
    overview: string;
    accommodation: string;
    itinerary: Array<{ day: string; description: string[] }>;
    benefits: string;
    booking: BookingDetails;
    images: string[];
  };
}

export interface ItineraryPDF {
  id: string;
  title: string;
  file_url: string;
  file_size: number;
  thumbnail_url?: string; // Made optional
  category: string;
  created_at: string;
  is_featured: boolean;
}