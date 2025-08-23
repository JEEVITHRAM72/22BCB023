import type { LinkDB, ShortLink } from './models';

const KEY = 'affordmed.urlshortener.v1';

export function loadDB(): LinkDB { 
  try { 
    return JSON.parse(localStorage.getItem(KEY) || '{}'); 
  } catch { 
    return {}; 
  } 
}

export function saveDB(db: LinkDB) { 
  localStorage.setItem(KEY, JSON.stringify(db)); 
}

export function upsertLink(link: ShortLink) { 
  const db = loadDB(); 
  db[link.code] = link; 
  saveDB(db); 
}

export function getLink(code: string) { 
  return loadDB()[code]; 
}

export function allLinks(): ShortLink[] { 
  return Object.values(loadDB()); 
}
