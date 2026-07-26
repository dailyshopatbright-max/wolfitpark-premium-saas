"use client"

import Link from "next/link"
import dynamic from "next/dynamic"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FadeIn, SlideUp } from "@/components/animation/fade-in"

const SparklesCore = dynamic(() => import("@/components/ui/sparkles").then(m => ({ default: m.SparklesCore })), {
  ssr: false,
  loading: () => <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#020617] via-[#0B1120] to-[#0F172A]" />,
})

const Globe3D = dynamic(() => import("@/components/ui/3d-globe").then(m => ({ default: m.Globe3D })), {
  ssr: false,
  loading: () => <div className="flex h-full w-full items-center justify-center"><div className="size-16 animate-pulse rounded-full bg-primary/20" /></div>,
})

import type { GlobeMarker } from "@/components/ui/3d-globe"

const globeMarkers: GlobeMarker[] = [
  { lat: 40.7128, lng: -74.006, label: "New York" },
  { lat: 51.5074, lng: -0.1278, label: "London" },
  { lat: 35.6762, lng: 139.6503, label: "Tokyo" },
  { lat: -33.8688, lng: 151.2093, label: "Sydney" },
  { lat: 48.8566, lng: 2.3522, label: "Paris" },
  { lat: 28.6139, lng: 77.209, label: "New Delhi" },
  { lat: 25.2048, lng: 55.2708, label: "Dubai" },
  { lat: 1.3521, lng: 103.8198, label: "Singapore" },
  { lat: 37.5665, lng: 126.978, label: "Seoul" },
  { lat: -22.9068, lng: -43.1729, label: "Rio de Janeiro" },
]

const trustItems = ["PCI Compliant", "SOC 2 Ready", "256-bit Encryption", "99.99% Uptime"] as const

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-[1]">
        <SparklesCore
          id="hero-sparkles"
          background="transparent"
          minSize={0.3}
          maxSize={1.0}
          particleDensity={50}
          className="w-full h-full"
          particleColor="#3B82F6"
        />
      </div>
      <div className="container-site relative z-20 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] py-20 min-h-screen">
        <div className="max-w-2xl">
          <FadeIn delay={0.1}>
            <Badge variant="outline" className="mb-6 rounded-full border-primary/30 bg-primary/5 px-4 py-1.5 text-primary text-xs">
              <span className="mr-1.5 inline-block size-2 rounded-full bg-primary animate-pulse-slow" />
              Enterprise AI Platform
            </Badge>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className="text-balance text-5xl font-semibold tracking-[-0.055em] sm:text-7xl lg:text-7xl xl:text-7xl leading-[1.05]">
              Build Smarter.<br />
              <span className="text-gradient">Scale Faster.</span>
            </h1>
          </FadeIn>
          <SlideUp delay={0.3}>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-blue-200/70">
              Wolfitpark develops modern software, AI-powered automation, cloud solutions, and business
              management platforms that streamline operations and accelerate growth.
            </p>
          </SlideUp>
          <SlideUp delay={0.4}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25" render={<Link href="/register" />} nativeButton={false}>
                Get Started
                <ArrowRight data-icon="inline-end" />
              </Button>
            </div>
          </SlideUp>
          <FadeIn delay={0.5}>
            <div className="mt-10 flex flex-wrap gap-2">
              {trustItems.map((item) => (
                <Badge key={item} variant="outline" className="gap-1.5 rounded-full border-blue-400/10 bg-blue-400/5 px-3 py-1 text-xs text-blue-200/60">
                  <CheckCircle2 className="size-3 text-primary" />
                  {item}
                </Badge>
              ))}
            </div>
          </FadeIn>
        </div>
        <div className="relative h-[500px] hidden lg:block">
          <Globe3D
            markers={globeMarkers}
            config={{
              atmosphereColor: "#3B82F6",
              atmosphereIntensity: 30,
              autoRotateSpeed: 0.4,
            }}
            className="h-full w-full"
          />
        </div>
      </div>
    </section>
  )
}
