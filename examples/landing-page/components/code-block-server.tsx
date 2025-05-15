import { highlight } from "@/components/ui/shiki-highlighter"
import { CodeBlock } from "@/components/code-block"
import { FallbackCodeBlock } from "@/components/fallback-code-block"

interface CodeBlockServerProps {
  code: string
  language?: string
  showLineNumbers?: boolean
  className?: string
  title?: string
  maxHeight?: string
}

export async function CodeBlockServer({
  code,
  language = "typescript",
  showLineNumbers = true,
  className,
  title,
  maxHeight,
}: CodeBlockServerProps) {
  try {
    // Get the highlighted HTML from Shiki
    const highlightedCode = await highlight(code, language || "text", showLineNumbers)

    return (
      <CodeBlock
        code={code}
        language={language}
        showLineNumbers={showLineNumbers}
        className={className}
        title={title}
        highlightedCode={highlightedCode}
        maxHeight={maxHeight}
      />
    )
  } catch (error) {
    console.error("Error in CodeBlockServer:", error)

    // Fallback to the regular CodeBlock without syntax highlighting
    return (
      <FallbackCodeBlock
        code={code}
        language={language}
        showLineNumbers={showLineNumbers}
        className={className}
        title={title}
        maxHeight={maxHeight}
      />
    )
  }
}
