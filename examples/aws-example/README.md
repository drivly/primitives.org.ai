# Next.js Platform Example - AWS Deployment (via OpenNext)

This example demonstrates deploying a Next.js application to AWS using OpenNext.

## Features

- Deploy Next.js to AWS Lambda, CloudFront, and S3
- Serverless architecture
- Infrastructure as Code using AWS CDK

## Prerequisites

- AWS account and configured AWS CLI
- Node.js 18 or later

## Deployment Options

### Option 1: Using SST (Recommended)

The easiest way to deploy to AWS is using SST:

1. Set up SST in your project:
```bash
npx sst@latest init
npm install
```

2. Deploy to AWS:
```bash
npx sst deploy
```

### Option 2: Using OpenNext directly

1. Build your Next.js app with OpenNext:
```bash
npx @opennextjs/aws@latest build
```

2. Deploy using the CDK:
```bash
cd cdk
npm install
npm run build
npm run deploy
```

## Configuration

This example includes a basic CDK stack in the `cdk` directory that can be extended to customize your AWS deployment. The CDK stack is a starting point and should be customized based on your specific requirements.

For more information, see the [OpenNext documentation for AWS](https://opennext.js.org/aws/get_started).
