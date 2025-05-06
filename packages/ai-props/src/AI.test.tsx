import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { AI } from './AI'

vi.mock('ai-functions', () => ({
  generateObject: vi.fn().mockResolvedValue({
    object: {
      title: 'Test Title',
      content: 'Test Content'
    }
  })
}))

vi.mock('ai-providers', () => ({
  model: vi.fn().mockReturnValue({
    name: 'mocked-model',
    provider: 'openai'
  })
}))

describe('AI Component', () => {
  it('should render without crashing', () => {
    expect(() => {
      render(
        <AI
          model='gpt-4o'
          schema={{
            title: 'string',
            content: 'string'
          }}
          prompt='Generate test content'
        >
          {() => <div>Content</div>}
        </AI>
      )
    }).not.toThrow()
  })
})
