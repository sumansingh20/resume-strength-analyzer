"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

const routeMapping: Record<string, string> = {
  "/": "Home",
  "/upload": "Analyze Resume",
  "/reports": "Analysis Reports", 
  "/templates": "Job Templates",
  "/admin": "Admin Dashboard",
  "/docs": "API Documentation",
  "/login": "Sign In",
  "/register": "Create Account"
}

export function Breadcrumbs() {
  const pathname = usePathname()
  
  if (pathname === "/") {
    return null // Don't show breadcrumbs on home page
  }
  
  const pathSegments = pathname.split("/").filter(Boolean)
  const breadcrumbs: Array<{ href: string; label: string; icon?: React.ReactNode }> = [
    { href: "/", label: "Home", icon: <Home className="h-3 w-3" /> }
  ]
  
  let currentPath = ""
  for (const segment of pathSegments) {
    currentPath += `/${segment}`
    const label = routeMapping[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1)
    breadcrumbs.push({ href: currentPath, label })
  }
  
  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-6">
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.href} className="flex items-center">
          {index > 0 && <ChevronRight className="h-3 w-3 mx-2" />}
          {index === breadcrumbs.length - 1 ? (
            <span className="font-medium text-foreground flex items-center gap-1">
              {crumb.icon}
              {crumb.label}
            </span>
          ) : (
            <Link 
              href={crumb.href}
              className={cn(
                "hover:text-foreground transition-colors flex items-center gap-1",
                index === 0 && "flex items-center gap-1"
              )}
            >
              {crumb.icon}
              {crumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}
