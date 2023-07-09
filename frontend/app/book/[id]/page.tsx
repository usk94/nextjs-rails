import { Book } from "@/types"
import Image from "next/image"

const getBook = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/books/${id}/`)

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

const Page = async ({ params }: { params: { id: string } }) => {
  const data = await getBook(params.id)
  const book = data.book as Book

  return (
    <div className="bg-neutral flex flex-wrap">
      <div className="bg-secondary-light flex rounded-xl w-72 h-48 m-5 p-4 items-center">
        <Image src={book.image || "/noImage.jpg"} alt={book.title} width={100} height={150} className="min-w-1/2 h-auto w-auto" />
        <div className="flex flex-col max-w-40">
          <p className="text-sm">{book.title}</p>
          <p className="text-sm line-clamp-3">{book.description}</p>
          <p className="text-sm">著者: {book.author}</p>
          <p className="text-sm">{book.page_count}ページ</p>
        </div>
      </div>
    </div>
  )
}

export default Page
