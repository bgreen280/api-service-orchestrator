import crypto from 'crypto';
import { AuthStrategy } from '../AuthStrategy';
import type { IHMACConfig } from '../types';

// TODO: align interface
export class HMACStrategy extends AuthStrategy {
  constructor(private config: IHMACConfig) {
    super();
  }

  async getAuthHeader(requestOptions: {
    method: string;
    url: string;
    data?: string;
  }): Promise<Record<string, string>> {
    const timestamp = Date.now().toString();
    const message = `${requestOptions.method}\n${requestOptions.url}\n${timestamp}\n${requestOptions.data || ''}`;
    const signature = crypto
      .createHmac('sha256', this.config.secretKey)
      .update(message)
      .digest('hex');

    return {
      'X-Api-Key': this.config.apiKey,
      'X-Signature': signature,
      'X-Timestamp': timestamp,
    };
  }
}
