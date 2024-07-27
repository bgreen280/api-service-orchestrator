import { OAuth2Client } from 'google-auth-library';

export type IOAuth2Client = OAuth2Client

export type AuthType = 'oauth' | 'apiKey' | 'pat' | 'hmac' | 'jwt';

export interface IBaseAuthConfig {
  type: AuthType;
}

export interface IOAuthConfig extends IBaseAuthConfig {
  type: 'oauth';
  clientId: string;
  clientSecret: string;
  oAuth2Client: IOAuth2Client;
  callbackPort: number;
  scopes: string[];
  redirectUri: string;
}

export interface IApiKeyConfig extends IBaseAuthConfig {
  type: 'apiKey';
  apiKey: string;
}

export interface IPATConfig extends IBaseAuthConfig {
  type: 'pat';
  personalAccessToken: string;
}

export interface IHMACConfig extends IBaseAuthConfig {
  type: 'hmac';
  apiKey: string;
  secretKey: string;
}

export interface IJWTConfig extends IBaseAuthConfig {
  type: 'jwt';
  secretKey: string;
  payload: Record<string, unknown>;
  options?: {
    expiresIn?: string | number;
    algorithm?: string;
  };
}

export type IAuthConfig = IOAuthConfig | IApiKeyConfig | IPATConfig | IHMACConfig | IJWTConfig;
