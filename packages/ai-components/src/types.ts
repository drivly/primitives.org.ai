import { ReactNode } from 'react'

/**
 * Base props for all AI components
 */
export interface AIComponentProps {
  /**
   * AI model to use. Can be a string (e.g., 'gpt-4o') or a model object from ai-providers
   * @default 'gpt-4o'
   */
  model?: string | any

  /**
   * Custom prompt to override the default prompt
   */
  prompt?: string

  /**
   * Whether to stream the AI response in real-time
   * @default true
   */
  stream?: boolean

  /**
   * Additional className to be applied to the component
   */
  className?: string

  /**
   * Children components
   */
  children?: ReactNode
}

/**
 * Hero component props
 */
export interface HeroProps extends AIComponentProps {
  /**
   * Title of the hero section, overrides AI generation
   */
  title?: string

  /**
   * Subtitle of the hero section, overrides AI generation
   */
  subtitle?: string

  /**
   * Call to action text, overrides AI generation
   */
  ctaText?: string

  /**
   * Call to action link, overrides AI generation
   */
  ctaLink?: string

  /**
   * Background image URL
   */
  backgroundImage?: string
}

/**
 * FAQs component props
 */
export interface FAQsProps extends AIComponentProps {
  /**
   * Title of the FAQs section, overrides AI generation
   */
  title?: string

  /**
   * Number of FAQs to generate
   * @default 5
   */
  count?: number

  /**
   * Manual FAQ items, overrides AI generation
   */
  items?: Array<{
    question: string
    answer: string
  }>
}

/**
 * Pricing component props
 */
export interface PricingProps extends AIComponentProps {
  /**
   * Title of the pricing section, overrides AI generation
   */
  title?: string

  /**
   * Subtitle of the pricing section, overrides AI generation
   */
  subtitle?: string

  /**
   * Number of pricing tiers to generate
   * @default 3
   */
  tierCount?: number

  /**
   * Manual pricing tiers, overrides AI generation
   */
  tiers?: Array<{
    name: string
    price: string
    description: string
    features: string[]
    cta: {
      text: string
      link: string
    }
  }>
}

/**
 * Features component props
 */
export interface FeaturesProps extends AIComponentProps {
  /**
   * Title of the features section, overrides AI generation
   */
  title?: string

  /**
   * Subtitle of the features section, overrides AI generation
   */
  subtitle?: string

  /**
   * Number of features to generate
   * @default 6
   */
  count?: number

  /**
   * Manual features, overrides AI generation
   */
  items?: Array<{
    title: string
    description: string
    icon?: string
  }>
}

/**
 * Testimonials component props
 */
export interface TestimonialsProps extends AIComponentProps {
  /**
   * Title of the testimonials section, overrides AI generation
   */
  title?: string

  /**
   * Number of testimonials to generate
   * @default 3
   */
  count?: number

  /**
   * Manual testimonials, overrides AI generation
   */
  items?: Array<{
    quote: string
    author: string
    role?: string
    company?: string
    avatar?: string
  }>
}

/**
 * CTA component props
 */
export interface CTAProps extends AIComponentProps {
  /**
   * Title of the CTA section, overrides AI generation
   */
  title?: string

  /**
   * Description of the CTA section, overrides AI generation
   */
  description?: string

  /**
   * Primary CTA text, overrides AI generation
   */
  primaryCta?: {
    text: string
    link: string
  }

  /**
   * Secondary CTA text, overrides AI generation
   */
  secondaryCta?: {
    text: string
    link: string
  }
}

/**
 * Dynamic Component props
 */
export interface ComponentProps {
  /**
   * Description of the component to generate
   */
  description: string

  /**
   * AI model to use
   * @default 'gpt-4o'
   */
  model?: string | any

  /**
   * Context properties to pass to the generated component
   */
  contextProps?: Record<string, any>

  /**
   * Whether to stream the AI response in real-time
   * @default true
   */
  stream?: boolean

  /**
   * Additional className to be applied to the component
   */
  className?: string
}
