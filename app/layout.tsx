import type { Metadata } from 'next'
import Script from 'next/script'
import '../styles/globals.css'

/**
 * Root Layout — MINIMAL SHELL ONLY.
 *
 * This file intentionally contains NO styling, NO nav, NO footer.
 * The homepage (/) renders its own complete HTML including nav, hero,
 * all sections, and footer via HomepageBody.tsx + HomepageStyles.tsx.
 *
 * New pages (/dienstleistungen, /kontakt, etc.) import SiteHeader,
 * PageWrapper, and SiteFooter to maintain design consistency.
 */
export const metadata: Metadata = {
  title: {
    default: 'Swisshelp Elektro',
    template: '%s | Swisshelp Elektro',
  },
  description:
    'Massgeschneiderte Gesamtkonzepte für moderne Elektrotechnik. Familienbetrieb aus Weiningen ZH für Zürich, Limmattal und Aargau.',
  icons: {
    icon: '/images/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de-CH">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Darker+Grotesque:wght@500;800;900&family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Script src="/homepage-scripts.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
