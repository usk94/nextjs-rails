import { Book } from "@/types"
import Image from "next/image"
import Link from "next/link"

const BookCard = ({ book }: { book: Book }) => {
  return (
    <Link
      href={`book/${book.id}`}
      className="bg-secondary-lighter border border-secondary flex rounded-xl w-72 h-48 m-5 p-4 items-center shadow-md"
    >
      {/* TODO: next/imageにする */}
      <img src={book.image || "/noImage.jpg"} alt={book.title} width={100} height={150} className="min-w-2/5" />
      <div className="ml-2 flex flex-col max-w-40">
        <p>{book.title}</p>
        <p className="text-sm">{book.author}</p>
      </div>
    </Link>
  )
}

export default BookCard
