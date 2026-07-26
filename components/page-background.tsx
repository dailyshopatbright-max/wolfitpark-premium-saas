"use client"

import { ImagesSlider } from "@/components/ui/images-slider"
import { images } from "@/lib/site-data"

const bgImages = [images.hero[0], images.office[0], images.tech[0], images.ai[0]]

export function PageBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <ImagesSlider
        className="h-full w-full"
        images={bgImages}
        overlayClassName="bg-gradient-to-b from-[#020617]/85 via-[#0B1120]/75 to-[#0F172A]/85"
        autoplay
        direction="up"
      >
        <div />
      </ImagesSlider>
    </div>
  )
}
