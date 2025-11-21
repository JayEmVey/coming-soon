# CDN Switching Mechanism

## Overview

The CDN switching system enables you to build your site with different content delivery networks (CDNs) without changing code. Choose between Cloudflare, jsDelivr, or GitHub with automatic fallback to local assets if all CDNs are unavailable.

## Build Commands

### Default Build (Cloudflare CDN)
```bash
npm run build
```
Builds with Cloudflare CDN via jsDelivr as the primary source. This is the recommended option for production deployments.

### Build with jsDelivr CDN
```bash
npm run build:cdn-jsdelivr
```
Builds with jsDelivr as the primary CDN source. Same endpoint as Cloudflare but different routing optimization.

### Build with GitHub CDN (Fallback)
```bash
npm run build:cdn-github
```
Builds with GitHub raw content as the primary source. Useful for testing or when other CDNs are unavailable.

## Configuration

### CDN Configuration File: `cdn-config.json`

This JSON file stores all CDN settings and is generated/updated with each build:

```json
{
  "default": "cloudflare",
  "cdns": {
    "cloudflare": {
      "name": "Cloudflare CDN",
      "baseUrl": "https://cdn.jsdelivr.net/gh/JayEmVey/coming-soon@latest",
      "description": "Fast and reliable Cloudflare CDN via jsDelivr"
    },
    "jsdelivr": {
      "name": "jsDelivr CDN",
      "baseUrl": "https://cdn.jsdelivr.net/gh/JayEmVey/coming-soon@latest",
      "description": "Global CDN with multiple provider support"
    },
    "github": {
      "name": "GitHub Raw",
      "baseUrl": "https://raw.githubusercontent.com/JayEmVey/coming-soon/master",
      "description": "GitHub raw content (fallback)"
    }
  },
  "assetPaths": {
    "css": "/css",
    "js": "/js",
    "images": "/images"
  },
  "fallbackStrategy": "github",
  "timeout": 5000,
  "retryAttempts": 2,
  "buildDate": "2025-11-21",
  "version": "1.0.0"
}
```

**Fields:**
- `default`: Currently active CDN (auto-updated on each build)
- `cdns`: URLs for each CDN provider
- `fallbackStrategy`: Which CDN to use if primary fails
- `timeout`: Milliseconds to wait before CDN timeout (5000 = 5 seconds)
- `retryAttempts`: Number of retry attempts for failed CDN requests
- `buildDate`: Date of last build
- `version`: Config version

## Runtime CDN Resolution

### How It Works

1. **Injection**: During build, a CDN loader script is injected into all HTML files
2. **Configuration**: The loader sets up `window.CDN_CONFIG` with the selected CDN settings
3. **Resolution**: JavaScript and assets use the CDN resolver to fetch files
4. **Fallback**: If the primary CDN fails, it automatically tries the next in the fallback order

### Window Global Objects

#### `window.CDN_CONFIG`
Contains the CDN configuration injected during build:
```javascript
{
  "primaryCdn": "cloudflare",
  "cdns": { /* CDN URLs */ },
  "fallbackOrder": ["cloudflare", "jsdelivr", "github"],
  "timeout": 5000,
  "retryAttempts": 2
}
```

#### `window.getCdnUrl(assetPath)`
Gets the CDN URL for an asset:
```javascript
// Get CSS file from configured CDN
const cssUrl = window.getCdnUrl('/css/style-gate7.css');
// Returns: https://cdn.jsdelivr.net/gh/JayEmVey/coming-soon@latest/css/style-gate7.css
```

#### `window.resolveCdnAsset(assetPath)`
Resolves an asset with fallback logic (async):
```javascript
// Resolves asset with automatic fallback
const imageUrl = await window.resolveCdnAsset('/images/logo.png');
```

### CDN Resolver Class (`js/cdn-resolver.js`)

Advanced CDN management is handled by the `CDNResolver` class:

```javascript
// Access the global resolver instance
const resolver = window.cdnResolver;

// Resolve an asset with fallback
const url = await resolver.resolveAsset('/css/style.css');

// Get current statistics
const stats = resolver.getStats();
console.log(stats);
// Output:
// {
//   config: { /* CDN config */ },
//   cacheSize: 42,
//   metrics: { /* Performance metrics by CDN */ },
//   timestamp: "2025-11-21T10:30:00.000Z"
// }

// Clear cache if needed
resolver.clearCache();

// Set preferred CDN order
resolver.setPreferredCdns(['jsdelivr', 'cloudflare', 'github']);

// View performance logs
resolver.logStats();
```

## Features

### Automatic Fallback
If the primary CDN fails, the system automatically tries the next CDN in the fallback order:
1. Primary CDN (as specified during build)
2. Secondary CDNs (fallback order)
3. Local assets (ultimate fallback)

### Retry Logic with Exponential Backoff
- Configurable retry attempts (default: 2)
- Exponential backoff between retries (100ms, 200ms, etc.)
- Per-CDN timeout (default: 5 seconds)

### Performance Caching
- Successfully resolved CDN URLs are cached in localStorage
- Metrics tracked per CDN (success rate, average response time)
- Cache is persistent across page loads

### Per-Session Cache Management
```javascript
// View cached resolutions
const stats = window.cdnResolver.getStats();
console.log(`Cache size: ${stats.cacheSize} entries`);

// Clear stale cache if issues occur
window.cdnResolver.clearCache();
```

## Deployment Strategy

### Production (Recommended)
```bash
npm run build
npm run deploy
```
Builds with Cloudflare CDN (fastest globally) and deploys to GitHub Pages.

### Regional Testing
```bash
# Test jsDelivr routing
npm run build:cdn-jsdelivr
npm run test

# Test GitHub fallback
npm run build:cdn-github
npm run test
```

### Switching CDNs
If you need to switch CDN providers after deployment:
```bash
# Rebuild with new CDN
npm run build:cdn-jsdelivr

# Deploy immediately
npm run deploy
```

## Troubleshooting

### Check Current CDN
```javascript
// In browser console
console.log('Active CDN:', window.CDN_CONFIG.primaryCdn);
console.log('Fallback order:', window.CDN_CONFIG.fallbackOrder);
```

### Monitor CDN Performance
```javascript
// See which CDN handled each asset
window.cdnResolver.logStats();

// Check cache
const cache = window.cdnResolver.getStats();
console.table(cache.metrics);
```

### Force Local Fallback
If all CDNs are unavailable and you want to test local assets:
```javascript
// Clear CDN cache to force re-evaluation
window.cdnResolver.clearCache();

// Or temporarily disable CDN resolution
window.CDN_CONFIG.fallbackOrder = [];
```

### DNS/Network Issues
If experiencing CDN timeouts, increase the timeout value in `cdn-config.json`:
```json
{
  "timeout": 10000,
  "retryAttempts": 3
}
```

## Asset Paths

Assets are served from the following CDN paths:

| Type | Path | Example |
|------|------|---------|
| CSS | `/css/*` | `/css/style-gate7.css` |
| JavaScript | `/js/*` | `/js/language-switcher.js` |
| Images | `/images/*` | `/images/logo.png` |
| Root | `/*` | `/index.html` |

## Build Output

When you run a build, you'll see:

```
🔨 Building production bundle with Cloudflare CDN...

📝 Minifying HTML files...
  ✓ index.html (18502 bytes, 12.3% smaller)
  ✓ menu/index.html (9832 bytes, 15.1% smaller)
  ...

🎨 Processing CSS files...
  ✓ style-gate7.css (4521 bytes, 22.5% smaller)
  ...

🖼️  Copying images...
  ✓ images/ (124 files)

📋 Copying static files...
  ✓ CNAME
  ✓ robots.txt
  ✓ sitemap.xml
  ✓ js/service-worker.js

⚙️  Configuring CDN...
  ✓ cdn-config.json (active CDN: cloudflare)

✅ Build complete!

📦 Output: /path/to/dist/
🌐 CDN: Cloudflare CDN
📊 Total size: 2847294 bytes (2.71 MB)
```

## Technical Details

### Build Scripts
- **`build-cdn.js`**: Main CDN-aware build script that handles all CDN configurations
- **`js/cdn-resolver.js`**: Runtime CDN resolution library for dynamic asset loading

### Injected Scripts
Each HTML file receives an injected CDN loader script that:
1. Sets up `window.CDN_CONFIG` with build-time CDN selection
2. Provides `window.getCdnUrl()` helper for asset URLs
3. Provides `window.resolveCdnAsset()` for async resolution with fallback
4. Initializes `window.cdnResolver` (CDNResolver class instance)

### Environment Variables
None required. All configuration is in `cdn-config.json`.

## FAQ

**Q: Why does `npm run build` use Cloudflare instead of jsDelivr?**  
A: Cloudflare CDN offers superior global performance and caching. It's the recommended default.

**Q: Can I switch CDNs without rebuilding?**  
A: No, CDN selection is baked into the build. You must rebuild to switch CDNs.

**Q: What happens if all CDNs fail?**  
A: Assets fall back to local paths (served from your domain), maintaining full functionality.

**Q: How do I monitor which CDN is serving assets?**  
A: Check `window.cdnResolver.logStats()` in the browser console or view localStorage.

**Q: Can I use a custom CDN?**  
A: Yes, edit `cdn-config.json` and update the URLs in `build-cdn.js`.

**Q: Is there performance overhead for CDN fallback?**  
A: Minimal. Fallback only occurs if the primary CDN fails. Successful resolutions are cached.
