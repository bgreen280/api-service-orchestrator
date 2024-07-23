import { AuthStrategy, ApiKeyConfig } from '../types';

export class ApiKeyStrategy implements AuthStrategy {
  constructor(private config: ApiKeyConfig) {}

  async getAuthHeader(): Promise<Record<string, string>> {
    return { Authorization: `Bearer ${this.config.apiKey}` };
  }
}