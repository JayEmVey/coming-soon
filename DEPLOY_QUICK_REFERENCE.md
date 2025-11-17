# Deploy Quick Reference

## 🚀 One-Command Deploy

```bash
npm run deploy
```

That's it! ✨

---

## What Happens

1. ✅ Minifies all HTML/CSS/JS (28% size reduction)
2. ✅ Copies optimized images  
3. ✅ Creates git commit
4. ✅ Pushes to GitHub
5. ✅ GitHub Pages builds automatically
6. ✅ Site live in ~2 minutes

---

## Timeline

| Step | Time | Status |
|------|------|--------|
| Build | ~2s | ⚡ Fast |
| Git commit | ~2s | ⚡ Fast |
| Git push | ~3s | ⚡ Fast |
| GitHub Pages | 30-60s | ⏳ Wait |
| **Total** | **~2 min** | ✅ Ready |

---

## Before Deploying

1. Make your changes
2. Test locally (optional)
3. Git commit: `git add . && git commit -m "desc"`
4. Deploy: `npm run deploy`

---

## Force Deploy (Rare)

```bash
npm run deploy:force
```

Only use if git history is out of sync.

---

## Check Build

```bash
npm run build
ls dist/
```

---

## Verify Site

Visit: **https://gate7.vn**

---

## If Something's Wrong

### Build fails
```bash
node build-simple.js
```

### Can't push
```bash
git status
git pull origin main
npm run deploy
```

### Site not updating
1. Hard refresh: `Ctrl+Shift+R`
2. Wait 1-2 minutes
3. Check: Settings → Pages → Deployments

---

## Files That Deploy

```
dist/
├── index.html (home)
├── menu/index.html (menu)
├── music/spotify.html (music)
├── css/ (minified styles)
├── images/ (optimized)
└── config (robots.txt, sitemap.xml, CNAME)
```

---

## Key Numbers

- **Build time**: 2 seconds
- **Deploy time**: 2 minutes  
- **Downtime**: 0 seconds
- **Size savings**: 28%
- **Fastest load**: <2 seconds

---

## Emergency Rollback

```bash
git reset --hard HEAD~1
git push origin main -f
```

---

## Questions?

See full guide: **DEPLOYMENT.md**

---

*Version: 1.0*  
*Date: Nov 17, 2025*  
*Status: ✅ Ready to Deploy*
