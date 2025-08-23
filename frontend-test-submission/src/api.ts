import { Log } from './logger';
import { getLink, upsertLink } from './storage';
import { genCode, minutesFromNowISO } from './utils';
import type { ShortLink } from './models';

export async function createShortLinks(items: { longUrl: string; minutes?: number; code?: string }[]) {
  await Log('frontend','info','api',`creating ${items.length} short links`);
  const results: ShortLink[] = [];

  for (const item of items) {
    let code = item.code?.trim() || genCode();
    if (getLink(code)) {
      await Log('frontend','warn','api',`shortcode collision: ${code}`);
      // resolve collision automatically
      code = genCode();
    }
    const expiresAt = minutesFromNowISO(item.minutes ?? 30);
    const link: ShortLink = {
      code, longUrl: item.longUrl, createdAt: new Date().toISOString(), expiresAt, clicks: []
    };
    upsertLink(link);
    results.push(link);
  }
  await Log('frontend','info','api','short links created');
  return results;
}
