import { createLogger } from '../../logging-middleware/src';

export const Log = createLogger({
  endpoint: import.meta.env.VITE_LOG_ENDPOINT || 'http://20.244.56.144/evaluation-service/logs',
  clientId: import.meta.env.VITE_CLIENT_ID || '',
  clientSecret: import.meta.env.VITE_CLIENT_SECRET || '',
  // If the server requires different header names, set them here.
  headers: {}
});
