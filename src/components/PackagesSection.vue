<template>
  <section id="packages" class="py-20 bg-black">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-white mb-4">Choose Your Royal Experience</h2>
        <p class="text-xl text-amber-400 max-w-2xl mx-auto">
          Exclusive packages designed for the discerning traveler
        </p>
      </div>
      
      <div class="grid md:grid-cols-2 gap-8">
        <PackageCard
          v-for="pkg in packages"
          :key="pkg.title"
          :title="pkg.title"
          :price="pkg.price"
          :duration="pkg.duration"
          :image="pkg.image"
          :highlights="pkg.highlights"
          :isPopular="pkg.isPopular"
          :onBookNowClick="scrollToBooking"
          :onViewDetailsClick="() => openModal(pkg)"
          :icon="pkg.icon"
        />
      </div>

      <PackageDetailsModal :isOpen="isModalOpen" :package="selectedPackage" @close="closeModal" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { smoothScroll } from '../utils/smoothScroll'
import PackageCard from './PackageCard.vue'
import PackageDetailsModal from './PackageDetailsModal.vue'
import { ref } from 'vue'

const scrollToBooking = () => {
  smoothScroll('booking')
}

const selectedPackage = ref(null);
const isModalOpen = ref(false);

const openModal = (pkg) => {
  selectedPackage.value = pkg;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedPackage.value = null;
};

const packages = [
  {
    title: "King Tut Royal VIP Package",
    price: "€2,900",
    duration: "5 Days / 4 Nights (Thursday - Monday)",
    image: "/images/royal-vip.jpeg",
    icon: 'Crown',

    highlights: [
      'Meet & Greet at Cairo International Airport',
      '5-star luxury accommodation',
      'Gourmet dinner cruise with live entertainment',
      // 'Authentic perfume gift',
    ],
    isPopular: true,
    details: {
      overview: "Experience Egypt like never before with the King Tut Royal VIP Package — an exclusive 5-day, 4-night journey in Cairo combining luxury hospitality, private access to history, and unforgettable cultural encounters. Designed for discerning travelers, this package blends 5-star accommodations, VIP treatment, and unique experiences only available through World In Style.",
      accommodation: "4 nights in a hand-picked 5-star Cairo hotel\nDaily breakfast included\n24/7 concierge assistance",
      itinerary: [
        {
          day: "Day 1 – Thursday",
          description: "Meet & Greet upon arrival at Cairo International Airport\nVIP transport to your luxury hotel"
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
      booking: "Price: €2,900 per person\nSecure your journey with a 30% deposit\nBalance payable before arrival\nExtremely limited availability — reserve early",
      images: [
        "/images/royal-vip.jpeg",
        "/images/pyramids.jpeg",
        "/images/chills.jpeg"
      ]
    }
  },
  {
    title: "King Tut VIP One Day Package",
    price: "€900",
    duration: "1 Day (Any Day)",
    image: "/images/vip.jpeg",
    highlights: [
      'Private guided tour of Giza Pyramids & Sphinx',
      'Entry to the Grand Egyptian Museum',
      'Luxury lunch with Pyramid views',
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
      booking: "Price: €1,200 per person\nFull payment required upon booking\nAvailable daily\nBook at least 48 hours in advance",
      images: [
        "/images/vip.jpeg",
        "/images/luxury.jpeg",
        "/images/pack.jpeg"
      ]
    }
  }
];
</script>