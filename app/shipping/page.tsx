import type { Metadata } from "next"
import { PageTransition } from "@/components/animation/page-transition"
import { Badge } from "@/components/ui/badge"
import { legalContent } from "@/lib/site-data"

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: "Wolfitpark Shipping Policy — information about digital and physical delivery of documents.",
  alternates: { canonical: "/shipping" },
}

export default function ShippingPage() {
  const page = legalContent.shipping
  return (
    <PageTransition>
      <section className="section-pad">
        <div className="container-site max-w-4xl">
          <Badge variant="outline" className="mb-4">Legal</Badge>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{page.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: {page.updated}</p>
          <div className="mt-12 space-y-10">
            {page.sections.map(([heading, content]) => (
              <div key={heading}>
                <h2 className="text-xl font-semibold">{heading}</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">{content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
