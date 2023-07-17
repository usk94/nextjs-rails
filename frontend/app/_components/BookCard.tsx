import { Book } from "@/types"
import Image from "next/image"

const BookCard = ({ book }: { book: Book }) => {
  return (
    <button className="bg-secondary-light flex rounded-xl w-72 h-48 m-5 p-4 items-center">
      {/* TODO: next/imageにする */}
      <img src={book.image || "/noImage.jpg"} alt={book.title} width={100} height={150} className="min-w-2/5" />
      <div className="flex flex-col max-w-40">
        <p className="text-sm">{book.title}</p>
        <p className="text-sm">著者: {book.author}</p>
      </div>
    </button>
  )
}

export default BookCard
