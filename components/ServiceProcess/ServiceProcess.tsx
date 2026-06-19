'use client'

import React from 'react'
import Reveal from '@/components/ui/Reveal'
import type { Service } from '@/lib/services'
import styles from '@/app/dienstleistungen/[slug]/page.module.css'

interface ServiceProcessProps {
  service: Service
}

export default function ServiceProcess({ service }: ServiceProcessProps) {
  if (!service.processSteps || service.processSteps.length === 0) return null

  return (
    <Reveal className={styles.processSection} tag="section">
      <h2 className={styles.sectionTitle}>Arbeitsablauf: So gehen wir vor</h2>
      <div className={styles.processGrid}>
        {service.processSteps.map((step, idx) => (
          <div key={idx} className={styles.processCard}>
            <div className={styles.processNum}>0{idx + 1}</div>
            <h3 className={styles.processStepTitle}>{step.title}</h3>
            <p className={styles.processStepDesc}>{step.description}</p>
          </div>
        ))}
      </div>
    </Reveal>
  )
}
