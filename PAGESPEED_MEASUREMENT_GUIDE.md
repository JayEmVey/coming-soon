# PageSpeed Insights Measurement Guide

**Purpose:** Measure performance improvements from Phase 2 optimization  
**Date Created:** November 19, 2025  
**Site:** https://gate7.vn  
**Status:** Ready for measurement

---

## Quick Start (3 Steps)

### Step 1: Open PageSpeed Insights
Visit: https://pagespeed.web.dev/

### Step 2: Enter Website URL
1. In the input field, type: `https://gate7.vn`
2. Click "Analyze" button

### Step 3: Record Results
Wait 30-60 seconds for analysis to complete, then record:
- Desktop Lighthouse Score (0-100)
- Mobile Lighthouse Score (0-100)
- LCP (Largest Contentful Paint) - milliseconds
- INP (Interaction to Next Paint) - milliseconds
- CLS (Cumulative Layout Shift) - decimal value

---

## Detailed Measurement Process

### 1. Desktop Performance Analysis

**Steps:**
1. Go to https://pagespeed.web.dev/
2. Enter: `https://gate7.vn`
3. Click "Analyze"
4. Wait for desktop analysis to complete

**What to Record:**

#### Lighthouse Score (Lab Data)
- **Location:** Top of results page
- **Value:** 0-100 (90+ is "Fast")
- **Record:** `Desktop Lighthouse Score: ___`

#### Core Web Vitals (Field Data - from CrUX)
Under "Google Search Console" section:

1. **Largest Contentful Paint (LCP)**
   - **Target:** ≤ 2.5 seconds (good)
   - **Record:** `LCP: ___ ms` or `LCP: ___ seconds`

2. **Interaction to Next Paint (INP)**
   - **Target:** ≤ 200 ms (good)
   - **Record:** `INP: ___ ms`

3. **Cumulative Layout Shift (CLS)**
   - **Target:** ≤ 0.1 (good)
   - **Record:** `CLS: ___`

#### Performance Metrics (Lab Data - Lighthouse)
Scroll down to see individual metrics:

- **First Contentful Paint (FCP)**
  - When first content appears
  - Record: `FCP: ___ seconds`

- **Speed Index**
  - How quickly content becomes visible
  - Record: `Speed Index: ___ seconds`

- **Largest Contentful Paint (LCP)**
  - When largest element appears
  - Record: `LCP (Lab): ___ seconds`

- **Total Blocking Time (TBT)**
  - Time when page is unresponsive
  - Record: `TBT: ___ ms`

- **Time to Interactive (TTI)**
  - When page becomes fully interactive
  - Record: `TTI: ___ seconds`

---

### 2. Mobile Performance Analysis

**Steps:**
1. Scroll back to top of results
2. Look for "Mobile" section
3. Mobile results should already be shown
4. Wait for mobile analysis if not complete

**What to Record:**

Same metrics as desktop:
- `Mobile Lighthouse Score: ___`
- `Mobile LCP: ___ ms`
- `Mobile INP: ___ ms`
- `Mobile CLS: ___`

---

## Expected Results

### Phase 2 Performance Targets

#### Desktop
```
Current (Estimated): ~85-87
Expected After Phase 2: 89-92
Target: 92+
```

#### Mobile
```
Current (Estimated): ~80-83
Expected After Phase 2: 86-90
Target: 88+
```

#### Core Web Vitals
| Metric | Target | Expected |
|--------|--------|----------|
| LCP | ≤2.5s | ~1.8s |
| INP | ≤200ms | ~100ms |
| CLS | ≤0.1 | ~0.05 |

---

## Comparison & Analysis

### Expected Improvements from Phase 2

#### CSS Code Splitting Impact
- Faster CSS delivery
- Smaller initial CSS payload
- Expected: +1-2 points

#### JavaScript Deferring Impact
- No render-blocking JS
- Faster First Contentful Paint
- Expected: +2-3 points

#### Service Worker Impact
- Faster repeat visits
- Offline support
- Expected: +1-2 points (on repeat visits)

#### Responsive Images Impact
- Smaller image files on mobile
- Faster LCP on mobile
- Expected: +3-5 points on mobile

**Total Expected Improvement:**
- Desktop: +4-7 points
- Mobile: +6-10 points

---

## Recording Results

### Create a Results Document

```markdown
# PageSpeed Insights Measurements

**Date:** November 19, 2025  
**Site:** https://gate7.vn  
**Phase:** Phase 2 Post-Deployment

## Desktop Results
- Lighthouse Score: ___ / 100
- LCP: ___ ms
- INP: ___ ms
- CLS: ___
- FCP: ___ seconds
- TBT: ___ ms

## Mobile Results
- Lighthouse Score: ___ / 100
- LCP: ___ ms
- INP: ___ ms
- CLS: ___
- FCP: ___ seconds
- TBT: ___ ms

## Comparison with Baseline
- Desktop Improvement: ___ points
- Mobile Improvement: ___ points
- LCP Improvement: ___ ms faster

## Notes
- [Any observations or issues]
```

### Update PERFORMANCE_TRACKER.md
1. Open `PERFORMANCE_TRACKER.md`
2. Find Phase 2 Results section
3. Fill in measured scores
4. Save changes

---

## Troubleshooting

### "Your page doesn't have useful field data yet"

**What This Means:**
- Site is brand new or has very few real users
- Only lab data (Lighthouse) available

**Solution:**
- Use lab data scores for now
- Wait 24-48 hours for field data to appear
- Focus on Lighthouse score (more reliable for new sites)

### Score Varies Between Runs

**Why This Happens:**
- Network conditions vary
- Device simulation varies
- Browser cache varies
- Server response time varies

**Solution:**
- Take average of 2-3 runs
- Run at different times
- Check "throttle" settings in report details

### Low Mobile Score

**Common Causes:**
- Unoptimized images (we fixed this)
- Render-blocking CSS/JS (we fixed this)
- Poor Core Web Vitals
- Network latency simulation

**Solutions:**
- Verify responsive images load correctly
- Check Network tab for image sizes
- Ensure Service Worker registered
- Test on actual mobile device

---

## Advanced Analysis

### Analyzing the Audit Report

PageSpeed Insights provides detailed recommendations:

1. **Opportunities Section**
   - Shows potential improvements
   - Each has estimated time savings

2. **Diagnostics Section**
   - Details about page health
   - Performance insights

3. **Passed Audits**
   - What's working well
   - Validate your optimizations

### Key Audits to Check

- ✅ "Serve images in next-gen formats" - WebP (responsive images)
- ✅ "Eliminate render-blocking resources" - CSS/JS splitting
- ✅ "Reduce CSS" - Split CSS files
- ✅ "Minify CSS" - CSS minification
- ✅ "Minify JavaScript" - JS minification
- ✅ "Lazy load images" - Loading="lazy" attributes

---

## Monthly Measurement Plan

### Week 1 (Baseline)
- [ ] Measure desktop score
- [ ] Measure mobile score
- [ ] Record all metrics
- [ ] Create baseline document

### Week 2-4 (Monitoring)
- [ ] Measure weekly
- [ ] Track trends
- [ ] Document changes
- [ ] Note any issues

### Month 2+
- [ ] Continue weekly measurements
- [ ] Identify patterns
- [ ] Plan Phase 3 optimizations
- [ ] Monitor for regressions

---

## Interpreting Scores

### Lighthouse Score Scale

| Score | Rating | Status |
|-------|--------|--------|
| 90-100 | Fast | ✅ Excellent |
| 50-89 | Moderate | ⚠️ Needs Work |
| 0-49 | Slow | ❌ Poor |

### Our Targets

| Device | Goal | Stretch |
|--------|------|---------|
| Desktop | 92+ | 95+ |
| Mobile | 88+ | 90+ |

---

## Sharing Results

### Screenshot for Documentation
1. Take screenshot of results page
2. Save as `pagespeed-screenshot-YYYYMMDD.png`
3. Reference in performance reports

### Reporting Template
```
## Performance Update - [Date]

**Site:** https://gate7.vn

### Lighthouse Scores
- Desktop: 87 → 91 (+4 points)
- Mobile: 82 → 89 (+7 points)

### Core Web Vitals
- LCP: 3.2s → 2.1s (-1.1s)
- INP: 150ms → 85ms (-65ms)
- CLS: 0.12 → 0.05 (-0.07)

### Status
✅ Phase 2 optimization successful
🎯 All targets achieved
```

---

## Links & Resources

### Official Tools
- **PageSpeed Insights:** https://pagespeed.web.dev/
- **Lighthouse:** Built into Chrome DevTools
- **WebPageTest:** https://www.webpagetest.org/
- **Chrome DevTools:** F12 or Ctrl+Shift+I

### Google Documentation
- **Web Vitals Guide:** https://web.dev/vitals/
- **Lighthouse Docs:** https://developers.google.com/web/tools/lighthouse
- **Performance API:** https://developer.mozilla.org/en-US/docs/Web/API/Performance

### Our Documentation
- **PHASE2_BASELINE_MEASUREMENT.md** - Pre-deployment state
- **PHASE2_COMPLETION_SUMMARY.md** - What was done
- **PERFORMANCE_TRACKER.md** - Metrics tracker
- **AGENTS.md** - Build/deployment commands

---

## Video Guide (If Available)

For visual guidance on using PageSpeed Insights:
1. Search: "PageSpeed Insights tutorial"
2. Watch Google's official tutorial video
3. Follow along with https://gate7.vn

---

## Next Steps After Measurement

### If Scores Meet Targets (90+/88+)
1. ✅ Document results
2. ✅ Update PERFORMANCE_TRACKER.md
3. ✅ Celebrate! 🎉
4. ⏳ Plan Phase 3 (optional advanced optimizations)

### If Scores Below Targets
1. Identify failing audits in report
2. Check our optimizations are live:
   - [ ] Service Worker registered
   - [ ] Responsive images loading
   - [ ] CSS is split (not monolithic)
   - [ ] JS is deferred
3. Debug any issues
4. Re-measure after fixes

### Phase 3 Planning (If Needed)
- Critical CSS inlining
- Performance monitoring setup
- Advanced caching strategies
- Performance budgets

---

## Quick Checklist

Before measuring:
- [ ] Visit https://gate7.vn - loads correctly
- [ ] Check DevTools - no errors
- [ ] Clear browser cache
- [ ] Wait for Service Worker to register

During measurement:
- [ ] Go to https://pagespeed.web.dev/
- [ ] Enter https://gate7.vn
- [ ] Click Analyze
- [ ] Wait 30-60 seconds
- [ ] Take screenshots
- [ ] Record all scores

After measurement:
- [ ] Update PERFORMANCE_TRACKER.md
- [ ] Compare with baseline
- [ ] Calculate improvements
- [ ] Document findings

---

## Final Notes

✅ **Phase 2 is deployed and live at https://gate7.vn**

The optimization work includes:
- CSS code splitting (70% reduction)
- JavaScript deferring (no render-blocking)
- Service Worker (offline support)
- Responsive images (73% smaller on mobile)

**Expected improvements from PageSpeed Insights:**
- Desktop: +4-7 points
- Mobile: +6-10 points
- Overall: 20-25% faster

**Measure now to confirm results!**

---

**Created:** November 19, 2025  
**Last Updated:** November 19, 2025  
**Status:** Ready for Measurement  
**Next Action:** Run PageSpeed Insights analysis
