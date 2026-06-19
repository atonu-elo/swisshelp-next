/**
 * components/SiteFooter/SiteFooter.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Shared footer for all pages. Matches the homepage footer visual design exactly
 * (outside partners strip, dark bg, 4-column grid, service area strip, bottom bar).
 */

import Link from 'next/link'
import styles from './SiteFooter.module.css'

const SERVICES = [
  { href: '/dienstleistungen/elektroinstallationen',          label: 'Elektroinstallationen' },
  { href: '/dienstleistungen/service-und-reparatur',          label: 'Service & Reparatur' },
  { href: '/dienstleistungen/heizung-und-lueftung',           label: 'Heizung & Lüftung' },
  { href: '/dienstleistungen/periodische-kontrollen',         label: 'Periodische Kontrollen' },
  { href: '/dienstleistungen/e-mobilitaet-und-ladestationen', label: 'E-Mobilität & Ladestationen' },
  { href: '/dienstleistungen/smart-home',                     label: 'Smart Home' },
  { href: '/dienstleistungen/schwachstrom-und-netzwerk',      label: 'Schwachstrom & Netzwerk' },
]

const COMPANY = [
  { href: '/ueber-uns',  label: 'Über uns' },
  { href: '/#team',      label: 'Team' },
  { href: '/#faq',       label: 'FAQ' },
  { href: '/kontakt',    label: 'Kontakt' },
]

const CURRENT_YEAR = new Date().getFullYear()

export default function SiteFooter() {
  return (
    <>
      {/* Partner-Strip (Autoritäts-Anker) */}
      <section className={styles.partners} aria-label="Zertifizierungen und Partner">
        <div className={styles.partnersInner}>
          <div className={styles.partnersLabel}>Zertifizierte Partnerschaften</div>
          <div className={styles.partnersLogos}>
            <span className={styles.partnerChip}>KNX <em>Certified Partner</em></span>
            <span className={styles.partnerChip}>LOXONE <em>Silver Partner</em></span>
            <span className={styles.partnerChip}>NIV <em>Eidg. dipl. Sicherheitsexperte</em></span>
            <span className={styles.partnerChip}>24/7 <em>Pikett ZH · Limmattal · AG</em></span>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.inner}>
          
          {/* Brand Column */}
          <div className={styles.brand}>
            <Link href="/" aria-label="Swisshelp Elektro — Startseite" className={styles.brandLogo}>
              <img src="/images/favicon.svg" alt="swisshelp" />
            </Link>
            <p className={styles.brandDesc}>
              Elektriker und Elektro-Notdienst für Zürich, Limmattal und Aargau. Familienbetrieb in Weiningen. KNX und LOXONE Partner, eidg. dipl. Sicherheitsexperte im Team.
            </p>
            <a href="tel:+41445400835" className={styles.brandPhone}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>044 540 08 35</span>
            </a>
          </div>

          {/* Column 2: Services */}
          <div className={styles.col}>
            <h3>Leistungen</h3>
            <ul className={styles.colList}>
              {SERVICES.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className={styles.colLink}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className={styles.col}>
            <h3>Unternehmen</h3>
            <ul className={styles.colList}>
              {COMPANY.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className={styles.colLink}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Standort */}
          <div className={styles.col}>
            <h3>Standort</h3>
            <address className={styles.address}>
              Swisshelp Elektro GmbH<br />
              Grossächerweg 4<br />
              8104 Weiningen ZH<br /><br />
              <a href="tel:+41445400835">+41 44 540 08 35</a>
              <a href="mailto:ch.trachsel@swisshelp.info">ch.trachsel@swisshelp.info</a>
              <br />Mo-Fr 07:30-17:30<br />Notdienst 7x24
            </address>
          </div>

        </div>

        {/* Service Area Strip */}
        <div className={styles.serviceArea}>
          <div className={styles.serviceAreaInner}>
            <span className={styles.serviceAreaLabel}>Einsatzgebiet</span>
            <p className={styles.serviceAreaList}>
              Weiningen · Dietikon · Schlieren · Urdorf · Zürich · Regensdorf · Affoltern a. A. · Baden · Wettingen · Zug · gesamter Kanton Zürich und Limmattal
            </p>
          </div>
        </div>

        {/* Copyright and Bottom Links */}
        <div className={styles.bottom}>
          <div className={styles.bottomInner}>
            <div>
              &copy; {CURRENT_YEAR} Swisshelp Elektro GmbH &nbsp;·&nbsp; UID CHE-393.108.974 &nbsp;·&nbsp; Mitglied VSEI &nbsp;·&nbsp;{' '}
              <a href="https://make-marketing.agency" target="_blank" rel="noopener" className={styles.agencyLink}>
                Webdesign Aesch, MAKE Marketing
              </a>
            </div>
            <div className={styles.bottomLinks}>
              <Link href="/impressum" className={styles.bottomLink}>Impressum</Link>
              <Link href="/datenschutz" className={styles.bottomLink}>Datenschutz</Link>
            </div>
          </div>
        </div>

      </footer>
    </>
  )
}
