export interface Connector {
  request<T>(config: any): Promise<T>;
}
