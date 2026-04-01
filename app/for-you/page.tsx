"use client"

import Sidebar from "@/components/Sidebar"
import Selected from "@/components/Selected"
import Recommended from "@/components/Recommended"
import Suggested from "@/components/Suggested"
import SearchBar from "@/components/SearchBar"

export default function ForYou() {
  return (
    <div className="for-you">
      <Sidebar />
      <main className="for-you__main">
        <div className="for-you__header">
          <SearchBar />
        </div>
        <div className="for-you__content">
          <Selected />
          <Recommended />
          <Suggested />
        </div>
      </main>
    </div>
  )
}
