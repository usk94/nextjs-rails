import Link from "next/link"
import MenuBook from "@mui/icons-material/MenuBook"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import { Suspense } from "react"

export const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center py-4 bg-secondary-light max-w-screen-2xl px-2 mx-auto">
      <Link href="/" className="inline-flex font-zen items-center text-xl font-bold gap-2.5 ml-2">
        <MenuBook />
        みんなの本屋さん
      </Link>
      <nav className="flex gap-12 mr-6">
        <Link href="/upload">棚に並べる</Link>
        <Link href="/home">
          <AccountCircleIcon />
        </Link>
      </nav>
    </header>
  )
}
