import { NextRequest, NextResponse } from 'next/server'
import { Monster, Open5EMonster } from '@/app/api/monsters/types'
import srdMonsters from './data-5e-srd-2014'

export interface Open5EResponse {
  count: number
  next?: string
  previous?: string
  results: Open5EMonster[]
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name')
  const extendedSearch = searchParams.get('extendedSearch')

  if (!name) {
    return NextResponse.json(
      { error: 'name parameter is required' },
      { status: 400 },
    )
  }

  try {
    const results = srdMonsters
      .filter((monster) =>
        monster.name.toLowerCase().includes(name.toLowerCase()),
      )
      .map((monster) => {
        return extendedSearch
          ? {
              ...monster,
              documentTitle: '5E SRD (2014)',
            }
          : monster
      })

    if (extendedSearch) {
      const open5eParams = new URLSearchParams({
        name__icontains: name,
        fields: 'name,hit_dice,document__title',
        document__slug__not_in: 'wotc-srd',
      })

      const response = await fetch(
        `https://api.open5e.com/v1/monsters?${open5eParams.toString()}`,
      )

      const data: Open5EResponse = await response.json()

      results.concat(
        data.results.map((open5eMonster: Open5EMonster): Monster => {
          return {
            name: open5eMonster.name,
            hitDice: open5eMonster.hit_dice,
            documentTitle: open5eMonster.document__title,
          }
        }),
      )
    }

    return NextResponse.json(results, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}
