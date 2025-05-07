'use client'

import React from 'react'
import { AI } from 'ai-props'
import { FAQsProps } from '../types'
import { cn } from '../lib/utils'

export function FAQs({
  model = 'gpt-4o',
  prompt,
  stream = true,
  className,
  title,
  count = 5,
  items,
}: FAQsProps) {
  const defaultPrompt = prompt || `Generate ${count} frequently asked questions and answers for a website`
  
  const schema = {
    title: 'Title for the FAQs section',
    items: Array(count).fill({
      question: 'Question text',
      answer: 'Answer text'
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
        const faqTitle = title || content.title
        const faqItems = items || content.items || []
        
        return (
          <div className={cn('py-12 px-4', className)}>
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
            
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">
                {faqTitle || (isStreaming ? 'Generating FAQs...' : 'Frequently Asked Questions')}
              </h2>
              
              <div className="space-y-6">
                {faqItems.length > 0 ? (
                  faqItems.map((item, index) => (
                    <div key={index} className="border rounded-lg p-6 bg-card">
                      <h3 className="text-xl font-semibold mb-2">{item.question}</h3>
                      <p className="text-muted-foreground">{item.answer}</p>
                    </div>
                  ))
                ) : isStreaming ? (
                  Array(count).fill(0).map((_, index) => (
                    <div key={index} className="border rounded-lg p-6 bg-card animate-pulse">
                      <div className="h-6 bg-muted rounded w-3/4 mb-4"></div>
                      <div className="h-4 bg-muted rounded w-full mb-2"></div>
                      <div className="h-4 bg-muted rounded w-5/6"></div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-muted-foreground">
                    No FAQs available
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
