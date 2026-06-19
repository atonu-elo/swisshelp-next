'use client'

import React from 'react'
import Reveal from '@/components/ui/Reveal'
import type { Service } from '@/lib/services'
import styles from '@/app/dienstleistungen/[slug]/page.module.css'

interface ServiceRelatedProps {
  related: Service[]
}

export default function ServiceRelated({ related }: ServiceRelatedProps) {
  if (!related || related.length === 0) return null

  return (
    <section className={styles.relatedSection}>
      <Reveal className={styles.sectionTitle} tag="h2">
        Weitere Dienstleistungen
      </Reveal>
      <div className={styles.relatedGrid}>
        {related.map((rel, index) => (
          <Reveal
            key={rel.slug}
            tag="a"
            href={`/dienstleistungen/${rel.slug}`}
            className={styles.relatedCard}
            style={{ transitionDelay: `${index * 80}ms` }}
          >
            <span className={styles.relatedChip}>{rel.chip}</span>
            <h3 className={styles.relatedCardTitle}>{rel.title}</h3>
            <p className={styles.relatedCardDesc}>{rel.description}</p>
            <span className={styles.relatedLink} data-scramble="">
              Mehr erfahren <span className={styles.arrow} aria-hidden="true" />
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
