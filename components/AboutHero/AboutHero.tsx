'use client'

import React from 'react'
import Reveal from '@/components/ui/Reveal'
import ScrambleText from '@/components/ui/ScrambleText'
import styles from '@/app/ueber-uns/page.module.css'

export default function AboutHero() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroBg}>
        <img
          src="/images/_AMA8251.jpg"
          alt="Swisshelp Service-Fahrzeug"
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />
      </div>
      <Reveal className={styles.heroContentContainer}>
        <div className={styles.heroContent}>
          <ScrambleText text="Über uns" className={styles.eyebrow} tag="div" />
          <h1 className={styles.h1}>Familienbetrieb mit Wurzeln seit 1990.</h1>
          <p className={styles.lead}>
            Swisshelp Elektro ist ein familiengeführtes Unternehmen aus Weiningen ZH. Wir planen und realisieren Elektroinstallationen in der Region Zürich, im Limmattal und im Aargau.
          </p>

          <h2 className={styles.h2}>Was ist Swisshelp Elektro?</h2>
          <p className={styles.lead}>
            Swisshelp Elektro ist ein Schweizer Fachbetrieb für Elektroinstallationen und Gebäudetechnik. Unsere Kunden erhalten persönliche Betreuung und eine saubere, zuverlässige Ausführung aus einer Hand.
          </p>

          <h2 className={styles.h2}>Unternehmensgeschichte</h2>
          <p className={styles.lead}>
            Das Unternehmen wurde von Christoph Trachsel gegründet und ist seit 1990 als Familienbetrieb tätig. Seit 2020 firmieren wir als Swisshelp Elektro GmbH.
          </p>

          <h2 className={styles.h2}>Technische Herkunft und Erfahrung</h2>
          <p className={styles.lead}>
            Bereits in frühen Jahren arbeiteten wir an anspruchsvollen Infrastrukturprojekten. Dazu gehörten erste Netzwerksysteme am Flughafen Zürich (Kloten), an der ETH Zürich sowie Telekommunikationslösungen für Banken und Finanzinstitute.
          </p>

          <h2 className={styles.h2}>Führung heute</h2>
          <p className={styles.lead}>
            Christoph Trachsel prägt Swisshelp bis heute als Gründer und operative Leitfigur. Seit 2024 ist mit Dominic Trachsel die zweite Generation im Unternehmen aktiv und verantwortet Service sowie Projektabwicklung.
          </p>

          <h2 className={styles.h2}>Werte und Zusammenarbeit</h2>
          <p className={styles.lead}>
            Unser Anspruch bleibt konstant: Qualität vor Quantität, klare Kommunikation und ein fester Ansprechpartner vom ersten Gespräch bis zur fertigen Installation.
          </p>

          <h2 className={styles.h2}>Vertrauen durch Kontinuität</h2>
          <p className={styles.lead}>
            Die Kombination aus langjähriger Praxis, technischer Tiefe und familiärer Verantwortung macht Swisshelp Elektro zu einem verlässlichen Partner für nachhaltige Lösungen in Elektroinstallationen und Gebäudetechnik.
          </p>
        </div>
      </Reveal>
    </section>
  )
}
