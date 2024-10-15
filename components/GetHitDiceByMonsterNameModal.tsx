import React, { useEffect } from 'react'
import SearchMonstersCombobox from '@/components/SearchMonstersCombobox'

interface GetHitDiceByMonsterNameModalProps
  extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean
  onClose: (hitDiceFromMonsterName?: string, monsterName?: string) => void
}

const Modal: React.FC<GetHitDiceByMonsterNameModalProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleEscapeKey)
    }

    return () => {
      window.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    onClose()
  }

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-85 flex flex-col justify-start"
      onClick={handleBackdropClick}
    >
      <div
        className="main-layout"
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          e.stopPropagation() // Prevent input clicks from closing the backdrop
        }}
      >
        <div className="main-layout-content max-h-screen py-12">
          <SearchMonstersCombobox
            onHitDiceObtained={({ hitDice, monsterName}: { hitDice: string; monsterName?: string }) => onClose(hitDice, monsterName)}
            className="bg-white p-4 max-h-full w-full"
          />
        </div>
      </div>
    </div>
  )
}

export default Modal