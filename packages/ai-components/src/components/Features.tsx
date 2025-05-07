'use client'

import React from 'react'
import { AI } from 'ai-props'
import { FeaturesProps } from '../types'
import { cn } from '../lib/utils'

export function Features({
  model = 'gpt-4o',
  prompt,
  stream = true,
  className,
  title,
  subtitle,
  count = 6,
  items,
}: FeaturesProps) {
  const defaultPrompt = prompt || `Generate ${count} key features for a product or service`
  
  const schema = {
    title: 'Title for the features section',
    subtitle: 'Subtitle explaining the features',
    items: Array(count).fill({
      title: 'Feature title',
      description: 'Feature description',
      icon: 'Icon name (optional)'
    })
  }
  
  return (
    <AI 
      model={model}
      prompt={defaultPrompt}
      schema={schema}
      stream={stream}
    >
      {(content, { isStreaming, error }) => {
        const featuresTitle = title || content.title
        const featuresSubtitle = subtitle || content.subtitle
        const featureItems = items || content.items || []
        
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
                  {featuresTitle || (isStreaming ? 'Generating features...' : 'Key Features')}
                </h2>
                <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
                  {featuresSubtitle || (isStreaming ? 'Generating subtitle...' : 'Discover what makes us different')}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featureItems.length > 0 ? (
                  featureItems.map((item, index) => (
                    <div key={index} className="border rounded-lg p-6 bg-card">
                      {item.icon && (
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                          <span className="text-2xl">{item.icon}</span>
                        </div>
                      )}
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  ))
                ) : isStreaming ? (
                  Array(count).fill(0).map((_, index) => (
                    <div key={index} className="border rounded-lg p-6 bg-card animate-pulse">
                      <div className="w-12 h-12 rounded-full bg-muted mb-4"></div>
                      <div className="h-6 bg-muted rounded w-3/4 mb-4"></div>
                      <div className="h-4 bg-muted rounded w-full mb-2"></div>
                      <div className="h-4 bg-muted rounded w-5/6"></div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center text-muted-foreground">
                    No features available
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
