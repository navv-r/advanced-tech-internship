"use client"

import { signInAnonymously } from "firebase/auth"
import { auth } from "@/app/firebase/auth"
import { useRouter } from "next/navigation"

type Props = {
  isOpen: boolean
  closeModal: () => void
}

export default function LoginModal({ isOpen, closeModal }: Props) {
  const router = useRouter()

  if (!isOpen) return null

  const handleGuestLogin = async () => {
    try {
      await signInAnonymously(auth)
      closeModal()
      router.push("/for-you")
    } catch (error) {
      console.error("Login error:", error)
    }
  }

  return (
    <div className="modal__overlay" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        
        {/* CLOSE BUTTON */}
        <div className="modal__close" onClick={closeModal}>
          ×
        </div>

        {/* TITLE */}
        <div className="modal__title">
          Log in to Summarist
        </div>

        {/* GUEST LOGIN */}
        <button
          className="modal__btn modal__guest"
          onClick={handleGuestLogin}
        >
          Login as a Guest
        </button>

        {/* DIVIDER */}
        <div className="modal__divider">
          <span>or</span>
        </div>

        {/* GOOGLE (UI ONLY for now) */}
        <button className="modal__btn modal__google">
          Login with Google
        </button>

        {/* DIVIDER */}
        <div className="modal__divider">
          <span>or</span>
        </div>

        {/* EMAIL FORM (UI ONLY) */}
        <input
          type="email"
          placeholder="Email Address"
          className="modal__input"
        />
        <input
          type="password"
          placeholder="Password"
          className="modal__input"
        />

        <button className="modal__btn modal__login">
          Login
        </button>

        {/* LINKS */}
        <div className="modal__forgot">
          Forgot your password?
        </div>

        <div className="modal__signup">
          Don't have an account?
        </div>

      </div>
    </div>
  )
}