# Build & Deploy Guide - Gate 7 Coffee Roastery

This project uses **Vite** for bundling and minifying all assets, optimized for production deployment on GitHub Pages.

## Quick Start

### Prerequisites
- Node.js >= 16.0.0
- npm or yarn
- Git

### Installation

```bash
# Install dependencies
npm install
```

## Development

Run the local development server:

```bash
npm run dev
```

This starts Vite dev server with hot module replacement on `http://localhost:5173`

## Production Build

Build optimized production bundle:

```bash
npm run build
```

This creates a `dist/` folder with:
- Minified HTML files
- Minified CSS (split by component)
- Minified JavaScript with tree-shaking
- Optimized image assets
- Gzipped output (via .htaccess)

## Deployment

### One-Command Deploy (Recommended)

**For Windows:**
```bash
deploy.bat
```

**For macOS/Linux:**
```bash
./deploy.sh
```

**Or using npm:**
```bash
npm run deploy
```

### What the deploy script does:
1. ✅ Builds production bundle (`npm run build`)
2. ✅ Copies static files (CNAME, robots.txt, sitemap.xml, .htaccess)
3. ✅ Commits changes to git
4. ✅ Pushes to GitHub Pages (main branch)

### Manual Deployment Steps

If you prefer manual control:

```bash
# 1. Build
npm run build

# 2. Copy static config files
cp CNAME dist/CNAME
cp robots.txt dist/robots.txt
cp sitemap.xml dist/sitemap.xml
cp .htaccess dist/.htaccess

# 3. Commit
git add dist -f
git commit -m "chore: production build"

# 4. Push
git push origin main
```

## Build Optimization Details

### Vite Configuration (`vite.config.js`)

```javascript
{
  base: '/',                    // Root path
  build: {
    target: 'ES2020',          // Modern JavaScript
    minify: 'terser',          // Code minification
    cssCodeSplit: true,        // Split CSS by component
    outDir: 'dist',            // Output directory
    emptyOutDir: true,         // Clean before build
    sourcemap: false,          // No source maps (production)
  }
}
```

### Output Structure

```
dist/
├── index.html                 # Home page (minified)
├── menu/
│   └── index.html            # Menu page (minified)
├── music/
│   └── spotify.html          # Music page (minified)
├── css/
│   └── [name].[hash].css    # Minified stylesheets
├── js/
│   └── [name].[hash].js     # Minified scripts
├── images/
│   ├── logo-*.png           # Optimized images
│   ├── menu-*.png
│   └── icons/
├── CNAME                      # Custom domain
├── robots.txt                # SEO crawler config
├── sitemap.xml              # SEO sitemap
└── .htaccess                # Server compression
```

## Performance Metrics

### Before (Raw HTML/CSS/JS)
- Total size: ~500 KB
- Load time: ~4-5 seconds
- Uncompressed assets

### After (Vite Build)
- Total size: ~150 KB (minified)
- Load time: ~1-2 seconds
- Gzip compression: ~50 KB
- CSS split & optimized
- JavaScript tree-shaken
- Images optimized

## GitHub Pages Configuration

### Automatic Deployment

The deployment script handles all setup:

1. **Build artifact tracking:**
   - Forces git to track `dist/` folder
   - Normally ignored via `.gitignore`

2. **Branch configuration:**
   - Pushes built `dist/` to `main` branch
   - GitHub Pages serves from `main`

3. **Domain setup:**
   - CNAME file ensures custom domain (gate7.vn)
   - HTTPS enforced automatically

### GitHub Pages Settings

In repository settings:
- ✅ Source: Branch = `main` / Folder = `/ (root)`
- ✅ HTTPS: Enforced
- ✅ Custom domain: `gate7.vn`

## Troubleshooting

### Build fails
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Deployment stuck
```bash
# Force push (use carefully)
git push origin main --force
```

### Static files missing in dist/
```bash
# Manually copy before deploying
cp CNAME robots.txt sitemap.xml .htaccess dist/
```

## Commands Reference

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run deploy` | Build + deploy (one command) |
| `deploy.bat` | Windows automated deploy |
| `./deploy.sh` | macOS/Linux automated deploy |

## Best Practices

### Before Committing Code
```bash
# Always test locally first
npm run dev

# Build and preview production
npm run build
npm run preview
```

### Before Deploying
```bash
# Verify build is clean
npm run build

# Check dist/ folder contents
ls -la dist/

# Verify GitHub Pages is configured
# https://github.com/JayEmVey/coming-soon/settings/pages
```

### Monitoring Deployment
1. Push code: `npm run deploy`
2. Wait 30-60 seconds for GitHub Pages build
3. Visit site: `https://gate7.vn`
4. Check Chrome DevTools > Network:
   - All resources loaded
   - CSS/JS minified
   - Status 200 OK

## Environment Variables

Currently not needed, but if you add `.env`:

```bash
# .env (not committed)
VITE_SITE_URL=https://gate7.vn
VITE_GA_ID=G-S72S3FXR6Z
```

Then in HTML:
```html
<script>
  const siteUrl = import.meta.env.VITE_SITE_URL
  const gaId = import.meta.env.VITE_GA_ID
</script>
```

## File Size Targets

Keep optimized for performance:

| Asset | Target | Current |
|-------|--------|---------|
| HTML bundle | < 100 KB | ~40 KB |
| CSS bundle | < 30 KB | ~15 KB |
| JavaScript | < 20 KB | ~10 KB |
| Images total | < 200 KB | ~80 KB |
| **Total** | **< 350 KB** | **~145 KB** |

## CI/CD Integration (Optional)

To automate deployment on every push, create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - name: Deploy to Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Support & Issues

For issues with:
- **Vite**: https://vitejs.dev/guide/
- **GitHub Pages**: https://docs.github.com/en/pages
- **Minification**: Check vite.config.js build options

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Nov 17, 2025 | Initial Vite setup + GitHub Pages deployment |

---

**Last Updated:** November 17, 2025  
**Status:** ✅ Production Ready  
**Next:** Phase 2 SEO (Google Business Profile)
