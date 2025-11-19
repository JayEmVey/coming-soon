# Immediate Testing Checklist - Right Now

**Do This Now to Verify Everything Works**

---

## 1. Hard Refresh Browser (Clear Cache)

```
Ctrl + Shift + R  (Windows/Linux)
or
Cmd + Shift + R   (Mac)
```

This clears cached CSS and reloads fresh.

---

## 2. Visual Checklist (30 seconds)

Open DevTools (F12) and check:

### Home Page (http://localhost:8000/)
- [ ] Background is dark (#202020)
- [ ] Logo image displays at top
- [ ] H1 "GATE 7 COFFEE ROASTERY" shows in GOLD/YELLOW
- [ ] Subtitle text visible
- [ ] Vietnamese Phin filter image displays
- [ ] "Scroll to begin ↓" text visible at bottom
- [ ] NO WHITE/BLANK BACKGROUND
- [ ] NO MISSING IMAGES (broken icons)

### Menu Page (http://localhost:8000/menu/)
- [ ] Background dark
- [ ] Logo visible
- [ ] Menu title displays
- [ ] Menu items listed
- [ ] Footer section visible
- [ ] Layout looks correct

---

## 3. JavaScript Test (1 minute)

### Language Switcher
1. Find buttons "EN | VN" in footer
2. Click "EN" button
3. Verify text changes to English
4. Click "VN" button
5. Verify text changes back to Vietnamese
6. **Status:** [ ] Working

### Scroll Animation
1. Scroll down the page
2. Watch footer appear/fade in
3. Should smoothly animate
4. **Status:** [ ] Working

### Console Check
1. Open DevTools → Console tab
2. Look at the messages
3. Should see: `✓ Service Worker registered`
4. Should **NOT** see any red error messages
5. **Status:** [ ] No Errors

---

## 4. Service Worker Check (1 minute)

1. DevTools → Application tab
2. Left sidebar → Service Workers
3. Should see one listed with URL
4. Status should say "activated and running"
5. **Status:** [ ] Registered

---

## 5. Offline Test (1 minute)

1. DevTools → Network tab
2. Check the "Offline" checkbox (on left side)
3. Refresh page (F5)
4. **Status:** [ ] Page loads from cache (not blank)
5. Uncheck Offline
6. Page should work again

---

## 6. Performance Check (2 minutes)

1. DevTools → Network tab
2. Hard refresh (Ctrl+Shift+R)
3. Check these files load:
   - [ ] style-gate7.css (main CSS)
   - [ ] scroll-animations.js (deferred)
   - [ ] language-switcher.js (deferred)
   - [ ] service-worker.js (registered)
4. Total page size should be <500 KB
5. **Status:** [ ] All files present

---

## 7. Lighthouse Audit (2 minutes)

1. DevTools → Lighthouse tab
2. Click "Analyze page load"
3. Wait for results
4. Check scores:
   - [ ] Performance: Should be 90+ (target 92+)
   - [ ] Accessibility: Should be 90+
   - [ ] Best Practices: Should be 90+
   - [ ] SEO: Should be 90+

---

## 8. Mobile View (1 minute)

1. DevTools → Toggle device toolbar (Ctrl+Shift+M)
2. Select "iPhone SE" (375px)
3. Check:
   - [ ] Layout stacks correctly
   - [ ] Text readable
   - [ ] Logo scaled down
   - [ ] No horizontal scroll

---

## Quick Pass/Fail

### ✅ PASS if ALL of these are true:
1. CSS displays (no white background)
2. Images load (no broken icons)
3. H1 is golden color
4. No red errors in console
5. Language switcher works
6. Service Worker registered
7. Page loads when offline
8. Lighthouse score 85+

### ❌ FAIL if ANY of these are true:
1. White/blank page
2. Missing images
3. No color on headings
4. Red errors in console
5. Language switcher doesn't work
6. Service Worker error
7. Page blank when offline
8. Lighthouse score <80

---

## If ALL Pass: ✅ Ready to Deploy

```
npm run deploy
```

---

## If ANY Fail: 🛑 Debug Needed

Check:
1. CSS file path correct? (should be `css/style-gate7.css`)
2. Images path correct? (should be `images/logo-*.png`)
3. JavaScript errors? (check console for details)
4. Service Worker errors? (check console logs)

---

## Time Required

**Total Time:** 10-15 minutes

Breakdown:
- Hard refresh: 1 min
- Visual check: 1 min
- JS test: 2 min
- SW check: 1 min
- Offline test: 1 min
- Performance: 2 min
- Mobile view: 1 min
- Lighthouse: 2 min

---

## Result Template

Copy this and paste results:

```
IMMEDIATE TEST RESULTS
═════════════════════

Visual Display:     [ ] Pass
JavaScript:        [ ] Pass
Service Worker:    [ ] Pass
Offline Mode:      [ ] Pass
Performance:       [ ] Pass
Mobile View:       [ ] Pass
No Errors:         [ ] Pass

Overall Status:    [ ] PASS  [ ] FAIL

Lighthouse Score:  Desktop: ___ / Mobile: ___

Notes: _________________________________
```

---

**Run this now and report results!**

Then we can proceed to deployment.
