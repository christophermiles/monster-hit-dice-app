import React from 'react'
import TextBadge from '@/components/TextBadge'
import DiceIcon from '@/components/DiceIcon'
import type { TextBadgeProps } from '@/components/TextBadge'
import Link from 'next/link'

export default function MainHeader() {
  const badgeProps = (): {
    text: string
    colour: TextBadgeProps['colour']
  } | null => {
    if (!process.env.NEXT_PUBLIC_VERSION) {
      return null
    }

    if (process.env.NEXT_PUBLIC_VERSION.toLowerCase().includes('alpha')) {
      return {
        text: 'Alpha',
        colour: 'amber',
      }
    }

    if (process.env.NEXT_PUBLIC_VERSION.toLowerCase().includes('beta')) {
      return {
        text: 'Beta',
        colour: 'blue',
      }
    }

    return {
      text: process.env.NEXT_PUBLIC_VERSION,
      colour: 'green',
    }
  }
  return (
    <div className="flex items-center gap-6">
      <nav>
        <Link href="/" className="flex items-center gap-1 cursor-pointer">
          <DiceIcon size="md" />
          <span className="text-lg font-medium">Monster Hit Dice</span>
        </Link>
      </nav>

      {badgeProps() && (
        <TextBadge className="text-xs" colour={badgeProps()?.colour}>
          {badgeProps()?.text}
        </TextBadge>
      )}
    </div>
  )
}
