"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Home, ArrowLeft, Search, Upload } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
      <div className="mx-auto max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white mx-auto text-4xl font-bold">
            404
          </div>
          <h1 className="text-3xl font-bold">Page Not Found</h1>
          <p className="text-muted-foreground">
            Sorry, we couldn't find the page you're looking for. 
            It might have been moved or doesn't exist.
          </p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">What would you like to do?</CardTitle>
            <CardDescription>
              Here are some helpful options to get you back on track
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/" className="block">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Home className="h-4 w-4" />
                Go to Homepage
              </Button>
            </Link>
            
            <Link href="/upload" className="block">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Upload className="h-4 w-4" />
                Upload Resume
              </Button>
            </Link>
            
            <Link href="/about" className="block">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Search className="h-4 w-4" />
                How It Works
              </Button>
            </Link>
            
            <Button 
              variant="ghost" 
              onClick={() => window.history.back()}
              className="w-full justify-start gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Need help? Check out our{" "}
            <Link href="/about" className="text-primary hover:underline">
              How It Works
            </Link>{" "}
            page or{" "}
            <Link href="/register" className="text-primary hover:underline">
              create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
