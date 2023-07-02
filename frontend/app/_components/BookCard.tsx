import { Book } from "@/types"
import Image from "next/image"

const BookCard = ({ book }: { book: Book }) => {
  return (
    <button className="bg-secondary-light flex rounded-xl w-72 h-48 m-5 items-center">
      <Image src={book.image || "/noImage.jpg"} alt={book.title} width={100} height={150} className="min-w-fit" />
      <div className="flex flex-col w-40">
        <p>{book.title}</p>
        <p className="text-sm line-clamp-3">{book.description}</p>
        <p className="text-sm">著者: {book.author}</p>
        <p className="text-sm">{book.page_count}ページ</p>
      </div>
    </button>
  )
}

export default BookCard
