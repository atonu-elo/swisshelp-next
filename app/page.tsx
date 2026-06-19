/**
 * app/page.tsx — Homepage (/)
 *
 * PRESERVATION STRATEGY:
 * This page renders the original index.html content EXACTLY as-is:
 *   1. HomepageStyles injects the full ~4300-line CSS as a route-scoped <style> tag
 *   2. HomepageBody renders the full body HTML via dangerouslySetInnerHTML
 *   3. The JS scripts are loaded via next/script with strategy="afterInteractive"
 *
 * The HTML body content is read from the extracted-body.html file at build time
 * (Server Component — no client-side overhead). Image paths have been updated
 * from ./reference/ to /images/ (the only permitted change).
 *
 * DO NOT modify the HTML content passed to HomepageBody.
 * DO NOT add layout wrappers, headers, or footers from outside this file.
 */
import type { Metadata } from 'next'
import { readFileSync } from 'fs'
import path from 'path'
import HomepageStyles from '@/components/HomepageStyles'
import HomepageBodyWrapper from '@/components/HomepageBodyWrapper'
import SiteHeader from '@/components/SiteHeader/SiteHeader'
import SiteFooter from '@/components/SiteFooter/SiteFooter'

export const metadata: Metadata = {
  title: 'Elektriker Zürich & Limmattal | Swisshelp Elektro',
  description:
    'Massgeschneiderte Gesamtkonzepte für moderne Elektrotechnik. Elektroinstallationen, Service und Reparatur, Smart Home mit KNX und LOXONE, Ladestationen und periodische Kontrollen. Familienbetrieb aus Weiningen ZH für Zürich, Limmattal und Aargau.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://swisshelp.info/' },
  openGraph: {
    type: 'website',
    locale: 'de_CH',
    url: 'https://swisshelp.info/',
    title: 'Elektriker Zürich & Limmattal | Swisshelp Elektro',
    description:
      'Massgeschneiderte Gesamtkonzepte für moderne Elektrotechnik. Elektroinstallationen, Service, Smart Home, Ladestationen und periodische Kontrollen. Familienbetrieb aus Weiningen ZH.',
    images: [
      {
        url: 'https://swisshelp.info/images/favicon.png',
        width: 1024,
        height: 416,
        alt: 'Swisshelp Elektro Logo',
      },
    ],
    siteName: 'Swisshelp Elektro',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elektriker Zürich & Limmattal | Swisshelp Elektro',
    description:
      'Massgeschneiderte Gesamtkonzepte für moderne Elektrotechnik. Familienbetrieb aus Weiningen ZH.',
    images: ['https://swisshelp.info/images/favicon.png'],
  },
}

export default function HomePage() {
  // Read the extracted homepage body HTML at build time (Server Component)
  const bodyHtmlPath = path.join(process.cwd(), 'extracted-body.html')
  const bodyHtml = readFileSync(bodyHtmlPath, 'utf8')

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Swisshelp Elektro GmbH",
    "url": "https://swisshelp.info",
    "logo": "https://swisshelp.info/images/favicon.svg",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+41-44-540-08-35",
      "contactType": "customer service",
      "areaServed": "CH",
      "availableLanguage": "German"
    }
  }

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    "name": "Swisshelp Elektro GmbH",
    "image": "https://swisshelp.info/images/_AMA8417.jpg",
    "@id": "https://swisshelp.info/#localbusiness",
    "url": "https://swisshelp.info",
    "telephone": "+41445400835",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Grossächerweg 4",
      "addressLocality": "Weiningen",
      "postalCode": "8104",
      "addressRegion": "ZH",
      "addressCountry": "CH"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 47.41725,
      "longitude": 8.43477
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "07:30",
      "closes": "17:30"
    }
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Swisshelp Elektro",
    "url": "https://swisshelp.info"
  }

  return (
    <>
      {/* Dynamic JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* Route-scoped CSS + fonts (only injected on this route) */}
      <HomepageStyles />

      {/* Unified Site Header */}
      <SiteHeader />

      {/* Verbatim homepage body HTML with re-initialization wrapper */}
      <HomepageBodyWrapper html={bodyHtml} />

      {/* Unified Site Footer */}
      <SiteFooter />
    </>
  )
}
