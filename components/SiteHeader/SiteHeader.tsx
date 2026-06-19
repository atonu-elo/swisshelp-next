'use client'

/**
 * components/SiteHeader/SiteHeader.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Shared header for ALL new pages (not the homepage — the homepage renders its
 * own nav as verbatim HTML via HomepageBody.tsx).
 *
 * Features
 *  • Fixed top bar with logo + desktop nav + red phone CTA
 *  • "Dienstleistungen" nav item with hover dropdown listing all 8 services
 *  • Hamburger button + slide-in mobile drawer (full-screen overlay)
 *  • Closes drawer on route change / Escape key / link click
 *
 * Styling: SiteHeader.module.css (CSS Modules — zero global leakage)
 */

import { useState, useEffect, useRef, type MouseEvent as ReactMouseEvent } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './SiteHeader.module.css'

const SERVICE_LINKS = [
  { href: '/dienstleistungen/elektroinstallationen', label: 'Elektroinstallationen' },
  { href: '/dienstleistungen/service-und-reparatur', label: 'Service und Reparatur' },
  { href: '/dienstleistungen/heizung-und-lueftung', label: 'Heizung und Lüftung' },
  { href: '/dienstleistungen/periodische-kontrollen', label: 'Periodische Kontrollen' },
  { href: '/dienstleistungen/e-mobilitaet-und-ladestationen', label: 'E-Mobilität & Ladestationen' },
  { href: '/dienstleistungen/smart-home', label: 'Smart Home' },
  { href: '/dienstleistungen/schwachstrom-und-netzwerk', label: 'Schwachstrom & Netzwerk' },
  { href: '/dienstleistungen/photovoltaik-anschluss', label: 'Photovoltaik Anschluss' },
]

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Close mobile menu on route change
  useEffect(() => {
    const raf = window.requestAnimationFrame(() => {
      setMenuOpen(false)
      setDropdownOpen(false)
    })

    return () => window.cancelAnimationFrame(raf)
  }, [pathname])

  // Close dropdown when clicking outside
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { setMenuOpen(false); setDropdownOpen(false) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const requestHomepageReinit = () => {
    window.dispatchEvent(new Event('swh:reinit-homepage'))
  }

  const handleHomepageAnchorClick = (target: 'top' | 'team' | 'faq') => (e: ReactMouseEvent<HTMLAnchorElement>) => {
    if (pathname !== '/') {
      return
    }

    e.preventDefault()
    setMenuOpen(false)
    setDropdownOpen(false)

    if (target === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      window.history.replaceState(null, '', '/')
    } else {
      const targetEl = document.getElementById(target)
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      window.history.replaceState(null, '', `/#${target}`)
    }

    requestHomepageReinit()
    window.requestAnimationFrame(requestHomepageReinit)
    window.setTimeout(requestHomepageReinit, 260)
  }

  return (
    <>
      <header className={styles.header} id="top">
        <div className={styles.inner}>

          {/* ── Logo ─────────────────────────────────────────── */}
          <Link href="/" className={styles.logo} aria-label="Swisshelp Elektro — Startseite" onClick={handleHomepageAnchorClick('top')}>
            <img src="/images/favicon.svg" alt="Swisshelp Elektro" />
          </Link>

          {/* ── Desktop nav ───────────────────────────────────── */}
          <nav className={styles.desktopNav} aria-label="Hauptnavigation">
            <Link
              href="/"
              className={`${styles.navLink} ${isActive('/') ? styles.navLinkActive : ''}`}
              onClick={handleHomepageAnchorClick('top')}
            >
              Home
            </Link>

            {/* Leistungen dropdown */}
            <div
              className={styles.dropdown}
              ref={dropdownRef}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                className={`${styles.navLink} ${styles.dropdownTrigger} ${pathname.startsWith('/dienstleistungen') ? styles.navLinkActive : ''}`}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                onClick={() => setDropdownOpen(v => !v)}
              >
                Leistungen
                <svg
                  className={`${styles.chevron} ${dropdownOpen ? styles.chevronOpen : ''}`}
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className={styles.dropdownPanel} role="menu">
                  <Link
                    href="/dienstleistungen"
                    className={styles.dropdownAll}
                    role="menuitem"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Alle Leistungen →
                  </Link>
                  <div className={styles.dropdownDivider} />
                  <div className={styles.dropdownGrid}>
                    {SERVICE_LINKS.map(s => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className={`${styles.dropdownItem} ${pathname === s.href ? styles.dropdownItemActive : ''}`}
                        role="menuitem"
                        onClick={() => setDropdownOpen(false)}
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>


            <Link
              href="/#team"
              className={styles.navLink}
              onClick={handleHomepageAnchorClick('team')}
            >
              Team
            </Link>

            <Link
              href="/#faq"
              className={styles.navLink}
              onClick={handleHomepageAnchorClick('faq')}
            >
              FAQ
            </Link>

            <Link
              href="/ueber-uns"
              className={`${styles.navLink} ${isActive('/ueber-uns') ? styles.navLinkActive : ''}`}
            >
              Über uns
            </Link>

            <Link
              href="/kontakt"
              className={`${styles.navLink} ${isActive('/kontakt') ? styles.navLinkActive : ''}`}
            >
              Kontakt
            </Link>
          </nav>

          {/* ── Phone CTA ─────────────────────────────────────── */}
          <a href="tel:+41445400835" className={styles.phoneCta}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span className={styles.phoneNum}>044 540 08 35</span>
          </a>

          {/* ── Hamburger ─────────────────────────────────────── */}
          <button
            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Menü schliessen' : 'Menü öffnen'}
            aria-expanded={menuOpen}
            aria-controls="mobile-drawer"
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* ── Mobile drawer ──────────────────────────────────── */}
      {menuOpen && (
        <div
          id="mobile-drawer"
          className={`${styles.drawer} ${styles.drawerOpen}`}
          role="dialog"
          aria-label="Mobile Navigation"
          aria-modal="true"
        >
          <div className={styles.drawerInner}>
            {/* Main links */}
            <nav className={styles.drawerNav} aria-label="Mobile Navigation">
              <Link href="/" className={styles.drawerLink} onClick={handleHomepageAnchorClick('top')}>Home</Link>
              <Link href="/dienstleistungen" className={styles.drawerLink} onClick={() => setMenuOpen(false)}>Leistungen</Link>
              <Link href="/#team" className={styles.drawerLink} onClick={handleHomepageAnchorClick('team')}>Team</Link>
              <Link href="/#faq" className={styles.drawerLink} onClick={handleHomepageAnchorClick('faq')}>FAQ</Link>
              <Link href="/ueber-uns" className={styles.drawerLink} onClick={() => setMenuOpen(false)}>Über uns</Link>
              <Link href="/kontakt" className={styles.drawerLink} onClick={() => setMenuOpen(false)}>Kontakt</Link>
            </nav>

            {/* Service sub-links */}
            <div className={styles.drawerServices}>
              <p className={styles.drawerServicesLabel}>Leistungen</p>
              {SERVICE_LINKS.map(s => (
                <Link
                  key={s.href}
                  href={s.href}
                  className={styles.drawerServiceLink}
                  onClick={() => setMenuOpen(false)}
                >
                  {s.label}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <a href="tel:+41445400835" className={styles.drawerCta} onClick={() => setMenuOpen(false)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              044 540 08 35 anrufen
            </a>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {menuOpen && (
        <div
          className={styles.backdrop}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}
