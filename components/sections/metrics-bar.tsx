"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const metrics = [
  { value: "120+", label: "Products Shipped" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "31%", label: "Avg. Acceleration" },
  { value: "99.99%", label: "Uptime" },
  { value: "50+", label: "Enterprise Clients" },
] as const

function AnimatedMetric({ value, label, index }: { value: string; label: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null!)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <div ref={ref} className="relative px-4 py-6 text-center">
      <motion.p
        className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        {value}
      </motion.p>
      <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm">{label}</p>
      <motion.div
        className="absolute bottom-0 left-1/4 right-1/4 h-0.5 rounded-full bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
      />
    </div>
  )
}

export function MetricsBar() {
  return (
    <section className="border-y border-border/50 bg-card/80 backdrop-blur-sm">
      <div className="container-site grid grid-cols-2 gap-px md:grid-cols-5">
        {metrics.map((metric, i) => (
          <AnimatedMetric key={metric.label} {...metric} index={i} />
        ))}
      </div>
    </section>
  )
}
