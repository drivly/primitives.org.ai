"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  language?: string
  showLineNumbers?: boolean
  className?: string
  title?: string
  highlightedCode?: string
}

export function CodeBlock({
  code,
  language = "typescript",
  showLineNumbers = true,
  className,
  title,
  highlightedCode,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const lines = code.trim().split("\n")

  const handleCopy = async () => {
    if (!navigator.clipboard) return

    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div
      className={cn("relative overflow-hidden text-left w-full h-full", className)}
    >
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 z-10 rounded-md p-1 text-gray-400 hover:bg-[#30363d] hover:text-gray-200 transition-colors"
        aria-label={copied ? "Copied" : "Copy code to clipboard"}
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      </button>

      {highlightedCode ? (
        <div className="code-container w-full h-full">
          <div
            className="text-left w-full h-full overflow-auto"
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </div>
      ) : (
        <pre className="p-4 text-xs font-mono text-gray-300 text-left overflow-auto h-full">
          <code>
            {lines.map((line, i) => (
              <div key={i} className="relative whitespace-pre">
                {line || "\n"}
              </div>
            ))}
          </code>
        </pre>
      )}
    </div>
  )
}
