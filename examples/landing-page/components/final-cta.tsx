import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CodeBlockServer } from "@/components/code-block-server"
import { cn } from "@/lib/utils"

interface FinalCTAProps {
  title?: string
  description?: string
  codeExample?: string
  codeLanguage?: string
  primaryButtonText?: string
  primaryButtonHref?: string
  secondaryButtonText?: string
  secondaryButtonHref?: string
  className?: string
}

export function FinalCTA({
  title = "Ready to Get Started?",
  description = "Start building with our API in minutes. No credit card required.",
  codeExample = `import { Drivly } from '@drivly/sdk';

// Initialize with your API key
const client = new Drivly({
  apiKey: 'YOUR_API_KEY'
});

// Your first API call
const response = await client.hello();
console.log(response); // Hello, World!`,
  codeLanguage = "typescript",
  primaryButtonText = "Get Your API Key",
  primaryButtonHref = "/signup",
  secondaryButtonText = "Contact Sales",
  secondaryButtonHref = "/contact",
  className,
}: FinalCTAProps) {
  return (
    <section className={cn("py-12 md:py-16 lg:py-24 bg-gradient-to-b from-background to-muted/30", className)}>
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-10 items-center">
          <div className="flex-1 space-y-4 text-center lg:text-left">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
            <p className="text-foreground/70 md:text-lg">{description}</p>
            <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center lg:justify-start">
              <Button size="lg" asChild className="h-10 px-6 w-full sm:w-auto">
                <Link href={primaryButtonHref}>{primaryButtonText}</Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="h-10 px-6 w-full sm:w-auto">
                <Link href={secondaryButtonHref}>{secondaryButtonText}</Link>
              </Button>
            </div>
          </div>
          <div className="w-full lg:w-1/2 overflow-hidden">
            <CodeBlockServer code={codeExample} language={codeLanguage} title="Quick Start" showLineNumbers={true} />
          </div>
        </div>
      </div>
    </section>
  )
}
