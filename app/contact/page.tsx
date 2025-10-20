'use client'
import { useState } from "react"

export default function ContactPage(){
  const [form,setForm]=useState({name:"",email:"",subject:"",message:"",hp:""})
  const [status,setStatus]=useState<"idle"|"sending"|"ok"|"error">("idle")

  async function onSubmit(e: React.FormEvent){
    e.preventDefault(); setStatus("sending")
    try{
      const res = await fetch("/api/contact", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(form) })
      if(!res.ok) throw new Error("fail")
      setStatus("ok"); setForm({name:"",email:"",subject:"",message:"",hp:""})
    }catch{ setStatus("error") }
  }

  return (
    <section className="max-w-2xl mx-auto px-2 py-10">
      <h1 className="text-3xl mb-6">Contact</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Honeypot */}
        <input type="text" name="hp" value={form.hp} onChange={e=>setForm({...form,hp:e.target.value})} className="hidden" tabIndex={-1} autoComplete="off"/>
        <input className="w-full rounded-lg bg-white/5 border border-white/20 px-4 py-3" placeholder="Your Name" required value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
        <input className="w-full rounded-lg bg-white/5 border border-white/20 px-4 py-3" type="email" placeholder="Your Email" required value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
        <input className="w-full rounded-lg bg-white/5 border border-white/20 px-4 py-3" placeholder="Subject" required value={form.subject} onChange={e=>setForm({...form, subject:e.target.value})}/>
        <textarea className="w-full rounded-lg bg-white/5 border border-white/20 px-4 py-3 min-h-40" placeholder="Your Message" required value={form.message} onChange={e=>setForm({...form, message:e.target.value})}/>
        <button disabled={status==='sending'} className="rounded-lg bg-emerald-500 hover:bg-emerald-600 px-6 py-3">{status==='sending'?'Sending...':'Send Message'}</button>
        {status==='ok' && <p className="text-emerald-300">Thanks! We&apos;ll get back to you soon.</p>}
        {status==='error' && <p className="text-red-400">Something went wrong. Please try again.</p>}
      </form>
      <p className="mt-6 text-sm text-slate-400">Note: Email sending is disabled. Submissions will be saved to Payload when configured.</p>
    </section>
  )
}
