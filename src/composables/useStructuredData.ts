import { useHead } from '@unhead/vue'

export interface OrganizationSchema {
  '@context': string
  '@type': string
  name: string
  url: string
  logo: string
  description: string
  address?: {
    '@type': string
    streetAddress?: string
    addressLocality?: string
    addressRegion?: string
    postalCode?: string
    addressCountry?: string
  }
  contactPoint?: {
    '@type': string
    telephone?: string
    contactType?: string
    email?: string
  }
  sameAs?: string[]
}

export interface TravelPackageSchema {
  '@context': string
  '@type': string
  name: string
  description: string
  image: string[]
  offers: {
    '@type': string
    price?: string
    priceCurrency?: string
    availability?: string
    validFrom?: string
    validThrough?: string
  }
  provider: {
    '@type': string
    name: string
    url: string
  }
  itinerary?: {
    '@type': string
    name: string
    description: string
  }[]
  duration?: string
  location?: {
    '@type': string
    name: string
    address?: string
  }[]
}

export interface ArticleSchema {
  '@context': string
  '@type': string
  headline: string
  description: string
  image: string[]
  author: {
    '@type': string
    name: string
  }
  publisher: {
    '@type': string
    name: string
    logo: {
      '@type': string
      url: string
    }
  }
  datePublished: string
  dateModified?: string
  mainEntityOfPage: {
    '@type': string
    '@id': string
  }
}

export function useStructuredData() {
  const addOrganizationSchema = (data: Partial<OrganizationSchema> = {}) => {
    const schema: OrganizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'TravelAgency',
      name: 'King Tut Royal',
      url: 'https://kingtutroyal.com',
      logo: 'https://kingtutroyal.com/logo.png',
      description: 'Premium luxury travel agency specializing in exclusive Egypt tours and personalized travel experiences.',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'EG'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'info@kingtutroyal.com'
      },
      sameAs: [
        'https://www.facebook.com/kingtutroyal',
        'https://www.instagram.com/kingtutroyal',
        'https://www.twitter.com/kingtutroyal'
      ],
      ...data
    }

    useHead({
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(schema)
        }
      ]
    })

    return schema
  }

  const addTravelPackageSchema = (packageData: Partial<TravelPackageSchema>) => {
    const schema: TravelPackageSchema = {
      '@context': 'https://schema.org',
      '@type': 'TouristTrip',
      name: packageData.name || 'Luxury Egypt Travel Package',
      description: packageData.description || 'Exclusive luxury travel experience in Egypt',
      image: packageData.image || ['/og.webp'],
      offers: {
        '@type': 'Offer',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        ...packageData.offers
      },
      provider: {
        '@type': 'TravelAgency',
        name: 'King Tut Royal',
        url: 'https://kingtutroyal.com'
      },
      location: packageData.location || [{
        '@type': 'Place',
        name: 'Egypt',
        address: 'Egypt'
      }],
      ...packageData
    }

    useHead({
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(schema)
        }
      ]
    })

    return schema
  }

  const addArticleSchema = (articleData: Partial<ArticleSchema>) => {
    const schema: ArticleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: articleData.headline || 'Travel Article',
      description: articleData.description || 'Travel insights and news',
      image: articleData.image || ['/og.webp'],
      author: {
        '@type': 'Organization',
        name: 'King Tut Royal'
      },
      publisher: {
        '@type': 'Organization',
        name: 'King Tut Royal',
        logo: {
          '@type': 'ImageObject',
          url: 'https://kingtutroyal.com/logo.png'
        }
      },
      datePublished: articleData.datePublished || new Date().toISOString(),
      dateModified: articleData.dateModified || new Date().toISOString(),
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': articleData.mainEntityOfPage?.['@id'] || 'https://kingtutroyal.com'
      },
      ...articleData
    }

    useHead({
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(schema)
        }
      ]
    })

    return schema
  }

  const addWebsiteSchema = () => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'King Tut Royal',
      url: 'https://kingtutroyal.com',
      description: 'Premium luxury travel agency specializing in exclusive Egypt tours and personalized travel experiences.',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://kingtutroyal.com/search?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      },
      publisher: {
        '@type': 'Organization',
        name: 'King Tut Royal',
        logo: {
          '@type': 'ImageObject',
          url: 'https://kingtutroyal.com/logo.png'
        }
      }
    }

    useHead({
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(schema)
        }
      ]
    })

    return schema
  }

  const addBreadcrumbSchema = (breadcrumbs: Array<{ name: string; url: string }>) => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    }

    useHead({
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(schema)
        }
      ]
    })

    return schema
  }

  return {
    addOrganizationSchema,
    addTravelPackageSchema,
    addArticleSchema,
    addWebsiteSchema,
    addBreadcrumbSchema
  }
}