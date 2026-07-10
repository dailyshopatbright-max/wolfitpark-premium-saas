"use client"

import { useActionState, useEffect } from "react"
import { LoaderCircle, Send } from "lucide-react"
import { submitCareer, submitConsultation, submitContact, submitNewsletter, type FormState } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { cn } from "@/lib/utils"

const initial: FormState={status:"idle",message:""}
function Status({ state }: {state:FormState}) { return state.message?<p role="status" className={cn("text-sm",state.status==="success"?"text-primary":"text-destructive")}>{state.message}</p>:null }
function Trap(){return <div className="absolute -left-[9999px]" aria-hidden="true"><label>Website<input name="companyWebsite" tabIndex={-1} autoComplete="off"/></label></div>}
function Submit({ label }: {label:string}) { return <Button type="submit" size="lg" className="w-full sm:w-auto"><Send data-icon="inline-start"/><span>{label}</span></Button> }

export function ContactForm(){
 const [state,action,pending]=useActionState(submitContact,initial)
 return <form action={action} className="relative"><Trap/><FieldGroup><div className="grid gap-5 sm:grid-cols-2"><Field><FieldLabel htmlFor="contact-name">Name</FieldLabel><Input id="contact-name" name="name" required autoComplete="name"/></Field><Field><FieldLabel htmlFor="contact-email">Work email</FieldLabel><Input id="contact-email" name="email" type="email" required autoComplete="email"/></Field><Field><FieldLabel htmlFor="contact-company">Company</FieldLabel><Input id="contact-company" name="company" autoComplete="organization"/></Field><Field><FieldLabel htmlFor="contact-subject">Subject</FieldLabel><Input id="contact-subject" name="subject" required/></Field></div><Field><FieldLabel htmlFor="contact-message">How can we help?</FieldLabel><Textarea id="contact-message" name="message" required rows={6}/><FieldDescription>Include the outcome you want to create and any important constraints.</FieldDescription></Field><div className="flex flex-wrap items-center gap-4"><Button type="submit" size="lg" disabled={pending}>{pending?<LoaderCircle className="animate-spin" data-icon="inline-start"/>:<Send data-icon="inline-start"/>}{pending?"Sending...":"Send message"}</Button><Status state={state}/></div></FieldGroup></form>
}

export function ConsultationForm(){
 const [state,action,pending]=useActionState(submitConsultation,initial)
 return <form action={action} className="relative"><Trap/><FieldGroup><div className="grid gap-5 sm:grid-cols-2"><Field><FieldLabel htmlFor="consult-name">Name</FieldLabel><Input id="consult-name" name="name" required autoComplete="name"/></Field><Field><FieldLabel htmlFor="consult-email">Work email</FieldLabel><Input id="consult-email" name="email" type="email" required autoComplete="email"/></Field><Field><FieldLabel htmlFor="consult-company">Company</FieldLabel><Input id="consult-company" name="company" required autoComplete="organization"/></Field><Field><FieldLabel htmlFor="consult-interest">What do you need?</FieldLabel><Input id="consult-interest" name="interest" required placeholder="ERP, AI automation, SaaS product..."/></Field><Field><FieldLabel htmlFor="consult-budget">Investment range</FieldLabel><Input id="consult-budget" name="budget" required placeholder="$25k – $100k"/></Field><Field><FieldLabel htmlFor="consult-timeline">Desired timeline</FieldLabel><Input id="consult-timeline" name="timeline" required placeholder="Launch this quarter"/></Field></div><Field><FieldLabel htmlFor="consult-message">Goals and context</FieldLabel><Textarea id="consult-message" name="message" required rows={7}/></Field><div className="flex flex-wrap items-center gap-4"><Button type="submit" size="lg" disabled={pending}>{pending?<LoaderCircle className="animate-spin" data-icon="inline-start"/>:<Send data-icon="inline-start"/>}{pending?"Sending...":"Request consultation"}</Button><Status state={state}/></div></FieldGroup></form>
}

export function CareerForm({ roles }: {roles:readonly string[]}){
 const [state,action,pending]=useActionState(submitCareer,initial)
 return <form action={action} className="relative"><Trap/><FieldGroup><div className="grid gap-5 sm:grid-cols-2"><Field><FieldLabel htmlFor="career-name">Name</FieldLabel><Input id="career-name" name="name" required autoComplete="name"/></Field><Field><FieldLabel htmlFor="career-email">Email</FieldLabel><Input id="career-email" name="email" type="email" required autoComplete="email"/></Field><Field><FieldLabel htmlFor="career-role">Role</FieldLabel><Input id="career-role" name="role" required list="career-roles"/><datalist id="career-roles">{roles.map(role=><option key={role} value={role}/>)}</datalist></Field><Field><FieldLabel htmlFor="career-linkedin">LinkedIn URL</FieldLabel><Input id="career-linkedin" name="linkedin" type="url" required placeholder="https://linkedin.com/in/..."/></Field></div><Field><FieldLabel htmlFor="career-portfolio">Portfolio or GitHub</FieldLabel><Input id="career-portfolio" name="portfolio" placeholder="https://"/></Field><Field><FieldLabel htmlFor="career-message">Why Wolfitpark?</FieldLabel><Textarea id="career-message" name="message" required rows={6}/></Field><div className="flex flex-wrap items-center gap-4"><Button type="submit" size="lg" disabled={pending}>{pending?<LoaderCircle className="animate-spin" data-icon="inline-start"/>:<Send data-icon="inline-start"/>}{pending?"Submitting...":"Submit application"}</Button><Status state={state}/></div></FieldGroup></form>
}

export function NewsletterForm({className,compact=false,onSuccess}:{className?:string;compact?:boolean;onSuccess?:()=>void}){
 const [state,action,pending]=useActionState(submitNewsletter,initial)
 useEffect(()=>{if(state.status==="success")onSuccess?.()},[state.status,onSuccess])
 return <form action={action} className={cn("relative",className)}><Trap/><div className={cn("flex gap-2",!compact&&"flex-col sm:flex-row")}><label className="sr-only" htmlFor={`newsletter-${compact?"compact":"full"}`}>Email address</label><Input id={`newsletter-${compact?"compact":"full"}`} className={cn("h-10 min-w-0 flex-1",compact&&"border-background/20 bg-background/10 text-background placeholder:text-background/40")} name="email" type="email" required placeholder="you@company.com"/><Button type="submit" variant={compact?"secondary":"default"} disabled={pending}>{pending?<LoaderCircle className="animate-spin" data-icon="inline-start"/>:null}{pending?"Joining...":"Join the list"}</Button></div><Status state={state}/></form>
}
