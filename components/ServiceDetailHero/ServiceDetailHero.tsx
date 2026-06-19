'use client'

import React from 'react'
import Reveal from '@/components/ui/Reveal'
import ScrambleText from '@/components/ui/ScrambleText'
import RevealWords from '@/components/ui/RevealWords'
import Button from '@/components/ui/Button'
import ImageSkeleton from '@/components/ImageSkeleton/ImageSkeleton'
import type { Service } from '@/lib/services'
import styles from '@/app/dienstleistungen/[slug]/page.module.css'

interface ServiceDetailHeroProps {
  service: Service
}

export default function ServiceDetailHero({ service }: ServiceDetailHeroProps) {
  return (
    <>
      {/* Back link */}
      <Reveal className={styles.backNav}>
        <a href="/dienstleistungen" className={styles.back}>
          ← Alle Dienstleistungen
        </a>
      </Reveal>

      {/* Hero */}
      <div className={styles.hero}>
        <Reveal className={styles.heroText}>
          <ScrambleText text={service.chip} className={styles.chip} tag="span" />
          <h1 className={styles.h1}>
            <RevealWords text={service.title} />
          </h1>
          <p className={styles.lead}>{service.heroText}</p>

          <div className={styles.scopeBox}>
            <h2 className={styles.scopeTitle}>Unser Leistungsumfang:</h2>
            <ul className={styles.scopeList}>
              {service.scopeBullets.map((bullet, idx) => (
                <li key={idx} className={styles.scopeItem}>
                  <span className={styles.bulletCheck}>✓</span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.heroActions}>
            <Button href="/#kontakt" variant="primary">
              Jetzt anfragen <span aria-hidden="true">→</span>
            </Button>
          </div>
        </Reveal>

        <Reveal className={styles.heroImg} type="img-reveal">
          <ImageSkeleton src={service.image} alt={service.imageAlt} />
        </Reveal>
      </div>
    </>
  )
}
