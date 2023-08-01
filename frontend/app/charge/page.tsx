"use client"

import { motion } from "framer-motion"

const Page = () => {
  const handleTap = (event: MouseEvent | TouchEvent | PointerEvent) => {
    console.log("タップしたよ！")
  }

  return (
    <div className="w-screen h-screen">
      <div className="flex justify-center items-center">
        <motion.button
          onTap={handleTap}
          className="text-7xl"
          whileHover={{
            scale: 1.2,
            // transition: { duration: 0.2 },
            transition: { type: "spring", stiffness: 400, damping: 17 },
          }}
          whileTap={{ scale: 0.9 }}
        >
          💎
        </motion.button>
      </div>
    </div>
  )
}

export default Page
