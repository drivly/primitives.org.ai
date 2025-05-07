'use client'

import React from 'react'
import { AI } from 'ai-props'
import { MDXRemote, compileMDX } from 'next-mdx-remote/rsc'
import { ComponentProps } from './types'
import { mdxComponents } from './mdx-components'
import { cn } from './lib/utils'

/**
 * Dynamic Component generator that uses AI to create custom UI components
 * based on descriptions using Tailwind and ShadCN UI
 */
export function Component({
  description,
  model = 'gpt-4o',
  contextProps = {},
  stream = true,
  className,
}: ComponentProps) {
  const prompt = `Create a React component that: ${description}. 
Use Tailwind CSS for styling and ShadCN UI components where appropriate.
Return only the JSX code without any imports or exports.
The component should be responsive and follow modern UI design principles.
${Object.keys(contextProps).length > 0 ? `Use these context properties in your component: ${JSON.stringify(contextProps)}` : ''}
`

  const schema = {
    jsx: 'JSX code for the component using Tailwind and ShadCN',
    metadata: { 
      componentType: 'Type of component being created',
      description: 'Brief description of what the component does'
    },
    productType: 'Component | UI | Widget',
    profile: {
      customer: 'Developer using the dynamic component generator',
      solution: 'A custom UI component generated based on a description'
    },
    description: `A dynamic UI component that: ${description}`,
    tags: ['ui', 'component', 'dynamic', 'tailwind', 'shadcn']
  }

  return (
    <AI
      prompt={prompt}
      model={model}
      schema={schema}
      stream={stream}
    >
      {/* @ts-ignore - AI component children function type mismatch */}
      {(content: any, { isStreaming, error }: { isStreaming: boolean; error: Error | null }) => {
        if (error) {
          return (
            <div className="p-4 border border-destructive bg-destructive/10 rounded-md text-destructive">
              <h3 className="font-semibold mb-2">Error generating component</h3>
              <p>{error.message}</p>
            </div>
          )
        }

        if (isStreaming) {
          return (
            <div className="p-8 border rounded-md animate-pulse bg-muted/50">
              <div className="h-6 bg-muted rounded w-3/4 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
                <div className="h-4 bg-muted rounded w-4/6"></div>
              </div>
              <div className="mt-4 text-xs text-muted-foreground">Generating component...</div>
            </div>
          )
        }

        const jsxWithWrapper = `<div className="${cn('ai-generated-component', className)}">${content.jsx}</div>`

        return (
          <>
            {content.metadata && (
              <div className="mb-4 text-xs text-muted-foreground">
                <span className="font-semibold">{content.metadata.componentType}</span>
                {content.metadata.description && `: ${content.metadata.description}`}
              </div>
            )}
            
            <div 
              className={cn('ai-generated-component', className)}
              dangerouslySetInnerHTML={{ __html: content.jsx }} 
            />
          </>
        )
      }}
    </AI>
  )
}
