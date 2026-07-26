"use client"

import { motion, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"

type Props = {
  children: React.ReactNode
  className?: string
  delay?: number
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
}

const slideUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
}

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay },
  }),
}

export function FadeIn({ children, className, delay = 0 }: Props) {
  return (
    <motion.div
      className={cn(className)}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      custom={delay}
    >
      {children}
    </motion.div>
  )
}

export function FadeInStagger({ children, className, delay = 0 }: Props) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  )
}

export function SlideUp({ children, className, delay = 0 }: Props) {
  return (
    <motion.div
      className={cn(className)}
      variants={slideUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      custom={delay}
    >
      {children}
    </motion.div>
  )
}

export function ScaleIn({ children, className, delay = 0 }: Props) {
  return (
    <motion.div
      className={cn(className)}
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      custom={delay}
    >
      {children}
    </motion.div>
  )
}
