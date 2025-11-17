# Deployment Checklist - Gate 7 Coffee Roastery

**Last Updated**: January 17, 2025  
**SEO Status**: ✅ Phase 1 Complete (READY FOR PRODUCTION)  
**Deployment Date**: _______________  
**Deployed By**: _______________  
**Environment**: [ ] Staging [ ] Production  

---

## SEO Implementation Status Summary

✅ **Phase 1 - COMPLETE** (All critical SEO items implemented)

| Component | Status | Details |
|-----------|--------|---------|
| Meta Tags | ✅ Complete | Titles, descriptions, keywords on all pages (3/3) |
| Structured Data | ✅ Complete | LocalBusiness schema on 3 pages (index, menu, music) |
| Social Sharing | ✅ Complete | Open Graph (9 tags) + Twitter Cards (4 tags) all pages |
| Technical SEO | ✅ Complete | Canonical + Hreflang (EN, VI, x-default) all pages |
| Server Config | ✅ Complete | Gzip compression, caching, security headers |
| Sitemap & Robots | ✅ Complete | sitemap.xml + robots.txt with bot directives |
| Analytics | ✅ Complete | GA4 tracking code (G-S72S3FXR6Z) on all pages |
| Mobile & A11y | ✅ Complete | Responsive design + semantic HTML |

**Pages Updated (Nov 17, 2025):**
- ✅ index.html - Complete
- ✅ menu/index.html - Complete
- ✅ music/spotify.html - Complete (NEW)

**Result**: Website is fully SEO-optimized and production-ready.

---

## Pre-Deployment Verification (48 hours before)

### Code Quality
- [ ] All uncommitted changes are staged/committed
- [ ] Latest version on main/master branch
- [ ] No console errors in browser DevTools
- [ ] No console warnings in browser DevTools
- [ ] All JavaScript functions are defined and called correctly
- [ ] CSS files load without errors

### File Structure
- [ ] All file paths use correct relative/absolute paths
- [ ] No duplicate files or old versions
- [ ] All necessary folders exist (css/, images/, menu/)
- [ ] CNAME file present and correct (for GitHub Pages)
- [ ] .gitignore properly configured

---

## Link Verification

### Internal Links
- [ ] Home page link `/` works
- [ ] Menu page link `/menu/` works
- [ ] Footer links navigate correctly
- [ ] Navigation anchors scroll properly
  - [ ] Scroll indicator scrolls to menu section
  - [ ] All section IDs are correct
- [ ] Logo links return to home
- [ ] Back links from menu to home work

### External Links (Test all)
- [ ] Instagram link: `https://instagram.com/gate7.coffee`
  - Verified: [ ] Opens in new tab [ ] Active account
- [ ] Facebook link: `https://www.facebook.com/share/1CnRHZ9QSz/`
  - Verified: [ ] Opens in new tab [ ] Valid URL
- [ ] Zalo link: `https://zalo.me/2485475799709134069`
  - Verified: [ ] Opens in new tab [ ] Active chat
- [ ] Email link: `hello@gate7.vn`
  - Verified: [ ] Mailto works [ ] Active email
- [ ] Phone link: `0971091120`
  - Verified: [ ] Format correct [ ] Active number
- [ ] Google Maps embed loads correctly
  - Verified: [ ] Map displays [ ] No console errors

### Link Format Validation
- [ ] No broken anchors (404 errors)
- [ ] HTTPS used where required
- [ ] rel="noopener noreferrer" on external links ✅ (Already present)
- [ ] Links have appropriate target="_blank" attributes

**Tools**: Use online broken link checker
- [W3C Link Checker](https://validator.w3.org/checklink)
- [Broken Link Checker](https://www.brokenlinkcheck.com/)

---

## Image Verification

### Image Files Present
**Home Page (index.html):**
- [ ] `images/logo-color-black-bg1.png` - exists & loads
- [ ] `images/logo-only-white.png` - exists & loads (favicon)
- [ ] `images/coffee-as-you-are.png` - exists & loads
- [ ] `images/Instagram_icon.png.webp` - exists & loads
- [ ] `images/Facebook_Logo_(2019).png.webp` - exists & loads
- [ ] `images/7044033_zalo_icon.ico` - exists & loads

**Menu Page (menu/index.html):**
- [ ] `images/logo-color-black-bg1.png` - exists & loads (from ../images/)
- [ ] `images/Menu_Final.png` - exists & loads
- [ ] `images/Instagram_icon.png.webp` - exists & loads
- [ ] `images/Facebook_Logo_(2019).png.webp` - exists & loads
- [ ] `images/7044033_zalo_icon.ico` - exists & loads

### Image Quality & Performance
- [ ] All images display correctly on desktop
- [ ] All images display correctly on tablet (768px)
- [ ] All images display correctly on mobile (480px)
- [ ] No image distortion or pixelation
- [ ] Image file sizes optimized (<500KB each)
  - Logo: _____ KB
  - Menu: _____ KB
  - Icons: _____ KB

### Image Properties
- [ ] All images have proper alt text
- [ ] Alt text is descriptive (not just filename)
- [ ] No duplicate alt text for different images
- [ ] Image paths use correct relative URLs
  - Home page: `images/` prefix ✅
  - Menu page: `../images/` prefix ✅

### Missing Images Detection
```bash
# Command to check broken images in HTML:
# grep -r '<img src=' . | grep -v 'node_modules'
# Then verify each path exists
```

- [ ] No "image not found" (404) in console
- [ ] No broken image icons displayed
- [ ] All WebP images have fallbacks (if needed)

**Visual Inspection:**
On each page, verify:
- [ ] Logo displays correctly (header & footer)
- [ ] Menu image shows all items legibly
- [ ] Social media icons visible
- [ ] Favicon appears in browser tab

---

## Translation Verification

### Language Switching Functionality
- [ ] Language switcher buttons visible (EN/VN)
- [ ] EN button switches to English
- [ ] VN button switches to Vietnamese
- [ ] Active button styling works
- [ ] Language preference saved (localStorage)
- [ ] Correct language loads on page reload

### English Translations (data-en)

**Home Page Translations:**
- [ ] "Scroll to begin" - English correct
- [ ] "All day menu" - English correct
- [ ] Menu category names English correct:
  - [ ] "Phin Cafe (100% Robusta)"
  - [ ] "Espresso Bar (100% Arabica)"
  - [ ] "Matcha & Houjicha & Chocolate"
  - [ ] "Tea & Milktea"
  - [ ] "Extra"
- [ ] Menu item names English correct (spot check 5 items):
  - [ ] ________________________
  - [ ] ________________________
  - [ ] ________________________
  - [ ] ________________________
  - [ ] ________________________
- [ ] Menu descriptions English correct (grammar, spelling)
- [ ] Footer headers English correct:
  - [ ] "Address"
  - [ ] "Hours"
  - [ ] "Follow"
- [ ] Copyright English correct

**Menu Page Translations:**
- [ ] "Hello!" - English correct
- [ ] "Delight in every sip, anytime, anywhere" - English correct
- [ ] "Monday – Friday" - English correct
- [ ] "Saturday – Sunday" - English correct
- [ ] "6:00 AM – 10:00 PM" - English correct
- [ ] Footer headers English correct:
  - [ ] "Address"
  - [ ] "Hours"
  - [ ] "Follow"

### Vietnamese Translations (data-vn)

**Home Page Translations:**
- [ ] "Cuộn để bắt đầu" - Vietnamese correct
- [ ] "Thực đơn cả ngày" - Vietnamese correct
- [ ] Menu categories Vietnamese correct (no typos):
  - [ ] "Cà Phê Pha Phin (100% Robusta)"
  - [ ] "Cà phê pha máy (100% Arabica)"
  - [ ] "Matcha & Houjicha & Sô Cô La"
  - [ ] "Trà & Trà Sữa"
  - [ ] "Kèm Thức Uống"
- [ ] Menu descriptions Vietnamese correct (spot check):
  - [ ] No diacritical mark errors
  - [ ] Grammar/spelling appropriate
- [ ] Footer headers Vietnamese correct:
  - [ ] "Địa Chỉ"
  - [ ] "Khung Giờ"
  - [ ] "Theo Dõi Gate Tại"
- [ ] Copyright Vietnamese correct

**Menu Page Translations:**
- [ ] "Chào bạn!" - Vietnamese correct
- [ ] "Thưởng thức cà phê mọi lúc mọi nơi" - Vietnamese correct
- [ ] "Thứ Hai – Thứ Sáu" - Vietnamese correct
- [ ] "Thứ Bảy – Chủ Nhật" - Vietnamese correct
- [ ] "6:00 sáng – 10:00 tối" - Vietnamese correct

### Translation Data Attributes
- [ ] All translatable elements have both data-en and data-vn
- [ ] No missing language pairs
- [ ] No orphaned data attributes
- [ ] Default language set correctly (Vietnamese)

**Command to find missing translations:**
```bash
# Find elements with data-en but no data-vn:
grep -r 'data-en' . | grep -v 'data-vn'
```

### Visual Translation Quality
- [ ] Text doesn't overflow containers when switching languages
- [ ] Vietnamese diacritics display correctly (à, á, ả, ã, ạ, etc.)
- [ ] No mojibake (garbled characters)
- [ ] Line breaks work in both languages
- [ ] Accent colors visible on both dark/light text

**Browser Test:**
- [ ] Chrome: [ ] Firefox: [ ] Safari: [ ] Edge:
  - [ ] English displays correctly
  - [ ] Vietnamese displays correctly
  - [ ] Language switch works
  - [ ] No character encoding issues

---

## SEO Verification

### Meta Tags ✅ PHASE 1 COMPLETE
- [x] Title tag set (index.html) ✅
  - Current: "Gate 7 Coffee Roastery | Vietnamese Specialty Coffee HCM"
  - Verification: [x] Implemented

- [x] Title tag set (menu/index.html) ✅
  - Current: "Gate 7 Coffee Menu | Vietnamese Phin & Specialty Drinks"
  - Verification: [x] Implemented

- [x] Meta description present (index.html) ✅
  - Status: [x] Present
  - Current: "Discover Gate 7 Coffee Roastery in Ho Chi Minh City. Authentic Vietnamese Phin coffee, specialty espresso, and unique matcha drinks. Visit us at 162A Nguyễn Trường Tộ."

- [x] Meta description present (menu/index.html) ✅
  - Status: [x] Present
  - Current: "Explore Gate 7 Coffee's full menu: Phin Robusta coffee, Arabica espresso, matcha drinks, and Vietnamese tea. Prices and detailed descriptions for all beverages."

- [x] Meta viewport present ✅ (Already verified)

- [x] Charset UTF-8 set ✅ (Already verified)

- [x] Meta keywords implemented ✅
  - Home page: 9 primary keywords
  - Menu page: 7 primary keywords

- [x] Open Graph tags (og:title, og:description, og:image, og:url) ✅
  - Status: [x] Present
  - 9 tags on home page, 5 tags on menu page

- [x] Twitter Card tags ✅
  - Status: [x] Present
  - 4 tags on both pages

### Structured Data ✅ PHASE 1 COMPLETE
- [x] LocalBusiness schema implemented ✅
   - Status: [x] Present on index.html, menu/index.html, music/spotify.html
   - Fields: name, image, description, telephone, email, address, openingHours, sameAs, priceRange
   - Pages: 3 total
   - Validator: [Google's Rich Results Test](https://search.google.com/test/rich-results)

### Canonical Tags ✅ PHASE 1 COMPLETE
- [x] Canonical tag on index.html ✅
  - Status: [x] Present
  - URL: https://gate7.vn/

- [x] Canonical tag on menu/index.html ✅
  - Status: [x] Present
  - URL: https://gate7.vn/menu/

### Hreflang Tags ✅ PHASE 1 COMPLETE
- [x] Hreflang tags for English ✅
  - Status: [x] Present on all pages

- [x] Hreflang tags for Vietnamese ✅
  - Status: [x] Present on all pages

- [x] Hreflang x-default tag ✅
  - Status: [x] Present on all pages

### Sitemap & Robots ✅ PHASE 1 COMPLETE
- [x] sitemap.xml created and accessible ✅
  - Path: `/sitemap.xml`
  - Status: [x] Present
  - Contains: 2 main pages + 3 image entries

- [x] robots.txt created ✅
  - Path: `/robots.txt`
  - Status: [x] Present
  - Features: Crawl directives, bad bot blocking, sitemap reference

- [x] .htaccess server optimization ✅
  - Path: `/.htaccess`
  - Status: [x] Present
  - Features: Gzip compression, browser caching, security headers, HTTPS enforcement

### Analytics ✅ PHASE 1 COMPLETE
- [x] Google Analytics ID present: `G-S72S3FXR6Z` ✅
- [x] GA tracking code fires (check in DevTools)
  - Status: [x] Verified

- [x] No tracking errors in console
  - Status: [x] Verified

### Content Quality
- [ ] H1 tag present on both pages
  - Home page: [ ] "GATE 7 COFFEE ROASTERY"
  - Menu page: [ ] "Hello!" or similar

- [ ] H2, H3 hierarchy correct (proper nesting)
  - Home page: [ ] Verified
  - Menu page: [ ] Verified

- [ ] No duplicate H1 tags on pages
  - Status: [ ] Verified

- [ ] Images have descriptive alt text
  - Status: [ ] Verified

- [ ] No keyword stuffing detected
  - Status: [ ] Verified

**SEO Testing Tools:**
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [W3C Validator](https://validator.w3.org/)

---

## Mobile & Responsiveness

### Device Testing
**Test on actual devices or DevTools:**

| Device | Screen | Home Page | Menu Page | Issues |
|--------|--------|-----------|-----------|--------|
| iPhone 12 (390px) | [ ] | [ ] Works | [ ] Works | _________ |
| iPad (768px) | [ ] | [ ] Works | [ ] Works | _________ |
| Desktop (1200px) | [ ] | [ ] Works | [ ] Works | _________ |
| Mobile (360px) | [ ] | [ ] Works | [ ] Works | _________ |

### Responsive Features
- [ ] Logo scales correctly
- [ ] Menu grid adjusts to single column on mobile
- [ ] Footer displays correctly on small screens
- [ ] Language switcher accessible on mobile
- [ ] Touch targets at least 48px (mobile)
- [ ] No horizontal scrolling issues
- [ ] Text readable without zooming

### Performance on Mobile
- [ ] Page loads in under 3 seconds
- [ ] Images lazy load (if implemented)
- [ ] CSS animations smooth on mobile
- [ ] No janky scroll behavior
- [ ] Menu opens/closes properly

---

## Browser Compatibility

Test on each browser:

| Browser | Version | Desktop | Mobile | Issues |
|---------|---------|---------|--------|--------|
| Chrome | Latest | [ ] ✅ | [ ] ✅ | _________ |
| Firefox | Latest | [ ] ✅ | [ ] ✅ | _________ |
| Safari | Latest | [ ] ✅ | [ ] ✅ | _________ |
| Edge | Latest | [ ] ✅ | N/A | _________ |

### Critical Features to Test
- [ ] CSS loads correctly (colors, layout)
- [ ] JavaScript runs without errors
  - Language switcher: [ ] Works
  - Scroll animations: [ ] Works
  - Google Analytics: [ ] Works
- [ ] Images display
- [ ] Fonts render correctly
- [ ] No console errors or warnings

---

## Performance Optimization

### Page Speed
- [ ] Home page load time: _________ ms (Target: <3 seconds)
- [ ] Menu page load time: _________ ms (Target: <3 seconds)

### File Sizes
- [ ] CSS file size: _________ KB (Target: <50 KB)
- [ ] JavaScript size: _________ KB (Target: <30 KB)
- [ ] Total page size: _________ KB (Target: <500 KB)

### Optimization Checklist
- [ ] CSS minified (if in production)
- [ ] JavaScript minified (if in production)
- [ ] Images optimized (WebP format, compressed)
- [ ] Unused CSS removed
- [ ] Unused JavaScript removed
- [ ] No render-blocking resources
- [ ] Gzip compression enabled (server config)

**Tools:**
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)

---

## Accessibility Verification

- [ ] WCAG 2.1 Level AA compliance
- [ ] All images have alt text ✅
- [ ] Color contrast meets standards (4.5:1 minimum)
  - [ ] Text on background checked
  - [ ] Links on background checked
- [ ] Keyboard navigation works
  - [ ] Tab through links
  - [ ] Language switcher keyboard accessible
- [ ] Form inputs (if any) labeled properly
- [ ] Semantic HTML used (header, nav, footer, section)
- [ ] No flashing content (seizure risk)
- [ ] Focus indicators visible

**Tools:**
- [WAVE - Web Accessibility Evaluation Tool](https://wave.webaim.org/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [Lighthouse Accessibility Audit](https://developers.google.com/web/tools/lighthouse)

---

## Security Verification

- [ ] HTTPS enabled (if not GitHub Pages default)
- [ ] No sensitive data in code/comments
  - [ ] No API keys visible
  - [ ] No passwords in HTML/CSS/JS
  - [ ] No email addresses in source (except footer)
- [ ] External scripts safe:
  - [ ] Google Analytics from google.com ✅
  - [ ] No suspicious third-party scripts
- [ ] Content Security Policy headers (if applicable)
- [ ] No inline scripts with sensitive data
- [ ] Referrer policy set (if needed)

---

## Configuration Verification

### GitHub Pages (if applicable)
- [ ] Repository public or access configured
- [ ] GitHub Pages enabled in settings
- [ ] Custom domain configured (if gate7.vn)
- [ ] HTTPS enforcement enabled
- [ ] CNAME file present and correct
- [ ] Build settings configured correctly

### DNS/Domain (if custom domain)
- [ ] Domain pointing to correct IP
- [ ] DNS propagation complete
- [ ] SSL certificate valid
- [ ] No certificate warnings
- [ ] Redirects configured (if needed)

### Analytics Setup
- [ ] Google Analytics property created
- [ ] ID correctly placed in HTML: `G-S72S3FXR6Z`
- [ ] Tracking code fires on all pages
- [ ] Real-time reporting shows traffic
- [ ] Goals configured (if needed)
- [ ] Not tracking own traffic (filter IP)

---

## Content Verification

### Accuracy
- [ ] Address correct: "162A Nguyễn Trường Tộ, Phường Phú Thọ Hòa, TP HCM"
- [ ] Phone correct: "0971091120"
- [ ] Email correct: "hello@gate7.vn"
- [ ] Business hours correct: "6:00 AM - 10:00 PM daily"
- [ ] Social media handles correct
- [ ] Menu prices current (prices in VND)

### Completeness
- [ ] All menu categories present (5 total)
- [ ] All menu items listed
- [ ] No placeholder text remaining
- [ ] No "TODO" or "FIXME" comments visible

### Brand Consistency
- [ ] Logo usage consistent
- [ ] Color scheme applied (dark bg, golden accents)
- [ ] Typography consistent (Averta font)
- [ ] Tone of voice consistent
- [ ] Branding guidelines followed

---

## Pre-Production Checklist (Final)

### Code Review
- [ ] Code peer-reviewed (if team)
- [ ] No console errors
- [ ] No console warnings
- [ ] All functionality tested
- [ ] No debug code left

### Git/Version Control
- [ ] All changes committed
- [ ] Commit messages descriptive
- [ ] No uncommitted changes
- [ ] Branch ready to merge
- [ ] Previous version tagged (for rollback)

### Backups
- [ ] Current version backed up locally
- [ ] Backup location: _________________
- [ ] Rollback plan documented

### Final QA Pass
- [ ] All checklist items completed
- [ ] No known bugs remaining
- [ ] Performance acceptable
- [ ] SEO basics verified
- [ ] Mobile responsive confirmed
- [ ] All links work
- [ ] All translations correct
- [ ] All images display

---

## Deployment Steps

### Step 1: Pre-Deployment
```bash
# Verify all changes committed
git status

# Create backup/tag
git tag production-v1.0.0

# Review changes
git log --oneline -5
```

- [ ] Backup created
- [ ] Tag created
- [ ] Changes reviewed

### Step 2: Deploy
```bash
# For GitHub Pages: Push to main branch
git push origin main

# Verify deployment
# Visit: https://gate7.vn (or your domain)
```

- [ ] Code pushed
- [ ] Deployment triggered
- [ ] GitHub Pages building...
- [ ] Deployment complete

### Step 3: Post-Deployment Testing
- [ ] Home page loads: https://______________________
- [ ] Menu page loads: https://____________________/menu/
- [ ] Links functional
- [ ] Images display
- [ ] Translations work
- [ ] Google Analytics reporting traffic
- [ ] No 404 errors
- [ ] No security warnings

---

## Post-Deployment (24-48 hours after)

### Monitor
- [ ] Check analytics for traffic
- [ ] Monitor error logs
- [ ] Check for user-reported issues
- [ ] Verify all pages indexed (Google Search Console)

### Documentation
- [ ] Update deployment log
- [ ] Document any issues encountered
- [ ] Record deployment time and duration
- [ ] Note any rollback requirements

**Deployment Log:**
- **Date**: ______________
- **Time**: ______________
- **Duration**: __________ minutes
- **Issues encountered**: _______________________________
- **Resolution**: _______________________________
- **Rollback needed**: [ ] Yes [ ] No

---

## Sign-Off

**Deployed By**: ________________________  
**Date**: ________________________  
**Time**: ________________________  
**Status**: [ ] ✅ Success [ ] ⚠️ With Issues [ ] ❌ Failed  

**Notes**: 
_________________________________________________________________
_________________________________________________________________

**Approval**: ________________________ (Project Manager/Lead)

---

## Issue Log

| Issue | Severity | Status | Resolution | Date |
|-------|----------|--------|------------|------|
| _____________ | [ ] 🔴 Critical [ ] 🟠 High [ ] 🟡 Medium [ ] 🟢 Low | [ ] Open [ ] Fixed [ ] Deferred | _____________ | _____ |
| _____________ | [ ] 🔴 Critical [ ] 🟠 High [ ] 🟡 Medium [ ] 🟢 Low | [ ] Open [ ] Fixed [ ] Deferred | _____________ | _____ |
| _____________ | [ ] 🔴 Critical [ ] 🟠 High [ ] 🟡 Medium [ ] 🟢 Low | [ ] Open [ ] Fixed [ ] Deferred | _____________ | _____ |

---

## Quick Verification Commands

```bash
# Check for broken internal links
grep -r 'href=' . | grep -v node_modules | grep -v '.git'

# Check for broken image paths
grep -r '<img src=' . | grep -v node_modules | grep -v '.git'

# Find missing alt tags
grep -r '<img' . | grep -v 'alt=' | grep -v node_modules

# Check for missing translations (data-en without data-vn)
grep -r 'data-en' . | grep -v 'data-vn' | grep -v node_modules

# Verify HTML validity
# Use: https://validator.w3.org/

# Check for performance issues
# Use: https://pagespeed.web.dev/
```

---

## Rollback Procedure

If deployment fails or critical issues arise:

```bash
# Revert to previous version
git revert HEAD

# Or reset to tagged version
git reset --hard production-v1.0.0
git push origin main -f

# Notify team
# Email: ___________________
# Slack: ___________________
```

- [ ] Rollback completed
- [ ] Team notified
- [ ] Previous version confirmed working

---

*Last Updated: January 2025*  
*Checklist Version: 1.0*  
*Next Review: Before each deployment*

---

## Appendix: Automated Testing Commands

```bash
# HTML Validation
# Copy HTML to: https://validator.w3.org/

# CSS Validation
# Copy CSS to: https://jigsaw.w3.org/css-validator/

# Broken Link Check
# Use: https://www.brokenlinkcheck.com/

# Page Speed Test
# Use: https://pagespeed.web.dev/

# Mobile Friendly Test
# Use: https://search.google.com/test/mobile-friendly

# SEO Audit
# Use: https://www.seobility.net/en/seocheck/
```

---

**Questions?** Contact: _____________________  
**Escalation**: _____________________
