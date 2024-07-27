import jwt from 'jsonwebtoken';
import { AuthStrategy } from '../AuthStrategy';
import type { IJWTConfig } from '../types';

export class JWTStrategy extends AuthStrategy {
  constructor(private config: IJWTConfig) {
    super();
  }

  async getAuthHeader(
    options?: Record<string, unknown>,
  ): Promise<Record<string, string>> {
    const token = this.generateJWT(options);
    return { Authorization: `Bearer ${token}` };
  }

  private generateJWT(options?: Record<string, unknown>): string {
    return jwt.sign(
      { ...this.config.payload, ...options },
      this.config.secretKey,
      this.config.options,
    );
  }
}
