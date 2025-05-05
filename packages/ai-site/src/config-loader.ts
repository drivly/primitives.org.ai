import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

export interface SiteConfig {
  name: string;
  description: string;
  nextConfig?: Record<string, any>;
  appDir?: string;
  aiFunctions?: Record<string, any>;
  aiProps?: Record<string, any>;
  [key: string]: any;
}

const DEFAULT_CONFIG: SiteConfig = {
  name: 'AI-Powered Site',
  description: 'Generated with ai-site'
};

/**
 * Load and validate the site configuration
 */
export async function loadSiteConfig(): Promise<SiteConfig> {
  const cwd = process.cwd();
  
  const tsConfigPath = path.join(cwd, 'site.config.ts');
  if (fs.existsSync(tsConfigPath)) {
    try {
      const configModule = await import(pathToFileURL(tsConfigPath).href);
      return validateConfig(configModule.default || configModule);
    } catch (error) {
      console.error('Error loading TypeScript config:', error);
    }
  }
  
  const jsConfigPath = path.join(cwd, 'site.config.js');
  if (fs.existsSync(jsConfigPath)) {
    try {
      const configModule = await import(pathToFileURL(jsConfigPath).href);
      return validateConfig(configModule.default || configModule);
    } catch (error) {
      console.error('Error loading JavaScript config:', error);
    }
  }
  
  console.warn('No site.config.{ts|js} found, using default configuration');
  return DEFAULT_CONFIG;
}

/**
 * Validate the configuration and apply defaults
 */
function validateConfig(config: any): SiteConfig {
  if (!config || typeof config !== 'object') {
    console.warn('Invalid configuration, using default');
    return DEFAULT_CONFIG;
  }
  
  return {
    ...DEFAULT_CONFIG,
    ...config
  };
}
