# Phase 2: Medium-Priority Optimizations Checklist

**Timeline:** 1-2 weeks after Phase 1  
**Expected Improvement:** +15-25 points additional  
**Total Time:** 5-8 hours

---

## 🎯 Phase 2 Overview

Phase 2 focuses on strategic code splitting and offline capability, targeting:
- 10-20% reduction in CSS per page
- Faster Time to Interactive (TTI)
- Offline support
- Responsive image delivery

---

## ☑️ 1. CSS Code Splitting (20 minutes)

### Current State
- Single stylesheet loaded for all pages: `css/style-gate7.css`
- All pages load 100% of CSS even if not needed

### Goal
Split CSS into:
- `css/style-global.css` - Common styles (header, footer, etc.)
- `css/style-index.css` - Home page specific
- `css/style-menu.css` - Menu page specific
- `css/style-hiring.css` - Hiring page specific

### Tasks

#### Step 1: Analyze Current CSS
- [ ] Open `css/style-gate7.css`
- [ ] Identify global styles (resets, variables, common components)
- [ ] Identify page-specific styles (menu grid, hiring form, etc.)

#### Step 2: Create Global CSS
```bash
# Copy header/footer/common styles to:
css/style-global.css
```

**What goes in style-global.css:**
- CSS reset/variables (:root)
- Body and universal styles
- Header/footer styles
- Animations and keyframes
- Typography (fonts, sizes)

#### Step 3: Create Page-Specific CSS Files
```bash
css/style-index.css      # Logo container, main content, scroll indicator
css/style-menu.css       # Menu grid, menu-item styles, pricing
css/style-hiring.css     # Form styles, sections specific to hiring
css/style-music.css      # (if music page exists) Music player styles
```

#### Step 4: Update HTML Files
```html
<!-- index.html -->
<link rel="stylesheet" href="css/style-global.css">
<link rel="stylesheet" href="css/style-index.css">

<!-- menu/index.html -->
<link rel="stylesheet" href="../css/style-global.css">
<link rel="stylesheet" href="../css/style-menu.css">

<!-- hiring/index.html -->
<link rel="stylesheet" href="../css/style-global.css">
<link rel="stylesheet" href="../css/style-hiring.css">
```

#### Step 5: Update Build Script
Edit `build-simple.js` to conditionally include CSS:

```javascript
function injectCSS(content, page) {
    let cssLinks = '<link rel="stylesheet" href="/css/style-global.css">\n';
    
    if (page.includes('menu')) {
        cssLinks += '<link rel="stylesheet" href="/css/style-menu.css">';
    } else if (page.includes('hiring')) {
        cssLinks += '<link rel="stylesheet" href="/css/style-hiring.css">';
    } else if (page === 'index.html') {
        cssLinks += '<link rel="stylesheet" href="/css/style-index.css">';
    }
    
    return content.replace('</head>', cssLinks + '</head>');
}
```

#### Step 6: Test & Verify
```bash
npm run build
# Verify each page loads in dist/
# Check DevTools Network tab to see CSS sizes
# Confirm styling looks correct on each page
```

### Verification Checklist
- [ ] All pages look identical to before
- [ ] CSS file sizes reduced
- [ ] No missing styles
- [ ] Build completes without errors
- [ ] Browser console has no 404 errors for CSS

---

## ☑️ 2. JavaScript Code Splitting (15 minutes)

### Current State
- All JavaScript in one `<script>` tag at end of HTML
- Loads analytics, language switcher, scroll animations for all pages

### Goal
Split JavaScript into:
- Critical: Page initialization
- Async/Defer: Analytics and non-critical features
- Load-on-interaction: Advanced features

### Tasks

#### Step 1: Identify Script Functions
Analyze current script in index.html:

**Critical (keep in head):**
- DOMContentLoaded event listeners
- Page initialization

**Defer (can load asynchronously):**
- Google Analytics (gtag) - already using `async` ✅
- Language switcher
- Scroll animations (Intersection Observer)

#### Step 2: Create Separate Script Files
```bash
# Create new files:
js/critical.js           # Page initialization
js/language.js           # Language switcher
js/analytics.js          # Google Analytics wrapper
js/scroll-animations.js  # Intersection Observer
js/interactions.js       # Click/hover listeners
```

#### Step 3: Split Code

**js/critical.js** - Move to <head>, don't defer:
```javascript
// Smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Page initialization
document.addEventListener('DOMContentLoaded', function() {
    // Essential setup
});
```

**js/language.js** - Add defer:
```javascript
document.addEventListener('DOMContentLoaded', function() {
    const langBtns = document.querySelectorAll('.lang-btn');
    // Language switcher logic
});
```

**js/scroll-animations.js** - Add defer:
```javascript
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer setup
});
```

#### Step 4: Update HTML

```html
<!-- In <head> -->
<script src="js/critical.js"></script>

<!-- Before </body> -->
<script defer src="js/language.js"></script>
<script defer src="js/scroll-animations.js"></script>

<!-- Or load on interaction -->
<script>
document.addEventListener('click', function() {
    if (!window.interactiveLoaded) {
        const script = document.createElement('script');
        script.src = 'js/interactions.js';
        document.body.appendChild(script);
        window.interactiveLoaded = true;
    }
}, { once: true });
</script>
```

#### Step 5: Test Functionality
- [ ] All pages load without errors
- [ ] Language switcher works
- [ ] Scroll animations work
- [ ] Analytics tracking works
- [ ] No console errors

---

## ☑️ 3. Service Worker Setup (30 minutes)

### What is it?
A script that runs in the background, enabling offline access and faster repeat visits.

### Tasks

#### Step 1: Create Service Worker File
Create `/service-worker.js`:

```javascript
const CACHE_NAME = 'gate7-v1';
const urlsToCache = [
    '/',
    '/css/style-global.css',
    '/images/logo-color-black-bg1.png',
    '/menu/',
    '/hiring/',
];

// Install event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
    self.skipWaiting();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request).then(response => {
                // Cache new requests
                if (event.request.method === 'GET') {
                    const cache = caches.open(CACHE_NAME);
                    cache.then(c => c.put(event.request, response));
                }
                return response;
            });
        })
    );
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});
```

#### Step 2: Register Service Worker
Add to all HTML files (in <head> or <body>):

```html
<script>
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(reg => console.log('SW registered'))
            .catch(err => console.log('SW registration failed:', err));
    });
}
</script>
```

#### Step 3: Test Offline Functionality
- [ ] Deploy service worker
- [ ] Open site in Chrome DevTools
- [ ] Application > Service Workers > Offline
- [ ] Navigate to different pages - should work offline
- [ ] Check storage shows cached files

---

## ☑️ 4. Responsive Images (20 minutes)

### Current State
Same image size served to all devices (desktop, tablet, mobile)

### Goal
Serve optimized image sizes:
- Mobile: 480px width
- Tablet: 768px width
- Desktop: 1200px+ width

### Tasks

#### Step 1: Identify Images to Optimize
Main candidates:
- `images/logo-color-black-bg1.png` (LCP image)
- `images/coffee-as-you-are.png`
- `images/Menu_Final.png` (if used)

#### Step 2: Create Responsive Picture Elements
```html
<!-- Example: Logo -->
<picture>
    <source media="(max-width: 480px)" srcset="images/logo-small.webp" type="image/webp">
    <source media="(max-width: 768px)" srcset="images/logo-medium.webp" type="image/webp">
    <source media="(min-width: 769px)" srcset="images/logo-large.webp" type="image/webp">
    <img src="images/logo-color-black-bg1.png" alt="Logo" class="logo">
</picture>
```

**Note:** Without ImageMagick/ffmpeg, you can:
- Use [Squoosh.app](https://squoosh.app/) online tool
- Use [TinyPNG](https://tinypng.com/) for compression
- Create mobile-optimized versions

#### Step 3: Add Srcset for Retina Display
```html
<picture>
    <source media="(max-width: 480px)" 
            srcset="images/logo-mobile.webp 1x, images/logo-mobile@2x.webp 2x"
            type="image/webp">
    <img src="images/logo-color-black-bg1.png" alt="Logo">
</picture>
```

#### Step 4: Test Responsive Images
- [ ] DevTools Device Toolbar - test different sizes
- [ ] Network tab shows correct image loading
- [ ] Image quality looks good on mobile & desktop

---

## ☑️ 5. Cache Headers Optimization (15 minutes)

### Current State
30-day TTL via `.htaccess` ✅

### Enhancement
Add more specific caching strategies:

#### Update .htaccess
```apache
# Cache CSS/JS for 1 year (versioned)
<FilesMatch "\.(css|js|woff2)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
</FilesMatch>

# Cache images for 1 year
<FilesMatch "\.(jpg|jpeg|png|gif|ico|webp)$">
    Header set Cache-Control "public, max-age=31536000"
</FilesMatch>

# Don't cache HTML (check for updates)
<FilesMatch "\.html?$">
    Header set Cache-Control "public, max-age=3600, must-revalidate"
</FilesMatch>

# Enable gzip
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>
```

#### Verify Caching
- [ ] DevTools Network tab
- [ ] Check "Size" column shows "from cache" for static assets
- [ ] Reload page - should serve from cache

---

## 📊 Phase 2 Completion Checklist

After implementing all optimizations:

- [ ] CSS code split into multiple files
- [ ] JavaScript split and deferred appropriately
- [ ] Service Worker registered and working offline
- [ ] Responsive images implemented
- [ ] Cache headers optimized
- [ ] Build successful with smaller file sizes
- [ ] All pages load correctly
- [ ] No console errors
- [ ] Mobile testing done
- [ ] Deployed to production (`npm run deploy`)
- [ ] PageSpeed Insights measured
- [ ] Results documented in PERFORMANCE_TRACKER.md

---

## 🚀 Expected Results

After Phase 2 implementation:

| Metric | Phase 1 | Phase 2 (Expected) |
|--------|---------|------------------|
| CSS per page | ~7.6 KB | ~4-5 KB |
| Time to Interactive | -100ms | -200ms total |
| Repeat Visit | Same | -50% (Service Worker) |
| Desktop Score | +5-10 | +15-20 total |
| Mobile Score | +5-10 | +15-20 total |

---

## 📋 Implementation Order

1. **CSS Code Splitting** (easiest, most impact)
2. **Cache Headers** (quick win)
3. **JavaScript Code Splitting** (moderate complexity)
4. **Service Worker** (advanced)
5. **Responsive Images** (requires image creation)

---

## 🔗 Resources

- [Code Splitting Guide](https://web.dev/code-splitting/)
- [Service Workers](https://web.dev/service-workers-cache-storage/)
- [Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [Cache Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)

---

**Ready to start Phase 2? Follow the steps above in order!** 🎯

Last Updated: Nov 19, 2025
