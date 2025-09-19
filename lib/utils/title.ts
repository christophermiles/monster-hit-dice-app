import { TITLE, TITLE_PARTS_SEPARATOR } from '@/lib/constants'

export function generateTitle(parts: string[]) {
  return [TITLE, ...parts].join(` ${TITLE_PARTS_SEPARATOR} `)
}