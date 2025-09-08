<template>
  <section class="relative w-full pt-16">
    <!-- Background Image - Full Width, Contained -->
    <div class="w-full">
      <picture>
        <!-- <source srcset="https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/king-tut-320x480.jpg 320w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/king-tut-480x720.jpg 480w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/king-tut-640x960.jpg 640w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/king-tut-853x1280.jpg 853w" type="image/jpeg" sizes="(max-width:320px) 320px, (max-width:480px) 480px, (max-width:640px) 640px, 853px"> -->
        <source srcset="https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/king-tut-320x480.webp 320w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/king-tut-480x720.webp 480w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/king-tut-640x960.webp 640w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/king-tut-853x1280.webp 853w" type="image/webp" sizes="(max-width:320px) 320px, (max-width:480px) 480px, (max-width:640px) 640px, 853px">
        <img 
          src="https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/king-tut-853x1280.webp"
          srcset="https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/king-tut-320x480.webp 320w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/king-tut-480x720.webp 480w, /king-tut-640x960.webp 640w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/king-tut-853x1280.webp 853w"
          sizes="(max-width:320px) 320px, (max-width:480px) 480px, (max-width:640px) 640px, 853px"
          alt="Golden funerary mask of Pharaoh Tutankhamun, ancient Egypt, showcased with dramatic lighting."
          class="w-full h-auto object-cover object-center bg-gray-200"
          fetchpriority="high"
          decoding="async"
          loading="eager"
          width="853"
          height="1280"
        />
      </picture>
    </div>
  </section>
</template>

<script setup lang="ts">
import { smoothScroll } from '../utils/smoothScroll'

const scrollToPackages = () => {
  smoothScroll('packages')
}
</script>
