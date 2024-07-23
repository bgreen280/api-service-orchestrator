export class ServiceError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'ServiceError';
  }
}

export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export class ConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigurationError';
  }
}