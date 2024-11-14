import React, {
  useState,
  useEffect,
  forwardRef,
  ForwardedRef,
  useRef,
} from 'react'
import { HIT_DICE_BY_MONSTER_EXAMPLES } from '@/lib/constants'
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
import { HIT_DICE_REGEX } from 'roll-hit-dice'

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
    // region Software keyboard
    const hitDiceNumInputRef = useRef<HTMLInputElement>(null)
    const [showInputsForSoftwareKeyboard, setShowInputsForSoftwareKeyboard] =
      useState(false)

    const [
      hitDiceNumFromSoftwareKeyboardInput,
      setHitDiceNumFromSoftwareKeyboardInput,
    ] = useState('')
    function handleHitDiceNumFromSoftwareKeyboardInput(
      event: React.ChangeEvent<HTMLInputElement>,
    ) {
      setHitDiceNumFromSoftwareKeyboardInput(event.target.value)
    }

    const [
      hitDiceTypeFromSoftwareKeyboardInput,
      setHitDiceTypeFromSoftwareKeyboardInput,
    ] = useState('')
    function handleHitDiceTypeFromSoftwareKeyboardInput(
      event: React.ChangeEvent<HTMLInputElement>,
    ) {
      setHitDiceTypeFromSoftwareKeyboardInput(event.target.value)
    }

    const [
      hitDiceModifierTypeFromSoftwareKeyboardInput,
      setHitDiceModifierTypeFromSoftwareKeyboardInput,
    ] = useState('+')
    function handleHitDiceModifierTypeFromSoftwareKeyboardInput(
      event: React.ChangeEvent<HTMLSelectElement>,
    ) {
      setHitDiceModifierTypeFromSoftwareKeyboardInput(event.target.value)
    }

    const [
      hitDiceModifierFromSoftwareKeyboardInput,
      setHitDiceModifierFromSoftwareKeyboardInput,
    ] = useState('')
    function handleHitDiceModifierFromSoftwareKeyboardInput(
      event: React.ChangeEvent<HTMLInputElement>,
    ) {
      setHitDiceModifierFromSoftwareKeyboardInput(event.target.value)
    }

    useEffect(() => {
      const parts = [
        hitDiceNumFromSoftwareKeyboardInput,
        'd',
        hitDiceTypeFromSoftwareKeyboardInput,
        hitDiceModifierTypeFromSoftwareKeyboardInput,
        hitDiceModifierFromSoftwareKeyboardInput,
      ]
      const expression = parts.join('')
      if (HIT_DICE_REGEX.test(expression)) {
        onInput(expression)
      }
    }, [
      hitDiceModifierFromSoftwareKeyboardInput,
      hitDiceModifierTypeFromSoftwareKeyboardInput,
      hitDiceNumFromSoftwareKeyboardInput,
      hitDiceTypeFromSoftwareKeyboardInput,
      onInput,
    ])

    useEffect(() => {
      if (showInputsForSoftwareKeyboard) {
        hitDiceNumInputRef.current?.focus()
      }
    }, [showInputsForSoftwareKeyboard])

    useEffect(() => {
      if (inputResetAt) {
        resetInputsForSoftwareKeyboard()
        setShowInputsForSoftwareKeyboard(false)
      }
    }, [inputResetAt, ref])
    function resetInputsForSoftwareKeyboard() {
      setShowInputsForSoftwareKeyboard(false)
      setHitDiceNumFromSoftwareKeyboardInput('')
      setHitDiceTypeFromSoftwareKeyboardInput('')
      setHitDiceModifierTypeFromSoftwareKeyboardInput('+')
      setHitDiceModifierFromSoftwareKeyboardInput('')
    }
    // endregion

    // region Combined input
    const combinedInputRef = ref

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
      if (isLikelyToShowSoftwareKeyboard) {
        setShowInputsForSoftwareKeyboard(true)
      }
      setIsTypingPaused(true)
      setPlaceholderExample((current) => current.replace('|', '')) // Remove the fake cursor
      if (!hasBeenFocused) setHasBeenFocused(true)
    }
    // endregion

    const containerClasses = clsx('max-w-full flex flex-col gap-4', className)

    return showInputsForSoftwareKeyboard ? (
      <Fieldset className={containerClasses}>
        <HitDiceInputHeader
          inputHeaderEnd={inputHeaderEnd}
          label={<Legend>Enter Hit Dice</Legend>}
        />

        <div className="flex items-baseline justify-between gap-1">
          <Field className="min-w-[3ch]">
            <Input
              name="hit-dice-number"
              inputMode="numeric"
              value={hitDiceNumFromSoftwareKeyboardInput}
              ref={hitDiceNumInputRef}
              onInput={handleHitDiceNumFromSoftwareKeyboardInput}
              className="w-full input-xl text-right"
            />
            <Label className="sr-only">#</Label>
          </Field>

          <span className="flex-none text-4xl md:text-5xl">d</span>

          <Field className="min-w-[2ch]">
            <Input
              name="hit-dice-type"
              inputMode="numeric"
              value={hitDiceTypeFromSoftwareKeyboardInput}
              onInput={handleHitDiceTypeFromSoftwareKeyboardInput}
              className="w-full input-xl"
            />
            <Label className="sr-only">Type</Label>
          </Field>

          <Field className="flex-none">
            <Select
              name="hit-dice-modifier-type"
              onChange={handleHitDiceModifierTypeFromSoftwareKeyboardInput}
              className="text-4xl md:text-5xl appearance-none bg-transparent focus-visible:outline-none text-neutral-400 focus-visible:text-black"
            >
              <option value="+">+</option>
              <option value="-">-</option>
            </Select>
          </Field>

          <Field className="min-w-[4ch]">
            <Input
              name="hit-dice-modifier"
              inputMode="numeric"
              value={hitDiceModifierFromSoftwareKeyboardInput}
              onInput={handleHitDiceModifierFromSoftwareKeyboardInput}
              className="w-full input-xl"
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
          ref={combinedInputRef}
          id="hit-dice-input"
          type="text"
          placeholder={placeholderExample}
          value={value}
          onInput={handleInputFromCombinedInput}
          onFocus={handleFocusFromCombinedInput}
          aria-label="Enter a Hit Dice expression like '2d6' or '2d8+6'"
          className="w-full input-xl"
        />
      </Field>
    )
  },
)

export default HitDiceInput
