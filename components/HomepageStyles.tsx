/**
 * HomepageStyles — Server Component
 *
 * Injects the complete homepage CSS (extracted verbatim from index.html)
 * as a route-scoped <style> tag. Because this component is only imported
 * from app/page.tsx (the homepage route), the styles are injected ONLY
 * when visiting "/" — they do not leak to /dienstleistungen, /kontakt, etc.
 *
 * The CSS is read at build time via the Node.js `fs` module (Server Component).
 * No runtime overhead, no client-side injection flash.
 *
 * CRITICAL: Do NOT import this from any layout or other page file.
 */
import { readFileSync } from 'fs'
import path from 'path'

export default function HomepageStyles() {
  const cssPath = path.join(process.cwd(), 'styles', 'homepage.css')
  const css = readFileSync(cssPath, 'utf8')

  return (
    <>
      {/* Google Fonts — same as original index.html */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Darker+Grotesque:wght@500;800;900&family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      {/* Hero LCP preload — same as original */}
      <link rel="preload" as="image" href="/images/_AMA7416.jpg" type="image/webp" />
      {/* Route-scoped homepage CSS */}
      <style dangerouslySetInnerHTML={{ __html: css }} />
    </>
  )
}
