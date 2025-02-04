import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IAMClient, ListAccessKeysCommand, ListUsersCommand, GetUserCommand } from '@aws-sdk/client-iam';

@Injectable()
export class AppService {
  awsIamClient: IAMClient;
  constructor(private configService: ConfigService) {
    this.awsIamClient = new IAMClient({
      region: "ap-northeast-2",
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  getHello(): string {
    return 'Hello World!';
  }

  async getListAccessKeys() {
    return await this.awsIamClient.send(new ListUsersCommand());
  }


}
