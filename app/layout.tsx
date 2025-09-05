import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Project Deoxys",
  description: "Dyslexia‑friendly AI tools",
  generator: "Project Deoxys",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      {/* font-sans picks up --font-sans from globals.css, now mapped to OpenDyslexic */}
      <body className="font-sans antialiased">
        <Suspense fallback={null}>
          {children}
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
