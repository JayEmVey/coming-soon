# SEO Build & Deployment Quick Start

**Purpose:** Quick reference for SEO keyword validation in build process

---

## Build Scripts Available

### Standard Build (No Validation)
```bash
npm run build
```
- Minifies HTML, CSS, JavaScript
- Copies images and static files
- No SEO keyword checking
- Fast build

### Build with SEO Validation ⭐
```bash
npm run build:seo
```
- Runs all standard build steps
- Validates SEO keywords on all pages
- Analyzes keyword density
- Checks meta tags & length requirements
- Generates `dist/seo-build-report.json`
- Recommended for production builds

---

## Deployment Options

### Standard Deploy
```bash
npm run deploy
```
- Runs: `convert:webp` → `build` → git push
- No SEO validation
- Fastest deployment option

### Deploy with SEO Validation ⭐
```bash
npm run deploy:seo
```
- Runs: `convert:webp` → `build:seo` → git push
- Validates keywords before deploying
- Better for content updates
- Recommended for keyword changes

### Force Deploy (Git History Override)
```bash
npm run deploy:force
```
- Use only if git is out of sync
- Force-pushes to GitHub

---

## SEO Validation Checks

When running `npm run build:seo`, the system validates:

✅ **Meta Tags**
- `<title>` tag present
- `<meta name="keywords">` present
- `<meta name="description">` present
- Open Graph tags (og:title, og:description)

✅ **Title & Description Lengths**
- Title: 50-60 characters (warns if outside range)
- Description: 150-160 characters (warns if outside range)

✅ **Keyword Density**
- Target: 0.5-3% density
- Warns if too low (< 0.5%)
- Warns if too high (> 3%) - possible stuffing
- Per-keyword analysis

✅ **Page-Specific Keywords**
- Home: Gate 7 Coffee, Vietnamese Coffee, etc.
- Menu: Coffee Menu, Phin Coffee, Espresso, etc.
- Music: Gate 7 Coffee Music, Spotify Playlist, etc.
- Hiring: Tuyển dụng Barista, Barista Jobs, etc.

---

## Workflow: Update Keywords & Deploy

### Step 1: Update Keywords
```bash
# Edit SEO-KEYWORDS.md to track what you're changing
nano SEO-KEYWORDS.md
```

### Step 2: Update HTML Files
Edit the target HTML file(s):
- Update `<meta name="keywords">` content
- Update `<title>` tag
- Update `<meta name="description">` content
- Update Open Graph tags if needed

Example:
```html
<!-- Title -->
<title>Gate 7 Coffee Roastery | Vietnamese Specialty Coffee HCM</title>

<!-- Meta Keywords -->
<meta name="keywords" content="Gate 7 Coffee, Vietnamese Coffee, Phin Coffee, Specialty Coffee, Coffee Roastery, HCMC">

<!-- Meta Description -->
<meta name="description" content="Discover Gate 7 Coffee Roastery in Ho Chi Minh City. Authentic Vietnamese Phin coffee, specialty espresso, and unique matcha drinks.">

<!-- Open Graph -->
<meta property="og:title" content="Gate 7 Coffee Roastery | Vietnamese Specialty Coffee">
<meta property="og:description" content="Experience authentic Vietnamese coffee culture...">
```

### Step 3: Validate Build
```bash
npm run build:seo
```

This will:
1. Build the production bundle
2. Validate all SEO requirements
3. Generate `dist/seo-build-report.json`
4. Show warnings for any SEO issues

**Output Example:**
```
📄 index.html (Home page)
   ⚠️  Low keyword density for "Vietnamese Coffee": 0.28%
   ⚠️  Meta description too long: 167 chars (recommended: 150-160)
```

### Step 4: Fix Issues
Based on warnings, adjust your HTML:
- Add more keyword mentions (for low density)
- Remove some keywords (for high density)
- Shorten/lengthen description
- Add missing meta tags

### Step 5: Re-validate (if needed)
```bash
npm run build:seo
```

### Step 6: Deploy with Validation
```bash
npm run deploy:seo
```

This will:
1. Convert images to WebP format
2. Run SEO-enhanced build (with validation)
3. Git commit with message: "chore: production build with SEO validation"
4. Push to GitHub → Live in ~2 minutes

### Step 7: Verify
Check the generated report:
```bash
cat dist/seo-build-report.json
```

Expected output if all SEO checks passed:
```json
{
  "timestamp": "2025-11-19T...",
  "totalSize": 11765649,
  "files": 5,
  "seoWarnings": [],
  "seoPassed": true
}
```

---

## Keyword Density Guide

### How to Increase Keyword Density

If a keyword has too low density (< 0.5%):

1. Add keyword to page heading
2. Include in subheadings
3. Mention in first paragraph
4. Use in image alt text
5. Include in meta description naturally
6. Add to bullet points/content

**Example for "Phin Coffee":**
```html
<h1>Gate 7 Coffee - Premium Phin Coffee</h1>
<p>Discover our authentic Phin coffee crafted from...</p>
<h2>Our Phin Coffee Selection</h2>
<p>Each Phin coffee is roasted to perfection...</p>
```

### How to Decrease Keyword Density

If a keyword has too high density (> 3%):

1. Use synonyms instead (Vietnamese coffee, specialty coffee)
2. Vary word forms (coffee vs coffees)
3. Remove redundant mentions
4. Use related keywords instead
5. Check for keyword stuffing mistakes

---

## SEO Report File

**Location:** `dist/seo-build-report.json`

**Contents:**
```json
{
  "timestamp": "ISO-8601 format timestamp",
  "totalSize": "integer (bytes)",
  "files": "integer (number of HTML files)",
  "seoWarnings": [
    {
      "file": "filename.html",
      "page": "page name",
      "issues": ["warning 1", "warning 2"]
    }
  ],
  "seoPassed": "boolean - true if no warnings"
}
```

**How to use:**
- Check after each deployment
- Track SEO quality over time
- Compare against previous builds
- Use for SEO audit documentation

---

## Pages & Keywords

### Home Page (index.html)
Primary keywords: Gate 7 Coffee, Vietnamese Coffee, Phin Coffee, Specialty Coffee
Location: HCMC, Ho Chi Minh City
Variations: Arabica, Robusta, Coffee Roastery, Cafe

### Menu Page (menu/index.html)
Primary keywords: Coffee Menu, Phin Coffee, Espresso, Matcha
Items: Cappuccino, Latte, Mocha, Americano
Category: Phin Cafe, Espresso Bar, Matcha & Houjicha

### Music Page (music/spotify.html)
Primary keywords: Gate 7 Coffee Music, Spotify Playlist
Related: Coffee Shop Music, Ambient Music, Background Music

### Hiring Page (hiring/index.html)
Primary keywords: Tuyển dụng Barista, Barista Jobs HCM
Related: Coffee Jobs Vietnam, Cafe Staff, Coffee Skills

---

## Troubleshooting

### Build Fails
```bash
# Check Node.js version
node --version  # Should be >=14.0.0

# Reinstall dependencies
npm install

# Try build again
npm run build:seo
```

### SEO Warnings Not Going Away
1. Verify you edited the correct file
2. Check keyword spelling matches
3. Ensure meta tags use correct attribute names
4. Count word density manually
5. Check for typos in content

### Deployment Fails
```bash
# Check git status
git status

# Stage all changes
git add .

# Try deploy again
npm run deploy:seo
```

### Report Not Generated
- Check `dist/` folder exists
- Verify build completed successfully
- Look for `seo-build-report.json` in dist/
- Check terminal output for errors

---

## SEO Best Practices

✅ **Do:**
- Target 0.5-3% keyword density
- Include keywords in title & description
- Use natural language
- Update keywords seasonally
- Test before deploying
- Monitor rankings monthly
- Document changes

❌ **Don't:**
- Keyword stuff (> 3%)
- Use irrelevant keywords
- Ignore warnings
- Deploy without validation
- Change all keywords at once
- Copy competitor keywords
- Forget to update descriptions

---

## Related Files

- **SEO-KEYWORDS.md** - Central keyword management
- **AGENTS.md** - All build commands reference
- **SEO.md** - Full SEO strategy guide
- **dist/seo-build-report.json** - Build-time validation report

---

## Commands Cheat Sheet

```bash
# Quick validate (no deploy)
npm run build:seo

# Deploy with SEO validation
npm run deploy:seo

# Standard build (fast, no validation)
npm run build

# Standard deploy (fast, no validation)
npm run deploy

# Force deploy (git override)
npm run deploy:force

# Check SEO report
cat dist/seo-build-report.json
```

---

**Status:** Ready for Production  
**Last Updated:** Nov 19, 2025  
**Maintained By:** Gate 7 Coffee Team
