export const isValidUrl = (s: string) => {
  try { 
    const u = new URL(s); 
    return ['http:', 'https:'].includes(u.protocol); 
  } catch { 
    return false; 
  } 
};

export const isValidCode = (s: string) => /^[a-zA-Z0-9_-]{3,20}$/.test(s);

export const minutesFromNowISO = (m: number) => new Date(Date.now() + m*60_000).toISOString();

export const genCode = () => Math.random().toString(36).slice(2,8);
