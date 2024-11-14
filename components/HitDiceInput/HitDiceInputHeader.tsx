import clsx from 'clsx'
import React from 'react'

export default function HitDiceInputHeader({
  label,
  inputHeaderEnd,
}: {
  label?: React.ReactNode
  inputHeaderEnd?: React.ReactNode
}) {
  return (
    <div
      className={clsx(
        'flex items-baseline',
        inputHeaderEnd && 'justify-between',
        'px-2',
        'text-xs sm:text-sm',
      )}
    >
      {label}

      {inputHeaderEnd}
    </div>
  )
}
