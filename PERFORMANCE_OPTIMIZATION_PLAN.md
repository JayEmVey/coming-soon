# Performance Optimization Plan for Gate 7 Coffee

Comprehensive performance improvement strategy based on latest 2025 best practices and Core Web Vitals requirements.

## Current Status

Your website is built with:
- ✅ Zero-dependency build system
- ✅ HTML/CSS/JS minification
- ✅ 28-30% reduction in file sizes
- ✅ Gzip compression via .htaccess
- ✅ Browser caching (30-day TTL)
- ✅ Static site on GitHub Pages CDN

## Performance Metrics to Monitor (Core Web Vitals)

### 1. Largest Contentful Paint (LCP)
**Target:** < 2.5 seconds (Good)  
**Current:** Likely 1-2 seconds (optimized already)

**Optimization strategies:**
- ✅ Minified assets (already done)
- ✅ CDN delivery via GitHub Pages (already done)
- Preload critical images
- Lazy-load below-fold images

### 2. Interaction to Next Paint (INP)
**Target:** < 200 milliseconds  
**Current:** Likely < 100ms (vanilla JS, no frameworks)

**Optimization strategies:**
- ✅ Vanilla JavaScript (no framework bloat)
- Minimize JavaScript execution time
- Defer non-critical scripts
- Reduce event listener overhead

### 3. Cumulative Layout Shift (CLS)
**Target:** < 0.1 (Good)  
**Current:** Likely 0 (static content)

**Optimization strategies:**
- ✅ Static content (no dynamic shifts)
- Reserve space for images
- Avoid font loading shifts
- No ads or popups causing shifts

---

## Quick Wins (Implement First)

### 1. Image Optimization (15 minutes)

**Current:** Images copied as-is  
**Improvement:** Convert to next-gen formats

**Action:**
```bash
# Install ImageMagick or use online tool
# Convert PNG/JPG to WebP
convert logo.png -quality 80 logo.webp
convert menu.png -quality 80 menu.webp

# Or use browser-based tool:
# https://cloudconvert.com/png-to-webp
```

**Expected Improvement:** 30-50% file size reduction

**Update HTML:**
```html
<!-- Before -->
<img src="/images/logo.png" alt="Logo">

<!-- After -->
<picture>
  <source srcset="/images/logo.webp" type="image/webp">
  <img src="/images/logo.png" alt="Logo">
</picture>
```

### 2. Lazy-Load Non-Critical Images (10 minutes)

**Action:**
```html
<!-- Add loading="lazy" to below-fold images -->
<img src="/images/menu-detail.png" alt="Menu" loading="lazy">
```

**Expected Improvement:** Faster initial page load

### 3. Preload Critical Assets (5 minutes)

**Add to `<head>`:**
```html
<link rel="preload" as="image" href="/images/logo-color-black-bg1.png">
<link rel="preload" as="font" href="fonts/your-font.woff2" type="font/woff2" crossorigin>
<link rel="preload" as="style" href="/css/style-gate7.css">
```

**Expected Improvement:** 100-200ms faster critical path

### 4. Font Optimization (10 minutes)

**Current:** Using Google Fonts (external request)

**Improvement Options:**

**Option A - Self-host fonts:**
```bash
# Download font files from Google Fonts
# Place in /fonts directory
# Update CSS:
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;  /* Prevent FOUT */
}
```

**Option B - Use font-display property:**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
```

**Expected Improvement:** 100-300ms faster font loading

---

## Medium-Priority Optimizations

### 5. CSS Code Splitting (20 minutes)

Current: Single stylesheet loaded for all pages

Improvement: Split CSS by page

**Create:**
- `css/style-global.css` - Common styles
- `css/style-index.css` - Home page specific
- `css/style-menu.css` - Menu page specific
- `css/style-music.css` - Music page specific
- `css/style-hiring.css` - Hiring page specific

**Update build script:**
```javascript
// In build-with-protection.js
// Only include relevant CSS for each page
if (file.src.includes('menu/index.html')) {
  injectCSS(content, ['style-global.css', 'style-menu.css']);
}
```

**Expected Improvement:** 10-20% smaller per-page CSS load

### 6. JavaScript Deferring (15 minutes)

**Action:** Defer non-critical JavaScript

**Current:**
```html
<script src="/js/script.js"></script>
```

**Improved:**
```html
<!-- Critical (head) -->
<script src="/js/critical.js"></script>

<!-- Defer non-critical -->
<script defer src="/js/analytics.js"></script>
<script defer src="/js/language-switcher.js"></script>

<!-- Load on interaction -->
<script>
document.addEventListener('click', () => {
  loadScript('/js/interactive.js');
});
</script>
```

**Expected Improvement:** 50-100ms faster Time to Interactive

### 7. Service Worker for Offline Support (30 minutes)

Create `service-worker.js`:
```javascript
const CACHE_NAME = 'gate7-v1';
const urlsToCache = [
  '/',
  '/menu/',
  '/music/spotify.html',
  '/hiring/',
  '/css/style-gate7.css',
  '/images/logo-color-black-bg1.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
```

Register in `index.html`:
```javascript
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}
```

**Expected Improvement:** Offline access, faster repeat visits

---

## Advanced Optimizations

### 8. Image Responsive Sizes (20 minutes)

Serve different image sizes for different devices:

```html
<picture>
  <source media="(max-width: 480px)" 
          srcset="/images/logo-small.webp">
  <source media="(max-width: 768px)" 
          srcset="/images/logo-medium.webp">
  <source media="(min-width: 769px)" 
          srcset="/images/logo-large.webp">
  <img src="/images/logo-large.webp" alt="Logo">
</picture>
```

**Expected Improvement:** 20-40% smaller images on mobile

### 9. Critical CSS Inlining (25 minutes)

Inline above-fold CSS in `<head>`:

```html
<style>
  /* Critical styles for above-fold content */
  body { color: #0B0C06; background: #fff; }
  .header { display: flex; margin: 0; padding: 1rem; }
  h1 { font-size: 2rem; color: #C17817; }
</style>

<!-- Defer non-critical CSS -->
<link rel="preload" as="style" href="/css/style-gate7.css">
<noscript><link rel="stylesheet" href="/css/style-gate7.css"></noscript>
```

**Expected Improvement:** 200-300ms faster First Contentful Paint

### 10. HTTP/2 Server Push (10 minutes)

In `.htaccess`:
```apache
# Push critical resources
<FilesMatch "index.html">
  Header add Link "</css/style-gate7.css>; rel=preload; as=style"
  Header add Link "</images/logo-color-black-bg1.png>; rel=preload; as=image"
</FilesMatch>
```

**Expected Improvement:** Parallel resource loading

---

## Performance Monitoring

### 1. Set Up Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://gate7.vn`
3. Verify ownership via DNS CNAME (already configured)
4. Review Core Web Vitals report
5. Track performance over time

### 2. Set Up PageSpeed Insights Monitoring

Monthly checks:
```
https://pagespeed.web.dev/analysis/https-gate7-vn
```

Track scores:
- Desktop Performance Score
- Mobile Performance Score
- Core Web Vitals (LCP, INP, CLS)

### 3. Add Performance Budgets

In build script (`build-simple.js`), add size limits:

```javascript
const PERFORMANCE_BUDGET = {
  js: 100 * 1024,      // 100 KB
  css: 50 * 1024,      // 50 KB
  images: 500 * 1024,  // 500 KB
  html: 200 * 1024     // 200 KB
};

function checkBudget(file, size) {
  if (size > PERFORMANCE_BUDGET[type]) {
    console.warn(`⚠️ ${file} exceeds budget!`);
  }
}
```

---

## Implementation Roadmap

### Phase 1: Quick Wins (This Week)
- [ ] Image WebP conversion
- [ ] Lazy-load attributes
- [ ] Preload critical assets
- [ ] Font optimization
- **Expected improvement:** 10-15% faster

### Phase 2: Medium Improvements (Next 2 Weeks)
- [ ] CSS code splitting
- [ ] JavaScript deferring
- [ ] Service worker
- [ ] Responsive images
- **Expected improvement:** 20-25% faster

### Phase 3: Advanced (Month 2)
- [ ] Critical CSS inlining
- [ ] HTTP/2 Server Push
- [ ] Performance monitoring
- [ ] Continuous optimization
- **Expected improvement:** 30-40% faster total

---

## Specific Actions for Your Stack

### Build Script Enhancement

Create `build-performance.js`:

```javascript
const fs = require('fs');
const path = require('path');

function optimizeImages() {
  console.log('🖼️  Optimizing images...');
  
  const imageDir = path.join(__dirname, 'images');
  const files = fs.readdirSync(imageDir);
  
  files.forEach(file => {
    if (file.endsWith('.png') || file.endsWith('.jpg')) {
      console.log(`Converting ${file} to WebP...`);
      // Note: Requires ImageMagick or similar
      // execSync(`convert ${file} -quality 80 ${file}.webp`);
    }
  });
}

function inlineCSS(htmlContent) {
  // Extract critical CSS
  const criticalCSS = `
    body { margin: 0; padding: 0; }
    .header { display: flex; }
    h1 { font-size: 2rem; }
  `;
  
  return htmlContent.replace(
    '</head>',
    `<style>${criticalCSS}</style></head>`
  );
}

module.exports = { optimizeImages, inlineCSS };
```

### Add npm Scripts

In `package.json`:

```json
{
  "scripts": {
    "build": "node build-simple.js",
    "build:protect": "node build-with-protection.js --protect",
    "build:perf": "node build-simple.js && npm run optimize",
    "optimize": "node scripts/optimize-images.js",
    "measure": "node scripts/measure-performance.js"
  }
}
```

---

## Performance Targets

### Current (Estimated)
- Desktop Performance: 85-90 (good)
- Mobile Performance: 80-85 (good)
- LCP: 1.5-2 seconds
- INP: 50-100ms
- CLS: 0-0.05

### After Phase 1 (Week 1)
- Desktop: 92-95
- Mobile: 88-92
- LCP: 1-1.5 seconds (-25%)
- INP: 30-50ms (-50%)
- CLS: 0

### After Phase 2 (Week 3)
- Desktop: 95-98
- Mobile: 93-96
- LCP: 0.8-1.2 seconds (-50% total)
- INP: 20-40ms (-70% total)
- CLS: 0

### After Phase 3 (Month 2)
- Desktop: 98-100
- Mobile: 96-99
- LCP: 0.5-0.8 seconds (-65% total)
- INP: 10-30ms (-80% total)
- CLS: 0

---

## Monitoring & Continuous Improvement

### Weekly Checks
```bash
# Test locally
npm run build
cd dist
python -m http.server 8000
# Open http://localhost:8000
# Press F12 → Lighthouse → Analyze page load
```

### Monthly Reports
1. Go to PageSpeed Insights
2. Test both desktop and mobile
3. Log scores in spreadsheet
4. Identify new opportunities
5. Prioritize next improvements

### Tools to Use

| Tool | Purpose | Cost |
|------|---------|------|
| [PageSpeed Insights](https://pagespeed.web.dev) | Official Google tool | Free |
| [WebPageTest](https://www.webpagetest.org) | Detailed analysis | Free |
| [GTmetrix](https://gtmetrix.com) | Performance tracking | Free tier |
| [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) | Automated testing | Free |

---

## Common Performance Pitfalls to Avoid

❌ **Don't:**
- Use oversized images
- Load all CSS/JS upfront
- Include unused libraries
- Trust only synthetic tests
- Ignore mobile performance

✅ **Do:**
- Compress images (WebP, AVIF)
- Lazy-load non-critical resources
- Minify and split code
- Monitor real user metrics
- Test on real devices

---

## Quick Commands

```bash
# Build and measure
npm run build
npm run measure

# Test locally with slow network
# DevTools → Network → Throttle (3G/4G)

# Check Google Search Console
# https://search.google.com/search-console/

# Run PageSpeed Insights
# https://pagespeed.web.dev/analysis/https-gate7-vn
```

---

## Success Metrics

Track these metrics weekly:

| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| Desktop Score | ~88 | 98+ | ⏳ |
| Mobile Score | ~82 | 95+ | ⏳ |
| LCP | ~1.8s | <0.8s | ⏳ |
| INP | ~80ms | <30ms | ⏳ |
| CLS | ~0 | <0.1 | ✅ |
| Page Load | ~2s | <1s | ⏳ |

---

## Next Steps

1. **This Week:**
   - [ ] Convert images to WebP
   - [ ] Add loading="lazy" to images
   - [ ] Implement preload tags
   - [ ] Optimize fonts

2. **Next Week:**
   - [ ] Split CSS by page
   - [ ] Defer JavaScript
   - [ ] Create service worker
   - [ ] Test performance

3. **Week 3:**
   - [ ] Inline critical CSS
   - [ ] Monitor Search Console
   - [ ] Setup PageSpeed tracking
   - [ ] Document improvements

4. **Ongoing:**
   - [ ] Monthly PageSpeed audits
   - [ ] Real user monitoring
   - [ ] Keep dependencies updated
   - [ ] Test on real devices

---

## Resources

- [Google Web Vitals](https://web.dev/articles/vitals)
- [PageSpeed Insights Guide](https://pagespeed.web.dev)
- [Web.dev Performance](https://web.dev/performance/)
- [MDN Web Performance](https://developer.mozilla.org/en-US/docs/Web/Performance)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance)

---

**Status:** Ready to Implement  
**Priority:** High (Performance impacts SEO and conversions)  
**Estimated Time:** 2-3 weeks for full optimization

**Start with Phase 1 for quick wins, then progress through phases systematically.**
