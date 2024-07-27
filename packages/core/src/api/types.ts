import { IAuthConfig } from '../auth/types';
import { IConnectorConfig } from '../connectors/types';

export interface IServiceConfig {
  auth: IAuthConfig;
  connector: IConnectorConfig;
}

export { IAuthConfig, IConnectorConfig };
