import DiceIcon, { DieType } from '@/app/components/DiceIcon'
import React from 'react'
import clsx from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  dieType?: DieType
  disabled?: boolean
  onClick?: () => void
}

const GetHitPointsButton: React.FC<ButtonProps> = ({
  dieType,
  disabled = false,
  onClick = () => null,
  type = 'submit',
}) => {
  return (
    <button
      id="get-hp-button"
      disabled={disabled}
      type={type}
      className={clsx(
        'button',
        'px-4 py-2 flex gap-2 items-center',
        'text-xl md:text-2xl uppercase font-medium',
        disabled && 'cursor-not-allowed',
      )}
      onClick={onClick}
    >
      <span>Get Hit Points</span>
      <DiceIcon dieType={dieType} size="sm" />
    </button>
  )
}

export default GetHitPointsButton
