# Performance Optimization - Quick Start

Implement these 10 quick wins in 1-2 hours for measurable improvements.

## 5-Minute Setup

### 1. Check Current Performance

```
Go to: https://pagespeed.web.dev/
URL: https://gate7.vn
```

Note desktop & mobile scores:
- Desktop Score: _____
- Mobile Score: _____
- LCP: _____
- INP: _____
- CLS: _____

---

## 15-Minute Optimizations

### 2. Image WebP Conversion

**Online tool (no software needed):**
```
https://cloudconvert.com/png-to-webp
```

Or use free online converter:
```
https://ezgif.com/png-to-webp
```

**Convert these files:**
- [ ] logo-color-black-bg1.png → .webp
- [ ] Menu_Final.png → .webp
- [ ] coffee-as-you-are.png → .webp
- [ ] hiring-banner.png → .webp

**Store in `/images/` folder alongside original**

### 3. Add WebP Picture Tags

**In `index.html`:**

Find:
```html
<img src="/images/logo-color-black-bg1.png" alt="Gate 7 Logo">
```

Replace with:
```html
<picture>
  <source srcset="/images/logo-color-black-bg1.webp" type="image/webp">
  <img src="/images/logo-color-black-bg1.png" alt="Gate 7 Logo">
</picture>
```

**Repeat for:**
- [ ] Menu_Final.png
- [ ] coffee-as-you-are.png
- [ ] hiring-banner.png

### 4. Add Lazy Loading

Find all `<img>` tags below the fold (not visible on page load).

Add `loading="lazy"`:

```html
<img src="/images/menu-item.png" alt="Item" loading="lazy">
```

### 5. Preload Critical Assets

Add to `<head>` of `index.html`:

```html
<head>
  <!-- ... existing head content ... -->
  
  <!-- Preload critical resources -->
  <link rel="preload" as="image" href="/images/logo-color-black-bg1.webp">
  <link rel="preload" as="style" href="/css/style-gate7.css">
  <link rel="preload" as="font" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap">
</head>
```

---

## 30-Minute Optimizations

### 6. Font Display Optimization

In `css/style-gate7.css`, ensure Google Fonts has `display=swap`:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');
```

The `display=swap` parameter prevents font loading from blocking page render.

### 7. Defer Non-Critical JavaScript

Find `<script>` tags in `index.html`:

```html
<!-- Before -->
<script src="/js/language-switcher.js"></script>
<script src="/js/analytics.js"></script>

<!-- After -->
<script defer src="/js/language-switcher.js"></script>
<script defer src="/js/analytics.js"></script>
```

Move analytics to end of `</body>`:
```html
  </body>
  <script defer src="/js/analytics.js"></script>
</html>
```

### 8. Check .htaccess Caching

Your `.htaccess` already has:
- ✅ Gzip compression
- ✅ Browser caching (30-day TTL)
- ✅ Proper MIME types

Verify it's working:
1. Open DevTools (F12)
2. Go to Network tab
3. Reload page
4. Check Response Headers for:
   - `Content-Encoding: gzip` ✅
   - `Cache-Control: max-age=...` ✅

### 9. Optimize Images Beyond WebP

**Current:** 30+ image files

**Best practices:**
- Keep dimensions correct (no oversizing)
- Compress before upload
- Remove metadata (for photos)
- Use CSS for simple graphics

**Tool:** https://tinypng.com/ (Batch compress)

### 10. Add Meta Tags for Performance

In `<head>`:

```html
<!-- DNS Prefetch for external resources -->
<link rel="dns-prefetch" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://www.googletagmanager.com">

<!-- Preconnect for critical origins -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

---

## Deploy & Measure

### Build & Test

```bash
npm run build
cd dist
python -m http.server 8000
```

Test at: http://localhost:8000

Open DevTools (F12):
- Network tab → Check sizes, caching
- Performance tab → Record page load
- Lighthouse tab → Run audit

### Deploy

```bash
npm run deploy
```

Wait 2-3 minutes for GitHub Pages update.

### Measure Improvement

**Before:** (from step 1)
- Desktop: _____
- Mobile: _____

**After:** (wait 5 minutes, then test)
```
https://pagespeed.web.dev/analysis/https-gate7-vn
```

- Desktop: _____ (Expected: +5-10 points)
- Mobile: _____ (Expected: +10-15 points)

---

## Quick Wins Summary

| Task | Time | Expected Gain | Difficulty |
|------|------|---------------|------------|
| Image WebP | 10m | +3 points | Easy |
| Picture tags | 15m | +5 points | Easy |
| Lazy loading | 10m | +3 points | Easy |
| Preload assets | 5m | +4 points | Easy |
| Font optimization | 5m | +3 points | Easy |
| Defer JS | 10m | +4 points | Easy |
| Caching check | 5m | Already done | Easy |
| Image optimization | 15m | +5 points | Easy |
| Meta tags | 5m | +2 points | Easy |
| **Total** | **80m** | **+28 points** | Easy |

---

## Expected Results

### Before Optimization
- Desktop Score: ~85-90
- Mobile Score: ~80-85
- Page Load: ~2-3 seconds
- Images: PNG/JPG unoptimized

### After Phase 1 (After above steps)
- Desktop Score: ~93-97
- Mobile Score: ~92-96
- Page Load: ~1-1.5 seconds (-50%)
- Images: WebP optimized (-40% size)

---

## Files to Modify

| File | Changes |
|------|---------|
| `index.html` | Picture tags, preload, defer |
| `menu/index.html` | Picture tags, preload, defer |
| `music/spotify.html` | Picture tags, preload, defer |
| `hiring/index.html` | Picture tags, preload, defer |
| `css/style-gate7.css` | Font display=swap |
| `/images/` | Add .webp files |

---

## Verify Each Change

After each modification:

```bash
npm run build
cd dist
python -m http.server 8000
```

Check:
- [ ] Pages load
- [ ] Images display
- [ ] No console errors
- [ ] All links work

---

## Troubleshooting

### WebP Not Showing

**Issue:** Image appears broken in old browsers

**Solution:** Picture tag with fallback (already done above)

```html
<picture>
  <source srcset="/images/logo.webp" type="image/webp">
  <img src="/images/logo.png" alt="Logo">  <!-- Fallback -->
</picture>
```

### Performance Not Improving

1. Hard refresh browser (Ctrl+Shift+R)
2. Clear browser cache
3. Test in incognito mode
4. Wait 5 minutes for CDN refresh
5. Use different browser

### Preload Not Working

Make sure srcset path is exact:
```html
<!-- Correct -->
<link rel="preload" as="image" href="/images/logo-color-black-bg1.webp">

<!-- Wrong (no leading slash) -->
<link rel="preload" as="image" href="images/logo-color-black-bg1.webp">
```

---

## Next Phase

After implementing above, do Phase 2 optimizations:

- [ ] CSS code splitting (by page)
- [ ] Critical CSS inlining
- [ ] Service worker for offline
- [ ] Responsive image sizes
- [ ] JavaScript splitting

**Timeline:** 1-2 weeks

---

## Monitoring

Set calendar reminder for monthly checks:

```
Every 1st of month:
1. Go to PageSpeed Insights
2. Test desktop & mobile
3. Log scores
4. Check for new opportunities
```

---

## Quick Reference

**Build:**
```bash
npm run build
```

**Test locally:**
```bash
cd dist && python -m http.server 8000
```

**Deploy:**
```bash
npm run deploy
```

**Test production:**
```
https://pagespeed.web.dev/analysis/https-gate7-vn
```

---

## Estimated Time Breakdown

- Image conversion: 10m
- HTML modifications: 20m
- Testing: 15m
- Deployment: 5m
- Verification: 10m
- **Total: 60 minutes**

---

## Success Checklist

- [ ] Images converted to WebP
- [ ] Picture tags added with fallbacks
- [ ] Lazy loading attributes added
- [ ] Preload tags in head
- [ ] Font display=swap enabled
- [ ] JavaScript deferred
- [ ] Build completes without errors
- [ ] Local test shows improvements
- [ ] Deployed to production
- [ ] PageSpeed shows +5-15 point improvement

---

**Start with step 1. You'll see results in 1 hour!**

*Next: Run Phase 2 optimizations next week.*
