"use client"

import React, { useEffect, useState } from "react"

interface Book {
  id: string
  title: string
  author: string
  subTitle: string
  imageLink: string
  averageRating: number
  subscriptionRequired: boolean
  audioLink: string
}

interface Props {
  book: Book
}

export default function BookCard({ book }: Props) {
  const [duration, setDuration] = useState<string>("--:--")

  useEffect(() => {
    if (!book.audioLink) return

    const audio = new Audio(book.audioLink)

    const handleLoaded = () => {
      const totalSeconds = Math.floor(audio.duration)

      const minutes = Math.floor(totalSeconds / 60)
      const seconds = totalSeconds % 60

      const formatted = `${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`

      setDuration(formatted)
    }

    const handleError = () => {
      setDuration("0:00")
    }

    audio.addEventListener("loadedmetadata", handleLoaded)
    audio.addEventListener("error", handleError)

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoaded)
      audio.removeEventListener("error", handleError)
    }
  }, [book.audioLink])

  return (
    <div className="book-card">
      {/* IMAGE */}
      <div className="book-card__img-wrapper">
        <img
          src={book.imageLink}
          alt={book.title}
          className="book-card__img"
        />

        {book.subscriptionRequired && (
          <div className="book-card__premium">Premium</div>
        )}
      </div>

      {/* TEXT */}
      <div className="book-card__content">
        <h3 className="book-card__title">{book.title}</h3>
        <p className="book-card__author">{book.author}</p>
        <p className="book-card__subtitle">{book.subTitle}</p>

        {/* META */}
        <div className="book-card__meta">
          <span>⏱ {duration}</span>
          <span>⭐ {book.averageRating?.toFixed(1) || "0.0"}</span>
        </div>
      </div>
    </div>
  )
}