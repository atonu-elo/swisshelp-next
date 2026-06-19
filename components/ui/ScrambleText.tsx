'use client'

import React, { useEffect, useState, useRef } from 'react'

interface ScrambleTextProps {
  text: string
  className?: string
  tag?: React.ElementType
  delay?: number
}

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

export default function ScrambleText({
  text,
  className = '',
  tag: Tag = 'div',
  delay = 0,
}: ScrambleTextProps) {
  const [displayedText, setDisplayedText] = useState(text)
  const [isVisible, setIsVisible] = useState(false)
  const [isReduced, setIsReduced] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return

    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateReduced = () => setIsReduced(media.matches)

    updateReduced()
    media.addEventListener('change', updateReduced)
    return () => media.removeEventListener('change', updateReduced)
  }, [])

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
      { threshold: 0.05 }
    )

    io.observe(el)

    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      setIsVisible(true)
      io.unobserve(el)
    }

    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return
    hasAnimated.current = true

    if (isReduced) {
      return
    }

    let start = Date.now()
    const duration = 1100
    let intervalId: ReturnType<typeof setInterval> | null = null

    const timer = setTimeout(() => {
      start = Date.now()
      intervalId = setInterval(() => {
        const elapsed = Date.now() - start
        const progress = Math.min(elapsed / duration, 1)
        const revealLen = Math.floor(text.length * progress)

        const nextText = text
          .split('')
          .map((ch, i) => {
            if (i < revealLen) return text[i]
            if (/[^A-Za-z0-9]/.test(ch)) return ch
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
          })
          .join('')

        setDisplayedText(nextText)

        if (progress >= 1) {
          if (intervalId !== null) {
            clearInterval(intervalId)
            intervalId = null
          }
          setDisplayedText(text)
        }
      }, 70)
    }, delay)

    return () => {
      clearTimeout(timer)
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isVisible, text, delay, isReduced])

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={`${className} ${isVisible ? 'is-visible' : ''}`.trim()}
      data-chars=""
    >
      {isReduced ? text : displayedText}
    </Tag>
  )
}
