import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { name, email, subject, message, hp } = await req.json()

  // Honeypot + validation
  if (hp) return NextResponse.json({ ok: true })
  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  // Save to Payload CMS if envs are set
  try {
    const base = (process.env.PAYLOAD_URL || process.env.NEXT_PUBLIC_PAYLOAD_URL)?.replace(/\/$/, "")
    const key = process.env.PAYLOAD_API_KEY
    if (base && key) {
      await fetch(`${base}/api/contact-submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${key}` },
        body: JSON.stringify({ name, email, subject, message, source: "next-site" }),
        cache: "no-store",
      })
    }
  } catch (e) {
    console.error("Payload create error", e)
  }

  // Email sending intentionally disabled for now.
  return NextResponse.json({ ok: true, emailSent: false })
}
