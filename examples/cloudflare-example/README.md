# Next.js Platform Example - Cloudflare Deployment

This example demonstrates deploying a Next.js application to Cloudflare Pages using OpenNext.

## Features

- Deploy Next.js applications to Cloudflare's global network
- Use Cloudflare Workers for API routes and server components
- Leverage Cloudflare's edge capabilities

## Prerequisites

- Cloudflare account
- Wrangler CLI installed (`npm install -g wrangler`)

## Deployment

1. Log in to Cloudflare:
```bash
wrangler login
```

2. Deploy your application:
```bash
npm run deploy
```

## Configuration

This example includes several configuration files:

- `wrangler.jsonc`: Configuration for the Cloudflare Worker
- `open-next.config.ts`: Custom OpenNext configuration
- `cloudflare-env.d.ts`: TypeScript definitions for Cloudflare environment

The deployment process uses OpenNext, which adapts Next.js applications to run on Cloudflare Pages and Workers.

For more information, see the [OpenNext documentation for Cloudflare](https://opennext.js.org/cloudflare/get_started).
