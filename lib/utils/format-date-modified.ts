import type { DateStringObject } from '@/lib/types'

export default function formatDateModified(
  dateStringObject: DateStringObject,
  locale?: string,
) {
  const date = new Date(
    `${dateStringObject.year}-${dateStringObject.month}-${dateStringObject.day}`,
  )

  const resolvedLocale =
    locale || (typeof navigator !== 'undefined' ? navigator.language : 'en-AU')

  return new Intl.DateTimeFormat(
    resolvedLocale || navigator.language || 'en-AU',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
  ).format(date)
}
