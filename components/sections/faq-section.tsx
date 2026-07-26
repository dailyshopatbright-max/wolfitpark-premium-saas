"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FadeIn } from "@/components/animation/fade-in"
import { SectionWrapper } from "@/components/layout/section-wrapper"
import { faqs } from "@/lib/site-data"

export function FAQSection() {
  return (
    <SectionWrapper>
      <div className="container-site max-w-3xl">
        <FadeIn className="text-center">
          <p className="mb-4 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[.22em] text-primary">
            Frequently Asked Questions
          </p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Common questions
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Everything you need to know before we start working together.
          </p>
        </FadeIn>
        <FadeIn delay={0.2} className="mt-12">
          <Accordion className="rounded-2xl border border-border bg-card p-2">
            {faqs.map(([question, answer]) => (
              <AccordionItem key={question} value={question}>
                <AccordionTrigger className="px-4 py-4 text-base font-medium">
                  {question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="px-4 text-muted-foreground leading-relaxed">{answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </SectionWrapper>
  )
}
