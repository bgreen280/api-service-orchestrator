import { IBaseAuthConfig } from '../types.js';

export interface AuthStrategy {
  getAuthHeader(): Promise<Record<string, string>>;
}

export abstract class BaseAuthStrategy<T extends IBaseAuthConfig> implements AuthStrategy {
  constructor(protected config: T) {} // Generic config type

  abstract getAuthHeader(): Promise<Record<string, string>>;
}
