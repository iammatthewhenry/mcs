import Link from "next/link"
import { mediaURL } from "@/lib/payload"

type Project = {
  id: string
  title: string
  description?: string
  slug?: string
  heroImage?: { url?: string } | string | null
  tags?: string[]
}

async function getProjects(): Promise<Project[]> {
  const base = process.env.NEXT_PUBLIC_PAYLOAD_URL || process.env.PAYLOAD_URL
  if (!base) return []
  const url = `${base.replace(/\/$/,"")}/api/projects?limit=12&where[published][equals]=true&depth=0`
  const res = await fetch(url, { next: { revalidate: 60 } })
  if (!res.ok) return []
  const data = await res.json()
  const docs = data?.docs ?? []
  return docs.map((d: any) => ({
    id: d.id || d._id || d.slug,
    title: d.title || d.name || "Untitled",
    description: d.description || "",
    slug: d.slug,
    heroImage: typeof d.heroImage === "string" ? { url: d.heroImage } : d.heroImage,
    tags: d.tags || d.tech || []
  }))
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <section className="max-w-6xl mx-auto px-2 py-10">
      <h1 className="text-3xl mb-6">Projects</h1>
      {projects.length === 0 ? (
        <p className="text-slate-300">No projects found (set NEXT_PUBLIC_PAYLOAD_URL later).</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(p => {
            const heroSrc =
              typeof p.heroImage === "string"
                ? p.heroImage
                : p.heroImage && typeof (p.heroImage as any).url === "string"
                ? mediaURL((p.heroImage as { url: string }).url)
                : undefined

            return (
              <div key={p.id} className="rounded-xl border border-emerald-400/30 bg-white/5 overflow-hidden">
                <div className="relative h-40 bg-slate-800">
                  {heroSrc ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={heroSrc} alt={p.title} className="w-full h-full object-cover"/>
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-slate-300">
                      No image
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg text-emerald-400">{p.title}</h3>
                  {p.description && <p className="text-slate-300 text-sm mt-2">{p.description}</p>}
                  {p.slug && (
                    <Link href={`/projects/${p.slug}`} className="inline-block mt-3 underline text-emerald-400">
                      View
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
