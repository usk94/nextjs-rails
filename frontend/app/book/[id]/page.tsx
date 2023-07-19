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
    <div className="bg-neutral">
      <div className="flex flex-wrap">
        <p className="mt-2 text-sm font-light">
          本の料金は1💎〜100💎でランダムに設定されています（このサービスでの通貨はダイヤ 💎 です）
        </p>
        <div className="bg-secondary-light flex rounded-xl w-72 h-48 m-5 p-4 items-center">
          <Image
            src={book.image || "/noImage.jpg"}
            alt={book.title}
            width={100}
            height={150}
            className="min-w-1/2 h-auto w-auto"
          />
          <div className="flex flex-col max-w-40">
            <p className="text-sm">{book.title}</p>
            <p className="text-sm line-clamp-3">{book.description}</p>
            <p className="text-sm">著者: {book.author}</p>
            <p className="text-sm">{book.page_count}ページ</p>
          </div>
        </div>
      </div>
      <Link href="" className={`mt-6 text-white rounded px-4 py-2 text-base leading-none w-48 bg-primary`}>
        カートに進む
      </Link>
    </div>
  )
}

export default Page
