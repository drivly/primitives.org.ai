# experiments

[![npm version](https://img.shields.io/npm/v/experiments.svg)](https://www.npmjs.com/package/experiments)
[![License](https://img.shields.io/npm/l/experiments.svg)](https://github.com/drivly/primitives.org.ai/blob/main/packages/experiments/LICENSE)

A minimalistic experiment framework for AI tasks with automatic parameter handling.

## Features

- Simple `Experiment` function for running AI experiments
- Support for various AI tasks with automatic parameter handling
- Parameter combination generation with `cartesian` function
- Vitest-based runner for experiments
- Markdown output for experiment results

## Installation

```bash
npm install experiments
# or
yarn add experiments
# or
pnpm add experiments
```

## Usage

### Basic Experiment

```typescript
import { Experiment } from 'experiments'

await Experiment('basic-test', {
  models: ['gpt-4o', 'gpt-4o-mini'],
  temperature: [0, 0.7],
  prompt: 'Explain quantum computing in simple terms.',
})
```

### With Parameter Combinations

```typescript
import { Experiment, cartesian } from 'experiments'

// Generate all combinations of parameters
const params = cartesian({
  model: ['gpt-4o', 'gpt-4o-mini'],
  temperature: [0, 0.7],
  maxTokens: [100, 200]
})

// Run experiment with all parameter combinations
await Experiment('parameter-combinations', {
  params,
  prompt: 'Explain quantum computing in simple terms.',
})
```

### Using the Runner

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import { createRunner } from 'experiments'

export default createRunner({
  // Custom configuration options
})
```

## API Reference

### `Experiment`

```typescript
async function Experiment<T, E>(
  name: string,
  config: {
    models: string[]
    temperature: number | number[]
    seed?: number | number[]
    prompt?: ((params: { input: any }) => string[]) | string
    inputs?: (() => Promise<T[]>) | T[]
    expected?: E
    schema?: any
    // Other parameters
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
function createRunner(config = {}): VitestConfig
```

## Dependencies

- vitest
