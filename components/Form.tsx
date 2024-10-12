'use client'
import React, { useEffect, useState } from 'react'
import DiceIcon from '@/components/DiceIcon'
import HitDiceInput from '@/components/HitDiceInput'
import { Transition } from '@headlessui/react'
import SearchMonstersButton from '@/components/SearchMonstersButton'
import HitPointResultsTable from '@/components/HitPointResultsTable'
import GetHitPointsButton from '@/components/GetHitPointsButton'

export default function HitDiceForm() {
  const [showMonsterSearch, setShowMonsterSearch] = useState(false)
  const [hitDiceExpression, setHitDiceExpression] = useState('')
  const [monsterName, setMonsterName] = useState('')

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
      <div className="fixed inset-0 bg-gray-800 opacity-90 p-4 flex flex-col items-center justify-center">
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

  return (
    <>
      <div className="flex flex-col gap-16">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col items-center justify-center gap-8 w-full"
        >
          <HitDiceInput
            value={hitDiceExpression}
            onChange={(e) => setHitDiceExpression(e.target.value)}
            className="w-full"
            inputHeaderEnd={<SearchMonstersButton />}
          />

          <GetHitPointsButton disabled={!hitDiceExpression} />
        </form>

        <HitPointResultsTable />
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
