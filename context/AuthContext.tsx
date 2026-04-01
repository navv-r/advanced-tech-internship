"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import {
  onAuthStateChanged,
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  signOut,
} from "firebase/auth"
import { auth } from "@/app/firebase/auth"

interface AuthContextType {
  user: User | null
  loading: boolean
  modalOpen: boolean
  modalMode: "login" | "register"
  openModal: (mode?: "login" | "register") => void
  closeModal: () => void
  logout: () => Promise<void>
  loginWithEmail: (email: string, password: string) => Promise<void>
  registerWithEmail: (email: string, password: string) => Promise<void>
  loginAsGuest: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<"login" | "register">("login")

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const openModal = (mode: "login" | "register" = "login") => {
    setModalMode(mode)
    setModalOpen(true)
  }

  const closeModal = () => setModalOpen(false)

  const logout = async () => {
    await signOut(auth)
  }

  const loginWithEmail = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const registerWithEmail = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password)
  }

  const loginAsGuest = async () => {
    await signInAnonymously(auth)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        modalOpen,
        modalMode,
        openModal,
        closeModal,
        logout,
        loginWithEmail,
        registerWithEmail,
        loginAsGuest,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
