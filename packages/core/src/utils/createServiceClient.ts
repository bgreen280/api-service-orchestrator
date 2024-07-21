import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { initAuth } from './authRaindrop';
import { ENDPOINTS } from '../../../utilities/statics';

type ServiceName = keyof typeof ENDPOINTS;
type HttpMethod = 'get' | 'post' | 'put' | 'delete';

interface ServiceClient {
  sendRequest: (
    method: HttpMethod,
    endpoint: string,
    id?: string | null,
    params?: Record<string, unknown> | null
  ) => Promise<unknown>;
}

/**
 * Factory function to create a service client.
 *
 * @param service - The name of the service.
 * @returns An object containing the methods for the service.
 */
function createServiceClient(service: ServiceName): ServiceClient {
  const accessToken = initAuth(service);
  const config = createConfig(accessToken);

  /**
   * Send a request to the specified endpoint of the service.
   *
   * @param method - The HTTP method (get, post, put, delete).
   * @param endpoint - The endpoint to send the request to.
   * @param id - The ID for the endpoint, if applicable.
   * @param params - The parameters to include in the request body, if applicable.
   * @returns The response data from the request.
   */
  async function sendRequest(
    method: HttpMethod,
    endpoint: string,
    id: string | null = null,
    params: Record<string, unknown> | null = null
  ): Promise<unknown> {
    try {
      const url = createUrl(service, endpoint, id);
      const response: AxiosResponse = 
        method === 'put' || method === 'post'
          ? await axios[method](url, params, config)
          : await axios[method](url, config);

      return response.data;
    } catch (error) {
      handleRequestError(error);
      throw error;
    }
  }

  return {
    sendRequest,
  };
}

/**
 * Create the configuration object for the axios request.
 *
 * @param accessToken - The access token for authorization.
 * @returns The configuration object for axios.
 */
function createConfig(accessToken: string): AxiosRequestConfig {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  };
}

/**
 * Create the URL for the axios request.
 *
 * @param service - The name of the service.
 * @param endpoint - The endpoint to send the request to.
 * @param id - The ID for the endpoint, if applicable.
 * @returns The complete URL for the request.
 */
function createUrl(service: ServiceName, endpoint: string, id: string | null): string {
  return ENDPOINTS[service][endpoint](id);
}

/**
 * Handle errors that occur during an axios request.
 *
 * @param error - The error object from the request.
 */
function handleRequestError(error: unknown): void {
  if (axios.isAxiosError(error) && error.response) {
    console.error('Error response from server:', error.response.data);
    console.error('Status code:', error.response.status);
    if (error.response.data && error.response.data.error && error.response.data.error.errors) {
      console.error('Errors:', error.response.data.error.errors);
    }
  } else if (axios.isAxiosError(error) && error.request) {
    console.error('No response received:', error.request);
  } else {
    console.error('Error setting up the request:', (error as Error).message);
  }
}

export { createServiceClient };