import { DateStringObject } from '@/lib/types'

export default function getDateModifiedJsonLd(
  dateStringObject: DateStringObject,
) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    dateModified: `${dateStringObject.year}-${dateStringObject.month}-${dateStringObject.day}`,
  }

  return {
    'application/ld+json': JSON.stringify(jsonLd),
  }
}
