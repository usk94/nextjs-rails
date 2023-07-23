import { z } from "zod"

export const bookSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  author: z.string().nullable(),
  page_count: z.number().nullable(),
  image: z.string().nullable(),
  published_at: z.string().nullable(),
  price: z.number(),
})

export const booksSchema = z.array(bookSchema)

export const priceSchema = z.number().min(1).max(100)
