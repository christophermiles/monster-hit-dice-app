export function setToStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function getFromStorage<T>(key: string): T | undefined {
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item) : undefined
}
