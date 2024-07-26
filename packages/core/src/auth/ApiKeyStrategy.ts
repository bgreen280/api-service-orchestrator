import { IAuthStrategy, IApiKeyConfig } from '../types';

export class ApiKeyStrategy implements IAuthStrategy {
  constructor(private config: IApiKeyConfig) {}

  async getAuthHeader(): Promise<Record<string, string>> {
    return { Authorization: `Bearer ${this.config.apiKey}` };
  }
}
