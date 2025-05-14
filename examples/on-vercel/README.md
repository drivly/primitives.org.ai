# Next.js Platform Example - Vercel Deployment

This example demonstrates deploying a Next.js application to Vercel.

## Features

- Zero-config deployment on Vercel
- Automatic HTTPS and CDN
- Seamless integration with Next.js features
- Serverless functions for API routes

## Deployment

The easiest way to deploy this example is using the Vercel Platform:

1. Push your code to a GitHub repository
2. Import the project to Vercel: https://vercel.com/new
3. Vercel will automatically detect Next.js and use the optimal build settings

Alternatively, you can deploy directly from the command line:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel
```

## Configuration

This example includes a `vercel.json` file with minimal configuration since Vercel is optimized for Next.js out of the box. You can customize the deployment further by adding more options to the configuration file.

For more information, see the [Vercel documentation for Next.js](https://vercel.com/docs/frameworks/nextjs).
