'use client'
import dynamic from 'next/dynamic'
import {useEffect, useState} from 'react'
import DiceIcon from "@/app/components/dice-icon";
import {Transition} from "@headlessui/react";

const HitDiceInput = dynamic(() => import('@/app/components/hit-dice-input'), {
    ssr: false, // Disable server-side rendering for this component to use platform detection via frowser
})

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
            <div className="fixed inset-0 bg-gray-800 opacity-90 p-4 flex flex-col items-center justify-center">
                <input
                    type="search"
                    value={monsterName}
                    onChange={(e) => setMonsterName(e.target.value)}
                    className="opacity-100"
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
        <>
            <div className="flex flex-col gap-16">
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="flex flex-col items-center justify-center gap-8 w-full"
                >
                    <HitDiceInput
                        value={hitDiceExpression}
                        onChange={(e) => setHitDiceExpression(e.target.value)}
                        onFindHitDiceByMonster={() => setShowMonsterSearch(true)}
                        className="w-full"
                    />

                    <button
                        disabled={!hitDiceExpression}
                        id="get-hp-button"
                    >
                        <DiceIcon icon="dx" />
                        <span>Get Hit Points</span>
                    </button>
                </form>

                <table className="hit-point-results-table">
                    <thead>
                    <tr>
                        <th colspan="5">Hit Dice _____</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr>
                        <th>Min.</th>
                        <th></th>
                        <th>Avg.</th>
                        <th></th>
                        <th>Max.</th>
                    </tr>
                    </tfoot>
                </table>
            </div>

            <Transition show={showMonsterSearch} as="div">
                <Modal
                    isOpen={showMonsterSearch} onClose={() => setShowMonsterSearch(false)}
                />
            </Transition>
        </>
    )
}