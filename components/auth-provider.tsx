"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import type { ReactNode } from "react"

type User = {
  id: string
  email: string
  name: string
  role: "admin" | "user"
}

type AuthContextType = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

async function api(path: string, options?: RequestInit) {
  const res = await fetch(path, { ...options, headers: { "Content-Type": "application/json", ...options?.headers } })
  return res.json()
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api("/api/auth/me").then((data) => {
      setUser(data.user || null)
      setLoading(false)
    })
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const data = await api("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
    if (data.success) {
      setUser(data.user)
      return { success: true }
    }
    return { success: false, error: data.error || "Login failed" }
  }, [])

  const register = useCallback(async (name: string, email: string, password: string) => {
    const data = await api("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    })
    if (data.success) {
      return { success: true }
    }
    return { success: false, error: data.error || "Registration failed" }
  }, [])

  const logout = useCallback(async () => {
    document.cookie = "token=; Path=/; Max-Age=-1"
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}