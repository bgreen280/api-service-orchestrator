import jwt from 'jsonwebtoken';
import { AuthStrategy } from '../AuthStrategy';
import type { IJWTConfig } from '../types';

// TODO: add support for 'options' in `generateJWT` - requires interface update/alignment
export class JWTStrategy extends AuthStrategy {
  constructor(private config: IJWTConfig) {
    super();
  }

  async getAuthHeader(): Promise<Record<string, string>> {
    const token = this.generateJWT();
    return { Authorization: `Bearer ${token}` };
  }

  private generateJWT(): string {
    return jwt.sign(this.config.payload, this.config.secretKey, this.config.options);
  }
}
