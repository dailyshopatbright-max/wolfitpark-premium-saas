"use client"

import { motion } from "framer-motion"
import { FadeIn } from "@/components/animation/fade-in"

const partners = [
  "Paykings", "TechNova", "Meridian Group", "Atlas Health", "Northstar Labs",
  "Forge Industries", "Relay Systems", "Launchpad Inc", "CloudBase",
  "Quantum AI", "Vector Analytics",
]

export function TrustedBy() {
  return (
    <section className="border-y border-border/50 bg-muted/20 py-12">
      <div className="container-site">
        <FadeIn>
          <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[.22em] text-muted-foreground">
            Trusted by innovative companies
          </p>
        </FadeIn>
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-12 items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          >
            {[...partners, ...partners].map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="flex h-12 shrink-0 items-center rounded-xl border border-border/40 bg-card/50 px-6 backdrop-blur-sm"
              >
                <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">{name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
