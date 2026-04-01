"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import BookCard from "./BookCard"
import { BookCardSkeleton } from "./Skeleton"

export default function Recommended() {
  const [books, setBooks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended")
      .then((res) => res.json())
      .then((data) => { setBooks(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <section className="book-section">
      <h2 className="section__heading">Recommended For You</h2>
      <p className="section__sub--heading">We think you&apos;ll like these</p>
      <div className="book-scroll">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => <BookCardSkeleton key={i} />)
          : books.map((book) => (
              <div key={book.id} onClick={() => router.push(`/book/${book.id}`)} style={{ cursor: "pointer" }}>
                <BookCard book={book} />
              </div>
            ))
        }
      </div>
    </section>
  )
}
