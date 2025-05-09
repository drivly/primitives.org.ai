'use client'

import React from 'react'
import { AI } from 'ai-props'
import { HeroProps } from '../types'
import { cn } from '../lib/utils'

export function Hero({ model = 'gpt-4o', prompt, stream = true, className, title, subtitle, ctaText, ctaLink, backgroundImage, children }: HeroProps) {
  const defaultPrompt = prompt || 'Generate a compelling hero section for a modern website'

  const schema = {
    title: 'The main heading for the hero section',
    subtitle: 'A compelling subtitle that explains the value proposition',
    cta: {
      text: 'CTA button text',
      link: 'URL or path',
    },
    productType: 'Component | UI | Widget',
    profile: {
      customer: 'Website visitor',
      solution: 'Compelling hero section that communicates value proposition',
    },
    description: `Hero section for ${prompt || 'a modern website'}`,
    tags: ['hero', 'header', 'banner', 'landing'],
  }

  return (
    <AI model={model} prompt={defaultPrompt} schema={schema} stream={stream}>
      {/* @ts-ignore - AI component children function type mismatch */}
      {(content: any, { isStreaming, error }: { isStreaming: boolean; error: Error | null }) => {
        const heroTitle = title || content.title
        const heroSubtitle = subtitle || content.subtitle
        const heroCta = {
          text: ctaText || content.cta?.text,
          link: ctaLink || content.cta?.link || '#',
        }

        return (
          <div
            className={cn('flex flex-col items-center justify-center py-16 px-4 text-center', backgroundImage && 'bg-cover bg-center', className)}
            style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
          >
            {isStreaming && <div className='absolute top-2 right-2 text-xs bg-primary/10 px-2 py-1 rounded-full animate-pulse'>Generating content...</div>}

            {error && <div className='text-destructive mb-4'>Error generating content: {error.message}</div>}

            <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold max-w-3xl'>
              {heroTitle || (isStreaming ? 'Generating title...' : 'Welcome to our platform')}
            </h1>

            <p className='mt-6 text-xl max-w-2xl text-muted-foreground'>
              {heroSubtitle || (isStreaming ? 'Generating subtitle...' : 'Discover what we can do for you')}
            </p>

            <div className='mt-10 flex flex-col sm:flex-row gap-4'>
              <a
                href={heroCta.link}
                className='inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors'
              >
                {heroCta.text || (isStreaming ? 'Loading...' : 'Get Started')}
              </a>

              {children}
            </div>
          </div>
        )
      }}
    </AI>
  )
}
