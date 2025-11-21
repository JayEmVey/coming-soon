# Deployment Checklist - CDN & Asset Loading

## Pre-Deployment

- [ ] Review CDN selection in AGENTS.md
- [ ] Verify `npm run build` works without errors
- [ ] Check that `dist/` folder is created with all files
- [ ] Verify `dist/js/asset-loader.js` exists
- [ ] Verify `dist/js/cdn-resolver.js` exists
- [ ] Verify `dist/cdn-config.json` exists
- [ ] Check that HTML files in `dist/` have injected scripts

## Verify Build Output

```bash
# Should show no errors
npm run build

# Check files were created
ls dist/js/asset-loader.js
ls dist/js/cdn-resolver.js
ls dist/cdn-config.json

# Verify scripts injected
grep -r "asset-loader.js" dist/index.html
grep -r "cdn-resolver.js" dist/index.html
grep -r "primaryCdn" dist/index.html
```

## Test Build Locally

```bash
npm run test
```

Visit http://localhost:8080 and check:
- [ ] Page loads without errors
- [ ] Images display correctly
- [ ] In DevTools console, run:
  ```javascript
  window.assetLoader.logStats()
  ```
- [ ] Should show stats (loaded count, failed count, etc.)
- [ ] Check which CDN is active:
  ```javascript
  console.log(window.CDN_CONFIG.primaryCdn)
  ```

## Test Different CDNs

```bash
# Test jsDelivr
npm run build:cdn-jsdelivr
npm run test
# Verify in console:
# window.CDN_CONFIG.primaryCdn should show "jsdelivr"

# Test GitHub
npm run build:cdn-github
npm run test
# Verify in console:
# window.CDN_CONFIG.primaryCdn should show "github"

# Back to Cloudflare (default)
npm run build
npm run test
```

## Pre-Deployment Testing

### Test Mobile
- [ ] Open site on mobile device
- [ ] Images load correctly
- [ ] No console errors
- [ ] Asset loader working (if you can check console)

### Test Desktop
- [ ] Open in Chrome
- [ ] Open in Firefox
- [ ] Open in Safari
- [ ] Check DevTools console for errors

### Test CDN Fallback
```javascript
// Disable primary CDN to test fallback
window.CDN_CONFIG.fallbackOrder = [];

// Reload page
location.reload();

// Site should still work, just using local assets
```

### Test Performance
```javascript
// Check loaded assets
window.assetLoader.getStats()
// Should show numbers for loaded, failed, pending

// Check CDN performance
window.cdnResolver.getStats()
// Should show metrics per CDN
```

## Deployment

### Step 1: Final Build
```bash
npm run build
```
Output should show:
```
✅ Build complete!
📦 Output: dist/
🌐 CDN: Cloudflare CDN
📊 Total size: X bytes
```

### Step 2: Deploy
```bash
npm run deploy
```

This will:
- ✓ Build with default CDN (Cloudflare)
- ✓ Validate SEO
- ✓ Copy static assets
- ✓ Create git commit
- ✓ Push to GitHub
- ✓ Site live in ~2 minutes

### Step 3: Verify Deployment
- [ ] Navigate to https://gate7.vn/
- [ ] Open DevTools console (F12)
- [ ] Run verification commands:

```javascript
// Check active CDN
console.log(window.CDN_CONFIG.primaryCdn)

// Check asset stats
window.assetLoader.logStats()

// Check CDN stats
window.cdnResolver.logStats()
```

## Post-Deployment

### Verify Site Works
- [ ] Home page loads (/)
- [ ] Menu page loads (/menu/)
- [ ] Hiring page loads (/hiring/)
- [ ] Images display correctly
- [ ] No 404 errors in console
- [ ] No broken asset references

### Check CDN Configuration
```javascript
// In browser console
console.log(window.CDN_CONFIG)
// Should show:
// {
//   primaryCdn: "cloudflare",
//   cdns: { ... },
//   fallbackOrder: ["cloudflare", "jsdelivr", "github"],
//   timeout: 5000,
//   retryAttempts: 2
// }
```

### Monitor Performance
```javascript
// Asset loading stats
window.assetLoader.logStats()

// CDN performance stats
window.cdnResolver.logStats()
```

## Switch CDN After Deployment

If you need to switch CDNs:

```bash
# Build with new CDN
npm run build:cdn-jsdelivr

# Deploy
npm run deploy

# Verify in browser
# window.CDN_CONFIG.primaryCdn should now show "jsdelivr"
```

## Rollback (If Issues)

If something goes wrong:

```bash
# Go back to Cloudflare
npm run build

# Redeploy
npm run deploy

# Verify
# window.CDN_CONFIG.primaryCdn should show "cloudflare"
```

## Production Verification

After deployment, verify these work:

### 1. CDN Configuration Injected
Check page source for:
```html
<script id="cdn-loader">
window.CDN_CONFIG = { ... }
```

### 2. Asset Loaders Injected
Check page source for (near end of file):
```html
<script defer src="js/cdn-resolver.js"></script>
<script defer src="js/asset-loader.js"></script>
```

### 3. Assets Loading from CDN
In browser console:
```javascript
// Check stats
window.assetLoader.logStats()

// Should show loaded assets from CDN
```

## Common Issues & Solutions

### Issue: Assets showing 404
**Solution:**
```javascript
// Check resolved URL
const url = await window.cdnResolver.resolveAsset('/images/logo.png')
console.log('Resolved to:', url)
```

### Issue: CDN Not Loading
**Solution:**
```javascript
// Check if CDN config is set
console.log(window.CDN_CONFIG)

// Check if resolver is available
console.log(window.cdnResolver)
```

### Issue: Fallback Not Working
**Solution:**
```javascript
// Force fallback test
window.CDN_CONFIG.fallbackOrder = ['github']
location.reload()
```

### Issue: Cache Causing Problems
**Solution:**
```javascript
// Clear cache
window.cdnResolver.clearCache()
location.reload()
```

## Monitoring

### Daily Check
```javascript
// In browser console
window.assetLoader.logStats()
window.cdnResolver.logStats()
```

### Verify CDN Performance
```javascript
const stats = window.cdnResolver.getStats()
console.table(stats.metrics)
// Should show success rates and response times
```

## Files to Reference

- **Build System**: `build-cdn.js`
- **Asset Loader**: `js/asset-loader.js`
- **CDN Resolver**: `js/cdn-resolver.js`
- **Config**: `cdn-config.json`
- **Documentation**: `CDN-SWITCHING.md`, `ASSET-LOADING.md`

## Success Criteria

✅ **Deployment is successful if:**
- [ ] Site loads without errors
- [ ] All images display correctly
- [ ] `window.CDN_CONFIG` is available
- [ ] `window.assetLoader` is available
- [ ] `window.cdnResolver` is available
- [ ] Asset loader stats show loaded assets
- [ ] CDN resolver stats show CDN metrics
- [ ] Mobile and desktop both work
- [ ] No 404 errors in console
- [ ] No script errors in console

## Quick Verification Commands

Copy and paste into browser console:

```javascript
// All checks
console.log('=== DEPLOYMENT VERIFICATION ===');
console.log('CDN Active:', window.CDN_CONFIG.primaryCdn);
console.log('Config loaded:', !!window.CDN_CONFIG);
console.log('Asset loader ready:', !!window.assetLoader);
console.log('CDN resolver ready:', !!window.cdnResolver);
console.log('');
console.log('Asset Statistics:');
window.assetLoader.logStats();
console.log('');
console.log('CDN Statistics:');
window.cdnResolver.logStats();
```

## Support

If issues arise:
1. Check console for errors: F12 → Console
2. Verify CDN config: `window.CDN_CONFIG`
3. Check asset stats: `window.assetLoader.logStats()`
4. Clear cache: `window.cdnResolver.clearCache()` then reload
5. Check documentation: `ASSET-LOADING.md` and `CDN-SWITCHING.md`

## Done!

Once all checks pass, your site is ready for production with:
- ✅ CDN asset loading
- ✅ Automatic fallback
- ✅ Performance caching
- ✅ Complete monitoring
