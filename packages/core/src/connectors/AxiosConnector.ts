import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Connector } from './Connector';
import type { IAxiosConnectorConfig } from './types';

export class AxiosConnector implements Connector {
  private axiosInstance: AxiosInstance;

  constructor(config: IAxiosConnectorConfig) {
    this.axiosInstance = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout,
      headers: config.headers,
    });
  }

  async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.request<T>(config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Axios error: ${error.message}`);
      }
      throw error;
    }
  }
}
