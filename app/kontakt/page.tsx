import type { Metadata } from 'next'
import SiteHeader from '@/components/SiteHeader/SiteHeader'
import SiteFooter from '@/components/SiteFooter/SiteFooter'
import PageWrapper from '@/components/PageWrapper/PageWrapper'
import PageSkeleton from '@/components/PageSkeleton/PageSkeleton'
import SkeletalLoaderContainer from '@/components/SkeletalLoaderContainer/SkeletalLoaderContainer'
import ContactHero from '@/components/ContactHero/ContactHero'
import ContactDetails from '@/components/ContactDetails/ContactDetails'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Kontakt | Swisshelp Elektro',
  description:
    'Kontaktieren Sie Swisshelp Elektro GmbH. Tel. +41 44 540 08 35. Notdienst 7x24. Weiningen ZH.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://swisshelp.info/kontakt' },
  openGraph: {
    type: 'website',
    locale: 'de_CH',
    url: 'https://swisshelp.info/kontakt',
    title: 'Kontakt | Swisshelp Elektro',
    description:
      'Kontaktieren Sie Swisshelp Elektro GmbH. Tel. +41 44 540 08 35. Notdienst 7x24. Weiningen ZH.',
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
    title: 'Kontakt | Swisshelp Elektro',
    description:
      'Kontaktieren Sie Swisshelp Elektro GmbH. Tel. +41 44 540 08 35. Notdienst 7x24. Weiningen ZH.',
    images: ['https://swisshelp.info/images/favicon.png'],
  },
}

export default function KontaktPage() {
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
        name: 'Kontakt',
        item: 'https://swisshelp.info/kontakt',
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
        <SkeletalLoaderContainer skeleton={<PageSkeleton type="contact" />}>
          {/* Full width Hero Section */}
          <ContactHero />

          <div className={styles.container}>
            {/* Contact Details & Form */}
            <ContactDetails />
          </div>
        </SkeletalLoaderContainer>
      </PageWrapper>
      <SiteFooter />
    </>
  )
}
