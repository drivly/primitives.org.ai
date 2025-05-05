import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { AI } from './AI'
import { model } from 'ai-providers'

vi.mock('ai-functions', () => ({
  generateObject: vi.fn().mockImplementation(async ({ schema }) => {
    return {
      object: {
        title: 'Test Title',
        content: 'Test Content'
      }
    }
  })
}))

describe('AI Component', () => {
  it('renders with string-based model name', async () => {
    render(
      <AI
        model='gpt-4o'
        schema={{
          title: 'string',
          content: 'string'
        }}
        prompt='Generate test content'
      >
        {(props) => (
          <div data-testid='ai-content'>
            <h1>{props.title}</h1>
            <p>{props.content}</p>
          </div>
        )}
      </AI>
    )
    
    await waitFor(() => {
      expect(screen.getByTestId('ai-content')).toBeInTheDocument()
      expect(screen.getByText('Test Title')).toBeInTheDocument()
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })
  })
  
  it('renders with provider-specific model object', async () => {
    const customModel = model('claude-3-sonnet')
    
    render(
      <AI
        model={customModel}
        schema={{
          title: 'string',
          content: 'string'
        }}
        prompt='Generate test content'
      >
        {(props) => (
          <div data-testid='ai-content'>
            <h1>{props.title}</h1>
            <p>{props.content}</p>
          </div>
        )}
      </AI>
    )
    
    await waitFor(() => {
      expect(screen.getByTestId('ai-content')).toBeInTheDocument()
      expect(screen.getByText('Test Title')).toBeInTheDocument()
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })
  })
  
  it('handles streaming mode', async () => {
    vi.mock('ai-functions', () => ({
      generateObject: vi.fn()
    }))
    
    const mockObjectStream = {
      [Symbol.asyncIterator]: () => ({
        next: vi.fn()
          .mockResolvedValueOnce({ value: { title: 'Streaming', content: 'Initial' }, done: false })
          .mockResolvedValueOnce({ value: { title: 'Streaming', content: 'Partial' }, done: false })
          .mockResolvedValueOnce({ value: { title: 'Streaming', content: 'Complete' }, done: true })
      })
    }
    
    vi.mock('./AI', () => ({
      streamObject: vi.fn().mockResolvedValue({ objectStream: mockObjectStream })
    }))
    
    render(
      <AI
        model='gpt-4o'
        schema={{
          title: 'string',
          content: 'string'
        }}
        prompt='Generate test content'
        stream={true}
      >
        {(props, { isStreaming, error }) => (
          <div data-testid='ai-content'>
            {error ? (
              <div data-testid='error-message'>Error: {error.message}</div>
            ) : (
              <>
                <h1>{props.title}</h1>
                <p>{props.content}</p>
                {isStreaming && <div data-testid='loading'>Loading...</div>}
              </>
            )}
          </div>
        )}
      </AI>
    )
    
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
      expect(screen.getByText('Streaming')).toBeInTheDocument()
      expect(screen.getByText('Complete')).toBeInTheDocument()
    })
  })
  
  it('handles enum options in schema', async () => {
    vi.mock('ai-functions', () => ({
      generateObject: vi.fn().mockImplementation(async () => {
        return {
          object: {
            productType: 'API',
            profile: {
              customer: 'Enterprise customers',
              solution: 'Backend integration'
            }
          }
        }
      })
    }))
    
    render(
      <AI
        model='gpt-4o'
        schema={{
          productType: 'App | API | Marketplace | Platform',
          profile: {
            customer: 'customer description',
            solution: 'solution description'
          }
        }}
        prompt='Generate product profile'
      >
        {(props) => (
          <div data-testid='product-profile'>
            <h2>Type: {props.productType}</h2>
            <h3>Customer</h3>
            <p>{props.profile.customer}</p>
            <h3>Solution</h3>
            <p>{props.profile.solution}</p>
          </div>
        )}
      </AI>
    )
    
    await waitFor(() => {
      expect(screen.getByTestId('product-profile')).toBeInTheDocument()
      expect(screen.getByText('Type: API')).toBeInTheDocument()
      expect(screen.getByText('Enterprise customers')).toBeInTheDocument()
      expect(screen.getByText('Backend integration')).toBeInTheDocument()
    })
  })
  
  it('handles array output mode', async () => {
    vi.mock('ai-functions', () => ({
      generateObject: vi.fn().mockImplementation(async () => {
        return {
          object: [
            { name: 'Product 1', description: 'Description 1' },
            { name: 'Product 2', description: 'Description 2' },
            { name: 'Product 3', description: 'Description 3' }
          ]
        }
      })
    }))
    
    render(
      <AI
        model='gpt-4o'
        schema={{
          name: 'string',
          description: 'string'
        }}
        output='array'
        cols={3}
        prompt='Generate product ideas'
      >
        {(props) => (
          <div data-testid='product-item'>
            <h2>{props.name}</h2>
            <p>{props.description}</p>
          </div>
        )}
      </AI>
    )
    
    await waitFor(() => {
      expect(screen.getAllByTestId('product-item').length).toBe(3)
      expect(screen.getByText('Product 1')).toBeInTheDocument()
      expect(screen.getByText('Description 2')).toBeInTheDocument()
      expect(screen.getByText('Product 3')).toBeInTheDocument()
    })
  })
  
  it('handles error states', async () => {
    vi.mock('ai-functions', () => ({
      generateObject: vi.fn().mockRejectedValue(new Error('API Error'))
    }))
    
    render(
      <AI
        model='gpt-4o'
        schema={{
          title: 'string',
          content: 'string'
        }}
        prompt='Generate test content'
      >
        {(props, { isStreaming, error }) => (
          <div data-testid='ai-content'>
            {error ? (
              <div data-testid='error-message'>Error: {error.message}</div>
            ) : (
              <>
                <h1>{props.title}</h1>
                <p>{props.content}</p>
                {isStreaming && <div>Loading...</div>}
              </>
            )}
          </div>
        )}
      </AI>
    )
    
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument()
      expect(screen.getByText('Error: API Error')).toBeInTheDocument()
    })
  })
})
