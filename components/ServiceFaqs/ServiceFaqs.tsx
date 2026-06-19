'use client'

import React from 'react'
import Reveal from '@/components/ui/Reveal'
import type { Service } from '@/lib/services'
import styles from '@/app/dienstleistungen/[slug]/page.module.css'

interface ServiceFaqsProps {
  service: Service
}

export default function ServiceFaqs({ service }: ServiceFaqsProps) {
  if (!service.faqs || service.faqs.length === 0) return null

  return (
    <Reveal className={styles.faqSection} tag="section">
      <h2 className={styles.sectionTitle}>Häufig gestellte Fragen (FAQ)</h2>
      <div className={styles.faqList}>
        {service.faqs.map((faq, index) => (
          <details key={index} className={styles.faqItem}>
            <summary className={styles.faqQuestion}>
              {faq.question}
              <span className={styles.faqIcon} aria-hidden="true">
                +
              </span>
            </summary>
            <div className={styles.faqAnswer}>
              <p>{faq.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </Reveal>
  )
}
