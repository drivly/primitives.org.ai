# ai-waitlist

[![npm version](https://img.shields.io/npm/v/ai-waitlist.svg)](https://www.npmjs.com/package/ai-waitlist)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

AI-powered landing page generator with authentication and onboarding flow.

## Features

- Generate an AI-powered landing page using content from a project's README and the `.ai` folder
- Implement authentication using oauth.do
- Create an onboarding flow with questions to identify product-solution fit

## Installation

```bash
npm install ai-waitlist
```

## Usage

### CLI

```bash
npx ai-waitlist
```

This will:
1. Parse your project's README.md and .ai folder
2. Generate an AI-powered landing page
3. Set up authentication using oauth.do
4. Create an onboarding flow questionnaire

### API

```typescript
import { generateLandingPage } from 'ai-waitlist'

// Generate a landing page
const landingPage = await generateLandingPage({
  projectDir: process.cwd(),
  options: {
    theme: 'light',
    primaryColor: '#0070f3'
  }
})
```

## Configuration

### .ai Folder Structure

You can customize the landing page by creating a `.ai` folder in your project root with the following files:

- `features.md` - List of features (one per line, starting with - or *)
- `benefits.md` - List of benefits (one per line, starting with - or *)
- `cta.md` - Call to action text
- `questions.md` - Onboarding questions (one per line, starting with - or *)

### Custom Themes

You can customize the theme by passing options to the `generateLandingPage` function:

```typescript
const landingPage = await generateLandingPage({
  projectDir: process.cwd(),
  options: {
    theme: 'dark',
    primaryColor: '#6366f1',
    secondaryColor: '#8b5cf6'
  }
})
```

## Dependencies

- [ai-props](https://github.com/drivly/primitives.org.ai/tree/main/packages/ai-props) - AI-powered props for React components
- [better-auth](https://github.com/drivly/oauth.do) - Authentication library from oauth.do
- [mdxe](https://github.com/drivly/mdx) - Zero-Config Executable MDX
