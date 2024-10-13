import React, { useEffect, useState } from 'react'

const Modal: React.FC<{
  isOpen?: boolean
  onClose: (hitDiceFromMonsterName?: string) => void
}> = ({ isOpen, onClose }) => {
  const [monsterName, setMonsterName] = useState('')

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
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onClose('2d6+2')
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    onClose()
  }

  return (
    <div
      className="fixed inset-0 p-4 backdrop-blur-sm bg-black bg-opacity-85 flex flex-col justify-start"
      onClick={handleBackdropClick}
    >
      <div className="main-layout">
        <div className="main-layout-content p-8 bg-white">
          <form onSubmit={handleSubmit}>
            <input
              type="search"
              value={monsterName}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMonsterName(e.target.value)
              }
              className="input"
            />

            <button type="submit" className="button">
              Done
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Modal
