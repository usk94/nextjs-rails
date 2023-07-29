import Skeleton from "@/app/_components/skeleton"
import { bookSchema } from "@/utils/bookValidator"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"

const getBook = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/books/${id}/`)

  if (!res.ok) {
    throw new Error("データの取得に失敗しました")
  }

  const data = await res.json()
  const result = bookSchema.safeParse(data.book)

  if (!result.success) {
    return {
      id: "",
      title: "",
      description: null,
      author: null,
      page_count: null,
      image: null,
      published_at: null,
      price: 0,
    }
  }

  return result.data
}

const Page = async ({ params }: { params: { id: string } }) => {
  const book = await getBook(params.id)

  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <Suspense fallback={<Skeleton width={500} height={500} />}>
        <div className="flex flex-col w-1/2 p-6 mx-4 mt-8">
          <div className="bg-secondary-lighter rounded-xl border border-secondary-light flex p-4">
            <img src={book.image || "/noImage.jpg"} alt={book.title} className="w-30 h-52" />
            <div className="ml-4">
              <p className="text-lg font-medium">{book.title}</p>
              <p className="mt-1 text-sm">{book.description}</p>
              <p className="mt-4 text-sm">{book.author} (著)</p>
              <p className="mt-1 text-sm">出版日: {book.published_at}</p>
              <p className="mt-1 text-sm">{book.page_count}ページ</p>
            </div>
          </div>
          <p className="mt-4 text-base">価格: {book.price}💎</p>
          <p className="mt-1 text-xs text-gray">このサービスでの通貨はダイヤ 💎 です</p>
        </div>
      </Suspense>
      <Link
        href=""
        className="mt-6 bg-primary text-white rounded px-4 py-1 flex items-center justify-center w-72 h-8 font-medium"
      >
        カートに進む
      </Link>
    </div>
  )
}

export default Page
