import React, { useCallback, useState } from 'react'
import { Combobox } from '@headlessui/react'
import clsx from 'clsx'
import { Monster } from '@/app/api/open5e/monsters/types'
import purify from 'dompurify'
import getPluralPhrase from '@/lib/utils/get-plural-phrase'
import srdMonsterData from '@/data/data-5e-srd-2014'
import Fuse from 'fuse.js'

interface MonsterForDisplay extends Monster {
  nameForDisplay: string
}

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

const fuse = new Fuse(srdMonsterData, {
  keys: ['name'],
  threshold: 0.05,
})

let timeoutId: NodeJS.Timeout

const SearchMonstersCombobox: React.FC<SearchMonstersComboboxProps> = ({
  onHitDiceObtained,
  className,
}) => {
  const [useExtendedSearch, setUseExtendedSearch] = useState<boolean>(false)
  const [comboboxValue, setComboboxValue] = useState<string>('')
  const [isSearchingOpen5eContent, setIsSearchingOpen5eContent] =
    useState(false)
  const [selectedMonster, setSelectedMonster] = useState<Monster | null>(null)
  const [monsterResultsList, setMonsterResultsList] = useState<
    MonsterForDisplay[]
  >([])

  const resetFuse = useCallback(() => {
    fuse.setCollection(srdMonsterData)
  }, [])

  const reset = useCallback(() => {
    resetFuse()
    setMonsterResultsList([])
    setSelectedMonster(null)
  }, [resetFuse])

  const doFilter = useCallback((monstersToFilter: Monster[], query: string) => {
    fuse.setCollection(monstersToFilter)

    const filteredMonsters = fuse.search(query).map(
      ({ item }): MonsterForDisplay => ({
        ...item,
        nameForDisplay: purify
          .sanitize(item.name)
          .split('')
          .map((l) =>
            query.toLowerCase().includes(l.toLowerCase()) ? `<u>${l}</u>` : l,
          )
          .join(''),
      }),
    )

    setMonsterResultsList(filteredMonsters)
  }, [])

  const debouncedFetchOpen5eMonsters = useCallback(
    async (query: string): Promise<Monster[]> => {
      if (!query) return []

      setIsSearchingOpen5eContent(true)

      const params = new URLSearchParams({
        name: query,
      })

      return new Promise((resolve) => {
        if (timeoutId) clearTimeout(timeoutId)

        timeoutId = setTimeout(async () => {
          try {
            const res = await fetch(`/api/open5e/monsters?${params.toString()}`)
            const data: Monster[] = await res.json()
            resolve(data)
          } catch (error) {
            console.error('Error fetching data:', error)
            resolve([])
          } finally {
            setIsSearchingOpen5eContent(false)
          }
        }, 1000)
      })
    },
    [],
  )

  const handleInput = useCallback(
    async (newQuery: string) => {
      console.log('Query', newQuery, new Date())

      setComboboxValue(newQuery)

      if (!newQuery) {
        reset()
        return
      }

      if (useExtendedSearch) {
        doFilter(srdMonsterData, newQuery)
        const results = await debouncedFetchOpen5eMonsters(newQuery)
        console.log('results', results, new Date())
        doFilter(
          srdMonsterData
            .map((m: Monster): Monster => {
              return {
                ...m,
                documentTitle: '5E SRD (2014)',
              }
            })
            .concat(results || []),
          newQuery,
        )
      } else {
        doFilter(srdMonsterData, newQuery)
      }
    },
    [useExtendedSearch, debouncedFetchOpen5eMonsters, doFilter, reset],
  )

  const handleMonsterSelected = useCallback(
    (monster: Monster) => {
      setSelectedMonster(monster)
      if (monster) {
        const { hitDice, name: monsterName } = monster
        onHitDiceObtained({ hitDice, monsterName })
        resetFuse()
      }
    },
    [onHitDiceObtained, resetFuse],
  )

  return (
    <div className={clsx(className, 'flex flex-col gap-8')}>
      <Combobox value={selectedMonster} onChange={handleMonsterSelected}>
        <div className="flex-none flex flex-col gap-2 text-sm">
          <div className="flex flex-col gap-4">
            <Combobox.Label className="text-xs">
              Search for monsters from the Wizards of the Coast&trade; 5th
              Edition (2014) SRD by default, or check the{' '}
              <strong className="font-semibold">3rd Party OGL</strong> box to
              search OGL content from Open5e, Kobold&nbsp;Press&trade;,
              EN&nbsp;Publishing&trade; and
              Green&nbsp;Ronin&nbsp;Publishing&trade;
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
            value={comboboxValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleInput(event.target.value)
            }
            displayValue={() => comboboxValue}
            autoFocus={true}
            placeholder="eg. Goblin, Orc, Tarrasque"
            className="w-full input-lg"
          />

          {comboboxValue &&
            (isSearchingOpen5eContent || monsterResultsList.length > 0) && (
              <p className="px-2 flex items-baseline justify-between gap-8 text-sm text-neutral-500">
                <span>
                  {getPluralPhrase(monsterResultsList.length, [
                    'results',
                    'result',
                    'results',
                  ])}
                </span>

                {isSearchingOpen5eContent && (
                  <span>Searching OGL content&hellip;</span>
                )}
              </p>
            )}
        </div>

        {monsterResultsList.length > 0 ? (
          <Combobox.Options className="flex-shrink overflow-y-auto">
            {monsterResultsList.map((monster, index) => (
              <Combobox.Option
                key={`${index}-${monster.name}`}
                value={monster}
                as={'ul'}
              >
                {({ focus }) => (
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
          comboboxValue &&
          !isSearchingOpen5eContent && <p>No monsters match this search</p>
        )}
      </Combobox>
    </div>
  )
}

export default SearchMonstersCombobox
