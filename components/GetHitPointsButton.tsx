import DiceIcon, { DieType } from '@/components/DiceIcon'
import React from 'react'
import clsx from "clsx";

type ButtonProps = {
  dieType?: DieType
  disabled?: boolean
  onClick: () => void
}

const GetHitPointsButton: React.FC<ButtonProps> = ({
  dieType,
  disabled = false,
  onClick = () => null,
}) => {
  return (
    <button
      id="get-hp-button"
      className={clsx('button', 'px-4 py-2 flex gap-2 items-center', 'text-xl md:text-2xl uppercase font-medium', disabled && 'cursor-not-allowed')}
      disabled={disabled}
      onClick={onClick}
    >
      <span>Get Hit Points</span>
      <DiceIcon dieType={dieType} size="sm" />
    </button>
  )
}

export default GetHitPointsButton