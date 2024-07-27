import { OAuth2Client } from 'google-auth-library';

export type IConnectorType = 'axios' | 'googleapis';

export interface IBaseConnectorConfig {
  type: IConnectorType;
}

export interface IAxiosConnectorConfig extends IBaseConnectorConfig {
  type: 'axios';
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface IGoogleapisConnectorConfig extends IBaseConnectorConfig {
  type: 'googleapis';
  auth: OAuth2Client;
}

export type IConnectorConfig = IAxiosConnectorConfig | IGoogleapisConnectorConfig;