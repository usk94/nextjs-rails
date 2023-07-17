export type Book = {
  title: string
  description?: string
  author?: string
  page_count?: number
  image?: string
  price: number
  published_at?: string
}

export type GoogleApiBook = {
  volumeInfo: {
    title: string
    authors?: string[]
    description?: string
    imageLinks?: {
      thumbnail: string
    }
    pageCount?: number
    publishedDate?: string
  }
}
