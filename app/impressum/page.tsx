import type { Metadata } from 'next'
import SiteHeader from '@/components/SiteHeader/SiteHeader'
import SiteFooter from '@/components/SiteFooter/SiteFooter'
import PageWrapper from '@/components/PageWrapper/PageWrapper'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum der Swisshelp Elektro GmbH, Weiningen ZH.',
  robots: { index: false, follow: false },
}

export default function ImpressumPage() {
  return (
    <>
      <SiteHeader />
      <PageWrapper className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.h1}>Impressum</h1>
          <div className={styles.content}>
            <h2>Swisshelp Elektro GmbH</h2>
            <address>
              Grossächerweg 4<br />
              8104 Weiningen ZH<br />
              Schweiz<br /><br />
              Tel: <a href="tel:+41445400835">+41 44 540 08 35</a><br />
              E-Mail: <a href="mailto:ch.trachsel@swisshelp.info">ch.trachsel@swisshelp.info</a>
            </address>
            <br />
            <p>UID: CHE-393.108.974</p>
            <p>Mitglied VSEI</p>
            <br />
            <h2>Verantwortlich für den Inhalt</h2>
            <p>Christoph Trachsel, Geschäftsführer</p>
            <br />
            <h2>Webdesign</h2>
            <p>
              <a href="https://make-marketing.agency" target="_blank" rel="noopener noreferrer">
                MAKE Marketing, Aesch
              </a>
            </p>
          </div>
        </div>
      </PageWrapper>
      <SiteFooter />
    </>
  )
}

