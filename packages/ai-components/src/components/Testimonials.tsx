'use client'

import React from 'react'
import { AI } from 'ai-props'
import { TestimonialsProps } from '../types'
import { cn } from '../lib/utils'

export function Testimonials({
  model = 'gpt-4o',
  prompt,
  stream = true,
  className,
  title,
  count = 3,
  items,
}: TestimonialsProps) {
  const defaultPrompt = prompt || `Generate ${count} testimonials from satisfied customers`
  
  const schema = {
    title: 'Title for the testimonials section',
    items: Array(count).fill({
      quote: 'Testimonial quote text',
      author: 'Name of the person',
      role: 'Job title or role',
      company: 'Company name',
      avatar: 'URL to avatar image (optional)'
    }),
    productType: 'Component | UI | Widget',
    profile: {
      customer: 'Website visitor considering the product',
      solution: 'Social proof from satisfied customers'
    },
    description: `Testimonials from ${prompt || 'satisfied customers'}`,
    tags: ['testimonials', 'reviews', 'social proof', 'customers']
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
        const testimonialsTitle = title || content.title
        const testimonialItems = items || content.items || []
        
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
              <h2 className="text-3xl font-bold text-center mb-12">
                {testimonialsTitle || (isStreaming ? 'Generating testimonials...' : 'What Our Customers Say')}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonialItems.length > 0 ? (
                  testimonialItems.map((item: any, index: number) => (
                    <div key={index} className="border rounded-lg p-6 bg-card flex flex-col">
                      <div className="flex-1">
                        <svg className="h-8 w-8 text-primary/40 mb-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                        <p className="text-lg italic mb-6">{item.quote}</p>
                      </div>
                      
                      <div className="flex items-center mt-4">
                        {item.avatar ? (
                          <img 
                            src={item.avatar} 
                            alt={item.author} 
                            className="w-12 h-12 rounded-full mr-4 object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                            <span className="text-primary font-semibold">
                              {item.author.split(' ').map((n: string) => n[0]).join('')}
                            </span>
                          </div>
                        )}
                        
                        <div>
                          <div className="font-semibold">{item.author}</div>
                          {(item.role || item.company) && (
                            <div className="text-sm text-muted-foreground">
                              {item.role}{item.role && item.company ? ', ' : ''}{item.company}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : isStreaming ? (
                  Array(count).fill(0).map((_, index) => (
                    <div key={index} className="border rounded-lg p-6 bg-card animate-pulse">
                      <div className="h-8 w-8 bg-muted rounded mb-4"></div>
                      <div className="h-4 bg-muted rounded w-full mb-2"></div>
                      <div className="h-4 bg-muted rounded w-full mb-2"></div>
                      <div className="h-4 bg-muted rounded w-3/4 mb-6"></div>
                      
                      <div className="flex items-center mt-4">
                        <div className="w-12 h-12 rounded-full bg-muted mr-4"></div>
                        <div>
                          <div className="h-4 bg-muted rounded w-24 mb-2"></div>
                          <div className="h-3 bg-muted rounded w-32"></div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center text-muted-foreground">
                    No testimonials available
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
