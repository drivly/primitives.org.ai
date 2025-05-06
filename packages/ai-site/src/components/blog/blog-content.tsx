'use client';

import React from 'react'
import ReactMarkdown from 'react-markdown'

/**
 * Props for the BlogContent component
 */
export interface BlogContentProps {
  markdown: string
}

/**
 * Blog content component that renders markdown content using react-markdown
 * This is a client component to handle ESM compatibility issues
 */
export function BlogContent({ markdown }: BlogContentProps) {
  return (
    <div className="blog-content">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  )
}
