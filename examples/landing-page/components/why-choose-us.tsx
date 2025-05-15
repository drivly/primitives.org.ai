import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface BenefitProps {
  icon: LucideIcon
  title: string
  description: string
  className?: string
}

export function Benefit({ icon: Icon, title, description, className }: BenefitProps) {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/5 mb-4">
        <Icon className="h-5 w-5 text-foreground/80" />
      </div>
      <h3 className="text-base font-medium mb-2">{title}</h3>
      <p className="text-sm text-foreground/60 leading-relaxed">{description}</p>
    </div>
  )
}

interface WhyChooseUsProps {
  title?: string
  description?: string
  benefits: BenefitProps[]
  className?: string
}

export function WhyChooseUs({ title = "Why Choose Us", description, benefits, className }: WhyChooseUsProps) {
  return (
    <section className={cn("py-16 md:py-24 bg-muted/20", className)}>
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
            {description && <p className="max-w-[700px] text-foreground/70 md:text-lg/relaxed">{description}</p>}
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {benefits.map((benefit, index) => (
            <Benefit key={index} {...benefit} />
          ))}
        </div>
      </div>
    </section>
  )
}
