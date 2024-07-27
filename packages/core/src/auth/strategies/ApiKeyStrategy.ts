import { AuthStrategy } from '../AuthStrategy';
import type { IApiKeyConfig } from '../types';

export class ApiKeyStrategy extends AuthStrategy {
  constructor(private config: IApiKeyConfig) {
    super();
  }

  async getAuthHeader(): Promise<Record<string, string>> {
    return { Authorization: `Bearer ${this.config.apiKey}` };
  }
}