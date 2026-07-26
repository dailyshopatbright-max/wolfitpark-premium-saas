"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type Props = {
  children: React.ReactNode
  className?: string
}

export function MagneticButton({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const max = 10
    const clampedX = Math.max(-max, Math.min(max, x * 0.3))
    const clampedY = Math.max(-max, Math.min(max, y * 0.3))
    setPosition({ x: clampedX, y: clampedY })
  }

  function handleMouseLeave() {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  )
}
