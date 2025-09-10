<template>
  <section class="py-12 bg-gray-950">
    <div class="container mx-auto px-4">
      <div class="text-center mb-8">
        <h4 class="text-lg text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
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
            class="w-full h-full object-contain transition-all duration-500"
            loading="lazy"
            decoding="async"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

          <!-- Maximize button -->
          <div
            class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <Button
              variant="ghost"
              size="icon"
              class="bg-black/50 hover:bg-black/70 text-white border-0 h-10 w-10 rounded-full"
            >
              <Maximize2 class="h-5 w-5" />
            </Button>
          </div>
        </div>

        <Button
          @click="prevSlide"
          variant="ghost"
          size="icon"
          class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-0 h-12 w-12 rounded-full"
        >
          <ChevronLeft class="h-6 w-6" />
        </Button>

        <Button
          @click="nextSlide"
          variant="ghost"
          size="icon"
          class="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-0 h-12 w-12 rounded-full"
        >
          <ChevronRight class="h-6 w-6" />
        </Button>

        <div class="flex justify-center mt-8 space-x-3">
          <button
            v-for="(item, index) in mediaItems"
            :key="index"
            @click="goToSlide(index)"
            :class="`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-yellow-400 scale-125' : 'bg-gray-600 hover:bg-gray-400'
            }`"
          />
        </div>
      </div>
    </div>
  </section>

  <!-- Modal -->
  <div
    v-if="isModalOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
  >
    <div class="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
      <img
        :src="mediaItems[modalImageIndex].src"
        :alt="mediaItems[modalImageIndex].title"
        class="max-w-full max-h-full object-contain rounded-lg"
        loading="lazy"
        decoding="async"
      />

      <Button
        @click="closeModal"
        variant="ghost"
        size="icon"
        class="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white border-0 h-12 w-12 rounded-full"
      >
        <X class="h-6 w-6" />
      </Button>

      <Button
        @click="prevModalImage"
        variant="ghost"
        size="icon"
        class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-0 h-12 w-12 rounded-full"
      >
        <ChevronLeft class="h-6 w-6" />
      </Button>

      <Button
        @click="nextModalImage"
        variant="ghost"
        size="icon"
        class="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-0 h-12 w-12 rounded-full"
      >
        <ChevronRight class="h-6 w-6" />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-vue-next';
import Button from './ui/button.vue';

const currentSlide = ref(0);
const isModalOpen = ref(false);
const modalImageIndex = ref(0);

const mediaItems = [
  {
    id: 0,
    src: "/images/vip.jpeg",
    title: "VIP Experience",
    description: "Exclusive access and personalized service"
  },
  {
    id: 1,
    src: "/images/luxury.jpeg",
    title: "Luxury Travel",
    description: "Unforgettable journeys with unparalleled comfort"
  },
  {
    id: 2,
    src: "/images/chills.jpeg",
    title: "Luxury Travel",
    description: "Unforgettable journeys with unparalleled comfort"
  },
  {
    id: 3,
    src: "https://d64gsuwffb70l.cloudfront.net/68b1c96bae343289de113d06_1756563690287_c291debe.jpeg",
    title: "Core Services",
    description: "Luxury accommodations and premium experiences"
  },
  {
    id: 4,
    src: "https://d64gsuwffb70l.cloudfront.net/68b1c96bae343289de113d06_1756563690822_f6641d5a.jpeg",
    title: "Digital Experience",
    description: "AR-enhanced tours and mobile concierge"
  },
  {
    id: 5,
    src: "https://d64gsuwffb70l.cloudfront.net/68b1c96bae343289de113d06_1756569116369_624ffd5b.jpeg",
    title: "Royal Dinner on the Nile",
    description: "Exclusive dining experiences with ancient Egyptian ambiance"
  },
  {
    id: 6,
    src: "https://d64gsuwffb70l.cloudfront.net/68b1c96bae343289de113d06_1756569118036_1d19752f.jpeg",
    title: "King Tut Royal Collection",
    description: "Limited edition luxury items inspired by pharaonic treasures"
  },
  {
    id: 7,
    src: "https://d64gsuwffb70l.cloudfront.net/68b1c96bae343289de113d06_1756569118786_e66e165b.jpeg",
    title: "VIP Experience Package",
    description: "Premium access and personalized Egyptian adventure"
  }
];

let intervalId: number | undefined;

const startAutoSlide = () => {
  intervalId = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % mediaItems.length;
  }, 4000);
};

const stopAutoSlide = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = undefined;
  }
};

onMounted(() => {
  startAutoSlide();
});

onUnmounted(() => {
  stopAutoSlide();
});

watch(isModalOpen, (newValue) => {
  if (newValue) {
    stopAutoSlide();
  } else {
    startAutoSlide();
  }
});

const nextSlide = () => {
  stopAutoSlide();
  currentSlide.value = (currentSlide.value + 1) % mediaItems.length;
  startAutoSlide();
};

const prevSlide = () => {
  stopAutoSlide();
  currentSlide.value = (currentSlide.value - 1 + mediaItems.length) % mediaItems.length;
  startAutoSlide();
};

const goToSlide = (index: number) => {
  stopAutoSlide();
  currentSlide.value = index;
  startAutoSlide();
};

const openModal = (index: number) => {
  modalImageIndex.value = index;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const nextModalImage = () => {
  modalImageIndex.value = (modalImageIndex.value + 1) % mediaItems.length;
};

const prevModalImage = () => {
  modalImageIndex.value = (modalImageIndex.value - 1 + mediaItems.length) % mediaItems.length;
};
</script>