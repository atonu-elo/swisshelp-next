'use client'

import React from 'react'
import Reveal from '@/components/ui/Reveal'
import ImageSkeleton from '@/components/ImageSkeleton/ImageSkeleton'
import type { Service } from '@/lib/services'
import styles from '@/app/dienstleistungen/[slug]/page.module.css'

interface ServiceContentBlocksProps {
  service: Service
}

export default function ServiceContentBlocks({ service }: ServiceContentBlocksProps) {
  return (
    <div className={styles.blocks}>
      {service.contentBlocks.map((block, index) => {
        switch (block.type) {
          case 'text':
            return (
              <Reveal key={index} className={styles.blockText} tag="section">
                {block.title && <h2 className={styles.blockTitle}>{block.title}</h2>}
                <p className={styles.blockParagraph}>{block.text}</p>
              </Reveal>
            )
          case 'split':
            return (
              <Reveal
                key={index}
                tag="section"
                className={`${styles.blockSplit} ${
                  block.imagePosition === 'left' ? styles.splitLeft : ''
                }`}
              >
                <div className={styles.splitContent}>
                  {block.title && <h2 className={styles.blockTitle}>{block.title}</h2>}
                  <p className={styles.blockParagraph}>{block.text}</p>
                </div>
                <Reveal className={styles.splitImg} type="img-reveal">
                  <ImageSkeleton src={block.image} alt={block.imageAlt} loading="lazy" />
                </Reveal>
              </Reveal>
            )
          case 'features':
            return (
              <Reveal key={index} className={styles.blockFeatures} tag="section">
                {block.title && <h2 className={styles.blockTitle}>{block.title}</h2>}
                <div className={styles.featuresGrid}>
                  {block.features.map((feat, fIdx) => (
                    <div key={fIdx} className={styles.featureCard}>
                      <h3 className={styles.featureName}>{feat.title}</h3>
                      <p className={styles.featureDesc}>{feat.description}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
