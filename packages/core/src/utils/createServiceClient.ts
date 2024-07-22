import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ENDPOINTS } from '../../../utilities/statics';
import { initAuth } from './authRaindrop';

type ServiceName = keyof typeof ENDPOINTS;
type HttpMethod = 'get' | 'post' | 'put' | 'delete';

class ServiceClient {
  private axiosInstance: AxiosInstance;
  private service: ServiceName;

  constructor(service: ServiceName, accessToken: string) {
    this.service = service;
    this.axiosInstance = axios.create(this.createConfig(accessToken));
  }

  private createConfig(accessToken: string): AxiosRequestConfig {
    return {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    };
  }

  private createUrl(endpoint: string, id: string | null): string {
    return ENDPOINTS[this.service][endpoint](id);
  }

  private handleRequestError(error: unknown): void {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Error response from server:', error.response.data);
      console.error('Status code:', error.response.status);
      if (error.response.data?.error?.errors) {
        console.error('Errors:', error.response.data.error.errors);
      }
    } else if (axios.isAxiosError(error) && error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up the request:', (error as Error).message);
    }
  }

  async sendRequest(
    method: HttpMethod,
    endpoint: string,
    id: string | null = null,
    params: Record<string, unknown> | null = null
  ): Promise<unknown> {
    try {
      const url = this.createUrl(endpoint, id);
      const response: AxiosResponse = 
        method === 'put' || method === 'post'
          ? await this.axiosInstance[method](url, params)
          : await this.axiosInstance[method](url);

      return response.data;
    } catch (error) {
      this.handleRequestError(error);
      throw error;
    }
  }
}

function createServiceClient(service: ServiceName): ServiceClient {
  const accessToken = initAuth(service);
  return new ServiceClient(service, accessToken);
}

export { createServiceClient, ServiceClient };