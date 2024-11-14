import React, { useState, useEffect, forwardRef, ForwardedRef } from 'react'
import { HIT_DICE_BY_MONSTER_EXAMPLES, HIT_DICE_REGEX } from '@/lib/constants'
import clsx from 'clsx'
import {
  Field,
  Fieldset,
  Legend,
  Input,
  Select,
  Label,
} from '@headlessui/react'
import { isLikelyToShowSoftwareKeyboard } from '@/lib/utils/is-likely-to-use-touch-keyboard'
import HitDiceInputHeader from '@/components/HitDiceInput/HitDiceInputHeader'

interface HitDiceInputProps {
  value?: string
  className?: string
  onInput: (input: string) => void
  inputHeaderEnd?: React.ReactNode
  inputResetAt?: Date
}

const placeholderExamples = Object.values(HIT_DICE_BY_MONSTER_EXAMPLES)

const HitDiceInput = forwardRef<HTMLInputElement, HitDiceInputProps>(
  function HitDiceInput(
    { value, onInput, inputHeaderEnd, className, inputResetAt },
    ref: ForwardedRef<HTMLInputElement>,
  ) {
    const [placeholderExample, setPlaceholderExample] = useState('')
    const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0)
    const [isTypingPaused, setIsTypingPaused] = useState(false)
    const [hasBeenFocused, setHasBeenFocused] = useState(false)

    // region Software keyboard
    const [showInputsForSoftwareKeyboard, setShowInputsForSoftwareKeyboard] =
      useState(false)
    const [
      hitDiceNumFromSoftwareKeyboardInput,
      setHitDiceNumFromSoftwareKeyboardInput,
    ] = useState('')
    const [
      hitDiceTypeFromSoftwareKeyboardInput,
      setHitDiceTypeFromSoftwareKeyboardInput,
    ] = useState('')
    const [
      hitDiceModifierTypeFromSoftwareKeyboardInput,
      setHitDiceModifierTypeFromSoftwareKeyboardInput,
    ] = useState('+')
    const [
      hitDiceModifierFromSoftwareKeyboardInput,
      setHitDiceModifierFromSoftwareKeyboardInput,
    ] = useState('')

    useEffect(() => {
      const parts = [
        hitDiceNumFromSoftwareKeyboardInput,
        'd',
        hitDiceTypeFromSoftwareKeyboardInput,
        hitDiceModifierTypeFromSoftwareKeyboardInput,
        hitDiceModifierFromSoftwareKeyboardInput,
      ]
      const expression = parts.join('')
      console.log('expression', expression)
      if (HIT_DICE_REGEX.test(expression)) {
        onInput(expression)
      }
    }, [
      hitDiceModifierFromSoftwareKeyboardInput,
      hitDiceModifierTypeFromSoftwareKeyboardInput,
      hitDiceNumFromSoftwareKeyboardInput,
      hitDiceTypeFromSoftwareKeyboardInput,
    ])

    useEffect(() => {
      if (inputResetAt) {
        setShowInputsForSoftwareKeyboard(false)
      }
    }, [inputResetAt])
    // endregion

    useEffect(() => {
      if (hasBeenFocused) return // Stop all animated typing after the first focus

      let charIndex = 0
      let currentPlaceholder = ''
      let timeoutId: NodeJS.Timeout
      let blinkTimeoutId: NodeJS.Timeout

      const displayNextPlaceholder = (nextExample: string) => {
        charIndex = 0
        currentPlaceholder = ''
        let isBlinking = false

        const typeNextLetter = () => {
          if (isTypingPaused) return

          if (charIndex < nextExample.length) {
            currentPlaceholder += nextExample[charIndex]
            setPlaceholderExample(`${currentPlaceholder}|`)
            charIndex++
            timeoutId = setTimeout(typeNextLetter, 75)
          } else {
            startBlinkingCursor()
          }
        }

        const startBlinkingCursor = () => {
          blinkTimeoutId = setInterval(() => {
            if (isTypingPaused) return

            if (isBlinking) {
              setPlaceholderExample(`${currentPlaceholder}|`)
            } else {
              setPlaceholderExample(currentPlaceholder)
            }
            isBlinking = !isBlinking
          }, 500)
        }

        const clearIntervals = () => {
          clearTimeout(timeoutId)
          clearInterval(blinkTimeoutId)
        }

        typeNextLetter()

        return clearIntervals
      }

      const rotatePlaceholders = () => {
        const nextIndex =
          (currentPlaceholderIndex + 1) % placeholderExamples.length
        setCurrentPlaceholderIndex(nextIndex)
      }

      displayNextPlaceholder(placeholderExamples[currentPlaceholderIndex])

      const rotatePlaceholdersInterval = setInterval(() => {
        if (isTypingPaused) return
        rotatePlaceholders()
      }, 4500)

      return () => {
        clearInterval(rotatePlaceholdersInterval)
        clearTimeout(timeoutId)
        clearInterval(blinkTimeoutId)
      }
    }, [currentPlaceholderIndex, isTypingPaused, hasBeenFocused])

    const handleInputFromCombinedInput = (
      event: React.ChangeEvent<HTMLInputElement>,
    ) => {
      const newValue = event.target.value
      if (onInput) onInput(newValue)
      if (newValue !== '') {
        setIsTypingPaused(true)
      } else if (!hasBeenFocused) {
        setIsTypingPaused(false)
      }
    }

    const handleFocusFromCombinedInput = () => {
      console.log(
        'isLikelyToShowSoftwareKeyboard',
        isLikelyToShowSoftwareKeyboard,
      )

      if (isLikelyToShowSoftwareKeyboard) {
        setShowInputsForSoftwareKeyboard(true)
      }
      setIsTypingPaused(true)
      setPlaceholderExample((current) => current.replace('|', '')) // Remove the fake cursor
      if (!hasBeenFocused) setHasBeenFocused(true)
    }

    const containerClasses = clsx('max-w-full flex flex-col gap-4', className)

    return (
      <div>
        {showInputsForSoftwareKeyboard ? (
          <Fieldset className={containerClasses}>
            <HitDiceInputHeader
              inputHeaderEnd={inputHeaderEnd}
              label={<Legend>Enter Hit Dice</Legend>}
            />

            <div className="flex items-baseline gap-1">
              <Field>
                <Input
                  inputMode="numeric"
                  value={hitDiceNumFromSoftwareKeyboardInput}
                  onInput={(event) =>
                    setHitDiceNumFromSoftwareKeyboardInput(event.target.value)
                  }
                  className="input-xl w-[3ch]"
                />
                <Label className="sr-only">#</Label>
              </Field>

              <span className="text-4xl md:text-5xl">d</span>

              <Field>
                <Input
                  inputMode="numeric"
                  value={hitDiceTypeFromSoftwareKeyboardInput}
                  onInput={(event) =>
                    setHitDiceTypeFromSoftwareKeyboardInput(event.target.value)
                  }
                  className="input-xl w-[3ch]"
                />
                <Label className="sr-only">Type</Label>
              </Field>

              <Field>
                <Select
                  name="hit-dice-modifier-type"
                  onChange={(event) =>
                    setHitDiceModifierTypeFromSoftwareKeyboardInput(
                      event.target.value,
                    )
                  }
                  className="text-4xl md:text-5xl"
                >
                  <option value="+">+</option>
                  <option value="-">-</option>
                </Select>
              </Field>

              <Field>
                <Input
                  value={hitDiceModifierFromSoftwareKeyboardInput}
                  onInput={(event) =>
                    setHitDiceModifierFromSoftwareKeyboardInput(
                      event.target.value,
                    )
                  }
                  className="input-xl max-w-[4ch]"
                />
                <Label className="sr-only">Mod.</Label>
              </Field>
            </div>
          </Fieldset>
        ) : (
          <Field className={containerClasses}>
            <HitDiceInputHeader
              inputHeaderEnd={inputHeaderEnd}
              label={<Label htmlFor="hit-dice-input">Enter Hit Dice</Label>}
            />

            <Input
              ref={ref}
              id="hit-dice-input"
              type="text"
              placeholder={placeholderExample}
              pattern={HIT_DICE_REGEX.source}
              value={value}
              onInput={handleInputFromCombinedInput}
              onFocus={handleFocusFromCombinedInput}
              aria-label="Enter a Hit Dice expression like '2d6' or '2d8+6'"
              className="w-full input-xl"
            />
          </Field>
        )}
      </div>
    )
  },
)

export default HitDiceInput
