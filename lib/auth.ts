export type AuthUser = {
  id: string
  email: string
  name: string
  role: "admin"
}

const STORAGE_KEY = "callinggen_auth_state"
const STORAGE_MODE_KEY = "callinggen_auth_storage_mode"

const DUMMY_CREDENTIALS = {
  email: "admin@callinggen.ai",
  password: "admin123",
}

export interface AuthService {
  authenticate(email: string, password: string, rememberMe: boolean): Promise<AuthUser>
  restoreSession(): AuthUser | null
  persistSession(user: AuthUser, rememberMe: boolean): void
  clearSession(): void
}

class DummyAuthService implements AuthService {
  async authenticate(email: string, password: string, rememberMe: boolean): Promise<AuthUser> {
    await new Promise((resolve) => setTimeout(resolve, 900))

    if (
      email.trim().toLowerCase() === DUMMY_CREDENTIALS.email &&
      password === DUMMY_CREDENTIALS.password
    ) {
      return {
        id: "admin-001",
        email: DUMMY_CREDENTIALS.email,
        name: "Admin User",
        role: "admin",
      }
    }

    throw new Error("Invalid credentials.")
  }

  restoreSession(): AuthUser | null {
    if (typeof window === "undefined") {
      return null
    }

    const localState = window.localStorage.getItem(STORAGE_KEY)
    const sessionState = window.sessionStorage.getItem(STORAGE_KEY)
    const rawState = localState ?? sessionState

    if (!rawState) {
      return null
    }

    try {
      const parsed = JSON.parse(rawState) as { user?: AuthUser }
      if (parsed.user) {
        return parsed.user
      }
    } catch {
      return null
    }

    return null
  }

  persistSession(user: AuthUser, rememberMe: boolean): void {
    if (typeof window === "undefined") {
      return
    }

    const storage = rememberMe ? window.localStorage : window.sessionStorage
    const storageMode = rememberMe ? "local" : "session"

    storage.setItem(STORAGE_KEY, JSON.stringify({ user }))
    window.localStorage.setItem(STORAGE_MODE_KEY, storageMode)
    window.sessionStorage.setItem(STORAGE_MODE_KEY, storageMode)
  }

  clearSession(): void {
    if (typeof window === "undefined") {
      return
    }

    window.localStorage.removeItem(STORAGE_KEY)
    window.sessionStorage.removeItem(STORAGE_KEY)
    window.localStorage.removeItem(STORAGE_MODE_KEY)
    window.sessionStorage.removeItem(STORAGE_MODE_KEY)
  }
}

export const authService: AuthService = new DummyAuthService()
