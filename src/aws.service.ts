import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IAMClient, ListAccessKeysCommand } from '@aws-sdk/client-iam';

@Injectable()
export class AwsService {
  awsIamClient: IAMClient;
  constructor(private configService: ConfigService) {
    this.awsIamClient = new IAMClient({
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  async getListAccessKeys() {
    return await this.awsIamClient.send(new ListAccessKeysCommand());
  }

}