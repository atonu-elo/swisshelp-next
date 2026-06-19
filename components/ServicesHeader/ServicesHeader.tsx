'use client'

import React from 'react'
import Reveal from '@/components/ui/Reveal'
import ScrambleText from '@/components/ui/ScrambleText'
import RevealWords from '@/components/ui/RevealWords'
import styles from '@/app/dienstleistungen/page.module.css'

export default function ServicesHeader() {
  return (
    <Reveal className={styles.header}>
      <ScrambleText text="Unsere Leistungen" className={styles.eyebrow} tag="div" />
      <h1 className={styles.h1}>
        <RevealWords text="Dienstleistungen" />
      </h1>
      <p className={styles.lead}>
        Massgeschneiderte Elektrotechnik vom Familienbetrieb. Vom Notfall bis zum
        Smart-Home-Projekt.
      </p>
    </Reveal>
  )
}
