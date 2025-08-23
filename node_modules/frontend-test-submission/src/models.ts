export interface ShortLink {
  code: string;
  longUrl: string;
  createdAt: string;   // ISO
  expiresAt: string;   // ISO
  clicks: ClickEvent[];
}

export interface ClickEvent {
  ts: string;          // ISO
  referrer?: string;
  locale?: string;     // e.g., 'en-IN'
  timezone?: string;   // e.g., 'Asia/Kolkata'
  userAgent?: string;  // optional
}

export type LinkDB = Record<string, ShortLink>;
