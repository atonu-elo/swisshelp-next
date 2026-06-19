'use client'

import React from 'react'
import Reveal from '@/components/ui/Reveal'
import ScrambleText from '@/components/ui/ScrambleText'
import styles from '@/app/kontakt/page.module.css'

export default function ContactHero() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroBg}>
        <img
          src="/images/_AMA8400.jpg"
          alt="Swisshelp Firmenwagen"
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />
      </div>
      <Reveal className={styles.heroContentContainer}>
        <div className={styles.heroContent}>
          <ScrambleText text="Ihr Kontakt" className={styles.eyebrow} tag="div" />
          <h1 className={styles.h1}>Sprechen wir über Ihr Projekt.</h1>
          <p className={styles.lead}>
            Rufen Sie an. Während der Bürozeit nimmt ein Techniker direkt ab.
            Ausserhalb erhalten Sie innert 60 Minuten einen Rückruf.
          </p>
        </div>
      </Reveal>
    </section>
  )
}
