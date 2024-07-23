import { OAuth2Client } from 'google-auth-library';

export type AuthType = 'oauth' | 'apiKey';

export interface BaseAuthConfig {
  type: AuthType;
}

export interface OAuthConfig extends BaseAuthConfig {
  type: 'oauth';
  clientId: string;
  clientSecret: string;
  callbackPort?: number;
  oAuth2Client?: OAuth2Client;
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