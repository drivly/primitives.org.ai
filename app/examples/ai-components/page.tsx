'use client'

import React from 'react'
import { Hero, FAQs, Pricing, Features, Testimonials, CTA, Component } from '../../../packages/ai-components/src'

export default function AIComponentsExamplePage() {
  return (
    <div className="container mx-auto py-8 space-y-16">
      <h1 className="text-3xl font-bold mb-8">AI Components Examples</h1>
      
      <section className="border rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Hero Component</h2>
        <Hero 
          title="AI Components Library"
          subtitle="Pre-wrapped UI components with AI-generated content"
          ctaText="Get Started"
          ctaLink="#"
        />
      </section>
      
      <section className="border rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Features Component</h2>
        <Features 
          title="Key Features"
          subtitle="What makes our components special"
          count={3}
          items={[
            {
              title: "AI-Powered Content",
              description: "Generate content automatically with AI models",
              icon: "✨"
            },
            {
              title: "ShadCN Integration",
              description: "Beautiful UI components built with ShadCN and Tailwind",
              icon: "🎨"
            },
            {
              title: "Customizable",
              description: "Override AI-generated content with your own",
              icon: "⚙️"
            }
          ]}
        />
      </section>
      
      <section className="border rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">FAQs Component</h2>
        <FAQs 
          title="Frequently Asked Questions"
          count={2}
          items={[
            {
              question: "How do I install the AI Components package?",
              answer: "You can install the package using npm, yarn, or pnpm: `npm install ai-components`"
            },
            {
              question: "Can I customize the AI-generated content?",
              answer: "Yes, all components accept props to override the AI-generated content."
            }
          ]}
        />
      </section>
      
      <section className="border rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Pricing Component</h2>
        <Pricing 
          title="Simple Pricing"
          subtitle="No hidden fees, no surprises"
          tiers={[
            {
              name: "Basic",
              price: "$9/mo",
              description: "For individuals",
              features: ["Feature 1", "Feature 2", "Feature 3"],
              cta: { text: "Get Started", link: "#" }
            },
            {
              name: "Pro",
              price: "$29/mo",
              description: "For teams",
              features: ["All Basic features", "Feature 4", "Feature 5"],
              cta: { text: "Try Pro", link: "#" }
            },
            {
              name: "Enterprise",
              price: "Contact us",
              description: "For large organizations",
              features: ["All Pro features", "Feature 6", "Feature 7"],
              cta: { text: "Contact Sales", link: "#" }
            }
          ]}
        />
      </section>
      
      <section className="border rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Testimonials Component</h2>
        <Testimonials 
          title="What Our Users Say"
          count={2}
          items={[
            {
              quote: "These components have saved me hours of development time!",
              author: "Jane Doe",
              role: "Frontend Developer",
              company: "Tech Co"
            },
            {
              quote: "The AI-generated content is surprisingly good and saves a lot of copywriting time.",
              author: "John Smith",
              role: "Product Manager",
              company: "Startup Inc"
            }
          ]}
        />
      </section>
      
      <section className="border rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">CTA Component</h2>
        <CTA 
          title="Ready to Get Started?"
          description="Try AI Components today and build beautiful UI with AI-generated content."
          primaryCta={{ text: "Get Started", link: "#" }}
          secondaryCta={{ text: "Learn More", link: "#" }}
        />
      </section>
      
      <section className="border rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Dynamic Component Generator</h2>
        <Component 
          description="Create a notification banner with a dismiss button that shows a message and has a colored background based on the type (info, warning, error)"
          contextProps={{
            message: "This is a dynamic component generated from a description!",
            type: "info"
          }}
        />
      </section>
    </div>
  )
}
