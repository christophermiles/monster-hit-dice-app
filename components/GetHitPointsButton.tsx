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
    <button id="get-hp-button" disabled={disabled} onClick={onClick}>
      <DiceIcon dieType={dieType} />
      <span>Get Hit Points</span>
    </button>
  )
}

export default GetHitPointsButton
