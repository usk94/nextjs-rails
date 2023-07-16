import axios from "axios"
import fs from "fs/promises"

// const endPoint = "https://nextjs-rails.onrender.com/api/v1/books"
// const endPoint = "http://localhost:8080/api/v1/books"
try {
  const res = await axios.get(endPoint)
  const json = res.data.books.map((b) => ({
    title: b.title,
    published_at: b.published_at,
    description: b.description,
    page_count: b.page_count,
    author: b.author,
    image: b.image,
  }))
  console.log("res", res)
  fs.writeFile("books2.json", JSON.stringify(json))
} catch (e) {
  throw Error(e)
}
