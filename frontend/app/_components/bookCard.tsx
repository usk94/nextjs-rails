import { Book } from "@/types"
import Image from "next/image"
import Link from "next/link"

const BookCard = ({ book }: { book: Book }) => {
  return (
    <Link
      href={`book/${book.id}`}
      className="bg-secondary-lighter border border-secondary-light flex rounded-xl w-72 h-56 m-6 p-4 items-center shadow-md hover:shadow-lg"
    >
      <Image src={book.image || "/noImage.jpg"} alt={book.title} width={100} height={150} className="min-w-2/5" />
      <div className="ml-4 flex flex-col justify-center">
        <p className="text-base whitespace-normal break-words">{book.title}</p>
        <p className="text-sm text-gray-600 mt-2">{book.author}</p>
      </div>
    </Link>
  )
}

export default BookCard
