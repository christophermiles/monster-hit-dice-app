import React, { useState, useEffect } from 'react'
import { HIT_DICE_BY_MONSTER_EXAMPLES, HIT_DICE_REGEX } from '@/lib/constants'
import { Field, FieldProps, Input } from '@headlessui/react'
import clsx from 'clsx'
import './HitDiceInput.css'

interface HitDiceInputProps extends FieldProps {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  inputHeaderEnd?: React.ReactNode
}

const HitDiceInput: React.FC<HitDiceInputProps> = ({
  value,
  onInput,
  inputHeaderEnd,
  className,
}) => {
  const placeholderExamples = Object.values(HIT_DICE_BY_MONSTER_EXAMPLES)
  const [placeholderExample, setPlaceholderExample] = useState('')
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0)
  const [isTypingPaused, setIsTypingPaused] = useState(false) // To track typing pause state
  const [hasBeenFocused, setHasBeenFocused] = useState(false) // To track if input was ever focused

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
          timeoutId = setTimeout(typeNextLetter, 100)
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
    }, 3000)

    return () => {
      clearInterval(rotatePlaceholdersInterval)
      clearTimeout(timeoutId)
      clearInterval(blinkTimeoutId)
    }
  }, [currentPlaceholderIndex, isTypingPaused, hasBeenFocused]) // Add dependencies

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    if (onInput) onInput(event)
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

  const inputHeaderStyle = clsx(
    'flex items-baseline',
    inputHeaderEnd && 'justify-between',
    'text-sm',
  )

  return (
    <Field className={clsx('flex flex-col gap-4', className)}>
      <div className={inputHeaderStyle}>
        <label htmlFor="hit-dice-input">Enter Hit Dice</label>

        {inputHeaderEnd}
      </div>

      <Input
        id="hit-dice-input"
        type="text"
        placeholder={placeholderExample} // The dynamic placeholder for visual effect
        pattern={HIT_DICE_REGEX.source}
        value={value}
        onInput={handleInput}
        onFocus={handleFocus}
        aria-label="Enter a Hit Dice expression like '2d6' or '2d8+6'"
        className={clsx('input placeholder-gray-200')}
      />
    </Field>
  )
}

export default HitDiceInput
