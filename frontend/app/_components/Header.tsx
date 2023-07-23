import Link from "next/link"
import { Suspense } from "react"

export const Header: React.FC = () => {
  return (
    <div className="border-b border-secondary pb-2 max-w-screen-2xl px-2 md:px-4 mx-auto">
      <header className="flex justify-between items-center py-4">
        <Link href="/" className="inline-flex items-center text-black-800 text-xl font-bold gap-2.5" aria-label="logo">
          みんなの本屋さん
        </Link>
        <nav className="hidden md:flex gap-12">
          <Link
            href="/"
            className="text-gray-600 hover:text-pink-500 active:text-pink-700 text-lg font-semibold transition duration-100"
          >
            Memo
          </Link>
          <Link
            href="/"
            className="text-gray-600 hover:text-pink-500 active:text-pink-700 text-lg font-semibold transition duration-100"
          >
            FAQ
          </Link>
          <Link
            href="/"
            className="text-gray-600 hover:text-pink-500 active:text-pink-700 text-lg font-semibold transition duration-100"
          >
            Setting
          </Link>
        </nav>
      </header>
    </div>
  )
}
