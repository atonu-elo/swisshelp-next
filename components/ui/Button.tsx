/**
 * components/ui/Button.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Reusable button / anchor component matching homepage CI.
 *
 * Variants:
 *   primary  — solid red fill (default)
 *   outline  — dark outline, red fill on hover (pixel-sweep animation)
 *   outlineLight — light outline for dark backgrounds (homepage-style)
 *   ghost    — transparent, white text
 *
 * Usage:
 *   <Button href="tel:+41445400835">Anrufen</Button>
 *   <Button href="/kontakt" variant="outline">Kontakt</Button>
 *   <Button onClick={fn} variant="ghost">Mehr</Button>
 */

import Link from 'next/link'
import styles from './Button.module.css'

type Variant = 'primary' | 'outline' | 'outlineLight' | 'ghost'
type Size    = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: Variant
  size?: Size
  className?: string
  external?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  'aria-label'?: string
}

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  external = false,
  disabled,
  type = 'button',
  'aria-label': ariaLabel,
}: ButtonProps) {
  const cls = [
    styles.btn,
    styles[variant],
    styles[size],
    className,
  ].filter(Boolean).join(' ')

  if (href) {
    const isExternal = external || href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')
    return (
      <Link
        href={href}
        className={cls}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        aria-label={ariaLabel}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      className={cls}
      onClick={onClick}
      disabled={disabled}
      type={type}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
