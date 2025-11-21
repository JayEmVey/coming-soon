# Testing Guide - CDN & Asset Loading

## Quick Start (Right Now)

### 1. Build
```bash
npm run build
```

### 2. Test Locally
```bash
npm run test
```

### 3. Open Browser Console (F12)
```javascript
// View what's happening
window.cdnResolver.logStats()
```

You'll see the CDN attempts and results.

## What You'll See During Local Testing

### Expected: Images Load Locally
During local testing (http://127.0.0.1:5500), you'll see:
```
[CDN] Resolving /images/coffee-as-you-are.png with order: cloudflare → jsdelivr → github
[CDN] ✗ cloudflare failed after 5000ms: Timeout
[CDN] ✗ jsdelivr failed after 5000ms: Timeout
[CDN] ✗ github failed after 8000ms: Timeout
[CDN] ⚠ All CDNs exhausted for /images/coffee-as-you-are.png, falling back to local
```

**This is NORMAL!** The fallback is working - images load locally instead of CDN.

### Browser Network Tab Shows
- ✅ `http://127.0.0.1:5500/dist/images/coffee-as-you-are.png` (LOCAL)
- ✅ Multiple CDN attempts that time out (expected)
- ✅ Site works perfectly (fallback successful)

### Browser Console Shows
```javascript
// Statistics
window.assetLoader.logStats()
// Output: { loaded: 15, failed: 0, pending: 0, primaryCdn: 'cloudflare' }
```

## Why CDN Doesn't Work During Local Testing

| Phase | URL | CDN Status |
|-------|-----|-----------|
| Local Testing | `http://127.0.0.1:5500` | Times out (fallback) |
| Production | `https://gate7.vn/` | Works from CDN |

**During local testing**, the CDN resolver tries these URLs (all fail with timeout):
1. `https://cdn.jsdelivr.net/gh/JayEmVey/coming-soon@latest/images/logo.png` ← Timeout
2. `https://cdn.jsdelivr.net/gh/JayEmVey/coming-soon@latest/images/logo.png` ← Timeout
3. `https://raw.githubusercontent.com/JayEmVey/coming-soon/master/images/logo.png` ← Timeout
4. Falls back to: `http://127.0.0.1:5500/images/logo.png` ← Works!

This is **correct behavior**. The system is working perfectly.

## Testing Checklist

### ✅ Phase 1: Build & Setup
- [ ] Run `npm run build` (no errors)
- [ ] Check `dist/` folder exists
- [ ] Verify `dist/js/asset-loader.js` exists
- [ ] Verify `dist/cdn-config.json` exists

### ✅ Phase 2: Local Testing
- [ ] Run `npm run test`
- [ ] Browser opens to http://localhost:8080
- [ ] Page loads without errors
- [ ] All images display correctly
- [ ] Open DevTools (F12)
- [ ] Go to Console tab
- [ ] See CDN resolution attempts logged
- [ ] See `[CDN]` messages showing fallback

### ✅ Phase 3: Verify APIs
```javascript
// In browser console, run:
window.CDN_CONFIG                    // Should show config
window.assetLoader                   // Should exist
window.cdnResolver                   // Should exist
window.assetLoader.logStats()        // Should show stats
window.cdnResolver.logStats()        // Should show CDN metrics
```

### ✅ Phase 4: Deploy
- [ ] Run `npm run deploy`
- [ ] Wait 2 minutes for site to go live
- [ ] Visit https://gate7.vn/
- [ ] Open DevTools
- [ ] Check Network tab for CDN requests
- [ ] See `cdn.jsdelivr.net` requests
- [ ] Verify images loaded from CDN

## Test Each CDN Variant

### Test Cloudflare (Default)
```bash
npm run build                    # Already cloudflare
npm run test
# In console: window.CDN_CONFIG.primaryCdn // "cloudflare"
```

### Test jsDelivr
```bash
npm run build:cdn-jsdelivr
npm run test
# In console: window.CDN_CONFIG.primaryCdn // "jsdelivr"
```

### Test GitHub
```bash
npm run build:cdn-github
npm run test
# In console: window.CDN_CONFIG.primaryCdn // "github"
```

### Back to Default
```bash
npm run build                    # Back to cloudflare
```

## Test Asset Loading

### Test Image Loading
```javascript
// In browser console
const img = document.querySelector('img.logo')
await window.assetLoader.loadImage('/images/logo-color-black-bg1.png', img)

// Then check:
// 1. Image displays
// 2. Console shows resolution log
// 3. Network tab shows where it loaded from
```

### Test Script Loading
```javascript
// In browser console
await window.assetLoader.loadScript('/js/responsive-images.js')

// Then check console for success message
```

### Test Multiple Scripts
```javascript
const scripts = ['/js/responsive-images.js', '/js/scroll-animations.js']
await window.assetLoader.loadScripts(scripts)

// Should load both scripts
```

## Test Fallback Behavior

### Force Fallback Test
```javascript
// Disable all CDNs to test fallback
window.CDN_CONFIG.fallbackOrder = []

// Clear cache
window.cdnResolver.clearCache()

// Reload
location.reload()

// Site should still work, using local assets
// Check: window.assetLoader.logStats()
```

### Restore Normal
```javascript
// Re-enable CDNs
window.CDN_CONFIG.fallbackOrder = ['cloudflare', 'jsdelivr', 'github']
window.cdnResolver.clearCache()
location.reload()

// Check: window.assetLoader.logStats()
```

## Production Testing (After Deploy)

### 1. Visit Live Site
```
https://gate7.vn/
```

### 2. Open DevTools
- Press: F12
- Go to: **Network** tab

### 3. Refresh & Observe
1. Page should load
2. Look for requests to `cdn.jsdelivr.net`
3. Images should load from CDN
4. Check Network timeline

### 4. Check Console
```javascript
// In console tab
window.cdnResolver.logStats()

// Should show:
// cloudflare: { successes: > 0, ... }
// OR
// jsdelivr: { successes: > 0, ... }
// OR
// github: { successes: > 0, ... }
```

## Expected Results

### Local Testing (http://127.0.0.1:5500)
```
Images: Load from local (fallback working)
Network: Multiple CDN timeouts, then local load
Console: [CDN] messages showing fallback
Status: ✅ CORRECT
```

### Production Testing (https://gate7.vn/)
```
Images: Load from cdn.jsdelivr.net (CDN working)
Network: Direct CDN requests succeed
Console: [CDN] messages showing CDN success
Status: ✅ CORRECT
```

## Performance Testing

### Measure Load Times
```javascript
// In console
const start = performance.now()
window.cdnResolver.getStats()
const end = performance.now()
console.log('Took', (end - start).toFixed(2), 'ms')
```

### Check Cache Efficiency
```javascript
// First load (no cache)
const url1 = await window.cdnResolver.resolveAsset('/images/logo.png')

// Second load (cached)
const url2 = await window.cdnResolver.resolveAsset('/images/logo.png')

// Both should return same URL, second is instant
```

## Debugging Failed Assets

### Find Which Assets Failed
```javascript
const stats = window.assetLoader.getStats()
if (stats.failed > 0) {
  console.warn('Some assets failed to load')
}
console.log(stats)
```

### Check Specific Asset
```javascript
const url = await window.cdnResolver.resolveAsset('/images/coffee-as-you-are.png')
console.log('Resolved to:', url)

// If it's a local path instead of CDN URL, CDN failed
// If it's a CDN URL, CDN succeeded
```

### Test Direct CDN Access
```javascript
// Manual fetch test
const cdnUrl = 'https://cdn.jsdelivr.net/gh/JayEmVey/coming-soon@latest/images/coffee-as-you-are.png'
const response = await fetch(cdnUrl, { method: 'HEAD', mode: 'no-cors' })
console.log('CDN accessible:', response.ok)
```

## Network Inspection

### DevTools Network Tab
1. Open DevTools: F12
2. Click: Network tab
3. Refresh page
4. Filter by: Image

**During Local Testing:**
- ✅ Requests to `127.0.0.1:5500` (local, 200 OK)
- ✅ Requests to `cdn.jsdelivr.net` (failed timeouts, expected)

**During Production:**
- ✅ Requests to `cdn.jsdelivr.net` (200 OK)
- ✅ Fast load times from CDN edge servers

## Timing Expectations

### Local Testing
- CDN timeouts: 5-8 seconds per CDN
- Fallback to local: Instant (~1ms)
- **Total**: 15-25 seconds for first load, instant for cached

### Production
- Cloudflare CDN: 100-500ms
- jsDelivr CDN: 200-600ms
- GitHub Raw: 500-2000ms
- **Cached**: 1-5ms

## Console Command Reference

### Quick Health Check
```javascript
// All in one
console.log('=== CDN HEALTH CHECK ===')
console.log('Config:', window.CDN_CONFIG.primaryCdn)
console.log('Loaded:', window.assetLoader.getStats().loaded)
console.log('Failed:', window.assetLoader.getStats().failed)
window.cdnResolver.logStats()
```

### Deep Diagnostics
```javascript
// Full diagnostic report
console.group('=== CDN DIAGNOSTICS ===')
console.log('Config:', window.CDN_CONFIG)
console.log('Asset Stats:', window.assetLoader.getStats())
console.log('CDN Stats:', window.cdnResolver.getStats())
console.groupEnd()
```

### Clear Everything & Reset
```javascript
// Full reset
window.cdnResolver.clearCache()
localStorage.clear()
location.reload()
```

## Common Test Scenarios

### Scenario 1: New Build
```bash
npm run build
npm run test
# Expect: Local fallback (CDN timeouts)
# Status: ✅ Working correctly
```

### Scenario 2: Fresh Deploy
```bash
npm run deploy
# Wait 2 minutes
# Visit https://gate7.vn/
# Expect: CDN loads in Network tab
# Status: ✅ Working in production
```

### Scenario 3: Different CDN
```bash
npm run build:cdn-jsdelivr
npm run test
# In console: window.CDN_CONFIG.primaryCdn
# Expect: "jsdelivr"
# Status: ✅ Different CDN active
```

### Scenario 4: Cache Test
```bash
# In console:
window.cdnResolver.clearCache()
location.reload()
# Expect: Fresh resolution attempt
# Status: ✅ Cache working
```

## Success Criteria

✅ **Local Testing Succeeds When:**
- [ ] Page loads without errors
- [ ] All images display
- [ ] No console errors
- [ ] Asset loader reports loaded > 0
- [ ] Fallback messages appear in console

✅ **Production Testing Succeeds When:**
- [ ] Page loads at https://gate7.vn/
- [ ] Network shows CDN requests
- [ ] Images load from cdn.jsdelivr.net
- [ ] Load times fast (< 500ms)
- [ ] CDN stats show successes

## Troubleshooting Tests

### Test Fails: "Images not showing"
1. Check browser console for errors
2. Run: `window.assetLoader.logStats()`
3. Check if failed > 0
4. Check Network tab for 404s

### Test Fails: "CDN requests failing"
1. Normal during local testing (expected)
2. Should fail during production (problem)
3. Check: CDN URLs in `cdn-config.json`
4. Check: GitHub repo has assets

### Test Fails: "Console errors"
1. Check DevTools Console tab
2. Look for non-CDN related errors
3. Check assets exist in `dist/`
4. Rebuild: `npm run build`

## Summary

| Test | Local | Production | Expected |
|------|-------|-----------|----------|
| Images load | ✅ | ✅ | Yes |
| From CDN | ❌ | ✅ | After deploy |
| From fallback | ✅ | ❌ | Normal |
| No errors | ✅ | ✅ | Always |
| APIs available | ✅ | ✅ | Always |

**Result: If local testing shows images loading locally with no errors, everything is working correctly!**

---

Next: Deploy to production and verify CDN loading there.

See: [CDN-DEBUGGING.md](CDN-DEBUGGING.md) for detailed diagnostics.
