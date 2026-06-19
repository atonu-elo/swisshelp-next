/**
 * SiteNav — Shared navigation for new pages (/dienstleistungen, /kontakt, etc.)
 *
 * This is a SEPARATE nav component from the homepage nav.
 * The homepage renders its own nav as part of the verbatim body HTML.
 *
 * New pages use this component which:
 * - Uses the same visual design tokens (accent red, dark background, IBM Plex Mono)
 * - Links to homepage sections with /#anchor pattern (navigate to root + scroll)
 * - Uses Next.js <Link> for proper routing
 *
 * Requires: the page importing this component must also import
 * styles/site-nav.css (or include shared design tokens).
 */
'use client'

import Link from 'next/link'
import styles from './SiteNav.module.css'

export default function SiteNav() {
  return (
    <nav className={styles.nav} id="top">
      <div className={styles.navInner}>
        {/* Logo */}
        <Link href="/" className={styles.navLogo} aria-label="Swisshelp Elektro — Startseite">
          <img src="/images/favicon.svg" alt="Swisshelp Elektro" />
        </Link>

        {/* Desktop links */}
        <div className={styles.navLinks}>
          <Link href="/#services">Leistungen</Link>
          <Link href="/#knx">Smart Home</Link>
          <Link href="/#team">Team</Link>
          <Link href="/#faq">FAQ</Link>
          <Link href="/#kontakt">Kontakt</Link>
        </div>

        {/* Phone CTA */}
        <a href="tel:+41445400835" className={styles.navPhone}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span>044 540 08 35</span>
        </a>
      </div>
    </nav>
  )
}
