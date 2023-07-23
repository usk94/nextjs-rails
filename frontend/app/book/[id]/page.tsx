import { bookSchema } from "@/utils/bookValidator"
import Image from "next/image"
import Link from "next/link"

const getBook = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/books/${id}/`)

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  const data = await res.json()
  const result = bookSchema.safeParse(data.book)

  if (result.success) {
    return result.data
  }

  return {
    title: "",
    description: null,
    author: null,
    page_count: null,
    image: null,
    published_at: null,
    price: 0,
  }
}

const Page = async ({ params }: { params: { id: string } }) => {
  const book = await getBook(params.id)

  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <div className="flex flex-col w-1/2 p-6 mx-4 mt-8">
        <div className="bg-secondary-lighter rounded-xl border border-secondary flex p-4">
          <img src={book.image || "/noImage.jpg"} alt={book.title} className="w-30 h-52" />
          <div className="ml-4">
            <p className="text-lg font-medium">{book.title}</p>
            <p className="mt-1 text-sm">{book.description}</p>
            <p className="mt-4 text-sm">著者: {book.author}</p>
            <p className="mt-1 text-sm">{book.page_count}ページ</p>
          </div>
        </div>
        <p className="mt-4 text-base">価格: {book.price}💎</p>
        <p className="mt-1 text-xs text-gray-700">
          本の料金は1💎〜100💎でランダムに設定されています（このサービスでの通貨はダイヤ 💎 です）
        </p>
      </div>
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
