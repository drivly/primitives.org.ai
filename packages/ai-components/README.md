# ai-components

[![npm version](https://img.shields.io/npm/v/ai-components.svg)](https://www.npmjs.com/package/ai-components)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Pre-wrapped UI components that leverage AI generation capabilities, as well as a dynamic component generator.

## Installation

```bash
npm install ai-components
# or
pnpm add ai-components
# or
yarn add ai-components
```

## Features

- 🧩 **Pre-wrapped UI Components**: Ready-to-use UI components with AI-generated content
- 🔄 **Real-time Streaming**: Stream AI-generated content for immediate feedback
- 🎨 **ShadCN UI Integration**: Beautiful UI components built with ShadCN and Tailwind CSS
- 🔌 **Dynamic Component Generation**: Generate custom UI components based on descriptions

## Usage

### Pre-wrapped Components

```tsx
import { Hero, FAQs, Pricing } from 'ai-components'

// Hero component with AI-generated content
<Hero
  model='gpt-4o'
  prompt='Generate a hero section for a SaaS product'
/>

// FAQs with custom title and count
<FAQs
  title='Common Questions'
  count={3}
  prompt='Generate FAQs about our product'
/>

// Pricing component with manual tiers
<Pricing
  tiers={[
    {
      name: 'Basic',
      price: '$9/mo',
      description: 'For individuals',
      features: ['Feature 1', 'Feature 2'],
      cta: { text: 'Get Started', link: '/signup' }
    },
    // More tiers...
  ]}
/>
```

### Dynamic Component Generator

```tsx
import { Component } from 'ai-components'

// Generate a custom component based on a description
;<Component
  description='Create a notification banner with a dismiss button'
  contextProps={{
    message: 'New feature available!',
    type: 'info',
  }}
/>
```

## Available Components

| Component      | Description                                        |
| -------------- | -------------------------------------------------- |
| `Hero`         | Hero section with title, subtitle, and CTA         |
| `FAQs`         | Frequently asked questions with expandable answers |
| `Pricing`      | Pricing tables with multiple tiers                 |
| `Features`     | Feature list/grid with icons and descriptions      |
| `Testimonials` | Customer testimonials with avatars                 |
| `CTA`          | Call-to-action section with buttons                |
| `Component`    | Dynamic component generator based on descriptions  |

## Dependencies

- [ai-props](https://www.npmjs.com/package/ai-props)
- [next-mdx-remote](https://www.npmjs.com/package/next-mdx-remote)
- [class-variance-authority](https://www.npmjs.com/package/class-variance-authority)
- [clsx](https://www.npmjs.com/package/clsx)
- [tailwind-merge](https://www.npmjs.com/package/tailwind-merge)
