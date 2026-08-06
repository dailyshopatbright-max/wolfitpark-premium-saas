import type { Metadata, Viewport } from "next"
import { Inter, Plus_Jakarta_Sans, Geist } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { LenisProvider } from "@/components/animation/lenis-provider"
import { AuthProvider } from "@/components/auth-provider"
import { LazyPageBackground } from "@/components/lazy-page-background"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })
const generalSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-general-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
})
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
})

const siteUrl = "https://wolfitpark.online"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Wolfitpark — Enterprise AI, Automation & Business Incorporation",
    template: "%s | Wolfitpark",
  },
  description:
    "Enterprise AI agents, workflow automation, custom software, and US business incorporation services. Build smarter. Scale faster.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Wolfitpark",
    title: "Wolfitpark — Enterprise AI, Automation & Business Incorporation",
    description:
      "Enterprise AI agents, workflow automation, custom software, and US business incorporation services.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Wolfitpark — Enterprise AI, Automation & Business Incorporation",
    description:
      "Enterprise AI agents, workflow automation, and business incorporation services for ambitious organizations.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#020617",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Wolfitpark",
    url: siteUrl,
    email: "support@wolfitpark.online",
    address: {
      "@type": "PostalAddress",
      streetAddress: "701 Amy Cir",
      addressLocality: "Bryant",
      addressRegion: "AR",
      postalCode: "72022",
      addressCountry: "US",
    },
    sameAs: [],
  }

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`bg-background ${inter.variable} ${generalSans.variable} ${geist.variable}`}
    >
      <body className="font-sans antialiased">
        <Providers>
          <LenisProvider>
            <AuthProvider>
              <LazyPageBackground />
              <div className="relative z-10">
                <a href="#main" className="skip-link">
                  Skip to content
                </a>
                <SiteHeader />
                <main id="main">{children}</main>
                <SiteFooter />
              </div>
            </AuthProvider>
          </LenisProvider>
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  )
}
