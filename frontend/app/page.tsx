const getBooks = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/books/`)

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
      {books.map((b) => {
        return (
          <>
            <div>title: {b.title}</div>
            <div>title: {b.description}</div>
            <div>title: {b.author}</div>
            <div>title: {b.page_count}</div>
            <div>title: {b.image}</div>
          </>
        )
      })}
    </>
  )
}

export default Page
