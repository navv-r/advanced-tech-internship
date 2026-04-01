"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { AiOutlineSearch } from "react-icons/ai"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

interface Book {
  id: string
  title: string
  author: string
  imageLink: string
  subscriptionRequired: boolean
}

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const router = useRouter()
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setShowResults(false)
      return
    }

    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${encodeURIComponent(query)}`
        )
        const data = await res.json()
        setResults(Array.isArray(data) ? data : [])
        setShowResults(true)
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowResults(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const handleSelect = (id: string) => {
    setQuery("")
    setShowResults(false)
    router.push(`/book/${id}`)
  }

  return (
    <div className="search__wrapper" ref={wrapperRef}>
      <div className="search__input--wrapper">
        <input
          type="text"
          className="search__input"
          placeholder="Search for books"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setShowResults(true)}
        />
        <div className="search__icon">
          {loading
            ? <AiOutlineLoading3Quarters className="search__spinner" />
            : <AiOutlineSearch />
          }
        </div>
      </div>

      {showResults && (
        <div className="search__results">
          {results.length === 0 ? (
            <div className="search__no--results">No books found</div>
          ) : (
            results.map((book) => (
              <div
                key={book.id}
                className="search__result--item"
                onClick={() => handleSelect(book.id)}
              >
                <img src={book.imageLink} alt={book.title} className="search__result--img" />
                <div>
                  <div className="search__result--title">{book.title}</div>
                  <div className="search__result--author">{book.author}</div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
