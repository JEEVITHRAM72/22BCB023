"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postJSON = postJSON;
async function postJSON(url, body, headers) {
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(body),
    });
    if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`Log API ${res.status}: ${text || res.statusText}`);
    }
    return res.json().catch(() => ({}));
}
