# Minimal AI Site Example

This example demonstrates the theoretical minimum configuration needed for a functioning site using the `ai-site` package.

## What's Included

This example contains only the essential files needed to create an AI site:

- `site.config.ts` - Contains basic site configuration (name and description)
- `package.json` - Defines dependencies and scripts to run the site

## How to Use This Example

1. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## How It Works

This minimal example uses the default templates embedded in the `ai-site` package. By providing just the basic configuration in `site.config.ts`, the package handles everything else automatically, including:

- Page layouts and styling
- Navigation components
- Default content structure
- Build and deployment configurations

This approach allows you to get started quickly with minimal configuration while still having the flexibility to customize your site as needed later.

## Dependencies

- [ai-site](https://www.npmjs.com/package/ai-site) - The core package that provides the site framework and default templates
