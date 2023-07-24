export type Book = {
  id: number
  title: string
  description: string | null
  author: string | null
  page_count: number | null
  image: string | null
  price: number
  published_at: string | null
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
