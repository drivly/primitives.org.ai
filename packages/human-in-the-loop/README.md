# Human-in-the-Loop

A strongly-typed interface for human functions across multiple platforms.

## Installation

```bash
npm install human-in-the-loop
# or
yarn add human-in-the-loop
# or
pnpm add human-in-the-loop
```

## Features

- Strongly-typed human functions with TypeScript generics
- Support for multiple platforms:
  - Slack (using Block Kit)
  - Microsoft Teams
  - React/ShadCN UI components
  - Email (via React Email)
- Simple, consistent API across all platforms
- Type-safe inputs and outputs

## Usage

### Basic Example

```typescript
import { createHumanFunction } from 'human-in-the-loop'

// Define a strongly-typed human function for approval
const getApproval = createHumanFunction<{ documentTitle: string; documentUrl: string }, { approved: boolean; comments?: string }>({
  platform: 'slack',
  title: 'Document Approval Request',
  description: 'Please review and approve the following document:',
  options: [
    { value: 'approve', label: 'Approve' },
    { value: 'reject', label: 'Reject' },
  ],
  freeText: true,
  // Slack-specific options
  channel: 'approvals',
})

// Request human input
const task = await getApproval.request({
  documentTitle: 'Q2 Financial Report',
  documentUrl: 'https://example.com/docs/q2-finance',
})

console.log(`Task created with ID: ${task.taskId}`)

// Later, get the response
const response = await getApproval.getResponse(task.taskId)
if (response?.approved) {
  console.log('Document was approved!')
  if (response.comments) {
    console.log(`Comments: ${response.comments}`)
  }
} else {
  console.log('Document was rejected or pending')
}
```

### Platform-Specific Examples

#### Slack

```typescript
import { createHumanFunction } from 'human-in-the-loop'

const slackFeedback = createHumanFunction<{ featureDescription: string }, { rating: number; feedback?: string }>({
  platform: 'slack',
  title: 'Feature Feedback Request',
  description: 'Please provide feedback on our new feature:',
  options: [
    { value: '1', label: '⭐ Poor' },
    { value: '2', label: '⭐⭐ Fair' },
    { value: '3', label: '⭐⭐⭐ Good' },
    { value: '4', label: '⭐⭐⭐⭐ Very Good' },
    { value: '5', label: '⭐⭐⭐⭐⭐ Excellent' },
  ],
  freeText: true,
  channel: 'product-feedback',
})
```

#### Microsoft Teams

```typescript
import { createHumanFunction } from 'human-in-the-loop'

const teamsApproval = createHumanFunction<{ requestDetails: string }, { approved: boolean }>({
  platform: 'teams',
  title: 'Approval Request',
  description: 'Please review and approve this request:',
  options: [
    { value: 'approve', label: 'Approve' },
    { value: 'reject', label: 'Reject' },
  ],
  webhookUrl: process.env.TEAMS_WEBHOOK_URL,
  useAdaptiveCards: true,
})
```

#### React

```tsx
import { createHumanFunction, ReactHumanFunction } from 'human-in-the-loop'
import React, { useState } from 'react'

// Create the human function
const reactFeedback = createHumanFunction<{ productName: string }, { rating: number; comments?: string }>({
  platform: 'react',
  title: 'Product Feedback',
  description: 'Please rate this product and provide any comments:',
  options: [
    { value: '1', label: '1 - Poor' },
    { value: '2', label: '2 - Fair' },
    { value: '3', label: '3 - Good' },
    { value: '4', label: '4 - Very Good' },
    { value: '5', label: '5 - Excellent' },
  ],
  freeText: true,
  theme: 'light',
}) as ReactHumanFunction<{ productName: string }, { rating: number; comments?: string }>

// In your React component
function FeedbackComponent() {
  const [taskId, setTaskId] = useState<string | null>(null)

  const handleRequestFeedback = async () => {
    const task = await reactFeedback.request({ productName: 'Super Product' })
    setTaskId(task.taskId)
  }

  return (
    <div>
      <button onClick={handleRequestFeedback}>Request Feedback</button>

      {taskId && reactFeedback.getComponent(taskId, { productName: 'Super Product' })}
    </div>
  )
}
```

#### Email

```typescript
import { createHumanFunction, EmailHumanFunction } from 'human-in-the-loop'
import React from 'react'
import { render } from 'react-email'

// Create the human function
const emailSurvey = createHumanFunction<{ surveyTopic: string }, { response: string }>({
  platform: 'email',
  title: 'Customer Survey',
  description: 'Please complete our customer satisfaction survey:',
  options: [
    { value: 'very-satisfied', label: 'Very Satisfied' },
    { value: 'satisfied', label: 'Satisfied' },
    { value: 'neutral', label: 'Neutral' },
    { value: 'dissatisfied', label: 'Dissatisfied' },
    { value: 'very-dissatisfied', label: 'Very Dissatisfied' },
  ],
  to: 'customer@example.com',
  from: 'surveys@company.com',
  callbackUrl: 'https://example.com/api/survey-response',
}) as EmailHumanFunction<{ surveyTopic: string }, { response: string }>

// Get the email template as HTML
const taskId = 'task-123'
const emailComponent = emailSurvey.getEmailComponent(taskId)
const emailHtml = render(emailComponent)
```

## API Reference

### `createHumanFunction<TInput, TOutput>(options)`

Creates a strongly-typed human function with the specified input and output types.

#### Options

- `platform`: The platform to use ('slack', 'teams', 'react', or 'email')
- `title`: Title of the request shown to humans
- `description`: Description of the task for humans
- `options`: Array of options for the human to choose from
- `freeText`: Whether to allow free text input
- `timeout`: Timeout in milliseconds after which the task is marked as timed out

Platform-specific options are also available based on the selected platform.

### `HumanFunction<TInput, TOutput>`

The interface for human functions.

#### Methods

- `request(input: TInput): Promise<HumanTaskRequest>`: Request human input with the given input data
- `getResponse(taskId: string): Promise<TOutput | null>`: Get the human response for a given task

## License

MIT
