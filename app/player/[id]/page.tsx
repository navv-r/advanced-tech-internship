"use client"

import { useEffect, useRef, useState } from "react"
import { useParams } from "next/navigation"
import Sidebar from "@/components/Sidebar"
import SearchBar from "@/components/SearchBar"
import {
  AiOutlineBackward,
  AiOutlineForward,
  AiFillPlayCircle,
  AiFillPauseCircle,
} from "react-icons/ai"

export default function PlayerPage() {
  const { id } = useParams() as { id: string }
  const [book, setBook] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Audio state
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    if (!id) return
    fetch(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBook(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  // Set up audio element
  useEffect(() => {
    if (!book?.audioLink) return
    const audio = new Audio(book.audioLink)
    audioRef.current = audio

    const onLoaded = () => setDuration(audio.duration)
    const onTimeUpdate = () => setCurrentTime(audio.currentTime)
    const onEnded = () => setIsPlaying(false)

    audio.addEventListener("loadedmetadata", onLoaded)
    audio.addEventListener("timeupdate", onTimeUpdate)
    audio.addEventListener("ended", onEnded)

    return () => {
      audio.pause()
      audio.removeEventListener("loadedmetadata", onLoaded)
      audio.removeEventListener("timeupdate", onTimeUpdate)
      audio.removeEventListener("ended", onEnded)
    }
  }, [book])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const skip = (seconds: number) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Math.min(Math.max(0, audio.currentTime + seconds), duration)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return
    const val = parseFloat(e.target.value)
    audio.currentTime = val
    setCurrentTime(val)
  }

  const formatTime = (secs: number) => {
    if (!secs || isNaN(secs)) return "0:00"
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60)
    return `${m}:${String(s).padStart(2, "0")}`
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
            <div className="player__loading">
              <div className="skeleton" style={{ height: 28, width: 300, marginBottom: 24 }} />
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="skeleton" style={{ height: 16, width: "100%", marginBottom: 12 }} />
              ))}
            </div>
          ) : book ? (
            <>
              {/* SUMMARY */}
              <div className="player__summary">
                <h1 className="player__title">{book.title}</h1>
                <p className="player__text">{book.summary}</p>
              </div>
            </>
          ) : (
            <p>Book not found.</p>
          )}
        </div>
      </main>

      {/* AUDIO PLAYER BAR — fixed at bottom */}
      {book && (
        <div className="audio-player">
          {/* LEFT: book info */}
          <div className="audio-player__info">
            <img src={book.imageLink} alt={book.title} className="audio-player__img" />
            <div>
              <div className="audio-player__title">{book.title}</div>
              <div className="audio-player__author">{book.author}</div>
            </div>
          </div>

          {/* CENTER: controls + progress */}
          <div className="audio-player__center">
            <div className="audio-player__controls">
              <button className="audio-player__btn" onClick={() => skip(-10)} title="Back 10s">
                <AiOutlineBackward />
                <span className="audio-player__skip--label">10</span>
              </button>

              <button className="audio-player__play" onClick={togglePlay}>
                {isPlaying
                  ? <AiFillPauseCircle />
                  : <AiFillPlayCircle />
                }
              </button>

              <button className="audio-player__btn" onClick={() => skip(10)} title="Forward 10s">
                <AiOutlineForward />
                <span className="audio-player__skip--label">10</span>
              </button>
            </div>

            <div className="audio-player__progress">
              <span className="audio-player__time">{formatTime(currentTime)}</span>
              <input
                type="range"
                className="audio-player__slider"
                min={0}
                max={duration || 0}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
              />
              <span className="audio-player__time">{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
