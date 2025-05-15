import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CodeBlockServer } from "@/components/code-block-server"
import { cn } from "@/lib/utils"

interface HeroSectionProps {
  title: string
  subtitle: string
  codeExample?: string
  codeLanguage?: string
  metricBadge?: string
  primaryButtonText?: string
  primaryButtonHref?: string
  secondaryButtonText?: string
  secondaryButtonHref?: string
  className?: string
}

export function HeroSection({
  title,
  subtitle,
  codeExample = `const service = Service({
  // ...other properties
  pricing: {
    model: 'outcome-based',
    outcomes: [
      { metric: 'conversion-rate', targetValue: 5, price: 500 },
      { metric: 'engagement', targetValue: 10000, price: 300 },
    ],
  },
})
 
// Calculate price based on achieved outcomes
const price = service.calculatePrice({
  outcomes: {
    'conversion-rate': 6.5,
    engagement: 8000,
  },
}) // 500 (only conversion-rate target was met)`,
  codeLanguage = "typescript",
  metricBadge,
  primaryButtonText = "Get Started for Free",
  primaryButtonHref = "/signup",
  secondaryButtonText = "View on GitHub",
  secondaryButtonHref = "https://github.com/drivly",
  className,
}: HeroSectionProps) {
  return (
    <section className={cn("py-12 md:py-24 lg:py-32", className)}>
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center space-y-4 text-center">
          {metricBadge && (
            <div className="inline-flex items-center rounded-full border border-border/40 bg-background px-3 py-1 text-xs font-medium text-foreground/70 mb-4">
              {metricBadge}
            </div>
          )}
          <div className="space-y-2">
            <h1 className="text-4xl font-semibold tracking-tight text-5xl">{title}</h1>
            <p className="mx-auto max-w-[700px] text-foreground/70 text-lg/relaxed">{subtitle}</p>
          </div>
          <div className="w-full max-w-full sm:max-w-[500px] mt-6 overflow-hidden px-0">
            <CodeBlockServer code={codeExample} language={codeLanguage} showLineNumbers={true} />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-8 w-full sm:w-auto">
            <Button size="lg" asChild className="h-10 px-6 w-full sm:w-auto">
              <Link href={primaryButtonHref}>{primaryButtonText}</Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="h-10 px-6 w-full sm:w-auto">
              <Link href={secondaryButtonHref}>{secondaryButtonText}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
