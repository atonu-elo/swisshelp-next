'use client'

import React, { useEffect, useRef, useState } from 'react'

interface RevealProps {
  children: React.ReactNode
  className?: string
  type?: 'reveal' | 'img-reveal'
  tag?: React.ElementType
  style?: React.CSSProperties
  [key: string]: any
}

export default function Reveal({
  children,
  className = '',
  type = 'reveal',
  tag: Tag = 'div',
  style,
  ...props
}: RevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            io.unobserve(el)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px 10% 0px' }
    )

    io.observe(el)

    // SPA Fallback: if already in viewport on mount, trigger immediately
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      setIsVisible(true)
      io.unobserve(el)
    }

    return () => io.disconnect()
  }, [])

  const combinedClassName = `${className} ${isVisible ? 'is-visible' : ''}`.trim()
  const dataAttr = type === 'reveal' ? { 'data-reveal': '' } : { 'data-img-reveal': '' }

  return (
    <Tag
      ref={ref as any}
      className={combinedClassName}
      style={style}
      {...dataAttr}
      {...props}
    >
      {children}
    </Tag>
  )
}
