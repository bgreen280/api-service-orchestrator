import axios, {
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import { IAuthConfig, IAuthStrategy, IServiceConfig } from './types';
import { OAuthStrategy, ApiKeyStrategy } from './auth';

export class BaseAPI {
  protected axiosInstance: AxiosInstance;
  protected authStrategy: IAuthStrategy;

  constructor(config: IServiceConfig) {
    this.axiosInstance = axios.create({ baseURL: config.baseUrl });
    this.authStrategy = this.createAuthStrategy(config.auth);

    this.axiosInstance.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
      const authHeader = await this.authStrategy.getAuthHeader();

      // Ensure config.headers is AxiosHeaders
      if (!(config.headers instanceof AxiosHeaders)) {
        config.headers = new AxiosHeaders(config.headers);
      }

      // Add headers
      config.headers.set('Content-Type', 'application/json');
      Object.entries(authHeader).forEach(([key, value]) => {
        config.headers.set(key, value);
      });

      return config;
    });
  }

  private createAuthStrategy(authConfig: IAuthConfig): IAuthStrategy {
    switch (authConfig.type) {
      case 'oauth':
        return new OAuthStrategy(authConfig);
      case 'apiKey':
        return new ApiKeyStrategy(authConfig);
    }
  }

  protected async request<T>(method: string, url: string, data?: any): Promise<T> {
    const config: AxiosRequestConfig = { method, url, data };
    const response = await this.axiosInstance.request<T>(config);
    return response.data;
  }
}