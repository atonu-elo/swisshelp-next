'use client'

import React, { useEffect, useState } from 'react'
import styles from './SkeletalLoaderContainer.module.css'

interface SkeletalLoaderContainerProps {
  children: React.ReactNode
  skeleton: React.ReactNode
  /** Delay before fading out the skeleton and showing actual content (ms) */
  delay?: number
}

export default function SkeletalLoaderContainer({
  children,
  skeleton,
  delay = 50,
}: SkeletalLoaderContainerProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div className={`${styles.wrapper} ${isLoaded ? styles.loaded : ''}`}>
      <div className={styles.skeletonContainer}>
        {skeleton}
      </div>
      <div className={styles.contentContainer}>
        {children}
      </div>
    </div>
  )
}
