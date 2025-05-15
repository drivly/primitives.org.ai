"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

interface BillingToggleProps {
  value: boolean
  onChange: (value: boolean) => void
  className?: string
}

export function BillingToggle({ value, onChange, className }: BillingToggleProps) {
  return (
    <div className={cn("flex items-center justify-center space-x-3 pb-6", className)}>
      <label
        htmlFor="billing-toggle"
        className={cn("text-sm cursor-pointer", !value ? "font-medium" : "text-foreground/60")}
        onClick={() => onChange(false)}
      >
        Monthly
      </label>
      <Switch
        id="billing-toggle"
        checked={value}
        onCheckedChange={onChange}
        aria-label="Toggle annual billing"
        className="data-[state=checked]:bg-foreground data-[state=unchecked]:bg-muted"
      />
      <label
        htmlFor="billing-toggle"
        className={cn("text-sm cursor-pointer", value ? "font-medium" : "text-foreground/60")}
        onClick={() => onChange(true)}
      >
        Annual <span className="text-xs text-green-500 font-medium ml-1">(Save 20%)</span>
      </label>
    </div>
  )
}

interface PlanFeature {
  text: string
  included: boolean
}

interface PricingPlan {
  name: string
  description: string
  price: {
    monthly: number
    annual: number
  }
  quota: string
  features: PlanFeature[]
  buttonText: string
  buttonVariant?: "default" | "outline" | "secondary"
  popular?: boolean
}

interface PricingSectionProps {
  title?: string
  description?: string
  plans?: PricingPlan[]
  className?: string
}

export function PricingSection({
  title = "Simple, transparent pricing",
  description = "Choose the plan that's right for you and start building with our API.",
  plans = [
    {
      name: "Free",
      description: "For individuals and small projects",
      price: {
        monthly: 0,
        annual: 0,
      },
      quota: "1,000 API calls / month",
      features: [
        { text: "1 API key", included: true },
        { text: "Basic rate limiting", included: true },
        { text: "Community support", included: true },
        { text: "Standard response time", included: true },
        { text: "Advanced analytics", included: false },
        { text: "Custom domains", included: false },
      ],
      buttonText: "Get Started",
      buttonVariant: "outline",
    },
    {
      name: "Professional",
      description: "For teams and growing businesses",
      price: {
        monthly: 49,
        annual: 39,
      },
      quota: "100,000 API calls / month",
      features: [
        { text: "10 API keys", included: true },
        { text: "Advanced rate limiting", included: true },
        { text: "Priority support", included: true },
        { text: "Faster response time", included: true },
        { text: "Advanced analytics", included: true },
        { text: "Custom domains", included: false },
      ],
      buttonText: "Get Started",
      buttonVariant: "default",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For large organizations",
      price: {
        monthly: 199,
        annual: 159,
      },
      quota: "1,000,000 API calls / month",
      features: [
        { text: "Unlimited API keys", included: true },
        { text: "Custom rate limiting", included: true },
        { text: "24/7 dedicated support", included: true },
        { text: "Fastest response time", included: true },
        { text: "Advanced analytics", included: true },
        { text: "Custom domains", included: true },
      ],
      buttonText: "Contact Sales",
      buttonVariant: "secondary",
    },
  ],
  className,
}: PricingSectionProps) {
  const [annual, setAnnual] = useState(false)

  return (
    <section className={cn("py-12 md:py-24 lg:py-32", className)}>
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{title}</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {description}
            </p>
          </div>
          <BillingToggle value={annual} onChange={setAnnual} className="my-6 md:my-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-5xl">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={cn(
                  "flex flex-col relative border-border/50 bg-background",
                  plan.popular && "border-foreground shadow-sm",
                )}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="bg-foreground text-background text-xs font-medium px-3 py-1 rounded-full">
                      Most Popular
                    </div>
                  </div>
                )}
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription className="text-foreground/60">{plan.description}</CardDescription>
                  <div className="mt-5">
                    <span className="text-3xl font-bold">${annual ? plan.price.annual : plan.price.monthly}</span>
                    <span className="text-foreground/60 ml-1">/mo</span>
                  </div>
                  <p className="text-xs text-foreground/60 mt-2">{plan.quota}</p>
                </CardHeader>
                <CardContent className="flex-1 pt-2">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        {feature.included ? (
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                        ) : (
                          <div className="mr-2 h-4 w-4 rounded-full border border-foreground/10" />
                        )}
                        <span className={cn("text-sm", !feature.included && "text-foreground/50")}>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant={plan.buttonVariant} className="w-full">
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
