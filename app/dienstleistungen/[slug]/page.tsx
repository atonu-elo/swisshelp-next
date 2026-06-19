import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SiteHeader from '@/components/SiteHeader/SiteHeader'
import SiteFooter from '@/components/SiteFooter/SiteFooter'
import PageWrapper from '@/components/PageWrapper/PageWrapper'
import PageSkeleton from '@/components/PageSkeleton/PageSkeleton'
import SkeletalLoaderContainer from '@/components/SkeletalLoaderContainer/SkeletalLoaderContainer'
import { services, getServiceBySlug, type Service } from '@/lib/services'

// Component imports
import ServiceDetailHero from '@/components/ServiceDetailHero/ServiceDetailHero'
import ServiceContentBlocks from '@/components/ServiceContentBlocks/ServiceContentBlocks'
import ServiceProcess from '@/components/ServiceProcess/ServiceProcess'
import ServiceFaqs from '@/components/ServiceFaqs/ServiceFaqs'
import ServiceRelated from '@/components/ServiceRelated/ServiceRelated'
import ServiceCtaBanner from '@/components/ServiceCtaBanner/ServiceCtaBanner'

import styles from './page.module.css'

interface Props {
  params: Promise<{ slug: string }>
}

/**
 * Generate static params for all 7 service slugs.
 * Enables static generation (SSG) for all service pages.
 */
export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return {}
  const title = `${service.title} | Swisshelp Elektro`
  const description = service.description
  const url = `https://swisshelp.info/dienstleistungen/${slug}`

  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: 'de_CH',
      url,
      title,
      description,
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
      title,
      description,
      images: ['https://swisshelp.info/images/favicon.png'],
    },
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  // Get related services data
  const related = service.relatedServices
    .map((sSlug) => getServiceBySlug(sSlug))
    .filter((s): s is Service => !!s)

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Swisshelp Elektro GmbH',
      image: 'https://swisshelp.info/images/_AMA8417.jpg',
      telephone: '+41445400835',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Grossächerweg 4',
        addressLocality: 'Weiningen',
        postalCode: '8104',
        addressRegion: 'ZH',
        addressCountry: 'CH',
      },
    },
    areaServed: [
      {
        '@type': 'AdministrativeArea',
        name: 'Zürich',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Limmattal',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Weiningen',
      },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Startseite',
        item: 'https://swisshelp.info',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Dienstleistungen',
        item: 'https://swisshelp.info/dienstleistungen',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.title,
        item: `https://swisshelp.info/dienstleistungen/${service.slug}`,
      },
    ],
  }

  return (
    <>
      {/* Dynamic JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <SiteHeader />
      <PageWrapper className={styles.main}>
        <SkeletalLoaderContainer skeleton={<PageSkeleton type="detail" />}>
          <div className={styles.container}>
            {/* Service Detail Hero */}
            <ServiceDetailHero service={service} />

            {/* Service Content Blocks */}
            <ServiceContentBlocks service={service} />

            {/* Service Process steps */}
            <ServiceProcess service={service} />

            {/* Service FAQs */}
            <ServiceFaqs service={service} />

            {/* Related Services */}
            <ServiceRelated related={related} />

            {/* Bottom CTA Banner */}
            <ServiceCtaBanner />
          </div>
        </SkeletalLoaderContainer>
      </PageWrapper>
      <SiteFooter />
    </>
  )
}
