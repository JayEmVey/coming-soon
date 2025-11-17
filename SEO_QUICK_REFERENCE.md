# SEO Quick Reference - Gate 7 Coffee Roastery

**Quick links and checks for SEO maintenance**

---

## 🔍 Pre-Launch Verification Checklist

### Meta Tags (Run in DevTools)
```javascript
// In browser console, verify meta tags exist:
console.log(document.querySelector('meta[name="description"]').content);
console.log(document.querySelector('meta[property="og:title"]').content);
console.log(document.querySelector('link[rel="canonical"]').href);
```

### Quick Visual Check
1. Visit https://gate7.vn/ 
2. Right-click → "View Page Source"
3. Verify these are present:
   - [ ] `<title>` contains "Vietnamese Specialty Coffee"
   - [ ] `<meta name="description">` 155-160 characters
   - [ ] `<link rel="canonical">`
   - [ ] `<meta property="og:image">`
   - [ ] `<script type="application/ld+json">` (LocalBusiness)

---

## 🔗 Essential URLs

| Resource | URL |
|----------|-----|
| Sitemap | https://gate7.vn/sitemap.xml |
| Robots | https://gate7.vn/robots.txt |
| Search Console | https://search.google.com/search-console/ |
| Analytics | https://analytics.google.com/ |
| PageSpeed | https://pagespeed.web.dev/ |
| Rich Results | https://search.google.com/test/rich-results |
| Mobile Test | https://search.google.com/test/mobile-friendly |
| Meta Tags | https://www.seocentro.com/tools/metatag-checker.html |
| OG Checker | https://www.opengraphcheck.com/ |

---

## 📝 Content Guidelines

### Title Tag Formula
```
[Brand] | [Primary Keyword] [Secondary Keyword] [Modifier]

Examples:
✅ Gate 7 Coffee Roastery | Vietnamese Specialty Coffee HCM
❌ Gate 7 (too short)
❌ Gate 7 Coffee Roastery Vietnamese Specialty Coffee HCM (no separators)
```

### Meta Description Formula
```
[Hook/Benefit] + [Keywords] + [CTA/Location]

Length: 155-160 characters
Example: "Discover Gate 7 Coffee Roastery in Ho Chi Minh City. 
Authentic Vietnamese Phin coffee, specialty espresso, and unique 
matcha drinks. Visit us at 162A Nguyễn Trường Tộ."
```

### Keywords per Page (Target 3-5)
- **Home**: Gate 7 Coffee, Vietnamese Coffee, Phin Coffee, Specialty Coffee, HCMC
- **Menu**: Gate 7 Menu, Vietnamese Coffee, Phin Coffee, Espresso, Matcha

---

## 🐛 Common SEO Issues & Fixes

### Issue: Meta Description Not Showing
**Check:**
```html
<!-- Correct -->
<meta name="description" content="Your description here">

<!-- Wrong -->
<meta name="desc" content="...">
<meta name="Description" content="..."> <!-- Case sensitive -->
```

### Issue: Open Graph Preview Not Working
**Check on**: https://www.opengraphcheck.com/
**Fix**: Ensure:
- [ ] og:image is absolute URL (not relative)
- [ ] og:image file exists (no 404)
- [ ] og:image is min 1200x630px

### Issue: Schema Not Validating
**Check on**: https://search.google.com/test/rich-results
**Common fixes:**
- [ ] Ensure all required fields present
- [ ] Correct date format (YYYY-MM-DD)
- [ ] Valid phone format (+84-XXX-XXX-XXX)
- [ ] Valid email format

### Issue: Sitemap Not Found
**Solution**:
1. Verify file at root: `/sitemap.xml`
2. Check .gitignore doesn't exclude it
3. Verify file size > 0 bytes
4. Test URL directly: https://gate7.vn/sitemap.xml

---

## 📊 Monitoring Checklist (Monthly)

### Analytics Review
- [ ] Organic traffic trend (up/down/stable)
- [ ] Top landing pages
- [ ] Top exit pages
- [ ] Average session duration
- [ ] Bounce rate by page
- [ ] Device breakdown

### Search Console Review
- [ ] Indexation status
- [ ] Search queries driving traffic
- [ ] Average CTR by page
- [ ] Coverage issues
- [ ] Mobile usability issues

### Page Speed Check
- [ ] Home page: _____ ms (Target: <3s)
- [ ] Menu page: _____ ms (Target: <3s)

### Ranking Check
**Track these keywords:**
- [ ] "Gate 7 Coffee" - Position: ___
- [ ] "Vietnamese Coffee" - Position: ___
- [ ] "Phin Coffee" - Position: ___
- [ ] Location keywords - Position: ___

---

## 🚀 Deployment Commands

### Pre-deployment
```bash
# Check for broken links
grep -r 'href=' index.html menu/index.html | grep -E 'http|/[a-z]' | grep -v 'https://gate7'

# Verify meta tags
grep '<meta name="description"' index.html
grep '<meta property="og:' index.html

# Check file sizes
du -sh css/ images/ *.html *.xml *.txt
```

### After deployment
```bash
# Verify files are live
curl -I https://gate7.vn/sitemap.xml
curl -I https://gate7.vn/robots.txt
curl -I https://gate7.vn/

# Check Google indexation
site:gate7.vn
```

---

## 🎯 SEO Goals & Timeline

### Month 1 (Now - Feb 2025)
- [ ] Submit sitemap to Search Console
- [ ] Verify LocalBusiness schema
- [ ] Set up Google Business Profile
- [ ] First 5 reviews/citations

**Success Metric**: Site indexed in Google

### Month 2-3 (Feb-Mar 2025)
- [ ] 10+ citations across directories
- [ ] Organic traffic: 100+ sessions
- [ ] Page speed: <3 seconds
- [ ] Top 50 for brand keyword

**Success Metric**: Consistent organic traffic

### Month 4-6 (Apr-Jun 2025)
- [ ] 50+ reviews across platforms
- [ ] Organic traffic: 500+ sessions
- [ ] Top 10 for "Vietnamese Coffee HCMC"
- [ ] Expand content (blog posts)

**Success Metric**: Visible local search results

---

## 🔧 Regular Maintenance Tasks

### Weekly
- [ ] Check Google Search Console for errors
- [ ] Monitor analytics traffic

### Monthly
- [ ] Review keyword rankings
- [ ] Check page speed
- [ ] Verify all links work
- [ ] Test mobile responsiveness

### Quarterly
- [ ] Full SEO audit
- [ ] Update citations if needed
- [ ] Review and update meta tags
- [ ] Analyze competitor activity

---

## 📚 Resource Files

| File | Purpose | Location |
|------|---------|----------|
| SEO.md | Comprehensive SEO guide | `/SEO.md` |
| SEO_IMPLEMENTATION.md | What was implemented | `/SEO_IMPLEMENTATION.md` |
| DEPLOYMENT_CHECKLIST.md | Pre-launch verification | `/DEPLOYMENT_CHECKLIST.md` |
| sitemap.xml | Search engine indexing | `/sitemap.xml` |
| robots.txt | Crawl directives | `/robots.txt` |
| .htaccess | Server optimization | `/.htaccess` |

---

## 🆘 Troubleshooting

### "Sitemap not found" error
1. Check file exists: `/sitemap.xml` ✅
2. File is readable (chmod 644)
3. Path is correct in robots.txt
4. No redirect loops

### "Meta description too short"
- Must be 155-160 characters
- Include primary keyword
- Include secondary keyword
- End with CTA or location

### "Schema validation errors"
1. Use: https://search.google.com/test/rich-results
2. Check JSON-LD syntax (valid JSON)
3. Verify all required fields
4. Check phone/email format

### "Page speed slow"
1. Check: https://pagespeed.web.dev/
2. Reduce image sizes (<100KB)
3. Enable compression (.htaccess)
4. Minimize CSS/JavaScript
5. Use CDN for images

---

## 📞 Key Contacts

**SEO Support**: TBD  
**Google Search Console**: https://search.google.com/search-console/  
**Google Analytics Support**: https://support.google.com/analytics/  

---

## Quick Facts

- **Total Pages**: 2 (Home + Menu)
- **Keywords Tracked**: 12+
- **Meta Tags**: 20+ per page
- **Structured Data Types**: 1 (LocalBusiness)
- **Search Console Goals**: Top 10 for 5 keywords
- **Monthly Organic Target**: 500+ sessions

---

**Last Updated**: January 17, 2025  
**Next Review**: February 17, 2025  
**Maintained By**: Development Team

