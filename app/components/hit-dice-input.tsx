import React, {useState, useEffect, ChangeEvent} from 'react'
import {HIT_DICE_REGEX} from "@/app/constants";

interface HitDiceInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    value: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void // Accept the entire event
}

const HitDiceInput: React.FC<HitDiceInputProps> = ({ value, onChange }) => {
    const placeholderExamples = ['2d6', '2d8-2', '2d8+6', '8d10+40', '33d10+330']
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
                if (isTypingPaused || hasBeenFocused) return // Stop typing if paused or focused

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
                    if (isTypingPaused || hasBeenFocused) return // Stop blinking if paused or focused

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
            if (isTypingPaused || hasBeenFocused) return // Don't rotate if paused or focused
            const nextIndex = (currentPlaceholderIndex + 1) % placeholderExamples.length
            setCurrentPlaceholderIndex(nextIndex)
        }

        displayNextPlaceholder(placeholderExamples[currentPlaceholderIndex])

        const rotatePlaceholdersInterval = setInterval(() => {
            rotatePlaceholders()
        }, 3000)

        return () => {
            clearInterval(rotatePlaceholdersInterval)
            clearTimeout(timeoutId)
            clearInterval(blinkTimeoutId)
        }
    }, [currentPlaceholderIndex, isTypingPaused, hasBeenFocused]) // Add dependencies

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value
        onChange(event)
        if (newValue !== '') {
            setIsTypingPaused(true) // Pause typing when there is input
        } else if (!hasBeenFocused) {
            setIsTypingPaused(false) // Resume typing if the input is cleared and not focused
        }
    }

    const handleFocus = () => {
        setIsTypingPaused(true) // Pause typing when input is focused
        setPlaceholderExample((current) => current.replace('|', '')) // Remove the fake cursor
        setHasBeenFocused(true) // Indicate that input has been focused, stopping further animations
    }

    const handleBlur = () => {
        if (value === '' && !hasBeenFocused) {
            setIsTypingPaused(false) // Resume typing if input is blurred and empty and hasn't been focused before
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-baseline justify-between text-sm">
                <label for="hit-dice-input">
                    Enter some Hit Dice
                </label>

                <button className="link">Search monsters (Cmd-K)</button>
            </div>

            <input
                id="hit-dice-input"
                type="text"
                placeholder={placeholderExample}  // The dynamic placeholder for visual effect
                value={value}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                aria-label="Enter a Hit Dice expression like '2d6' or '2d8+6'"
                pattern={HIT_DICE_REGEX.source}
                className="input flex-auto p-2 text-5xl"
            />
        </div>
    )
}

export default HitDiceInput
