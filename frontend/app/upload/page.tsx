"use client"

import { Book, GoogleApiBook } from "@/types"
import { useState } from "react"
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
  const { trigger, isMutating } = useSWRMutation("/api/user", updateBook)
  const [searchWord, setSearchWord] = useState("")
  const [books, setBooks] = useState<GoogleApiBook[]>([])
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value)
  }

  const searchBooks = async () => {
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchWord}&maxResults=${maxResults}`)
    const json = await res.json()

    setBooks(json.items)
  }

  const selectBook = async (book: GoogleApiBook) => {
    setSelectedBook({
      title: book.volumeInfo.title,
      description: book.volumeInfo.description,
      author: book.volumeInfo.authors[0],
      page_count: book.volumeInfo.pageCount,
      published_at: book.volumeInfo.publishedDate,
      image: book.volumeInfo.imageLinks.thumbnail,
    })
  }

  const handleClickSubmitButton = async () => {
    alert("here2!")
  }

  return (
    <div className="bg-neutral w-screen h-screen">
      <div className="flex flex-col">
        <div>
          <div className="text-lg font-semibold">クーポンを追加する</div>
          <span className="mt-2 text-sm font-light">
            クーポンコードをお持ちの方は、以下のフォームより
            <br />
            クーポンコードを入力してください。
          </span>
          <div className="mt-4 flex">
            <div className="grow-2 leading-none">
              <input
                type="text"
                onChange={handleChange}
                className="h-10 w-full border border-gray-lighter p-2 text-base font-light focus:border-primary focus:outline-none"
                placeholder="例）winter2020"
              />
            </div>
            <button
              type="button"
              onClick={searchBooks}
              disabled={isMutating}
              className="ml-3 rounded border border-gray px-4 py-2 text-base font-semibold leading-none"
            >
              検索する
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-5">
          {books.map((book, index) => (
            <button type="button" className="flex" key={index} onClick={() => selectBook(book)}>
              {/* TODO: next/imageにする */}
              <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
              <div className="flex flex-col">
                <p>{book.volumeInfo.title}</p>
                <p>{book.volumeInfo.authors[0]}</p>
              </div>
            </button>
          ))}
        </div>

        {/* 代金設定コンポーネント */}

        <button type="button" onClick={handleClickSubmitButton} className="ml-3 rounded border border-gray px-4 py-2 text-base font-semibold leading-none w-24">
          submit!
        </button>
      </div>
    </div>
  )
}

export default Page
