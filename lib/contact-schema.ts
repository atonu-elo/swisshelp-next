import { z } from 'zod'

export const contactSchema = z.object({
  service: z.enum([
    'elektroinstallationen',
    'service-und-reparatur',
    'heizung-und-lueftung',
    'periodische-kontrollen',
    'e-mobilitaet-und-ladestationen',
    'smart-home',
    'schwachstrom-und-netzwerk'
  ], {
    message: 'Bitte wählen Sie eine gültige Dienstleistung.'
  }),
  description: z.string().min(10, {
    message: 'Bitte beschreiben Sie Ihr Anliegen etwas genauer (mind. 10 Zeichen).'
  }).max(2000, {
    message: 'Die Beschreibung darf maximal 2000 Zeichen lang sein.'
  }),
  timeframe: z.string().min(1, {
    message: 'Bitte wählen Sie einen Zeitrahmen.'
  }),
  firstName: z.string().min(2, {
    message: 'Vorname muss mindestens 2 Zeichen lang sein.'
  }).max(50, {
    message: 'Vorname darf maximal 50 Zeichen lang sein.'
  }),
  lastName: z.string().min(2, {
    message: 'Nachname muss mindestens 2 Zeichen lang sein.'
  }).max(50, {
    message: 'Nachname darf maximal 50 Zeichen lang sein.'
  }),
  email: z.string().email({
    message: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.'
  }),
  phone: z.string().min(6, {
    message: 'Bitte geben Sie eine gültige Telefonnummer an.'
  }).max(20, {
    message: 'Telefonnummer darf maximal 20 Stellen lang sein.'
  }),
  fax_number: z.string().optional() // Honeypot field - must be empty
})

export type ContactFormData = z.infer<typeof contactSchema>
