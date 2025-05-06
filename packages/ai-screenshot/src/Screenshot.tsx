import React, { useEffect, useRef, useState } from 'react'
import { toPng, toSvg } from 'html-to-image'
import { generateMissingProps } from './ai'
import { ScreenshotOptions, ContentConfig } from './types'
import { SidebarLayout } from './layouts/sidebar'
import { StackedLayout } from './layouts/stacked'

/**
 * Screenshot component for generating SaaS app screenshots
 */
export const Screenshot: React.FC<ScreenshotOptions> = ({
  layout = 'sidebar',
  content,
  theme = { colorScheme: 'light' },
  exportFormat = 'react',
  onExport,
}) => {
  const [completeContent, setCompleteContent] = useState<ContentConfig>(content)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fillMissingProps = async () => {
      setIsLoading(true)
      try {
        const enhancedContent = await generateMissingProps(content)
        setCompleteContent(enhancedContent)
      } catch (error) {
        console.error('Error generating missing props:', error)
        setCompleteContent(content) // Fallback to original content
      } finally {
        setIsLoading(false)
      }
    }

    fillMissingProps()
  }, [content])

  useEffect(() => {
    if (exportFormat !== 'react' && containerRef.current && !isLoading && onExport) {
      const exportImage = async () => {
        try {
          let dataUrl = ''
          
          if (exportFormat === 'png') {
            dataUrl = await toPng(containerRef.current as HTMLElement)
          } else if (exportFormat === 'svg') {
            dataUrl = await toSvg(containerRef.current as HTMLElement)
          }
          
          if (onExport && dataUrl) {
            onExport(dataUrl)
          }
        } catch (error) {
          console.error(`Error exporting as ${exportFormat}:`, error)
        }
      }
      
      exportImage()
    }
  }, [exportFormat, isLoading, onExport, completeContent])

  if (isLoading) {
    return <div>Loading screenshot...</div>
  }

  return (
    <div 
      ref={containerRef}
      style={{
        fontFamily: theme.fontFamily || 'system-ui, sans-serif',
        backgroundColor: theme.colorScheme === 'dark' ? '#1a1a1a' : '#ffffff',
        color: theme.colorScheme === 'dark' ? '#ffffff' : '#000000',
        borderRadius: theme.borderRadius || 4,
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      {layout === 'sidebar' ? (
        <SidebarLayout content={completeContent} theme={theme} />
      ) : (
        <StackedLayout content={completeContent} theme={theme} />
      )}
    </div>
  )
}
