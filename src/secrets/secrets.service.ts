import { Injectable } from '@nestjs/common';
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';

@Injectable()
export class SecretsService {
  private client: SecretsManagerClient;

  constructor() {
    this.client = new SecretsManagerClient({
      region: 'us-east-1',
    });
  }

  async getSecret(secretName: string): Promise<string> {
    try {
      const command = new GetSecretValueCommand({
        SecretId: secretName,
      });
      const response = await this.client.send(command);

      if (response.SecretString) {
        return response.SecretString;
      } else if (response.SecretBinary) {
        const buff = Buffer.from(response.SecretBinary);
        return buff.toString('utf-8'); // 혹은 'ascii', 필요에 따라 선택
      } else {
        throw new Error('SecretString and SecretBinary are both undefined');
      }
    } catch (error) {
      console.error('Error retrieving secret:', error);
      throw error;
    }
  }
}
