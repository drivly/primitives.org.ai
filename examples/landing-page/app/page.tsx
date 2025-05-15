import { Activity, BarChart, Clock, Zap } from "lucide-react"
import { NavBar } from "@/components/nav-bar"
import { HeroSection } from "@/components/hero-section"
import { TrustLogos } from "@/components/trust-logos"
import { FeaturesSection } from "@/components/features-section"
import { PricingSection } from "@/components/pricing-section"
import { WhyChooseUs } from "@/components/why-choose-us"
import { Testimonials } from "@/components/testimonials"
import { FAQSection } from "@/components/faq-section"
import { FinalCTA } from "@/components/final-cta"
import { Footer } from "@/components/footer"

const outcomeBasedPricingExample = `const service = Service({
  // ...other properties
  pricing: {
    model: 'outcome-based',
    outcomes: [
      { metric: 'conversion-rate', targetValue: 5, price: 500 },
      { metric: 'engagement', targetValue: 10000, price: 300 },
    ],
  },
})
 
// Calculate price based on achieved outcomes
const price = service.calculatePrice({
  outcomes: {
    'conversion-rate': 6.5,
    engagement: 8000,
  },
}) // 500 (only conversion-rate target was met)`

const pythonExample = `import drivly

# Initialize the client
client = drivly.Client(api_key="YOUR_API_KEY")

# Fetch data
response = client.query(
    "SELECT * FROM users WHERE active = true LIMIT 10"
)

# Process results
for user in response.data:
    print(f"User: {user.name}, Email: {user.email}")`

const cliExample = `# Install the CLI
npm install -g drivly-cli

# Authenticate
drivly auth login

# Run a query
drivly query "SELECT * FROM users LIMIT 5"`

const jsExample = `import { Drivly } from '@drivly/sdk';

// Initialize the client
const client = new Drivly({
  apiKey: 'YOUR_API_KEY'
});

// Fetch data
const users = await client.query(
  'SELECT * FROM users LIMIT 5'
);

console.log(users);`

const finalExample = `import { Drivly } from '@drivly/sdk';

// Initialize with your API key
const client = new Drivly({
  apiKey: 'YOUR_API_KEY'
});

// Your first API call
const response = await client.hello();
console.log(response); // Hello, World!`

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1">
        <HeroSection
          title="Outcome-Based Pricing API"
          subtitle="Create flexible pricing models that align with your customers' success metrics"
          metricBadge="New Feature • Outcome-Based Pricing"
          codeExample={outcomeBasedPricingExample}
          codeLanguage="typescript"
        />
        <TrustLogos
          logos={[
            { src: "/vercel-logo.svg", alt: "Vercel", width: 120, height: 40 },
            { src: "/autodev-logo.svg", alt: "AutoDev", width: 120, height: 40 },
            { src: "/cognition-ai-logo.png", alt: "Cognition AI", width: 120, height: 40 },
            { src: "/dr-logo.svg", alt: "DR", width: 120, height: 40 },
          ]}
        />
        <FeaturesSection
          mainFeature={{
            title: "Powerful API Integration",
            description:
              "Our API provides seamless integration with your existing systems, allowing you to focus on building great products.",
            code: pythonExample,
            codeLanguage: "python",
          }}
          smallFeatures={[
            {
              title: "Simple CLI Tools",
              description: "Our command-line tools make it easy to interact with the API directly from your terminal.",
              code: cliExample,
              codeLanguage: "bash",
            },
            {
              title: "JavaScript SDK",
              description:
                "Our JavaScript SDK provides a simple interface for interacting with the API from your web applications.",
              code: jsExample,
              codeLanguage: "javascript",
            },
          ]}
        />
        <PricingSection />
        <WhyChooseUs
          benefits={[
            {
              icon: Zap,
              title: "Lightning Fast",
              description: "Our API is optimized for speed and performance, with response times under 100ms.",
            },
            {
              icon: Clock,
              title: "Always Available",
              description: "99.9% uptime guarantee with redundant infrastructure across multiple regions.",
            },
            {
              icon: BarChart,
              title: "Powerful Analytics",
              description: "Gain insights into your API usage with our comprehensive analytics dashboard.",
            },
            {
              icon: Activity,
              title: "Scalable",
              description: "Our infrastructure scales automatically to handle your growing needs.",
            },
          ]}
        />
        <Testimonials
          testimonials={[
            {
              quote:
                "Drivly's API has transformed how we handle data. It's fast, reliable, and the documentation is excellent.",
              author: "Sarah Johnson",
              role: "CTO",
              company: "TechCorp",
              avatarSrc: "/thoughtful-woman-portrait.png",
              rating: 5,
            },
            {
              quote:
                "We've reduced our data processing time by 70% since switching to Drivly. The support team is also incredibly responsive.",
              author: "Michael Chen",
              role: "Lead Developer",
              company: "DataFlow",
              avatarSrc: "/diverse-group-meeting.png",
              rating: 5,
            },
            {
              quote:
                "The ease of integration was what sold us, but the performance is what keeps us. Highly recommended for any data-heavy application.",
              author: "Jessica Lee",
              role: "Product Manager",
              company: "Innovate Inc",
              avatarSrc: "/jessica-lee-portrait.png",
              rating: 4,
            },
          ]}
        />
        <FAQSection
          faqs={[
            {
              question: "How do I get started with the API?",
              answer:
                "Sign up for a free account, generate an API key, and you can start making requests immediately. Our documentation provides examples in multiple languages to help you get started quickly.",
            },
            {
              question: "What programming languages are supported?",
              answer:
                "We provide official SDKs for JavaScript, Python, Ruby, and Go. However, you can use any language that can make HTTP requests to interact with our RESTful API.",
            },
            {
              question: "Is there a rate limit?",
              answer:
                "Yes, rate limits vary by plan. The Free plan includes 1,000 requests per month, while paid plans offer higher limits. You can view your current usage in the dashboard.",
            },
            {
              question: "How is billing handled?",
              answer:
                "We bill monthly or annually, depending on your preference. You can upgrade, downgrade, or cancel your plan at any time through your account dashboard.",
            },
            {
              question: "Do you offer a service level agreement (SLA)?",
              answer:
                "Yes, our Professional and Enterprise plans include SLAs with guaranteed uptime and response times. Contact our sales team for more details.",
            },
            {
              question: "How secure is my data?",
              answer:
                "We take security seriously. All data is encrypted in transit and at rest, and we regularly undergo security audits. We are SOC 2 Type II compliant and GDPR ready.",
            },
          ]}
        />
        <FinalCTA codeExample={finalExample} codeLanguage="typescript" />
      </main>
      <Footer />
    </div>
  )
}
