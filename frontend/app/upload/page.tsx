"use client"

import { Book, GoogleApiBook } from "@/types"
import { Fragment, useState } from "react"
import useSWRMutation from "swr/mutation"

const maxResults = 5

const updateBook = async (url: string, { arg: { book } }: { arg: { book: Book } }) => {
  await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      book: book,
    }),
  })
}

const Page = () => {
  const { trigger, isMutating } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/books/`,
    updateBook
  )
  const [searchWord, setSearchWord] = useState("")
  const [books, setBooks] = useState<GoogleApiBook[]>(
    Array(5).fill({
      volumeInfo: {
        title: "",
        imageLinks: {
          thumbnail: "/noImage.jpg",
        },
      },
    })
  )
  const [price, setPrice] = useState(0)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)

  const handleChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value)
  }

  const searchBooks = async () => {
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchWord}&maxResults=${maxResults}`
    )
    const json = await res.json()

    const books = json.items && json.items.length > 0 ? json.items : []
    setBooks(books)
  }

  const selectBook = async (book: GoogleApiBook) => {
    setSelectedBook({
      title: book.volumeInfo.title,
      description: book.volumeInfo.description,
      author: book.volumeInfo?.authors ? book.volumeInfo?.authors[0] : "",
      page_count: book.volumeInfo.pageCount,
      published_at: book.volumeInfo.publishedDate,
      image: book.volumeInfo?.imageLinks?.thumbnail ?? "",
    })
  }

  const handleChangePriceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value))
  }

  const handleSubmit = async () => {
    // selectedBook && trigger({ book: selectedBook })
  }

  return (
    <div className="bg-neutral w-screen h-screen">
      <div className="flex flex-col p-12">
        <div>
          <h1 className="text-xl font-semibold">本を選んで、本棚に保管しよう</h1>
          <p className="mt-2 text-sm font-light">
            好きな本のタイトルもしくは著者を入力して、検索してください。
          </p>
          <div className="mt-4 flex">
            <div className="grow-2 leading-none">
              <input
                type="text"
                onChange={handleChangeSearchInput}
                className="h-10 w-full border border-gray-lighter p-2 font-light focus:outline-none"
                placeholder="例）ハリーポッター"
              />
            </div>
            <button
              type="button"
              onClick={searchBooks}
              disabled={isMutating}
              className="ml-3 rounded bg-white border border-gray px-4 py-2 text-base leading-none"
            >
              検索する
            </button>
          </div>
        </div>

        {books.length > 0 ? (
          <Fragment>
            <div className="mt-4 flex flex-wrap gap-5">
              {books.map((book, index) => {
                const title = book.volumeInfo.title
                console.log("title", title)
                const authors = book.volumeInfo?.authors
                const image = book.volumeInfo?.imageLinks?.thumbnail

                return (
                  <button
                    key={index}
                    type="button"
                    className={`flex flex-col bg-white border border-solid border-black w-60 ${
                      !!title ? "" : "cursor-default"
                    }`}
                    disabled={!title}
                    onClick={() => selectBook(book)}
                  >
                    {/* TODO: next/imageにする */}
                    {<img src={image ?? "/noImage.jpg"} alt={title} />}
                    <div className="text-sm">
                      {title && <p>{title}</p>}
                      {authors && authors.length > 0 && <p>{authors[0]}</p>}
                    </div>
                  </button>
                )
              })}
            </div>
          </Fragment>
        ) : (
          <p>検索の結果、該当する本が見つかりませんでした。</p>
        )}
        <div className="flex flex-col mt-6">
          <div className="flex flex-col">
            <p className="mt-2 text-sm font-light">
              一冊選択したあと、本の料金を1💎〜100💎で設定してください（このサービスでの通貨はダイヤ
              💎 です）
            </p>
          </div>
          <div className="mt-4 flex">
            <input
              type="text"
              inputMode="numeric"
              onChange={handleChangePriceInput}
              className="h-10 border border-gray-lighter p-2 font-light focus:outline-none w-24"
            />
            <span className="ml-2 flex items-center justify-center text-lg">💎</span>
          </div>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="mt-3 bg-primary text-white rounded border border-gray px-4 py-2 text-base leading-none w-48"
        >
          保存する
        </button>
      </div>
    </div>
  )
}

export default Page
