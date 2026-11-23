// Cloudflare Worker — proxy for mahir-portfolio
// Routes:
//   POST /          → Groq API proxy (GROQ_API_KEY secret)
//   GET  /spotify   → Spotify currently-playing (SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN secrets)
//   GET  /spotify/callback → one-time OAuth setup helper (open in browser to get refresh token)

const ALLOWED_ORIGINS = ['https://mahirnagersheth.github.io'];
const LOCAL_HOSTS = ['localhost', '127.0.0.1'];

// The chat proxy only ever runs this one small model with a capped budget,
// whatever the client sends — so a leaked/abused endpoint can't burn the
// Groq key on big models or long generations.
const CHAT_MODEL = 'llama-3.1-8b-instant';
const MAX_TOKENS = 300;
const MAX_MESSAGES = 4;          // system + a short exchange
const MAX_SYSTEM_CHARS = 4000;
const MAX_USER_CHARS = 500;

// Exact origin match (a prefix check would also accept
// https://mahirnagersheth.github.io.evil.com). Any port on localhost is
// allowed for local previews.
function isAllowedOrigin(origin) {
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  try {
    const u = new URL(origin);
    return u.protocol === 'http:' && LOCAL_HOSTS.includes(u.hostname);
  } catch (_) {
    return false;
  }
}

function sanitizeChatBody(body) {
  const msgs = Array.isArray(body?.messages) ? body.messages : null;
  if (!msgs || !msgs.length || msgs.length > MAX_MESSAGES) return null;
  const clean = [];
  for (const m of msgs) {
    if (!m || typeof m.content !== 'string') return null;
    if (m.role === 'system') {
      if (m.content.length > MAX_SYSTEM_CHARS) return null;
    } else if (m.role === 'user' || m.role === 'assistant') {
      if (m.content.length > MAX_USER_CHARS) return null;
    } else {
      return null;
    }
    clean.push({ role: m.role, content: m.content });
  }
  const temp = Number(body.temperature);
  return {
    model: CHAT_MODEL,
    messages: clean,
    max_tokens: Math.min(MAX_TOKENS, Math.max(1, Number(body.max_tokens) || MAX_TOKENS)),
    temperature: Number.isFinite(temp) ? Math.min(1, Math.max(0, temp)) : 0.7,
  };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Spotify OAuth callback — called by Spotify redirect, no origin check needed
    if (url.pathname === '/spotify/callback') {
      return handleSpotifyCallback(request, env);
    }

    const origin = request.headers.get('Origin') || '';
    const allowed = isAllowedOrigin(origin);
    const corsHeaders = {
      'Access-Control-Allow-Origin': allowed ? origin : ALLOWED_ORIGINS[0],
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
    if (!allowed) return new Response('Forbidden', { status: 403, headers: corsHeaders });

    // GET /spotify → currently playing
    if (url.pathname === '/spotify' && request.method === 'GET') {
      return handleSpotify(env, corsHeaders);
    }

    // POST / → Groq proxy
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: corsHeaders });
    }

    if (url.pathname !== '/') {
      return new Response('Not found', { status: 404, headers: corsHeaders });
    }

    try {
      const body = sanitizeChatBody(await request.json().catch(() => null));
      if (!body) {
        return new Response(JSON.stringify({ error: 'invalid_request' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.GROQ_API_KEY}`,
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      return new Response(JSON.stringify(data), {
        status: res.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: 'upstream_error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  },
};

async function handleSpotify(env, corsHeaders) {
  const json = s => new Response(JSON.stringify(s), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  if (!env.SPOTIFY_CLIENT_ID || !env.SPOTIFY_REFRESH_TOKEN) return json({ playing: false, reason: 'no_secrets' });

  try {
    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`),
      },
      body: `grant_type=refresh_token&refresh_token=${encodeURIComponent(env.SPOTIFY_REFRESH_TOKEN)}`,
    });
    if (!tokenRes.ok) {
      return json({ playing: false, reason: 'token_failed', status: tokenRes.status });
    }

    const { access_token } = await tokenRes.json();

    const nowRes = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: { 'Authorization': `Bearer ${access_token}` },
    });

    if (nowRes.status === 204) return json({ playing: false, reason: 'nothing_playing_204' });
    if (!nowRes.ok) {
      return json({ playing: false, reason: 'api_error', status: nowRes.status });
    }

    const d = await nowRes.json();
    if (!d.item) return json({ playing: false, reason: 'no_item' });

    return json({
      playing: d.is_playing,
      track:   d.item.name,
      artist:  d.item.artists?.map(a => a.name).join(', '),
      album:   d.item.album?.name,
      albumArt: d.item.album?.images?.[1]?.url,
      url:     d.item.external_urls?.spotify,
    });
  } catch (err) {
    return json({ playing: false, reason: 'exception' });
  }
}

async function handleSpotifyCallback(request, env) {
  const txt = (s, status = 200) => new Response(s, { status, headers: { 'Content-Type': 'text/plain' } });
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');

  if (error) return txt(`Spotify auth error: ${error}`, 400);
  if (!code)  return txt('No authorization code in URL', 400);

  const REDIRECT_URI = 'https://mahir-portfolio-proxy.mnagersh.workers.dev/spotify/callback';

  try {
    const res = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`),
      },
      body: `grant_type=authorization_code&code=${encodeURIComponent(code)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`,
    });
    const data = await res.json();
    if (!data.refresh_token) return txt(`Token exchange failed:\n${JSON.stringify(data, null, 2)}`, 400);

    return txt(`✅ Spotify connected!\n\nRefresh token:\n${data.refresh_token}\n\nAdd this as SPOTIFY_REFRESH_TOKEN in Cloudflare Worker Secrets, then close this tab.`);
  } catch (err) {
    return txt(`Error: ${err.message}`, 500);
  }
}
