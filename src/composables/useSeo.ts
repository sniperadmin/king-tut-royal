import { ref, computed } from 'vue'
import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'

export interface SeoMeta {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: string
  siteName?: string
  locale?: string
  author?: string
  publishedTime?: string
  modifiedTime?: string
  section?: string
  tags?: string[]
}

export function useSeo(meta: SeoMeta = {}) {
  const route = useRoute()
  
  const defaultMeta = {
    siteName: 'King Tut Royal - Luxury Egypt Travel',
    locale: 'en_US',
    type: 'website',
    author: 'King Tut Royal',
    image: '/og.webp'
  }

  console.log('useSeo called with meta:', meta)

  // Create a reactive ref for the meta data
  const reactiveMeta = ref({
    ...defaultMeta,
    ...meta
  })

  console.log('reactiveMeta initial value:', reactiveMeta.value)

  const seoMeta = computed(() => ({
    ...reactiveMeta.value,
    url: reactiveMeta.value.url || `https://kingtutroyal.com${route.path}`
  }))

  useHead({
    title: () => {
      console.log('Computing title, seoMeta.value:', seoMeta.value)
      return seoMeta.value.title || 'Luxury Egypt Travel Packages'
    },
    meta: () => {
      const currentSeoMeta = seoMeta.value
      console.log('Computing meta tags with currentSeoMeta:', currentSeoMeta)
      
      return [
        {
          name: 'description',
          content: currentSeoMeta.description || 'Discover exclusive luxury travel packages to Egypt with personalized itineraries and premium amenities.'
        },
        {
          name: 'keywords',
          content: currentSeoMeta.keywords || 'luxury travel, Egypt tours, private tours, exclusive packages, Egypt luxury travel'
        },
        {
          name: 'author',
          content: currentSeoMeta.author
        },
        // Open Graph
        {
          property: 'og:title',
          content: currentSeoMeta.title || 'Luxury Egypt Travel Packages'
        },
        {
          property: 'og:description',
          content: currentSeoMeta.description || 'Discover exclusive luxury travel packages to Egypt with personalized itineraries and premium amenities.'
        },
        {
          property: 'og:type',
          content: currentSeoMeta.type
        },
        {
          property: 'og:url',
          content: currentSeoMeta.url
        },
        {
          property: 'og:image',
          content: currentSeoMeta.image
        },
        {
          property: 'og:site_name',
          content: currentSeoMeta.siteName
        },
        {
          property: 'og:locale',
          content: currentSeoMeta.locale
        },
        // Twitter Card
        {
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          name: 'twitter:title',
          content: currentSeoMeta.title || 'Luxury Egypt Travel Packages'
        },
        {
          name: 'twitter:description',
          content: currentSeoMeta.description || 'Discover exclusive luxury travel packages to Egypt with personalized itineraries and premium amenities.'
        },
        {
          name: 'twitter:image',
          content: currentSeoMeta.image
        },
        // Article specific
        ...(currentSeoMeta.publishedTime ? [{
          property: 'article:published_time',
          content: currentSeoMeta.publishedTime
        }] : []),
        ...(currentSeoMeta.modifiedTime ? [{
          property: 'article:modified_time',
          content: currentSeoMeta.modifiedTime
        }] : []),
        ...(currentSeoMeta.section ? [{
          property: 'article:section',
          content: currentSeoMeta.section
        }] : []),
        ...(currentSeoMeta.tags ? currentSeoMeta.tags.map(tag => ({
          property: 'article:tag',
          content: tag
        })) : [])
      ]
    },
    link: [
      {
        rel: 'canonical',
        href: () => seoMeta.value.url
      }
    ]
  })

  const updateSeo = (newMeta: Partial<SeoMeta>) => {
    // Update the reactive ref instead of the original meta object
    Object.assign(reactiveMeta.value, newMeta)
  }

  return {
    seoMeta: seoMeta.value,
    updateSeo,
    applySeoConfig: (config: Partial<SeoMeta>) => {
      // Apply a predefined SEO configuration
      console.log('applySeoConfig called with:', config)
      updateSeo(config)
    }
  }
}

// Predefined SEO configurations for common pages
export const seoConfigs = {
  home: {
    title: 'Luxury Egypt Travel Packages | King Tut Royal',
    description: 'Discover exclusive luxury travel packages to Egypt with personalized itineraries, premium amenities, and expert tour guides. Book your dream Egyptian adventure today.',
    keywords: 'luxury Egypt travel, exclusive Egypt tours, premium Egypt packages, private Egypt tours, luxury Nile cruise, Egypt luxury vacation'
  },
  packages: {
    title: 'Luxury Egypt Tour Packages | Premium Travel Experiences',
    description: 'Explore our curated collection of luxury Egypt tour packages featuring exclusive access to ancient sites, premium accommodations, and personalized service.',
    keywords: 'Egypt tour packages, luxury Egypt tours, premium Egypt travel, exclusive Egypt experiences, private Egypt tours'
  },
  partners: {
    title: 'Our Trusted Travel Partners | King Tut Royal',
    description: 'Meet our carefully selected partners who help deliver exceptional luxury travel experiences across Egypt with premium services and local expertise.',
    keywords: 'travel partners, Egypt travel partners, luxury travel network, premium travel services'
  },
  tourLeaders: {
    title: 'Expert Tour Leaders | Professional Egypt Guides',
    description: 'Meet our team of expert tour leaders and professional guides who bring Egypt\'s rich history and culture to life with personalized storytelling.',
    keywords: 'Egypt tour guides, professional tour leaders, expert Egypt guides, luxury tour guides, private tour guides'
  },
  media: {
    title: 'Travel News & Media | King Tut Royal',
    description: 'Stay updated with the latest travel news, destination insights, and luxury travel trends from our expert team at King Tut Royal.',
    keywords: 'travel news, Egypt travel updates, luxury travel media, travel insights, destination news'
  },
  whyUs: {
    title: 'Why Choose King Tut Royal | Luxury Egypt Travel Excellence',
    description: 'Discover what makes King Tut Royal the premier choice for luxury Egypt travel with our commitment to excellence, personalized service, and exclusive experiences.',
    keywords: 'why choose King Tut Royal, luxury travel excellence, premium Egypt tours, exclusive travel experiences'
  }
}