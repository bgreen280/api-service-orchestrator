import { AuthStrategy } from '../AuthStrategy';
import type { IPATConfig } from '../types';

export class PATStrategy extends AuthStrategy {
  constructor(private config: IPATConfig) {
    super();
  }

  async getAuthHeader(
    _options?: Record<string, unknown>,
  ): Promise<Record<string, string>> {
    return { Authorization: `Bearer ${this.config.personalAccessToken}` };
  }
}
