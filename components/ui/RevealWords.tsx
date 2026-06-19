'use client'

import React from 'react'

interface RevealWordsProps {
  text: string
}

export default function RevealWords({ text }: RevealWordsProps) {
  if (!text) return null

  // Split text by whitespace, preserving whitespace tokens
  const tokens = text.split(/(\s+)/)
  let wordIndex = 0

  return (
    <>
      {tokens.map((token, idx) => {
        if (!token) return null
        if (/^\s+$/.test(token)) {
          // Return whitespace directly
          return <React.Fragment key={idx}>{token}</React.Fragment>
        } else {
          const currentIndex = wordIndex
          wordIndex++
          return (
            <span
              key={idx}
              className="word"
              style={{ '--wi': currentIndex } as React.CSSProperties}
            >
              <span className="word-inner">{token}</span>
            </span>
          )
        }
      })}
    </>
  )
}
