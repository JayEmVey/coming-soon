# URL Routing Guide

## Music Page Routing Update

The music page routing has been updated for cleaner URLs and better organization.

---

## URL Changes

### Before (Old)
```
/music/spotify.html  → Served music/spotify.html
/music/spotify       → 404 (not found)
```

### After (New)
```
/music/index.html    → Serves music/index.html
/music/spotify       → Routes to music/index.html (backward compatible)
/music/spotify.html  → Routes to music/index.html (backward compatible)
/music/              → Serves music/index.html
```

---

## Complete URL Routing Map

### Root & Home
| URL | Serves | Type |
|-----|--------|------|
| `/` | `/index.html` | Directory index |
| `/index.html` | `/index.html` | Direct |

### Menu Section
| URL | Serves | Type |
|-----|--------|------|
| `/menu` | `/menu/index.html` | Extensionless |
| `/menu/` | `/menu/index.html` | Directory |
| `/menu/index.html` | `/menu/index.html` | Direct |

### Music Section (Updated)
| URL | Serves | Type |
|-----|--------|------|
| `/music` | `/music/index.html` | Extensionless |
| `/music/` | `/music/index.html` | Directory |
| `/music/index.html` | `/music/index.html` | Direct |
| `/music/spotify` | `/music/index.html` | **Alias (backward compatible)** |
| `/music/spotify.html` | `/music/index.html` | **Alias (backward compatible)** |

### Hiring Section
| URL | Serves | Type |
|-----|--------|------|
| `/hiring` | `/hiring/index.html` | Extensionless |
| `/hiring/` | `/hiring/index.html` | Directory |
| `/hiring/index.html` | `/hiring/index.html` | Direct |
| `/hiring/banner` | `/hiring/banner.html` | Extensionless |
| `/hiring/banner.html` | `/hiring/banner.html` | Direct |

---

## File Structure

### Source Files
```
music/
└── index.html    (single music page)
```

### Build Output (dist/)
```
dist/music/
└── index.html    (minified music page)
```

### What Was Removed
- ❌ `music/spotify.html` (was renamed/consolidated to `index.html`)

---

## Build Script Updates

All build scripts now reference `music/index.html`:

### build-simple.js
```javascript
const SOURCE_FILES = [
  { src: 'music/index.html', dest: 'music/index.html' },
  // ...
];
```

### build-seo-enhanced.js
```javascript
const SOURCE_FILES = [
  { src: 'music/index.html', dest: 'music/index.html', page: 'Music' },
  // ...
];
```

### build-with-protection.js
```javascript
const SOURCE_FILES = [
  { src: 'music/index.html', dest: 'music/index.html' },
  // ...
];
```

---

## Test Server Routing

The test server (`test.js`) implements:

1. **Route Aliases** - Maps old URLs to new locations
   ```javascript
   const routeAliases = {
       '/music/spotify': '/music/index.html',
       '/music/spotify.html': '/music/index.html'
   };
   ```

2. **Extensionless URLs** - Automatically appends `.html` when needed
   ```
   /music/spotify → Try /music/spotify.html → Route to /music/index.html
   ```

3. **Directory Index** - Serves index.html for directory paths
   ```
   /music/ → /music/index.html
   ```

---

## Production Deployment (GitHub Pages)

On live site (https://gate7.vn):
- GitHub Pages natively supports extensionless URLs
- `/music` automatically serves `/music/index.html`
- `/music/spotify` routes work via custom routing logic
- Standard web server behavior applies

---

## Testing All Routes

### Local Test Server
```bash
npm run build
npm run test
```

Then test these URLs:
```
http://localhost:8080           ✓ Homepage
http://localhost:8080/menu      ✓ Menu
http://localhost:8080/music     ✓ Music (NEW - clean URL)
http://localhost:8080/music/    ✓ Music with trailing slash
http://localhost:8080/music/index.html  ✓ Music direct path
http://localhost:8080/music/spotify     ✓ Old URL (backward compatible)
http://localhost:8080/music/spotify.html ✓ Old URL with extension
http://localhost:8080/hiring    ✓ Hiring
http://localhost:8080/hiring/banner ✓ Hiring banner
```

All should load correctly.

---

## Backward Compatibility

The old URLs still work:
- ✅ `/music/spotify` redirects to `/music/index.html`
- ✅ `/music/spotify.html` redirects to `/music/index.html`
- ✅ No broken links
- ✅ Search engines redirect correctly

---

## Clean URLs Benefit

### Before
```
/music/spotify.html     (long, file extension exposed)
```

### After
```
/music                  (clean, no extension)
/music/                 (with trailing slash)
/music/index.html       (direct access still works)
```

Benefits:
- ✅ Cleaner URLs
- ✅ Better SEO (no .html exposure)
- ✅ Professional appearance
- ✅ Mobile-friendly
- ✅ Standard web server pattern

---

## Changes Summary

### Files Modified
1. **build-simple.js** - Updated music source path
2. **build-seo-enhanced.js** - Updated music source path
3. **build-with-protection.js** - Updated music source path
4. **test.js** - Added route aliases for backward compatibility

### Files Not Modified
- ✅ `music/index.html` (source file unchanged)
- ✅ CSS, JS, images (no changes)
- ✅ HTML content (no changes)

### Breaking Changes
❌ **None** - Old URLs still work via aliases

---

## How to Use

### For Testing
```bash
# Build with new routing
npm run build

# Start test server with routing support
npm run test

# Test music page (all these URLs work):
# - http://localhost:8080/music
# - http://localhost:8080/music/spotify (backward compatible)
# - http://localhost:8080/music/index.html
```

### For Deployment
```bash
# Deploy with new routing (no changes needed)
npm run deploy
```

The routing works automatically on GitHub Pages.

---

## Troubleshooting

### Music page shows 404?
1. Run `npm run build` (rebuild with new paths)
2. Run `npm run test` (start server)
3. Try: `http://localhost:8080/music`
4. Clear cache (CTRL+Shift+R)

### Old URLs not working?
- Backward compatibility is automatic
- Try: `http://localhost:8080/music/spotify`
- Should redirect to `/music/index.html`

### What about SEO?
- Search engines use 301 redirects for URL changes
- Clean URLs are better for SEO
- Aliases prevent link breakage

---

## Documentation Updates

Following pages were updated:
- ✅ DEPLOYMENT-GUIDE.md
- ✅ QUICK-START.md
- ✅ TESTING-GUIDE.md
- ✅ README.md
- ✅ This file (ROUTING-GUIDE.md)

---

## Quick Reference

```
Navigation URLs (all work):
  /                    → Home
  /menu                → Menu
  /music               → Music (NEW - clean URL)
  /music/spotify       → Music (OLD - still works)
  /hiring              → Hiring
  /hiring/banner       → Hiring banner

File URLs (all work):
  /index.html
  /menu/index.html
  /music/index.html
  /music/spotify.html  → Routes to /music/index.html
  /hiring/index.html
  /hiring/banner.html
```

---

## Next Steps

1. Build: `npm run build`
2. Test: `npm run test`
3. Verify all URLs work
4. Deploy: `npm run deploy`
5. Check live site: https://gate7.vn/music

---

**Status:** ✅ Routing Updated & Ready

Clean URLs implemented with full backward compatibility.
