import { Metadata } from 'next'

export const siteConfig = {
  name: "Madiun Photography",
  description: "Professional photography services in Madiun. Specializing in weddings, portraits, events, and commercial photography. Capturing your precious moments with artistic vision and technical excellence.",
  url: "https://madiunphotography.com",
  ogImage: "https://madiunphotography.com/og-image.jpg",
  links: {
    twitter: "https://twitter.com/madiunphoto",
    instagram: "https://instagram.com/madiunphotography",
    facebook: "https://facebook.com/madiunphotography",
  },
  keywords: [
    "photography",
    "wedding photography",
    "portrait photography",
    "event photography",
    "Madiun photographer",
    "professional photography",
    "commercial photography",
    "family photography",
    "engagement photography",
    "corporate photography"
  ],
  author: "Madiun Photography Team",
  creator: "Madiun Photography",
  publisher: "Madiun Photography",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export function generateMetadata({
  title,
  description,
  image,
  url,
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  url?: string
  noIndex?: boolean
} = {}): Metadata {
  const metaTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name
  const metaDescription = description || siteConfig.description
  const metaImage = image || siteConfig.ogImage
  const metaUrl = url ? `${siteConfig.url}${url}` : siteConfig.url

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.creator,
    publisher: siteConfig.publisher,
    formatDetection: siteConfig.formatDetection,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: metaUrl,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: metaUrl,
      title: metaTitle,
      description: metaDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
      creator: "@madiunphoto",
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "uXt5flb09gzMYjciDairuMSOyIUzuD3a1xrPV8RZsEI",
    },
  }
}

export const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Madiun Photography",
  "description": "Professional photography services specializing in weddings, portraits, and events in Madiun, Indonesia.",
  "url": "https://madiunphotography.com",
  "telephone": "+62-123-456-7890",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jl. Photography Street No. 123",
    "addressLocality": "Madiun",
    "addressRegion": "East Java",
    "postalCode": "63100",
    "addressCountry": "ID"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -7.6298,
    "longitude": 111.5239
  },
  "openingHours": [
    "Mo-Fr 09:00-18:00",
    "Sa 09:00-16:00"
  ],
  "priceRange": "$$",
  "image": "https://madiunphotography.com/logo.jpg",
  "sameAs": [
    "https://www.facebook.com/madiunphotography",
    "https://www.instagram.com/madiunphotography",
    "https://twitter.com/madiunphoto"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Photography Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Wedding Photography",
          "description": "Complete wedding photography coverage including ceremony, reception, and portraits."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Portrait Photography",
          "description": "Professional portrait sessions for individuals, families, and corporate headshots."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Event Photography",
          "description": "Coverage of corporate events, parties, and special occasions."
        }
      }
    ]
  }
}
