"use client"

import Link from "next/link"
import { ArrowRight, CalendarDays, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FadeIn, FadeInStagger } from "@/components/animation/fade-in"
import { SectionWrapper } from "@/components/layout/section-wrapper"
import { posts } from "@/lib/site-data"

const postImages: Record<string, string> = {
  "designing-ai-automation": "/images/markus-code.jpg",
  "erp-modernization": "/images/hackernoon.jpg",
  "saas-metrics": "/images/mimi-workspace.jpg",
}

export function BlogSection() {
  return (
    <SectionWrapper className="bg-muted/30">
      <div className="container-site relative">
        <FadeIn className="flex items-end justify-between">
          <div>
            <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[.22em] text-primary">
              Latest Insights
            </p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Thinking that builds better systems
            </h2>
          </div>
        </FadeIn>
        <FadeInStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="flex aspect-[16/9] items-center justify-center rounded-t-2xl overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10">
                <img src={postImages[post.slug] || postImages["designing-ai-automation"]} alt={post.title} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <Badge variant="outline" className="w-fit rounded-full text-xs">
                  {post.category}
                </Badge>
                <h3 className="mt-4 text-lg font-semibold leading-snug transition-colors group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="size-3.5" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3.5" />
                    {post.read}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </FadeInStagger>
        <FadeIn className="mt-10">
          <Button variant="outline" render={<Link href="/blog" />} nativeButton={false}>
            View all articles <ArrowRight data-icon="inline-end" />
          </Button>
        </FadeIn>
      </div>
    </SectionWrapper>
  )
}
