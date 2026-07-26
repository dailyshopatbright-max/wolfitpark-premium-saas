import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BookOpen, Code2, Key, Package, ShieldCheck, Zap } from "lucide-react"
import { PageTransition } from "@/components/animation/page-transition"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "API Reference",
  description: "Wolfitpark API documentation — integrate with RESTful APIs, SDKs, and webhooks for AI agents, automation, and business tools.",
  alternates: { canonical: "/api-documentation" },
}

const endpoints = [
  { method: "GET", path: "/api/v1/agents", description: "Retrieve a list of all AI agents", auth: "API Key" },
  { method: "POST", path: "/api/v1/agents", description: "Create a new AI agent configuration", auth: "API Key" },
  { method: "GET", path: "/api/v1/agents/:id", description: "Get details of a specific AI agent", auth: "API Key" },
  { method: "PUT", path: "/api/v1/agents/:id", description: "Update an existing AI agent", auth: "API Key" },
  { method: "DELETE", path: "/api/v1/agents/:id", description: "Remove an AI agent", auth: "API Key" },
] as const

function CodeBlock({ code, lang }: { code: string; lang: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-[#0B1120]">
      <div className="flex items-center justify-between border-b border-border/50 px-4 py-2">
        <span className="text-xs text-muted-foreground">{lang}</span>
        <button className="text-xs text-muted-foreground hover:text-foreground">Copy</button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed"><code>{code}</code></pre>
    </div>
  )
}

const sdks = [
  { name: "JavaScript / TypeScript", description: "Official Node.js SDK with full TypeScript support.", icon: Code2 },
  { name: "Python", description: "Native Python SDK for integrating with your data science and automation workflows.", icon: Code2 },
  { name: "Go", description: "High-performance Go SDK for building scalable integrations.", icon: Code2 },
  { name: "REST API", description: "Platform-agnostic RESTful API with comprehensive documentation.", icon: Code2 },
] as const

export default function ApiDocumentationPage() {
  return (
    <PageTransition>
      <section className="relative overflow-hidden border-b border-border bg-muted/30">
        <div className="hero-grid absolute inset-0 opacity-45" />
        <div className="container-site relative py-20 sm:py-28">
          <Badge variant="outline" className="mb-4">Developers</Badge>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">API Reference</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">Integrate with Wolfitpark. Build powerful integrations using our RESTful API, SDKs, and webhooks.</p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site max-w-4xl">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">API Overview</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">The Wolfitpark API provides programmatic access to all platform features including AI agents, automation workflows, business data, and incorporation services. Our RESTful API uses standard HTTP methods and returns JSON responses.</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">Base URL: <code className="rounded bg-muted px-2 py-0.5 text-sm font-mono">https://api.wolfitpark.online/v1</code></p>
        </div>
      </section>

      <section className="section-pad border-y border-border bg-muted/40">
        <div className="container-site max-w-4xl">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Key className="size-5" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight">Authentication</h2>
          </div>
          <p className="mt-4 leading-relaxed text-muted-foreground">All API requests require authentication via API key or OAuth 2.0. Include your API key in the <code className="rounded bg-muted px-2 py-0.5 text-sm font-mono">Authorization</code> header as <code className="rounded bg-muted px-2 py-0.5 text-sm font-mono">Bearer &lt;your-api-key&gt;</code>.</p>

          <div className="mt-8">
            <h3 className="text-lg font-semibold">API Keys</h3>
            <p className="mt-2 text-sm text-muted-foreground">Generate API keys from your dashboard. Each key has configurable permissions and can be revoked independently.</p>
            <CodeBlock lang="bash" code={`# Authenticate with API key\ncurl -H "Authorization: Bearer wk_api_your_key_here" \\\n  https://api.wolfitpark.online/v1/agents`} />
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold">OAuth 2.0</h3>
            <p className="mt-2 text-sm text-muted-foreground">For applications acting on behalf of users, we support the OAuth 2.0 authorization code flow.</p>
            <CodeBlock lang="bash" code={`# Get access token\ncurl -X POST https://api.wolfitpark.online/v1/oauth/token \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "client_id": "your_client_id",\n    "client_secret": "your_client_secret",\n    "grant_type": "authorization_code",\n    "code": "auth_code_here"\n  }'`} />
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site max-w-4xl">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Endpoints</h2>
          <p className="mt-4 text-muted-foreground">Below are representative examples of our core API endpoints. Full documentation for every endpoint is available in the interactive API reference.</p>

          <div className="mt-8 space-y-3">
            {endpoints.map((ep) => (
              <div key={ep.path} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
                <Badge
                  variant={
                    ep.method === "GET" ? "outline" :
                    ep.method === "POST" ? "default" :
                    ep.method === "PUT" ? "secondary" :
                    "destructive"
                  }
                  className="shrink-0 font-mono text-[10px]"
                >
                  {ep.method}
                </Badge>
                <code className="min-w-0 flex-1 font-mono text-sm">{ep.path}</code>
                <span className="hidden text-sm text-muted-foreground sm:block">{ep.description}</span>
                <span className="shrink-0 text-xs text-muted-foreground">{ep.auth}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 space-y-8">
            <div>
              <h3 className="text-lg font-semibold">Example: List AI Agents</h3>
              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <CodeBlock lang="curl" code={`curl -H "Authorization: Bearer wk_api_key" \\\n  https://api.wolfitpark.online/v1/agents`} />
                <CodeBlock lang="javascript" code={`const response = await fetch(\n  'https://api.wolfitpark.online/v1/agents',\n  { headers: { Authorization: 'Bearer wk_api_key' } }\n)\nconst agents = await response.json()`} />
                <CodeBlock lang="python" code={`import wolfitpark\n\nclient = wolfitpark.Client(api_key="wk_api_key")\nagents = client.agents.list()`} />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Example: Create a Workflow</h3>
              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <CodeBlock lang="curl" code={`curl -X POST https://api.wolfitpark.online/v1/workflows \\\n  -H "Authorization: Bearer wk_api_key" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "name": "Customer Onboarding",\n    "trigger": "form.submitted",\n    "steps": []\n  }'`} />
                <CodeBlock lang="javascript" code={`const workflow = await fetch(\n  'https://api.wolfitpark.online/v1/workflows',\n  {\n    method: 'POST',\n    headers: {\n      Authorization: 'Bearer wk_api_key',\n      'Content-Type': 'application/json',\n    },\n    body: JSON.stringify({\n      name: 'Customer Onboarding',\n      trigger: 'form.submitted',\n      steps: [],\n    }),\n  }\n).then(r => r.json())`} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad border-y border-border bg-muted/40">
        <div className="container-site max-w-4xl">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Zap className="size-5" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight">Rate Limiting</h2>
          </div>
          <p className="mt-4 leading-relaxed text-muted-foreground">API requests are rate-limited based on your plan tier. Limits are applied per API key on a rolling 60-second window. Rate limit headers are included in all responses:</p>
          <div className="mt-6 space-y-2 rounded-2xl border border-border bg-card p-5 text-sm">
            <div className="flex items-center gap-2"><code className="rounded bg-muted px-2 py-0.5 font-mono text-xs">X-RateLimit-Limit</code><span className="text-muted-foreground">Maximum requests per window</span></div>
            <div className="flex items-center gap-2"><code className="rounded bg-muted px-2 py-0.5 font-mono text-xs">X-RateLimit-Remaining</code><span className="text-muted-foreground">Requests remaining in current window</span></div>
            <div className="flex items-center gap-2"><code className="rounded bg-muted px-2 py-0.5 font-mono text-xs">X-RateLimit-Reset</code><span className="text-muted-foreground">Unix timestamp when the window resets</span></div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site max-w-4xl">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Package className="size-5" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight">SDKs & Libraries</h2>
          </div>
          <p className="mt-4 text-muted-foreground">Official SDKs make it easy to integrate Wolfitpark into your applications.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {sdks.map((sdk) => {
              const Icon = sdk.icon
              return (
                <div key={sdk.name} className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{sdk.name}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">{sdk.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site">
          <div className="relative overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground sm:p-12 lg:flex lg:items-center lg:justify-between lg:p-16">
            <div className="hero-grid absolute inset-0 opacity-20" />
            <div className="relative max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Need help integrating?</h2>
              <p className="mt-4 text-primary-foreground/75">Our developer relations team is here to help you build successful integrations.</p>
            </div>
            <Button variant="secondary" size="lg" className="relative mt-8 lg:mt-0" render={<Link href="/contact" />}>Contact Developer Relations <ArrowRight data-icon="inline-end" /></Button>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
