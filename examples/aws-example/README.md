# Next.js Platform Example - AWS Deployment (via SST)

This example demonstrates deploying a Next.js application to AWS using SST with OpenNext.

## Features

- Deploy Next.js to AWS Lambda, CloudFront, and S3
- Serverless architecture
- Zero-configuration deployment with SST

## Prerequisites

- AWS account and configured AWS CLI
- Node.js 18 or later

## Deployment

Follow these steps to deploy your Next.js application to AWS:

1. Initialize SST in your Next.js app:
```bash
npx sst@latest init
```

2. Install dependencies:
```bash
pnpm install
```

3. Deploy to AWS:
```bash
npx sst deploy
```

## Configuration

This example includes an SST configuration file (`sst.config.ts`) that defines how your Next.js application will be deployed to AWS. SST automatically configures your application for deployment using OpenNext.

```typescript
export default $config({
  app(input) {
    return {
      name: "aws-example",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    new sst.aws.Nextjs("MyWeb");
  },
});
```

For more information, see the [SST documentation for Next.js](https://docs.sst.dev/constructs/NextjsSite).
