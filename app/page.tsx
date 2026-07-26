import dynamic from "next/dynamic"
import { PageTransition } from "@/components/animation/page-transition"
import { SectionWrapper } from "@/components/layout/section-wrapper"

const HeroSection = dynamic(() => import("@/components/sections/hero-section").then(m => ({ default: m.HeroSection })))
import { TrustedBy } from "@/components/sections/trusted-by"
import { MetricsBar } from "@/components/sections/metrics-bar"
import { ServicesGrid } from "@/components/sections/services-grid"
import { SolutionsGrid } from "@/components/sections/solutions-grid"
const IncorporationPreview = dynamic(() => import("@/components/sections/incorporation-preview").then(m => ({ default: m.IncorporationPreview })))
import { ProcessSection } from "@/components/sections/process-section"
const TestimonialsSection = dynamic(() => import("@/components/sections/testimonials-section").then(m => ({ default: m.TestimonialsSection })))
const FAQSection = dynamic(() => import("@/components/sections/faq-section").then(m => ({ default: m.FAQSection })))
const BlogSection = dynamic(() => import("@/components/sections/blog-section").then(m => ({ default: m.BlogSection })))
const CTASection = dynamic(() => import("@/components/sections/cta-section").then(m => ({ default: m.CTASection })))

export default function HomePage() {
  return (
    <PageTransition>
      <HeroSection />
      <SectionWrapper><TrustedBy /></SectionWrapper>
      <SectionWrapper className="bg-muted/30"><MetricsBar /></SectionWrapper>
      <ServicesGrid />
      <SolutionsGrid />
      <IncorporationPreview />
      <ProcessSection />
      <TestimonialsSection />
      <FAQSection />
      <BlogSection />
      <CTASection />
    </PageTransition>
  )
}
