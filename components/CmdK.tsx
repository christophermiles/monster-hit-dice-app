import React from 'react'
import clsx from 'clsx'
import { useBrowserInfo } from '@/lib/hooks/useBrowserInfo'
import './CmdK.css'

interface CmdKProps extends React.HTMLAttributes<HTMLSpanElement> {
  border?: boolean
}

const CmdK: React.FC<CmdKProps> = ({ border, className }) => {
  const { osName } = useBrowserInfo()

  return (
    <span className={clsx('cmd-k', className)} data-bordered={border}>
      {osName === 'macOS' ? (
        <span className="cmd-key">⌘</span>
      ) : (
        <span className="ctrl-key">Ctrl</span>
      )}
      <span>K</span>
    </span>
  )
}

export default CmdK
