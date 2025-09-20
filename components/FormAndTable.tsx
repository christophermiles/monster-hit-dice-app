'use client'
import React, { useEffect, useRef, useState } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import HitDiceInput from '@/components/HitDiceInput'
import { Transition } from '@headlessui/react'
import LaunchSearchMonstersButton from '@/components/LaunchSearchMonstersButton'
import HitPointResultsTable from '@/components/HitPointResultsTable'
import GetHitPointsButton from '@/components/GetHitPointsButton'
import GetHitDiceByMonsterNameModal from '@/components/GetHitDiceByMonsterNameModal'
import { HitPointResults } from 'roll-hit-dice/dist/types'
import rollHitDice, { parseHitDice } from 'roll-hit-dice/dist/roll-hit-dice'
import { DieType } from '@/components/DiceIcon'
import { generateTitle } from '@/lib/utils/title'

export default function HitDiceForm() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const [showMonsterSearch, setShowMonsterSearch] = useState(false)
  const [hitDice, setHitDice] = useState('')
  const [dieType, setDieType] = useState<DieType>()
  const [hitPointResultsList, setHitPointResultsList] = useState<
    {
      hitDice: string
      hitPointResults: HitPointResults
      dieType: DieType
      monsterName?: string
    }[]
  >([])

  const inputRef = useRef<HTMLInputElement>(null)

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

  const handleLaunchSearchMonstersButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault()
    setShowMonsterSearch(true)
  }

  const handleHitDiceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHitDice(e.target.value)
  }

  useEffect(() => {
    try {
      const dieTypeNumber = parseHitDice(hitDice, true).dieType

      setDieType(`d${dieTypeNumber}` as DieType)
    } catch {
      setDieType(undefined)
    }
  }, [hitDice])

  const handleGetHitDiceByMonsterNameModalClose = (
    hitDiceFromMonsterName?: string,
    monsterName?: string,
  ) => {
    setShowMonsterSearch(false)

    if (hitDiceFromMonsterName) {
      setHitDice('')

      if (inputRef.current) {
        inputRef.current.focus()
      }

      doNavigation(hitDiceFromMonsterName, monsterName)
    }
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setHitDice('')

    if (inputRef.current) {
      inputRef.current.focus()
    }

    doNavigation(hitDice)
  }

  const handleGetHitPoints = (hitDice?: string, monsterName?: string) => {
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
            monsterName,
          })
          .reverse(),
      )
    } catch (e) {
      console.warn(e)
    }
  }

  function doNavigation(hitDice: string, monsterName?: string) {
    const params = new URLSearchParams(searchParams.toString())

    params.set('hd', hitDice)

    if (monsterName) {
      params.set('monster', monsterName)
    } else {
      params.delete('monster')
    }

    handleGetHitPoints(
      params.get('hd') as string,
      params.get('monster') as string | undefined,
    )

    router.push(`${pathname}/?${params.toString()}`)
  }

  useEffect(() => {
    const hd = searchParams.get('hd')
    const monster = searchParams.get('monster')
    if (hd) {
      handleGetHitPoints(
        hd as string,
        monster as string | undefined,
      )
    }

    if (hd) {
      document.title = generateTitle(monster ? [`${monster} (${hd})`] : [hd])
    }
  }, [searchParams])

  return (
    <>
      <div className="flex flex-col gap-16">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col items-center justify-center gap-8 w-full"
        >
          <HitDiceInput
            ref={inputRef}
            value={hitDice}
            onInput={handleHitDiceInput}
            className="w-full"
            inputHeaderEnd={
              <LaunchSearchMonstersButton
                onClick={handleLaunchSearchMonstersButtonClick}
              />
            }
          />

          <GetHitPointsButton
            dieType={dieType}
            disabled={!hitDice}
            type="submit"
          />
        </form>

        {hitPointResultsList.length === 0 ? (
          <HitPointResultsTable /> // Show empty table
        ) : (
          hitPointResultsList
            .slice(0, 1)
            .map((item, index) => (
              <HitPointResultsTable
                key={`${index}-${item.hitDice}`}
                dieType={item.dieType}
                hitDice={item.hitDice}
                hitPointResults={item.hitPointResults}
                monsterName={item.monsterName}
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
