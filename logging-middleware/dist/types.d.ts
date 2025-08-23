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
    endpoint: string;
    clientId: string;
    clientSecret: string;
    headers?: Record<string, string>;
}
