import { Book } from "@/types"
import Image from "next/image"
import BookCard from "./_components/bookCard"
import { booksSchema } from "@/utils/bookValidator"

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
        return <BookCard key={book.title} book={book} />
      })}
    </div>
  )
}

export default Page
