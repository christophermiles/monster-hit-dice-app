import FormAndTable from '@/components/FormAndTable'
import Link from 'next/link'
export default function Main() {
  return (
    <div className="main-layout min-h-screen grid-rows-[1rem_1fr_1rem]">
      <main className="main-layout-content px-4 flex flex-col items-stretch gap-8 row-start-2">
        <FormAndTable />
      </main>
      <footer className="col-start-2 row-start-3">
        <Link href="/legal">Legal</Link>
      </footer>
    </div>
  )
}
