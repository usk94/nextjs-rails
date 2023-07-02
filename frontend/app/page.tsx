import { Book } from "@/types"
import Image from "next/image"

const getBooks = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/books/`)

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

const BookCard = ({ book }: { book: Book }) => {
  return (
    <div className="bg-secondary-light">
      {book.image && <Image src={book.image} alt={book.title} width={150} height={220} />}
      <p>title: {book.title}</p>
      <p>description: {book.description}</p>
      <p>author: {book.author}</p>
      <p>page_count: {book.page_count}</p>
    </div>
  )
}

const Page = async () => {
  const { books } = await getBooks()
  return (
    <div className="bg-neutral">
      {books.map((book: Book) => {
        return <BookCard key={book.title} book={book} />
      })}
    </div>
  )
}

export default Page
