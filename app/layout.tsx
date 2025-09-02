import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: {
    default: "Resume Analyzer - AI-Powered Resume Analysis & Optimization",
    template: "%s | Resume Analyzer"
  },
  description: "Upload your resume and get instant AI-powered analysis with comprehensive scoring, ATS optimization, and actionable recommendations to improve your job search success.",
  keywords: ["resume analyzer", "AI resume review", "ATS optimization", "job search", "resume checker", "career tools"],
  authors: [{ name: "Resume Analyzer Team" }],
  creator: "Resume Analyzer",
  publisher: "Resume Analyzer",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://resume-analyzer.netlify.app',
    title: 'Resume Analyzer - AI-Powered Resume Analysis',
    description: 'Get instant AI-powered analysis of your resume with comprehensive scoring and optimization recommendations.',
    siteName: 'Resume Analyzer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resume Analyzer - AI-Powered Resume Analysis',
    description: 'Get instant AI-powered analysis of your resume with comprehensive scoring and optimization recommendations.',
  },
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
          <SiteHeader />
          <main className="flex-1">
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          </main>
          <SiteFooter />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
