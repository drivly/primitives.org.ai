"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface NavItem {
  label: string
  href: string
}

interface NavBarProps {
  logo?: React.ReactNode
  items?: NavItem[]
  className?: string
}

export function NavBar({
  logo = <span className="font-bold text-xl">Drivly</span>,
  items = [
    { label: "Docs", href: "/docs" },
    { label: "API", href: "/api" },
    { label: "Integrations", href: "/integrations" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
  ],
  className,
}: NavBarProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Check initial scroll position

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200",
        scrolled && "border-b shadow-sm",
        className,
      )}
    >
      <div className="container flex h-14 sm:h-16 items-center justify-between px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 md:gap-6 lg:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            {logo}
          </Link>
          <nav className="hidden md:flex gap-6">
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-foreground text-foreground/70"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-4">
            <Button variant="outline" size="sm" asChild className="h-8 px-4">
              <Link href="/signin">Sign In</Link>
            </Button>
            <Button size="sm" asChild className="h-8 px-4">
              <Link href="/get-api-key">Get API Key</Link>
            </Button>
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Menu" className="h-8 w-8">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[350px] border-l" closeButton={false}>
              <div className="flex flex-col gap-6 mt-8">
                <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={() => setOpen(false)}>
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </Button>
                <nav className="flex flex-col gap-4">
                  {items.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60 py-2"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <div className="flex flex-col gap-2 mt-4">
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/signin">Sign In</Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href="/get-api-key">Get API Key</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
