import type { DateStringObject } from '@/lib/types'

export default function formatDateModified(
  dateStringObject: DateStringObject,
  locale?: string,
) {
  const date = new Date(
    `${dateStringObject.year}-${dateStringObject.month}-${dateStringObject.day}`,
  )

  return new Intl.DateTimeFormat(locale || navigator.language || 'en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}
