import React, { useState } from 'react'
import { Combobox } from '@headlessui/react'
import debounce from 'lodash.debounce'
import clsx from 'clsx'
import { Monster } from '@/app/api/monsters/types'
import purify from 'dompurify'
import getPluralPhrase from '@/app/utils/get-plural-phrase'

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
    className
}) => {
  const [isSearching, setIsSearching] = useState(false)
  const [useExtendedSearch, setUseExtendedSearch] = useState<boolean>(false)
  const [query, setQuery] = useState<string>('')
  const [selectedMonster, setSelectedMonster] = useState<Monster>()
  const [monsters, setMonsters] = useState<Monster[]>([])

  const filteredMonstersForDisplay = monsters.slice(0, 20).map((m) => {
    return {
      ...m,
      nameForDisplay: purify
        .sanitize(m.name)
        .split('')
        .map((l) =>
          query.toLowerCase().includes(l.toLowerCase()) ? `<u>${l}</u>` : l,
        )
        .join(''), // Could instead use https://www.fusejs.io/api/options.html#includematches to get the indices of matching characters
    }
  })

  const fetchMonsters = async (value: string) => {
    setQuery(value)

    if (!value) {
      setMonsters([])
      return
    }

    setIsSearching(true)

    const params = new URLSearchParams({
      name: value
    })

    if (useExtendedSearch) {
      params.append('extendedSearch', 'true')
    }

    try {
      const res = await fetch(
        `/api/monsters?${params.toString()}`,
      )
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
    if (monster) {
      const { hitDice, name: monsterName } = monster
      onHitDiceObtained({ hitDice, monsterName })
    }
  }

  return (
      <div className={clsx(className, 'flex flex-col gap-8')}>
        <Combobox value={selectedMonster} onChange={handleMonsterSelected}>
          <div className="flex-none flex flex-col gap-2 text-sm">
            <div className="flex flex-col gap-4">
              <Combobox.Label className="text-xs">
                Search for monsters from the Wizards of the Coast&trade; 5th Edition (2014) SRD by default, or check the <strong>3rd Party OGL</strong> box to search OGL content from Open5e, Kobold&nbsp;Press&trade;, EN&nbsp;Publishing&trade; and Green&nbsp;Ronin&nbsp;Publishing&trade;
              </Combobox.Label>

              <label className="flex items-center justify-end gap-1 text-sm">
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
                placeholder="eg. Goblin, Orc, Gelatinous Cube"
                className="w-full input-lg"
            />

            {query && (isSearching || filteredMonstersForDisplay.length > 0) && (
              <p className="text-sm text-neutral-500">
                {isSearching ? <span>Searching&hellip;</span> : getPluralPhrase(filteredMonstersForDisplay.length, ['results', 'result', 'results'])}
              </p>
            )}
          </div>

          {filteredMonstersForDisplay.length > 0 ? (
              <Combobox.Options className="flex-shrink overflow-y-auto">
                {filteredMonstersForDisplay.map((monster, index) => (
                    <Combobox.Option
                        key={`${index}-${monster.name}`}
                        value={monster}
                        as={'ul'}
                    >
                      {({focus}) => (
                          <li
                              className={clsx(
                                  'p-2 flex items-baseline justify-between gap-4',
                                  focus ? 'bg-black text-white' : 'bg-white text-black',
                              )}
                          >
                <span className="flex-none flex items-baseline gap-1">
                  <span
                      dangerouslySetInnerHTML={{
                        __html: monster.nameForDisplay,
                      }}
                  />
                  <span
                      className={
                        focus ? 'text-neutral-300' : 'text-neutral-500'
                      }
                  >
                    ({monster.hitDice})
                  </span>
                </span>

                            {monster.documentTitle && (
                                <span
                                    className={clsx(
                                        'flex-shrink truncate text-xs',
                                        focus ? 'text-neutral-300' : 'text-neutral-500',
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
          ) : (
              query && !isSearching && <p>No monsters match this search</p>
          )}
        </Combobox>
      </div>
  )
}

export default SearchMonstersCombobox