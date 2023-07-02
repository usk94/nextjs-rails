import axios from "axios"
import fs from "fs/promises"

const names = ["ボクたちはみんな大人になれなかった"]
const apiUrls = names.map((n) => `https://www.googleapis.com/books/v1/volumes?q=${n}&maxResults=5`)

function sanitizeString(str) {
  return str.replace(/[\uff01-\uff5e\uffe0-\uffef\u3000]/g, "")
}

apiUrls.forEach((url, i) => {
  console.log(`${i + 1}個目取得開始！`)
  axios
    .get(url)
    .then((response) => {
      const responseData = response.data
      const filteredData = responseData.items.map((item) => {
        const filteredVolumeInfo = Object.fromEntries(
          Object.entries(item.volumeInfo).filter(([key]) => {
            return ![
              "industryIdentifiers",
              "readingModes",
              "printType",
              "maturityRating",
              "allowAnonLogging",
              "contentVersion",
              "language",
              "previewLink",
              "infoLink",
              "canonicalVolumeLink",
              "categories",
              "panelizationSummary",
              "publisher",
              "averageRating",
              "ratingsCount",
              "subtitle",
              "seriesInfo",
            ].includes(key)
          })
        )

        if (filteredVolumeInfo.authors) {
          filteredVolumeInfo.author = sanitizeString(filteredVolumeInfo.authors[0])
          delete filteredVolumeInfo.authors
        }

        if (filteredVolumeInfo.imageLinks) {
          filteredVolumeInfo.thumbnail = sanitizeString(filteredVolumeInfo.imageLinks.thumbnail || filteredVolumeInfo.imageLinks.smallThumbnail)
          delete filteredVolumeInfo.imageLinks
        }

        for (let key in filteredVolumeInfo) {
          if (typeof filteredVolumeInfo[key] === "string") {
            filteredVolumeInfo[key] = sanitizeString(filteredVolumeInfo[key])
          }
        }

        return filteredVolumeInfo
      })

      return filteredData
    })
    .then(async (filteredData) => {
      let data = []
      try {
        const fileContent = await fs.readFile("books.json", "utf-8")
        data = JSON.parse(fileContent)
      } catch (error) {
        console.error(`${i + 1}個目のファイルを読み込む際にエラーが発生しました:`, error)
      }

      data.push(...filteredData)

      const jsonData = JSON.stringify(data, null, 2)

      return fs.writeFile("books.json", jsonData)
    })
    .then(() => {
      console.log(`${i + 1}個目のファイルが正常に追記されました: books.json`)
    })
    .catch((error) => {
      console.error(`${i + 1}個目のリクエスト中にエラーが発生しました:`, error)
    })
})
