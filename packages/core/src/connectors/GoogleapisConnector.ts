import { google } from 'googleapis';
import { Connector } from './Connector';
import type { IGoogleapisConnectorConfig } from './types';

export class GoogleapisConnector implements Connector {
  private client: unknown;

  constructor(config: IGoogleapisConnectorConfig) {
    this.client = google.youtube({
      version: 'v3',
      auth: config.auth,
    });
  }

  async request<T>(config: unknown): Promise<T> {
    try {
      const { data } = await this.client[config.resource][config.method](
        config.params,
      );
      return data as T;
    } catch (error) {
      throw new Error(`Googleapis error: ${(error as Error).message}`);
    }
  }
}
