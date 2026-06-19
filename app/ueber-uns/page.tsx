import type { Metadata } from 'next'
import SiteHeader from '@/components/SiteHeader/SiteHeader'
import SiteFooter from '@/components/SiteFooter/SiteFooter'
import PageWrapper from '@/components/PageWrapper/PageWrapper'
import PageSkeleton from '@/components/PageSkeleton/PageSkeleton'
import SkeletalLoaderContainer from '@/components/SkeletalLoaderContainer/SkeletalLoaderContainer'
import AboutHero from '@/components/AboutHero/AboutHero'
import TeamSection from '@/components/TeamSection/TeamSection'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Über uns | Swisshelp Elektro',
  description:
    'Swisshelp Elektro ist ein familiengeführtes Unternehmen mit Sitz in Weiningen ZH. Seit über drei Jahrzehnten stehen wir für zuverlässige Elektroinstallationen, persönliche Betreuung und saubere, hochwertige Arbeit. Gegründet wurde das Unternehmen von Christoph Trachsel, der Swisshelp bis heute prägt und gemeinsam mit seinem eingespielten Team die Region Zürich, Limmattal und Aargau betreut. Seit 2020 firmieren wir als Swisshelp Elektro GmbH – mit dem klaren Fokus auf nachhaltige Qualität und langfristige Kundenbeziehungen. Unsere Geschichte reicht jedoch weiter zurück: Bereits in den frühen Jahren waren wir an anspruchsvollen Infrastrukturprojekten beteiligt, darunter erste Netzwerksysteme am Flughafen Zürich (Kloten) und an der ETH Zürich sowie Telekommunikationslösungen für verschiedene Banken und Finanzinstitute. Diese Erfahrungen bilden bis heute das Fundament unserer technischen Kompetenz. Seit 2024 ist mit Dominic Trachsel die nächste Generation aktiv im Unternehmen tätig und führt den Bereich Service und Projektabwicklung mit moderner Perspektive und viel Praxisnähe weiter. Unser Anspruch bleibt dabei unverändert: Qualität vor Quantität, persönliche Betreuung und ein Ansprechpartner für das gesamte Projekt – von der Planung bis zur fertigen Installation.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://swisshelp.info/ueber-uns' },
  openGraph: {
    type: 'website',
    locale: 'de_CH',
    url: 'https://swisshelp.info/ueber-uns',
    title: 'Über uns | Swisshelp Elektro',
    description:
      'Swisshelp Elektro ist ein familiengeführtes Unternehmen mit Sitz in Weiningen ZH. Seit über drei Jahrzehnten stehen wir für zuverlässige Elektroinstallationen, persönliche Betreuung und saubere, hochwertige Arbeit. Gegründet wurde das Unternehmen von Christoph Trachsel, der Swisshelp bis heute prägt und gemeinsam mit seinem eingespielten Team die Region Zürich, Limmattal und Aargau betreut. Seit 2020 firmieren wir als Swisshelp Elektro GmbH – mit dem klaren Fokus auf nachhaltige Qualität und langfristige Kundenbeziehungen. Unsere Geschichte reicht jedoch weiter zurück: Bereits in den frühen Jahren waren wir an anspruchsvollen Infrastrukturprojekten beteiligt, darunter erste Netzwerksysteme am Flughafen Zürich (Kloten) und an der ETH Zürich sowie Telekommunikationslösungen für verschiedene Banken und Finanzinstitute. Diese Erfahrungen bilden bis heute das Fundament unserer technischen Kompetenz. Seit 2024 ist mit Dominic Trachsel die nächste Generation aktiv im Unternehmen tätig und führt den Bereich Service und Projektabwicklung mit moderner Perspektive und viel Praxisnähe weiter. Unser Anspruch bleibt dabei unverändert: Qualität vor Quantität, persönliche Betreuung und ein Ansprechpartner für das gesamte Projekt – von der Planung bis zur fertigen Installation.',
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
    title: 'Über uns | Swisshelp Elektro',
    description:
      'Swisshelp Elektro ist ein familiengeführtes Unternehmen mit Sitz in Weiningen ZH. Seit über drei Jahrzehnten stehen wir für zuverlässige Elektroinstallationen, persönliche Betreuung und saubere, hochwertige Arbeit. Gegründet wurde das Unternehmen von Christoph Trachsel, der Swisshelp bis heute prägt und gemeinsam mit seinem eingespielten Team die Region Zürich, Limmattal und Aargau betreut. Seit 2020 firmieren wir als Swisshelp Elektro GmbH – mit dem klaren Fokus auf nachhaltige Qualität und langfristige Kundenbeziehungen. Unsere Geschichte reicht jedoch weiter zurück: Bereits in den frühen Jahren waren wir an anspruchsvollen Infrastrukturprojekten beteiligt, darunter erste Netzwerksysteme am Flughafen Zürich (Kloten) und an der ETH Zürich sowie Telekommunikationslösungen für verschiedene Banken und Finanzinstitute. Diese Erfahrungen bilden bis heute das Fundament unserer technischen Kompetenz. Seit 2024 ist mit Dominic Trachsel die nächste Generation aktiv im Unternehmen tätig und führt den Bereich Service und Projektabwicklung mit moderner Perspektive und viel Praxisnähe weiter. Unser Anspruch bleibt dabei unverändert: Qualität vor Quantität, persönliche Betreuung und ein Ansprechpartner für das gesamte Projekt – von der Planung bis zur fertigen Installation.',
    images: ['https://swisshelp.info/images/favicon.png'],
  },
}

export default function UeberUnsPage() {
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
        name: 'Über uns',
        item: 'https://swisshelp.info/ueber-uns',
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
        <SkeletalLoaderContainer skeleton={<PageSkeleton type="text" />}>
          {/* Full width Hero Section */}
          <AboutHero />

          <div className={styles.container}>
            {/* Team Section */}
            <TeamSection />
          </div>
        </SkeletalLoaderContainer>
      </PageWrapper>
      <SiteFooter />
    </>
  )
}
