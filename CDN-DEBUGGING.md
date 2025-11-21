# CDN Debugging & Diagnostics Guide

## Why Images Load Locally Instead of CDN

When testing locally (http://127.0.0.1:5500), images may load from local instead of CDN because:

1. **Network Testing** - CDN HEAD requests might fail or timeout during local testing
2. **CORS Restrictions** - Browser might block CDN requests during testing
3. **Cache** - Previous requests might be cached in localStorage
4. **GitHub Assets** - Need to push to GitHub first for CDN to access them

This is **correct behavior** - the fallback is working as designed.

## Enable Detailed Logging

The CDN resolver now includes detailed logging. To see what's happening:

### 1. Check Console During Build
When you build, the system already logs detailed information:
```bash
npm run build
```

### 2. Enable in Browser Console
When testing locally, enhanced logging is enabled by default. Open DevTools (F12) and look at the Console tab.

### 3. View Real-Time CDN Attempts
```javascript
// In browser console, you'll see:
[CDN] Resolving /images/logo.png with order: cloudflare → jsdelivr → github
[CDN] ✓ cloudflare responded in 234ms: https://cdn.jsdelivr.net/...
[CDN] ✓ Resolved /images/logo.png via cloudflare
```

Or if it fails:
```javascript
[CDN] ✗ cloudflare failed after 5123ms: Timeout
[CDN] Attempt 1/2 on cloudflare failed: Timeout
[CDN] Retrying after 100ms...
[CDN] ✓ jsdelivr responded in 156ms: https://cdn.jsdelivr.net/...
[CDN] ✓ Resolved /images/logo.png via jsdelivr
```

Or ultimate fallback:
```javascript
[CDN] ✗ cloudflare failed after 8000ms: Timeout
[CDN] ✗ jsdelivr failed after 8000ms: Timeout
[CDN] ✗ github failed after 5234ms: Network error
[CDN] ⚠ All CDNs exhausted for /images/logo.png, falling back to local
```

## Browser Console Commands

### View Active CDN Configuration
```javascript
console.log(window.CDN_CONFIG)
```

Output shows:
- `primaryCdn`: Currently active CDN (cloudflare, jsdelivr, or github)
- `cdns`: All available CDN URLs
- `fallbackOrder`: Order of CDN attempts
- `timeout`: Timeout per attempt (ms)
- `retryAttempts`: Number of retries

### View Asset Loading Statistics
```javascript
window.assetLoader.logStats()
```

Shows:
- `loaded`: Number of successfully loaded assets
- `failed`: Number of failed assets
- `pending`: Number of pending loads
- `primaryCdn`: Current CDN

### View CDN Performance Metrics
```javascript
window.cdnResolver.logStats()
```

Shows per-CDN:
- `attempts`: Total attempts
- `successes`: Successful resolutions
- `failures`: Failed resolutions
- `totalDuration`: Total time spent
- `avgDuration`: Average response time
- `lastUsed`: When this CDN was last used

### Get Detailed Statistics
```javascript
const stats = window.cdnResolver.getStats()
console.table(stats.metrics)
```

### Test Specific Asset Resolution
```javascript
// See which URL gets resolved for an asset
const url = await window.cdnResolver.resolveAsset('/images/logo.png')
console.log('Resolved to:', url)

// Shows:
// "Resolved to: https://cdn.jsdelivr.net/gh/JayEmVey/coming-soon@latest/images/logo.png"
// OR if failed:
// "Resolved to: /images/logo.png"
```

## Step-by-Step Debugging

### Step 1: Check CDN Configuration
```javascript
// Verify CDN URLs are correct
console.log('Primary CDN:', window.CDN_CONFIG.primaryCdn)
console.log('CDN URLs:', window.CDN_CONFIG.cdns)

// Should show correct jsDelivr URL:
// https://cdn.jsdelivr.net/gh/JayEmVey/coming-soon@latest
```

### Step 2: Check Specific Asset
```javascript
// Test resolving an image
const imageUrl = await window.cdnResolver.resolveAsset('/images/coffee-as-you-are.png')
console.log('Resolved image to:', imageUrl)
```

### Step 3: Check Network in DevTools
1. Open DevTools (F12)
2. Go to **Network** tab
3. Refresh page
4. Look for requests to:
   - `cdn.jsdelivr.net` (CDN attempt)
   - `127.0.0.1:5500` (Local fallback)

### Step 4: Check Console for Errors
1. Open DevTools (F12)
2. Go to **Console** tab
3. Look for `[CDN]` messages
4. See which CDNs succeeded or failed

## Understanding the Output

### Success Case
```
[CDN] Resolving /images/logo.png with order: cloudflare → jsdelivr → github
[CDN] ✓ cloudflare responded in 234ms: https://cdn.jsdelivr.net/gh/JayEmVey/coming-soon@latest/images/logo.png
[CDN] ✓ Resolved /images/logo.png via cloudflare
```
✅ **Result**: Image loads from Cloudflare CDN

### Fallback Case
```
[CDN] Resolving /images/logo.png with order: cloudflare → jsdelivr → github
[CDN] ✗ cloudflare failed after 5000ms: Timeout
[CDN] Attempt 1/2 on cloudflare failed: Timeout
[CDN] ✓ jsdelivr responded in 345ms: https://cdn.jsdelivr.net/gh/JayEmVey/coming-soon@latest/images/logo.png
[CDN] ✓ Resolved /images/logo.png via jsdelivr
```
✅ **Result**: Cloudflare timed out, jsDelivr succeeded. Image loads from jsDelivr.

### Local Fallback Case
```
[CDN] Resolving /images/logo.png with order: cloudflare → jsdelivr → github
[CDN] ✗ cloudflare failed after 8000ms: Timeout
[CDN] ✗ jsdelivr failed after 8000ms: Timeout
[CDN] ✗ github failed after 5000ms: Error
[CDN] ⚠ All CDNs exhausted for /images/logo.png, falling back to local
```
✅ **Result**: All CDNs failed, falls back to local. Site still works!

## Why Local Fallback During Testing

During local development (http://127.0.0.1:5500), images loading locally is **normal** because:

1. **CDN URLs Point to GitHub** - jsDelivr serves from `github.com/JayEmVey/coming-soon`
2. **Repository Needs Updates** - GitHub repo must be up-to-date with latest assets
3. **Network Latency** - CDN requests might timeout with slow testing server
4. **CORS Considerations** - Some CDN requests might be blocked during testing

## How to Verify CDN Works in Production

### 1. Deploy to GitHub Pages
```bash
npm run build && npm run deploy
```

### 2. Visit Live Site
```
https://gate7.vn/
```

### 3. Check Network Tab
1. Open DevTools (F12)
2. Go to **Network** tab
3. Look for requests to `cdn.jsdelivr.net`
4. See images loading from CDN

### 4. Check Console
```javascript
// In browser console at https://gate7.vn/
window.cdnResolver.logStats()
// Should show CDN success metrics
```

## Configuration for Better CDN Performance

Edit `cdn-config.json`:

### Increase Timeout (for slower networks)
```json
{
  "timeout": 10000,
  "retryAttempts": 3
}
```

### Enable Detailed Logging in Production
```json
{
  "enableDetailedLogging": true
}
```

### Disable Logging (cleaner console)
```json
{
  "enableDetailedLogging": false
}
```

## Common Issues & Solutions

### Issue: "All CDNs return local path"
**Why**: All CDNs are timing out or unavailable

**Check**:
```javascript
// See which CDN is timing out
window.cdnResolver.logStats()

// Check timeout setting
console.log('Timeout:', window.CDN_CONFIG.timeout, 'ms')
```

**Solution**: Increase timeout or check GitHub repo is up-to-date

### Issue: "CDN URL looks wrong"
**Why**: jsDelivr URL might be pointing to old repo

**Check**:
```javascript
console.log('CDN URLs:', window.CDN_CONFIG.cdns)
```

**Should be**: `https://cdn.jsdelivr.net/gh/JayEmVey/coming-soon@latest`

**Solution**: Update `cdn-config.json` with correct GitHub repo path

### Issue: "Cache showing old results"
**Why**: localStorage has cached results from previous CDN

**Solution**:
```javascript
// Clear cache
window.cdnResolver.clearCache()
location.reload()
```

### Issue: "Want to force local only (no CDN)"
**Why**: Testing local fallback behavior

**Solution**:
```javascript
// Disable all CDNs temporarily
window.CDN_CONFIG.fallbackOrder = []
location.reload()

// Or clear and set back later
window.cdnResolver.clearCache()
window.CDN_CONFIG.fallbackOrder = ['cloudflare', 'jsdelivr', 'github']
location.reload()
```

## Testing Checklist

- [ ] Run: `npm run build` successfully
- [ ] See `cdn-config.json` updated with correct CDN
- [ ] Open dist/index.html in browser
- [ ] Open DevTools console (F12)
- [ ] See `[CDN]` log messages
- [ ] Run: `window.cdnResolver.logStats()`
- [ ] Check which CDNs respond or timeout
- [ ] See images load (from CDN or local)
- [ ] Check Network tab for CDN requests (if successful)

## Network Troubleshooting

### Test CDN Accessibility
```javascript
// Manual test of CDN URL
const cdnUrl = 'https://cdn.jsdelivr.net/gh/JayEmVey/coming-soon@latest/images/coffee-as-you-are.png'
fetch(cdnUrl, { method: 'HEAD', mode: 'no-cors' })
  .then(r => console.log('CDN accessible:', r.ok))
  .catch(e => console.log('CDN failed:', e.message))
```

### Check GitHub Repo
```
https://github.com/JayEmVey/coming-soon/tree/master/images
```
Verify images folder exists and has your images.

### Verify jsDelivr Cache
jsDelivr might cache old versions. To force fresh:
```
https://cdn.jsdelivr.net/gh/JayEmVey/coming-soon@latest/images/logo.png
```

Or update to specific commit:
```
https://cdn.jsdelivr.net/gh/JayEmVey/coming-soon@[COMMIT_SHA]/images/logo.png
```

## Production Verification

When deployed to production (https://gate7.vn/):

### 1. Check Active CDN
```javascript
console.log(window.CDN_CONFIG.primaryCdn)
// Should show: "cloudflare"
```

### 2. Check Asset Stats
```javascript
window.assetLoader.logStats()
// Should show loaded count > 0
```

### 3. Check CDN Metrics
```javascript
window.cdnResolver.logStats()
// Should show success counts for CDN
```

### 4. Check Network
1. Open DevTools (F12)
2. Network tab
3. Refresh page
4. Look for requests to `cdn.jsdelivr.net`
5. Should see images loading from CDN

## Summary

✅ **Logging is working** - You can see what CDN is doing  
✅ **Fallback is working** - Falls back to local if CDN fails  
✅ **Local testing shows local files** - Normal during development  
✅ **Production shows CDN** - When deployed to GitHub Pages  

**To verify CDN in production:**
1. Deploy: `npm run deploy`
2. Visit: https://gate7.vn/
3. Check console: `window.cdnResolver.logStats()`
4. Should show CDN success metrics

---

For more help, see complete guides:
- `ASSET-LOADING.md` - Full asset loading guide
- `CDN-SWITCHING.md` - Complete CDN guide
- `FINAL-SUMMARY.md` - Complete feature overview
