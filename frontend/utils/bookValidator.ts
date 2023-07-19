import { z } from "zod"

export const zBook = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string(),
  page_count: z.number(),
  image: z.string(),
})
export const zBooks = z.array(zBook)

export const bookSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  author: z.string().optional(),
  page_count: z.number().optional(),
  image: z.string().optional(),
  price: z.number(),
  published_at: z.string().optional(),
})

export const priceSchema = z.number().min(1).max(100)
