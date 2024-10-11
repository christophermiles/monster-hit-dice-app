import Form from './components/form'
import Link from 'next/link'
export default function Main() {
return (
    <div className="min-h-screen w-full grid grid-cols-[1rem_1fr_1rem] grid-rows-[1rem_1fr_1rem]">
      <main className="max-w-5xl mx-auto flex flex-col items-stretch gap-8 col-start-2 row-start-2">
          <Form/>
      </main>
      <footer className="col-start-2 row-start-3">
        <Link href="/legal">Legal</Link>
      </footer>
    </div>
  )
}