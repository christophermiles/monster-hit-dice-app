import React from 'react'
import { useBrowserInfo } from '@/lib/hooks/useBrowserInfo'
import CmdK from '@/components/CmdK'

const SearchMonstersButton: React.FC<{
  onClick: () => void
}> = ({ onClick }) => {
  const { platformType } = useBrowserInfo()

  return (
    <button
      id="search-monsters-button"
      className="flex items-baseline gap-2"
      aria-label="Get Hit Dice by monster name"
      onClick={onClick}
    >
      <span>Search monsters</span>

      {platformType === 'desktop' && <CmdK />}
    </button>
  )
}

export default SearchMonstersButton
