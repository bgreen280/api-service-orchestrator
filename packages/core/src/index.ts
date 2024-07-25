export { google, youtube_v3 } from 'googleapis';
export { OAuth2Client } from 'google-auth-library';
export { BaseClient } from './BaseClient';
export { OAuthStrategy } from './auth/OAuthStrategy';
export { ApiKeyStrategy } from './auth/ApiKeyStrategy';
export { ServiceError, AuthenticationError, ConfigurationError } from './errors';
export * from './types';
