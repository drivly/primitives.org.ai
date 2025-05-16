export const entityTypes = {
  nouns: [
    'Product', 'Service', 'Platform', 'Solution', 'System', 'Tool', 'Application',
    'Assistant', 'Manager', 'Analyzer', 'Generator', 'Automation', 'Intelligence',
    'Content', 'Data', 'Information', 'Knowledge', 'Insight', 'Analytics',
    'Business', 'Enterprise', 'Organization', 'Company', 'Team', 'Customer', 'User'
  ],
  verbs: [
    'Create', 'Generate', 'Build', 'Develop', 'Design', 'Optimize', 'Enhance',
    'Analyze', 'Process', 'Transform', 'Convert', 'Translate', 'Interpret',
    'Automate', 'Streamline', 'Simplify', 'Accelerate', 'Improve', 'Augment',
    'Manage', 'Organize', 'Track', 'Monitor', 'Measure', 'Evaluate', 'Assess'
  ],
  things: [
    'AI', 'Machine Learning', 'Natural Language Processing', 'Computer Vision',
    'Blockchain', 'IoT', 'Cloud', 'Big Data', 'Analytics', 'Automation',
    'Workflow', 'Process', 'Pipeline', 'Framework', 'Infrastructure', 'Architecture',
    'Interface', 'Experience', 'Interaction', 'Communication', 'Collaboration'
  ]
}

export const generateIdeasFromEntities = (entities: typeof entityTypes) => {
  return [
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

export const developIdea = (idea: any) => {
  const businessModel = {
    productName: idea.name,
    description: idea.description,
    customerSegments: idea.targetMarket.split(', '),
    valueProposition: `${idea.name} helps ${idea.targetMarket} to ${idea.description.toLowerCase()}`,
    channels: ['Direct online sales', 'Partner referrals', 'Content marketing'],
    customerRelationships: ['Self-service', 'Automated onboarding', 'Email support'],
    revenueStreams: [idea.potentialRevenue],
    keyResources: ['AI algorithms', 'Cloud infrastructure', 'Development team'],
    keyActivities: ['Product development', 'Marketing', 'Customer support'],
    keyPartners: ['Cloud providers', 'AI research institutions', 'Marketing agencies'],
    costStructure: ['Development costs', 'Infrastructure costs', 'Marketing costs']
  }
  
  const messaging = {
    hero: idea.targetMarket.split(', ')[0],
    problem: `Struggling with ${idea.description.toLowerCase().split('that ')[1]}`,
    guide: idea.name,
    plan: ['Easy setup', 'Seamless integration', 'Immediate results'],
    callToAction: 'Start your free trial',
    failure: 'Don\'t waste more time on manual processes',
    success: 'Achieve better results in less time'
  }
  
  const disciplinedEntrepreneurship = {
    marketSize: idea.targetMarket.split(',').length * 10000,
    valueProposition: `${idea.name} helps ${idea.targetMarket} to ${idea.description.toLowerCase()}`,
    customerAcquisition: 'Digital marketing, content marketing, and referral programs',
    salesStrategy: 'Freemium model with upgrade paths for premium features',
    competitiveAnalysis: 'Identified 3 main competitors with less automation capabilities',
    coreMetrics: ['User acquisition cost', 'Conversion rate', 'Customer lifetime value'],
    productRoadmap: ['MVP launch', 'Feature expansion', 'Enterprise tier', 'Mobile apps']
  }
  
  return {
    idea,
    businessModel,
    messaging,
    disciplinedEntrepreneurship
  }
}

export const generateLandingPage = (developedIdea: any) => {
  const { idea, messaging } = developedIdea
  
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
  
  return {
    title: idea.name,
    description: idea.description,
    hero: messaging.hero,
    problem: messaging.problem,
    solution: messaging.guide,
    features,
    benefits,
    cta: messaging.callToAction,
    waitlistEndpoint: '/api/waitlist/subscribe'
  }
}
