import type { Metadata, Viewport } from "next"
import { Inter, Manrope } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Providers } from "@/components/providers"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SiteControls } from "@/components/site-controls"

const inter = Inter({ subsets:["latin"], variable:"--font-inter", display:"swap" })
const manrope = Manrope({ subsets:["latin"], variable:"--font-manrope", display:"swap" })
const siteUrl = "https://wolfitpark.online"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default:"Wolfitpark — Build Smarter. Scale Faster.", template:"%s | Wolfitpark" },
  description:"Modern software, AI automation, cloud solutions, and business management platforms built for organizations ready to scale.",
  alternates:{canonical:"/"},
  openGraph:{type:"website",locale:"en_US",siteName:"Wolfitpark",title:"Wolfitpark — Build Smarter. Scale Faster.",description:"Modern software, AI automation, cloud solutions, and business management platforms.",url:siteUrl},
  twitter:{card:"summary_large_image",title:"Wolfitpark — Build Smarter. Scale Faster.",description:"Software and intelligent business systems for ambitious organizations."},
  robots:{index:true,follow:true},
}
export const viewport: Viewport = { width:"device-width",initialScale:1,themeColor:[{media:"(prefers-color-scheme: light)",color:"#f7faff"},{media:"(prefers-color-scheme: dark)",color:"#07101f"}] }

export default function RootLayout({children}:{children:React.ReactNode}){
 const schema={"@context":"https://schema.org","@type":"Organization",name:"Wolfitpark",url:siteUrl,email:"support@wolfitpark.online",address:{"@type":"PostalAddress",streetAddress:"30 N Gould St",addressLocality:"Sheridan",addressRegion:"WY",postalCode:"82801",addressCountry:"US"},sameAs:[]}
 return <html lang="en" suppressHydrationWarning className={`bg-background ${inter.variable} ${manrope.variable}`}><body className="font-sans antialiased"><Providers><a href="#main" className="skip-link">Skip to content</a><SiteHeader/><main id="main">{children}</main><SiteFooter/><SiteControls/></Providers>{process.env.NODE_ENV==="production"&&<Analytics/>}<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}}/></body></html>
}
