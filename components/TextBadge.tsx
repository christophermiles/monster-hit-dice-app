import React from 'react'
import clsx from 'clsx'

const DEFAULT_COLOR = 'blue'

export type TextBadgeProps = {
  children: React.ReactNode
  colour?: 'blue' | 'amber' | 'green'
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
}

export default function TextBadge({
  children,
  colour,
  rounded,
  className,
}: Readonly<TextBadgeProps>) {
  const colourClasses = {
    blue: 'bg-blue-500 text-white',
    green: 'bg-green-500 text-white',
    amber: 'bg-amber-500 text-white',
  }

  const roundedClasses = {
    sm: 'rounded-sm px-1 py-0.5',
    md: 'rounded-md px-1 py-0.5',
    lg: 'rounded-lg px-1 py-0.5',
    xl: 'rounded-xl px-1 py-0.5',
    full: 'rounded-full px-2 py-0.5',
  }

  return (
    <span
      className={clsx(
        colour ? colourClasses[colour] : colourClasses[DEFAULT_COLOR],
        rounded ? roundedClasses[rounded] : roundedClasses['full'],
        className,
      )}
    >
      {children}
    </span>
  )
}
