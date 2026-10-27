const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export async function api(path, options = {}) {
  const token = localStorage.getItem('forgepc_token');
  const headers = { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(options.headers || {}) };
  let response;
  try { response = await fetch(`${BASE}${path}`, { ...options, headers }); }
  catch { throw new Error('Cannot reach the FORGEPC API. Start the backend and check VITE_API_URL.'); }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || `Request failed (${response.status}).`);
  return data;
}
