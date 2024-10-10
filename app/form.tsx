'use client'
import HitDiceInput from "@/app/hit-dice-input";
import {useEffect, useState} from 'react'
import DiceIcon from "@/app/dice-icon";

export default function HitDiceForm() {

    const [showMonsterSearch, setShowMonsterSearch] = useState(false)
    const [hitDiceExpression, setHitDiceExpression] = useState('')
    const [monsterName, setMonsterName] = useState('')

    const Modal = ({ isOpen, onClose }: {isOpen: boolean; onClose: () => void}) => {
        useEffect(() => {
            const handleEscapeKey = (event: KeyboardEvent) => {
                if (event.key === 'Escape') {
                    onClose()
                }
            }

            if (isOpen) {
                window.addEventListener('keydown', handleEscapeKey);
            }

            return () => {
                window.removeEventListener('keydown', handleEscapeKey)
            }
        }, [isOpen, onClose])

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 bg-slate-800 p-4 flex flex-col items-center justify-center">
                <input
                    type="search"
                    value={monsterName}
                    onChange={(e) => setMonsterName(e.target.value)}
                />
            </div>
        );
    };

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

    return (
        <div>
            <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col items-center justify-center gap-8 w-full"
            >
                <HitDiceInput
                    value={hitDiceExpression}
                    onChange={(e) => setHitDiceExpression(e)}
                    className="w-full"
                />

                <button
                    disabled={!hitDiceExpression}
                    className="pl-4 pr-8 py-2 flex gap-2 items-center bg-black text-white dark:invert text-2xl"
                >
                    <DiceIcon icon="dx" className="w-16 h-16"/>
                    <span>Generate</span>
                </button>
            </form>

            <Modal isOpen={showMonsterSearch} onClose={() => setShowMonsterSearch(false)}/>
        </div>
    )
}