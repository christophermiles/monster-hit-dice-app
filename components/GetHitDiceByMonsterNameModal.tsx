import React, { useEffect } from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
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

  return (
    <Dialog open={isOpen} onClose={() => onClose()} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/80 backdrop-blur-sm" />

      <div className="fixed inset-0 flex flex-col items-center justify-start">
        <div className="main-layout">
          <DialogPanel className="main-layout-content max-h-screen py-12">
            <SearchMonstersCombobox
              onHitDiceObtained={({
                hitDice,
                monsterName,
              }: {
                hitDice: string
                monsterName?: string
              }) => onClose(hitDice, monsterName)}
              className="bg-white pt-6 px-4 pb-8 max-h-full w-full"
            />
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default Modal
