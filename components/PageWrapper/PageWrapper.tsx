'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import styles from './PageWrapper.module.css'

interface PageWrapperProps {
  children: React.ReactNode
  /** Optional additional class name to merge on the <main> element */
  className?: string
}

export default function PageWrapper({ children, className }: PageWrapperProps) {
  const pathname = usePathname()

  useEffect(() => {
    // Standard Next.js route change scroll reset
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <main
      className={`${styles.main}${className ? ` ${className}` : ''}`}
      id="main-content"
      tabIndex={-1}
    >
      {children}
    </main>
  )
}
