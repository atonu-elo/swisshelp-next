'use client'

import React from 'react'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import styles from '@/app/dienstleistungen/[slug]/page.module.css'

export default function ServiceCtaBanner() {
  return (
    <Reveal className={styles.ctaBanner} tag="section">
      <div className={styles.ctaBannerContent}>
        <h2 className={styles.ctaBannerTitle}>
          Haben Sie Fragen oder ein konkretes Anliegen?
        </h2>
        <p className={styles.ctaBannerDesc}>
          Nehmen Sie direkt Kontakt mit uns auf. Wir beraten Sie gerne kompetent und
          unverbindlich.
        </p>
        <div className={styles.ctaActions}>
          <Button href="tel:+41445400835" variant="primary">
            044 540 08 35 anrufen
          </Button>
          <Button href="/kontakt" variant="outlineLight">
            Termin anfragen
          </Button>
        </div>
      </div>
    </Reveal>
  )
}
