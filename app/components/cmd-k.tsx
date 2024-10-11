'use client'

import frowser from 'frowser'


const browser = frowser.getParser(navigator.userAgent)

export default function CmdK() {
    return (
        <span className="px-1 py-0.5 border border-gray-100 rounded-md">
            { browser.getOSName() === 'macOS'
                ? <span className="cmd-key">⌘</span>
                : <span className="ctrl-key">Ctrl</span>
            }
            K
        </span>

    )
}