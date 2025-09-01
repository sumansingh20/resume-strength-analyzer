import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteFooter } from "@/components/site-footer"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Resume Analyzer - AI-Powered Analysis",
  description: "Upload your resume and get instant AI-powered analysis with scoring and recommendations.",
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <main className="flex-1 mx-auto max-w-6xl px-4 py-6">
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          </main>
          <SiteFooter />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
