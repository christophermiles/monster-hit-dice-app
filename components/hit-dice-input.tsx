'use client'

import React, {useState, useEffect, ChangeEvent} from 'react'
import {HIT_DICE_REGEX} from "@/app/constants";
import { Field, Input } from '@headlessui/react'
import frowser from 'frowser'

interface HitDiceInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    value: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    onFindHitDiceByMonster: () => void
}

const browser = frowser.getParser(navigator.userAgent)

const HitDiceInput: React.FC<HitDiceInputProps> = ({ value, onChange, onFindHitDiceByMonster }) => {
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
        <Field className="flex flex-col gap-4">
            <div className="flex items-baseline justify-between text-sm">
                <label for="hit-dice-input">
                    <span className="inline md:hidden">Enter HD</span>
                    <span className="hidden md:inline">Enter some Hit Dice</span>
                </label>

                <button
                    id="search-monsters-button"
                    className="flex items-baseline gap-2"
                    aria-label="Get Hit Dice by monster name"
                    onClick={onFindHitDiceByMonster}
                >
                    <span>Search monsters</span>

                    {browser.getPlatform().type === 'desktop' &&
                        <span className="flex items-baseline gap-0.5 font-semibold font-sans">
                            {browser.getOSName() === 'macOS' ? <span className="cmd-key">⌘</span> :
                                <span className="ctrl-key">Ctrl</span>}
                            <span>K</span>
                        </span>
                    }
                </button>
            </div>

            <Input
                id="hit-dice-input"
                type="text"
                placeholder={placeholderExample}  // The dynamic placeholder for visual effect
                pattern={HIT_DICE_REGEX.source}
                value={value}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                aria-label="Enter a Hit Dice expression like '2d6' or '2d8+6'"
                className="w-full"
            />
        </Field>
    )
}

export default HitDiceInput