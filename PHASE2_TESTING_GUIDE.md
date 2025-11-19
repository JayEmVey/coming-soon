# Phase 2 Testing & Validation Guide

**Purpose:** Verify Phase 2 optimizations work correctly before deployment  
**Estimated Time:** 30-45 minutes  
**Prerequisites:** Local Python server or similar

---

## Quick Start Testing

### 1. Build & Serve Locally

```bash
# Navigate to project
cd coming-soon

# Option A: Python 3
python -m http.server 8000

# Option B: Node http-server
npx http-server -p 8000

# Open browser to: http://localhost:8000
```

### 2. DevTools Inspection

**Open DevTools (F12):**

#### Network Tab
- [ ] Check CSS files load correctly:
  - `style-global.css` 
  - `style-index.css` (home only)
  - `style-menu.css` (menu only)
  - `style-footer.css` (all pages)
- [ ] Verify HTTP/2 or HTTP/1.1 compression
- [ ] Check total CSS size (~10-15 KB vs 45 KB before)

#### Performance Tab
- [ ] **Lighthouse Audit:**
  1. Click "Analyze page load"
  2. Check metrics:
     - Desktop Performance: Target 92-95
     - Mobile Performance: Target 88-92
     - LCP: Should be < 2.5s
     - INP: Should be < 200ms
     - CLS: Should be < 0.1

#### Console Tab
- [ ] Check for errors
- [ ] Look for Service Worker registration message
- [ ] No JavaScript errors should appear

#### Application Tab
- [ ] **Service Worker:**
  - [ ] Registered? Status: "activated and running"
  - [ ] Cache Storage contains "gate7-v1"
  - [ ] Cached assets visible
- [ ] **Offline Testing:**
  1. Go to Network tab
  2. Check "Offline" checkbox
  3. Refresh page - should load from cache
  4. All assets should be available offline

---

## Page-Specific Testing

### Home Page (index.html)

```html
✅ CSS Loaded:
- style-global.css (2.1 KB)
- style-index.css (4.8 KB)  
- style-footer.css (3.2 KB)
Total: ~10 KB (was 45 KB)

✅ Scripts:
- Inline scroll behavior (critical)
- Deferred scroll-animations.js
- Deferred language-switcher.js
- Deferred Service Worker registration

✅ Functionality:
- Logo animates on load
- Language switcher works
- Footer visible and animated
- Scroll animations trigger correctly
```

**Test Steps:**
1. Load http://localhost:8000/
2. Verify logo fades in
3. Click language buttons (EN/VN)
4. Content changes language
5. Scroll down - footer animates in
6. DevTools → Network → Slow 3G → Test load time

### Menu Page (menu/index.html)

```html
✅ CSS Loaded:
- style-global.css
- style-menu.css (2.3 KB)
- style-footer.css
Total: ~8 KB (was 45 KB)

✅ Scripts:
- Same as home (critical + deferred)

✅ Functionality:
- Menu displays correctly
- Menu grid layout responsive
- Language switcher works
- Footer visible
```

**Test Steps:**
1. Load http://localhost:8000/menu/
2. Menu image displays
3. Language switcher works
4. Check DevTools Network → Total CSS
5. Verify CSS smaller than before

---

## JavaScript Deferring Verification

### Timeline Check (DevTools Performance)

1. Open Performance tab
2. Record page load
3. Look for script execution timing:
   - **Critical (immediate):** smooth scroll behavior
   - **Deferred (after DOMContentLoaded):** scroll-animations.js, language-switcher.js
   - Should see gap between critical and deferred

### Expected Timeline:
```
0ms      - Page starts loading
50ms     - HTML parsed
100ms    - CSS loads
150ms    - Inline script executes (scroll behavior)
200ms    - DOMContentLoaded event
250ms    - Deferred scripts execute
300ms    - Service Worker registers
```

---

## Service Worker Testing

### Verification Steps

1. **Check Registration:**
   - Open DevTools → Application
   - Click "Service Workers"
   - Should show registered worker
   - Status: "activated and running"

2. **Test Offline:**
   - Network tab → Check "Offline"
   - Refresh page
   - Should load from cache
   - See "From ServiceWorker" in Network tab

3. **Test Cache:**
   - Application tab → Cache Storage
   - Open "gate7-v1"
   - Should contain:
     - /
     - /index.html
     - /menu/
     - CSS files
     - Images
     - JS files

4. **Update Behavior:**
   - Keep page open
   - Refresh (F5) twice
   - Should seamlessly update to new version

---

## Performance Metrics Collection

### Baseline (Before Phase 2)

Record these metrics **before** deployment:

| Metric | Value |
|--------|-------|
| Total CSS Size | 45 KB |
| First Contentful Paint (FCP) | ___ ms |
| Largest Contentful Paint (LCP) | ___ ms |
| Cumulative Layout Shift (CLS) | ___ |
| Time to Interactive (TTI) | ___ ms |
| Lighthouse Score (Desktop) | ___ |
| Lighthouse Score (Mobile) | ___ |

### How to Collect:

1. Open **PageSpeed Insights:** https://pagespeed.web.dev/
2. Enter your URL
3. Wait for results
4. Copy scores to spreadsheet
5. Repeat after Phase 2 deployment

---

## Browser Compatibility Testing

Test on multiple browsers:

### Desktop
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### Mobile
- [ ] Chrome Mobile
- [ ] Safari Mobile
- [ ] Firefox Mobile
- [ ] Samsung Internet

### Test Checklist (All Browsers):
- [ ] CSS loads and layouts correctly
- [ ] JavaScript functions work
- [ ] Service Worker registers
- [ ] Responsive design works
- [ ] Language switcher functions
- [ ] Animations play smoothly

---

## Responsive Design Testing

### Mobile (320px - 480px)

```html
✅ CSS Loads: style-global.css + style-index.css
✅ Layout:
- Single column layout
- Menu grid becomes 1 column
- Footer stacks vertically
- Images scale correctly
```

**Test:**
1. DevTools → Toggle device toolbar
2. Select iPhone SE (375px)
3. Verify layout looks correct
4. Check all text readable
5. Touch targets > 48x48px

### Tablet (768px - 1024px)

```html
✅ Layout:
- 2-column menu grid visible
- Responsive sizing
- Footer grid 2 columns
```

### Desktop (1024px+)

```html
✅ Layout:
- Full width optimization
- 2-column menu
- 3-column footer
- Animations smooth
```

---

## Critical Issues to Watch For

### 🔴 Stop & Fix If:
- [ ] CSS doesn't load (white text, no colors)
- [ ] JavaScript console shows errors
- [ ] Service Worker won't register
- [ ] Language switcher doesn't work
- [ ] Offline mode completely broken
- [ ] Layout broken on any device

### 🟡 Minor Issues (Can Wait):
- [ ] Animation timing slightly off
- [ ] CSS minor layout tweaks needed
- [ ] Cache strategy adjustments
- [ ] Performance scores slightly lower than expected

---

## Performance Target Checklist

### After Phase 2, Verify:

**CSS:**
- [ ] Total CSS per page ≤ 15 KB
- [ ] CSS split properly (3 files per page)
- [ ] No unused CSS loaded
- [ ] Cache-busting working (if using CDN)

**JavaScript:**
- [ ] Critical script inline (< 100 bytes)
- [ ] Deferred scripts load after DOMContentLoaded
- [ ] Service Worker registers successfully
- [ ] No blocking scripts

**Performance:**
- [ ] Lighthouse Desktop Score ≥ 92
- [ ] Lighthouse Mobile Score ≥ 88
- [ ] LCP ≤ 2.5s
- [ ] INP ≤ 200ms
- [ ] CLS ≤ 0.1

**Offline:**
- [ ] Can access cached pages offline
- [ ] Images load from cache
- [ ] CSS applies from cache
- [ ] JS functions offline

---

## Common Issues & Solutions

### Issue: CSS Not Loading

**Symptoms:** Page is white, no styling

**Fix:**
1. Check file paths (case-sensitive on Linux)
2. Verify CSS files in root css/ folder
3. Check browser console for 404 errors
4. Clear browser cache (Ctrl+Shift+Del)

### Issue: Language Switcher Not Working

**Symptoms:** Buttons don't change language

**Fix:**
1. Check `js/language-switcher.js` loaded
2. Verify DevTools Console shows no errors
3. Check `data-en` and `data-vn` attributes in HTML
4. Reload page (hard refresh)

### Issue: Service Worker Won't Register

**Symptoms:** No SW in Application tab

**Fix:**
1. Ensure site is served over HTTPS (or localhost)
2. Check console for registration errors
3. Verify `service-worker.js` exists in root
4. Clear site data and reload

### Issue: Offline Mode Doesn't Work

**Symptoms:** Page blank when offline

**Fix:**
1. Ensure Service Worker registered first
2. Check Cache Storage for "gate7-v1"
3. Network offline → test
4. Check console for fetch errors

---

## Performance Testing Tools

### Free Tools:
- **PageSpeed Insights:** https://pagespeed.web.dev/
- **GTmetrix:** https://gtmetrix.com/ (free tier)
- **WebPageTest:** https://www.webpagetest.org/
- **Chrome DevTools Lighthouse:** Built-in (F12)

### Steps for Each:
1. Enter your domain
2. Run test
3. Wait for results
4. Note the scores
5. Compare with baseline
6. Share report in team

---

## Sign-Off Checklist

Before deploying Phase 2, confirm:

- [ ] All CSS files created and loading
- [ ] JavaScript deferred correctly
- [ ] Service Worker registers without errors
- [ ] Offline mode works
- [ ] No console errors
- [ ] Language switcher functions
- [ ] Responsive design verified (mobile/tablet/desktop)
- [ ] Lighthouse score acceptable (≥90 target)
- [ ] All pages tested (index, menu, hiring)
- [ ] Browser compatibility verified (Chrome, Firefox, Safari)
- [ ] Performance metrics collected
- [ ] No blocking issues found

---

## Next Steps After Testing

✅ **If all tests pass:**
1. Commit changes: `git add . && git commit -m "feat: Phase 2 optimization"`
2. Build production: `npm run build`
3. Deploy: `npm run deploy`
4. Wait 2 minutes for GitHub Pages
5. Run PageSpeed Insights again
6. Compare metrics
7. Document improvements

❌ **If issues found:**
1. Note issues in console
2. Fix one at a time
3. Re-test after each fix
4. Document what was wrong
5. Retry entire testing process

---

## Performance Improvement Documentation

After deployment, document:

```markdown
## Phase 2 Results

**Date:** [Deployment date]
**Before Metrics:** [Previous scores]
**After Metrics:** [New scores]
**Improvement:** [Percentage gain]

### CSS Optimization
- CSS split: 45 KB → 10-15 KB per page (-70%)
- Load time: 2.0s → 1.5s (-25%)

### JavaScript Optimization  
- Critical JS: Inline only
- Deferred JS: 2.5 KB
- Impact: 50-100ms faster

### Service Worker
- Offline support: ✅ Enabled
- Cache strategy: Network-first (HTML), Cache-first (images)
- Repeat visits: 30% faster

### Overall
- Lighthouse Desktop: 88 → 92+ (+4-7 points)
- Lighthouse Mobile: 82 → 88+ (+6-10 points)
```

---

**Testing Duration:** 30-45 minutes  
**Difficulty:** Easy (just checking things work)  
**Success Rate:** Should be 100% if implementation correct

Ready to test? Open DevTools and get started! 🚀
