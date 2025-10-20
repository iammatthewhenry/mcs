import Link from "next/link"

export default function HomePage() {
  return (
    <section className="text-center space-y-4">
      <h1 className="text-4xl font-bold">Modern Code Stack</h1>
      <p className="text-slate-300">Payload CMS-ready. SES email sending is disabled (you can enable later).</p>
      <div className="flex gap-4 justify-center">
        <Link href="/projects" className="rounded-lg bg-emerald-500 hover:bg-emerald-600 px-5 py-3">Projects</Link>
        <Link href="/contact" className="rounded-lg bg-white/10 hover:bg-white/20 px-5 py-3">Contact</Link>
      </div>
    </section>
  )
}
