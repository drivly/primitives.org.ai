# Blog Post Generation Experiments

This directory contains experiment runners for generating blog post titles and content using different AI models, prompt variations, and temperature settings.

## Overview

The experiment runners leverage the `ai-experiments` framework to test different combinations of:
- AI models
- Temperature settings
- Prompt variations

Results are saved as markdown files with YAML frontmatter containing experiment metadata.

## Usage

### Blog Title Generation

```typescript
import { runBlogTitlesExperiment } from 'experiments'

// Run experiment for a specific topic
const results = await runBlogTitlesExperiment('artificial intelligence', './output')
```

### Blog Content Generation

```typescript
import { runBlogContentExperiment } from 'experiments'

// Run experiment for a specific blog post
const results = await runBlogContentExperiment(
  'The Future of AI', 
  'Exploring how AI will transform industries over the next decade',
  'Technology',
  './output'
)
```

## Output Format

Experiment results are saved as markdown files with the following naming convention:
```
${experiment.name}-${model}-${temperature}.md
```

Each file contains YAML frontmatter with experiment metadata:
```yaml
---
model: gpt-4o
temperature: 0.7
timestamp: 2025-05-06T18:53:34.000Z
timeTaken: 2500
topic: artificial intelligence
---

Generated content here...
```

## Utilities

- `storage.ts` - Utilities for saving experiment results to markdown files
- `model-utils.ts` - Utilities for retrieving available AI models
