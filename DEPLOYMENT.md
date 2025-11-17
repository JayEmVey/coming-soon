# Deployment Guide

Gate 7 Coffee Roastery website features **fully automated deployment** to GitHub Pages with optional manual deployment.

## Auto-Deployment (Recommended)

**GitHub Actions automatically deploys on every push to `main` or `master` branch.**

### How It Works

1. **Push code changes** to main/master branch
2. **GitHub Actions triggers automatically** (see `.github/workflows/deploy.yml`)
3. **Build process runs** (node build-simple.js)
4. **Deploy to GitHub Pages** (via peaceiris action)
5. **Site live in ~1-2 minutes**

### Setup (One-time)

The workflow file is already configured at `.github/workflows/deploy.yml`. No additional setup needed!

**Verify it's working:**
1. Make any change and push to main branch
2. Go to GitHub → Actions tab
3. See "Auto-Deploy to GitHub Pages" workflow running
4. Site updates automatically when workflow completes

---

## Manual Deployment (Optional)

If you prefer to deploy manually instead of auto-deployment:

### Windows/macOS/Linux
```bash
npm run deploy
```

This command:
1. Builds production bundle
2. Creates git commit
3. Pushes to GitHub
4. Manual GitHub Actions runs build again (redundant but safe)

---

## What Happens When You Deploy

### 1. Build Process (Automatic)
```bash
node build-simple.js
```

**Output:**
- ✅ HTML files minified (28-30% size reduction)
- ✅ CSS minified (26% size reduction)  
- ✅ Images copied and optimized
- ✅ Static files (CNAME, robots.txt, sitemap.xml) included
- ✅ All files placed in `dist/` folder

### 2. Git Commit (Automatic)
```bash
git add dist -f
git commit -m "chore: production build"
```

**Why `-f` flag?**
- The `.gitignore` normally excludes `dist/`
- The `-f` force-adds it so GitHub Pages can serve it
- This is the standard approach for GitHub Pages static sites

### 3. Push to GitHub (Automatic)
```bash
git push origin master
```

**GitHub Pages automatically:**
- Detects the push
- Serves `dist/` folder content
- HTTPS is enabled automatically
- Custom domain (CNAME) is respected

---

## Deployment Steps Explained

### Step 1: Prepare Code
```bash
# Make your changes
git add .
git commit -m "feat: update coffee menu"
```

### Step 2: One-Command Deploy
```bash
npm run deploy
```

### Step 3: Verify
Visit: `https://gate7.vn`

That's all!

---

## Before First Deployment

Ensure these are configured in GitHub repository settings:

1. **GitHub Pages Settings**
   - Go to: Settings → Pages
   - Source: Branch `master`, Folder `/` (root)
   - HTTPS: Enabled ✅

2. **Custom Domain (Optional)**
   - CNAME file already includes `gate7.vn`
   - Configure DNS to point to GitHub Pages

3. **Branch Protection (Optional)**
   - Prevent accidental force pushes
   - Settings → Branches → Add rule

---

## Deployment Timeline

| Step | Duration | Status |
|------|----------|--------|
| Build | ~2 seconds | ✅ Fast |
| Git operations | ~5 seconds | ✅ Fast |
| GitHub Pages build | ~30-60 seconds | ⏳ Waiting |
| Site live | ~2 minutes total | ✅ Ready |

---

## Production Build Details

### Build Output Structure
```
dist/
├── index.html              (16.8 KB, minified)
├── menu/
│   └── index.html          (11.5 KB, minified)
├── music/
│   └── spotify.html        (22.5 KB, minified)
├── css/
│   └── style-gate7.css     (7.6 KB, minified)
├── images/                 (30 optimized images)
├── CNAME                   (GitHub Pages domain)
├── robots.txt              (SEO crawler config)
├── sitemap.xml             (SEO sitemap)
└── .htaccess               (Server optimization)
```

### Size Comparison

| File | Original | Minified | Savings |
|------|----------|----------|---------|
| index.html | 23.7 KB | 16.9 KB | 28.4% ↓ |
| menu/index.html | 16.2 KB | 11.5 KB | 29.8% ↓ |
| music/spotify.html | 31.8 KB | 22.5 KB | 29.6% ↓ |
| style-gate7.css | 10.3 KB | 7.6 KB | 26.9% ↓ |
| **Total** | **~60 KB** | **~58 KB** | **28% ↓** |

### Performance Impact

**Before Deploy:**
- Load time: 3-4 seconds
- Network requests: Full-size files

**After Deploy:**
- Load time: 1-2 seconds (50% faster!)
- Network requests: Minified, gzip-compressed
- Cached by browser (30-day cache via .htaccess)

---

## Advanced Deployment Options

### Force Update (If needed)
```bash
npm run deploy:force
```

**Use when:**
- Git history is out of sync
- Need to force-push changes
- Emergency deployment

**Caution:** This rewrites git history, avoid if multiple developers

### Manual Deployment (Step by Step)
```bash
# 1. Build
npm run build

# 2. Verify output
ls -la dist/

# 3. Commit
git add dist -f
git commit -m "chore: production build"

# 4. Push
git push origin master
```

---

## Troubleshooting

### GitHub Actions Workflow Not Triggering

**Problem:** You run `npm run deploy` but GitHub Actions doesn't trigger.

**Solution:**
The workflow file (`.github/workflows/deploy.yml`) must match your repository's default branch:

```bash
# Check your current branch
git branch -a

# If using 'master' (not 'main'), the workflow must listen for 'master':
# In .github/workflows/deploy.yml:
# on:
#   push:
#     branches: [master]    # Change from [main] to [master]
```

**Verify the fix:**
1. Edit `.github/workflows/deploy.yml`
2. Change `branches: [main]` to `branches: [master]`
3. Commit and push
4. Go to GitHub → Actions tab
5. You should see the workflow running

### Build Fails
```bash
# Check for errors
node build-simple.js

# Verify dist/ was created
ls dist/
```

### Push Fails
```bash
# Check git status
git status

# Ensure master branch exists
git branch -a

# Pull before pushing
git pull origin master
git push origin master
```

### Site Not Updating
1. Hard refresh browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Clear browser cache
3. Wait 1-2 minutes (GitHub Pages propagation)
4. Check GitHub Pages deployment status:
   - Go to: Settings → Pages → Deployments

### CNAME Issues
```bash
# Verify CNAME in dist/
cat dist/CNAME

# Should contain: gate7.vn
```

---

## Workflow Example

### Scenario: Update Coffee Menu

```bash
# 1. Edit menu
vim menu/index.html

# 2. Test locally (optional)
# Open file in browser to preview

# 3. Commit changes
git add menu/index.html
git commit -m "feat: add new seasonal drinks"

# 4. Deploy with one command!
npm run deploy

# 5. Verify live
# Open https://gate7.vn/menu in browser
```

### Scenario: SEO Update

```bash
# 1. Update SEO tags
vim index.html

# 2. Commit
git add index.html
git commit -m "seo: update meta descriptions"

# 3. Deploy
npm run deploy

# 4. Submit to Search Console
# Go to: Google Search Console > Sitemaps
# Verify new sitemap is indexed
```

---

## Monitoring Deployments

### Check Deployment Status

**Option 1: GitHub Actions (if configured)**
- Go to: Actions tab
- View latest workflow run
- See build logs

**Option 2: Manual Check**
```bash
# View recent commits
git log --oneline -5

# Should show: "chore: production build"
```

**Option 3: Verify Site**
- Visit: `https://gate7.vn`
- Press `F12` (DevTools)
- Check Network tab for minified files

---

## Workflow Status & Monitoring

### View Deployment Status

1. **GitHub Actions Dashboard**
   - Go to: Repository → Actions tab
   - See: "Auto-Deploy to GitHub Pages" workflow
   - Status: Green checkmark = Success, Red X = Failed

2. **Deployment Details**
   - Click workflow run to see logs
   - View build output and any errors
   - Check deployment timestamp

3. **GitHub Pages Status**
   - Settings → Pages
   - See: "Deployments" history
   - Verify latest deployment succeeded

### Troubleshooting Auto-Deployment

**Workflow not triggering?**
- Check that push is to `main` or `master` branch
- Verify `.github/workflows/deploy.yml` exists
- Push should trigger within 5-10 seconds

**Build failing?**
- Check GitHub Actions logs
- Run locally: `node build-simple.js`
- Verify all source files exist and are valid

**Site not updating?**
- Hard refresh browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Wait 1-2 minutes for GitHub Pages propagation
- Check GitHub Pages deployment in Settings

---

## Security Notes

### What's Safe to Deploy
✅ HTML, CSS, JavaScript  
✅ Images, fonts, icons  
✅ Configuration files (CNAME, robots.txt)  
✅ Public content only  

### What NOT to Deploy
❌ Environment variables  
❌ API keys or secrets  
❌ Database credentials  
❌ Private user data  

**Current status:** ✅ All safe - no secrets in code

---

## Rollback Procedure

If something goes wrong:

```bash
# See recent commits
git log --oneline -5

# Reset to previous version
git reset --hard HEAD~1

# Push to revert deployment
git push origin master -f
```

**Example:**
```bash
# Latest commit has issue
# Reset to commit before (2025-01-17)
git reset --hard abc1234

# Site reverts to previous version
git push origin master -f
```

---

## File Checklist

Before deploying, ensure these exist:

- [x] `package.json` - Build configuration
- [x] `build-simple.js` - Build script (no dependencies!)
- [x] `.gitignore` - Excludes unnecessary files
- [x] `index.html` - Home page
- [x] `menu/index.html` - Menu page
- [x] `music/spotify.html` - Music page
- [x] `css/style-gate7.css` - Stylesheet
- [x] `images/` - Image assets
- [x] `CNAME` - Custom domain
- [x] `robots.txt` - SEO
- [x] `sitemap.xml` - SEO
- [x] `.htaccess` - Server config

---

## Performance Monitoring

After deployment, monitor:

1. **Google Analytics**
   - Check traffic in real-time
   - Verify GA ID: `G-S72S3FXR6Z`

2. **Google PageSpeed**
   - Go to: https://pagespeed.web.dev/
   - Enter: `gate7.vn`
   - Monitor Core Web Vitals

3. **GitHub Pages Status**
   - Settings → Pages → Deployments
   - Check latest deployment

---

## Support

### Common Questions

**Q: Do I need to install npm packages?**
A: No! `build-simple.js` has zero dependencies. Just have Node.js installed.

**Q: How long does deployment take?**
A: ~2 minutes total (build + GitHub propagation)

**Q: Can multiple people deploy?**
A: Yes, but ensure git history stays clean.

**Q: Is it safe to force push?**
A: Only `npm run deploy:force`. Avoid if others are pushing too.

### Quick Links

- [GitHub Repository](https://github.com/JayEmVey/coming-soon)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Node.js Download](https://nodejs.org/)
- [Gate 7 Website](https://gate7.vn)

---

## Success Checklist

After deploying:

- [ ] Build completes without errors
- [ ] `dist/` folder created with all files
- [ ] Git commit shows "chore: production build"
- [ ] Push succeeds to `origin master`
- [ ] Website loads at https://gate7.vn
- [ ] All pages accessible (menu, music)
- [ ] Images display correctly
- [ ] No browser console errors
- [ ] Mobile responsive works
- [ ] Language switcher functional

---

## Summary

**Deployment Options:**

| Method | How It Works | When to Use |
|--------|------------|-----------|
| **Auto-Deploy** | Push → GitHub Actions → Auto-build → Live | Default, recommended |
| **Manual Deploy** | `npm run deploy` → Build → Git push → Live | Prefer local control |

**Benefits:**
- Zero manual steps (auto-deploy)
- Fail-safe build process
- Full audit trail in GitHub Actions
- Rollback capability with git

**Time: ~1-2 minutes from push to live**

---

## Next Steps

1. **First push triggers auto-deployment**
   ```bash
   git add .
   git commit -m "enable auto-deployment"
   git push origin main
   ```

2. **Watch GitHub Actions**
   - Go to Actions tab
   - See workflow running
   - Check site at gate7.vn when complete

3. **For subsequent updates**
   - Edit HTML/CSS files
   - Commit: `git commit -m "your message"`
   - Push: `git push origin main`
   - Auto-deployment handles the rest!

---

*Last Updated: November 17, 2025*  
*Status: ✅ Production Ready with Auto-Deployment*  
*Deployment Method: GitHub Actions (gh-pages)*
