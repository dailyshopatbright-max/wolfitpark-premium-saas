"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { PageTransition } from "@/components/animation/page-transition"
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Save,
  Eye,
  EyeOff,
  Smartphone,
  Mail,
  Monitor,
  Download,
} from "lucide-react"

const tabs = [
  { value: "profile", label: "Profile", icon: User },
  { value: "notifications", label: "Notifications", icon: Bell },
  { value: "security", label: "Security", icon: Shield },
  { value: "billing", label: "Billing", icon: CreditCard },
]

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <PageTransition>
      <div className="p-4 sm:p-6 lg:p-8 space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">
            Settings
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your account settings and preferences.
          </p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none h-auto p-0 gap-0">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="relative px-4 py-3 rounded-none border-b-2 border-transparent data-active:border-primary data-active:text-foreground data-active:bg-transparent text-muted-foreground hover:text-foreground transition-colors gap-2"
                >
                  <Icon className="size-4" />
                  {tab.label}
                </TabsTrigger>
              )
            })}
          </TabsList>

          <Separator className="my-6" />

          <TabsContent value="profile">
            <ProfileSection />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationsSection />
          </TabsContent>

          <TabsContent value="security">
            <SecuritySection showPassword={showPassword} onTogglePassword={() => setShowPassword((p) => !p)} />
          </TabsContent>

          <TabsContent value="billing">
            <BillingSection />
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  )
}

function ProfileSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your personal details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 pb-2">
            <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary text-lg font-semibold">
              JD
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">John Doe</p>
              <p className="text-xs text-muted-foreground">Avatar</p>
            </div>
            <Button variant="outline" size="sm" className="ml-auto">
              Change
            </Button>
          </div>
          <Separator />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input id="first-name" defaultValue="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input id="last-name" defaultValue="Doe" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="john@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" defaultValue="+1 (307) 555-0123" />
          </div>
          <div className="flex justify-end pt-2">
            <Button size="sm">
              <Save className="size-4" />
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function NotificationsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>Choose what emails you receive.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {[
            { label: "Formation updates", description: "Get notified about your company formation progress.", defaultChecked: true },
            { label: "Document availability", description: "When new documents are ready for download.", defaultChecked: true },
            { label: "Compliance reminders", description: "Annual reports, BOI filings, and other deadlines.", defaultChecked: true },
            { label: "Marketing emails", description: "Tips, product updates, and offers.", defaultChecked: false },
          ].map((item) => (
            <div key={item.label} className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
              </div>
              <Switch defaultChecked={item.defaultChecked} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Push Notifications</CardTitle>
          <CardDescription>Notifications sent to your devices.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {[
            { label: "Status changes", description: "When your formation status updates.", defaultChecked: true },
            { label: "New messages", description: "When you receive a new message.", defaultChecked: true },
            { label: "Support responses", description: "When your support ticket is updated.", defaultChecked: true },
          ].map((item) => (
            <div key={item.label} className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
              </div>
              <Switch defaultChecked={item.defaultChecked} />
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  )
}

function SecuritySection({ showPassword, onTogglePassword }: { showPassword: boolean; onTogglePassword: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>Update your password.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <div className="relative">
              <Input id="current-password" type={showPassword ? "text" : "password"} />
              <button
                type="button"
                onClick={onTogglePassword}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <Button size="sm">Update Password</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>Add an extra layer of security.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-foreground">Authenticator App</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Use an authenticator app to generate one-time codes.
              </p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-foreground">SMS Codes</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Receive verification codes via SMS.
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sessions</CardTitle>
          <CardDescription>Manage your active sessions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { device: "MacBook Pro", location: "Bryant, AR", time: "Active now", icon: Monitor, current: true },
            { device: "iPhone 15", location: "Bryant, AR", time: "2 hours ago", icon: Smartphone },
          ].map((session) => {
            const Icon = session.icon
            return (
              <div key={session.device} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Icon className="size-4 text-muted-foreground" />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-foreground">{session.device}</p>
                      {session.current && (
                        <Badge variant="outline" className="text-[10px] h-4.5 px-1.5 text-emerald-400 border-emerald-500/20 bg-emerald-500/10">
                          Current
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{session.location} &middot; {session.time}</p>
                  </div>
                </div>
                {!session.current && (
                  <Button variant="ghost" size="xs" className="text-destructive hover:text-destructive">
                    Revoke
                  </Button>
                )}
              </div>
            )
          })}
        </CardContent>
      </Card>
    </motion.div>
  )
}

function BillingSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>Your subscription details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-xl bg-muted/50 border border-border p-4">
            <div>
              <p className="text-sm font-medium text-foreground">Professional Plan</p>
              <p className="text-xs text-muted-foreground mt-0.5">$199/year &middot; Wyoming LLC</p>
            </div>
            <Badge variant="secondary">Active</Badge>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              Upgrade Plan
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              Cancel Subscription
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Manage your payment details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-xl border border-border p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/5">
                <CreditCard className="size-4.5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Visa ending in 4242</p>
                <p className="text-xs text-muted-foreground">Expires 12/2027</p>
              </div>
            </div>
            <Badge variant="outline">Default</Badge>
          </div>
          <Button variant="outline" size="sm">
            Add Payment Method
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View your past invoices.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: "Mar 15, 2026", description: "Professional Plan - Wyoming LLC", amount: "$199.00", status: "Paid" as const },
              { date: "Feb 15, 2026", description: "Professional Plan - Wyoming LLC", amount: "$199.00", status: "Paid" as const },
              { date: "Jan 15, 2026", description: "Professional Plan - Wyoming LLC", amount: "$199.00", status: "Paid" as const },
            ].map((invoice) => (
              <div key={invoice.date} className="flex items-center justify-between gap-4 rounded-lg border border-border p-3">
                <div className="min-w-0">
                  <p className="text-sm text-foreground">{invoice.description}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{invoice.date}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm font-medium text-foreground">{invoice.amount}</span>
                  <Badge variant="outline" className="text-emerald-400 border-emerald-500/20 bg-emerald-500/10">
                    {invoice.status}
                  </Badge>
                  <Button variant="ghost" size="icon-xs">
                    <Download className="size-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
