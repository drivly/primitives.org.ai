import { buildConfig } from 'payload'
import { collections } from './collections/index'
import { defaultConfig } from './config'

/**
 * Creates a configured Payload CMS instance for AI primitives
 * @param options - Custom configuration options to merge with defaults
 */
export function createAdminConfig(options = {}) {
  return buildConfig({
    ...defaultConfig,
    collections,
    ...options,
  })
}

export * from './collections/index'
export * from './admin/index'
export * from './config'
