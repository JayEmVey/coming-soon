# CDN Switching - Quick Start

## One-Line Commands

### Default Build (Cloudflare - Fastest)
```bash
npm run build
```

### Build with jsDelivr
```bash
npm run build:cdn-jsdelivr
```

### Build with GitHub Fallback
```bash
npm run build:cdn-github
```

## What's New

**Files Created:**
- `cdn-config.json` - CDN configuration reference file (updated on each build)
- `build-cdn.js` - New build system with CDN selection
- `js/cdn-resolver.js` - Runtime CDN resolution library
- `CDN-SWITCHING.md` - Complete documentation
- `CDN-QUICK-START.md` - This file

**Files Modified:**
- `package.json` - Added `build:cdn-jsdelivr` and `build:cdn-github` scripts

## How It Works

1. **Build Phase**: Run `npm run build` (or specific CDN variant)
2. **Injection**: Build script injects CDN loader into HTML files
3. **Runtime**: Browser uses injected config to load assets from selected CDN
4. **Fallback**: If primary CDN fails, automatically tries secondary CDNs
5. **Cache**: Successful resolutions cached in localStorage for performance

## Configuration Files

### `cdn-config.json`
Reference file showing current CDN setup:
```json
{
  "default": "cloudflare",
  "cdns": { ... },
  "timeout": 5000,
  "retryAttempts": 2
}
```
Updated automatically after each build.

## Usage Examples

### Browser Console

```javascript
// Check current active CDN
console.log('Active CDN:', window.CDN_CONFIG.primaryCdn);

// Get CDN URL for an asset
const cssUrl = window.getCdnUrl('/css/style-gate7.css');
console.log(cssUrl);
// Output: https://cdn.jsdelivr.net/gh/JayEmVey/coming-soon@latest/css/style-gate7.css

// View performance statistics
window.cdnResolver.logStats();

// Clear cache if needed
window.cdnResolver.clearCache();
```

## Available CDNs

| CDN | URL | Best For |
|-----|-----|----------|
| **Cloudflare** | `cdn.jsdelivr.net` | Global performance (default) |
| **jsDelivr** | `cdn.jsdelivr.net` | Alternative routing |
| **GitHub** | `raw.githubusercontent.com` | Fallback/testing |

## Fallback Strategy

Primary CDN → Secondary CDN → Tertiary CDN → Local Assets

If primary fails:
1. Try secondary CDN
2. If secondary fails, try tertiary CDN  
3. If all fail, serve from local domain (maintains functionality)

## Switching CDNs

To change CDN after deployment:

```bash
# Stop current deployment
npm run build:cdn-jsdelivr

# Deploy new version
npm run deploy

# Done! Site uses jsDelivr now
```

## Performance Tips

- **Default is best**: Cloudflare CDN is optimized for global speed
- **Cache management**: Browser caches successful resolutions
- **Network issues**: Fallback ensures site works even if primary CDN is down
- **Timeout handling**: Default 5-second timeout, configurable in `cdn-config.json`

## Troubleshooting

**Check which CDN is active:**
```javascript
window.CDN_CONFIG.primaryCdn
```

**Monitor CDN performance:**
```javascript
window.cdnResolver.logStats()
```

**Force refresh CDN selection:**
```javascript
window.cdnResolver.clearCache()
```

**Increase CDN timeout (if slow networks):**
Edit `cdn-config.json`:
```json
{
  "timeout": 10000,
  "retryAttempts": 3
}
```

## Deployment

```bash
# Build with default CDN (Cloudflare)
npm run build

# Deploy to GitHub Pages
npm run deploy

# Site live in ~2 minutes
```

## Files in Build Output

Each build (`npm run build*`) creates `/dist/` with:
- ✓ Minified HTML
- ✓ Minified CSS
- ✓ All images
- ✓ JavaScript files (including `cdn-resolver.js`)
- ✓ `cdn-config.json` (current CDN config)
- ✓ Static files (CNAME, robots.txt, sitemap.xml)
- ✓ Service Worker

## Environment Variables

None required. All CDN configuration is in `cdn-config.json`.

---

For full documentation, see **CDN-SWITCHING.md**
