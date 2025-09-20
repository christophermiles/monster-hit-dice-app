import React, { Suspense } from 'react'
import FormAndTable from '@/components/FormAndTable'

export default function Main() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col items-stretch gap-8">
        <FormAndTable />
      </div>
    </Suspense>
  )
}
