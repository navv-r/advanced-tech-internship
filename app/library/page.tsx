"use client"

import Sidebar from "@/components/Sidebar"
import SearchBar from "@/components/SearchBar"
import { useAuth } from "@/context/AuthContext"

export default function LibraryPage() {
  const { user, openModal } = useAuth()

  return (
    <div className="for-you">
      <Sidebar />
      <main className="for-you__main">
        <div className="for-you__header">
          <SearchBar />
        </div>
        <div className="for-you__content">
          <h1 className="settings__title">My Library</h1>
          <div className="settings__divider" />

          {!user ? (
            <div className="settings__logged-out">
              <p className="settings__login--text">Log in to view your saved books.</p>
              <button className="btn settings__login--btn" onClick={() => openModal("login")}>
                Login
              </button>
            </div>
          ) : (
            <div className="library__empty">
              <p>Your library is empty. Start saving books from the For You page!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
