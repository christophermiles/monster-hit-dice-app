import { useState, useEffect } from 'react'
import frowser from 'frowser'

export function useBrowserInfo() {
  const [browserInfo, setBrowserInfo] = useState({
    osName: '',
    platformType: '',
  })

  useEffect(() => {
    const browser = frowser.getParser(navigator.userAgent)
    setBrowserInfo({
      osName: browser.getOSName() || '',
      platformType: browser.getPlatform().type || '',
    })
  }, [])

  return browserInfo
}
