"use client"

import { Book } from "@/types"
import { useState } from "react"
import useSWRMutation from "swr/mutation"

const updateBook = async (url: string, { arg: { book } }: { arg: { book: Book } }) => {
  await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      book: book,
    }),
  })
}

const Page = () => {
  const { trigger, isMutating } = useSWRMutation("/api/user", updateBook)
  const [value, setValue] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleClickAddButton = async () => {
    console.log("here!")
  }

  const handleClickSubmitButton = async () => {
    console.log("here2!")
    // await trigger({ book: value })
  }

  return (
    <div className="bg-neutral flex flex-col">
      <div>
        <div className="text-lg font-semibold">クーポンを追加する</div>
        <span className="mt-2 text-sm font-light">
          クーポンコードをお持ちの方は、以下のフォームより
          <br />
          クーポンコードを入力してください。
        </span>
        <div className="mt-4 flex">
          <div className="grow-2 leading-none">
            <input
              type="text"
              onChange={handleChange}
              className="h-10 w-full border border-gray-lighter p-2 text-base font-light focus:border-primary focus:outline-none"
              placeholder="例）winter2020"
            />
          </div>
          <button
            type="button"
            onClick={handleClickAddButton}
            disabled={isMutating}
            className="ml-3 rounded border border-gray px-4 py-2 text-base font-semibold leading-none"
          >
            追加
          </button>
        </div>
      </div>
      <button type="button" onClick={handleClickSubmitButton} className="ml-3 rounded border border-gray px-4 py-2 text-base font-semibold leading-none w-24">
        submit!
      </button>
    </div>
  )
}

export default Page
