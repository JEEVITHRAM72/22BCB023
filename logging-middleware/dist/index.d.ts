import type { LoggerOptions, LogPayload } from './types';
export declare function createLogger(opts: LoggerOptions): (stack: LogPayload["stack"], level: LogPayload["level"], pkg: LogPayload["package"], message: string) => Promise<any>;
export * from './types';
