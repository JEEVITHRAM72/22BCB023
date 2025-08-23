import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getLink, upsertLink } from '../storage';
import { Log } from '../logger';

export default function RedirectPage() {
  const { code = '' } = useParams();

  useEffect(() => {
    const link = getLink(code);
    (async () => {
      if (!link) { 
        await Log('frontend','warn','utils', `unknown code ${code}`); 
        return; 
      }

      const now = Date.now();
      const expired = now > new Date(link.expiresAt).getTime();
      if (expired) { 
        await Log('frontend','warn','utils', `expired code ${code}`); 
        return; 
      }

      // record click
      link.clicks.push({
        ts: new Date().toISOString(),
        referrer: document.referrer || 'direct',
        locale: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        userAgent: navigator.userAgent
      });
      upsertLink(link);
      await Log('frontend','info','api', `click ${code}`);

      // redirect
      window.location.replace(link.longUrl);
    })();
  }, [code]);

  return null;
}
