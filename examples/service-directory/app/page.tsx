import { type Service, ServiceDirectory } from "@/components/service-directory"

// Sample data for demonstration
const services: Service[] = [
  {
    id: "pricing",
    name: "Real-Time Pricing",
    description: "Get live market prices for any VIN in seconds with our advanced AI-powered pricing engine.",
    iconSrc: "/dr-logo.svg",
    tags: ["Pricing", "Valuation", "Real-time"],
    docsUrl: "/docs/pricing",
  },
  {
    id: "sentiment",
    name: "Sentiment Analysis",
    description: "Analyze customer feedback and reviews to understand sentiment and identify improvement areas.",
    iconSrc: "/sentiment-logo.png",
    tags: ["NLP", "Analytics", "Customer Insights"],
    docsUrl: "/docs/sentiment",
  },
  {
    id: "recommendation",
    name: "Recommendation Engine",
    description: "Personalized product recommendations based on user behavior and preferences.",
    iconSrc: "/recommendation-logo.svg",
    tags: ["Personalization", "ML", "E-commerce"],
    docsUrl: "/docs/recommendation",
  },
  {
    id: "translation",
    name: "Neural Translation",
    description: "High-quality, context-aware translations for over 100 languages using neural networks.",
    iconSrc: "/translation-logo.png",
    tags: ["NLP", "Localization", "Global"],
    docsUrl: "/docs/translation",
  },
  {
    id: "image-recognition",
    name: "Image Recognition",
    description: "Identify objects, scenes, and activities in images with high accuracy.",
    iconSrc: "/image-recognition-logo.svg",
    tags: ["Computer Vision", "ML", "Media"],
    docsUrl: "/docs/image-recognition",
  },
  {
    id: "chatbot",
    name: "Conversational AI",
    description: "Build intelligent chatbots and virtual assistants that understand natural language.",
    iconSrc: "/chatbot-logo.svg",
    tags: ["NLP", "Conversational", "Support"],
    docsUrl: "/docs/chatbot",
  },
  {
    id: "data-processing",
    name: "Data Processing",
    description: "Process and analyze large datasets with our high-performance distributed computing platform.",
    iconSrc: "/data-processing-logo.svg",
    tags: ["Big Data", "Analytics", "ETL"],
    docsUrl: "/docs/data-processing",
  },
  {
    id: "ai-automation",
    name: "AI Automation",
    description: "Automate repetitive tasks and workflows with intelligent AI-powered automation tools.",
    iconSrc: "/ai-automation-logo.svg",
    tags: ["Automation", "Workflow", "Productivity"],
    docsUrl: "/docs/ai-automation",
  },
]

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <ServiceDirectory services={services} />
    </main>
  )
}
