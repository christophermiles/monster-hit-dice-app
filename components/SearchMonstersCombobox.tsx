import React, { useState } from 'react'
import { Combobox } from '@headlessui/react'
import debounce from 'lodash.debounce'
import clsx from 'clsx'
import { Monster } from '@/app/api/monsters/types'
import purify from 'dompurify'
import getPluralPhrase from '@/app/utils/get-plural-phrase'
import {parseMaybeAssign} from "sucrase/dist/types/parser/traverser/expression";

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
          <div className="flex-none">
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

            {query && (isSearching || filteredMonstersForDisplay.length > 0) && (
              <p className="p-2 text-sm text-neutral-500">
                {isSearching ? <span>Searching&hellip;</span> : getPluralPhrase(filteredMonstersForDisplay.length, ['results', 'result', 'results'])}
              </p>
            )}
          </div>

          <div className="flex-shrink overflow-y-auto">
            {filteredMonstersForDisplay.length > 0 ? (
                <Combobox.Options>
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
                query && !isSearching && <p className="px-2">No monsters match this search</p>
            )}
          </div>
        </Combobox>
      </div>
  )
}

export default SearchMonstersCombobox