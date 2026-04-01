"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { SelectedSkeleton } from "./Skeleton"
import { AiOutlinePlayCircle } from "react-icons/ai"

export default function Selected() {
  const [book, setBook] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [duration, setDuration] = useState("--:--")
  const router = useRouter()

  useEffect(() => {
    fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected")
      .then((res) => res.json())
      .then((data) => {
        setBook(Array.isArray(data) ? data[0] : data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!book?.audioLink) return
    const audio = new Audio(book.audioLink)
    const onLoaded = () => {
      const s = Math.floor(audio.duration)
      setDuration(`${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`)
    }
    audio.addEventListener("loadedmetadata", onLoaded)
    audio.addEventListener("error", () => setDuration("0:00"))
    return () => audio.removeEventListener("loadedmetadata", onLoaded)
  }, [book])

  return (
    <section className="selected">
      <h2 className="section__heading">Selected just for you</h2>
      {loading ? (
        <SelectedSkeleton />
      ) : book ? (
        <div className="selected-card" onClick={() => router.push(`/book/${book.id}`)} style={{ cursor: "pointer" }}>
          <div className="selected-left">
            <p>{book.subTitle}</p>
          </div>
          <div className="selected-divider" />
          <div className="selected-middle">
            <img src={book.imageLink} alt={book.title} />
          </div>
          <div className="selected-right">
            <h3>{book.title}</h3>
            <p className="author">{book.author}</p>
            <div className="selected-meta">
              <AiOutlinePlayCircle className="selected-play-icon" />
              <span>{duration}</span>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
