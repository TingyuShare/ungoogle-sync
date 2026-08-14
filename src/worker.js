/**
 * Ungoogle Sync - Cloudflare Workers entry point
 * Serves static assets from the public directory
 */

export default {
  async fetch(request, env, ctx) {
    // Try to serve static assets first
    const url = new URL(request.url);
    
    // Handle asset requests
    const asset = await env.ASSETS.fetch(request);
    if (asset.status < 400) {
      return asset;
    }
    
    // Fallback: serve index.html for SPA routing
    return env.ASSETS.fetch('/index.html');
  }
};
