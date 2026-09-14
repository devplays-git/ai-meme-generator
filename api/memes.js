// ─────────────────────────────────────────────────────────────────────────────
//  PRODUCTION BACKEND  —  Vercel Function served at POST /api/memes.
//
//  Vercel doesn't run server/index.js (Express). Instead, every file in api/
//  becomes a serverless function. This one shares server/memes-core.js with
//  the local Express server, so dev and production behave identically.
//
//  Env vars (set in Vercel → Settings → Environment Variables):
//    OPEN_ROUTER_API_KEY  (required)
//    OPENROUTER_MODEL     (optional override)
// ─────────────────────────────────────────────────────────────────────────────
import { createMemes } from '../server/memes-core.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const memes = await createMemes(req.body?.category)
    res.status(200).json({ memes })
  } catch (err) {
    const status = err.status ?? 502
    if (status >= 500) {
      console.error('[/api/memes] failed:', err.message)
    }
    res.status(status).json({
      error: status === 400 ? err.message : 'Failed to generate memes',
    })
  }
}
