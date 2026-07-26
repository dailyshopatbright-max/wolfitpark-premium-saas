"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowRight, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-provider"

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirect") || "/dashboard"
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    const result = await login(email, password)
    setLoading(false)
    if (result.success) {
      router.push(redirectTo)
    } else {
      setError(result.error || "Login failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-2xl">
          <div className="text-center">
            <Badge variant="outline" className="rounded-full">
              Welcome back
            </Badge>
            <h1 className="mt-4 text-2xl font-semibold">Sign in to Wolfitpark</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Access your dashboard and incorporation status
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            {error && (
              <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="password"
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-10 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
              <ArrowRight data-icon="inline-end" />
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href={redirectTo !== "/dashboard" ? `/register?redirect=${encodeURIComponent(redirectTo)}` : "/register"} className="font-medium text-primary hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return <Suspense><LoginForm /></Suspense>
}