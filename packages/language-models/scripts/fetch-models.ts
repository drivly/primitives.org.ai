import fetch from 'node-fetch';
import camelcaseKeys from 'camelcase-keys';
import JSON5 from 'json5';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface OpenRouterModel {
  id: string;
  slug: string;
  name: string;
}

interface OpenRouterResponse {
  data: {
    models: OpenRouterModel[];
  };
}

async function fetchModels() {
  try {
    const response = await fetch('https://openrouter.ai/api/frontend/models/find');
    const data = await response.json() as Record<string, any>;
    
    const camelCasedData = camelcaseKeys(data, { deep: true }) as OpenRouterResponse;
    
    const models = camelCasedData.data.models;
    const modelSlugs = models.map((model) => model.slug);
    
    const slugs = models.map((model) => `'${model.slug}'`);
    const shortNames = models.map((model) => {
      const parts = model.slug.split('/');
      return parts.length > 1 ? `'${parts[1]}'` : null;
    }).filter(Boolean);
    
    const typeDefinition = `export type Model = ${[...slugs, ...shortNames].join(' | ')};`;
    
    const fullDir = path.join(__dirname, '../src/full');
    fs.mkdirSync(fullDir, {recursive: true});
    
    fs.writeFileSync(
      path.join(fullDir, 'index.js'),
      `export const models = ${JSON5.stringify(models, null, 2)}`
    );
    
    fs.writeFileSync(
      path.join(__dirname, '../src/index.js'),
      `export const models = ${JSON5.stringify(modelSlugs, null, 2)}`
    );
    
    fs.writeFileSync(
      path.join(__dirname, '../src/types.ts'),
      typeDefinition
    );
    
    console.log('Models generated successfully');
  } catch (error) {
    console.error('Error generating models:', error);
    process.exit(1);
  }
}

fetchModels();
