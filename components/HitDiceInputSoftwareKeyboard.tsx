import React, { useState, useEffect, forwardRef, ForwardedRef } from 'react'
import clsx from 'clsx'
import {
  Field,
  Fieldset,
  Legend,
  Input,
  Select,
  Label,
} from '@headlessui/react'
import HitDiceInputHeader from '@/components/HitDiceInput/HitDiceInputHeader'
import { HIT_DICE_REGEX, parseHitDice } from 'roll-hit-dice'
import { HitDiceInputProps } from '@/components/HitDiceInput'

const HitDiceInputSoftwareKeyboard = forwardRef<
  HTMLInputElement,
  HitDiceInputProps
>(function HitDiceInputSoftwareKeyboard(
  { value, onInput, inputHeaderEnd, className },
  ref: ForwardedRef<HTMLInputElement>,
) {
  const [hitDiceCount, setHitDiceCount] = useState('')
  function handleHitDiceCount(event: React.ChangeEvent<HTMLInputElement>) {
    setHitDiceCount(event.target.value)
  }

  const [hitDiceType, setHitDiceType] = useState('')
  function handleHitDiceType(event: React.ChangeEvent<HTMLInputElement>) {
    setHitDiceType(event.target.value)
  }

  const [hitDiceModifierType, setHitDiceModifierType] = useState('+')
  function handleHitDiceModifierType(
    event: React.ChangeEvent<HTMLSelectElement>,
  ) {
    setHitDiceModifierType(event.target.value)
  }

  const [hitDiceModifier, setHitDiceModifier] = useState('')
  function handleHitDiceModifier(event: React.ChangeEvent<HTMLInputElement>) {
    setHitDiceModifier(event.target.value)
  }

  useEffect(() => {
    const parts = [
      hitDiceCount,
      'd',
      hitDiceType,
      hitDiceModifierType,
      hitDiceModifier,
    ]
    const expression = parts.join('')
    if (HIT_DICE_REGEX.test(expression)) {
      onInput(expression)
    }
  }, [hitDiceModifier, hitDiceModifierType, hitDiceCount, hitDiceType, onInput])

  useEffect(() => {
    if (value) {
      const { diceCount, dieType, modifier } = parseHitDice(value)
      setHitDiceCount(diceCount.toString())
      setHitDiceType(dieType.toString())
      setHitDiceModifierType(modifier < 0 ? '-' : '+')
      setHitDiceModifier(Math.abs(modifier).toString())
    } else {
      resetInputs()
    }
  }, [value])

  function resetInputs() {
    setHitDiceCount('')
    setHitDiceType('')
    setHitDiceModifierType('+')
    setHitDiceModifier('')
  }

  return (
    <Fieldset className={clsx('max-w-full flex flex-col gap-4', className)}>
      <HitDiceInputHeader
        inputHeaderEnd={inputHeaderEnd}
        label={<Legend>Enter Hit Dice</Legend>}
      />

      <div className="flex items-baseline justify-between gap-0">
        <Field className="min-w-[3ch]">
          <Input
            name="hit-dice-number"
            inputMode="numeric"
            value={hitDiceCount}
            ref={ref}
            onInput={handleHitDiceCount}
            className="w-full input-xl input-open-end text-right"
          />
          <Label className="sr-only">#</Label>
        </Field>

        <span className="flex-none px-[0.5ch] text-4xl md:text-5xl">d</span>

        <Field className="min-w-[2ch]">
          <Input
            name="hit-dice-type"
            inputMode="numeric"
            value={hitDiceType}
            onInput={handleHitDiceType}
            className="w-full input-xl input-open-start-end"
          />
          <Label className="sr-only">Type</Label>
        </Field>

        <Field className="flex-none">
          <Select
            name="hit-dice-modifier-type"
            value={hitDiceModifierType}
            onChange={handleHitDiceModifierType}
            className="px-[0.5ch] text-4xl md:text-5xl appearance-none bg-transparent focus-visible:outline-none text-neutral-400 focus-visible:text-black"
          >
            <option value="+">+</option>
            <option value="-">-</option>
          </Select>
        </Field>

        <Field className="min-w-[4ch]">
          <Input
            name="hit-dice-modifier"
            inputMode="numeric"
            value={hitDiceModifier}
            onInput={handleHitDiceModifier}
            className="w-full input-xl input-open-start"
          />
          <Label className="sr-only">Mod.</Label>
        </Field>
      </div>
    </Fieldset>
  )
})

export default HitDiceInputSoftwareKeyboard
