# Asset Loading - Quick Start

## What's New

Your site now automatically loads images and JavaScript from your configured CDN with fallback to local assets if the CDN fails.

## How It Works

```
Your HTML with images/scripts
    ↓
Build injects CDN scripts
    ↓
Browser tries CDN (cloudflare/jsdelivr/github)
    ↓ (if fails)
Browser uses local assets
    ↓
Site works either way
```

## One-Line Examples

### Check What CDN is Active
```javascript
console.log(window.CDN_CONFIG.primaryCdn)
```

### View Asset Loading Stats
```javascript
window.assetLoader.logStats()
```

### View CDN Performance Stats
```javascript
window.cdnResolver.logStats()
```

### Load a Script from CDN
```javascript
await window.assetLoader.loadScript('/js/custom.js')
```

### Load an Image from CDN
```javascript
const img = document.querySelector('img.logo')
await window.assetLoader.loadImage('/images/logo.png', img)
```

### Clear CDN Cache
```javascript
window.cdnResolver.clearCache()
```

## HTML Usage

### Mark Images for CDN Loading

Use `data-src` attribute - images auto-load on page load:

```html
<img 
  src="placeholder.gif" 
  data-src="/images/logo.png" 
  alt="Logo"
/>
```

The asset loader automatically loads these on `DOMContentLoaded`.

## Building with Asset Loading

```bash
# Build includes asset loading automatically
npm run build

# Or with specific CDN
npm run build:cdn-jsdelivr
npm run build:cdn-github
```

## What Gets Injected

When you build, these are automatically added to your HTML:

```html
<!-- CDN Configuration (in head) -->
<script id="cdn-loader">
  window.CDN_CONFIG = { ... }
  window.getCdnUrl = function(...) { ... }
</script>

<!-- Asset Loaders (before </body>) -->
<script defer src="js/cdn-resolver.js"></script>
<script defer src="js/asset-loader.js"></script>
```

You don't need to add these manually - the build does it for you.

## Global Objects Available

```javascript
window.CDN_CONFIG          // CDN configuration
window.getCdnUrl()         // Helper function
window.resolveCdnAsset()   // Resolve with fallback
window.cdnResolver         // CDNResolver instance
window.assetLoader         // AssetLoader instance
```

## Common Tasks

### Load All Images in a Section
```javascript
const section = document.querySelector('.gallery')
await window.assetLoader.loadAllImages(section)
```

### Load Multiple Scripts
```javascript
const scripts = ['/js/a.js', '/js/b.js', '/js/c.js']
const success = await window.assetLoader.loadScripts(scripts)
```

### Monitor Specific Asset
```javascript
const promise = window.assetLoader.loadImage('/images/photo.jpg', img)
promise.then(() => console.log('Image loaded'))
```

### Check Current CDN URL
```javascript
const url = await window.cdnResolver.resolveAsset('/images/logo.png')
console.log(url)  // CDN URL or local path
```

## Build System Files

| File | Purpose |
|------|---------|
| `build-cdn.js` | Build with CDN injection |
| `js/cdn-resolver.js` | Runtime CDN resolution |
| `js/asset-loader.js` | Asset loading API |
| `cdn-config.json` | CDN configuration |

## Performance

- ✅ CDN URLs cached in localStorage
- ✅ Successful loads don't retry
- ✅ Timeout: 5 seconds (configurable)
- ✅ Automatic fallback: no manual intervention needed
- ✅ Works offline: falls back to local assets

## Configuration

Edit `cdn-config.json` for:
- Timeout duration (ms)
- Retry attempts
- Custom CDN URLs
- Fallback strategy

Example:
```json
{
  "timeout": 10000,
  "retryAttempts": 3
}
```

## Troubleshooting

**Images not loading?**
```javascript
window.assetLoader.logStats()
window.cdnResolver.logStats()
```

**Script failed?**
```javascript
const url = await window.cdnResolver.resolveAsset('/js/script.js')
console.log('Resolved to:', url)
```

**Clear cache:**
```javascript
window.cdnResolver.clearCache()
```

## API Summary

### Asset Loader
```javascript
window.assetLoader.loadImage(path, imgElement)      // Load image
window.assetLoader.loadScript(path, options)        // Load script
window.assetLoader.loadScripts(paths, options)      // Load multiple
window.assetLoader.loadAllImages(container)         // Load container
window.assetLoader.getStats()                       // Get stats
window.assetLoader.logStats()                       // Console log
```

### CDN Resolver
```javascript
window.cdnResolver.resolveAsset(path)               // Resolve URL
window.cdnResolver.getStats()                       // Get stats
window.cdnResolver.logStats()                       // Console log
window.cdnResolver.clearCache()                     // Clear cache
window.cdnResolver.setPreferredCdns(array)          // Change order
```

## Next Steps

1. **Build**: Run `npm run build`
2. **Deploy**: Run `npm run deploy`
3. **Verify**: Open browser console and run:
   ```javascript
   window.assetLoader.logStats()
   ```
4. **Done**: Your site now loads assets from CDN

## Full Documentation

See **ASSET-LOADING.md** for complete guide with examples.
