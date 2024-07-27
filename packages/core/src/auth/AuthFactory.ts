import type { IAuthConfig } from './types';
import { AuthStrategy } from './AuthStrategy';
import { ApiKeyStrategy } from './strategies/ApiKeyStrategy';
import { OAuthStrategy } from './strategies/OAuthStrategy';
import { PATStrategy } from './strategies/PATStrategy';
import { HMACStrategy } from './strategies/HMACStrategy';
import { JWTStrategy } from './strategies/JWTStrategy';

export class AuthFactory {
  static createStrategy(config: IAuthConfig): AuthStrategy {
    switch (config.type) {
      case 'oauth':
        return new OAuthStrategy(config);
      case 'apiKey':
        return new ApiKeyStrategy(config);
      case 'pat':
        return new PATStrategy(config);
      case 'hmac':
        return new HMACStrategy(config);
      case 'jwt':
        return new JWTStrategy(config);
      default:
        throw new Error(`Unsupported authentication type: ${(config as IAuthConfig).type}`);
    }
  }
}
