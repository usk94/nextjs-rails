import { z } from "zod"

export const zBook = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string(),
  page_count: z.number(),
  image: z.string(),
})
export const zBooks = z.array(zBook)