# Deployment Checklist - Updated with SEO Keywords

**Last Updated:** Nov 19, 2025  
**Version:** 2.0 (with SEO Keywords management)  
**Status:** Production Ready

---

## Pre-Deployment Preparation

### 1. Code Review

- [ ] Check for console errors and warnings
- [ ] Verify all links work correctly
- [ ] Test form submissions (if applicable)
- [ ] Review recent commits
- [ ] Check for commented code or debug statements

### 2. Performance Verification

- [ ] Run: `npm run build`
- [ ] Verify build completes without errors
- [ ] Check file sizes in `dist/` folder
- [ ] Verify minification rates (target: 25-30%)
- [ ] Test locally: `python -m http.server 8000`

### 3. SEO Keywords Review ⭐ NEW

**File:** `SEO-KEYWORDS.md`

- [ ] Review all keywords in SEO-KEYWORDS.md
- [ ] Verify keyword relevance for target page
- [ ] Check search volume estimates
- [ ] Confirm keyword difficulty levels
- [ ] Ensure no outdated keywords
- [ ] Add new seasonal keywords if applicable
- [ ] Update priority levels if needed

### 4. HTML Meta Tags Verification

For each page being deployed:

#### Home Page (`/index.html`)
- [ ] Update `<meta name="keywords">`
  - Current: "Gate 7 Coffee, Vietnamese Coffee, Phin Coffee, Specialty Coffee, Coffee Roastery, HCMC, Ho Chi Minh, Arabica, Robusta"
  - Reference: SEO-KEYWORDS.md → Primary Keywords
- [ ] Verify `<title>` tag
  - Current: "Gate 7 Coffee Roastery | Vietnamese Specialty Coffee HCM"
  - Length: 50-60 characters ✅
- [ ] Check `<meta name="description">`
  - Length: 150-160 characters ✅
  - Includes primary keywords ✅
- [ ] Verify Open Graph tags
  - og:title, og:description, og:image, og:url

#### Menu Page (`/menu/index.html`)
- [ ] Update `<meta name="keywords">`
  - Current: "Gate 7 Coffee Menu, Vietnamese Coffee, Phin Coffee, Espresso, Matcha, Coffee Prices, HCMC"
  - Reference: SEO-KEYWORDS.md → Menu Page Keywords
- [ ] Verify `<title>` tag
  - Current: "Gate 7 Coffee Menu | Vietnamese Phin & Specialty Drinks"
- [ ] Check `<meta name="description">`
- [ ] Verify Open Graph tags

#### Hiring Page (`/hiring/index.html`)
- [ ] Update `<meta name="keywords">`
  - Current (Vietnamese): "Tuyển dụng Barista, Gate 7 Coffee, Công việc HCM, Cà phê Việt Nam"
  - Reference: SEO-KEYWORDS.md → Hiring Page Keywords
- [ ] Verify `<title>` tag
- [ ] Check `<meta name="description">`

### 5. SEO Meta Tag Validation

- [ ] Check keyword density (target: 1-3%)
- [ ] Ensure natural language (no keyword stuffing)
- [ ] Verify title tag length (50-70 characters)
- [ ] Verify meta description length (150-160 characters)
- [ ] Check for duplicate keywords across pages
- [ ] Validate character encoding (UTF-8)
- [ ] Ensure all special characters render correctly

### 6. Image & Static Assets Check

- [ ] All images display correctly
- [ ] Image paths are correct
- [ ] WebP images have proper MIME type
- [ ] All CSS files load
- [ ] All JavaScript files load
- [ ] No 404 errors in console
- [ ] .htaccess static asset exclusions verified

### 7. Mobile & Responsive Testing

- [ ] Test on mobile devices (actual or emulated)
- [ ] Check responsive breakpoints
- [ ] Verify touch interactions work
- [ ] Test on different screen sizes:
  - [ ] Mobile (320px)
  - [ ] Tablet (768px)
  - [ ] Desktop (1024px+)

### 8. Browser Compatibility

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers

### 9. Accessibility Check

- [ ] Proper heading hierarchy (h1, h2, h3)
- [ ] All images have alt text
- [ ] Links are descriptive (not "click here")
- [ ] Form labels present
- [ ] Color contrast sufficient
- [ ] Keyboard navigation works

---

## Deployment Execution

### 10. Git Preparation

- [ ] Stage all changes: `git add .`
- [ ] Review staged changes: `git status`
- [ ] Verify no sensitive files staged
- [ ] Check .gitignore is up-to-date

### 11. Build & Commit

- [ ] Run production build: `npm run build`
- [ ] Verify build output in `dist/`
- [ ] Build successful with no errors
- [ ] Check dist/.htaccess has latest rules
- [ ] Verify all images copied to dist/

### 12. Deploy to Production

- [ ] Run deployment: `npm run deploy`
  - OR manually:
    - `npm run build`
    - `git add dist -f`
    - `git commit -m "chore: production build [description]"`
    - `git push origin master`

- [ ] Deployment completes without errors
- [ ] GitHub Pages receives update
- [ ] Verify git log shows new commit

### 13. SEO Sitemap Submission ⭐ NEW

- [ ] Verify sitemap.xml exists in dist/
- [ ] Check sitemap is valid (all URLs included)
- [ ] Open Google Search Console: https://search.google.com/search-console
- [ ] Select property: https://gate7.vn
- [ ] Go to Sitemaps section
- [ ] Submit/re-submit sitemap.xml:
  ```
  https://gate7.vn/sitemap.xml
  ```
- [ ] Verify submission status
- [ ] Note any crawl errors or warnings

---

## Post-Deployment Verification

### 14. Site Live Check

- [ ] Wait 2-5 minutes for GitHub Pages propagation
- [ ] Visit: https://gate7.vn/
- [ ] Page loads completely
- [ ] No 404 errors in console
- [ ] All images display correctly
- [ ] Styling renders properly
- [ ] JavaScript functionality works
- [ ] Links navigate correctly

### 15. SEO Verification ⭐ NEW

**Tools:**
- Google Search Console: https://search.google.com/search-console
- Google Rich Results Test: https://search.google.com/test/rich-results
- PageSpeed Insights: https://pagespeed.web.dev

**Checks:**
- [ ] Google Search Console shows site indexed
- [ ] Rich snippets/schema markup valid
- [ ] Keywords appear in Search Console
- [ ] No indexing errors reported
- [ ] Mobile usability looks good
- [ ] Core Web Vitals healthy

### 16. Performance Verification

- [ ] Test on PageSpeed Insights (Desktop)
- [ ] Test on PageSpeed Insights (Mobile)
- [ ] Record performance scores
- [ ] Check Core Web Vitals:
  - [ ] LCP (Largest Contentful Paint)
  - [ ] INP (Interaction to Next Paint)
  - [ ] CLS (Cumulative Layout Shift)
- [ ] Verify no performance regressions

### 17. Analytics & Monitoring Setup

- [ ] Google Analytics tracking working
- [ ] Event tracking enabled
- [ ] Conversion goals configured
- [ ] Search Console connected to GA4
- [ ] Setup alerts for:
  - [ ] Crawl errors
  - [ ] Indexing issues
  - [ ] Performance drops

### 18. SEO Keywords Monitoring ⭐ NEW

**Initial Setup (immediately after deployment):**
- [ ] Add deployment date to SEO-KEYWORDS.md
- [ ] Note which keywords were updated
- [ ] Log baseline metrics in Search Console

**Ongoing Monitoring (daily for first week):**
- [ ] Check Search Console for keyword impressions
- [ ] Monitor click-through rate (CTR)
- [ ] Track ranking positions
- [ ] Watch for crawl errors

**Ongoing Monitoring (weekly):**
- [ ] Review Search Console data
- [ ] Check top performing keywords
- [ ] Identify keywords needing improvement
- [ ] Monitor competitor keywords

**Ongoing Monitoring (monthly):**
- [ ] Full keyword performance review
- [ ] Update SEO-KEYWORDS.md with new data
- [ ] Plan keyword optimization for next month
- [ ] Generate report for team

---

## Content-Specific Checklists

### Adding New Keywords

Before adding new keywords:
1. [ ] Research search volume
2. [ ] Check keyword difficulty
3. [ ] Verify content relevance
4. [ ] Add to SEO-KEYWORDS.md
5. [ ] Update HTML meta tags
6. [ ] Run build & deploy
7. [ ] Submit updated sitemap

### Seasonal Keyword Updates

For seasonal keywords:
1. [ ] Update SEO-KEYWORDS.md with seasonal section
2. [ ] Create content around seasonal keywords
3. [ ] Update meta tags for relevant pages
4. [ ] Deploy and monitor performance
5. [ ] Archive after season ends

### Competitor Keyword Monitoring

Monthly competitor review:
1. [ ] Identify competitor keywords
2. [ ] Add to "Competitor Keywords" section
3. [ ] Determine ranking difficulty
4. [ ] Prioritize keywords to target
5. [ ] Update website content if needed

---

## Rollback Procedure

If issues occur:

### Quick Rollback
```bash
git revert [commit-hash]
git push origin master
# Site reverts in 2-5 minutes
```

### Full Rollback to Last Known Good
```bash
git reset --hard [last-good-commit]
git push origin master -f
```

---

## Documentation Updates

After deployment:

- [ ] Update DEPLOYMENT_CHECKLIST_UPDATED.md with date
- [ ] Add notes to CHANGELOG.md (if applicable)
- [ ] Update SEO-KEYWORDS.md with performance notes
- [ ] Document any issues encountered
- [ ] Create follow-up tasks if needed

---

## Sign-Off

### Deployment Completed By

- **Name:** ___________________
- **Date:** ___________________
- **Time:** ___________________
- **Commit Hash:** ___________________

### Verification Completed By

- **Name:** ___________________
- **Date:** ___________________
- **Status:** ☐ All Checks Passed ☐ Issues Found

### Issues Found (if any)

```
_____________________________________________
_____________________________________________
_____________________________________________
```

### Resolution

```
_____________________________________________
_____________________________________________
_____________________________________________
```

---

## Quick Reference

### Commands
```bash
# Build
npm run build

# Test locally
python -m http.server 8000

# Deploy
npm run deploy

# View logs
git log --oneline -5
```

### Files to Update for Keywords
- `/index.html` - Home page keywords
- `/menu/index.html` - Menu page keywords
- `/hiring/index.html` - Hiring page keywords
- `SEO-KEYWORDS.md` - Central keyword database

### Key Tools
- Google Search Console: https://search.google.com/search-console
- PageSpeed Insights: https://pagespeed.web.dev
- Rich Results Test: https://search.google.com/test/rich-results
- Local Test: `python -m http.server 8000`

---

## Related Documents

- **AGENTS.md** - Build and deployment commands
- **SEO-KEYWORDS.md** - Keyword management (NEW)
- **DEPLOYMENT.md** - Detailed deployment guide
- **PERFORMANCE_OPTIMIZATION_PLAN.md** - Performance optimization
- **BUGFIX_IMAGE_DISPLAY_COMPLETE.md** - Image display fixes

---

## Notes

- Always test locally before deploying
- Wait for CDN propagation before declaring deployment complete
- Submit sitemap to Google Search Console after major updates
- Monitor Search Console daily for first week after deployment
- Review keyword performance monthly in SEO-KEYWORDS.md

---

**Last Updated:** Nov 19, 2025  
**Version:** 2.0  
**Status:** Active & In Use

