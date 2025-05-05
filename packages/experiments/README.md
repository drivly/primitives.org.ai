# @ai-primitives/experiments

[![npm version](https://img.shields.io/npm/v/@ai-primitives/experiments.svg)](https://www.npmjs.com/package/@ai-primitives/experiments)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A minimalistic experiment runner for AI tasks.

## Installation

```bash
npm install @ai-primitives/experiments
```

## Usage

```typescript
import { Experiment, cartesian, createRunner } from '@ai-primitives/experiments'

// Simple experiment with a single model and temperature
await Experiment('simple-test', {
  models: ['gpt-4o'],
  temperature: 0.7,
  prompt: ({ input }) => [`Summarize the following: ${input}`],
  inputs: ['This is a test document to summarize.'],
})

// Experiment with multiple parameter combinations
await Experiment('parameter-variations', {
  models: ['gpt-4o', 'gpt-4o-mini'],
  temperature: [0, 0.7],
  prompt: ({ input }) => [`Summarize the following: ${input}`],
  inputs: () => Promise.resolve(['Document 1', 'Document 2']),
})

// Creating a vitest runner for experiments
const runner = createRunner({
  outputDir: '.ai/experiments',
})
```

## Features

- Run experiments with different AI models and parameters
- Automatic parameter combinations using cartesian product
- Support for various AI tasks (tagged templates, schema, text)
- Vitest-based runner that saves results as markdown

## API

### `Experiment`

```typescript
function Experiment<T, E>(
  name: string,
  config: {
    models: string[]
    temperature: number | number[]
    seed?: number | number[]
    prompt?: ((params: { input: any }) => string[]) | string
    inputs?: (() => Promise<T[]>) | T[]
    expected?: E
    schema?: any
  }
): Promise<ExperimentResult>
```

### `cartesian`

```typescript
function cartesian<T extends Record<string, readonly any[]>>(
  spec: T
): Array<{ [K in keyof T]: T[K][number] }>
```

### `createRunner`

```typescript
function createRunner(config?: RunnerConfig): VitestConfig
```

## Dependencies

- vitest
