import type React from "react"
import Link from "next/link"
import { FaGithub, FaDiscord, FaXTwitter, FaLinkedin } from "react-icons/fa6"
import { cn } from "@/lib/utils"

interface FooterProps {
  className?: string
  companyName?: string
  links?: { label: string; href: string }[]
  socialLinks?: { icon: React.ReactNode; href: string; label: string }[]
}

export function Footer({
  className,
  companyName = "Drivly",
  links = [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Status", href: "/status" },
  ],
  socialLinks = [
    {
      icon: <FaGithub className="h-4 w-4" />,
      href: "https://github.com/drivly",
      label: "GitHub",
    },
    {
      icon: <FaXTwitter className="h-4 w-4" />,
      href: "https://twitter.com/drivly",
      label: "Twitter",
    },
    {
      icon: <FaLinkedin className="h-4 w-4" />,
      href: "https://linkedin.com/company/drivly",
      label: "LinkedIn",
    },
    {
      icon: <FaDiscord className="h-4 w-4" />,
      href: "https://discord.gg/drivly",
      label: "Discord",
    },
  ],
}: FooterProps) {
  return (
    <footer className={cn("border-t border-border/30 bg-background", className)}>
      <div className="container px-4 md:px-6 py-6 md:py-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <Link href="/" className="text-sm font-medium">
              {companyName}
            </Link>
            <div className="text-xs text-foreground/50">
              © {new Date().getFullYear()} {companyName}. All rights reserved.
            </div>
          </div>
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-xs text-foreground/50 hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            {socialLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-foreground/50 hover:text-foreground transition-colors bg-muted/30 p-2 rounded-full"
                aria-label={link.label}
              >
                {link.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
