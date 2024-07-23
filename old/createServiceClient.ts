import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ENDPOINTS } from '../../../utilities/statics';
import { AuthProvider, createAuthProvider } from '@your-project/auth';

type ServiceName = keyof typeof ENDPOINTS;
type HttpMethod = 'get' | 'post' | 'put' | 'delete';

class ServiceClient {
  private axiosInstance: AxiosInstance;
  private service: ServiceName;
  private authProvider: AuthProvider;

  constructor(service: ServiceName) {
    this.service = service;
    this.authProvider = createAuthProvider(service);
    this.axiosInstance = axios.create();
  }

  private async createConfig(): Promise<AxiosRequestConfig> {
    const accessToken = await this.authProvider.getAccessToken();
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
      const config = await this.createConfig();
      const url = this.createUrl(endpoint, id);
      const response: AxiosResponse = 
        method === 'put' || method === 'post'
          ? await this.axiosInstance[method](url, params, config)
          : await this.axiosInstance[method](url, config);

      return response.data;
    } catch (error) {
      this.handleRequestError(error);
      throw error;
    }
  }
}

function createServiceClient(service: ServiceName): ServiceClient {
  return new ServiceClient(service);
}

export { createServiceClient, ServiceClient };


