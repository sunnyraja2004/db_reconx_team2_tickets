<<<<<<< HEAD
<<<<<<< HEAD
// Fetch wrapper that attaches Bearer JWT from sessionStorage.
const BASE = '/api';

function authHeaders() {
  const token = typeof sessionStorage !== 'undefined'
    ? sessionStorage.getItem('reconx-token')
    : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(method, path, body) {
  const headers = {
    'Content-Type': 'application/json',
    ...authHeaders(),
  };
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body != null ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    let detail = res.statusText;
    try {
      const payload = await res.text();
      if (payload) detail = payload;
    } catch { /* ignore parse errors */ }
    throw new Error(`HTTP ${res.status}: ${detail}`);
  }
  if (res.status === 204) return null;
  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) return null;
  return res.json();
}

export const api = {
  login: (email, password)   => request('POST',   '/auth/login', { email, password }),
  listTrades: (params = '')  => request('GET',    `/v1/trades${params ? `?${params}` : ''}`),
  createTrade: (req)         => request('POST',   '/v1/trades', req),
  updateStatus: (id, status) => request('PATCH',  `/v1/trades/${id}/status`, { status }),
  deleteTrade: (id)          => request('DELETE', `/v1/trades/${id}`),
  runRecon: (req)            => request('POST',   '/v1/recon/run', req),
  reconResults: (jobId)      => request('GET',    `/v1/recon/jobs/${jobId}/results`),
  audit: (tradeRef)          => request('GET',    `/v1/audit/trades/${tradeRef}`),
=======
// TICKET-ADV112-related — fetch wrapper that attaches Bearer JWT from sessionStorage.
=======
// Fetch wrapper that attaches Bearer JWT from sessionStorage.
>>>>>>> a48c151f (checkpoint: staged reverts + solved-file writes + WHERE-TO-PASTE updates before build verification)
const BASE = '/api';

function authHeaders() {
  const token = typeof sessionStorage !== 'undefined'
    ? sessionStorage.getItem('reconx-token')
    : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(method, path, body) {
  const headers = {
    'Content-Type': 'application/json',
    ...authHeaders(),
  };
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body != null ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    let detail = res.statusText;
    try {
      const payload = await res.text();
      if (payload) detail = payload;
    } catch { /* ignore parse errors */ }
    throw new Error(`HTTP ${res.status}: ${detail}`);
  }
  if (res.status === 204) return null;
  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) return null;
  return res.json();
}

export const api = {
<<<<<<< HEAD
  login: (email, password)   => {
    // TODO(TICKET-ADV072): POST /auth/login with { email, password }.
    throw new Error('TICKET-ADV072 not implemented');
  },
  listTrades: (params = '')  => {
    // TODO(TICKET-ADV114): GET /v1/trades + `params` query string.
    throw new Error('TICKET-ADV114 not implemented');
  },
  createTrade: (req)         => {
    // TODO(TICKET-ADV123): POST /v1/trades with the form payload.
    throw new Error('TICKET-ADV123 not implemented');
  },
  updateStatus: (id, status) => {
    // TODO(TICKET-ADV119): PATCH /v1/trades/{id}/status with { status }.
    throw new Error('TICKET-ADV119 not implemented');
  },
  deleteTrade: (id)          => {
    // TODO(TICKET-ADV119): DELETE /v1/trades/{id}.
    throw new Error('TICKET-ADV119 not implemented');
  },
  runRecon: (req)            => {
    // TODO(TICKET-ADV121): POST /v1/recon/run to enqueue a recon job.
    throw new Error('TICKET-ADV121 not implemented');
  },
  reconResults: (jobId)      => {
    // TODO(TICKET-ADV121): GET /v1/recon/jobs/{jobId}/results.
    throw new Error('TICKET-ADV121 not implemented');
  },
  audit: (tradeRef)          => {
    // TODO(TICKET-ADV121): GET /v1/audit/trades/{tradeRef}.
    throw new Error('TICKET-ADV121 not implemented');
  },
>>>>>>> c2757038 (daywise-files)
=======
  login: (email, password)   => request('POST',   '/auth/login', { email, password }),
  listTrades: (params = '')  => request('GET',    `/v1/trades${params ? `?${params}` : ''}`),
  createTrade: (req)         => request('POST',   '/v1/trades', req),
  updateStatus: (id, status) => request('PATCH',  `/v1/trades/${id}/status`, { status }),
  deleteTrade: (id)          => request('DELETE', `/v1/trades/${id}`),
  runRecon: (req)            => request('POST',   '/v1/recon/run', req),
  reconResults: (jobId)      => request('GET',    `/v1/recon/jobs/${jobId}/results`),
  audit: (tradeRef)          => request('GET',    `/v1/audit/trades/${tradeRef}`),
>>>>>>> a48c151f (checkpoint: staged reverts + solved-file writes + WHERE-TO-PASTE updates before build verification)
};
