import React from 'react'
import { Hero, FAQs, Pricing, Features, Testimonials, CTA, Component } from '../src'

export default function BasicExample() {
  return (
    <div className="space-y-16">
      {/* Hero component with AI-generated content */}
      <Hero 
        title="Welcome to AI Components"
        subtitle="Pre-wrapped UI components with AI-generated content"
        ctaText="Get Started"
        ctaLink="#"
      />
      
      {/* Hero with fully AI-generated content */}
      <Hero 
        prompt="Generate a hero section for a SaaS product that helps developers build AI-powered applications"
      />
      
      {/* Features component with AI-generated content */}
      <Features 
        prompt="Generate features for a UI component library"
        count={3}
      />
      
      {/* FAQs with custom title and AI-generated questions */}
      <FAQs 
        title="Common Questions"
        prompt="Generate FAQs about AI components"
        count={3}
      />
      
      {/* Pricing with manual tiers */}
      <Pricing 
        title="Simple Pricing"
        subtitle="No hidden fees, no surprises"
        tiers={[
          {
            name: 'Basic',
            price: '$9/mo',
            description: 'For individuals',
            features: ['Feature 1', 'Feature 2', 'Feature 3'],
            cta: { text: 'Get Started', link: '/signup' }
          },
          {
            name: 'Pro',
            price: '$29/mo',
            description: 'For teams',
            features: ['All Basic features', 'Feature 4', 'Feature 5', 'Feature 6'],
            cta: { text: 'Try Pro', link: '/signup/pro' }
          },
          {
            name: 'Enterprise',
            price: 'Contact us',
            description: 'For large organizations',
            features: ['All Pro features', 'Feature 7', 'Feature 8', 'Feature 9'],
            cta: { text: 'Contact Sales', link: '/contact' }
          }
        ]}
      />
      
      {/* Testimonials with AI-generated content */}
      <Testimonials 
        prompt="Generate testimonials for a UI component library"
        count={2}
      />
      
      {/* CTA with manual content */}
      <CTA 
        title="Ready to build with AI Components?"
        description="Get started today and create beautiful UI with AI-generated content."
        primaryCta={{ text: "Get Started", link: "#" }}
        secondaryCta={{ text: "Learn More", link: "#" }}
      />
      
      {/* Dynamic Component Example */}
      <div className="p-8 border rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Dynamic Component Example</h2>
        <Component 
          description="Create a notification banner with a dismiss button that shows a message and has a colored background based on the type (info, warning, error)"
          contextProps={{
            message: "This is a dynamic component generated from a description!",
            type: "info"
          }}
        />
      </div>
      
      {/* Another Dynamic Component Example */}
      <div className="p-8 border rounded-lg">
        <h2 className="text-2xl font-bold mb-4">User Profile Card</h2>
        <Component 
          description="Create a user profile card with avatar, name, title, bio, and social links"
          contextProps={{
            user: {
              name: "Jane Doe",
              title: "Product Designer",
              bio: "Creating beautiful user experiences for web and mobile applications.",
              avatar: "https://i.pravatar.cc/150?img=5",
              social: [
                { platform: "Twitter", url: "#" },
                { platform: "LinkedIn", url: "#" },
                { platform: "GitHub", url: "#" }
              ]
            }
          }}
        />
      </div>
    </div>
  )
}
