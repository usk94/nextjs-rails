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

const SearchResult = ({
  books,
  selectBook,
  handleSubmit,
}: {
  books: GoogleApiBook[]
  selectBook: (book: GoogleApiBook) => void
  handleSubmit: () => void
}) => {
  return books.length > 0 ? (
    <Fragment>
      <h2 className="mt-8 text-xl font-semibold">料金を設定して、アップロードする</h2>
      <p className="mt-2 text-sm font-light">
        検索結果の中から一冊選択し、アップロードボタンを押してください。
      </p>
      <div className="mt-4 flex flex-wrap gap-5">
        {books.map((book, index) => (
          <button
            type="button"
            className="flex flex-col bg-white border border-solid border-black w-60"
            key={index}
            onClick={() => selectBook(book)}
          >
            {/* TODO: next/imageにする */}
            {book.volumeInfo?.imageLinks?.thumbnail && (
              <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
            )}
            <div className="text-sm">
              <p>{book.volumeInfo.title}</p>
              {book.volumeInfo.authors.length > 0 && <p>{book.volumeInfo.authors[0]}</p>}
            </div>
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        className="mt-3 bg-primary text-white rounded border border-gray px-4 py-2 text-base leading-none w-48"
      >
        アップロードする
      </button>
    </Fragment>
  ) : (
    <p>検索の結果、該当する本が見つかりませんでした。</p>
  )
}

const Page = () => {
  const { trigger, isMutating } = useSWRMutation("/api/user", updateBook)
  const [searchWord, setSearchWord] = useState("")
  const [books, setBooks] = useState<GoogleApiBook[] | null>(null)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      author: book.volumeInfo.authors[0],
      page_count: book.volumeInfo.pageCount,
      published_at: book.volumeInfo.publishedDate,
      image: book.volumeInfo.imageLinks.thumbnail,
    })
  }

  const handleSubmit = async () => {
    alert("here2!")
  }

  return (
    <div className="bg-neutral w-screen h-screen">
      <div className="flex flex-col p-12">
        <div>
          <h2 className="text-xl font-semibold">本を調べる</h2>
          <p className="mt-2 text-sm font-light">
            好きな本のタイトルもしくは著者を入力して、検索してください。
          </p>
          <div className="mt-4 flex">
            <div className="grow-2 leading-none">
              <input
                type="text"
                onChange={handleChange}
                className="h-10 w-full border border-gray-lighter p-2 font-light focus:outline-none"
                placeholder="例）winter2020"
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

        {books && (
          <SearchResult books={books} handleSubmit={handleSubmit} selectBook={selectBook} />
        )}
      </div>
    </div>
  )
}

export default Page
