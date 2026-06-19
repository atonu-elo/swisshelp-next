'use client'

import React from 'react'
import Reveal from '@/components/ui/Reveal'
import ScrambleText from '@/components/ui/ScrambleText'
import ImageSkeleton from '@/components/ImageSkeleton/ImageSkeleton'
import styles from '@/app/ueber-uns/page.module.css'

const TEAM_MEMBERS = [
  {
    name: 'Christoph Trachsel',
    role: 'Geschäftsführung',
    image: '/images/_AMA7642.jpg',
    qual: 'Gründer der Swisshelp Elektro GmbH. Langjährig tätig bei Finanzinstituten, am Flughafen Zürich und im Infrastrukturbereich. Führt Swisshelp Elektro aus Weiningen ZH.',
  },
  {
    name: 'Administration',
    role: 'Kundenbetreuung & Disposition',
    image: '/images/_AMA7938.jpg',
    qual: 'Koordiniert Anfragen, Termine und die Rechnungsstellung. Oft die erste Stimme am Telefon, wenn Sie bei Swisshelp anrufen.',
  },
  {
    name: 'Mehmet Kaya',
    role: 'Sicherheitsexperte',
    image: '/images/_AMA8120.jpg',
    qual: 'Leiter Qualitätsmanagement und Projekte, eidg. dipl. Elektroinstallations- und Sicherheitsexperte. Verantwortlich für periodische Kontrollen, Sicherheitsnachweise und die fachtechnische Aufsicht.',
  },
  {
    name: 'Dominic Trachsel',
    role: 'Projektleitung Service',
    image: '/images/_AMA8034.jpg',
    qual: 'Koordiniert das Tagesgeschäft, Servicetermine und den Notdienst. Seit 2024 im Betrieb, zweite Generation Trachsel in der Firma.',
  },
  {
    name: 'Dennis Trachsel',
    role: 'Service & Montage',
    image: '/images/dennis-trachsel.webp',
    qual: 'Zweiter Sohn von Christoph Trachsel. Unterstützt Service- und Montageeinsätze im Familienbetrieb und ist fester Teil des Swisshelp-Teams.',
  },
]

export default function TeamSection() {
  return (
    <section className={styles.teamSection} id="team">
      <Reveal className={styles.teamHeader}>
        <ScrambleText text="Die Menschen hinter Swisshelp" className={styles.eyebrow} tag="div" />
        <h2 className={styles.h2}>Unser Team.</h2>
      </Reveal>
      <div className={styles.teamGrid}>
        {TEAM_MEMBERS.map((member, index) => (
          <Reveal
            key={index}
            tag="article"
            className={styles.teamCard}
            style={{ transitionDelay: `${index * 80}ms` }}
          >
            <div className={styles.teamCardImg}>
              <ImageSkeleton src={member.image} alt={`${member.name}, ${member.role}`} />
            </div>
            <div className={styles.teamCardBody}>
              <div className={styles.teamCardName}>{member.name}</div>
              <div className={styles.teamCardRole}>{member.role}</div>
              <p className={styles.teamCardQual}>{member.qual}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
