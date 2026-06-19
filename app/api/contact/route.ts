import { NextResponse } from 'next/server'
import { contactSchema } from '@/lib/contact-schema'

// Simple in-memory rate limiting cache
const rateLimitCache = new Map<string, { count: number; lastReset: number }>()

function checkRateLimit(ip: string, limit = 5, windowMs = 60000): boolean {
  const now = Date.now()
  const record = rateLimitCache.get(ip)

  if (!record) {
    rateLimitCache.set(ip, { count: 1, lastReset: now })
    return true
  }

  // If window has expired, reset the counter
  if (now - record.lastReset > windowMs) {
    record.count = 1
    record.lastReset = now
    return true
  }

  // If over limit, rate limit
  if (record.count >= limit) {
    return false
  }

  record.count++
  return true
}

// Basic input sanitization (strip HTML tags + escape HTML entities)
function sanitizeInput(str: string): string {
  if (!str) return ''
  return str
    .replace(/<[^>]*>/g, '') // Strip standard HTML tags
    .replace(/[&<>"']/g, (match) => {
      switch (match) {
        case '&': return '&amp;'
        case '<': return '&lt;'
        case '>': return '&gt;'
        case '"': return '&quot;'
        case "'": return '&#x27;'
        default: return match
      }
    })
    .trim()
}

export async function POST(request: Request) {
  try {
    // 1. IP-Based Rate Limiting
    const ipHeader = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1'
    const clientIp = ipHeader.split(',')[0].trim()

    if (!checkRateLimit(clientIp, 5, 60000)) {
      return NextResponse.json(
        { error: 'Zu viele Anfragen. Bitte warten Sie eine Minute, bevor Sie es erneut versuchen.' },
        { status: 429 }
      )
    }

    // Parse request JSON
    const body = await request.json()

    // 2. Honeypot Spam Protection
    // If the hidden 'fax_number' input is filled, we assume it's a spam bot.
    // We return a fake 200 OK success response to trick the bot into stopping.
    if (body.fax_number && body.fax_number.trim() !== '') {
      console.warn('Spam detection: honeypot field filled by bot from IP:', clientIp)
      return NextResponse.json({ success: true, message: 'Message processed successfully.' })
    }

    // 3. Zod Server-side Validation
    const validationResult = contactSchema.safeParse(body)
    if (!validationResult.success) {
      const errorMap = validationResult.error.flatten().fieldErrors
      return NextResponse.json(
        { error: 'Validierungsfehler', details: errorMap },
        { status: 400 }
      )
    }

    const validData = validationResult.data

    // 4. Input Sanitization
    const sanitizedData = {
      service: sanitizeInput(validData.service),
      description: sanitizeInput(validData.description),
      timeframe: sanitizeInput(validData.timeframe),
      firstName: sanitizeInput(validData.firstName),
      lastName: sanitizeInput(validData.lastName),
      email: sanitizeInput(validData.email),
      phone: sanitizeInput(validData.phone),
    }

    // Map service slug to friendly German label
    const serviceLabels: Record<string, string> = {
      'elektroinstallationen': 'Elektroinstallationen',
      'service-und-reparatur': 'Service und Reparatur',
      'heizung-und-lueftung': 'Heizung und Lüftung',
      'periodische-kontrollen': 'Periodische Kontrollen',
      'e-mobilitaet-und-ladestationen': 'E-Mobilität und Ladestationen',
      'smart-home': 'Smart Home',
      'schwachstrom-und-netzwerk': 'Schwachstrom und Netzwerk',
    }
    const serviceLabel = serviceLabels[sanitizedData.service] || sanitizedData.service

    // 5. Email Dispatched via Resend API
    const toEmail = process.env.CONTACT_TO_EMAIL
    const fromEmail = process.env.CONTACT_FROM_EMAIL
    const apiKey = process.env.EMAIL_API_KEY

    const emailSubject = `Neue Anfrage von ${sanitizedData.firstName} ${sanitizedData.lastName} - ${serviceLabel}`
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 30px; border-radius: 4px;">
        <h2 style="color: #E11D2A; border-bottom: 2px solid #E11D2A; padding-bottom: 10px; margin-top: 0;">Neue Kontaktanfrage (Website)</h2>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 150px; border-bottom: 1px solid #f5f5f5;">Dienstleistung:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #f5f5f5;">${serviceLabel}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f5f5f5;">Zeitrahmen:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #f5f5f5;">${sanitizedData.timeframe}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f5f5f5;">Kunde:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #f5f5f5;">${sanitizedData.firstName} ${sanitizedData.lastName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f5f5f5;">E-Mail:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #f5f5f5;"><a href="mailto:${sanitizedData.email}" style="color: #E11D2A; text-decoration: none;">${sanitizedData.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f5f5f5;">Telefon:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #f5f5f5;"><a href="tel:${sanitizedData.phone}" style="color: #E11D2A; text-decoration: none;">${sanitizedData.phone}</a></td>
          </tr>
        </table>
        
        <div style="margin-top: 30px;">
          <h3 style="margin-bottom: 10px; color: #0E0E10;">Projektbeschreibung:</h3>
          <div style="background: #f9f9f9; border-left: 4px solid #E11D2A; padding: 15px; border-radius: 2px; white-space: pre-wrap;">${sanitizedData.description}</div>
        </div>
        
        <div style="margin-top: 40px; font-size: 11px; color: #888; border-top: 1px solid #eee; padding-top: 15px; text-align: center;">
          Gesendet über die Website von Swisshelp Elektro. IP-Adresse: ${clientIp}
        </div>
      </div>
    `

    // If API key is missing (e.g. Local Dev Environment), we log to server console and proceed.
    // This allows visual verification of form submission without breaking local testing.
    if (!apiKey || !toEmail || !fromEmail) {
      console.log('--- DEVELOPMENT MODE (Email Logging) ---')
      console.log('To:', toEmail || 'Not Configured (CONTACT_TO_EMAIL)')
      console.log('From:', fromEmail || 'Not Configured (CONTACT_FROM_EMAIL)')
      console.log('Subject:', emailSubject)
      console.log('Email Body HTML:', emailHtml)
      console.log('----------------------------------------')

      return NextResponse.json({ success: true, message: 'Message logged in dev server successfully.' })
    }

    // Call Resend REST API
    const mailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: toEmail,
        subject: emailSubject,
        html: emailHtml,
      }),
    })

    if (!mailResponse.ok) {
      const errorText = await mailResponse.text()
      console.error('Resend Mail API Error Response:', errorText)
      throw new Error(`Email-Dienst Fehler: ${mailResponse.status}`)
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Contact Form Endpoint Exception:', error)
    return NextResponse.json(
      { error: 'Entschuldigung, beim Verarbeiten Ihrer Anfrage ist ein Fehler aufgetreten. Bitte versuchen Sie es telefonisch.' },
      { status: 500 }
    )
  }
}
