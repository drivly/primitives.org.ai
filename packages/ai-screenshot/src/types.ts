import { z } from 'zod'

/**
 * Main options for the Screenshot component
 */
export interface ScreenshotOptions {
  layout: 'sidebar' | 'stacked'
  content: ContentConfig
  theme?: ThemeConfig
  exportFormat?: 'react' | 'png' | 'svg'
  onExport?: (data: string) => void
}

/**
 * Configuration for the content to display in the screenshot
 */
export interface ContentConfig {
  menus?: MenuConfig[]
  forms?: FormConfig[]
  tables?: TableConfig[]
  charts?: ChartConfig[]
  dashboards?: DashboardConfig[]
  grids?: GridConfig[]
}

/**
 * Configuration for menu items
 */
export interface MenuConfig {
  title: string
  icon?: string
  items?: MenuItem[]
  active?: boolean
}

/**
 * Individual menu item
 */
export interface MenuItem {
  title: string
  icon?: string
  href?: string
  active?: boolean
  items?: MenuItem[]
}

/**
 * Configuration for form elements
 */
export interface FormConfig {
  title: string
  fields: FormField[]
  submitLabel?: string
  cancelLabel?: string
}

/**
 * Individual form field
 */
export interface FormField {
  label: string
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'checkbox' | 'radio' | 'textarea' | 'date'
  placeholder?: string
  required?: boolean
  options?: string[] // For select, checkbox, radio
  value?: string | number | boolean
}

/**
 * Configuration for table elements
 */
export interface TableConfig {
  title: string
  columns: string[]
  rows?: any[][]
  pagination?: boolean
  search?: boolean
}

/**
 * Configuration for chart elements
 */
export interface ChartConfig {
  title: string
  type: 'bar' | 'line' | 'pie' | 'area' | 'scatter' | 'radar'
  data?: {
    labels: string[]
    datasets: {
      label: string
      data: number[]
      backgroundColor?: string | string[]
      borderColor?: string | string[]
    }[]
  }
}

/**
 * Configuration for dashboard elements
 */
export interface DashboardConfig {
  title: string
  widgets: (TableConfig | ChartConfig | FormConfig | GridConfig)[]
  layout?: 'grid' | 'flex'
}

/**
 * Configuration for grid elements
 */
export interface GridConfig {
  title: string
  columns: number
  items: GridItem[]
}

/**
 * Individual grid item
 */
export interface GridItem {
  title: string
  description?: string
  image?: string
  link?: string
}

/**
 * Theme configuration for the screenshot
 */
export interface ThemeConfig {
  colorScheme?: 'light' | 'dark'
  primaryColor?: string
  secondaryColor?: string
  fontFamily?: string
  borderRadius?: string | number
  spacing?: string | number
}

/**
 * Zod schema for ContentConfig
 */
export const contentConfigSchema = z.object({
  menus: z
    .array(
      z.object({
        title: z.string(),
        icon: z.string().optional(),
        items: z
          .array(
            z.object({
              title: z.string(),
              icon: z.string().optional(),
              href: z.string().optional(),
              active: z.boolean().optional(),
              items: z.array(z.lazy(() => z.object({ title: z.string() }))).optional(),
            })
          )
          .optional(),
        active: z.boolean().optional(),
      })
    )
    .optional(),
  forms: z
    .array(
      z.object({
        title: z.string(),
        fields: z.array(
          z.object({
            label: z.string(),
            type: z.enum(['text', 'email', 'password', 'number', 'select', 'checkbox', 'radio', 'textarea', 'date']),
            placeholder: z.string().optional(),
            required: z.boolean().optional(),
            options: z.array(z.string()).optional(),
            value: z.union([z.string(), z.number(), z.boolean()]).optional(),
          })
        ),
        submitLabel: z.string().optional(),
        cancelLabel: z.string().optional(),
      })
    )
    .optional(),
  tables: z
    .array(
      z.object({
        title: z.string(),
        columns: z.array(z.string()),
        rows: z.array(z.array(z.any())).optional(),
        pagination: z.boolean().optional(),
        search: z.boolean().optional(),
      })
    )
    .optional(),
  charts: z
    .array(
      z.object({
        title: z.string(),
        type: z.enum(['bar', 'line', 'pie', 'area', 'scatter', 'radar']),
        data: z
          .object({
            labels: z.array(z.string()),
            datasets: z.array(
              z.object({
                label: z.string(),
                data: z.array(z.number()),
                backgroundColor: z.union([z.string(), z.array(z.string())]).optional(),
                borderColor: z.union([z.string(), z.array(z.string())]).optional(),
              })
            ),
          })
          .optional(),
      })
    )
    .optional(),
  dashboards: z
    .array(
      z.object({
        title: z.string(),
        widgets: z.array(z.any()), // This is a simplification, would need recursive definition
        layout: z.enum(['grid', 'flex']).optional(),
      })
    )
    .optional(),
  grids: z
    .array(
      z.object({
        title: z.string(),
        columns: z.number(),
        items: z.array(
          z.object({
            title: z.string(),
            description: z.string().optional(),
            image: z.string().optional(),
            link: z.string().optional(),
          })
        ),
      })
    )
    .optional(),
})

/**
 * Zod schema for ScreenshotOptions
 */
export const screenshotOptionsSchema = z.object({
  layout: z.enum(['sidebar', 'stacked']),
  content: contentConfigSchema,
  theme: z
    .object({
      colorScheme: z.enum(['light', 'dark']).optional(),
      primaryColor: z.string().optional(),
      secondaryColor: z.string().optional(),
      fontFamily: z.string().optional(),
      borderRadius: z.union([z.string(), z.number()]).optional(),
      spacing: z.union([z.string(), z.number()]).optional(),
    })
    .optional(),
  exportFormat: z.enum(['react', 'png', 'svg']).optional(),
})
