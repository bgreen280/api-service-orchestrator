export abstract class AuthStrategy {
  abstract getAuthHeader(): Promise<Record<string, string>>;
}
