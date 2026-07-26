"use client"

import { useEffect, useState } from "react"
import { ArrowUp, Mail, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NewsletterForm } from "@/components/forms"

export function SiteControls() {
  const [cookies, setCookies] = useState(false)
  const [newsletter, setNewsletter] = useState(false)
  const [top, setTop] = useState(false)
  useEffect(()=>{
    setCookies(localStorage.getItem("wolfitpark-cookie-choice") !== "set")
    const timer = window.setTimeout(()=>setNewsletter(sessionStorage.getItem("wolfitpark-newsletter") !== "shown"), 12000)
    const onScroll=()=>setTop(window.scrollY > 500)
    window.addEventListener("scroll",onScroll,{passive:true})
    return ()=>{window.clearTimeout(timer);window.removeEventListener("scroll",onScroll)}
  },[])
  const choose=()=>{localStorage.setItem("wolfitpark-cookie-choice","set");setCookies(false)}
  const closeNewsletter=()=>{sessionStorage.setItem("wolfitpark-newsletter","shown");setNewsletter(false)}
  return <>
    {top&&<Button size="icon" className="fixed bottom-6 right-6 z-30 rounded-full shadow-lg" aria-label="Back to top" onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}><ArrowUp/></Button>}
    {cookies&&<div className="fixed bottom-4 left-4 z-40 max-w-sm rounded-2xl border border-border bg-popover p-5 shadow-2xl"><p className="font-semibold">Your privacy, clearly handled.</p><p className="mt-2 text-sm leading-relaxed text-muted-foreground">We use essential storage for preferences and privacy-conscious analytics to improve the experience.</p><div className="mt-4 flex gap-2"><Button onClick={choose}>Accept</Button><Button variant="outline" onClick={choose}>Essential only</Button></div></div>}
    {newsletter&&<div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/35 px-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="newsletter-title"><div className="relative w-full max-w-lg rounded-3xl border border-border bg-popover p-8 shadow-2xl"><Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={closeNewsletter} aria-label="Close newsletter"><X/></Button><div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary"><Mail className="size-5"/></div><h2 id="newsletter-title" className="mt-6 text-2xl font-semibold">Build smarter, once a month.</h2><p className="mt-3 leading-relaxed text-muted-foreground">Practical notes on software, AI automation, cloud, and better business systems.</p><NewsletterForm className="mt-6" onSuccess={closeNewsletter}/></div></div>}
  </>
}
