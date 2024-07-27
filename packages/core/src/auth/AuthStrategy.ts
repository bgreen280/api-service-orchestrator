export abstract class AuthStrategy {
  abstract getAuthHeader(
    options?: Record<string, any>,
  ): Promise<Record<string, string>>;
}
