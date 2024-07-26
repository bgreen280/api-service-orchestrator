import { OAuth2Client } from 'google-auth-library';

export type IAuthType = 'oauth' | 'apiKey';

export interface IBaseAuthConfig {
  type: IAuthType;
}

export interface IOAuthConfig extends IBaseAuthConfig {
  type: 'oauth';
  clientId: string;
  clientSecret: string;
  oAuth2Client: OAuth2Client;
  callbackPort: number;
  scopes: string[];
}

export interface IApiKeyConfig extends IBaseAuthConfig {
  type: 'apiKey';
  apiKey: string;
}

export type IAuthConfig = IOAuthConfig | IApiKeyConfig;

export interface IServiceConfig {
  auth: IAuthConfig;
  baseUrl: string;
}

export interface IAuthStrategy {
  getAuthHeader(): Promise<Record<string, string>>;
}
