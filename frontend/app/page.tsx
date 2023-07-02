import { Book } from "@/types"

const getBooks = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/books/`)

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

const Page = async () => {
  const { books } = await getBooks()
  return (
    <>
      <div>hoge!</div>
      {books.map((b: Book) => {
        return (
          <>
            <div>title: {b.title}</div>
            <div>description: {b.description}</div>
            <div>author: {b.author}</div>
            <div>page_count: {b.page_count}</div>
            <div>image: {b.image}</div>
          </>
        )
      })}
    </>
  )
}

export default Page
