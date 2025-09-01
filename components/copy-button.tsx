"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, CheckCircle } from "lucide-react"

interface CopyButtonProps {
  text: string
  className?: string
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy text:", error)
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className={className}
      onClick={handleCopy}
    >
      {copied ? (
        <CheckCircle className="h-4 w-4 text-green-600" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  )
}
