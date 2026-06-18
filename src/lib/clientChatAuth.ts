const CLIENT_TOKEN_KEY = 'msadvocate_client_token'

export function getClientToken(): string | null {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem(CLIENT_TOKEN_KEY)
}

export function setClientToken(token: string): void {
  window.localStorage.setItem(CLIENT_TOKEN_KEY, token)
}

export function clearClientToken(): void {
  window.localStorage.removeItem(CLIENT_TOKEN_KEY)
}
