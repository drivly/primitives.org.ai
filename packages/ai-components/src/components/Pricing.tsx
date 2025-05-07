'use client'

import React from 'react'
import { AI } from 'ai-props'
import { PricingProps } from '../types'
import { cn } from '../lib/utils'

export function Pricing({
  model = 'gpt-4o',
  prompt,
  stream = true,
  className,
  title,
  subtitle,
  tierCount = 3,
  tiers,
}: PricingProps) {
  const defaultPrompt = prompt || `Generate ${tierCount} pricing tiers for a SaaS product`
  
  const schema = {
    title: 'Title for the pricing section',
    subtitle: 'Subtitle explaining the pricing model',
    tiers: Array(tierCount).fill({
      name: 'Tier name',
      price: 'Price amount',
      description: 'Short description of the tier',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
      cta: {
        text: 'CTA button text',
        link: 'URL or path'
      }
    }),
    productType: 'Component | UI | Widget',
    profile: {
      customer: 'Potential customer evaluating pricing options',
      solution: 'Clear pricing information with feature comparison'
    },
    description: `Pricing tiers for ${prompt || 'a SaaS product'}`,
    tags: ['pricing', 'plans', 'tiers', 'subscription']
  }
  
  return (
    <AI 
      model={model}
      prompt={defaultPrompt}
      schema={schema}
      stream={stream}
    >
      {/* @ts-ignore - AI component children function type mismatch */}
      {(content: any, { isStreaming, error }: { isStreaming: boolean; error: Error | null }) => {
        const pricingTitle = title || content.title
        const pricingSubtitle = subtitle || content.subtitle
        const pricingTiers = tiers || content.tiers || []
        
        return (
          <div className={cn('py-16 px-4', className)}>
            {isStreaming && (
              <div className="absolute top-2 right-2 text-xs bg-primary/10 px-2 py-1 rounded-full animate-pulse">
                Generating content...
              </div>
            )}
            
            {error && (
              <div className="text-destructive mb-4">
                Error generating content: {error.message}
              </div>
            )}
            
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold">
                  {pricingTitle || (isStreaming ? 'Generating pricing...' : 'Pricing Plans')}
                </h2>
                <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
                  {pricingSubtitle || (isStreaming ? 'Generating subtitle...' : 'Choose the perfect plan for your needs')}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pricingTiers.length > 0 ? (
                  pricingTiers.map((tier: any, index: number) => (
                    <div 
                      key={index} 
                      className={cn(
                        'border rounded-lg p-8 bg-card flex flex-col',
                        index === 1 && 'border-primary shadow-lg scale-105 z-10'
                      )}
                    >
                      <h3 className="text-2xl font-bold">{tier.name}</h3>
                      <div className="mt-4 text-4xl font-bold">{tier.price}</div>
                      <p className="mt-2 text-muted-foreground">{tier.description}</p>
                      
                      <ul className="mt-6 space-y-3 flex-1">
                        {tier.features.map((feature: string, featureIndex: number) => (
                          <li key={featureIndex} className="flex items-start">
                            <svg className="h-5 w-5 text-primary flex-shrink-0 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <a 
                        href={tier.cta.link || '#'} 
                        className={cn(
                          'mt-8 inline-flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium',
                          index === 1 
                            ? 'text-white bg-primary hover:bg-primary/90' 
                            : 'text-primary bg-primary/10 hover:bg-primary/20'
                        )}
                      >
                        {tier.cta.text}
                      </a>
                    </div>
                  ))
                ) : isStreaming ? (
                  Array(tierCount).fill(0).map((_, index) => (
                    <div key={index} className="border rounded-lg p-8 bg-card animate-pulse">
                      <div className="h-8 bg-muted rounded w-1/2 mb-4"></div>
                      <div className="h-10 bg-muted rounded w-1/3 mb-2"></div>
                      <div className="h-4 bg-muted rounded w-3/4 mb-6"></div>
                      
                      <div className="space-y-3">
                        {Array(4).fill(0).map((_, i) => (
                          <div key={i} className="flex items-center">
                            <div className="h-5 w-5 bg-muted rounded-full mr-2"></div>
                            <div className="h-4 bg-muted rounded w-full"></div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="h-10 bg-muted rounded w-full mt-8"></div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center text-muted-foreground">
                    No pricing tiers available
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      }}
    </AI>
  )
}
