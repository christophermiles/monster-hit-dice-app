import {NextRequest, NextResponse} from 'next/server'

export type Open5EMonster = {
    name: string
    hit_dice: string
    document__title: string
}

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
        return NextResponse.json({ error: 'name parameter is required' }, { status: 400 });
    }

    const open5eParams = new URLSearchParams({
        name__icontains: name,
        fields: 'name,hit_dice,document__title'
    })

    if (!extendedSearch) {
        open5eParams.append('document__slug', 'wotc-srd')
    }

    try {
        const response = await fetch(`https://api.open5e.com/v1/monsters?${open5eParams.toString()}`)
        const data: Open5EResponse = await response.json()

        return NextResponse.json(data.results, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
    }
}