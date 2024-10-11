import { useState, useEffect, useMemo, useCallback } from 'react'

type UseRotatingAnimatedTextsOptions = {
    rotateTextDelay?: number
    typeNextCharacterDelay?: number
    memoize?: boolean
    appendToText?: string
}

export const useRotatingAnimatedTexts = (texts: string[], options: UseRotatingAnimatedTextsOptions = {}) => {
    const [text, setText] = useState('')
    const [isRunning, setIsRunning] = useState(true)

    const stop = useCallback(() => {
        setIsRunning(false)
    }, [])

    const start = useCallback(() => {
        setIsRunning(true)
    }, [])

    useEffect(() => {
        if (!isRunning) return

        let currentCharacterIndexForCurrentText = 0
        let currentText = ''
        let timeoutId: NodeJS.Timeout
        let currentTextIndex = 0

        const typeNextCharacter = () => {
            if (!isRunning) return

            const nextText = texts[currentTextIndex % texts.length]

            if (currentCharacterIndexForCurrentText < nextText.length) {
                currentText += nextText[currentCharacterIndexForCurrentText]
                setText(`${currentText}${options.appendToText ?? ''}`)
                currentCharacterIndexForCurrentText++
                timeoutId = setTimeout(typeNextCharacter, options.typeNextCharacterDelay ?? 100)
            } else {
                setTimeout(() => {
                    setText(currentText)
                    currentCharacterIndexForCurrentText = 0
                    currentText = ''
                    currentTextIndex++
                    setTimeout(typeNextCharacter, options.rotateTextDelay ?? 2000)
                }, 500) // Small delay before removing the cursor // TODO: Parameterize this?
            }
        }

        typeNextCharacter()

        return () => clearTimeout(timeoutId)
    }, [texts, isRunning])

    const memoizedText = useMemo(() => text, [text])

    return { text: options.memoize ? memoizedText : text, stop, start }
}
