import { Metadata } from 'next'
import getDateModifiedJsonLd from '@/lib/utils/get-date-modified-json-ld'
import DateModified from '@/components/DateModified'
import { DateStringObject } from '@/lib/types'

const LAST_UPDATED: DateStringObject = {
  year: '2025',
  month: '09',
  day: '21',
}

export function generateMetadata(): Metadata {
  return {
    title: 'Roadmap',
    other: {
      ...getDateModifiedJsonLd(LAST_UPDATED),
    },
  }
}

export default function Roadmap() {
  return (
    <>
      <h1>Roadmap</h1>

      <p>In no particular order:</p>

      <ul>
        <li>Add support for dark theme</li>
        <li>
          Separate inputs for Hit Die number, Hit Die type and modifier with
          input mode hints on touch devices for easier entering of Hit Dice on
          touch keyboards
        </li>
        <li>Result history synced to local storage</li>
      </ul>

      <footer>
        <DateModified dateStringObject={LAST_UPDATED} />
      </footer>
    </>
  )
}
