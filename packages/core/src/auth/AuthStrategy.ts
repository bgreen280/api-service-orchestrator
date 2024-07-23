import { BaseAuthConfig } from '../types';

export interface AuthStrategy {
  getAuthHeader(): Promise<Record<string, string>>;
}

export abstract class BaseAuthStrategy<T extends BaseAuthConfig> implements AuthStrategy {
  constructor(protected config: T) {} // Generic config type

  abstract getAuthHeader(): Promise<Record<string, string>>;
}
