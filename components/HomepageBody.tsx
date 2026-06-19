'use client'

import { useEffect } from 'react'

/**
 * HomepageBody — Client Component
 *
 * Renders the EXACT original homepage body HTML verbatim via dangerouslySetInnerHTML.
 * The HTML is read at build time from the filesystem by the parent Server Component
 * (page.tsx) and passed down as a string prop.
 *
 * WHY CLIENT COMPONENT:
 * The homepage JS needs DOM access (IntersectionObserver, DOMContentLoaded listeners,
 * burger menu, slider, etc.). We load those via a <Script> tag with strategy="afterInteractive"
 * defined in the parent page.tsx (Server Component can use next/script).
 *
 * CRITICAL CONTRACT:
 * - Do NOT modify the `html` prop value before passing it in.
 * - Do NOT add wrapper elements that introduce styling.
 * - The outer fragment renders directly inside <body> of the root layout.
 */

interface HomepageBodyProps {
  html: string
}

export default function HomepageBody({ html }: HomepageBodyProps) {
  useEffect(() => {
    // Clear initialization flag to allow the script to re-run animations
    const activeRoot = document.getElementById('swh-homepage-root') || document.getElementById('main-content')
    if (activeRoot) {
      delete activeRoot.dataset.swhInitialized
    }

    const timer = setTimeout(() => {
      const init = (window as any).__swhInitHomepage
      if (typeof init === 'function') {
        init()
      }
    }, 50)

    // Fallback/Ensure reveal animation triggers on navigation
    let io: IntersectionObserver | null = null
    const revealTimer = setTimeout(() => {
      const els = document.querySelectorAll('[data-reveal], [data-img-reveal], [data-words], [data-chars]')
      if ('IntersectionObserver' in window) {
        io = new IntersectionObserver((entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('is-visible')
              e.target.querySelectorAll('[data-words]').forEach((w) => w.classList.add('is-visible'))
              e.target.querySelectorAll('[data-chars]').forEach((c) => c.classList.add('is-visible'))
              io?.unobserve(e.target)
            }
          })
        }, { threshold: 0.02, rootMargin: '0px 0px 10% 0px' })

        els.forEach((el) => {
          const rect = el.getBoundingClientRect()
          // Safe view check to prevent blank sections on top of page / loading layout race conditions
          if (rect.top < window.innerHeight || el.clientHeight === 0) {
            el.classList.add('is-visible')
            el.querySelectorAll('[data-words]').forEach((w) => w.classList.add('is-visible'))
            el.querySelectorAll('[data-chars]').forEach((c) => c.classList.add('is-visible'))
          } else {
            io?.observe(el)
          }
        })
      } else {
        els.forEach((el) => el.classList.add('is-visible'))
      }
    }, 150)

    return () => {
      clearTimeout(timer)
      clearTimeout(revealTimer)
      if (io) io.disconnect()
    }
  }, [html])

  return (
    <div
      id="swh-homepage-root"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
