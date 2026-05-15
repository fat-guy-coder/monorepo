const ACCESS_TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'

export interface TokenPayload {
  userId: string
  username: string
  exp?: number
}

// Decode JWT payload (without verification - for reading expiry only)
function decodePayload(token: string): TokenPayload | null {
  try {
    const [, payload] = token.split('.')
    if (!payload) return null
    return JSON.parse(atob(payload.replace(/=/g, '')))
  } catch {
    return null
  }
}

// Check if token is expired
function isTokenExpired(token: string): boolean {
  const payload = decodePayload(token)
  if (!payload?.exp) return true
  return payload.exp * 1000 < Date.now()
}

// Save tokens
export function saveTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
}

// Get access token
export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

// Get refresh token
export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

// Clear tokens
export function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

// Check if access token is valid (exists and not expired)
export function isAccessTokenValid(): boolean {
  const token = getAccessToken()
  if (!token) return false
  return !isTokenExpired(token)
}

// Check if refresh token is valid
export function isRefreshTokenValid(): boolean {
  const token = getRefreshToken()
  if (!token) return false
  return !isTokenExpired(token)
}

// Get current user info from token
export function getTokenPayload(): TokenPayload | null {
  const token = getAccessToken()
  if (!token) return null
  return decodePayload(token)
}

// Store user info (basic, without sensitive data)
export function saveUserInfo(user: { id: string; username: string }) {
  localStorage.setItem('user_info', JSON.stringify(user))
}

// Get stored user info
export function getUserInfo(): { id: string; username: string } | null {
  const info = localStorage.getItem('user_info')
  if (!info) return null
  try {
    return JSON.parse(info)
  } catch {
    return null
  }
}

export const tokenManager = {
  saveTokens,
  getAccessToken,
  getRefreshToken,
  clearTokens,
  isAccessTokenValid,
  isRefreshTokenValid,
  getTokenPayload,
  saveUserInfo,
  getUserInfo,
}