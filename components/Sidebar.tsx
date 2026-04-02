"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { AiOutlineHome, AiOutlineSearch, AiOutlineSetting, AiOutlineLogin, AiOutlineLogout, AiOutlineClose, AiOutlineMenu } from "react-icons/ai"
import { BsBookmark } from "react-icons/bs"
import { BiHighlight, BiHelpCircle } from "react-icons/bi"
import Image from "next/image"

export default function Sidebar() {
  const { user, logout, openModal } = useAuth()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleAuthAction = async () => {
    if (user) {
      await logout()
    } else {
      openModal("login")
    }
  }

  const navItem = (href: string, icon: React.ReactNode, label: string, disabled = false) => {
    const active = pathname === href
    if (disabled) {
      return (
        <div className={`sidebar__nav--item sidebar__nav--disabled`}>
          <span className="sidebar__nav--icon">{icon}</span>
          <span className="sidebar__nav--label">{label}</span>
        </div>
      )
    }
    return (
      <Link href={href} className={`sidebar__nav--item${active ? " sidebar__nav--active" : ""}`}>
        <span className="sidebar__nav--icon">{icon}</span>
        <span className="sidebar__nav--label">{label}</span>
      </Link>
    )
  }

  return (
    <>
      {/* HAMBURGER BUTTON — mobile only */}
      <button
        className="sidebar__burger"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        <AiOutlineMenu />
      </button>

      {/* OVERLAY — mobile only */}
      {mobileOpen && (
        <div className="sidebar__overlay" onClick={() => setMobileOpen(false)} />
      )}

      <aside className={`sidebar${mobileOpen ? " sidebar--open" : ""}`}>
        {/* CLOSE BUTTON — mobile only */}
        <button className="sidebar__close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
          <AiOutlineClose />
        </button>
        </aside>
    </>
  )
}

