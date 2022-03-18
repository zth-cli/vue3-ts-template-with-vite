export function getStorge(name: string): string {
  return sessionStorage.getItem(name)
}

export function setStorge(name: string, token: string): void {
  sessionStorage.setItem(name, token)
}

export function removeStorge(name: string) {
  return sessionStorage.removeItem(name)
}

export function removeAllStorge(): void {
  return sessionStorage.clear()
}
