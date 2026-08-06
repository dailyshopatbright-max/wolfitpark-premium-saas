"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { PageTransition } from "@/components/animation/page-transition"
import {
  CheckCircle2,
  Clock,
  FileText,
  ArrowRight,
  Download,
  Building2,
  Globe,
  ShieldCheck,
  UserCheck,
  MapPin,
  CreditCard,
} from "lucide-react"

const formationSteps = [
  { step: 1, label: "Order Placed", date: "Mar 15, 2026", status: "completed" as const, description: "Your Wyoming LLC order has been received and verified." },
  { step: 2, label: "Processing", date: "Mar 16, 2026", status: "completed" as const, description: "Application details reviewed and prepared for filing." },
  { step: 3, label: "State Filing", date: "Mar 18, 2026", status: "completed" as const, description: "Articles of Organization submitted to Wyoming Secretary of State." },
  { step: 4, label: "EIN Assignment", date: "Mar 20, 2026", status: "completed" as const, description: "IRS issued Employer Identification Number: 82-1234567." },
  { step: 5, label: "Operating Agreement", date: "Pending", status: "current" as const, description: "Draft operating agreement ready for your review and signature." },
  { step: 6, label: "Documents Ready", date: "Expected Apr 1", status: "pending" as const, description: "Final incorporation documents will be available for download." },
  { step: 7, label: "Compliance Setup", date: "Pending", status: "pending" as const, description: "BOI reporting, annual report reminders, and compliance monitoring." },
]

const companyInfo = [
  { label: "Company Name", value: "Wolfitpark Ventures LLC", icon: Building2 },
  { label: "State of Formation", value: "Wyoming", icon: Globe },
  { label: "EIN", value: "82-1234567", icon: FileText },
  { label: "Registered Agent", value: "Wolfitpark Services Inc.", icon: ShieldCheck },
  { label: "Business Address", value: "701 Amy Cir, Bryant, AR 72022", icon: MapPin },
]

export default function StatusPage() {
  return (
    <PageTransition>
      <div className="p-4 sm:p-6 lg:p-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">
              Formation Status
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Track your incorporation progress in real time.
            </p>
          </div>
          <Badge variant="secondary" className="gap-1.5">
            <Clock className="size-3.5" />
            In Progress
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Timeline</CardTitle>
                <CardDescription>
                  Wyoming LLC formation progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-0">
                  {formationSteps.map((step, i) => (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                      className="relative flex gap-5 pb-8 last:pb-0"
                    >
                      {i < formationSteps.length - 1 && (
                        <div
                          className={cn(
                            "absolute left-[15px] top-8 bottom-0 w-0.5",
                            step.status === "completed"
                              ? "bg-primary/40"
                              : "bg-border"
                          )}
                        />
                      )}
                      <div
                        className={cn(
                          "relative z-10 mt-1 size-8 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors",
                          step.status === "completed"
                            ? "border-primary bg-primary"
                            : step.status === "current"
                              ? "border-primary bg-card"
                              : "border-muted-foreground/30 bg-card"
                        )}
                      >
                        {step.status === "completed" ? (
                          <CheckCircle2 className="size-4 text-primary-foreground" />
                        ) : step.status === "current" ? (
                          <span className="size-2.5 rounded-full bg-primary animate-pulse" />
                        ) : (
                          <span className="size-2.5 rounded-full bg-muted-foreground/30" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0 pt-1">
                        <div className="flex items-center gap-2">
                          <p
                            className={cn(
                              "text-sm font-medium",
                              step.status === "completed" || step.status === "current"
                                ? "text-foreground"
                                : "text-muted-foreground"
                            )}
                          >
                            {step.label}
                          </p>
                          <span className="text-xs text-muted-foreground/50">
                            {step.date}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {companyInfo.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="flex items-start gap-3">
                      <Icon className="size-4 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                        <p className="text-sm text-foreground font-medium mt-0.5">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Articles of Organization", status: "Ready" },
                  { name: "EIN Confirmation Letter", status: "Ready" },
                  { name: "Operating Agreement", status: "Pending" },
                  { name: "Certificate of Good Standing", status: "Pending" },
                ].map((doc) => (
                  <div
                    key={doc.name}
                    className="flex items-center justify-between gap-2 rounded-lg border border-border p-3"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <FileText className="size-4 text-muted-foreground shrink-0" />
                      <span className="text-sm text-foreground truncate">
                        {doc.name}
                      </span>
                    </div>
                    {doc.status === "Ready" ? (
                      <Button variant="ghost" size="icon-xs">
                        <Download className="size-3.5" />
                      </Button>
                    ) : (
                      <Badge variant="outline" className="shrink-0 text-[10px]">
                        Pending
                      </Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
