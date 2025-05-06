# autonomous-agents

[![npm version](https://img.shields.io/npm/v/autonomous-agents.svg)](https://www.npmjs.com/package/autonomous-agents)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A function-based Agent API for inherently autonomous agents. This package provides a simple, elegant way to create and manage autonomous agents that can perform actions, respond to events, and integrate with external services.

## Purpose

The `autonomous-agents` package embodies the definition of agents as "inherently autonomous" by providing a function-based API that:

- Simplifies agent creation and configuration
- Enables autonomous execution of actions based on triggers
- Facilitates integration with external services
- Monitors key performance indicators
- Handles errors gracefully in an autonomous context

## How It Differs from agents.do SDK

The `autonomous-agents` package represents a transition from the class-based approach used in the existing agents.do SDK to a more modern, function-based API. Key differences include:

- **Function-based API**: Uses a functional approach instead of classes, aligning with modern JavaScript/TypeScript practices
- **Simplified Configuration**: Provides a more intuitive configuration interface
- **Enhanced Autonomy**: Built with autonomy as a core principle rather than an add-on feature
- **Improved Error Handling**: Designed with robust error handling for autonomous operations
- **Performance Monitoring**: Integrated tracking of key results and performance metrics

## Installation

```bash
# Using npm
npm install autonomous-agents

# Using yarn
yarn add autonomous-agents

# Using pnpm
pnpm add autonomous-agents
```

## Usage

### Basic Usage

```typescript
import { Agent } from 'autonomous-agents'

// Create a customer support agent
const amy = Agent({
  name: 'Amy',
  url: 'https://amy.do',
  role: 'Customer Support Agent',
  objective: 'Handles customer inquiries and resolves common issues',
  keyResults: ['ticketResponseTime', 'ticketResolutionTime', 'customerSatisfaction'],
  integrations: ['chat', 'slack', 'email', 'zendesk', 'shopify'],
  triggers: ['onTicketCreated', 'onMessageReceived'],
  searches: ['FAQs', 'Tickets', 'Orders', 'Products', 'Customers'],
  actions: ['sendMessage', 'updateOrder', 'refundOrder', 'resolveTicket', 'escalateTicket'],
})
```

### Executing Actions

```typescript
// Execute an action using the 'do' proxy
const result = await amy.do('sendMessage', {
  recipient: 'customer@example.com',
  subject: 'Order Status Update',
  body: 'Your order has been shipped and will arrive in 2-3 business days.'
})

// Execute a custom operation
const customResult = await amy.execute({
  operation: 'processRefund',
  orderId: '12345',
  amount: 99.99,
  reason: 'Customer request'
})
```

### Handling Events

```typescript
// Set up an event handler for a trigger
amy.onTicketCreated(async (ticket) => {
  console.log(`New ticket created: ${ticket.id}`)
  
  // Automatically respond to the ticket
  await amy.do('sendMessage', {
    ticketId: ticket.id,
    message: 'Thank you for your inquiry. We will respond shortly.'
  })
})
```

## API Reference

### Agent(config)

Creates a new autonomous agent with the provided configuration.

**Parameters:**

- `config` (AgentConfig): The configuration for the agent

**Returns:**

- (AutonomousAgent): An autonomous agent instance

### AgentConfig

The configuration object for creating an agent.

| Property | Type | Description |
|----------|------|-------------|
| name | string | The name of the agent |
| url | string | The URL associated with the agent |
| role | string | The role or purpose of the agent |
| objective | string | The main objective or goal of the agent |
| keyResults | string[] | Key performance indicators for the agent |
| integrations | string[] | External services the agent can integrate with |
| triggers | string[] | Events that the agent can respond to |
| searches | string[] | Types of searches the agent can perform |
| actions | string[] | Actions that the agent can perform |

### AutonomousAgent

The agent instance returned by the Agent function.

| Property/Method | Type | Description |
|-----------------|------|-------------|
| config | AgentConfig | The configuration of the agent |
| execute | (input: Record<string, any>, options?: any) => Promise<any> | Executes a custom operation |
| do | Proxy | A proxy for executing actions defined in the agent's configuration |
| [triggerName] | Function | Dynamic event handlers for each trigger defined in the agent's configuration |

## Dependencies

- TypeScript: For type safety and developer experience
- No external runtime dependencies, ensuring a lightweight package

## License

MIT
