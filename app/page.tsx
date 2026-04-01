"use client"
import Navbar from "@/components/Navbar"
import Landing from "@/components/Landing"
import Features from "@/components/Features"
import Reviews from "@/components/Reviews"
import Numbers from "@/components/Numbers"
import Footer from "@/components/Footer"
import Statistics from "@/components/Statistics"
import { useAuth } from "@/context/AuthContext"

export default function Home() {
  const { openModal } = useAuth()

  return (
    <>
      <Navbar openModal={openModal} />
      <Landing openModal={openModal} />
      <Features />
      <Statistics />
      <Reviews openModal={openModal} />
      <Numbers />
      <Footer />
    </>
  )
}

