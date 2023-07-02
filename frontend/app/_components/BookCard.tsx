import { Book } from "@/types"
import Image from "next/image"

const BookCard = ({ book }: { book: Book }) => {
  return (
    <button className="bg-secondary-light flex flex-col border border-beige1 rounded-xl w-72 h-48 m-5 items-center">
      {book.image && <Image src={book.image} alt={book.title} width={150} height={220} />}
      <p>title: {book.title}</p>
      <p>description: {book.description}</p>
      <p>author: {book.author}</p>
      <p>page_count: {book.page_count}</p>
    </button>
  )
}

export default BookCard
