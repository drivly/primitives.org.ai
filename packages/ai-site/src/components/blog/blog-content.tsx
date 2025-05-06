import React from 'react'

/**
 * Props for the BlogContent component
 */
export interface BlogContentProps {
  markdown: string
}

export function BlogContent({ markdown }: BlogContentProps) {
  
  return (
    <div className="blog-content">
      <div dangerouslySetInnerHTML={{ __html: simpleMarkdownToHtml(markdown) }} />
    </div>
  )
}

function simpleMarkdownToHtml(markdown: string): string {
  if (!markdown) return ''
  
  let html = markdown
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    
  html = html.replace(/^\s*(\n)?(.+)/gm, function(m) {
    return /\<(\/)?(h\d|ul|ol|li|blockquote|pre|img)/.test(m) ? m : '<p>' + m + '</p>'
  })
  
  html = html
    .replace(/\*\*(.*)\*\*/gm, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gm, '<em>$1</em>')
  
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gm, '<a href="$2">$1</a>')
  
  html = html.replace(/\n/gm, '<br />')
  
  return html
}
