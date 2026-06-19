'use client'

import { useState } from 'react'
import styles from './ContactForm.module.css'

export default function ContactForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    anliegen: '',
    wann: '',
    note: '',
    name: '',
    phone: '',
    email: '',
    fax_number: '', // Honeypot field
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const getBranch = () => {
    if (formData.anliegen === 'Notfall') return 'emergency'
    if (formData.anliegen === 'Anderes') return 'other'
    return 'time'
  }

  const getTimeQuestion = () => {
    switch (formData.anliegen) {
      case 'Service':
        return 'Wann soll der Service stattfinden?'
      case 'Wallbox':
        return 'Wann soll die Wallbox installiert werden?'
      case 'Smart Home':
        return 'Wann soll das Smart Home umgesetzt werden?'
      case 'NIV-Kontrolle':
        return 'Wann brauchen Sie den Sicherheitsnachweis?'
      default:
        return 'Wann soll es passieren?'
    }
  }

  const handleAnliegenSelect = (val: string) => {
    setFormData(prev => ({ ...prev, anliegen: val }))
    setErrors(prev => ({ ...prev, anliegen: '' }))
    setTimeout(() => {
      setStep(2)
    }, 200)
  }

  const handleTimeframeSelect = (val: string) => {
    setFormData(prev => ({ ...prev, wann: val }))
    setErrors(prev => ({ ...prev, wann: '' }))
    setTimeout(() => {
      setStep(3)
    }, 200)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (currentStep === 1) {
      if (!formData.anliegen) {
        newErrors.anliegen = 'Bitte wählen Sie eine Option.'
      }
    } else if (currentStep === 2) {
      const branch = getBranch()
      if (branch === 'time' && !formData.wann) {
        newErrors.wann = 'Bitte wählen Sie einen Zeitrahmen.'
      }
      if (branch === 'other' && (!formData.note || formData.note.trim().length < 10)) {
        newErrors.note = 'Bitte beschreiben Sie Ihr Anliegen mit mindestens 10 Zeichen.'
      }
    } else if (currentStep === 3) {
      if (!formData.name.trim()) {
        newErrors.name = 'Bitte geben Sie Ihren Namen ein.'
      }
      if (!formData.phone.trim() || formData.phone.trim().length < 6) {
        newErrors.phone = 'Bitte geben Sie eine gültige Telefonnummer an.'
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
      setErrors({})
      setSubmitError('')
    }
  }

  const mapAnliegenToService = (anliegen: string): string => {
    switch (anliegen) {
      case 'Notfall':
      case 'Service':
        return 'service-und-reparatur'
      case 'Wallbox':
        return 'e-mobilitaet-und-ladestationen'
      case 'Smart Home':
        return 'smart-home'
      case 'NIV-Kontrolle':
        return 'periodische-kontrollen'
      case 'Anderes':
      default:
        return 'elektroinstallationen'
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep(3)) return

    setIsSubmitting(true)
    setSubmitError('')

    // Transform payload for server side schemas
    const service = mapAnliegenToService(formData.anliegen)
    
    // Split name
    const nameVal = formData.name.trim()
    const firstSpaceIdx = nameVal.indexOf(' ')
    let firstName = ''
    let lastName = ''
    if (firstSpaceIdx === -1) {
      firstName = nameVal
      lastName = nameVal
    } else {
      firstName = nameVal.slice(0, firstSpaceIdx).trim()
      lastName = nameVal.slice(firstSpaceIdx).trim()
    }
    if (firstName.length < 2) firstName = firstName + '  '
    if (lastName.length < 2) lastName = lastName + '  '

    // Timeframe mapping
    let timeframe = ''
    const branch = getBranch()
    if (branch === 'emergency') {
      timeframe = 'Sofort (Notfall / Pikett)'
    } else {
      timeframe = formData.wann || 'Anderes / Flexibel'
    }

    // Description auto-completion to pass Zod schema min length of 10
    let description = formData.note.trim()
    if (branch === 'emergency') {
      if (description.length < 10) {
        description = `Akuter Notfall: ${description || 'Sofort-Einsatz benötigt (telefonischer Kontakt bevorzugt)'}`
      }
    } else if (branch === 'other') {
      if (description.length < 10) {
        description = `Anderes Anliegen: ${description || 'Bitte um Kontaktaufnahme bzgl. Projekt / Offerte'}`
      }
    } else {
      // time branch
      if (description.length < 10) {
        description = `Anfrage für ${formData.anliegen} - Zeitrahmen: ${formData.wann}. ` + (description ? `Zusatzinfo: ${description}` : '')
      }
    }

    const payload = {
      service,
      description,
      timeframe,
      firstName,
      lastName,
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      fax_number: formData.fax_number,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Serverfehler beim Senden.')
      }

      setSubmitSuccess(true)
    } catch (err: any) {
      console.error('Submit contact form error:', err)
      setSubmitError(err.message || 'Das Formular konnte leider nicht gesendet werden. Bitte rufen Sie uns direkt an.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className={styles.funnel}>
        <div className={styles['funnel-done']} style={{ display: 'flex' }}>
          <div className={styles['funnel-done-check']}>OK</div>
          <h3>Anfrage ist bei uns.</h3>
          <p>
            Wir melden uns unter der angegebenen Nummer. Bei akutem Notfall rufen Sie direkt an: <strong>044 540 08 35</strong>.
          </p>
        </div>
      </div>
    )
  }

  const branch = getBranch()

  return (
    <form className={styles.funnel} onSubmit={handleSubmit}>
      {/* ── Stepper Header ───────────────────────────────────── */}
      <div className={styles['funnel-head']}>
        <h3>Online-Anfrage</h3>
        <div className={styles['funnel-progress']}>
          <span className={`${styles['funnel-dot']} ${step >= 1 ? styles.active : ''}`} />
          <span className={`${styles['funnel-dot']} ${step >= 2 ? styles.active : ''}`} />
          <span className={`${styles['funnel-dot']} ${step >= 3 ? styles.active : ''}`} />
        </div>
      </div>

      <div className={styles['funnel-stage']}>
        {/* ── Step 1: Anliegen ────────────────────────── */}
        <div className={`${styles['funnel-step']} ${step === 1 ? styles.active : ''}`}>
          <div className={styles['funnel-label']}>Schritt 1 von 3</div>
          <div className={styles['funnel-question']}>Um was geht es?</div>
          <div className={styles['funnel-options']}>
            <button
              type="button"
              className={`${styles['funnel-option']} ${formData.anliegen === 'Notfall' ? styles.selected : ''}`}
              onClick={() => handleAnliegenSelect('Notfall')}
            >
              Notfall<small>Sofort-Einsatz nötig</small>
            </button>
            <button
              type="button"
              className={`${styles['funnel-option']} ${formData.anliegen === 'Service' ? styles.selected : ''}`}
              onClick={() => handleAnliegenSelect('Service')}
            >
              Service<small>Defekt, Reparatur</small>
            </button>
            <button
              type="button"
              className={`${styles['funnel-option']} ${formData.anliegen === 'Wallbox' ? styles.selected : ''}`}
              onClick={() => handleAnliegenSelect('Wallbox')}
            >
              Wallbox<small>Ladestation E-Auto</small>
            </button>
            <button
              type="button"
              className={`${styles['funnel-option']} ${formData.anliegen === 'Smart Home' ? styles.selected : ''}`}
              onClick={() => handleAnliegenSelect('Smart Home')}
            >
              Smart Home<small>KNX oder LOXONE</small>
            </button>
            <button
              type="button"
              className={`${styles['funnel-option']} ${formData.anliegen === 'NIV-Kontrolle' ? styles.selected : ''}`}
              onClick={() => handleAnliegenSelect('NIV-Kontrolle')}
            >
              Periodische Kontrollen<small>Sicherheitsnachweis</small>
            </button>
            <button
              type="button"
              className={`${styles['funnel-option']} ${formData.anliegen === 'Anderes' ? styles.selected : ''}`}
              onClick={() => handleAnliegenSelect('Anderes')}
            >
              Anderes<small>Projekt, Offerte</small>
            </button>
          </div>
          {errors.anliegen && <span className={styles.errorText}>{errors.anliegen}</span>}
        </div>

        {/* ── Step 2: Time branch ─────────────────────── */}
        {branch === 'time' && (
          <div className={`${styles['funnel-step']} ${step === 2 ? styles.active : ''}`}>
            <div className={styles['funnel-label']}>Schritt 2 von 3</div>
            <div className={styles['funnel-question']}>{getTimeQuestion()}</div>
            <div className={styles['funnel-options']}>
              <button
                type="button"
                className={`${styles['funnel-option']} ${formData.wann === 'So schnell wie möglich' ? styles.selected : ''}`}
                onClick={() => handleTimeframeSelect('So schnell wie möglich')}
              >
                So schnell wie möglich<small>Innerhalb weniger Tage</small>
              </button>
              <button
                type="button"
                className={`${styles['funnel-option']} ${formData.wann === 'Innerhalb 1 Monat' ? styles.selected : ''}`}
                onClick={() => handleTimeframeSelect('Innerhalb 1 Monat')}
              >
                Innerhalb 1 Monat<small>Planbar</small>
              </button>
              <button
                type="button"
                className={`${styles['funnel-option']} ${formData.wann === 'Später dieses Jahr' ? styles.selected : ''}`}
                onClick={() => handleTimeframeSelect('Später dieses Jahr')}
              >
                Später dieses Jahr<small>Projekt-Vorbereitung</small>
              </button>
              <button
                type="button"
                className={`${styles['funnel-option']} ${formData.wann === 'Noch unklar' ? styles.selected : ''}`}
                onClick={() => handleTimeframeSelect('Noch unklar')}
              >
                Noch unklar<small>Erstberatung</small>
              </button>
            </div>
            {errors.wann && <span className={styles.errorText}>{errors.wann}</span>}
          </div>
        )}

        {/* ── Step 2: Emergency branch ────────────────── */}
        {branch === 'emergency' && (
          <div className={`${styles['funnel-step']} ${step === 2 ? styles.active : ''}`}>
            <div className={styles['funnel-label']}>Notfall erkannt</div>
            <div className={styles['funnel-question']}>Für akute Notfälle: direkt anrufen.</div>
            <a href="tel:+41445400835" className={styles['funnel-emergency-btn']}>
              <span className={styles['big-cta-phone-icon']}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <span className={styles['big-cta-phone-text']}>
                <small>24/7 Notdienst</small>
                <strong>+41 44 540 08 35</strong>
              </span>
            </a>
            <p className={styles['funnel-hint']}>
              Oder beschreiben Sie uns kurz, was passiert ist. Wir rufen binnen 60 Minuten zurück.
            </p>
            <div className={styles['funnel-field']}>
              <label htmlFor="note">Was ist passiert?</label>
              <textarea
                id="note"
                name="note"
                rows={3}
                placeholder="Sicherung löst aus, kein Strom, FI hält nicht..."
                value={formData.note}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        {/* ── Step 2: Other branch ────────────────────── */}
        {branch === 'other' && (
          <div className={`${styles['funnel-step']} ${step === 2 ? styles.active : ''}`}>
            <div className={styles['funnel-label']}>Schritt 2 von 3</div>
            <div className={styles['funnel-question']}>Was möchten Sie genau?</div>
            <div className={styles['funnel-field']}>
              <label htmlFor="note">Beschreibung *</label>
              <textarea
                id="note"
                name="note"
                rows={4}
                placeholder="Projekt, Offerte, Frage..."
                className={errors.note ? styles.inputError : ''}
                value={formData.note}
                onChange={handleChange}
              />
              {errors.note && <span className={styles.errorText}>{errors.note}</span>}
            </div>
            <div className={styles['funnel-field']}>
              <label htmlFor="wann">Zeitrahmen (optional)</label>
              <input
                type="text"
                id="wann"
                name="wann"
                placeholder="z.B. nächsten Monat"
                value={formData.wann}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        {/* ── Step 3: Kontakt ──────────────────────────── */}
        <div className={`${styles['funnel-step']} ${step === 3 ? styles.active : ''}`}>
          <div className={styles['funnel-label']}>Schritt 3 von 3</div>
          <div className={styles['funnel-question']}>Ihre Kontaktdaten</div>
          <div className={styles['funnel-fields']}>
            <div className={styles['funnel-field']}>
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                className={errors.name ? styles.inputError : ''}
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && <span className={styles.errorText}>{errors.name}</span>}
            </div>

            <div className={styles['funnel-field']}>
              <label htmlFor="email">E-Mail-Adresse *</label>
              <input
                type="email"
                id="email"
                name="email"
                className={errors.email ? styles.inputError : ''}
                placeholder="ihre.adresse@domain.ch"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>

            <div className={styles['funnel-field']}>
              <label htmlFor="phone">Telefon *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className={errors.phone ? styles.inputError : ''}
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
            </div>

            {/* Render additional note only if time-branch (others had note in Step 2) */}
            {branch === 'time' && (
              <div className={styles['funnel-field']}>
                <label htmlFor="note">Kurze Beschreibung (optional)</label>
                <textarea
                  id="note"
                  name="note"
                  rows={3}
                  placeholder="Zusätzliche Infos?"
                  value={formData.note}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Honeypot field (hidden from browser view) */}
      <div style={{ display: 'none', position: 'absolute', opacity: 0, zIndex: -100 }} aria-hidden="true">
        <label htmlFor="fax_number">Fax-Nummer (Bitte freilassen)</label>
        <input
          type="text"
          id="fax_number"
          name="fax_number"
          value={formData.fax_number}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {submitError && <span className={styles.submitErrorText}>{submitError}</span>}

      {/* ── Form Actions / Stepper Nav ──────────────────────── */}
      <div className={styles['funnel-nav']}>
        <button
          type="button"
          className={styles['funnel-back']}
          onClick={handleBack}
          disabled={step === 1 || isSubmitting}
        >
          Zurück
        </button>
        {step < 3 ? (
          <button
            type="button"
            className={styles['funnel-next']}
            onClick={handleNext}
          >
            Weiter
          </button>
        ) : (
          <button
            type="submit"
            className={styles['funnel-submit']}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Wird gesendet...' : 'Anfrage senden'}
          </button>
        )}
      </div>
    </form>
  )
}
