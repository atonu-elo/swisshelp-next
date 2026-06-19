'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

interface HomepageBodyWrapperProps {
  html: string
}

/**
 * HomepageBodyWrapper — Handles re-initialization on navigation and hydration
 *
 * Problem: When user loads the site, or navigates/clicks home or FAQ links,
 * the elements below the hero section disappear due to React re-rendering/hydrating
 * the dangerouslySetInnerHTML content and removing the dynamically added `is-visible`
 * classes.
 *
 * Solution:
 * - Use a MutationObserver on `#swh-homepage-root` to detect when React re-renders
 *   or hydrative-commits new child nodes.
 * - On mutation or initial mount, clear the dataset flags and invoke
 *   window.__swhInitHomepage() to cleanly re-initialize the animations on the active DOM.
 */
export default function HomepageBodyWrapper({ html }: HomepageBodyWrapperProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const retryTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    const container = contentRef.current
    if (!container) return

    const clearInitFlags = () => {
      container.removeAttribute('data-swh-initialized')

      container.querySelectorAll<HTMLElement>('[data-bento-bound]').forEach((el) => {
        el.removeAttribute('data-bento-bound')
      })
      container.querySelectorAll<HTMLElement>('[data-words-applied]').forEach((el) => {
        el.removeAttribute('data-words-applied')
      })
      container.querySelectorAll<HTMLElement>('[data-chars-applied]').forEach((el) => {
        el.removeAttribute('data-chars-applied')
      })
      container.querySelectorAll<HTMLElement>('[data-chars-scrambled]').forEach((el) => {
        el.removeAttribute('data-chars-scrambled')
      })
      container.querySelectorAll<HTMLElement>('[data-scrambled]').forEach((el) => {
        el.removeAttribute('data-scrambled')
      })
      container.querySelectorAll<HTMLElement>('[data-mega-animated]').forEach((el) => {
        el.removeAttribute('data-mega-animated')
      })
      container.querySelectorAll<HTMLElement>('[data-counted]').forEach((el) => {
        el.removeAttribute('data-counted')
      })
      container.querySelectorAll<HTMLElement>('[data-slider-bound]').forEach((el) => {
        el.removeAttribute('data-slider-bound')
      })
    }

    const runInit = () => {
      clearInitFlags()
      const init = (window as Window & { __swhInitHomepage?: () => void }).__swhInitHomepage
      if (typeof init === 'function') {
        init()
        return true
      }

      return false
    }

    const runInitWithRetry = (attempt = 0) => {
      if (runInit()) return
      if (attempt >= 24) return

      retryTimeoutRef.current = window.setTimeout(() => {
        runInitWithRetry(attempt + 1)
      }, 120)
    }

    const handleHomepageReinit = () => {
      if (window.location.pathname === '/') {
        runInitWithRetry(0)
      }
    }

    const rafId = window.requestAnimationFrame(() => runInitWithRetry(0))
    const delayedInit = window.setTimeout(() => runInitWithRetry(0), 220)
    window.addEventListener('hashchange', handleHomepageReinit)
    window.addEventListener('swh:reinit-homepage', handleHomepageReinit)
    window.addEventListener('swh:homepage-script-ready', handleHomepageReinit)

    return () => {
      window.cancelAnimationFrame(rafId)
      window.clearTimeout(delayedInit)
      if (retryTimeoutRef.current !== null) {
        window.clearTimeout(retryTimeoutRef.current)
        retryTimeoutRef.current = null
      }
      window.removeEventListener('hashchange', handleHomepageReinit)
      window.removeEventListener('swh:reinit-homepage', handleHomepageReinit)
      window.removeEventListener('swh:homepage-script-ready', handleHomepageReinit)
    }
  }, [html, pathname])

  return (
    <div ref={contentRef} id="swh-homepage-root" dangerouslySetInnerHTML={{ __html: html }} />
  )
}
