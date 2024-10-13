import React, { Fragment, useState } from 'react'
import { Combobox } from '@headlessui/react'
import throttle from 'lodash.throttle'
import sleep from '@/lib/sleep'

interface SearchMonstersComboboxProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onHitDiceObtained: (hitDice: string) => void
}

const SearchMonstersCombobox: React.FC<SearchMonstersComboboxProps> = ({
  onHitDiceObtained,
}) => {
  const [selectedMonster, setSelectedMonster] = useState<string>('')
  const [selectedMonsterHitDice, setSelectedMonsterHitDice] =
    useState<string>('')
  const [query, setQuery] = useState<string>('')

  const [monsters, setMonsters] = useState<string[]>([])

  const filteredMonsters = monsters.slice(0, 5)

  const fetchMonsters = async (value: string) => {
    if (!value) setMonsters([])
    const throttledFilter = throttle(async () => {
      console.log('Search Open 5E for', value, new Date())
      await sleep(1000)
      setMonsters(
        monsters.concat([
          value,
          'A monster from the API',
          'Another monster',
          'Another monster!!!',
          'Monster #5',
          'Monster #6',
          'Monster #7',
          'Monster #8',
          'Monster #9',
          'Monster #10',
        ]),
      )
    }, 500)

    await throttledFilter()
  }

  const handleMonsterSelected = (monster: {
    name: string
    hitDice: string
  }) => {
    setSelectedMonster(monster.name)
    onHitDiceObtained('2d6+8') // TODO: We will want a monster object with name and Hit Dice
  }

  return (
    <Combobox value={selectedMonster} onChange={handleMonsterSelected}>
      <Combobox.Input
        onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
          fetchMonsters(event.target.value)
        }
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setQuery(event.target.value)
        }
      />
      <Combobox.Options>
        {filteredMonsters.map((monster) => (
          <Combobox.Option key={monster} value={monster} as={Fragment}>
            {({ focus }) => (
              <li
                className={`${
                  focus ? 'bg-blue-500 text-white' : 'bg-white text-black'
                }`}
              >
                {monster}
              </li>
            )}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  )
}

export default SearchMonstersCombobox
