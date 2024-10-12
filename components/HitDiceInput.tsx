import React, { useState, useEffect } from 'react'
import { HIT_DICE_BY_MONSTER_EXAMPLES, HIT_DICE_REGEX } from '@/lib/constants'
import { Field, FieldProps, Input } from '@headlessui/react'
import { useRotatingAnimatedTexts } from '@/lib/hooks/useRotatingAnimatedTexts'
import clsx from 'clsx'

interface HitDiceInputProps extends FieldProps {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  inputHeaderEnd?: React.ReactNode
}

const HitDiceInput: React.FC<HitDiceInputProps> = ({
  value,
  onChange,
  inputHeaderEnd,
  className,
}) => {
  const [placeholderExample, setPlaceholderExample] = useState('')
  const [hasBeenFocused, setHasBeenFocused] = useState(false)

  const appendToRotatingAnimatedPlaceholderText = '|' // Fake cursor

  const {
    text: rotatingAnimatedPlaceholderText,
    stop: stopRotatingAnimatedPlaceholder,
    start: startRotatingAnimatedPlaceholder,
  } = useRotatingAnimatedTexts(Object.values(HIT_DICE_BY_MONSTER_EXAMPLES), {
    appendToText: appendToRotatingAnimatedPlaceholderText,
  })

  useEffect(() => {
    setPlaceholderExample(rotatingAnimatedPlaceholderText)
  }, [rotatingAnimatedPlaceholderText])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== '') {
      stopRotatingAnimatedPlaceholder()
    } else if (!hasBeenFocused) {
      startRotatingAnimatedPlaceholder()
    }

    if (onChange) {
      onChange(event)
    }
  }

  const handleFocus = () => {
    stopRotatingAnimatedPlaceholder()
    setPlaceholderExample((current) =>
      current.replace(appendToRotatingAnimatedPlaceholderText, ''),
    ) // Remove the fake cursor
    setHasBeenFocused(true)
  }

  const handleBlur = () => {
    startRotatingAnimatedPlaceholder()
  }

  const inputHeaderStyle = clsx(
    'flex items-baseline',
    inputHeaderEnd && 'justify-between',
    'text-sm',
  )

  return (
    <Field className={clsx('flex flex-col gap-4', className)}>
      <div className={inputHeaderStyle}>
        <label htmlFor="hit-dice-input">
          <span className="inline md:hidden">Enter HD</span>
          <span className="hidden md:inline">Enter some Hit Dice</span>
        </label>

        {inputHeaderEnd}
      </div>

      <Input
        id="hit-dice-input"
        type="text"
        placeholder={placeholderExample} // The dynamic placeholder for visual effect
        pattern={HIT_DICE_REGEX.source}
        value={value}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-label="Enter a Hit Dice expression like '2d6' or '2d8+6'"
      />
    </Field>
  )
}

export default HitDiceInput
