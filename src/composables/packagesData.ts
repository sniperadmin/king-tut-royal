import { Partner, ALL_PARTNERS } from './partnersData';

export interface BookingDetails {
  price: string;
  whatsapp: string;
  email: string;
  website: string;
  address: string;
  companyName: string;
}

export interface PackageData {
  key?: string;
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
    booking: BookingDetails; // Changed from string to BookingDetails
    images: string[];
  };
}

export const PACKAGE_PRICING: Record<string, number> = {
  vip: 3900,
  oneday: 1200
};

export const PACKAGES: PackageData[] = [
  {
    title: "King Tut Royal VIP",
    price: "€3,900",
    duration: "5 Days / 4 Nights (Thursday - Monday)",
    image: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/packages/tut-black.webp",
    icon: 'Crown',
    partners: [
      ALL_PARTNERS.find(p => p.id === 'semiramis-intercontinental'),
      
    ].filter(Boolean) as Partner[],
    highlights: [
      'Step into the world of the Pharaohs with the King Tut Royal Package, a once-in-a-lifetime experience limited to just 50 privileged travelers each week.',
      'Beginning on Thursday, November 6, 2025, this luxurious 5-day, 4-night program blends Egypt’s royal heritage with modern comfort, world-class hospitality, and curated cultural encounters'
    ],
    isPopular: true,
    videos: [
      { id: 1, url: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/packages/king-highlight.m3u8', title: 'King Tut Royal VIP Package', muted: true }
    ],
    details: {
      overview: "Step into the world of the Pharaohs with the King Tut Royal Package, a once-in-a-lifetime experience limited to just 50 privileged travelers each week. Beginning on Thursday, November 6, 2025, this luxurious 5-day, 4-night program blends Egypt’s royal heritage with modern comfort, world-class hospitality, and curated cultural encounters. With handpicked 5★ partners, seamless private transport, multilingual tour leaders, and exclusive dining experiences facing the Pyramids and on the Nile, this package ensures every moment is exceptional.",
      accommodation: "- 4 nights at Semiramis InterContinental Cairo (5★, Superior Double Room) including daily breakfast",
      itinerary: [
        {
          day: "Day 1 – Thursday",
          description: [
            "VIP airport meet & greet upon arrival at Cairo International Airport",
            "Private luxury transfer to the Semiramis InterContinental Cairo (5★)",
            "Check-in to Superior Double Room with breakfast",
            "Orientation and welcome briefing with your multilingual Tour Leader & Hostess",
            "Evening free at leisure in the hotel or optional cultural introduction arranged by your host"
          ]
        },
        {
          day: "Day 2 – Friday",
          description: [
            "Breakfast at the hotel",
            "Private transfer to the Giza Plateau for a guided visit to the Great Pyramids & Sphinx with your multilingual tour leader",
            "Afternoon return transfer to hotel for relaxation or optional guided shopping tour",
            "Evening: Private transfer to Khufu Restaurant for a Sunset Dinner facing the Great Pyramids",
            "After dinner: Private transfer back to Semiramis InterContinental Cairo for overnight stay"
          ]
        },
        {
          day: "Day 3 – Saturday",
          description: [
            "Breakfast at the hotel",
            "Private transfer to the Grand Egyptian Museum",
            "Full-day curated tour with Egyptologists, highlighting the treasures of Tutankhamun",
            "Evening return transfer to hotel",
            "Dinner at Semiramis InterContinental Cairo (included)",
            "Overnight stay at the hotel"
          ]
        },
        {
          day: "Day 4 – Sunday",
          description: [
            "Breakfast at the hotel",
            "Morning free to enjoy hotel facilities or optional guided excursions",
            "Evening: Private transfer to the Four Seasons First Nile Boat for a luxury Dinner on the Nile with gourmet dining and live entertainment",
            "Transfer back to hotel for final overnight stay"
          ]
        },
        {
          day: "Day 5 – Monday",
          description: [
            "Breakfast at the hotel",
            "Check-out with hostess assistance",
            "Private transfer to Cairo International Airport",
            "Farewell gift: Exclusive King Tut Royal Perfume bottle for each traveler"
          ]
        }
      ],
      benefits: "The King Tut Royal Package is strictly limited to 50 travelers per week, ensuring exclusivity, privacy, and unforgettable service.",
      booking: {
        price: `€${PACKAGE_PRICING.vip}`,
        whatsapp: "+971 58 592 3054",
        email: "",
        website: "www.sherinyosry.com",
        address: "FOAM1604 Compass Building, Al Shohada Road, AL Hamra Industrial Zone-FZ, Ras Al Khaimah, United Arab Emirates",
        companyName: "SY Consulting FZ-LLC"
      },
      images: [
        "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/packages/royal-vip.webp",
        "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/packages/vip-h.webp",
        "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/packages/bus.webp",
        "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/packages/tut-black.webp",
        "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/packages/dinner.webp",
        "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/packages/tut-focus.webp",
        "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/packages/pyramids.webp",
        "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/packages/cover.webp"
      ]
    }
  },
  {
    title: "King Tut VIP One Day",
    price: "€1200",
    duration: "1 Day (Any Day)",
    image: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/packages/vip-h.webp",
    highlights: [
      'Private guided tour of Giza Pyramids & Sphinx',
      'Entry to the Grand Egyptian Museum',
      'Luxury lunch with Pyramid views',
      'Available daily',
      'Book at least 48 hours in advance'
    ],
    isPopular: false,
    icon: 'Star',
    partners: [].filter(Boolean) as Partner[],
    videos: [
      { id: 2, url: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/packages/king-music.m3u8', title: 'King Tut VIP One Day Package', muted: true }
    ],
    details: {
      overview: "Discover the wonders of ancient Egypt in a single day with the King Tut VIP One Day Package. This exclusive tour offers a private, guided experience to the iconic Giza Pyramids, the Sphinx, and the Grand Egyptian Museum, complete with luxury transport and a gourmet lunch.",
      accommodation: "N/A",
      itinerary: [
        {
          day: "Morning",
          description: [
            "Private pick-up from your Cairo hotel",
            "Guided tour of Giza Pyramids and Sphinx",
            "Camel ride experience (optional)"
          ]
        },
        {
          day: "Afternoon",
          description: [
            "Luxury lunch at a restaurant with panoramic Pyramid views",
            "Visit to the Grand Egyptian Museum with a private guide",
            "Explore the treasures of King Tutankhamun"
          ]
        },
        {
          day: "Evening",
          description: [
            "Return to your hotel"
          ]
        }
      ],
      benefits: "Private Egyptologist guide\nAll entry fees included\nLuxury air-conditioned transport\nPersonalized experience",
      booking: {
        price: `€${PACKAGE_PRICING.oneday}`,
        whatsapp: "+971 58 592 3054",
        email: "",
        website: "www.sherinyosry.com",
        address: "FOAM1604 Compass Building, Al Shohada Road, AL Hamra Industrial Zone-FZ, Ras Al Khaimah, United Arab Emirates",
        companyName: "SY Consulting FZ-LLC"
      },
      images: [
        "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/packages/tut-focus.webp",
        "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/packages/pyramids.webp",
        "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/packages/dinner.webp",
        "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/packages/pack.webp"
      ]
    }
  }
];