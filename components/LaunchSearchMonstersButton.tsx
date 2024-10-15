import React from 'react'
import { useBrowserInfo } from '@/lib/hooks/useBrowserInfo'
import CmdK from '@/components/CmdK'

const LaunchSearchMonstersButton: React.FC<{
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}> = ({ onClick }) => {
  const { platformType } = useBrowserInfo()

  return (
    <button
      id="search-monsters-button"
      className="text-button flex items-center"
      aria-label="Get Hit Dice by monster name"
      onClick={onClick}
    >
      <span className="flex items-baseline gap-2">
        <span>Search monsters</span>

        {platformType === 'desktop' && <CmdK />}
      </span>
    </button>
  )
}

export default LaunchSearchMonstersButton