import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "MCS — Next.js + Tailwind (Payload-ready)",
  description: "SES emailing intentionally disabled for now.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-slate-900 text-slate-100 antialiased">
        <main className="container mx-auto px-4 py-10">{children}</main>
      </body>
    </html>
  )
}
