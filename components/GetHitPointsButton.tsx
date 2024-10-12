import DiceIcon from '@/components/DiceIcon'
import './GetHitPointsButton.css'

export default function GetHitPointsButton({ disabled = false }) {
  return (
    <button id="get-hp-button" disabled={disabled}>
      <DiceIcon icon="dx" />
      <span>Get Hit Points</span>
    </button>
  )
}
