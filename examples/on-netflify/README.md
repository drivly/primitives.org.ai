# Next.js Platform Example - Netlify Deployment

This example demonstrates deploying a Next.js application to Netlify using the Netlify Next Runtime v5.

## Features

- Next.js app deployment on Netlify
- Netlify Functions for API routes
- Automatic HTTPS and CDN
- Easy local development with Netlify CLI

## Prerequisites

- Netlify account
- Netlify CLI installed (`npm install -g netlify-cli`)

## Deployment

1. Link your local repository to a Netlify site:

```bash
netlify login
netlify link
```

2. Deploy to Netlify:

```bash
netlify deploy --prod
```

Alternatively, you can connect your GitHub repository to Netlify for automatic deployments.

## Local Development

To test your site with Netlify's local development environment:

```bash
npm run dev
```

## Configuration

This example includes a `netlify.toml` file with configuration options for the Netlify deployment. This example is based on the [Netlify Next.js Platform Starter](https://github.com/netlify-templates/next-platform-starter).

For more information, see the [Netlify documentation for Next.js](https://docs.netlify.com/frameworks/next-js/overview/).
