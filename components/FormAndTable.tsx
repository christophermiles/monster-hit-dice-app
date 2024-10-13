'use client'
import React, { useEffect, useState } from 'react'
import HitDiceInput from '@/components/HitDiceInput'
import { Transition } from '@headlessui/react'
import SearchMonstersButton from '@/components/SearchMonstersButton'
import HitPointResultsTable from '@/components/HitPointResultsTable'
import GetHitPointsButton from '@/components/GetHitPointsButton'
import GetHitDiceByMonsterNameModal from '@/components/GetHitDiceByMonsterNameModal'
import { HitPointResults } from 'roll-hit-dice/dist/types'
import rollHitDice, { parseHitDice } from 'roll-hit-dice/dist/roll-hit-dice'
import { DieType } from '@/components/DiceIcon'

export default function HitDiceForm() {
  const [showMonsterSearch, setShowMonsterSearch] = useState(false)
  const [hitDice, setHitDice] = useState('')
  const [dieType, setDieType] = useState<DieType>()
  const [hitPointResultsList, setHitPointResultsList] = useState<
    {
      hitDice: string
      hitPointResults: HitPointResults
      dieType: DieType
    }[]
  >([])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        setShowMonsterSearch(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleSearchMonstersButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault()
    setShowMonsterSearch(true)
  }

  const handleHitDiceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHitDice(e.target.value)
  }

  useEffect(() => {
    if (!hitDice) return

    try {
      const dieTypeNumber = parseHitDice(hitDice, true).dieType
      setDieType(`d${dieTypeNumber}` as DieType)
    } catch {
      setDieType(undefined)
    }
  }, [hitDice])

  const handleGetHitDiceByMonsterNameModalClose = (
    hitDiceFromMonsterName?: string,
  ) => {
    setShowMonsterSearch(false)
    if (hitDiceFromMonsterName) {
      setHitDice(hitDiceFromMonsterName)
      handleGetHitPoints(hitDiceFromMonsterName)
    }
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleGetHitPoints(hitDice)
  }

  const handleGetHitPoints = (hitDice?: string) => {
    if (!hitDice) return
    try {
      const result = rollHitDice(hitDice, true)
      const dieType = parseHitDice(hitDice, true).dieType
      setHitPointResultsList(
        hitPointResultsList
          .filter((r) => r.hitDice !== hitDice)
          .concat({
            hitDice: hitDice,
            hitPointResults: result,
            dieType: `d${dieType}` as DieType,
          })
          .reverse(),
      )
    } catch (e) {
      console.warn(e)
    }
  }

  return (
    <>
      <div className="flex flex-col gap-16">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col items-center justify-center gap-8 w-full"
        >
          <HitDiceInput
            value={hitDice}
            onInput={handleHitDiceInput}
            className="w-full"
            inputHeaderEnd={
              <SearchMonstersButton onClick={handleSearchMonstersButtonClick} />
            }
          />

          <GetHitPointsButton
            dieType={dieType}
            disabled={!hitDice}
            onClick={handleGetHitPoints}
          />
        </form>

        {hitPointResultsList.length === 0 ? (
          <HitPointResultsTable /> // Show empty table
        ) : (
          hitPointResultsList.map((item, index) => (
            <HitPointResultsTable
              key={`${index}-${item.hitDice}`}
              dieType={item.dieType}
              hitDice={item.hitDice}
              hitPointResults={item.hitPointResults}
            />
          ))
        )}
      </div>

      <Transition show={showMonsterSearch} as="div">
        <GetHitDiceByMonsterNameModal
          isOpen={showMonsterSearch}
          onClose={handleGetHitDiceByMonsterNameModalClose}
        />
      </Transition>
    </>
  )
}
