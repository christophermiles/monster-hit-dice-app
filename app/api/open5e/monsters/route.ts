import { NextRequest, NextResponse } from 'next/server'
import type { Monster, Open5EMonster } from '@/app/api/open5e/monsters/types'

export interface Open5EResponse {
  count: number
  next?: string
  previous?: string
  results: Open5EMonster[]
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name')

  console.log('GET', request, name)

  if (!name) {
    return NextResponse.json(
      { error: 'name parameter is required' },
      { status: 400 },
    )
  }

  try {
    // Filter SRD results
    const open5eParams = new URLSearchParams({
      name__icontains: name,
      fields: 'name,hit_dice,document__title',
      document__slug__not_in: 'wotc-srd',
    })

    const response = await fetch(
      `https://api.open5e.com/v1/monsters?${open5eParams.toString()}`,
    )

    const data: Open5EResponse = await response.json()

    return NextResponse.json(
      data.results
        .filter((open5eMonster: Open5EMonster) => !!open5eMonster.hit_dice)
        .map((open5eMonster: Open5EMonster): Monster => {
          return {
            name: open5eMonster.name,
            hitDice: open5eMonster.hit_dice.trim().replace(/\s/g, ''),
            documentTitle: open5eMonster.document__title,
          }
        }),
      { status: 200 },
    )
  } catch {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}
