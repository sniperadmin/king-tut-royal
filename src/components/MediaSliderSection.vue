<template>
  <section class="py-12 bg-light-yellow">
    <div class="container mx-auto px-4">
      <div class="text-center mb-8">
        <h4 class="text-lg text-brownish max-w-3xl mx-auto font-bold leading-relaxed">
          Immerse yourself in luxury Egyptian experiences
        </h4>
      </div>

      <div class="relative max-w-6xl mx-auto">
        <div
          class="relative h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] overflow-hidden rounded-2xl group cursor-pointer"
          @click="openModal(currentSlide)"
        >
          <img
            :src="mediaItems[currentSlide].src"
            :alt="mediaItems[currentSlide].title"
            :srcset="`${mediaItems[currentSlide].src_412w} 412w, ${mediaItems[currentSlide].src_853w} 853w`"
            sizes="(max-width: 640px) 412px, 853px"
            class="w-full h-full object-contain transition-all duration-500"
            width="853"
            height="480"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-card/10 via-transparent to-transparent"></div>

          <!-- Maximize button -->
          <div
            class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <Button
              variant="ghost"
              size="icon"
              class="bg-card/50 hover:bg-card/70 text-foreground border-0 h-10 w-10 rounded-full"
            >
              <Maximize2 class="h-5 w-5" />
            </Button>
          </div>
        </div>

        <Button
          @click="prevSlide"
          variant="ghost"
          size="icon"
          class="absolute left-4 top-1/2 -translate-y-1/2 bg-card/50 hover:bg-card/70 text-foreground border-0 h-12 w-12 rounded-full"
        >
          <ChevronLeft class="h-6 w-6" />
        </Button>

        <Button
          @click="nextSlide"
          variant="ghost"
          size="icon"
          class="absolute right-4 top-1/2 -translate-y-1/2 bg-card/50 hover:bg-card/70 text-foreground border-0 h-12 w-12 rounded-full"
        >
          <ChevronRight class="h-6 w-6" />
        </Button>

        <div class="flex justify-center mt-8 space-x-3">
          <button
            v-for="(item, index) in mediaItems"
            :key="index"
            @click="goToSlide(index)"
            :class="`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-primary scale-125' : 'bg-muted-foreground hover:bg-foreground'
            }`"
          />
        </div>
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

const currentSlide = ref(0);
const isModalOpen = ref(false);
const modalImageIndex = ref(0);
const autoSlideInterval = ref(null);

const goToSlide = (index) => {
  stopAutoSlide();
  // Only update if slide changes
  if (currentSlide.value !== index) {
    currentSlide.value = index;
  }
  startAutoSlide();
};

const nextModalImage = () => {
  // Only update if next image is different
  if (mediaItems.length > 1) {
    modalImageIndex.value = (modalImageIndex.value + 1) % mediaItems.length;
  }
};

const prevModalImage = () => {
  if (mediaItems.length > 1) {
    modalImageIndex.value = (modalImageIndex.value - 1 + mediaItems.length) % mediaItems.length;
  }
};

const mediaItems = [
  {
    id: 0,
    src: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/bus.webp",
    src_412w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/bus-412w.webp",
    src_853w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/bus-853w.webp",
    title: "Bus Experience",
    description: "Luxury transportation"
  },
  {
    id: 1,
    src: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/perfume.webp",
    src_412w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/perfume-412w.webp",
    src_853w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/perfume-853w.webp",
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
    src: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/ticket.webp",
    src_412w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/ticket-412w.webp",
    src_853w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/ticket-853w.webp",
    title: "Core Services",
    description: "Luxury accommodations and premium experiences"
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
    src: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/CROHA%20Exterior%20ByDay.webp",
    src_412w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/CROHA%20Exterior%20ByDay-412w.webp",
    src_853w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/CROHA%20Exterior%20ByDay-853w.webp",
    title: "CROHA",
    description: "Unforgettable CROHA experience"
  },
  {
    id: 6,
    src: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/ICSemiramis%20lobby.webp",
    src_412w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/ICSemiramis%20lobby-412w.webp",
    src_853w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/ICSemiramis%20lobby-853w.webp",
    title: "ICSemiramis",
    description: "Unforgettable ICSemiramis experience"
  },
  {
    id: 7,
    src: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/Intercontinental%20rooms9166.webp",
    src_412w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/Intercontinental%20rooms9166-412w.webp",
    src_853w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/Intercontinental%20rooms9166-853w.webp",
    title: "ICSemiramis",
    description: "ICSemiramis rooms experience"
  },
  {
    id: 8,
    src: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/Intercontinental%20rooms9196.webp",
    src_412w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/Intercontinental%20rooms9196-412w.webp",
    src_853w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/Intercontinental%20rooms9196-853w.webp",
    title: "ICSemiramis",
    description: "ICSemiramis rooms experience"
  },
  {
    id: 9,
    src: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/museum-out.webp",
    src_412w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/museum-out-412w.webp",
    src_853w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/museum-out-853w.webp",
    title: "Museum",
    description: "Unforgettable museum experience"
  },
  {
    id: 10,
    src: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/museum-in.webp",
    src_412w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/museum-in-412w.webp",
    src_853w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/museum-in-853w.webp",
    title: "Museum",
    description: "Unforgettable museum experience"
  },
  {
    id: 11,
    src: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/car.webp",
    src_412w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/car-412w.webp",
    src_853w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/car-853w.webp",
    title: "Car",
    description: "Unforgettable museum experience"
  },
];

let intervalId: number | undefined;

const startAutoSlide = () => {
  stopAutoSlide(); // Ensure any existing interval is cleared
  intervalId = setInterval(() => {
    // Optimize: only update if not modal open and slides > 1
    if (!isModalOpen.value && mediaItems.length > 1) {
      currentSlide.value = (currentSlide.value + 1) % mediaItems.length;
    }
  }, 4000);
};

const stopAutoSlide = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = undefined;
  }
};

onMounted(() => {
  // Only start auto slide if more than one item
  if (mediaItems.length > 1) startAutoSlide();
});

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

onUnmounted(() => {
  stopAutoSlide();
  document.body.style.overflow = '';
  window.removeEventListener('keydown', handleKeydown);
});

watch(isModalOpen, (newValue) => {
  if (newValue) {
    stopAutoSlide();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeydown);
  } else {
    document.body.style.overflow = '';
    window.removeEventListener('keydown', handleKeydown);
    if (mediaItems.length > 1) startAutoSlide();
  }
});
const currentMedia = computed(() => mediaItems[currentSlide.value]);
// Removed active, isOpen, and duplicate autoSlideInterval
// const active = ref(0);
// const isOpen = ref(false);
// const autoSlideInterval = ref<number | null>(null);

const totalSlides = computed(() => mediaItems.length);

function nextSlide() {
  if (totalSlides.value > 1) {
    currentSlide.value = (currentSlide.value + 1) % totalSlides.value;
  }
}
function prevSlide() {
  if (totalSlides.value > 1) {
    currentSlide.value = (currentSlide.value - 1 + totalSlides.value) % totalSlides.value;
  }
}

function openModal(index: number) {
  if (!isModalOpen.value) {
    isModalOpen.value = true;
    modalImageIndex.value = index;
  }
}
function closeModal() {
  isModalOpen.value = false;
}

// Removed handleAutoSlide as its functionality is now integrated into startAutoSlide and watch

</script>
