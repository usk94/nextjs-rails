"use client"

import { Book, GoogleApiBook } from "@/types"
import { priceSchema, bookSchema } from "@/utils/bookValidator"
import { useState } from "react"
import Search from "@mui/icons-material/Search"
import MenuBook from "@mui/icons-material/MenuBook"
import useSWRMutation from "swr/mutation"

const maxResults = 5

const updateBook = async (url: string, { arg: { book } }: { arg: { book: Omit<Book, "id"> } }) => {
  await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      book: book,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
}

const Page = () => {
  const { trigger, isMutating } = useSWRMutation(`${process.env.NEXT_PUBLIC_BACKEND_URL}/books/`, updateBook)
  const [searchWord, setSearchWord] = useState("")
  const [books, setBooks] = useState<GoogleApiBook[]>(
    Array(5).fill({
      volumeInfo: {
        title: "",
        imageLinks: {
          thumbnail: "",
        },
        description: "",
        publishedDate: "",
      },
    })
  )
  const [price, setPrice] = useState<number | null>(null)
  const [selectedBook, setSelectedBook] = useState<Omit<Book, "id"> | null>(null)
  const [priceError, setPriceError] = useState("")
  const disabled = !selectedBook || !price || !!priceError

  const handleChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value)
  }

  const searchBooks = async () => {
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchWord}&maxResults=${maxResults}`)
    const json = await res.json()

    const books = json.items && json.items.length > 0 ? json.items : []
    setBooks(books)
  }

  const selectBook = async (book: GoogleApiBook) => {
    setSelectedBook({
      title: book.volumeInfo.title,
      description: book.volumeInfo?.description ?? null,
      author: book.volumeInfo?.authors ? book.volumeInfo?.authors[0] : null,
      page_count: book.volumeInfo?.pageCount ?? null,
      published_at: book.volumeInfo?.publishedDate ?? null,
      image: book.volumeInfo?.imageLinks?.thumbnail ?? null,
      price: 0,
    })
  }

  const handleChangePriceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setPrice(null)
      setPriceError("")
      return
    }

    const result = priceSchema.safeParse(Number(e.target.value))
    if (result.success) {
      setPrice(result.data)
      priceError && setPriceError("")
      return
    }
    setPriceError("1から100の数字を入力してください")
  }

  const handleSubmit = async () => {
    const result = bookSchema.safeParse({ ...selectedBook, price })
    if (result.success) {
      selectedBook && (await trigger({ book: result.data }))
      return
    }
    // TODO: radix-uiのsnackbar使う
    alert("保存に失敗しました。再度お試しください")
  }

  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col px-12 pt-6">
        <div>
          <h1 className="text-2xl font-semibold">本を選んで、本棚に保管しよう</h1>
          <p className="mt-2">好きな本のタイトル、もしくは著者で検索をしてください。</p>
          <div className="mt-4 flex">
            <div className="grow-2 leading-none">
              <input
                type="text"
                onChange={handleChangeSearchInput}
                className="h-10 w-full border border-gray-light p-2 font-light focus:outline-none"
                placeholder="例）ハリーポッター"
              />
            </div>
            <button
              type="button"
              onClick={searchBooks}
              disabled={isMutating}
              className="ml-3 rounded bg-white border border-gray-light px-2 py-1 text-base leading-none"
            >
              <Search />
            </button>
          </div>
        </div>

        {books.length > 0 ? (
          <div className="mt-8 flex flex-wrap gap-10">
            {books.map((book, index) => {
              const title = book.volumeInfo.title
              const authors = book.volumeInfo?.authors
              const image = book.volumeInfo?.imageLinks?.thumbnail
              const description = book.volumeInfo?.description
              const publishedDate = book.volumeInfo?.publishedDate

              const isSelected = () => {
                if (!selectedBook) return false

                if (selectedBook.title !== title) return false
                if (selectedBook.description && selectedBook.description !== description) return false
                if (selectedBook.image && selectedBook.image !== image) return false
                if (selectedBook.published_at && selectedBook.published_at !== publishedDate) return false

                return true
              }

              return (
                <button
                  key={index}
                  type="button"
                  className={`flex items-center p-2 justify-center flex-col border border-solid border-gray-light w-52 h-52 ${
                    !!title ? "" : "cursor-default"
                  } ${isSelected() ? "bg-secondary-light" : "bg-white"}`}
                  disabled={!title}
                  onClick={() => selectBook(book)}
                >
                  {/* TODO: next/imageにする */}
                  {title ? (
                    <>
                      <img src={image || "/noImage.jpg"} alt={title} className="max-h-3/5" />
                      <div className="text-sm mt-2">
                        {title && <p>{title}</p>}
                        {authors && authors.length > 0 && <p>{authors[0]}</p>}
                      </div>
                    </>
                  ) : (
                    <MenuBook className="text-gray w-32 h-32" />
                  )}
                </button>
              )
            })}
          </div>
        ) : (
          <p className="mt-4">検索の結果、該当する本が見つかりませんでした。</p>
        )}
        <div className="flex flex-col mt-6">
          <div className="flex flex-col">
            <p className="mt-2">
              一冊選択したあと、本の料金を1💎〜100💎で設定してください（このサービスでの通貨はダイヤ 💎 です）
            </p>
          </div>
          <div className="mt-4 flex items-center">
            <input
              type="text"
              inputMode="numeric"
              onChange={handleChangePriceInput}
              className="h-10 border border-gray-light p-2 font-light focus:outline-none w-24"
            />
            <span className="ml-1 flex items-center justify-center text-lg">💎</span>
            {priceError && <span className="ml-2 text-sm text-attention">{priceError}</span>}
          </div>
        </div>
        <button
          type="button"
          disabled={disabled}
          onClick={handleSubmit}
          className={`mt-6 text-white rounded px-4 py-2 text-base leading-none w-48 ${
            !disabled ? "bg-primary" : "bg-gray-lighter"
          }`}
        >
          保存する
        </button>
      </div>
    </div>
  )
}

export default Page
