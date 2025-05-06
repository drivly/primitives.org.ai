# ai-screenshot

[![npm version](https://img.shields.io/npm/v/ai-screenshot.svg)](https://www.npmjs.com/package/ai-screenshot)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Generate React components or PNG/SVG images of SaaS app screenshots with AI-powered content generation.

## Features

- Generate React components, PNG images, or SVG images
- Support for sidebar and stacked layouts
- Various content types (forms, tables, grids, charts, dashboards)
- TypeScript interfaces for configuration
- AI-powered content generation for missing properties

## Installation

```bash
npm install ai-screenshot
# or
yarn add ai-screenshot
# or
pnpm add ai-screenshot
```

## Usage

### Basic Example

```tsx
import { Screenshot } from 'ai-screenshot'

function App() {
  return (
    <Screenshot
      layout='sidebar'
      content={{
        menus: [
          { title: 'Dashboard', icon: 'home' },
          { title: 'Analytics', icon: 'chart' },
          { title: 'Settings', icon: 'gear' }
        ],
        tables: [
          {
            title: 'Recent Orders',
            columns: ['Order ID', 'Customer', 'Status', 'Amount'],
            // Rows will be AI-generated if not provided
          }
        ]
      }}
    />
  )
}
```

### Export as Image

```tsx
import { Screenshot } from 'ai-screenshot'

function App() {
  return (
    <Screenshot
      layout='stacked'
      content={{
        forms: [
          {
            title: 'User Registration',
            fields: [
              { label: 'Name', type: 'text' },
              { label: 'Email', type: 'email' }
            ]
          }
        ]
      }}
      exportFormat='png'
      onExport={(dataUrl) => {
        // Handle the exported image data URL
        console.log(dataUrl)
      }}
    />
  )
}
```

## API Reference

### `<Screenshot>` Component

The main component for generating screenshots.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `layout` | `'sidebar' \| 'stacked'` | Layout type for the screenshot |
| `content` | `ContentConfig` | Configuration for the content to display |
| `theme` | `ThemeConfig` | Optional theme configuration |
| `exportFormat` | `'react' \| 'png' \| 'svg'` | Format to export the screenshot |
| `onExport` | `(data: string) => void` | Callback when export is complete |

### Types

```typescript
interface ScreenshotOptions {
  layout: 'sidebar' | 'stacked'
  content: ContentConfig
  theme?: ThemeConfig
  exportFormat?: 'react' | 'png' | 'svg'
  onExport?: (data: string) => void
}

interface ContentConfig {
  menus?: MenuConfig[]
  forms?: FormConfig[]
  tables?: TableConfig[]
  charts?: ChartConfig[]
  dashboards?: DashboardConfig[]
}

interface MenuConfig {
  title: string
  icon?: string
  items?: MenuItem[]
}

interface FormConfig {
  title: string
  fields: FormField[]
}

interface TableConfig {
  title: string
  columns: string[]
  rows?: any[][]
}

interface ChartConfig {
  title: string
  type: 'bar' | 'line' | 'pie' | 'area'
  data?: any
}

interface DashboardConfig {
  title: string
  widgets: (TableConfig | ChartConfig | FormConfig)[]
}
```

## Dependencies

- ai-functions
- ai-providers
- html-to-image (for PNG/SVG export)
- react
- zod (for schema validation)
