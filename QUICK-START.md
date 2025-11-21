# Quick Start Guide

## Complete Deployment Workflow

### For Daily Use

```bash
# 1. Make your changes
vim index.html              # Edit files as needed

# 2. Build minified production
npm run build

# 3. Test production build
npm run test
# Opens: http://localhost:8080
# Check homepage, menu, images, links
# Press CTRL+C to stop

# 4. If tests pass, commit
git add .
git commit -m "Update menu prices"

# 5. Deploy to production
npm run deploy
# Site live in ~2 minutes
```

---

## Command Cheat Sheet

### Building

| Command | Purpose | Time |
|---------|---------|------|
| `npm run build` | Minify HTML/CSS/JS | ~5s |
| `npm run build:seo` | Build + SEO validation | ~5s |
| `npm run build:protect` | Build + protection ready | ~5s |

### Testing

| Command | Purpose | Port |
|---------|---------|------|
| `npm run test` | Test minified build locally | 8080 |
| `npm run build && npm run test` | Full workflow | 8080 |

### Deploying

| Command | Purpose | Safe |
|---------|---------|------|
| `npm run deploy` | Full deployment with SEO check | ✅ |
| `npm run deploy:seo` | Deploy with SEO validation | ✅ |
| `npm run deploy:force` | Force deploy (rare) | ⚠️ |

---

## Testing Checklist (Quick)

When you run `npm run test`, verify:

- [ ] Homepage loads: http://localhost:8080
- [ ] Menu page works: http://localhost:8080/menu
- [ ] Music page works: http://localhost:8080/music
- [ ] Hiring page works: http://localhost:8080/hiring
- [ ] Images display
- [ ] No red errors in console (F12)
- [ ] Language switcher works
- [ ] Responsive on mobile (F12 → device mode)

**Expected time:** 2-3 minutes

---

## Full Deployment Flow

```
┌─────────────────────────────────────────────────┐
│ DEVELOPMENT                                      │
│ • Edit source files (index.html, style.css, etc)|
│ • Test locally with: python -m http.server 8000 │
└──────────────┬──────────────────────────────────┘
               ↓
┌─────────────────────────────────────────────────┐
│ BUILD                                            │
│ npm run build                                    │
│ • Minifies HTML (-30%), CSS (-26%), JS (-40%)   │
│ • Copies images and static files                │
│ • Creates /dist folder                          │
└──────────────┬──────────────────────────────────┘
               ↓
┌─────────────────────────────────────────────────┐
│ TEST PRODUCTION BUILD                            │
│ npm run test                                     │
│ • Serves minified /dist locally                 │
│ • http://localhost:8080                         │
│ • Verify everything works                       │
│ • CTRL+C to stop                                │
└──────────────┬──────────────────────────────────┘
               ↓
        [ Tests Pass? ]
           /      \
         YES       NO
          ↓        ↓
    DEPLOY   Fix Issues
    ↓        Rebuild
    ↓        Test Again
    ↓        ↓
┌──────────┐ └──→ (back to TEST)
│ DEPLOY   │
│ npm run  │
│ deploy   │
└─────┬────┘
      ↓
┌─────────────────────────────────────────────────┐
│ PRODUCTION (GitHub Pages)                       │
│ • SEO validated                                  │
│ • Build committed to git                        │
│ • Pushed to GitHub                              │
│ • Site live at https://gate7.vn                 │
│ • Live in ~2 minutes                            │
└─────────────────────────────────────────────────┘
```

---

## Step-by-Step: First Deploy

### Step 1: Make Changes
```bash
# Edit any HTML file
nano index.html
# or use your favorite editor
```

### Step 2: Build
```bash
npm run build
# Creates /dist folder with minified files
# Takes ~5 seconds
```

### Step 3: Test
```bash
npm run test
# Starts server on http://localhost:8080
# Test in browser
# Press CTRL+C when done
```

### Step 4: Commit
```bash
git add .
git commit -m "Update: your changes"
# Example: git commit -m "Update menu prices and add new drinks"
```

### Step 5: Deploy
```bash
npm run deploy
# Validates SEO
# Builds minified files
# Creates git commit
# Pushes to GitHub
# Done! Site updates in ~2 minutes
```

---

## Testing Devices

### Desktop (Chrome)
1. Open http://localhost:8080
2. Everything should look perfect
3. No console errors (F12)

### Mobile (Chrome DevTools)
1. Press F12 → Click device icon
2. Select "iPhone 12" or similar
3. Test in portrait and landscape
4. Check buttons are clickable
5. Check no horizontal scroll

### Tablet (Chrome DevTools)
1. Press F12 → Click device icon
2. Select "iPad" or "iPad Pro"
3. Check layout looks good
4. Verify images scale correctly

### Real Device
1. Get your computer IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. On mobile phone/tablet: `http://YOUR_IP:8080`
3. Test real touch interactions
4. Check on actual screen sizes

---

## Common Tasks

### Update Menu Prices
```bash
# 1. Edit menu/index.html
nano menu/index.html

# 2. Build and test
npm run build && npm run test
# Visit http://localhost:8080/menu/

# 3. Verify new prices show
# 4. CTRL+C to stop test

# 5. Commit and deploy
git add .
git commit -m "Update menu prices"
npm run deploy
```

### Add New Page
```bash
# 1. Create new HTML file
# 2. Add to package.json build script
# 3. Build and test
npm run build && npm run test
# Visit http://localhost:8080/new-page/

# 4. Verify new page loads
# 5. CTRL+C to stop test

# 6. Commit and deploy
git add .
git commit -m "Add new page"
npm run deploy
```

### Update Logo/Images
```bash
# 1. Replace image in /images folder
# 2. Update HTML if needed
# 3. Build and test
npm run build && npm run test
# Visit http://localhost:8080

# 4. Verify image displays
# 5. CTRL+C to stop test

# 6. Commit and deploy
git add .
git commit -m "Update logo"
npm run deploy
```

### Update Styling
```bash
# 1. Edit css/style-gate7.css
nano css/style-gate7.css

# 2. Build and test
npm run build && npm run test
# Visit http://localhost:8080

# 3. Verify styling looks correct on all devices
# 4. CTRL+C to stop test

# 5. Commit and deploy
git add .
git commit -m "Update styling"
npm run deploy
```

---

## Troubleshooting

### "npm: command not found"
Install Node.js from https://nodejs.org

### "dist/ not found"
Run `npm run build` first

### "Port 8080 in use"
```bash
# Find what's using port 8080
lsof -i :8080

# Kill it
kill -9 <PID>

# Or use different port (edit test.js)
```

### "Images not loading in test"
1. Hard refresh: CTRL+Shift+R
2. Check `/dist/images/` folder exists
3. Check paths use `/images/filename.png`

### "Styles look wrong"
1. Hard refresh: CTRL+Shift+R
2. Verify `/dist/css/style-gate7.css` exists
3. Check browser console (F12) for errors

### "Deployment failed"
```bash
# Check git status
git status

# Verify you're on correct branch
git branch

# Try manual push
git push origin main
```

---

## Pro Tips

### Speed Up Testing
```bash
# Skip SEO validation for quick testing
npm run build && npm run test
# Then before deployment:
npm run build:seo
```

### Test on Real Mobile
```bash
# Get your IP
ipconfig          # Windows
ifconfig          # Mac/Linux

# On mobile/tablet browser:
# Visit http://<YOUR_IP>:8080
```

### Skip Test (Emergency Only)
```bash
npm run deploy
# This includes SEO validation
# Only use if you're very confident
```

### Check What Changed
```bash
# See changes since last deploy
git diff HEAD~1

# See commit history
git log --oneline
```

---

## Files You'll Edit

| File | Purpose |
|------|---------|
| `index.html` | Home page content |
| `menu/index.html` | Menu page |
| `hiring/index.html` | Jobs/hiring page |
| `music/index.html` | Music page |
| `css/style-gate7.css` | Styling |
| `js/*.js` | JavaScript |
| `images/*` | Images |

---

## Files You'll Use (Commands)

| File | Command | Purpose |
|------|---------|---------|
| `build-simple.js` | `npm run build` | Quick build |
| `build-seo-enhanced.js` | `npm run build:seo` | Build + validation |
| `test.js` | `npm run test` | Test server |
| `deploy-complete.js` | `npm run deploy` | Full deployment |

---

## What Gets Deployed

When you run `npm run deploy`, these files go to GitHub:

```
dist/
├── index.html           (minified)
├── menu/index.html      (minified)
├── hiring/index.html    (minified)
├── music/index.html   (minified)
├── css/style-gate7.css  (minified)
├── js/                  (minified)
├── images/              (copied as-is)
├── CNAME                (custom domain)
├── robots.txt           (SEO)
├── sitemap.xml          (SEO)
└── service-worker.js    (offline support)
```

Then GitHub Pages:
1. Receives the commit
2. Builds the site
3. Deploys to https://gate7.vn
4. **Live in ~2 minutes**

---

## Success Checklist

Before deploying, verify:

- [ ] All changes made and tested
- [ ] `npm run build` succeeded
- [ ] `npm run test` served correctly
- [ ] Tested on desktop browser
- [ ] Tested on mobile (DevTools)
- [ ] Tested on tablet (DevTools)
- [ ] No console errors
- [ ] All links work
- [ ] Images display
- [ ] Styling looks correct
- [ ] Ready for production

---

## Need Help?

1. **Quick Reference:** This file (QUICK-START.md)
2. **Testing Details:** TESTING-GUIDE.md
3. **Deployment Details:** DEPLOYMENT-GUIDE.md
4. **Development Guide:** AGENTS.md
5. **Full Overview:** README.md

---

## Summary

```
Source Files
    ↓
npm run build (minify)
    ↓
npm run test (verify)
    ↓
Browser check (everything good?)
    ↓
npm run deploy (go live!)
    ↓
Site Updated in ~2 minutes
```

**That's it! You're ready to deploy.** 🚀

---

**Last Updated:** November 21, 2025
**Status:** Production Ready ✅
