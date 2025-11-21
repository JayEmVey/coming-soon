# Testing Guide - Production Build Testing

**Testing Production-Ready Build from `/dist` Folder**

---

## Quick Start

```bash
# Step 1: Build production bundle
npm run build

# Step 2: Test production build
npm run test

# Step 3: Open browser
# Visit: http://localhost:8080
```

---

## What is `npm run test`?

The test command serves your **minified production build** locally without deploying to GitHub. This allows you to:

- ✅ Test the actual minified code before deployment
- ✅ Check that minification didn't break anything
- ✅ Verify responsive design on all devices
- ✅ Test on mobile, tablet, and desktop
- ✅ Catch issues before live deployment
- ✅ Check browser console for JavaScript errors

---

## Full Testing Workflow

### 1. Build Production Bundle
```bash
npm run build
```
- Minifies HTML, CSS, JavaScript
- Copies images and static files
- Creates `/dist` directory
- Takes ~5 seconds

### 2. Start Test Server
```bash
npm run test
```

**Expected Output:**
```
🧪 Production Build Test Server

✓ Server running
📍 Local URL:   http://localhost:8080
🌐 Test URL:    http://127.0.0.1:8080

📂 Serving from:  /path/to/dist

Testing Checklist:
  ✓ Homepage loads correctly
  ✓ Menu page accessible
  ✓ Images display properly
  ✓ CSS is minified
  ✓ JavaScript works
  ✓ Responsive design (test on mobile/tablet)
  ✓ Links and navigation work
  ✓ Open browser console for errors

Stop server: Press CTRL+C
```

### 3. Test in Browser
Open your browser to: **http://localhost:8080**

### 4. Run Tests
Follow the testing checklist below

### 5. Stop Server
Press **CTRL+C** in terminal to stop the test server

---

## Testing Checklist

### Desktop Browser
- [ ] Homepage loads without errors
- [ ] Logo displays correctly
- [ ] Menu page loads
- [ ] All images display properly
- [ ] CSS styling looks correct
- [ ] Links work (internal navigation)
- [ ] Scroll animations work
- [ ] Language switcher works
- [ ] Footer displays correctly
- [ ] No console errors (F12 → Console tab)
- [ ] No console warnings

### Mobile Responsiveness (Chrome DevTools)
```
Press F12 → Click device icon (top-left) → Select device
```

**Test Devices:**
- [ ] iPhone 12/13/14
- [ ] iPhone SE (small)
- [ ] Galaxy S9+
- [ ] iPad
- [ ] Nexus 7 (tablet)

**Mobile Checks:**
- [ ] Text is readable (no tiny fonts)
- [ ] Images fit properly
- [ ] Menu is accessible
- [ ] Buttons are clickable
- [ ] No horizontal scrolling
- [ ] Navigation works
- [ ] Forms are usable

### Tablet Responsiveness
- [ ] Layout matches tablet design
- [ ] Images scale properly
- [ ] Text is readable
- [ ] No layout shifts
- [ ] Navigation works

### Desktop (Large Screen)
- [ ] Optimal viewing width
- [ ] Images look crisp
- [ ] Text is readable
- [ ] Space is used efficiently
- [ ] No layout issues

### CSS & Styling
- [ ] Colors are correct
- [ ] Fonts are loaded
- [ ] Spacing is correct
- [ ] Animations work smoothly
- [ ] No missing styles
- [ ] Dark theme applied correctly (if applicable)
- [ ] Golden accent color visible

### JavaScript Functionality
- [ ] Language switcher works (EN/VN)
- [ ] Scroll animations trigger
- [ ] No JavaScript errors in console
- [ ] Event listeners responsive
- [ ] Service worker registered
- [ ] No timing issues

### Images
- [ ] Logo loads
- [ ] Menu images display
- [ ] Icons visible
- [ ] Social media icons present
- [ ] All images have alt text
- [ ] No broken image links (404 errors)

### Performance
- [ ] Page loads quickly
- [ ] Smooth scrolling
- [ ] No jank or stuttering
- [ ] Animations are smooth
- [ ] No lag on interactions

### Links & Navigation
- [ ] Home link works
- [ ] Menu page accessible
- [ ] Hiring page accessible
- [ ] Music page accessible (if present)
- [ ] External links open correctly
- [ ] Language switcher changes language
- [ ] Back/forward buttons work

### SEO Elements (F12 → Elements tab)
Look at `<head>` section:
- [ ] Title tag present
- [ ] Meta description present
- [ ] Meta keywords present
- [ ] Open Graph tags present
- [ ] Twitter Card tags present
- [ ] Structured data present

### Minification Verification
Open DevTools (F12) → Sources tab:
- [ ] HTML is minified (no extra whitespace)
- [ ] CSS is minified (file size reasonable)
- [ ] JavaScript is minified (no comments visible)
- [ ] File sizes match expectations

---

## Common Issues & Solutions

### Issue: "dist/ folder not found"
```bash
# Solution: Build first
npm run build
npm run test
```

### Issue: "Port 8080 already in use"
```bash
# Solution 1: Stop other servers on port 8080
# Solution 2: Kill the process (Linux/Mac):
lsof -i :8080
kill -9 <PID>

# Solution 3: Use different port (edit test.js, change PORT = 8080)
```

### Issue: Images not loading
- Check browser console for 404 errors
- Verify image paths are correct: `/images/filename.png`
- Check that images exist in `/dist/images/` directory
- Try hard refresh: CTRL+Shift+R (Windows) or Cmd+Shift+R (Mac)

### Issue: Styles not loading
- Hard refresh browser (CTRL+Shift+R)
- Check that CSS file is in `/dist/css/`
- Check browser console for CSS loading errors
- Verify minified CSS is valid

### Issue: JavaScript errors
- Open browser console (F12)
- Check error messages
- Common causes:
  - Missing external libraries
  - Broken script references
  - Syntax errors in minified code
- Review original JS files if errors appear

### Issue: Language switcher not working
- Check that `language-switcher.js` is minified correctly
- Verify data-en and data-vn attributes exist in HTML
- Check console for JavaScript errors

---

## Test Report Template

Use this template to document your testing:

```
PRODUCTION BUILD TEST REPORT
Date: [TODAY]
Build Version: [VERSION]
Tester: [NAME]

DESKTOP TESTING
  Homepage:          [✓/✗]
  Menu Page:         [✓/✗]
  Images:            [✓/✗]
  CSS Styling:       [✓/✗]
  JavaScript:        [✓/✗]
  Links:             [✓/✗]

MOBILE TESTING
  iPhone:            [✓/✗]
  Android:           [✓/✗]
  Tablet:            [✓/✗]
  Responsive:        [✓/✗]

PERFORMANCE
  Load Time:         [FAST/OK/SLOW]
  Animations:        [SMOOTH/OK/JANK]
  Interactions:      [RESPONSIVE/OK/SLOW]

ISSUES FOUND
  [List any issues here]

READY FOR DEPLOYMENT
  [YES/NO]

NOTES
  [Any additional observations]
```

---

## Testing Tips & Tricks

### Test on Real Mobile Device
```bash
# Instead of localhost, use your computer's IP
# 1. Find your IP: ipconfig (Windows) or ifconfig (Mac/Linux)
# 2. On mobile, visit: http://<YOUR_IP>:8080
```

### Clear Browser Cache
```bash
# If you see old content, hard refresh:
Windows/Linux:  CTRL+Shift+R
Mac:           Cmd+Shift+R
```

### Test on Different Browsers
- Chrome (latest)
- Firefox (latest)
- Safari (latest on Mac)
- Edge (Windows)
- Mobile browsers

### Enable Slow Network Simulation
```
DevTools → Network tab → Throttle dropdown → Select "Slow 3G"
```
Tests how site loads on slow connections

### Check Minification
```
DevTools → Sources tab → dist/css/style-gate7.css
```
Should see minified code (no formatting)

---

## When to Test

1. **After major changes:** Always test before deployment
2. **Before deployment:** Run full test suite
3. **After minification:** Verify nothing broke
4. **On different devices:** Test responsive design
5. **Different browsers:** Check compatibility
6. **Performance testing:** Check load times

---

## What Not to Test Here

❌ Don't test SEO validation (use `npm run build:seo`)  
❌ Don't test deployment (use `npm run deploy`)  
❌ Don't test source files (use `python -m http.server 8000`)  
❌ Don't modify files in `/dist` (they'll be overwritten on rebuild)

---

## Production Deployment

Once testing passes:

```bash
# 1. Stop test server (CTRL+C)

# 2. Deploy to production
npm run deploy

# This will:
# - Rebuild with SEO validation
# - Create git commit
# - Push to GitHub
# - Site live in ~2 minutes
```

---

## Architecture

### Test Server (test.js)
- **Node.js HTTP server**
- **Serves from:** `/dist` directory
- **Port:** 8080
- **Features:**
  - Directory traversal protection
  - MIME type detection
  - Automatic index.html serving
  - Request logging
  - Error handling
  - Graceful shutdown

### Minified Build (dist/)
- **Created by:** `npm run build`
- **Contains:** Minified HTML, CSS, JS
- **Images:** Copied as-is (no optimization)
- **Static files:** robots.txt, sitemap.xml, CNAME, etc.

---

## FAQ

**Q: Why test the production build?**  
A: The production build is minified, which can sometimes cause issues. Testing ensures the minification didn't break anything.

**Q: How is the test server different from development?**  
A: Test server serves minified `/dist` folder. Development uses source files. Testing is closer to production.

**Q: Can I modify files while testing?**  
A: Changes in source won't affect test server. Rebuild with `npm run build` to test changes.

**Q: Does testing affect deployment?**  
A: No, testing is completely isolated. Deploy separately with `npm run deploy`.

**Q: How long should testing take?**  
A: 5-10 minutes for full checklist. Quick spot-check: 1-2 minutes.

**Q: What if I find issues?**  
A: Stop test server (CTRL+C), fix source files, rebuild (`npm run build`), and test again.

---

## Resources

- **AGENTS.md** - Development guidelines
- **README.md** - Project overview
- **DEPLOYMENT-GUIDE.md** - Deployment instructions
- **BUILD-REVIEW.md** - Technical build details

---

## Support

For questions about testing:
1. Check this guide
2. Review DEPLOYMENT-GUIDE.md
3. Check browser console for errors
4. Review git log for recent changes

---

**Happy Testing! 🧪**
