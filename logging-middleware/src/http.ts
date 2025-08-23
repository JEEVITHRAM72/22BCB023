export async function postJSON(url: string, body: unknown, headers: Record<string,string>) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(()=>'');
    throw new Error(`Log API ${res.status}: ${text || res.statusText}`);
  }
  return res.json().catch(()=>({}));
}
