"use client"

import { AuthProvider } from "@/context/AuthContext"
import AuthModal from "@/components/AuthModal"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <AuthModal />
    </AuthProvider>
  )
}
