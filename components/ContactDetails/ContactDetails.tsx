'use client'

import React from 'react'
import Reveal from '@/components/ui/Reveal'
import ContactForm from '@/components/ContactForm/ContactForm'
import styles from '@/app/kontakt/page.module.css'

export default function ContactDetails() {
  return (
    <Reveal className={styles.contactGrid}>
      <div className={styles.contactInfo}>
        <h2 className={styles.h2}>Swisshelp Elektro GmbH</h2>
        <address className={styles.address}>
          Grossächerweg 4
          <br />
          8104 Weiningen ZH
          <br />
          <br />
          <strong>Telefon:</strong> <a href="tel:+41445400835">+41 44 540 08 35</a>
          <br />
          <strong>E-Mail:</strong>{' '}
          <a href="mailto:ch.trachsel@swisshelp.info">ch.trachsel@swisshelp.info</a>
          <br />
          <br />
          <strong>Bürozeiten:</strong> Mo–Fr 07:30–17:30
          <br />
          <span style={{ color: '#E11D2A', fontWeight: 'bold' }}>
            Notdienst 7×24 Pikett
          </span>
        </address>
      </div>
      <div className={styles.contactForm}>
        <ContactForm />
      </div>
    </Reveal>
  )
}
