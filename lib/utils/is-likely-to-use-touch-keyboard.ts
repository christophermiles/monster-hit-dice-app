const userAgent =
  typeof navigator === 'undefined' ? '' : navigator.userAgent.toLowerCase()
const isMobileUA = /iphone|ipad|android|mobile/.test(userAgent)
const isTouchDevice =
  typeof window === 'undefined' || typeof navigator === 'undefined'
    ? undefined
    : 'ontouchstart' in window || navigator.maxTouchPoints > 0

export const isLikelyToShowSoftwareKeyboard = isMobileUA && isTouchDevice
