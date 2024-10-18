import React, { useCallback, useEffect, useState } from 'react'
import { Combobox } from '@headlessui/react'
import clsx from 'clsx'
import { Monster } from '@/app/api/open5e/monsters/types'
import purify from 'dompurify'
import getPluralPhrase from '@/lib/utils/get-plural-phrase'
import srdMonsterData from '@/data/data-5e-srd-2014'
import Fuse from 'fuse.js'
import debounce from 'lodash.debounce'
import Link from 'next/link'
import { getFromStorage, setToStorage } from '@/lib/utils/storage'

interface ComboboxMonster extends Monster {
  alwaysShowDocumentTitle?: boolean
}

interface MonsterForDisplay extends ComboboxMonster {
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

const defaultMonsterData: ComboboxMonster[] = (
  srdMonsterData as ComboboxMonster[]
).concat([
  {
    name: '💪KOBOLD CHAD™💪',
    hitDice: '100d20+1000',
    alwaysShowDocumentTitle: true,
    documentTitle: 'Monster Hit Dice App',
  },
])

const fuse = new Fuse(defaultMonsterData, {
  keys: ['name'],
})

function resetFuse() {
  fuse.setCollection(defaultMonsterData)
}

const SearchMonstersCombobox: React.FC<SearchMonstersComboboxProps> = ({
  onHitDiceObtained,
  className,
}) => {
  const [comboboxValue, setComboboxValue] = useState<string>('')

  // region Extended search value
  const [useExtendedSearch, setUseExtendedSearch] = useState<boolean>(
    getFromStorage<boolean>('useExtendedMonsterSearch') || false,
  )
  useEffect(() => {
    setToStorage<boolean>('useExtendedMonsterSearch', useExtendedSearch)
  }, [useExtendedSearch])
  // endregion

  // region Fetching state
  const [fetchedMonstersCache, setFetchedMonstersCache] = useState<
    Map<string, Monster[]>
  >(new Map())
  const [isSearchingOpen5eContent, setIsSearchingOpen5eContent] =
    useState(false)
  const [fetchError, setFetchError] = useState(false)
  // endregion

  const [collectionToFilter, setCollectionToFilter] =
    useState<Monster[]>(defaultMonsterData)

  useEffect(() => {
    if (!useExtendedSearch) {
      setCollectionToFilter(defaultMonsterData)
    }
  }, [useExtendedSearch])

  useEffect(() => {
    fuse.setCollection(collectionToFilter)
  }, [collectionToFilter])

  const [monsterResultsList, setMonsterResultsList] = useState<
    MonsterForDisplay[]
  >([])

  useEffect(() => {
    if (!comboboxValue) {
      setMonsterResultsList([])
      return
    }

    setMonsterResultsList(
      fuse.search(comboboxValue).map(
        ({ item }): MonsterForDisplay => ({
          ...item,
          documentTitle:
            useExtendedSearch || item.alwaysShowDocumentTitle
              ? item.documentTitle
              : '',
          nameForDisplay: purify
            .sanitize(item.name)
            .split('')
            .map((l) =>
              comboboxValue.toLowerCase().includes(l.toLowerCase())
                ? `<u>${l}</u>`
                : l,
            )
            .join(''),
        }),
      ),
    )
  }, [comboboxValue, useExtendedSearch, collectionToFilter])

  const [selectedMonster, setSelectedMonster] = useState<Monster | null>(null)

  const debouncedFetchOpen5eMonsters = useCallback(
    debounce(async (query: string) => {
      if (!query) {
        setCollectionToFilter(defaultMonsterData)
        return
      }

      setFetchError(false)
      setIsSearchingOpen5eContent(true)

      try {
        const result: Monster[] = []

        if (fetchedMonstersCache.has(query)) {
          result.push(...fetchedMonstersCache.get(query)!) // Assert that get() will return a defined value
        } else {
          const response = await fetch(`/api/open5e/monsters?name=${query}`)
          const data: Monster[] = await response.json()
          result.push(...data)
          setFetchedMonstersCache((prevCache) =>
            new Map(prevCache).set(query, data),
          )
        }

        setCollectionToFilter(defaultMonsterData.concat(result))
      } catch {
        setFetchError(true)
      } finally {
        setIsSearchingOpen5eContent(false)
      }
    }, 1000),
    [fetchedMonstersCache],
  )

  useEffect(() => {
    return () => {
      debouncedFetchOpen5eMonsters.cancel()
    }
  }, [debouncedFetchOpen5eMonsters])

  const handleInput = async (newQuery: string) => {
    setComboboxValue(newQuery)

    if (useExtendedSearch && newQuery.length > 2) {
      await debouncedFetchOpen5eMonsters(newQuery)
    }
  }

  const handleMonsterSelected = useCallback(
    (monster: Monster) => {
      setSelectedMonster(monster)
      if (monster) {
        const { hitDice, name: monsterName } = monster
        onHitDiceObtained({ hitDice, monsterName })
        resetFuse()
      }
    },
    [onHitDiceObtained],
  )

  return (
    <div className={clsx(className, 'flex flex-col gap-8')}>
      <Combobox value={selectedMonster} onChange={handleMonsterSelected}>
        <div className="flex-none flex flex-col gap-2 text-sm">
          <label className="px-2 flex items-center justify-end gap-2">
            <input
              type="checkbox"
              checked={useExtendedSearch}
              onChange={() => setUseExtendedSearch(!useExtendedSearch)}
              className="w-4 h-4"
            />
            <span>3rd Party OGL</span>
          </label>

          <Combobox.Input
            value={comboboxValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleInput(event.target.value)
            }
            displayValue={() => comboboxValue}
            autoFocus={true}
            placeholder="eg. Goblin"
            className="w-full input-lg"
          />

          {comboboxValue ? (
            (isSearchingOpen5eContent ||
              monsterResultsList.length > 0 ||
              fetchError) && (
              <p className="px-2 flex items-baseline justify-between gap-8 text-sm text-light">
                <span>
                  {getPluralPhrase(monsterResultsList.length, [
                    'results',
                    'result',
                    'results',
                  ])}
                </span>

                {fetchError ? (
                  <span className="text-error">Something went wrong</span>
                ) : (
                  isSearchingOpen5eContent && (
                    <span>Searching OGL content&hellip;</span>
                  )
                )}
              </p>
            )
          ) : (
            <Combobox.Label as="div" className="mt-4 flex flex-col gap-2">
              <p>
                By default, this form searches for monsters from the Wizards of
                the Coast 5th Edition (2014) SRD.
              </p>
              <p>
                You can also check the <strong>3rd Party OGL</strong> box to
                include Open Gaming License content from Open5e,
                Kobold&nbsp;Press, EN&nbsp;Publishing and
                Green&nbsp;Ronin&nbsp;Publishing, courtesy of the{' '}
                <a
                  href="https://open5e.com/api-docs"
                  target="_blank"
                  className="link"
                >
                  Open 5E API
                </a>
              </p>
              <p>
                See{' '}
                <Link href="/legal" className="link">
                  this page
                </Link>{' '}
                for more information about the Open Gaming License.
              </p>
            </Combobox.Label>
          )}
        </div>

        {comboboxValue || monsterResultsList.length > 0 ? (
          <Combobox.Options className="flex-shrink overflow-y-auto" as={'ul'}>
            {monsterResultsList.map((monster, index) => (
              <Combobox.Option
                key={`${index}-${monster.name}`}
                value={monster}
                as={'li'}
              >
                {({ focus }) => (
                  <span
                    className={clsx(
                      'p-2 flex flex-col gap-2',
                      'md:flex-row md:gap-4 md:items-baseline md:justify-between',
                      focus ? 'bg-black text-white' : 'bg-white text-black',
                    )}
                  >
                    <span className="flex items-baseline gap-1">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: monster.nameForDisplay,
                        }}
                      />
                      <span
                        className={focus ? 'text-lighter' : 'text-neutral-500'}
                      >
                        ({monster.hitDice})
                      </span>
                    </span>

                    {monster.documentTitle && (
                      <span
                        className={clsx(
                          'truncate text-xs',
                          focus ? 'text-lighter' : 'text-neutral-500',
                        )}
                      >
                        {monster.documentTitle}
                      </span>
                    )}
                  </span>
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
