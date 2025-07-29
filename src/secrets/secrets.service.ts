import { Injectable } from '@nestjs/common';
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

@Injectable()
export class SecretsService {
  private client: SecretsManagerClient;

  constructor() {
    this.client = new SecretsManagerClient({
      region: 'us-east-1', // Replace with your AWS region
    });
  }

  async getSecret(secretName: string): Promise<string> {
    try {
      const command = new GetSecretValueCommand({
        SecretId: secretName,
      });
      const response = await this.client.send(command);

      if ('SecretString' in response) {
        return response.SecretString;
      } else {
        // Handle binary secrets if needed
        const buff = Buffer.from(response.SecretBinary as string, 'base64');
        return buff.toString('ascii');
      }
    } catch (error) {
      console.error('Error retrieving secret:', error);
      throw error;
    }
  }
}
