export type LogStack = 'frontend' | 'backend';
export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';
export type LogPackage = 'api' | 'auth' | 'config' | 'middleware' | 'utils';

export interface LogPayload {
  stack: LogStack;
  level: LogLevel;
  package: LogPackage;
  message: string;
}

export interface LoggerOptions {
  endpoint: string;           // e.g. http://20.244.56.144/evaluation-service/logs
  clientId: string;
  clientSecret: string;
  // header names are configurable to match the server's expectation
  headers?: Record<string,string>; // e.g. { 'x-client-id': '...', 'x-client-secret': '...' }
}
