import { postJSON } from './http';
import type { LoggerOptions, LogPayload } from './types';

export function createLogger(opts: LoggerOptions) {
  const baseHeaders = {
    // Change these header keys easily if the server specifies different names
    'x-client-id': opts.clientId,
    'x-client-secret': opts.clientSecret,
    ...(opts.headers ?? {}),
  };

  return async function Log(stack: LogPayload['stack'], level: LogPayload['level'], pkg: LogPayload['package'], message: string) {
    const payload: LogPayload = { stack, level, package: pkg, message };
    return postJSON(opts.endpoint, payload, baseHeaders);
  };
}

export * from './types';
