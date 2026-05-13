// Cloudflare Worker — proxy for mahir-portfolio
// Routes:
//   POST /          → Groq API proxy (GROQ_API_KEY secret)
//   GET  /spotify   → Spotify currently-playing (SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN secrets)
//   GET  /spotify/callback → one-time OAuth setup helper (open in browser to get refresh token)

const ALLOWED_ORIGINS = [
  'https://mahirnagersheth.github.io',
  'http://localhost',
  'http://127.0.0.1',
];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Spotify OAuth callback — called by Spotify redirect, no origin check needed
    if (url.pathname === '/spotify/callback') {
      return handleSpotifyCallback(request, env);
    }

    const origin = request.headers.get('Origin') || '';
    const allowed = ALLOWED_ORIGINS.some(o => origin.startsWith(o));
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

    try {
      const body = await request.json();
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
      return new Response(JSON.stringify({ error: err.message }), {
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
      const err = await tokenRes.text();
      return json({ playing: false, reason: 'token_failed', status: tokenRes.status, detail: err });
    }

    const { access_token } = await tokenRes.json();

    const nowRes = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: { 'Authorization': `Bearer ${access_token}` },
    });

    if (nowRes.status === 204) return json({ playing: false, reason: 'nothing_playing_204' });
    if (!nowRes.ok) {
      const err = await nowRes.text();
      return json({ playing: false, reason: 'api_error', status: nowRes.status, detail: err });
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
    return json({ playing: false, reason: 'exception', detail: err.message });
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
