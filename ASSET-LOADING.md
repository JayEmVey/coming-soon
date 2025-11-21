# Asset Loading with CDN - Complete Guide

## Overview

The asset loading system automatically loads images and JavaScript files from your configured CDN with automatic fallback to local assets if the CDN is unavailable.

## How It Works

### Automatic Injection

When you run a build command, the system automatically:
1. Injects CDN configuration into each HTML file
2. Injects CDN resolver script (`js/cdn-resolver.js`)
3. Injects asset loader script (`js/asset-loader.js`)

These scripts enable CDN-aware loading for all images and JavaScript files.

### Loading Flow

```
Image/Script Request
    ↓
Try Primary CDN (cloudflare/jsdelivr/github)
    ↓ (if fails)
Try Secondary CDN
    ↓ (if fails)
Try Tertiary CDN
    ↓ (if fails)
Use Local Asset
```

## JavaScript API

### Asset Loader Class

Access the global asset loader instance:

```javascript
window.assetLoader
```

#### Load Single Image
```javascript
// Load image from CDN with fallback
const imgElement = document.querySelector('img.logo');
await window.assetLoader.loadImage('/images/logo.png', imgElement);
```

#### Load Script
```javascript
// Load script from CDN with fallback
await window.assetLoader.loadScript('/js/custom-script.js', {
  defer: true,    // Make script defer (default: true)
  async: false    // Load asynchronously
});
```

#### Load Multiple Scripts
```javascript
// Load scripts sequentially
const scripts = [
  '/js/script1.js',
  '/js/script2.js',
  '/js/script3.js'
];

const allLoaded = await window.assetLoader.loadScripts(scripts, {
  defer: true
});

if (allLoaded) {
  console.log('All scripts loaded successfully');
}
```

#### Load All Images in Container
```javascript
// Load all images marked with data-src in a container
await window.assetLoader.loadAllImages(document.querySelector('.content'));
```

#### Get Statistics
```javascript
// View asset loading stats
const stats = window.assetLoader.getStats();
console.log(stats);

// Output:
// {
//   loaded: 15,
//   failed: 0,
//   pending: 2,
//   primaryCdn: 'cloudflare',
//   timestamp: '2025-11-21T10:30:00.000Z'
// }
```

#### Log Statistics to Console
```javascript
// Pretty-print asset loading statistics
window.assetLoader.logStats();
```

## HTML Usage Patterns

### Pattern 1: Direct Attribute Loading (Recommended)

Use `data-src` attribute for images that should load from CDN:

```html
<img 
  src="placeholder.png" 
  data-src="/images/logo.png" 
  alt="Logo"
  width="200"
  height="150"
/>
```

The asset loader automatically loads `data-src` images on DOM ready.

### Pattern 2: Dynamic Loading in JavaScript

```javascript
// Load image dynamically
const img = document.createElement('img');
img.alt = 'Product Image';
img.width = 300;
img.height = 200;

await window.assetLoader.loadImage('/images/product.png', img);
document.querySelector('.product-section').appendChild(img);
```

### Pattern 3: Script Loading in JavaScript

```javascript
// Load a script module
const success = await window.assetLoader.loadScript('/js/analytics.js', {
  defer: true
});

if (success) {
  // Script loaded, call functions
  window.initializeAnalytics();
}
```

## CDN Resolver API

### Resolve Asset Path

```javascript
// Low-level asset resolution with fallback
const url = await window.cdnResolver.resolveAsset('/images/logo.png');
console.log(url); // Returns CDN URL or local path
```

### Get CDN Statistics

```javascript
// View CDN performance metrics
const stats = window.cdnResolver.getStats();
console.table(stats.metrics);

// Output includes:
// - success/failure counts per CDN
// - average response times
// - last used timestamps
```

### Clear Cache

```javascript
// Clear localStorage cache (if CDN changes or issues occur)
window.cdnResolver.clearCache();
```

### Set Preferred CDNs

```javascript
// Change the fallback order (e.g., prefer jsDelivr)
window.cdnResolver.setPreferredCdns(['jsdelivr', 'cloudflare', 'github']);
```

### View Logs

```javascript
// Pretty-print CDN statistics
window.cdnResolver.logStats();
```

## Build System Integration

### Automatic Injection

Each build now automatically:

1. **Injects CDN Config**
   ```javascript
   window.CDN_CONFIG = {
     primaryCdn: "cloudflare",
     cdns: { ... },
     fallbackOrder: [...],
     timeout: 5000,
     retryAttempts: 2
   }
   ```

2. **Includes Asset Loader**
   ```html
   <script defer src="js/cdn-resolver.js"></script>
   <script defer src="js/asset-loader.js"></script>
   ```

3. **Enables Dynamic Asset Loading**
   ```javascript
   window.assetLoader  // AssetLoader instance
   window.cdnResolver  // CDNResolver instance
   ```

### Build Commands

```bash
# Build with Cloudflare CDN
npm run build

# Build with jsDelivr CDN
npm run build:cdn-jsdelivr

# Build with GitHub CDN
npm run build:cdn-github
```

All builds include the asset loading system.

## Configuration

### Timeout Settings

Default: 5 seconds per CDN attempt

Edit `cdn-config.json`:
```json
{
  "timeout": 10000,
  "retryAttempts": 3
}
```

### Custom CDN URLs

Edit `cdn-config.json`:
```json
{
  "cdns": {
    "cloudflare": "https://your-custom-cdn.com/v1",
    "jsdelivr": "https://cdn.jsdelivr.net/gh/user/repo@latest",
    "github": "https://raw.githubusercontent.com/user/repo/master"
  }
}
```

## Performance Tips

### 1. Lazy Load Images

Use `data-src` for below-the-fold images:

```html
<!-- Critical image - load immediately -->
<img src="/images/logo.png" alt="Logo" />

<!-- Below fold - load via CDN on demand -->
<img src="placeholder.png" data-src="/images/gallery-1.png" alt="Gallery" />
```

### 2. Batch Load Scripts

Load related scripts together:

```javascript
const scripts = [
  '/js/analytics.js',
  '/js/tracking.js',
  '/js/reporting.js'
];

await window.assetLoader.loadScripts(scripts);
```

### 3. Monitor Performance

Check what's loaded and what failed:

```javascript
const stats = window.assetLoader.getStats();
if (stats.failed > 0) {
  console.log('Some assets failed to load, check browser cache');
}
```

## Error Handling

### Graceful Degradation

All asset loading automatically falls back to local assets:

```javascript
// This always succeeds - either from CDN or local
await window.assetLoader.loadImage('/images/logo.png', imgElement);

// Image will display either way
```

### Check Load Status

```javascript
// Check if specific asset loaded
const stats = window.assetLoader.getStats();
console.log(`Loaded: ${stats.loaded}, Failed: ${stats.failed}`);

// Or check for specific asset
const loadPromise = window.assetLoader.loadScript('/js/script.js');
loadPromise.then(success => {
  if (!success) {
    console.error('Script failed to load from all sources');
  }
});
```

### Debug Mode

```javascript
// Enable detailed logging
window.assetLoader.logStats();      // Asset stats
window.cdnResolver.logStats();      // CDN stats

// Check what's cached
const stats = window.cdnResolver.getStats();
console.log(`Cache size: ${stats.cacheSize}`);
```

## Real-World Examples

### Example 1: Load Product Gallery from CDN

```html
<div class="product-gallery" id="gallery">
  <!-- Placeholder images with data-src pointing to CDN -->
  <img src="placeholder.gif" data-src="/images/product-1.jpg" alt="Product 1" />
  <img src="placeholder.gif" data-src="/images/product-2.jpg" alt="Product 2" />
  <img src="placeholder.gif" data-src="/images/product-3.jpg" alt="Product 3" />
</div>

<script>
// Images auto-load on DOMContentLoaded from CDN
window.addEventListener('load', function() {
  window.assetLoader.logStats(); // Check success
});
</script>
```

### Example 2: Conditional Script Loading

```javascript
// Load analytics only after user interaction
document.addEventListener('click', async function() {
  if (!window.analyticsLoaded) {
    await window.assetLoader.loadScript('/js/analytics.js');
    window.analyticsLoaded = true;
    console.log('Analytics loaded from CDN');
  }
});
```

### Example 3: Fallback to Local on Timeout

```javascript
// The system handles this automatically, but here's how to monitor:
const img = document.querySelector('img.important');
const loadPromise = window.assetLoader.loadImage('/images/critical.png', img);

loadPromise.then(() => {
  // Image loaded (from CDN or local)
  if (img.src.includes('cdn.jsdelivr.net')) {
    console.log('Loaded from CDN');
  } else {
    console.log('Loaded from local (CDN failed)');
  }
});
```

### Example 4: Preload Critical Assets

```javascript
// In your initialization code
async function initializeAssets() {
  const criticalImages = [
    '/images/logo.png',
    '/images/hero-banner.png',
    '/images/favicon.png'
  ];

  const loadPromises = criticalImages.map(imagePath => {
    const img = document.querySelector(`img[alt="${imagePath}"]`);
    if (img) {
      return window.assetLoader.loadImage(imagePath, img);
    }
  });

  await Promise.all(loadPromises);
  console.log('Critical assets loaded');
}

// Call on page load
window.addEventListener('load', initializeAssets);
```

## Troubleshooting

### Images Not Loading from CDN

**Check in browser console:**
```javascript
window.assetLoader.logStats();
window.cdnResolver.logStats();
```

**Verify CDN configuration:**
```javascript
console.log(window.CDN_CONFIG.primaryCdn);
console.log(window.CDN_CONFIG.cdns);
```

### Script Loading Fails

**Check script path:**
```javascript
const url = await window.cdnResolver.resolveAsset('/js/script.js');
console.log('Resolved to:', url);
```

**Verify script exists on CDN:**
- Cloudflare: `https://cdn.jsdelivr.net/gh/JayEmVey/coming-soon@latest/js/script.js`
- jsDelivr: `https://cdn.jsdelivr.net/gh/JayEmVey/coming-soon@latest/js/script.js`
- GitHub: `https://raw.githubusercontent.com/JayEmVey/coming-soon/master/js/script.js`

### Slow Loading

**Check timeout setting:**
```javascript
console.log('Timeout:', window.CDN_CONFIG.timeout);
```

**Increase if needed (edit cdn-config.json):**
```json
{
  "timeout": 10000,
  "retryAttempts": 3
}
```

### Clear Cache Issues

```javascript
// Clear all caches
window.cdnResolver.clearCache();
window.assetLoader = new window.constructor.AssetLoader();

// Reload page
location.reload();
```

## Browser Compatibility

- Modern browsers with ES6+ support
- Fetch API required
- Promise support required
- Works in all modern browsers (Chrome, Firefox, Safari, Edge)

## Performance Metrics

### Asset Loader Tracks:
- Number of successfully loaded assets
- Number of failed assets
- Pending asset loads
- Current primary CDN

### CDN Resolver Tracks:
- Success/failure per CDN
- Average response times
- Number of attempts
- Last used timestamp

View metrics:
```javascript
window.assetLoader.logStats();   // Asset loading metrics
window.cdnResolver.logStats();   // CDN performance metrics
```

## FAQ

**Q: Do I need to change HTML to use CDN loading?**  
A: No for most images. Use `data-src` attribute for dynamic loading. Scripts are automatically loaded from CDN via injected tags.

**Q: What if CDN is down?**  
A: System automatically falls back to local assets - site continues to work.

**Q: Can I force local loading?**  
A: Yes, clear the cache and set empty fallback order:
```javascript
window.cdnResolver.clearCache();
window.CDN_CONFIG.fallbackOrder = [];
```

**Q: Which CDN is fastest?**  
A: Cloudflare (default) is optimized for global distribution.

**Q: Can I use my own CDN?**  
A: Yes, edit the CDN URLs in `cdn-config.json` and rebuild.

## Reference

- **Build System**: `build-cdn.js`
- **CDN Resolver**: `js/cdn-resolver.js`
- **Asset Loader**: `js/asset-loader.js`
- **Configuration**: `cdn-config.json`
- **CDN Setup**: `CDN-SWITCHING.md`
