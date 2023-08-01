import { Book } from "@/types"
import Image from "next/image"
import { booksSchema } from "@/utils/bookValidator"
import BookCard from "./_components/bookCard"
import { Suspense } from "react"
import Skeleton from "./_components/skeleton"
import { uploadedKey } from "@/utils/book"

const getBooks = async (option: { cache: RequestCache } | undefined) => {
  console.log("option hoge", option)
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/books/`, option)

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
  const didUpload = Object.keys(searchParams).some((k) => k === uploadedKey)
  const option = didUpload ? ({ cache: "no-store" } as const) : undefined
  const books = await getBooks(option)
  shuffle(books)

  return (
    <div className="flex flex-wrap">
      {books.map((book: Book) => {
        return (
          <Suspense key={book.title} fallback={<Skeleton width={288} height={192} />}>
            <BookCard book={book} />
          </Suspense>
        )
      })}
    </div>
  )
}

export default Page
