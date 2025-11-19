# Deploy With Protection - Checklist

Complete this checklist before deploying with image protection.

## Pre-Deployment (5 minutes)

- [ ] Read `IMAGE_PROTECTION_QUICK_START.md`
- [ ] Understand the 5 protection layers
- [ ] Review protected images list
- [ ] Check `lib/image-protection.js` exists
- [ ] Verify `build-with-protection.js` exists

## Testing Locally (5 minutes)

```bash
npm run build:protect
```

- [ ] Build completes without errors
- [ ] `/dist` folder created
- [ ] `/dist/index.html` contains protection scripts
- [ ] Image files copied to `/dist/images/`

### Launch Local Server

```bash
cd dist
python -m http.server 8000
```

- [ ] Visit http://localhost:8000
- [ ] Pages load successfully
- [ ] Images display correctly

### Test Protection

- [ ] Try right-click on logo → Menu blocked
- [ ] Try dragging image → Blocked
- [ ] Try copy/paste → Blocked
- [ ] Open DevTools (F12) → Console shows protection logs
- [ ] Inspect element → See canvas, not `<img>` tag
- [ ] Check signature in console logs
- [ ] Mobile browsers work
- [ ] All pages load (index, menu, music, hiring)

### Verify File Sizes

- [ ] `/dist` size increased by ~8-14% (normal)
- [ ] HTML files minified
- [ ] CSS files minified
- [ ] JavaScript minified

## Pre-Deployment Checks

- [ ] No console errors (F12)
- [ ] No network failures
- [ ] All images visible
- [ ] Protection working correctly
- [ ] Mobile responsive
- [ ] Page performance acceptable

## Deployment (1 command)

```bash
npm run deploy:protect
```

- [ ] Build starts
- [ ] Build completes: "Build complete!"
- [ ] Minification reports shown
- [ ] Git commit successful
- [ ] Push to GitHub successful
- [ ] No errors in output

## Post-Deployment Verification (2 minutes)

### GitHub Actions

- [ ] Go to Repository → Actions
- [ ] See "Auto-Deploy to GitHub Pages" running
- [ ] Wait for green checkmark
- [ ] Build takes ~1-2 minutes

### Live Site Check

1. Wait 1-2 minutes for GitHub Pages to update
2. Visit https://gate7.vn (or your domain)

- [ ] Site loads
- [ ] All pages accessible
- [ ] Images display correctly
- [ ] Logo protected (try right-click)
- [ ] Menu page works
- [ ] Music page works
- [ ] Hiring page works
- [ ] Protection working (right-click blocked)

### Browser Testing

Test in multiple browsers:

- [ ] Chrome - images display, protection works
- [ ] Firefox - images display, protection works
- [ ] Safari - images display, protection works
- [ ] Edge - images display, protection works
- [ ] Mobile Chrome - responsive, works
- [ ] Mobile Safari - responsive, works

### Console Verification

Open DevTools (F12) on live site:

- [ ] See protection message: "Gate 7 Image Protection Active"
- [ ] See: "Images are protected by multiple layers"
- [ ] No JavaScript errors
- [ ] Network tab shows successful requests

### Hard Refresh

Test cache clearing:

- [ ] `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- [ ] Images still display correctly
- [ ] Protection still working

## Rollback Plan (If Needed)

If something goes wrong:

```bash
# View recent commits
git log --oneline -5

# Rollback to previous version
git reset --hard HEAD~1
git push origin master -f

# Then restart
npm run deploy
```

- [ ] Understand rollback procedure
- [ ] Keep record of commit SHA before deploy
- [ ] Know previous working version

## Monitoring (First 24 hours)

- [ ] Check site every hour for 4 hours
- [ ] Monitor GitHub Actions for errors
- [ ] Check analytics for unusual activity
- [ ] Verify all pages accessible
- [ ] Test protection still working
- [ ] Monitor console for errors

## Success Criteria

✅ All items checked  
✅ Site loads without errors  
✅ All images display correctly  
✅ Protection working (right-click blocked)  
✅ No console errors  
✅ Mobile responsive  
✅ Performance acceptable  

## Troubleshooting During Deploy

### Build Fails

```
Error: Cannot find module...
```

**Solution:**
1. Check `lib/image-protection.js` exists
2. Check file paths in `build-with-protection.js`
3. Run: `npm run build` (standard build) to verify system works

### Images Not Displaying After Deploy

1. Hard refresh (Ctrl+Shift+R)
2. Wait 2-3 minutes for GitHub Pages
3. Check GitHub Actions logs
4. Verify `/dist` contains images
5. Check browser console (F12) for errors

### Protection Not Working

1. Check console for protection logs
2. Verify JavaScript not disabled
3. Check browser supports Canvas API
4. Try different browser
5. Hard refresh page

## Documentation Available

Need help? Check these files:

- **Quick answers:** `IMAGE_PROTECTION_QUICK_START.md`
- **Technical details:** `IMAGE_PROTECTION.md`
- **Setup guide:** `IMAGE_PROTECTION_SETUP.md`
- **Complete overview:** `IMPLEMENTATION_IMAGE_PROTECTION.md`

## Command Reference

```bash
# Test locally
npm run build:protect
cd dist
python -m http.server 8000

# Deploy (1 command)
npm run deploy:protect

# Check status
git log --oneline -5

# Rollback if needed
git reset --hard HEAD~1
git push origin master -f
```

## Timeline

- **0 min:** Start `npm run deploy:protect`
- **3 min:** Build complete, pushing to GitHub
- **4 min:** GitHub Actions starts
- **5 min:** Auto-Deploy workflow running
- **6 min:** Site deploying to GitHub Pages
- **7 min:** Site live at gate7.vn
- **8 min:** Verify deployment complete

## Final Checklist

Before declaring deployment successful:

- [ ] Site loads at gate7.vn
- [ ] All pages accessible
- [ ] All images display
- [ ] Right-click blocked on protected images
- [ ] No console errors
- [ ] Mobile works
- [ ] GitHub Actions shows green checkmark
- [ ] No unusual activity in analytics

## Sign-Off

**Deployed by:** ________________  
**Date:** ________________  
**Time:** ________________  
**Status:** ☐ Success ☐ Issues (note below)  

**Notes:** _______________________________________________

---

## Post-Deployment Monitoring

Recommended monitoring for first 24 hours:

- Check site every hour
- Monitor GitHub Actions
- Check browser console for errors
- Test protection manually
- Monitor analytics
- Test on different devices

## When to Rollback

Rollback if:
- ❌ Site doesn't load
- ❌ Images don't display
- ❌ Critical console errors
- ❌ Protection not working
- ❌ Performance degradation

Otherwise: ✅ **Deployment successful!**

---

**Version:** 1.0.0  
**Last Updated:** November 17, 2025  
**Status:** Ready to Use
