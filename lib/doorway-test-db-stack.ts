import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { VpcInstance } from "./resources/vpc";
import { RDSDBInstance } from "./resources/database";
import * as ssm from "aws-cdk-lib/aws-ssm";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class DoorwayTestDbStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new VpcInstance(this, id).create(`${id}-vpc`);
    const db = new RDSDBInstance(this, id, props).create(`${id}-db`, vpc);
    // new cdk.CfnOutput(this, 'vpcId', {value: vpc.vpcId})
    new ssm.StringParameter(this, "/doorway/testdb/vpcId", {
      parameterName: '/doorway/testdb/vpcId'
      stringValue: vpc.vpcId,
    });
    new ssm.StringParameter(this,'/doorway/testdb/dbSecret',{
      parameterName: '/doorway/testdb/dbSecret'
      stringValue: db.secret?.secretName != null ? db.secret.secretName: 'UNDEFINED'
    })
  }
}
