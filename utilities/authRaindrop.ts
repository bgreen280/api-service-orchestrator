import path from 'path';
import dotenv from 'dotenv';
import { SERVICES } from './statics';

// config env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

type ServiceName = keyof typeof SERVICES;

/**
 * Initialize authentication for the given service.
 * @param service - The name of the service to authenticate.
 * @returns The access token for the specified service.
 * @throws {Error} If the service is not recognized or the access token is not set in the environment variables.
 */
function initAuth(service: ServiceName): string {
  if (!SERVICES[service]) {
    throw new Error(`Service "${service}" is not recognized.`);
  }
  const accessToken = process.env[SERVICES[service]];
  if (!accessToken) {
    throw new Error(
      `${SERVICES[service]} is not set in the environment variables`
    );
  }
  return accessToken;
}

const RaindropAuthModule = {
  initAuth,
};

export { initAuth, RaindropAuthModule };