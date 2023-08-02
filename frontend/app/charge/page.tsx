"use client"

import { motion } from "framer-motion"
import { useState } from "react"

const Page = () => {
  const handleTap = (event: MouseEvent | TouchEvent | PointerEvent) => {
    setIsTapped(false)
  }
  const [isTapped, setIsTapped] = useState(false)

  return (
    <div className="w-screen h-screen">
      <div className="flex justify-center items-center">
        <motion.button
          className="flex justify-center items-center"
          onTap={handleTap}
          whileHover={{
            scale: 1.1,
            transition: { type: "tween" },
          }}
          whileTap={{ scale: 0.9, transition: { duration: 1 } }}
          onTapStart={() => setIsTapped(true)}
        >
          {isTapped && <span className="text-xl">✨</span>}
          <span className="text-7xl">💎</span>
          {isTapped && <span className="text-xl">✨</span>}
        </motion.button>
      </div>
    </div>
  )
}

export default Page
