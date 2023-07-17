export type Book = {
  title: string
  description: string
  author: string
  page_count: number
  image: string
  published_at: string
}

export type GoogleApiBook = {
  volumeInfo: {
    title: string
    authors: string[]
    description: string
    imageLinks: {
      thumbnail: string
    }
    pageCount: number
    publishedDate: string
  }
}
