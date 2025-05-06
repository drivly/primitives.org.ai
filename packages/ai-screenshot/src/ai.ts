import { ai } from '../../../packages/ai-functions/src/ai'
import { z } from 'zod'
import { contentConfigSchema, ContentConfig } from './types'

/**
 * Generate missing props for the screenshot content
 * @param partialConfig Partial content configuration
 * @param schema Zod schema for validation
 * @returns Complete content configuration with AI-generated values
 */
export const generateMissingProps = async (
  partialConfig: Partial<ContentConfig>,
  schema: z.ZodType = contentConfigSchema
): Promise<ContentConfig> => {
  const prompt = `
    Generate SaaS UI content based on this partial configuration:
    ${JSON.stringify(partialConfig, null, 2)}
    
    Fill in any missing required properties to create a complete, realistic SaaS application UI.
    If tables are provided without rows, generate realistic data rows.
    If charts are provided without data, generate realistic chart data.
    If menus are provided without items, generate realistic menu items.
    If forms are provided without complete fields, enhance the fields with realistic options.
    
    Return a complete JSON object that matches the ContentConfig interface.
  `

  const completedConfig = await ai`${prompt}`({ schema })

  return {
    ...completedConfig,
    ...partialConfig,
    menus: partialConfig.menus ? [...(partialConfig.menus || [])] : completedConfig.menus,
    forms: partialConfig.forms ? [...(partialConfig.forms || [])] : completedConfig.forms,
    tables: partialConfig.tables ? [...(partialConfig.tables || [])] : completedConfig.tables,
    charts: partialConfig.charts ? [...(partialConfig.charts || [])] : completedConfig.charts,
    dashboards: partialConfig.dashboards ? [...(partialConfig.dashboards || [])] : completedConfig.dashboards,
    grids: partialConfig.grids ? [...(partialConfig.grids || [])] : completedConfig.grids,
  }
}
