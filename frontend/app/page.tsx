import { Book } from "@/types"
import Image from "next/image"
import { booksSchema } from "@/utils/bookValidator"
import BookCard from "./_components/bookCard"
import { Suspense } from "react"
import Skeleton from "./_components/skeleton"

const getBooks = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/books/`)

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  const data = await res.json()
  const result = booksSchema.safeParse(data.books)

  if (!result.success) {
    return []
  }

  return result.data
}

const shuffle = (books: Book[]) => {
  books.sort(() => Math.random() - 0.5)
}

const Page = async () => {
  const books = await getBooks()
  shuffle(books)

  return (
    <div className="flex flex-wrap">
      {books.map((book: Book) => {
        return (
          <Suspense key={book.title} fallback={<Skeleton width={288} height={192} />}>
            <BookCard book={book} />
          </Suspense>
        )
      })}
    </div>
  )
}

export default Page
