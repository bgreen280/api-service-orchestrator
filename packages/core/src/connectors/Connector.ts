export interface Connector {
  request<T>(config: unknown): Promise<T>;
}
