import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { VpcInstance } from './resources/vpc';
import { RDSDBInstance } from './resources/database';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class DoorwayTestDbStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new VpcInstance(this, id).create(`${id}-vpc`);
    const db = new RDSDBInstance(this, id, props).create(`${id}-db`, vpc);
    new cdk.CfnOutput(this,'dbSecret',{value: db.secret?.secretName != null? db.secret.secretName:"",exportName:'dbSecret'})
    new cdk.CfnOutput(this, 'privateSubnets', { value: vpc.privateSubnets.map(subnet => subnet.subnetId).flat().toString(), exportName: 'privateSubnets' })
    new cdk.CfnOutput(this,'vpcId',{value: vpc.vpcId})

  }

}
