import formatDateModified from '@/lib/utils/format-date-modified'
import type { DateStringObject } from '@/lib/types'
import React from 'react'

type Props = { dateStringObject: DateStringObject }

const DateModified: React.FC<Props> = ({ dateStringObject }) => {
  return (
    <p>
      <small>
        Last updated{' '}
        <time
          dateTime={`${dateStringObject.year}-${dateStringObject.month}-${dateStringObject.day}`}
        >
          {formatDateModified(dateStringObject)}
        </time>
      </small>
    </p>
  )
}

export default DateModified
