import React from 'react'
import { useBrowserInfo } from '@/app/lib/hooks/useBrowserInfo'
import CmdK from '@/app/components/CmdK'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}
const LaunchSearchMonstersButton: React.FC<ButtonProps> = ({
  onClick,
  type = 'button',
}) => {
  const { platformType } = useBrowserInfo()

  return (
    <button
      id="search-monsters-button"
      type={type}
      aria-label="Get Hit Dice by monster name"
      onClick={onClick}
      className="text-button flex items-center"
    >
      <span className="flex items-baseline gap-2">
        <span>Search monsters</span>

        {platformType === 'desktop' && <CmdK />}
      </span>
    </button>
  )
}

export default LaunchSearchMonstersButton
