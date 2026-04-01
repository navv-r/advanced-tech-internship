"use client"

import { useAuth } from "@/context/AuthContext"
import Sidebar from "@/components/Sidebar"
import SearchBar from "@/components/SearchBar"
import { useRouter } from "next/navigation"

export default function SettingsPage() {
  const { user, loading, openModal } = useAuth()
  const router = useRouter()

  return (
    <div className="for-you">
      <Sidebar />
      <main className="for-you__main">
        <div className="for-you__header">
          <SearchBar />
        </div>

        <div className="for-you__content">
          <h1 className="settings__title">Settings</h1>
          <div className="settings__divider" />

          {loading ? (
            <div className="settings__skeleton">
              <div className="skeleton" style={{ height: 20, width: 200, marginBottom: 12 }} />
              <div className="skeleton" style={{ height: 16, width: 120, marginBottom: 8 }} />
              <div className="skeleton" style={{ height: 40, width: 180, borderRadius: 4 }} />
            </div>
          ) : !user ? (
            /* NOT LOGGED IN */
            <div className="settings__logged-out">
              <img src="/assets/login.png" alt="Login" className="settings__login--img" onError={(e) => (e.currentTarget.style.display = "none")} />
              <p className="settings__login--text">Log in to your account to see your details.</p>
              <button className="btn settings__login--btn" onClick={() => openModal("login")}>
                Login
              </button>
            </div>
          ) : (
            /* LOGGED IN */
            <div className="settings__content">
              {/* SUBSCRIPTION */}
              <div className="settings__section">
                <div className="settings__label">Your Subscription plan</div>
                <div className="settings__value">Basic</div>
                <button className="btn settings__upgrade--btn" onClick={() => router.push("/choose-plan")}>
                  Upgrade to Premium
                </button>
              </div>

              <div className="settings__divider" />

              {/* EMAIL */}
              <div className="settings__section">
                <div className="settings__label">Email</div>
                <div className="settings__value">
                  {user.isAnonymous ? "Guest User" : user.email}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
