import { IJWTAuthConfig } from '../src/types';
import { BaseAuthStrategy } from './AuthStrategy';

export class JWTStrategy extends BaseAuthStrategy<IJWTAuthConfig> {
  async getAuthHeader(): Promise<Record<string, string>> {
    // You'll need to implement JWT token generation here
    const jwtToken = await this.generateJWT();
    return { Authorization: `Bearer ${jwtToken}` };
  }

  private async generateJWT(): Promise<string> {
    // ...Implementation of JWT token generation...
    throw new Error('Method not implemented.');
  }
}
