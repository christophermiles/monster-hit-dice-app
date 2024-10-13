import DiceIcon, { DieType } from '@/components/DiceIcon'
import './GetHitPointsButton.css'
import React from 'react'

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
      className="button"
      disabled={disabled}
      onClick={onClick}
    >
      <span>Get Hit Points</span>
      <DiceIcon dieType={dieType} size="sm" />
    </button>
  )
}

export default GetHitPointsButton
