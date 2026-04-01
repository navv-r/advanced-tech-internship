"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import Sidebar from "@/components/Sidebar"
import SearchBar from "@/components/SearchBar"
import { BookDetailSkeleton } from "@/components/Skeleton"
import { AiOutlineRead, AiOutlineAudio, AiOutlineStar, AiOutlineClockCircle, AiOutlineBulb, AiOutlineFileText } from "react-icons/ai"
import { BsBookmark } from "react-icons/bs"

export default function BookPage() {
  const { id } = useParams() as { id: string }
  const { user, openModal } = useAuth()
  const router = useRouter()
  const [book, setBook] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [duration, setDuration] = useState("--:--")

  useEffect(() => {
    if (!id) return
    fetch(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`)
      .then((res) => res.json())
      .then((data) => { setBook(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [id])

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

  const handleReadListen = () => {
    if (!user) {
      openModal("login")
      return
    }
    if (book.subscriptionRequired) {
      router.push("/choose-plan")
      return
    }
    router.push(`/player/${id}`)
  }

  return (
    <div className="for-you">
      <Sidebar />
      <main className="for-you__main">
        <div className="for-you__header">
          <SearchBar />
        </div>
        <div className="for-you__content">
          {loading ? (
            <BookDetailSkeleton />
          ) : book ? (
            <div className="book-detail">
              {/* LEFT */}
              <div className="book-detail__left">
                <h1 className="book-detail__title">
                  {book.title}
                  {book.subscriptionRequired && <span className="book-detail__premium"> (Premium)</span>}
                </h1>
                <p className="book-detail__author">{book.author}</p>
                <p className="book-detail__subtitle">{book.subTitle}</p>

                <div className="book-detail__meta">
                  <div className="book-detail__meta--item">
                    <AiOutlineStar />
                    <span>{book.averageRating?.toFixed(1)} ({book.totalRating} ratings)</span>
                  </div>
                  <div className="book-detail__meta--item">
                    <AiOutlineClockCircle />
                    <span>{duration}</span>
                  </div>
                  <div className="book-detail__meta--item">
                    <AiOutlineFileText />
                    <span>{book.type}</span>
                  </div>
                  <div className="book-detail__meta--item">
                    <AiOutlineBulb />
                    <span>{book.keyIdeas} Key ideas</span>
                  </div>
                </div>

                {/* BUTTONS */}
                <div className="book-detail__btns">
                  <button className="book-detail__btn" onClick={handleReadListen}>
                    <AiOutlineRead />
                    <span>Read</span>
                  </button>
                  <button className="book-detail__btn" onClick={handleReadListen}>
                    <AiOutlineAudio />
                    <span>Listen</span>
                  </button>
                </div>

                <button className="book-detail__save--btn" onClick={() => !user && openModal("login")}>
                  <BsBookmark />
                  <span>Add title to My Library</span>
                </button>

                {/* TAGS */}
                <div className="book-detail__tags--title">What&apos;s it about?</div>
                <div className="book-detail__tags">
                  {book.tags?.map((tag: string) => (
                    <span key={tag} className="book-detail__tag">{tag}</span>
                  ))}
                </div>

                {/* DESCRIPTION */}
                <div className="book-detail__description">{book.bookDescription}</div>

                {/* AUTHOR */}
                <h3 className="book-detail__about--author">About the author</h3>
                <p className="book-detail__author--desc">{book.authorDescription}</p>
              </div>

              {/* RIGHT IMAGE */}
              <div className="book-detail__right">
                <img src={book.imageLink} alt={book.title} className="book-detail__img" />
              </div>
            </div>
          ) : (
            <p>Book not found.</p>
          )}
        </div>
      </main>
    </div>
  )
}
