import Image from "next/image"
import { cn } from "@/lib/utils"

interface Logo {
  src: string
  alt: string
  width?: number
  height?: number
}

interface TrustLogosProps {
  logos: Logo[]
  className?: string
  title?: string
}

export function TrustLogos({
  logos = [
    { src: "/vercel-logo.svg", alt: "Vercel", width: 120, height: 40 },
    { src: "/autodev-logo.svg", alt: "AutoDev", width: 120, height: 40 },
    { src: "/cognition-ai-logo.png", alt: "Cognition AI", width: 120, height: 40 },
    { src: "/dr-logo.svg", alt: "DR", width: 120, height: 40 },
  ],
  className,
  title = "Trusted by innovative companies",
}: TrustLogosProps) {
  return (
    <section className={cn("py-16 border-y border-border/30", className)}>
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        {title && (
          <h2 className="text-center text-xs !text-xs font-medium uppercase tracking-wider text-foreground/50 mb-10">
            {title}
          </h2>
        )}
        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-8 md:gap-x-16 lg:gap-x-20">
          {logos.map((logo, index) => (
            <div key={index} className="flex items-center justify-center">
              <Image
                src={logo.src || "/placeholder.svg"}
                alt={logo.alt}
                width={logo.width || 120}
                height={logo.height || 40}
                className="h-8 w-auto object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
