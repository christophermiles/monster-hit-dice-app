import Form from './form'
import Link from 'next/link'
export default function CalculateHitDice() {
return (
    <div className="min-h-screen grid grid-cols-[20px_1fr_20px] grid-rows-[20px_1fr_20px] gap-4">
      <main className="flex flex-col gap-8 col-start-2 row-start-2">
          <Form/>
      </main>
      <footer className="col-start-2 row-start-3">
        <Link href="/legal">Legal</Link>
      </footer>
    </div>
  )
}
