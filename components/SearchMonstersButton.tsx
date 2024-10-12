import { useBrowserInfo } from '@/lib/hooks/useBrowserInfo'
import CmdK from '@/components/CmdK'

export default function SearchMonstersButton({
  onClick = () => null,
  text = 'Search monsters',
}) {
  const { platformType } = useBrowserInfo()

  return (
    <button
      id="search-monsters-button"
      className="flex items-baseline gap-2"
      aria-label="Get Hit Dice by monster name"
      onClick={onClick}
    >
      <span>{text}</span>

      {platformType === 'desktop' && <CmdK />}
    </button>
  )
}
