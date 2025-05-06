# services-as-software

[![npm version](https://img.shields.io/npm/v/services-as-software.svg)](https://www.npmjs.com/package/services-as-software)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A higher-order abstraction layer that enables the composition of individual services into a cohesive business entity. Built on top of the services.do SDK.

## Installation

```bash
# Using npm
npm install services-as-software

# Using yarn
yarn add services-as-software

# Using pnpm
pnpm add services-as-software
```

## Features

- **Service Abstraction**: Extend services.do SDK functionality with additional business-oriented methods
- **Business Composition**: Intuitively add/remove services to a business entity
- **Event System**: Support for event-driven workflows
- **Pricing Model Integration**: Integrate with existing pricing models (cost-based, margin-based, activity-based, outcome-based)
- **Implementation Types**: Support for services implemented as functions, workflows, or agents

## Usage

### Creating a Service

```typescript
import { Service } from 'services-as-software'

// Create a service
const contentService = Service({
  name: 'Content Generation Service',
  objective: 'Provide high-quality content generation',
  keyResults: ['Reduce content creation time by 50%'],
  pricing: {
    model: 'cost-based',
    costBase: 10,
    fixedCosts: 5,
    variableCosts: 2,
  },
  implementation: {
    type: 'function',
    id: 'content-generator-123',
  },
})
```

### Creating a Business

```typescript
import { Business } from 'services-as-software'

// Create a business that uses the service
const company = Business({
  name: 'ContentCo',
  url: 'https://content.co',
  vision: 'Fast, high-quality content for everyone',
  goals: [
    { 
      objective: 'Increase content output', 
      keyResults: ['Double monthly output', 'Maintain quality scores']
    }
  ]
})

// Add service to business
company.addService(contentService)

// Register event handlers
company.on('ContentRequest.Submitted', async (request) => {
  // Process content request
})
```

### Using Periodic Events

```typescript
// Run a task every hour
company.every('hour', async () => {
  // Perform hourly tasks
})
```

### Creating a Startup

```typescript
import { Startup } from 'services-as-software'

// Create a startup
const startup = Startup({
  name: 'InnovateCo',
  url: 'https://innovate.co',
  vision: 'Revolutionize content creation with AI',
  goals: [
    {
      objective: 'Achieve product-market fit',
      keyResults: ['Reach 100 paying customers', 'Achieve 80% retention rate']
    }
  ],
  storyBrand: {
    hero: 'Content creators',
    problem: 'Time-consuming content creation',
    guide: 'AI-powered assistant',
    plan: 'Subscribe to our service',
    success: 'More content, less time'
  },
  leanCanvas: {
    problem: 'Content creation is slow and expensive',
    solution: 'AI-powered content generation',
    uniqueValueProposition: 'Create content 10x faster'
  }
})

// Pivot strategy if needed
startup.pivotStrategy({
  vision: 'Empower businesses with AI-generated content',
  goals: [
    {
      objective: 'Focus on enterprise customers',
      keyResults: ['Sign 10 enterprise deals', 'Achieve $100k MRR']
    }
  ]
})

// Scale operations
startup.scaleOperations(2.5)
```

## API Reference

### Service

- `Service(config)`: Create a new service
- `service.register()`: Register the service with the SDK
- `service.calculatePrice(usageData)`: Calculate the price for service usage
- `service.trackProgress(progressData)`: Track progress toward key results
- `service.isObjectiveAchieved()`: Check if the service has achieved its objectives

### Business

- `Business(config)`: Create a new business
- `business.addService(service)`: Add a service to the business
- `business.removeService(serviceId)`: Remove a service from the business
- `business.getService(serviceId)`: Get a service by ID
- `business.getAllServices()`: Get all services in the business
- `business.trackBusinessProgress()`: Track business progress
- `business.on(eventName, handler)`: Register an event handler
- `business.trigger(eventName, data)`: Trigger an event
- `business.every(interval, handler)`: Register a periodic handler

### Startup

- `Startup(config)`: Create a new startup (extends Business)
- `startup.pivotStrategy(newDirection)`: Pivot the startup's strategy
- `startup.scaleOperations(factor)`: Scale the startup's operations
- `startup.addInvestor(investor)`: Add an investor to the startup
- `startup.getFundingStage()`: Get the current funding stage

## Dependencies

- services.do - Core services SDK
