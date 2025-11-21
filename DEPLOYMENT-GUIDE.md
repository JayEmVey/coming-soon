# Gate 7 Coffee - Deployment Guide

**Last Updated:** November 21, 2025  
**Status:** ✅ Production Ready

---

## Quick Start

### Deploy to Production
```bash
npm run deploy
```

This single command handles everything:
1. ✅ Validates SEO across all pages
2. ✅ Builds minified production bundle
3. ✅ Copies static assets
4. ✅ Creates Git commit
5. ✅ Pushes to GitHub

Site is live in ~2 minutes.

---

## Available Commands

### Build Commands

#### Standard Build (No SEO Check)
```bash
npm run build
```
- Minifies HTML, CSS, JavaScript
- Copies images as-is (no conversion)
- Copies static files
- **Output:** `dist/` directory
- **Use:** Quick local testing

#### Build with SEO Validation (Recommended)
```bash
npm run build:seo
```
- Minifies HTML, CSS, JavaScript
- Validates SEO on all pages:
  - Meta tags (title, description, keywords, og:*, twitter:*)
  - Keyword density (warns if too high/low)
  - Title length (50-60 chars)
  - Description length (150-160 chars)
- Generates `seo-build-report.json`
- **Output:** `dist/` directory
- **Use:** Before final deployment

#### Build with Protection (Legacy)
```bash
npm run build:protect
```
- Standard build
- Ready for image protection features
- **Use:** Optional enhanced builds

---

### Deployment Commands

#### Complete Deployment (Recommended)
```bash
npm run deploy
```
- Runs `npm run build:seo`
- Validates SEO for all pages
- Copies static assets
- Creates timestamped Git commit
- Pushes to GitHub
- **Result:** Site live in ~2 minutes
- **Use:** Every production deployment

#### Deploy with SEO Validation Only
```bash
npm run deploy:seo
```
- Runs `npm run build:seo`
- Creates Git commit
- Pushes to GitHub
- **Legacy:** Use `npm run deploy` instead

#### Force Deploy (Rare)
```bash
npm run deploy:force
```
- Force-pushes to git
- Use only if git history is out of sync
- **Warning:** Destructive operation
- **Use:** Emergency only

---

## Pre-Deployment Checklist

Before running `npm run deploy`:

### 1. Content Check
- [ ] All pages have correct meta tags
- [ ] Menu prices are up-to-date
- [ ] Contact information is current
- [ ] Links are working

### 2. SEO Check
- [ ] Meta titles (50-60 chars) ✓
- [ ] Meta descriptions (150-160 chars) ✓
- [ ] Keywords present and balanced ✓
- [ ] Open Graph tags complete ✓

### 3. Images
- [ ] Logo images present
- [ ] Menu images up-to-date
- [ ] Social icons in place
- [ ] All images have alt text

### 4. Git Status
- [ ] All changes committed locally
- [ ] Branch is up-to-date with remote
- [ ] No uncommitted files in working directory

### 5. Testing (Optional)
```bash
npm run build:seo
```
- Check `dist/seo-build-report.json` for warnings
- Open `dist/index.html` in browser
- Test responsiveness (mobile, tablet, desktop)

---

## Deployment Process

### Step 1: Make Your Changes
```bash
# Edit files
vim index.html
# or update CSS/content as needed
```

### Step 2: Test Build (Optional)
```bash
npm run build:seo
# Review seo-build-report.json for any warnings
```

### Step 3: Test Production Build (Optional but Recommended)
```bash
npm run build
npm run test
# Opens test server at http://localhost:8080
# Test on mobile, tablet, desktop
# See TESTING-GUIDE.md for complete checklist
# Press CTRL+C to stop server
```

### Step 4: Commit to Git
```bash
git add .
git commit -m "Update: describe your changes"
# Example: "Update menu prices and add Matcha Latte"
```

### Step 5: Deploy
```bash
npm run deploy
```

The script will:
- Validate SEO
- Build production files
- Create deployment commit
- Push to GitHub
- **Status:** Sit back, site updates in ~2 minutes

---

## What Gets Deployed

### Files Copied to `dist/`
```
dist/
├── index.html              (minified)
├── menu/index.html         (minified)
├── music/index.html      (minified)
├── hiring/index.html       (minified)
├── hiring/banner.html      (minified)
├── css/
│   └── style-gate7.css     (minified)
├── js/
│   ├── language-switcher.js
│   ├── scroll-animations.js
│   └── responsive-images.js
├── images/
│   └── [all PNG/JPG files as-is]
├── CNAME                   (custom domain)
├── robots.txt              (SEO crawler directives)
├── sitemap.xml             (SEO sitemap)
├── service-worker.js       (PWA support)
└── seo-build-report.json   (SEO validation report)
```

---

## SEO Validation Details

### What Gets Checked

**Meta Tags:**
- `name="description"`
- `name="keywords"`
- `property="og:title"`
- `property="og:description"`
- `name="twitter:card"`

**Title & Description Length:**
- Title: 50-60 characters (warning if shorter/longer)
- Description: 150-160 characters (warning if shorter/longer)

**Keyword Density:**
- Each keyword checked per page
- Minimum: 0.5% density
- Maximum: 3% density
- Warnings if outside range

### SEO Report File

After deployment, check `dist/seo-build-report.json`:

```json
{
  "timestamp": "2025-11-21T10:30:00.000Z",
  "totalSize": 1024000,
  "files": 5,
  "seoPassed": true,
  "seoWarnings": []
}
```

---

## Troubleshooting

### Build Fails: "dist directory is empty"
- Check that all HTML files exist (index.html, menu/index.html, etc.)
- Verify `build-seo-enhanced.js` is executable
- Try: `npm run build` first to test

### SEO Warnings Appear
- Check `seo-build-report.json` for specific issues
- Warnings don't prevent deployment, but should be reviewed
- Common: Meta description too long/short, keyword density

### Git Deployment Fails
- Verify you're on the correct branch (usually `main` or `master`)
- Check git credentials: `git config --list`
- Ensure remote is set: `git remote -v`
- Try: `git push origin [branch-name]` manually

### Images Not Showing After Deploy
- Check image paths in HTML (should be `/images/filename.png`)
- Verify images exist in `images/` directory
- Check browser console for 404 errors
- Verify GitHub Pages settings

---

## Performance Metrics

### Typical Build Output
```
✓ Minification savings: 28-30% HTML, 26% CSS
✓ Total dist size: ~1.2 MB (including all assets)
✓ Build time: <5 seconds
✓ Deployment time: ~2 minutes to live
```

### Build Components
- 5 HTML files (minified)
- 1 CSS file (minified)
- 3 JS files (minified)
- ~30 image files (copied as-is)
- 4 static files (CNAME, robots.txt, sitemap.xml, service-worker.js)

---

## Image Handling

### Current Image System
- **Format:** PNG, JPG (no WebP)
- **Processing:** Copy as-is (no resizing/optimization)
- **Lazy Loading:** Supported via HTML `loading="lazy"`
- **Responsive:** CSS media queries handle sizes

### Image Guidelines
- Store originals in `images/` directory
- Use PNG for logos and icons
- Use JPG for photos
- Add alt text to all images
- Keep file sizes reasonable (<500KB each)

---

## Service Worker & PWA

### What's Included
- Offline caching (critical assets)
- Network-first strategy for documents
- Cache-first strategy for images
- Auto-cache updates on new visit

### Service Worker Caching
```
Cached on Install:
- / and /index.html
- /menu/ and /menu/index.html
- /hiring/ and /hiring/index.html
- CSS files
- JS files
- Key images (logos, icons)
```

### Cache Invalidation
- Automatic when service-worker.js version changes
- Old caches deleted on activation
- Users always see latest content after refresh

---

## Security Notes

### What's Secure
- ✅ HTTPS enforced (GitHub Pages)
- ✅ No external API keys exposed
- ✅ Service Worker for offline safety
- ✅ Content Security Policy headers ready

### Best Practices
- Don't commit sensitive data (.env files)
- Use environment variables for API keys
- Keep dependencies updated
- Review git commits before pushing

---

## Monitoring Deployment

### Check Deployment Status
1. Go to GitHub repo
2. Click "Actions" tab
3. View latest workflow run
4. Look for ✅ or ❌ status

### Verify Site is Live
```bash
# Check if deployed
curl -I https://gate7.vn

# Should see 200 OK response
```

### Check Site Content
- Open https://gate7.vn in browser
- Verify latest changes are visible
- Test responsive design
- Check console for errors

---

## Rollback Procedure

If something goes wrong:

```bash
# 1. Find previous good commit
git log --oneline

# 2. Revert to that commit
git revert COMMIT_HASH

# 3. Or reset and re-push
git reset --hard COMMIT_HASH
git push origin [branch] -f

# 4. Site will rebuild and update
```

---

## Tips & Best Practices

### Do's ✅
- Run `npm run build:seo` before deployment
- Review SEO report
- Test changes locally first
- Commit often with meaningful messages
- Use `npm run deploy` for all production updates

### Don'ts ❌
- Don't manually edit `dist/` directory
- Don't commit WebP images
- Don't skip SEO validation
- Don't use `npm run deploy:force` unless necessary
- Don't push to GitHub without local commit

---

## Support & Questions

For issues or questions:
1. Check `BUILD-REVIEW.md` for technical details
2. Review `AGENTS.md` for development guidelines
3. Check GitHub Actions for deployment logs
4. See `README.md` for full documentation

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0.0 | Nov 21, 2025 | Removed WebP, simplified deployment |
| 1.0.0 | Oct 2025 | Initial build system |

---

**Happy Deploying! 🚀**
