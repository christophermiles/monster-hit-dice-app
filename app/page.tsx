import FormAndTable from '@/components/FormAndTable'
import type { Metadata } from 'next'
import { generateTitle } from '@/lib/utils/title'

type PageProps = {
  searchParams: { hd?: string; monster?: string }
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const hd =
    typeof searchParams.hd === 'string'
      ? decodeURIComponent(searchParams.hd)
      : ''
  const monster =
    typeof searchParams.monster === 'string'
      ? decodeURIComponent(searchParams.monster)
      : ''

  if (!hd) {
    return {
      title: '',
    }
  }

  return { title: generateTitle(monster ? [`${monster} (${hd})`] : [hd]) }
}

export default function Main() {
  return (
    <div className="flex flex-col items-stretch gap-8">
      <FormAndTable />
    </div>
  )
}
