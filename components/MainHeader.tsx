import React from 'react'
import TextBadge from '@/components/TextBadge'
import DiceIcon from '@/components/DiceIcon'

export default function MainHeader() {
  const badgeProps = () => {
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
      <span className="flex items-center gap-1">
        <DiceIcon size="md" />
        <span className="text-lg font-medium">Hit Dice App</span>
      </span>

      {badgeProps() && (
        <TextBadge className="text-xs" colour={badgeProps()?.colour}>
          {badgeProps()?.text}
        </TextBadge>
      )}
    </div>
  )
}
