"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { PageTransition } from "@/components/animation/page-transition"
import {
  FileText,
  Download,
  Eye,
  File,
  FileCheck,
  FileSignature,
  ScrollText,
  ShieldCheck,
  Landmark,
} from "lucide-react"

const documentCategories = [
  {
    title: "Incorporation Documents",
    documents: [
      { name: "Articles of Organization", type: "PDF", size: "245 KB", status: "final" as const, icon: FileText },
      { name: "Certificate of Formation", type: "PDF", size: "180 KB", status: "final" as const, icon: FileCheck },
      { name: "Operating Agreement", type: "DOCX", size: "320 KB", status: "draft" as const, icon: FileSignature },
      { name: "EIN Confirmation Letter", type: "PDF", size: "120 KB", status: "final" as const, icon: FileText },
    ],
  },
  {
    title: "Compliance & Filings",
    documents: [
      { name: "BOI Report", type: "PDF", size: "95 KB", status: "pending" as const, icon: ShieldCheck },
      { name: "Annual Report (2026)", type: "PDF", size: "150 KB", status: "pending" as const, icon: FileText },
      { name: "State Tax Filing", type: "PDF", size: "210 KB", status: "draft" as const, icon: Landmark },
    ],
  },
  {
    title: "Financial Documents",
    documents: [
      { name: "Bank Resolution", type: "PDF", size: "175 KB", status: "final" as const, icon: ScrollText },
      { name: "Invoices", type: "PDF", size: "890 KB", status: "final" as const, icon: FileText },
      { name: "Receipts", type: "PDF", size: "1.2 MB", status: "final" as const, icon: FileText },
    ],
  },
]

const statusColor: Record<string, string> = {
  final: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  draft: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  pending: "text-muted-foreground bg-muted border-border",
}

const statusLabel: Record<string, string> = {
  final: "Final",
  draft: "Draft",
  pending: "Pending",
}

export default function DocumentsPage() {
  return (
    <PageTransition>
      <div className="p-4 sm:p-6 lg:p-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">
              Documents
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              View and download your incorporation documents.
            </p>
          </div>
          <Button variant="default" size="sm">
            <Download className="size-4" />
            Download All
          </Button>
        </div>

        <div className="space-y-6">
          {documentCategories.map((category, ci) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: ci * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {category.documents.map((doc, di) => {
                      const DocIcon = doc.icon
                      return (
                        <motion.div
                          key={doc.name}
                          initial={{ opacity: 0, scale: 0.97 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: ci * 0.1 + di * 0.04 }}
                          className="group relative overflow-hidden rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:border-primary/20 hover:shadow-md"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/5">
                              <DocIcon className="size-4.5 text-primary" />
                            </div>
                            <Badge
                              variant="outline"
                              className={cn("text-[10px] px-1.5 py-0 h-5", statusColor[doc.status])}
                            >
                              {statusLabel[doc.status]}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium text-foreground truncate">
                            {doc.name}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {doc.type} &middot; {doc.size}
                          </p>
                          <div className="flex items-center gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <Button variant="ghost" size="xs" className="gap-1">
                              <Eye className="size-3" />
                              Preview
                            </Button>
                            <Button variant="ghost" size="xs" className="gap-1">
                              <Download className="size-3" />
                              Download
                            </Button>
                          </div>
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </motion.div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
