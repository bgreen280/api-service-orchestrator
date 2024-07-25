import { OAuth2Client } from '@apiso/core';

export type AuthType = 'oauth' | 'apiKey';

export interface BaseAuthConfig {
  type: AuthType;
}

export interface OAuthConfig extends BaseAuthConfig {
  type: 'oauth';
  clientId: string;
  clientSecret: string;
  oAuth2Client: OAuth2Client;
  callbackPort: number;
  scopes: string[];
}

export interface ApiKeyConfig extends BaseAuthConfig {
  type: 'apiKey';
  apiKey: string;
}

export type AuthConfig = OAuthConfig | ApiKeyConfig;

export interface ServiceConfig {
  auth: AuthConfig;
  baseUrl: string;
}

export interface AuthStrategy {
  getAuthHeader(): Promise<Record<string, string>>;
}
