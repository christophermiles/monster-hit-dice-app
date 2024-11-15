import React, { useState, useEffect, forwardRef, ForwardedRef } from 'react'
import { HIT_DICE_BY_MONSTER_EXAMPLES } from '@/lib/constants'
import clsx from 'clsx'
import { Field, Input, Label } from '@headlessui/react'
import HitDiceInputHeader from '@/components/HitDiceInput/HitDiceInputHeader'

export interface HitDiceInputProps {
  value?: string
  className?: string
  onInput: (input: string) => void
  inputHeaderEnd?: React.ReactNode
}

const placeholderExamples = Object.values(HIT_DICE_BY_MONSTER_EXAMPLES)

const HitDiceInput = forwardRef<HTMLInputElement, HitDiceInputProps>(
  function HitDiceInput(
    { value, onInput, inputHeaderEnd, className },
    ref: ForwardedRef<HTMLInputElement>,
  ) {
    const [hasBeenFocused, setHasBeenFocused] = useState(false)

    const [placeholderExample, setPlaceholderExample] = useState('')
    const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0)
    const [isTypingPaused, setIsTypingPaused] = useState(false)

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

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      if (onInput) onInput(newValue)
      if (newValue !== '') {
        setIsTypingPaused(true)
      } else if (!hasBeenFocused) {
        setIsTypingPaused(false)
      }
    }

    const handleFocus = () => {
      setIsTypingPaused(true)
      setPlaceholderExample((current) => current.replace('|', '')) // Remove the fake cursor
      if (!hasBeenFocused) setHasBeenFocused(true)
    }
    // endregion

    return (
      <Field className={clsx('max-w-full flex flex-col gap-4', className)}>
        <HitDiceInputHeader
          inputHeaderEnd={inputHeaderEnd}
          label={<Label htmlFor="hit-dice-input">Enter Hit Dice</Label>}
        />

        <Input
          ref={ref}
          id="hit-dice-input"
          type="text"
          placeholder={placeholderExample}
          value={value}
          onInput={handleInput}
          onFocus={handleFocus}
          aria-label="Enter a Hit Dice expression like '2d6' or '2d8+6'"
          className="w-full input-xl input-enclosed"
        />
      </Field>
    )
  },
)

export default HitDiceInput
