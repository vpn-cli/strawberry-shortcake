import React from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface StickerProps {
  children: React.ReactNode
  className?: string
  rotation?: number
  delay?: number
}

export default function Sticker({ children, className, rotation = 0, delay = 0 }: StickerProps) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ scale: 0, rotate: rotation }}
      whileInView={{ scale: 1, rotate: rotation + Math.random() * 10 - 5 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ scale: 1.1, rotate: rotation + Math.random() * 20 - 10, cursor: 'grab' }}
      whileTap={{ scale: 0.9, cursor: 'grabbing' }}
      transition={{ type: "spring", stiffness: 200, damping: 15, delay: delay }}
      className={twMerge(clsx("absolute inline-flex items-center justify-center select-none z-20 pointer-events-auto", className))}
    >
      {children}
    </motion.div>
  )
}
