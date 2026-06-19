import type { MetadataRoute } from 'next'
import { services } from '@/lib/services'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://swisshelp.info'
  
  const staticRoutes = [
    '',
    '/ueber-uns',
    '/kontakt',
    '/dienstleistungen',
    '/impressum',
    '/datenschutz',
  ]

  const staticPages = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  const servicePages = services.map((s) => ({
    url: `${baseUrl}/dienstleistungen/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...servicePages]
}
