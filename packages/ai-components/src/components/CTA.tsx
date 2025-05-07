'use client'

import React from 'react'
import { AI } from 'ai-props'
import { CTAProps } from '../types'
import { cn } from '../lib/utils'

export function CTA({
  model = 'gpt-4o',
  prompt,
  stream = true,
  className,
  title,
  description,
  primaryCta,
  secondaryCta,
  children,
}: CTAProps) {
  const defaultPrompt = prompt || 'Generate a compelling call-to-action section for a website'
  
  const schema = {
    title: 'Main heading for the CTA section',
    description: 'Compelling description that motivates action',
    primaryCta: {
      text: 'Primary CTA button text',
      link: 'URL or path'
    },
    secondaryCta: {
      text: 'Secondary CTA button text',
      link: 'URL or path'
    }
  }
  
  return (
    <AI 
      model={model}
      prompt={defaultPrompt}
      schema={schema}
      stream={stream}
    >
      {(content, { isStreaming, error }) => {
        const ctaTitle = title || content.title
        const ctaDescription = description || content.description
        const ctaPrimary = primaryCta || content.primaryCta || { text: 'Get Started', link: '#' }
        const ctaSecondary = secondaryCta || content.secondaryCta
        
        return (
          <div className={cn('py-16 px-4 bg-muted/50', className)}>
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
            
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold">
                {ctaTitle || (isStreaming ? 'Generating title...' : 'Ready to get started?')}
              </h2>
              
              <p className="mt-4 text-xl text-muted-foreground">
                {ctaDescription || (isStreaming ? 'Generating description...' : 'Join thousands of satisfied customers using our platform today.')}
              </p>
              
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href={ctaPrimary.link} 
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
                >
                  {ctaPrimary.text || (isStreaming ? 'Loading...' : 'Get Started')}
                </a>
                
                {ctaSecondary && (
                  <a 
                    href={ctaSecondary.link} 
                    className="inline-flex items-center justify-center px-6 py-3 border border-primary text-base font-medium rounded-md text-primary bg-transparent hover:bg-primary/10 transition-colors"
                  >
                    {ctaSecondary.text}
                  </a>
                )}
                
                {children}
              </div>
            </div>
          </div>
        )
      }}
    </AI>
  )
}
