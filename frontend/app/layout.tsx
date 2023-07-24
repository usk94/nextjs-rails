import { Header } from "./_components/header"
import "./globals.css"
import { Inter } from "next/font/google"
import ReduxProvider from "@/redux/provider"
import Snackbar from "./_components/snackbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "みんなの本屋さん",
  description: "オンラインで本を買える（風に見せている）サービスです。",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <Header />
          {children}
          <Snackbar />
        </ReduxProvider>
      </body>
    </html>
  )
}
