import React, { useState } from 'react'
import { Combobox } from '@headlessui/react'
import debounce from 'lodash.debounce'
import clsx from 'clsx'
import { Monster } from '@/app/api/monsters/types'

interface SearchMonstersComboboxProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onHitDiceObtained: ({
    hitDice,
    monsterName,
  }: {
    hitDice: string
    monsterName: string
  }) => void
}

const SearchMonstersCombobox: React.FC<SearchMonstersComboboxProps> = ({
  onHitDiceObtained,
}) => {
  const [isSearching, setIsSearching] = useState(false)
  const [useExtendedSearch, setUseExtendedSearch] = useState<boolean>(false)
  const [query, setQuery] = useState<string>('')
  const [selectedMonster, setSelectedMonster] = useState<Monster>()
  const [monsters, setMonsters] = useState<Monster[]>([])

  const filteredMonsters = monsters.slice(0, 20)

  const fetchMonsters = async (value: string) => {
    setQuery(value)
    if (!value) {
      setMonsters([])
      return
    }
    setIsSearching(true)
    console.log('Search Open 5E for', value, new Date())

    // TODO: Set loading indicator
    try {
      const res = await fetch(`/api/monsters?name=${value}`)
      const data: Monster[] = await res.json()
      setMonsters(data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsSearching(false)
    }
  }

  const debouncedFetchMonsters = debounce(fetchMonsters, 500)

  const handleMonsterSelected = (monster: Monster) => {
    setSelectedMonster(monster)
    const { hitDice, name: monsterName } = monster
    onHitDiceObtained({ hitDice, monsterName })
  }

  return (
    <Combobox value={selectedMonster} onChange={handleMonsterSelected}>
      <div className="mb-2 px-2 flex items-baseline justify-between gap-4 text-sm">
        <Combobox.Label>Search SRD monsters</Combobox.Label>

        <label className="flex items-center gap-1 text-xs">
          <input
            type="checkbox"
            checked={useExtendedSearch}
            onChange={() => setUseExtendedSearch(!useExtendedSearch)}
          />
          <span>3rd Party OGL</span>
        </label>
      </div>

      <Combobox.Input
        onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
          debouncedFetchMonsters(event.target.value)
        }
        className="w-full input input-lg"
      />
      <div className="my-8">
        {filteredMonsters.length > 0 ? (
          <Combobox.Options className="my-8">
            {filteredMonsters.map((monster, index) => (
              <Combobox.Option
                key={`${index}-${monster.name}`}
                value={monster}
                as={'ul'}
              >
                {({ focus }) => (
                  <li
                    className={clsx(
                      'p-2 flex items-baseline gap-4',
                      focus ? 'bg-black text-white' : 'bg-white text-black',
                    )}
                  >
                    <span className="flex-none">
                      {monster.name}{' '}
                      <span
                        className={focus ? 'text-gray-300' : 'text-gray-500'}
                      >
                        ({monster.hitDice})
                      </span>
                    </span>

                    {monster.documentTitle && (
                      <span
                        className={clsx(
                          'flex-auto text-sm',
                          focus ? 'text-gray-300' : 'text-gray-500',
                        )}
                      >
                        {monster.documentTitle}
                      </span>
                    )}
                  </li>
                  // TODO: Make this its own component?
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        ) : isSearching ? (
          <p className="px-2">Searching&hellip;</p>
        ) : (
          query && <p className="px-2">No monsters match this search</p>
        )}
      </div>
    </Combobox>
  )
}

export default SearchMonstersCombobox
