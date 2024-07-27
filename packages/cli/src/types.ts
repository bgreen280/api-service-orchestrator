// cli/types.ts

import { IAuthConfig, IConnectorConfig } from '@apiso/core';

export interface ICliConfig {
  youtube: {
    auth: IAuthConfig;
    connector: IConnectorConfig;
  };
  raindrop: {
    auth: IAuthConfig;
    connector: IConnectorConfig;
  };
}

export interface ICommandList {
  [packageName: string]: string[];
}

export interface ICommandChoice {
  packageName: string;
  commandName: string;
}

export interface ICommand {
  (config: ICliConfig): Promise<void>;
}

export interface ICommands {
  [key: string]: ICommand;
}
