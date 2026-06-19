'use client'

import React from 'react'
import Reveal from '@/components/ui/Reveal'
import ImageSkeleton from '@/components/ImageSkeleton/ImageSkeleton'
import { services } from '@/lib/services'
import styles from '@/app/dienstleistungen/page.module.css'

export default function ServicesGrid() {
  return (
    <div className={styles.grid}>
      {services.map((service, index) => (
        <Reveal
          key={service.slug}
          tag="article"
          className={styles.card}
          style={{ transitionDelay: `${index * 70}ms` }}
        >
          <div className={styles.cardImg}>
            <ImageSkeleton src={service.image} alt={service.imageAlt} />
          </div>
          <div className={styles.cardBody}>
            <span className={styles.chip}>{service.chip}</span>
            <h2 className={styles.cardTitle}>{service.title}</h2>
            <p className={service.description}>{service.description}</p>
            <a
              href={`/dienstleistungen/${service.slug}`}
              className={styles.cardLink}
              data-scramble
            >
              Mehr erfahren <span className={styles.arrow} aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
