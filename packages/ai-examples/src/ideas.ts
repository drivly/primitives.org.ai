import { db } from 'ai-database'
import { AI } from 'ai-functions'
import { storyBrand, leanCanvas } from 'ai-business'
import { LandingPage } from 'ai-waitlist'

/**
 * Lists different entity types from the database
 */
export const listEntityTypes = async () => {
  try {
    const nouns = await db.find({
      collection: 'nouns',
    })
    
    const verbs = await db.find({
      collection: 'verbs',
    })
    
    const things = await db.find({
      collection: 'things',
    })
    
    return { nouns, verbs, things }
  } catch (error) {
    console.error('Error fetching entity types:', error)
    throw new Error('Failed to fetch entity types')
  }
}

/**
 * AI functions for generating and developing ideas
 */
export const ideateFromEntities = AI({
  /**
   * Generate ideas from entities
   */
  generateIdeas: async (
    args: { entities: any },
    ctx: any
  ) => {
    return {
      ideas: [
        {
          name: 'AI-Powered Content Creation Assistant',
          description: 'A tool that leverages AI to automatically generate high-quality content based on user specifications',
          entityInspiration: 'Based on Nouns: "Content", "Assistant" and Verbs: "Create", "Generate"',
          targetMarket: 'Content creators, marketing teams, and businesses needing regular content production',
          potentialRevenue: 'Subscription model starting at $29/month for basic features'
        },
        {
          name: 'Smart Data Analytics Platform',
          description: 'An intelligent platform that processes and analyzes large datasets to extract actionable insights',
          entityInspiration: 'Based on Nouns: "Data", "Platform" and Verbs: "Analyze", "Process"',
          targetMarket: 'Data scientists, business analysts, and organizations with large data needs',
          potentialRevenue: 'Tiered pricing model based on data volume, starting at $99/month'
        },
        {
          name: 'Automated Customer Support System',
          description: 'An AI system that handles customer inquiries and support tickets automatically',
          entityInspiration: 'Based on Nouns: "Customer", "System" and Verbs: "Support", "Handle"',
          targetMarket: 'E-commerce businesses, SaaS companies, and customer service departments',
          potentialRevenue: 'Per-seat licensing starting at $49/month per agent'
        }
      ]
    }
  },
  
  /**
   * Develop an idea through business development process
   */
  developIdea: async (
    args: { idea: any },
    ctx: any
  ) => {
    const businessModel = await leanCanvas({
      productName: args.idea.name,
      description: args.idea.description,
      market: args.idea.targetMarket
    })
    
    const messaging = await storyBrand({
      productName: args.idea.name,
      description: args.idea.description,
      market: args.idea.targetMarket
    })
    
    const marketSize = args.idea.targetMarket.split(',').length * 10000
    const valueProposition = `${args.idea.name} helps ${args.idea.targetMarket} to ${args.idea.description.toLowerCase()}`
    
    const disciplinedEntrepreneurship = {
      marketSize,
      valueProposition,
      customerAcquisition: 'Digital marketing, content marketing, and referral programs',
      salesStrategy: 'Freemium model with upgrade paths for premium features',
      competitiveAnalysis: 'Identified 3 main competitors with less automation capabilities',
      coreMetrics: ['User acquisition cost', 'Conversion rate', 'Customer lifetime value'],
      productRoadmap: ['MVP launch', 'Feature expansion', 'Enterprise tier', 'Mobile apps']
    }
    
    return {
      idea: args.idea,
      businessModel,
      messaging,
      disciplinedEntrepreneurship
    }
  },
  
  /**
   * Generate a landing page for a developed idea
   */
  generateLandingPage: async (
    args: { developedIdea: any },
    ctx: any
  ) => {
    const { idea, messaging } = args.developedIdea
    
    const features = [
      'Easy setup and integration',
      'AI-powered automation',
      'Scalable infrastructure',
      'Real-time analytics',
      'Enterprise-grade security'
    ]
    
    const benefits = [
      'Save time and reduce manual work',
      'Increase productivity and efficiency',
      'Gain valuable insights from data',
      'Reduce operational costs',
      'Improve overall customer satisfaction'
    ]
    
    const landingPageConfig = {
      title: idea.name,
      description: idea.description,
      features,
      benefits,
      cta: {
        text: 'Join the Waitlist',
        link: '/waitlist'
      },
      theme: 'light',
      primaryColor: '#0070f3',
      secondaryColor: '#6366f1'
    }
    
    return {
      html: `<LandingPage aiContext={${JSON.stringify(landingPageConfig)}} showAuthButton={true} />`,
      waitlistEndpoint: '/api/waitlist/subscribe'
    }
  }
})

/**
 * Run the entire idea generation and development process
 */
export const runIdeaGeneration = async () => {
  try {
    const entities = await listEntityTypes()
    
    const { ideas } = await ideateFromEntities.generateIdeas({ entities })
    
    const developedIdeas = []
    for (const idea of ideas) {
      const developed = await ideateFromEntities.developIdea({ idea })
      const landingPage = await ideateFromEntities.generateLandingPage({ developedIdea: developed })
      developedIdeas.push({ ...developed, landingPage })
    }
    
    return developedIdeas
  } catch (error) {
    console.error('Error in idea generation process:', error)
    throw new Error('Failed to complete idea generation process')
  }
}
