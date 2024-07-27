import { AuthStrategy } from '../auth/AuthStrategy';
import { Connector } from '../connectors/Connector';
import { AuthFactory } from '../auth/AuthFactory';
import { ConnectorFactory } from '../connectors/ConnectorFactory';
import { IAuthConfig } from '../auth/types';
import { IConnectorConfig } from '../connectors/types';

export abstract class BaseAPI {
  protected authStrategy: AuthStrategy;
  protected connector: Connector;

  constructor(authConfig: IAuthConfig, connectorConfig: IConnectorConfig) {
    this.authStrategy = AuthFactory.createStrategy(authConfig);
    this.connector = ConnectorFactory.createConnector(connectorConfig);
  }

  protected async request<T>(
    method: string,
    url: string,
    data?: unknown,
  ): Promise<T> {
    const headers = await this.authStrategy.getAuthHeader({
      method,
      url,
      data,
    });
    return this.connector.request<T>({ method, url, data, headers });
  }
}
