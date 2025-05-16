# AI Examples

[![npm version](https://badge.fury.io/js/ai-examples.svg)](https://badge.fury.io/js/ai-examples)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Examples showcasing the capabilities of the AI primitives platform.

## Ideas Example

The `ideas` example demonstrates how to loop through entity types in our database to generate AI product/service ideas and process them through a business development pipeline.

### Purpose

This example shows how to:

- Fetch and list different entity types (Nouns, Things, Verbs) from the database
- Use these entities to identify new AI product/service ideas
- Process these ideas through a workflow similar to the 24 steps of Disciplined Entrepreneurship
- Extend ideas into product definitions with StoryBrand messaging
- Generate landing pages with waitlist signup functionality

### Usage

```typescript
import { listEntityTypes, ideateFromEntities, runIdeaGeneration } from 'ai-examples'

// Fetch entity types from the database
const entities = await listEntityTypes()
console.log('Entity types:', entities)

// Generate ideas from entities
const { ideas } = await ideateFromEntities.generateIdeas({ entities })
console.log('Generated ideas:', ideas)

// Develop an idea through the business process
const developedIdea = await ideateFromEntities.developIdea({ idea: ideas[0] })
console.log('Developed idea:', developedIdea)

// Generate a landing page for the developed idea
const landingPage = await ideateFromEntities.generateLandingPage({ developedIdea })
console.log('Landing page:', landingPage)

// Or run the entire process at once
const allDevelopedIdeas = await runIdeaGeneration()
console.log('All developed ideas:', allDevelopedIdeas)
```

### Disciplined Entrepreneurship Integration

This example implements a simplified version of the 24 steps of Disciplined Entrepreneurship:

1. Market Segmentation - Identifying target markets for the idea
2. Select a Beachhead Market - Focusing on a specific initial market
3. Build an End User Profile - Understanding the target customer
4. Calculate the Total Addressable Market Size - Estimating market potential
5. Profile the Persona - Defining customer characteristics
6. Full Lifecycle Use Case - Mapping the customer journey
7. High-Level Product Specification - Defining the product features
8. Quantify the Value Proposition - Defining the product benefits
9. Identify Next 10 Customers - Planning market expansion
10. Define the Core - Identifying the product's key differentiators

The process continues through business model development, go-to-market strategy, and scaling plans.

### StoryBrand Messaging Integration

The example leverages the StoryBrand framework to create compelling messaging:

1. A Character (the customer) has a problem
2. Meets a Guide (your product) who understands their pain
3. The Guide gives them a plan
4. And calls them to action
5. That helps them avoid failure
6. And ends in success

This narrative structure is used to generate persuasive marketing messages for the product landing pages.

### Landing Page Generation

The example generates landing pages with:

- Compelling headlines and descriptions
- Feature and benefit listings
- Call-to-action buttons
- Waitlist signup functionality

The landing pages use the LandingPage component from the ai-waitlist package to create a visually appealing presentation of the idea with built-in waitlist functionality.

## Dependencies

- [ai-database](https://www.npmjs.com/package/ai-database)
- [ai-functions](https://www.npmjs.com/package/ai-functions)
- [ai-business](https://www.npmjs.com/package/ai-business)
- [ai-waitlist](https://www.npmjs.com/package/ai-waitlist)
- [ai-workflows](https://www.npmjs.com/package/ai-workflows)
