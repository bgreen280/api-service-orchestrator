import crypto from 'crypto';
import { AuthStrategy } from '../AuthStrategy';
import type { IHMACConfig } from '../types';

export class HMACStrategy extends AuthStrategy {
  constructor(private config: IHMACConfig) {
    super();
  }

  async getAuthHeader(options: {
    method: string;
    url: string;
    data?: string;
  }): Promise<Record<string, string>> {
    const timestamp = Date.now().toString();
    const message = `${options.method}\n${options.url}\n${timestamp}\n${(options.data ?? '') || ''}`;
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
