import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CtaSection, PageHero, SectionHeading } from "@/components/page-sections"
import { PortfolioGallery } from "@/components/portfolio-gallery"
export const metadata:Metadata={title:"Portfolio",description:"Explore selected SaaS, healthcare, finance, retail, enterprise, and AI projects delivered by Wolfitpark.",alternates:{canonical:"/portfolio"}}
export default function PortfolioPage(){return <><PageHero eyebrow="Selected work" title="Products that changed how the business moves." description="A selection of platforms, workflows, and intelligent systems designed around measurable operational outcomes." actions={<Button size="lg" render={<Link href="/consultation"/>}>Create your case study<ArrowRight data-icon="inline-end"/></Button>}/><section className="section-pad"><div className="container-site"><SectionHeading eyebrow="Project gallery" title="Transformation, made tangible." description="Filter by domain to see how focused product thinking translates into real business performance."/><div className="mt-12"><PortfolioGallery/></div></div></section><CtaSection title="Your strongest case study could be next." description="Tell us what is slowing your organization down and what better could look like."/></>}
