"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionItemProps {
  question: string
  answer: string
  isOpen?: boolean
  onToggle?: () => void
  className?: string
}

export function AccordionItem({ question, answer, isOpen = false, onToggle, className }: AccordionItemProps) {
  const id = question.toLowerCase().replace(/\s+/g, "-")

  return (
    <div className={cn("border-b border-border/30", className)}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={id}
        id={`${id}-button`}
        className="flex w-full items-center justify-between py-4 text-left font-medium transition-all hover:text-foreground"
        onClick={onToggle}
      >
        <span className="text-sm sm:text-base">{question}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200 text-foreground/60",
            isOpen && "rotate-180",
          )}
        />
      </button>
      <div
        id={id}
        role="region"
        aria-labelledby={`${id}-button`}
        className={cn(
          "grid text-sm text-foreground/70",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
        style={{
          transition: "grid-template-rows 0.2s ease-out, opacity 0.2s ease-out",
        }}
      >
        <div className="overflow-hidden">
          <div className="pb-4 leading-relaxed text-sm">{answer}</div>
        </div>
      </div>
    </div>
  )
}

interface FAQSectionProps {
  title?: string
  description?: string
  faqs: { question: string; answer: string }[]
  className?: string
}

export function FAQSection({ title = "Frequently Asked Questions", description, faqs, className }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className={cn("py-12 md:py-24 bg-muted/10", className)}>
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-10">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h2>
            {description && <p className="max-w-[700px] text-foreground/70 md:text-lg/relaxed">{description}</p>}
          </div>
        </div>
        <div className="mx-auto max-w-3xl">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
