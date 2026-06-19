import type { Metadata } from 'next'
import SiteHeader from '@/components/SiteHeader/SiteHeader'
import SiteFooter from '@/components/SiteFooter/SiteFooter'
import PageWrapper from '@/components/PageWrapper/PageWrapper'
import PageSkeleton from '@/components/PageSkeleton/PageSkeleton'
import SkeletalLoaderContainer from '@/components/SkeletalLoaderContainer/SkeletalLoaderContainer'
import ServicesHeader from '@/components/ServicesHeader/ServicesHeader'
import ServicesGrid from '@/components/ServicesGrid/ServicesGrid'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Dienstleistungen | Swisshelp Elektro',
  description:
    'Elektroinstallationen, Service und Reparatur, Smart Home mit KNX und LOXONE, Wallbox und periodische Kontrollen. Swisshelp Elektro, Weiningen ZH.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://swisshelp.info/dienstleistungen' },
  openGraph: {
    type: 'website',
    locale: 'de_CH',
    url: 'https://swisshelp.info/dienstleistungen',
    title: 'Dienstleistungen | Swisshelp Elektro',
    description:
      'Elektroinstallationen, Service und Reparatur, Smart Home mit KNX und LOXONE, Wallbox und periodische Kontrollen. Swisshelp Elektro, Weiningen ZH.',
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
    title: 'Dienstleistungen | Swisshelp Elektro',
    description:
      'Elektroinstallationen, Service und Reparatur, Smart Home mit KNX und LOXONE, Wallbox und periodische Kontrollen. Swisshelp Elektro, Weiningen ZH.',
    images: ['https://swisshelp.info/images/favicon.png'],
  },
}

export default function DienstleistungenPage() {
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
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <SiteHeader />
      <PageWrapper className={styles.main}>
        <SkeletalLoaderContainer skeleton={<PageSkeleton type="list" />}>
          <div className={styles.container}>
            {/* Header Title & Intro */}
            <ServicesHeader />

            {/* Services Cards Grid */}
            <ServicesGrid />
          </div>
        </SkeletalLoaderContainer>
      </PageWrapper>
      <SiteFooter />
    </>
  )
}
