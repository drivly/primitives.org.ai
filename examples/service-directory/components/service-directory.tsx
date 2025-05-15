"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export interface Service {
  id: string
  name: string
  description: string
  iconSrc: string
  tags: string[]
  docsUrl: string
}

interface ServiceDirectoryProps {
  services: Service[]
  title?: string
}

export function ServiceDirectory({ services, title = "AI Services Directory" }: ServiceDirectoryProps) {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">{title}</h2>
          <p className="max-w-[85%] text-muted-foreground md:text-lg">
            Discover and integrate powerful AI services into your applications
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.id}
              className="flex h-full flex-col rounded-xl transition-all duration-200 hover:shadow-md dark:hover:shadow-none dark:hover:bg-accent/20 dark:border-border"
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-md bg-primary/10 dark:bg-primary/20">
                  <Image
                    src={service.iconSrc || "/placeholder.svg"}
                    alt={`${service.name} icon`}
                    width={40}
                    height={40}
                    className="h-8 w-8 object-contain"
                  />
                </div>
                <h3 className="text-xl font-medium text-foreground">{service.name}</h3>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-muted-foreground text-sm">{service.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-secondary/30 dark:bg-secondary/20 px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-4">
                <Button asChild variant="outline" className="w-full dark:hover:bg-accent/20">
                  <a
                    href={service.docsUrl}
                    className="inline-flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Learn more</span>
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
