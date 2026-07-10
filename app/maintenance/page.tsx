import type { Metadata } from "next"
import Link from "next/link"
import { RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
export const metadata:Metadata={title:"Maintenance",robots:{index:false,follow:false}}
export default function MaintenancePage(){return <section className="container-site flex min-h-[70svh] items-center justify-center py-20"><div className="max-w-xl text-center"><div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"><RefreshCcw className="size-6"/></div><p className="mt-7 text-xs font-semibold uppercase tracking-widest text-primary">Scheduled improvement</p><h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">We are making Wolfitpark better.</h1><p className="mt-5 leading-relaxed text-muted-foreground">This experience is briefly unavailable while we complete a planned update. For urgent help, contact support@wolfitpark.online.</p><Button className="mt-8" render={<Link href="/"/>}>Return home</Button></div></section>}
