import Image from "next/image"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface TestimonialCardProps {
  quote: string
  author: string
  role?: string
  company?: string
  avatarSrc?: string
  avatarAlt?: string
  rating?: number
  className?: string
}

export function TestimonialCard({
  quote,
  author,
  role,
  company,
  avatarSrc,
  avatarAlt = "Avatar",
  rating = 5,
  className,
}: TestimonialCardProps) {
  return (
    <div className={cn("flex flex-col p-4 sm:p-6 bg-background rounded-lg border border-border/50", className)}>
      <div className="flex mb-3">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-foreground text-foreground mr-0.5" />
        ))}
      </div>
      <blockquote className="text-sm sm:text-base mb-4 flex-1 text-foreground/90 leading-relaxed">"{quote}"</blockquote>
      <div className="flex items-center mt-auto">
        {avatarSrc && (
          <div className="mr-3 flex-shrink-0">
            <Image
              src={avatarSrc || "/placeholder.svg"}
              alt={avatarAlt}
              width={40}
              height={40}
              className="rounded-full object-cover border border-border/30"
              style={{ width: "40px", height: "40px" }}
            />
          </div>
        )}
        <div>
          <div className="font-medium text-sm">{author}</div>
          {(role || company) && (
            <div className="text-xs text-foreground/60">
              {role}
              {role && company && ", "}
              {company}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface TestimonialsProps {
  title?: string
  description?: string
  testimonials: TestimonialCardProps[]
  className?: string
}

export function Testimonials({
  title = "What Our Customers Say",
  description,
  testimonials,
  className,
}: TestimonialsProps) {
  return (
    <section className={cn("py-12 md:py-24", className)}>
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-10">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h2>
            {description && <p className="max-w-[700px] text-foreground/70 md:text-lg/relaxed">{description}</p>}
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}
