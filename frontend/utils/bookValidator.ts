import { z } from "zod"

export const bookSchemaWithoutId = z.object({
  title: z.string(),
  description: z.string().nullable(),
  author: z.string().nullable(),
  page_count: z.number().nullable(),
  image: z.string().nullable(),
  published_at: z.string().nullable(),
  price: z.number().positive().max(100),
})

export const bookSchema = bookSchemaWithoutId.merge(
  z.object({
    id: z.number(),
  })
)

export const booksSchema = z.array(bookSchema)

export const priceSchema = z.number().min(1).max(100)
