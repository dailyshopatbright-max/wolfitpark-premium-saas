import type { Metadata } from "next"
import Link from "next/link"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PageHero, SectionHeading } from "@/components/page-sections"
import { faqs } from "@/lib/site-data"
export const metadata:Metadata={title:"Frequently Asked Questions",description:"Answers about Wolfitpark software projects, AI automation, security, ownership, timelines, and support.",alternates:{canonical:"/faq"}}
export default function FAQPage(){return <><PageHero eyebrow="FAQ" title="Good questions lead to better systems." description="Straight answers about how we scope, build, secure, launch, and support software and transformation work."/><section className="section-pad"><div className="container-site grid gap-12 lg:grid-cols-[.65fr_1.35fr]"><div><SectionHeading eyebrow="What clients ask" title="Start with clarity."/><div className="mt-8 rounded-2xl border border-border bg-card p-6"><Mail className="size-5 text-primary"/><h3 className="mt-5 font-semibold">Still deciding?</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Send us the question behind the question. We will point you in the right direction.</p><Button className="mt-5" variant="outline" render={<Link href="/contact"/>}>Ask Wolfitpark</Button></div></div><Accordion>{faqs.map(([q,a],i)=><AccordionItem key={q} value={`faq-${i}`}><AccordionTrigger className="text-left text-base">{q}</AccordionTrigger><AccordionContent className="text-sm leading-relaxed text-muted-foreground">{a}</AccordionContent></AccordionItem>)}</Accordion></div></section></>}
