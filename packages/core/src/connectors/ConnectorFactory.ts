import { Connector } from './Connector';
import { AxiosConnector } from './AxiosConnector';
import { GoogleapisConnector } from './GoogleapisConnector';
import type { IConnectorConfig } from './types';

export class ConnectorFactory {
  static createConnector(config: IConnectorConfig): Connector {
    switch (config.type) {
      case 'axios':
        return new AxiosConnector(config);
      case 'googleapis':
        return new GoogleapisConnector(config);
      default:
        throw new Error(`Unsupported connector type`);
    }
  }
}
