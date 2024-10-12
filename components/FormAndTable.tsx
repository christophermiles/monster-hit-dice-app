'use client'
import React, { useEffect, useState } from 'react'
import HitDiceInput from '@/components/HitDiceInput'
import { Transition } from '@headlessui/react'
import SearchMonstersButton from '@/components/SearchMonstersButton'
import HitPointResultsTable from '@/components/HitPointResultsTable'
import GetHitPointsButton from '@/components/GetHitPointsButton'
import { HitPointResults } from 'roll-hit-dice/dist/types'
import rollHitDice, { parseHitDice } from 'roll-hit-dice/dist/roll-hit-dice'
import { DieType } from '@/components/DiceIcon'

export default function HitDiceForm() {
  const [showMonsterSearch, setShowMonsterSearch] = useState(false)
  const [hitDiceExpression, setHitDiceExpression] = useState('')
  const [dieType, setDieType] = useState<DieType>()
  const [monsterName, setMonsterName] = useState('')
  const [hitPointResultsList, setHitPointResultsList] = useState<
    {
      hitDice: string
      hitPointResults: HitPointResults
      dieType: DieType
    }[]
  >([])

  const Modal = ({
    isOpen,
    onClose,
  }: {
    isOpen: boolean
    onClose: () => void
  }) => {
    useEffect(() => {
      const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose()
        }
      }

      if (isOpen) {
        window.addEventListener('keydown', handleEscapeKey)
      }

      return () => {
        window.removeEventListener('keydown', handleEscapeKey)
      }
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
      <div className="fixed inset-0 bg-neutral-800 opacity-90 p-4 flex flex-col items-center justify-center">
        <input
          type="search"
          value={monsterName}
          onChange={(e) => setMonsterName(e.target.value)}
          className="opacity-100"
        />
      </div>
    )
  }

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

  const handleHitDiceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHitDiceExpression(e.target.value)
  }

  useEffect(() => {
    try {
      const dieTypeNumber = parseHitDice(hitDiceExpression, true).dieType
      setDieType(`d${dieTypeNumber}` as DieType)
    } catch {
      setDieType(undefined)
    }
  }, [hitDiceExpression])

  const handleGetHitPoints = () => {
    if (!hitDiceExpression) return
    try {
      const result = rollHitDice(hitDiceExpression, true)
      const dieType = parseHitDice(hitDiceExpression, true).dieType
      setHitPointResultsList(
        hitPointResultsList
          .concat({
            hitDice: hitDiceExpression,
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
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col items-center justify-center gap-8 w-full"
        >
          <HitDiceInput
            value={hitDiceExpression}
            onInput={handleHitDiceInput}
            className="w-full"
            inputHeaderEnd={
              <SearchMonstersButton
                onClick={() => setShowMonsterSearch(true)}
              />
            }
          />

          <GetHitPointsButton
            dieType={dieType}
            disabled={!hitDiceExpression}
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
        <Modal
          isOpen={showMonsterSearch}
          onClose={() => setShowMonsterSearch(false)}
        />
      </Transition>
    </>
  )
}
