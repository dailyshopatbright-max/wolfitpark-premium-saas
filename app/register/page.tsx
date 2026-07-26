"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowRight, Mail, Lock, User, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-provider"

function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirect") || "/incorporate/register"
  const { register, login } = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    const result = await register(name, email, password)
    if (result.success) {
      const loginResult = await login(email, password)
      setLoading(false)
      if (loginResult.success) {
        router.push(redirectTo)
      } else {
        router.push(`/login?redirect=${encodeURIComponent(redirectTo)}`)
      }
    } else {
      setError(result.error || "Registration failed")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-2xl">
          <div className="text-center">
            <Badge variant="outline" className="rounded-full">
              Get Started
            </Badge>
            <h1 className="mt-4 text-2xl font-bold">Create Your Account</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Start your US business formation journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            {error && (
              <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium">Email</label>
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
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="password"
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-10 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                  placeholder="Minimum 6 characters"
                  required
                  minLength={6}
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
              {loading ? "Creating account..." : "Create Account"}
              <ArrowRight data-icon="inline-end" />
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href={redirectTo !== "/incorporate/register" ? `/login?redirect=${encodeURIComponent(redirectTo)}` : "/login"} className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function RegisterPage() {
  return <Suspense><RegisterForm /></Suspense>
}