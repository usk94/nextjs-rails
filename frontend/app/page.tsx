import { Book } from "@/types"
import Image from "next/image"
import { booksSchema } from "@/utils/bookValidator"
import BookCard from "./_components/bookCard"
import { uploadedKey } from "@/utils/book"

const getBooks = async (option: { cache: RequestCache } | undefined) => {
  console.log("通ってる？res before")
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/books/`, option)
  console.log("通ってる？res after", res)

  if (!res.ok) {
    throw new Error("データの取得に失敗しました")
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

const Page = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
  console.log("here1")
  const didUpload = Object.keys(searchParams).some((k) => k === uploadedKey)
  console.log("here2")
  const option = didUpload ? ({ cache: "no-store" } as const) : undefined
  const books = await getBooks(option)
  console.log("here3 books", books)
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
