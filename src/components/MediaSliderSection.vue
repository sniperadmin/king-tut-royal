<template>
  <section class="py-12 bg-light-yellow">
    <div class="container mx-auto px-4">
      <div class="text-center mb-8">
        <h4 class="text-lg text-brownish max-w-3xl mx-auto font-bold leading-relaxed">
          Immerse yourself in luxury Egyptian experiences
        </h4>
      </div>

      <div class="relative max-w-6xl mx-auto">
        <SplideCarousel
          :slides="splideSlides"
          :options="splideOptions"
          aria-label="Luxury Egyptian Experiences Carousel"
        />
      </div>
    </div>
  </section>

  <!-- Modal -->
  <div
    v-if="isModalOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4"
  >
    <div class="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
      <img
        :src="mediaItems[modalImageIndex].src"
        :alt="mediaItems[modalImageIndex].title"
        class="max-w-full max-h-full object-contain rounded-lg"
        width="853"
        height="480"
      />

      <Button
        @click="closeModal"
        variant="ghost"
        size="icon"
        class="absolute top-4 right-4 bg-card/50 hover:bg-card/70 text-foreground border-0 h-12 w-12 rounded-full"
      >
        <X class="h-6 w-6" />
      </Button>

      <Button
        @click="prevModalImage"
        variant="ghost"
        size="icon"
        class="absolute left-4 top-1/2 -translate-y-1/2 bg-card/50 hover:bg-card/70 text-foreground border-0 h-12 w-12 rounded-full"
      >
        <ChevronLeft class="h-6 w-6" />
      </Button>

      <Button
        @click="nextModalImage"
        variant="ghost"
        size="icon"
        class="absolute right-4 top-1/2 -translate-y-1/2 bg-card/50 hover:bg-card/70 text-foreground border-0 h-12 w-12 rounded-full"
      >
        <ChevronRight class="h-6 w-6" />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-vue-next';
import Button from './ui/button.vue';
import SplideCarousel from './SplideCarousel.vue';

const isModalOpen = ref(false);
const modalImageIndex = ref(0);

const mediaItems = [
  {
    id: 0,
    src: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/pyramid-dawn.webp",
    src_412w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/pyramid-dawn-412w.webp",
    src_853w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/pyramid-dawn-853w.webp",
    title: "Pyramid in Dawn time",
    description: "Unforgettable pyramid experience"
  },
  {
    id: 1,
    src: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/bus.webp",
    src_412w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/bus-412w.webp",
    src_853w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/bus-853w.webp",
    title: "Perfume Experience",
    description: "Unforgettable perfume package"
  },
  {
    id: 2,
    src: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/pyramid-light.webp",
    src_412w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/pyramid-light-412w.webp",
    src_853w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/pyramid-light-853w.webp",
    title: "Pyramid",
    description: "Unforgettable pyramid experience"
  },
  {
    id: 3,
    src: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/m-out.webp",
    src_412w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/m-out-412w.webp",
    src_853w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/m-out-853w.webp",
    title: "Museum of the Ancient World",
    description: "Museum from outer side"
  },
  {
    id: 4,
    src: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/tut.webp",
    src_412w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/tut-412w.webp",
    src_853w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/tut-853w.webp",
    title: "King Tut Monuments",
    description: "Unforgettable King Tut experience"
  },
  {
    id: 5,
    src: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/pyramid-camel.webp",
    src_412w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/pyramid-camel-412w.webp",
    src_853w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/pyramid-camel-853w.webp",
    title: "Pyramid in Camel time",
    description: "Unforgettable pyramid experience"
  },
  {
    id: 6,
    src: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/CROHA%20Exterior%20ByDay.webp",
    src_412w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/CROHA%20Exterior%20ByDay-412w.webp",
    src_853w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/CROHA%20Exterior%20ByDay-853w.webp",
    title: "CROHA",
    description: "Unforgettable CROHA experience"
  },
  {
    id: 7,
    src: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/ICSemiramis%20lobby.webp",
    src_412w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/ICSemiramis%20lobby-412w.webp",
    src_853w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/ICSemiramis%20lobby-853w.webp",
    title: "ICSemiramis",
    description: "Unforgettable ICSemiramis experience"
  },
  {
    id: 8,
    src: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/Intercontinental%20rooms9166.webp",
    src_412w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/Intercontinental%20rooms9166-412w.webp",
    src_853w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/Intercontinental%20rooms9166-853w.webp",
    title: "ICSemiramis",
    description: "ICSemiramis rooms experience"
  },
  {
    id: 9,
    src: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/Intercontinental%20rooms9196.webp",
    src_412w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/Intercontinental%20rooms9196-412w.webp",
    src_853w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/Intercontinental%20rooms9196-853w.webp",
    title: "ICSemiramis",
    description: "ICSemiramis rooms experience"
  },
  {
    id: 10,
    src: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/museum-out.webp",
    src_412w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/museum-out-412w.webp",
    src_853w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/museum-out-853w.webp",
    title: "Museum",
    description: "Unforgettable museum experience"
  },
  {
    id: 11,
    src: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/museum-in.webp",
    src_412w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/museum-in-412w.webp",
    src_853w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/museum-in-853w.webp",
    title: "Museum",
    description: "Unforgettable museum experience"
  },
  {
    id: 12,
    src: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/car.webp",
    src_412w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/car-412w.webp",
    src_853w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/car-853w.webp",
    title: "Car",
    description: "Unforgettable museum experience"
  },
  {
    id: 13,
    src: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/grave.webp",
    src_412w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/grave-412w.webp",
    src_853w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/grave-853w.webp",
    title: "King Tut Grave",
    description: "Unforgettable King Tut Grave experience"
  }
];

const splideSlides = computed(() => mediaItems.map(item => ({
  type: 'image',
  src: item.src,
  alt: item.title,
  id: item.id
})));

const splideOptions = {
  rewind: true,
  autoplay: true,
  interval: 4000,
  pauseOnHover: true,
  lazyLoad: true,
  perPage: 1,
  height: '500px',
  breakpoints: {
    640: {
      height: '250px',
    },
    768: {
      height: '350px',
    },
    1024: {
      height: '450px',
    },
  },
};

function openModal(index: number) {
  if (!isModalOpen.value) {
    isModalOpen.value = true;
    modalImageIndex.value = index;
  }
}
function closeModal() {
  isModalOpen.value = false;
}

function nextModalImage() {
  if (mediaItems.length > 1) {
    modalImageIndex.value = (modalImageIndex.value + 1) % mediaItems.length;
  }
}

function prevModalImage() {
  if (mediaItems.length > 1) {
    modalImageIndex.value = (modalImageIndex.value - 1 + mediaItems.length) % mediaItems.length;
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (!isModalOpen.value) return;
  if (e.key === 'Escape') {
    isModalOpen.value = false;
  } else if (e.key === 'ArrowLeft') {
    prevModalImage();
  } else if (e.key === 'ArrowRight') {
    nextModalImage();
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});

watch(isModalOpen, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

</script>
