import type { Metadata } from 'next'
import SiteHeader from '@/components/SiteHeader/SiteHeader'
import SiteFooter from '@/components/SiteFooter/SiteFooter'
import PageWrapper from '@/components/PageWrapper/PageWrapper'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Datenschutz',
  description: 'Datenschutzerklärung der Swisshelp Elektro GmbH.',
  robots: { index: false, follow: false },
}

export default function DatenschutzPage() {
  return (
    <>
      <SiteHeader />
      <PageWrapper className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.h1}>Datenschutzerklärung</h1>
          <div className={styles.content}>
            <p>
              Diese Datenschutzerklärung informiert Sie über die Art, den Umfang und den Zweck der
              Verarbeitung personenbezogener Daten auf dieser Website.
            </p>

            <h2>Verantwortliche Stelle</h2>
            <address>
              Swisshelp Elektro GmbH<br />
              Grossächerweg 4<br />
              8104 Weiningen ZH<br />
              E-Mail: <a href="mailto:ch.trachsel@swisshelp.info">ch.trachsel@swisshelp.info</a>
            </address>

            <h2>Hosting</h2>
            <p>Diese Website wird auf Servern in der Europäischen Union oder der Schweiz gehostet.</p>

            <h2>Kontaktformular</h2>
            <p>
              Bei Nutzung des Kontaktformulars werden die eingegebenen Daten (Name, Telefon, Beschreibung)
              ausschliesslich zur Bearbeitung Ihrer Anfrage verwendet und nicht an Dritte weitergegeben.
            </p>

            <h2>Cookies und Analysen</h2>
            <p>
              Diese Website setzt keine Tracking-Cookies ein und verwendet keine Analysetools, die
              personenbezogene Daten speichern.
            </p>

            <h2>Ihre Rechte</h2>
            <p>
              Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung
              Ihrer personenbezogenen Daten. Kontakt:{' '}
              <a href="mailto:ch.trachsel@swisshelp.info">ch.trachsel@swisshelp.info</a>
            </p>
          </div>
        </div>
      </PageWrapper>
      <SiteFooter />
    </>
  )
}

