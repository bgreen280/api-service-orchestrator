export abstract class AuthStrategy {
  abstract getAuthHeader(
    options?: Record<string, unknown>,
  ): Promise<Record<string, string>>;
}
