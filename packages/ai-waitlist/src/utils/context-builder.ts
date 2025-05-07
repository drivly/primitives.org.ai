import { parseProjectContext } from './content-parser.js'

/**
 * Build AI context for landing page generation
 * @param projectContext - Project context from README and .ai folder
 * @returns AI context for landing page generation
 */
export const buildAIContext = (projectContext: ReturnType<typeof parseProjectContext>) => {
  const { readme, aiContent } = projectContext
  
  const projectName = extractProjectName(readme)
  const projectDescription = extractProjectDescription(readme)
  
  const features = extractFeatures(readme, aiContent)
  
  const benefits = extractBenefits(readme, aiContent)
  
  const callToAction = extractCallToAction(readme, aiContent)
  
  return {
    projectName,
    projectDescription,
    features,
    benefits,
    callToAction,
    rawReadme: readme,
    rawAiContent: aiContent
  }
}

/**
 * Extract project name from README
 * @param readme - README content
 * @returns Project name
 */
const extractProjectName = (readme: string): string => {
  const headingMatch = readme.match(/^#\s+(.+)$/m)
  if (headingMatch && headingMatch[1]) {
    return headingMatch[1].trim()
  }
  
  return 'My Project'
}

/**
 * Extract project description from README
 * @param readme - README content
 * @returns Project description
 */
const extractProjectDescription = (readme: string): string => {
  const paragraphMatch = readme.match(/^#\s+.+\n+(.+?)(\n\n|$)/m)
  if (paragraphMatch && paragraphMatch[1]) {
    return paragraphMatch[1].trim()
  }
  
  return 'A description of my project'
}

/**
 * Extract features from README or .ai/features.md
 * @param readme - README content
 * @param aiContent - AI folder content
 * @returns Features array
 */
const extractFeatures = (readme: string, aiContent: Record<string, any>): string[] => {
  if (aiContent.features) {
    const features = aiContent.features
      .split('\n')
      .filter((line: string) => line.trim().startsWith('-') || line.trim().startsWith('*'))
      .map((line: string) => line.trim().replace(/^[-*]\s+/, ''))
      .filter(Boolean)
    
    if (features.length > 0) {
      return features
    }
  }
  
  const featuresSection = readme.match(/##\s+Features\s+(.+?)(?=##|$)/s)
  if (featuresSection && featuresSection[1]) {
    const features = featuresSection[1]
      .split('\n')
      .filter(line => line.trim().startsWith('-') || line.trim().startsWith('*'))
      .map(line => line.trim().replace(/^[-*]\s+/, ''))
      .filter(Boolean)
    
    if (features.length > 0) {
      return features
    }
  }
  
  return ['Feature 1', 'Feature 2', 'Feature 3']
}

/**
 * Extract benefits from README or .ai/benefits.md
 * @param readme - README content
 * @param aiContent - AI folder content
 * @returns Benefits array
 */
const extractBenefits = (readme: string, aiContent: Record<string, any>): string[] => {
  if (aiContent.benefits) {
    const benefits = aiContent.benefits
      .split('\n')
      .filter((line: string) => line.trim().startsWith('-') || line.trim().startsWith('*'))
      .map((line: string) => line.trim().replace(/^[-*]\s+/, ''))
      .filter(Boolean)
    
    if (benefits.length > 0) {
      return benefits
    }
  }
  
  const benefitsSection = readme.match(/##\s+Benefits\s+(.+?)(?=##|$)/s)
  if (benefitsSection && benefitsSection[1]) {
    const benefits = benefitsSection[1]
      .split('\n')
      .filter(line => line.trim().startsWith('-') || line.trim().startsWith('*'))
      .map(line => line.trim().replace(/^[-*]\s+/, ''))
      .filter(Boolean)
    
    if (benefits.length > 0) {
      return benefits
    }
  }
  
  return ['Benefit 1', 'Benefit 2', 'Benefit 3']
}

/**
 * Extract call to action from README or .ai/cta.md
 * @param readme - README content
 * @param aiContent - AI folder content
 * @returns Call to action object
 */
const extractCallToAction = (readme: string, aiContent: Record<string, any>): { text: string; link: string } => {
  if (aiContent.cta) {
    const ctaText = aiContent.cta.trim()
    return {
      text: ctaText || 'Join the Waitlist',
      link: '/waitlist'
    }
  }
  
  return {
    text: 'Join the Waitlist',
    link: '/waitlist'
  }
}
