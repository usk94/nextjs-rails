import { Book } from "@/types"
import Image from "next/image"
import BookCard from "./_components/BookCard"

const getBooks = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/books/`)

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

const Page = async () => {
  const { books } = await getBooks()
  return (
    <div className="">
      <div className="flex flex-wrap">
        {books.map((book: Book) => {
          return <BookCard key={book.title} book={book} />
        })}
      </div>
    </div>
  )
}

export default Page
