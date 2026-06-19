'use client'

import React, { useState, useEffect, useRef } from 'react'
import styles from './ImageSkeleton.module.css'

interface ImageSkeletonProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Optional custom class name for the wrapper container element */
  wrapperClassName?: string
}

export default function ImageSkeleton({
  src,
  alt = '',
  className,
  wrapperClassName,
  onLoad,
  onError,
  ...props
}: ImageSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  // Reset loaded state when source changes
  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoaded(true)
    } else {
      setIsLoaded(false)
    }
  }, [src])

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true)
    if (onLoad) {
      onLoad(e)
    }
  }

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true) // Hide skeleton if the image fails to load to prevent perpetual loading animation
    if (onError) {
      onError(e)
    }
  }

  return (
    <div className={`${styles.wrapper} ${wrapperClassName || ''}`}>
      {!isLoaded && <div className={styles.skeleton} />}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`${styles.image} ${className || ''} ${isLoaded ? styles.loaded : ''}`}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  )
}
