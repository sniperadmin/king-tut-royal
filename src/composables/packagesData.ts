export interface PackageData {
  key?: string;
  title: string;
  price: string;
  duration: string;
  image: string;
  icon?: string;
  highlights: string[];
  isPopular?: boolean;
  details: {
    overview: string;
    accommodation: string;
    itinerary: Array<{ day: string; description: string }>;
    benefits: string;
    booking: string;
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
    image: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/packages/royal-vip.webp",
    icon: 'Crown',

    highlights: [
      'Step into the world of the Pharaohs with the King Tut Royal Package, a once-in-a-lifetime experience limited to just 50 privileged travelers each week.',
      'Beginning on Thursday, November 6, 2025, this luxurious 5-day, 4-night program blends Egypt’s royal heritage with modern comfort, world-class hospitality, and curated cultural encounters'
    ],
    isPopular: true,
    details: {
      overview: "Experience Egypt like never before with the King Tut Royal VIP Package — an exclusive 5-day, 4-night journey in Cairo combining luxury hospitality, private access to history, and unforgettable cultural encounters. Designed for discerning travelers, this package blends 5-star accommodations, VIP treatment, and unique experiences only available through World In Style.",
      accommodation: "- 4 nights at Intercontinental Cairo Semiramis 5 Star Hotel (DDL)\n - Daily breakfast included\n - 24/7 concierge assistance",
      itinerary: [
        {
          day: "Day 1 – Thursday",
          description: "Meet & Greet upon arrival at Cairo International Airport\nVIP transport to Intercontinental Cairo Semiramis 5 Star Hotel"
        },
        {
          day: "Day 2 – Friday",
          description: "Full day at the Grand Egyptian Museum\nPrivate tour of the King Tut chamber with an expert archaeologist\nLuxury lunch at the Grand Museum Restaurant\nSpecial gift: Limited Edition King Tut Authentic Perfume\nDedicated tour guide throughout the day\nVIP transport to/from hotel"
        },
        {
          day: "Day 3 – Saturday",
          description: "Free day to relax or explore Cairo independently\nEvening Experience (7 PM):\nLuxury VIP Dinner Cruise on the River Nile\nGourmet dinner & drinks\nLive entertainment: belly dancer & oriental band\nChauffeured return to hotel"
        },
        {
          day: "Day 4 – Sunday",
          description: "Sunrise breakfast at the Pyramids of Giza\nSpecial guided tour of the Giza Plateau\nReturn to hotel\nFree evening at leisure"
        },
        {
          day: "Day 5 – Monday",
          description: "VIP transport to Cairo International Airport for departure"
        }
      ],
      benefits: "Private archaeologist-led museum experience\nHand-crafted King Tut perfume souvenir\nLuxury transport & guided services throughout\nCurated cultural experiences blending heritage with modern luxury",
      booking: "Price: €3,900 per person\nBook over whatsapp: +971 58 592 3054\nBalance payable before arrival\nExtremely limited availability — reserve early",
      images: [
        "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/packages/vip-h.webp",
        "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/packages/bus.webp",
        "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/packages/tut-black.webp",
        "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/packages/dinner.webp",
        "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/packages/tut-focus.webp",
        "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/packages/royal-vip.webp",
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
    details: {
      overview: "Discover the wonders of ancient Egypt in a single day with the King Tut VIP One Day Package. This exclusive tour offers a private, guided experience to the iconic Giza Pyramids, the Sphinx, and the Grand Egyptian Museum, complete with luxury transport and a gourmet lunch.",
      accommodation: "N/A",
      itinerary: [
        {
          day: "Morning",
          description: "Private pick-up from your Cairo hotel\nGuided tour of Giza Pyramids and Sphinx\nCamel ride experience (optional)"
        },
        {
          day: "Afternoon",
          description: "Luxury lunch at a restaurant with panoramic Pyramid views\nVisit to the Grand Egyptian Museum with a private guide\nExplore the treasures of King Tutankhamun"
        },
        {
          day: "Evening",
          description: "Return to your hotel"
        }
      ],
      benefits: "Private Egyptologist guide\nAll entry fees included\nLuxury air-conditioned transport\nPersonalized experience",
      booking: "Price: €1200 per person\nFull payment required upon booking\nAvailable daily\nBook at least 48 hours in advance\nBook over whatsapp: +971 58 592 3054",
      images: [
        "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/packages/tut-focus.webp",
        "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/packages/pyramids.webp",
        "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/packages/dinner.webp",
        "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/packages/pack.webp"
      ]
    }
  }
];