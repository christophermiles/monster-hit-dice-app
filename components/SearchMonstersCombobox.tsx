import React, { useState } from 'react'
import { Combobox } from '@headlessui/react'
import debounce from 'lodash.debounce'
import type {Open5EMonster} from "@/app/api/monsters/route";
import clsx from 'clsx'

interface SearchMonstersComboboxProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onHitDiceObtained: (hitDice: string) => void
}

const SearchMonstersCombobox: React.FC<SearchMonstersComboboxProps> = ({
  onHitDiceObtained,
}) => {
  const [selectedMonster, setSelectedMonster] = useState<Open5EMonster>()
  const [monsters, setMonsters] = useState<Open5EMonster[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [query, setQuery] = useState<string>('')

  const filteredMonsters = monsters.slice(0, 5)

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
        const data: Open5EMonster[] = await res.json()
        setMonsters(data)
    } catch (error) {
        console.error('Error fetching data:', error)
    } finally {
        setIsSearching(false)
    }
  }

  const debouncedFetchMonsters = debounce(fetchMonsters, 500)

  const handleMonsterSelected = (monster: Open5EMonster) => {
    setSelectedMonster(monster)
    onHitDiceObtained(monster.hit_dice)
  }

  return (
    <Combobox value={selectedMonster} onChange={handleMonsterSelected}>
      <div className="mb-2 flex items-baseline justify-between text-sm">
        <Combobox.Label>Search SRD monsters</Combobox.Label>

        <label className="flex items-center text-xs">
          <input type="checkbox" />
          <span className="hidden md:inline">
            Include additional content from Open 5E
          </span>

          <span className="inline md:hidden">Open 5E</span>
        </label>
      </div>

      <Combobox.Input
        onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
            debouncedFetchMonsters(event.target.value)
        }
        className="w-full input input-lg"
      />
      <div className="my-8">
          { isSearching && filteredMonsters.length < 1 && <p>Searching&hellip;</p> }
          { filteredMonsters.length > 0 &&
          <Combobox.Options className="my-8">
              {filteredMonsters.map((monster) => (
                  <Combobox.Option key={monster.name} value={monster} as={'ul'}>
                      {({ focus }) => (
                          <li
                              className={clsx(
                                  'p-2',
                                  focus ? 'bg-black text-white' : 'bg-white text-black',
                              )}
                          >
                              {monster.name} <span className={focus ? 'text-gray-300' : 'text-gray-500'}>({ monster.hit_dice})</span>
                          </li>
                      )}
                  </Combobox.Option>
              ))}
          </Combobox.Options>
          }
          { query && filteredMonsters.length < 1 && <p>No monsters match this search</p>}
      </div>
    </Combobox>
  )
}

export default SearchMonstersCombobox