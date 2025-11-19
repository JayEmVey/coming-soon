# SEO Deployment Checklist

**Purpose:** Complete pre-deployment checklist for SEO-optimized builds

**Version:** 1.0  
**Last Updated:** Nov 19, 2025  
**Status:** ✅ Ready for Use

---

## Pre-Deployment Checklist

### Step 1: Review Keywords (15 min)
- [ ] Open `SEO-KEYWORDS.md`
- [ ] Review current keywords for page(s) you updated
- [ ] Check keyword density targets (0.5-3%)
- [ ] Verify priorities haven't changed
- [ ] Update "Current Status" column with latest info

**File:** `SEO-KEYWORDS.md`

---

### Step 2: Update HTML Files (20 min)
For each page you're updating:

- [ ] Update `<title>` tag
  - Length: 50-60 characters
  - Include primary keyword
  - Keep brand name

- [ ] Update `<meta name="keywords">` content
  - List 5-9 primary keywords
  - Separate by commas
  - Order by priority

- [ ] Update `<meta name="description">` content
  - Length: 150-160 characters
  - Include primary keyword naturally
  - Include location (HCMC/Ho Chi Minh City)
  - Include call-to-action

- [ ] Update Open Graph tags
  - `og:title` (same as title tag)
  - `og:description` (can be different from meta)
  - Verify image path if included

**Example HTML:**
```html
<!-- Title: 57 chars ✓ -->
<title>Gate 7 Coffee Roastery | Vietnamese Specialty Coffee HCM</title>

<!-- Keywords: 9 keywords ✓ -->
<meta name="keywords" content="Gate 7 Coffee, Vietnamese Coffee, Phin Coffee, Specialty Coffee, Coffee Roastery, HCMC, Ho Chi Minh, Arabica, Robusta">

<!-- Description: 155 chars ✓ -->
<meta name="description" content="Discover Gate 7 Coffee Roastery in Ho Chi Minh City. Authentic Vietnamese Phin coffee, specialty espresso, and unique matcha drinks. Visit us at 162A Nguyễn Trường Tộ.">

<!-- Open Graph -->
<meta property="og:title" content="Gate 7 Coffee Roastery | Vietnamese Specialty Coffee">
<meta property="og:description" content="Experience authentic Vietnamese coffee culture. Phin drip coffee, specialty espresso, and unique matcha creations.">
```

---

### Step 3: Verify Content Has Keywords (15 min)
For each keyword, check that:

- [ ] **Home Page Keywords:**
  - [ ] "Gate 7 Coffee" mentioned in heading + content
  - [ ] "Vietnamese Coffee" in intro/description
  - [ ] "Phin Coffee" somewhere visible
  - [ ] "Specialty Coffee" in description
  - [ ] Location terms (HCMC, Ho Chi Minh) mentioned

- [ ] **Menu Page Keywords:**
  - [ ] "Coffee Menu" in title/heading
  - [ ] "Vietnamese Coffee" in descriptions
  - [ ] "Phin Coffee" in menu items
  - [ ] "Espresso" in espresso section
  - [ ] "Matcha" in matcha/tea section

- [ ] **Other Pages:**
  - [ ] Primary keywords appear in natural places
  - [ ] No keyword stuffing (not repeated unnaturally)
  - [ ] Synonyms used to avoid repetition

---

### Step 4: Build with SEO Validation (5 min)

```bash
npm run build:seo
```

**Expected Output:**
```
🔨 Building production bundle with SEO validation...
📝 Minifying HTML files & validating SEO...
  ✓ index.html (size, % smaller)
  ✓ menu/index.html
  ...
✅ Build complete!
📊 Total size: X bytes (X.XX MB)

🔍 SEO Validation Report:
```

---

### Step 5: Review SEO Report (10 min)

**Open:** `dist/seo-build-report.json`

**Check for:**
- [ ] Number of warnings
- [ ] Specific issues listed
- [ ] Affected pages

**Common Issues to Fix:**

**⚠️ Low keyword density**
- Add more mentions of the keyword in content
- Use in headings, lists, or paragraphs
- Example: "Phin Coffee" should appear 2-5 times on menu page

**⚠️ Meta description too long**
- Remove 5-10 characters
- Trim adjectives or details
- Keep primary keyword

**⚠️ Meta description too short**
- Add 20-50 characters
- Include more details about what page offers
- Natural expansion, no keyword stuffing

**⚠️ Missing meta tags**
- Add `<meta name="keywords" content="...">` if missing
- Add `<meta name="description" content="...">` if missing
- Verify attribute names are exactly right

---

### Step 6: Fix Issues (Varies)

For each warning in the report:

1. **Identify the issue** - Read the warning message
2. **Locate in HTML** - Find the relevant tag or content
3. **Make the fix** - Update the file
4. **Re-validate** - Run `npm run build:seo` again

**Repeat until `"seoPassed": true` in report**

---

### Step 7: Final Validation (2 min)

```bash
npm run build:seo
```

**Verify:**
- [ ] Build completes successfully
- [ ] `dist/seo-build-report.json` shows: `"seoPassed": true`
- [ ] No critical errors in console
- [ ] All warnings have been addressed

---

### Step 8: Deploy with SEO Validation (3 min)

```bash
npm run deploy:seo
```

**Process:**
1. Converts images to WebP
2. Runs SEO-enhanced build
3. Creates git commit
4. Pushes to GitHub

**Expected Output:**
```
Converting images...
Building with SEO validation...
✅ Build complete!
[master commit-hash] chore: production build with SEO validation
...
```

---

### Step 9: Monitor Post-Deployment (Ongoing)

After deployment goes live (~2 minutes):

- [ ] Visit `gate7.vn` in browser
- [ ] Check page titles in browser tab
- [ ] Inspect page source for meta tags
- [ ] Verify Open Graph tags work (share on Facebook/social)
- [ ] Check Google Search Console for indexing
- [ ] Monitor for new errors/warnings

---

## Deployment Scenarios

### Scenario 1: Update Single Page Keywords

**Time:** 30-45 minutes

1. Edit SEO-KEYWORDS.md (5 min)
2. Edit HTML file meta tags & content (15 min)
3. Run `npm run build:seo` (2 min)
4. Fix issues if any (10 min)
5. Run `npm run deploy:seo` (3 min)

**Command:**
```bash
npm run deploy:seo
```

---

### Scenario 2: Multiple Page Updates

**Time:** 1-2 hours

1. Edit SEO-KEYWORDS.md (10 min)
2. Update all HTML files (30-45 min)
3. Run `npm run build:seo` (2 min)
4. Review & fix all issues (15-30 min)
5. Run `npm run deploy:seo` (3 min)

**Commands:**
```bash
npm run build:seo
# Review dist/seo-build-report.json
npm run deploy:seo
```

---

### Scenario 3: Emergency Fix (No SEO Changes)

**Time:** 5 minutes

Just content fixes, no keyword changes:

```bash
npm run deploy
```

(Uses standard build, no SEO validation)

---

### Scenario 4: New Page Launch

**Time:** 1-2 hours

1. Create new HTML file
2. Add to `build-seo-enhanced.js` SOURCE_FILES
3. Add keyword config to SEO_CONFIG
4. Update SEO-KEYWORDS.md
5. Run `npm run build:seo`
6. Fix all SEO issues
7. Run `npm run deploy:seo`

---

## Quality Checklist

### Meta Tags ✓
- [ ] Title: 50-60 characters
- [ ] Keywords: 5-9 comma-separated
- [ ] Description: 150-160 characters
- [ ] OG Title: Present and relevant
- [ ] OG Description: Present and relevant

### Content ✓
- [ ] Primary keywords appear naturally
- [ ] No keyword stuffing
- [ ] 0.5-3% keyword density per keyword
- [ ] Good readability maintained
- [ ] Location terms included (HCMC/Ho Chi Minh)

### Technical ✓
- [ ] All HTML files valid
- [ ] Build completes without errors
- [ ] SEO validation passes
- [ ] Report shows seoPassed: true
- [ ] Images still load correctly

### Post-Deploy ✓
- [ ] Site loads correctly
- [ ] All pages accessible
- [ ] Meta tags visible in page source
- [ ] No 404 errors
- [ ] Google Search Console updated

---

## Keywords by Page

### Home (index.html)
**Primary (9):** Gate 7 Coffee, Vietnamese Coffee, Phin Coffee, Specialty Coffee, Coffee Roastery, HCMC, Ho Chi Minh, Arabica, Robusta

### Menu (menu/index.html)
**Primary (7):** Coffee Menu, Vietnamese Coffee, Phin Coffee, Espresso, Matcha, Coffee Prices, HCMC

### Music (spotify.html)
**Primary (4):** Gate 7 Coffee Music, Coffee Shop Music, Spotify Playlist, Ambient Music

### Hiring (hiring/index.html)
**Primary (3):** Tuyển dụng Barista, Barista Jobs HCM, Coffee Jobs Vietnam

### Brand Story (brand-story/index.html)
**Primary (7):** Gate 7 Coffee Story, Coffee Heritage, Coffee Passion, Quality Coffee, Specialty Focus, Coffee Culture

### Coming Soon (public/index.html)
**Primary (7):** Coming Soon, Gate 7 Coffee, Pre-launch, Newsletter Signup, Vietnamese Coffee, Email Notification

---

## Troubleshooting

### Problem: Build fails
```bash
# Check Node.js version
node --version

# Reinstall dependencies
npm install

# Try again
npm run build:seo
```

### Problem: SEO warnings keep appearing
1. Check keyword spelling matches exactly
2. Count characters manually for length
3. Search HTML file for meta tag
4. Verify tag attribute names (not "meta-keywords", just "keywords")

### Problem: Report shows seoPassed: false
- Review all warnings in `dist/seo-build-report.json`
- Fix each warning per guidance above
- Re-run `npm run build:seo` after each fix
- Deploy only when `seoPassed: true`

### Problem: Deployment fails
```bash
# Check git status
git status

# Add all changes
git add .

# Try deploy again
npm run deploy:seo
```

---

## Reference Files

- **SEO-KEYWORDS.md** - Complete keyword reference
- **SEO_BUILD_QUICK_START.md** - Quick reference guide
- **AGENTS.md** - All commands quick ref
- **dist/seo-build-report.json** - Build validation report

---

## Command Reference

```bash
# Validate locally (no deploy)
npm run build:seo

# Deploy with validation
npm run deploy:seo

# Quick deploy (no validation)
npm run deploy

# Check validation report
cat dist/seo-build-report.json

# View all keywords
cat SEO-KEYWORDS.md

# Quick start guide
cat SEO_BUILD_QUICK_START.md
```

---

## Timing Guide

| Task | Time |
|------|------|
| Review keywords | 15 min |
| Update HTML files | 20 min |
| Verify content | 15 min |
| Build & validate | 5 min |
| Review report | 10 min |
| Fix issues | 10-20 min |
| Final validation | 2 min |
| Deploy | 3 min |
| **Total** | **1-2 hours** |

---

## Success Criteria

✅ **Build Validation:**
- [ ] `npm run build:seo` completes without errors
- [ ] `dist/seo-build-report.json` generated
- [ ] `"seoPassed": true` in report

✅ **Content Quality:**
- [ ] All keywords appear naturally in content
- [ ] No keyword stuffing detected
- [ ] Keyword density 0.5-3% per keyword

✅ **Meta Tags:**
- [ ] Titles 50-60 characters
- [ ] Descriptions 150-160 characters
- [ ] All required meta tags present
- [ ] Open Graph tags valid

✅ **Deployment:**
- [ ] Git commit succeeds
- [ ] GitHub Pages push succeeds
- [ ] Site live within 2 minutes
- [ ] No 404 errors

---

**Status:** ✅ Complete & Ready to Use  
**Last Updated:** Nov 19, 2025  
**Maintained By:** Gate 7 Coffee Team
