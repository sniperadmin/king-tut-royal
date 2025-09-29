<template>
  <component
    :is="tag"
    :class="[
      'base-card',
      variantClasses[variant],
      {
        'hover:scale-102 hover:shadow-xl transition-all duration-300': hoverable,
        'group': group,
        'overflow-hidden': overflowHidden,
        'rounded-lg': rounded,
        'shadow-lg': shadow,
      },
      customClass
    ]"
    v-bind="$attrs"
  >
    <!-- Header Slot -->
    <div v-if="$slots.header || header" :class="headerClass">
      <slot name="header">{{ header }}</slot>
    </div>

    <!-- Media Section -->
    <div v-if="$slots.media || image" :class="mediaClass">
      <slot name="media">
        <img
          v-if="image"
          :src="image"
          :alt="imageAlt"
          :srcset="imageSrcset"
          :sizes="imageSizes"
          loading="lazy"
          decoding="async"
          class="w-full h-full object-cover"
        />
      </slot>
      <div v-if="$slots.badge" class="absolute top-2 right-2">
        <slot name="badge"></slot>
      </div>
      <div v-if="overlay" class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-300"></div>
      <div v-if="$slots['media-overlay']" class="absolute inset-0">
        <slot name="media-overlay"></slot>
      </div>
    </div>

    <!-- Content Section -->
    <div v-if="$slots.default || $slots.content" :class="contentClass">
      <!-- Title -->
      <div v-if="$slots.title || title" :class="titleClass">
        <slot name="title">{{ title }}</slot>
      </div>

      <!-- Description -->
      <div v-if="$slots.description || description" :class="descriptionClass">
        <slot name="description">{{ description }}</slot>
      </div>

      <!-- Default Content -->
      <slot name="content">
        <slot></slot>
      </slot>
    </div>

    <!-- Footer Slot -->
    <div v-if="$slots.footer || footer" :class="footerClass">
      <slot name="footer">{{ footer }}</slot>
    </div>

    <!-- Actions Slot -->
    <div v-if="$slots.actions" :class="actionsClass">
      <slot name="actions"></slot>
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  tag?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost';
  customClass?: string;
  hoverable?: boolean;
  group?: boolean;
  overflowHidden?: boolean;
  rounded?: boolean;
  shadow?: boolean;
  
  // Content props
  header?: string;
  title?: string;
  description?: string;
  footer?: string;
  
  // Media props
  image?: string;
  imageAlt?: string;
  imageSrcset?: string;
  imageSizes?: string;
  overlay?: boolean;
  
  // Custom classes
  headerClass?: string;
  mediaClass?: string;
  contentClass?: string;
  titleClass?: string;
  descriptionClass?: string;
  footerClass?: string;
  actionsClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'div',
  variant: 'default',
  hoverable: true,
  group: false,
  overflowHidden: true,
  rounded: true,
  shadow: true,
  overlay: false,
  
  // Default classes
  headerClass: 'p-4 border-b border-border',
  mediaClass: 'relative h-48 w-full overflow-hidden',
  contentClass: 'p-6 flex flex-col flex-grow',
  titleClass: 'text-xl font-bold text-foreground mb-3',
  descriptionClass: 'text-muted-foreground leading-relaxed mb-6',
  footerClass: 'p-4 border-t border-border',
  actionsClass: 'p-4 space-y-3',
});

const variantClasses = computed(() => ({
  default: 'bg-card-light dark:bg-card-dark border border-border',
  primary: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  outline: 'border-2 border-primary bg-transparent',
  ghost: 'bg-transparent border-none shadow-none',
}));
</script>

<style scoped>
.base-card {
  @apply relative;
}
</style>