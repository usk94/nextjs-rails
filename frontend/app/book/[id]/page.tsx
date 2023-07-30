"use client"

import { bookSchema } from "@/utils/bookValidator"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { Menu, MenuItem } from "@mui/material"
import useSWR from "swr"
import { useDispatch } from "react-redux"
import { open } from "@/redux/snackbarSlice"
import useSWRMutation from "swr/mutation"
import router from "next/router"
import { Book } from "@/types"

const fetcher = async (url: string) => {
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error("データの取得に失敗しました")
  }

  const data = await res.json()
  const result = bookSchema.safeParse(data.book)

  if (!result.success) {
    return {
      id: "",
      title: "",
      description: null,
      author: null,
      page_count: null,
      image: null,
      published_at: null,
      price: 0,
    }
  }

  return result.data
}

const deleter = async (url: string) => {
  await fetch(url, {
    method: "delete",
  })
}

const Page = ({ params }: { params: { id: string } }) => {
  const { data, isLoading, error } = useSWR(`${process.env.NEXT_PUBLIC_BACKEND_URL}/books/${params.id}/`, fetcher)
  const { trigger: deleteBook } = useSWRMutation(`${process.env.NEXT_PUBLIC_BACKEND_URL}/books/${params.id}/`, deleter)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const isOpen = !!anchorEl
  const dispatch = useDispatch()

  const book = data as Book

  if (error) {
    dispatch(open({ severity: "error", text: error.message }))
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleDelete = async () => {
    try {
      await deleteBook()
      router.push("/")
      dispatch(open({ severity: "info", text: "本を削除しました！" }))
    } catch {
      handleClose()
      dispatch(open({ severity: "error", text: "本の削除に失敗しました。再度お試しください。" }))
    }
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <div className="flex flex-col w-1/2 p-6 mx-4 mt-8">
        <div className="bg-secondary-lighter rounded-xl border border-secondary-light flex p-4">
          <img src={book.image || "/noImage.jpg"} alt={book.title} className="w-30 h-52" />
          <div className="ml-4">
            <p className="text-lg font-medium">{book.title}</p>
            <p className="mt-1 text-sm">{book.description}</p>
            <p className="mt-4 text-sm">{book.author} (著)</p>
            <p className="mt-1 text-sm">出版日: {book.published_at}</p>
            <p className="mt-1 text-sm">{book.page_count}ページ</p>
          </div>
        </div>
        <div className="flex mt-4">
          <div>
            <p className="text-base">価格: {book.price}💎</p>
            <p className="mt-1 text-xs text-gray">このサービスでの通貨はダイヤ 💎 です</p>
          </div>
          <div className="flex justify-center ml-auto">
            <button onClick={handleClick}>
              <MoreVertIcon />
            </button>
            <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose}>
              <MenuItem onClick={handleDelete}>削除</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
      <Link
        href=""
        className="mt-6 bg-primary text-white rounded px-4 py-1 flex items-center justify-center w-72 h-8 font-medium"
      >
        カートに進む
      </Link>
    </div>
  )
}

export default Page
