import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as path from 'path';

export class NextOnAWSStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    
    new cdk.CfnOutput(this, 'Instructions', {
      value: 'See the README.md for instructions on how to deploy using OpenNext with SST or other CDK constructs'
    });
  }
}

const app = new cdk.App();
new NextOnAWSStack(app, 'NextOnAWSStack');
