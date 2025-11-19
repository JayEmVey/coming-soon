# SEO Keywords Management Guide

**Created:** Nov 19, 2025  
**Purpose:** Guide for managing and updating SEO keywords  
**Status:** Active & Ready to Use

---

## What's New

Three new files have been created to facilitate SEO keyword management:

1. **SEO-KEYWORDS.md** - Central keyword database
2. **DEPLOYMENT_CHECKLIST_UPDATED.md** - Updated deployment process
3. **AGENTS.md** - Updated with SEO keywords section

---

## Quick Start

### 1. View All Keywords

Open: `SEO-KEYWORDS.md`

This file contains:
- All keywords by page
- Search volume estimates
- Keyword difficulty
- Meta tags and descriptions
- Implementation checklist

### 2. Update Keywords for a Page

#### Steps:

1. **Open SEO-KEYWORDS.md**
   - Find the page section (Home, Menu, Hiring, etc.)
   - Review current keywords
   - Note search volume and difficulty

2. **Update HTML File**
   - Open the page's HTML file (e.g., `/index.html`)
   - Find `<meta name="keywords">` tag
   - Update with new keywords from SEO-KEYWORDS.md
   - Update `<title>` tag if needed
   - Update `<meta name="description">` if needed
   - Update Open Graph tags (og:title, og:description)

3. **Example - Home Page Update**

   **Before:**
   ```html
   <meta name="keywords" content="Old keywords here">
   ```

   **After (using SEO-KEYWORDS.md):**
   ```html
   <meta name="keywords" content="Gate 7 Coffee, Vietnamese Coffee, Phin Coffee, Specialty Coffee, Coffee Roastery, HCMC, Ho Chi Minh, Arabica, Robusta">
   ```

4. **Build and Deploy**
   ```bash
   npm run build
   npm run deploy
   ```

5. **Monitor in Google Search Console**
   - https://search.google.com/search-console
   - Check keyword impressions
   - Track ranking positions

---

## File Organization

### SEO-KEYWORDS.md Structure

```
SEO Keywords Management
├── Overview
├── Primary Keywords (Home Page)
│   ├── Meta Keywords Tag
│   ├── Keyword List
│   ├── Meta Titles & Descriptions
│   ├── Open Graph Tags
│   └── Schema Keywords
├── Menu Page Keywords
├── Hiring Page Keywords
├── Music Page Keywords
├── Location Keywords
├── Long-Tail Keywords
├── Competitor Keywords
├── Seasonal & Event Keywords
├── Keyword Research Data
├── Keyword Implementation Checklist
├── Monthly Keyword Review
├── Keyword Update Process
├── Tools & Resources
└── Best Practices
```

### Current Keywords Summary

**Home Page (9 primary keywords)**
```
Gate 7 Coffee, Vietnamese Coffee, Phin Coffee, Specialty Coffee, 
Coffee Roastery, HCMC, Ho Chi Minh, Arabica, Robusta
```

**Menu Page (7 primary keywords)**
```
Gate 7 Coffee Menu, Vietnamese Coffee, Phin Coffee, Espresso, 
Matcha, Coffee Prices, HCMC
```

**Hiring Page (4 primary keywords in Vietnamese)**
```
Tuyển dụng Barista, Gate 7 Coffee, Công việc HCM, Cà phê Việt Nam
```

---

## Deployment Process - Updated

### New SEO Keywords Checklist

Before deployment, verify:

- [ ] **Review keywords in SEO-KEYWORDS.md**
  - Are they still relevant?
  - Any new keywords to add?
  - Any outdated keywords to remove?

- [ ] **Update meta keywords in HTML**
  - Copy from SEO-KEYWORDS.md
  - Ensure natural language
  - Check for keyword stuffing

- [ ] **Check keyword density (1-3%)**
  - Not too few (under 1%)
  - Not too many (over 3%)
  - Appears naturally in content

- [ ] **Test titles/descriptions length**
  - Title: 50-70 characters
  - Description: 150-160 characters
  - Verify they're not cut off in search results

- [ ] **Verify Open Graph tags**
  - og:title matches page title
  - og:description matches meta description
  - og:image is valid and accessible

- [ ] **Run build and deploy**
  ```bash
  npm run build && npm run deploy
  ```

- [ ] **Submit sitemap to Google Search Console**
  - URL: https://search.google.com/search-console
  - Sitemap: https://gate7.vn/sitemap.xml

- [ ] **Monitor keywords in Search Console**
  - Check impressions
  - Track rankings
  - Monitor CTR

---

## Monthly Keyword Review Workflow

### First Week of Month

1. **Access Google Search Console**
   - https://search.google.com/search-console/
   - Select property: gate7.vn

2. **Review Performance Data**
   - Go to "Performance" report
   - Filter by last 28 days
   - Note top performing keywords
   - Identify low-performing keywords

3. **Update SEO-KEYWORDS.md**
   - Update "Keyword Performance Tracking" section
   - Note rankings for primary keywords
   - Mark underperforming keywords
   - Add new keywords found in Search Console

### Second Week of Month

4. **Competitive Analysis**
   - Review competitor keywords
   - Identify gaps in your keyword strategy
   - Find new ranking opportunities
   - Update "Competitor Keywords" section

5. **Content Optimization**
   - Identify pages needing keyword updates
   - Plan new content around trending keywords
   - Update underperforming pages

### Third Week of Month

6. **Implementation**
   - Update SEO-KEYWORDS.md with changes
   - Update HTML files with new keywords
   - Build and deploy if changes made
   - Monitor initial results

### Fourth Week of Month

7. **Analysis & Planning**
   - Compile performance report
   - Identify trends
   - Plan next month's keyword strategy
   - Document lessons learned

---

## Keyword Update Examples

### Example 1: Adding a New Keyword

**Scenario:** You find "Best Vietnamese Coffee HCMC" is trending

**Steps:**

1. Add to SEO-KEYWORDS.md → Long-Tail Keywords
   ```markdown
   - "Best Vietnamese Coffee HCMC"
   ```

2. Update relevant HTML pages' keywords

3. Add to content naturally (e.g., menu descriptions)

4. Deploy: `npm run deploy`

5. Monitor in Search Console

### Example 2: Seasonal Keywords

**Scenario:** Winter season approaching, add hot drinks keywords

**Steps:**

1. Add to SEO-KEYWORDS.md → Seasonal & Event Keywords
   ```markdown
   ### Winter Keywords
   - "Hot coffee Vietnam"
   - "Warm drinks HCMC"
   - "Coffee winter specials"
   ```

2. Update home page keywords to include seasonal variations

3. Create or update content featuring these keywords

4. Deploy changes

5. Remove after season ends

### Example 3: Low-Performing Keyword

**Scenario:** A keyword has zero impressions for 2 months

**Steps:**

1. Review the keyword in SEO-KEYWORDS.md

2. Check if it's still relevant

3. Either:
   - Improve content around that keyword, OR
   - Replace with higher-volume keyword

4. Update and deploy

5. Monitor new keyword performance

---

## SEO Keywords Best Practices

### Do ✅

- **Use naturally in content**
  - Read text aloud - does it sound natural?
  - Keywords should flow with sentences

- **Target 1-3 primary keywords per page**
  - Home: 9 keywords (brand + product + location)
  - Menu: 7 keywords (product specific)
  - Hiring: 4 keywords (job specific)

- **Include related/long-tail keywords**
  - Increases relevance
  - Captures more search variations

- **Update keywords regularly**
  - Monthly review recommended
  - Seasonal updates important
  - Quarterly comprehensive audit

- **Monitor and track**
  - Use Google Search Console
  - Track rankings monthly
  - Adjust strategy based on data

### Don't ❌

- **Keyword stuff or overuse**
  - Keyword density: 1-3% (not 5%+)
  - Avoid repeating same keyword repeatedly
  - Google penalizes unnatural keyword usage

- **Use irrelevant keywords**
  - "Gaming PC" for a coffee shop? NO
  - Keywords must match actual content

- **Copy competitor keywords blindly**
  - Research YOUR audience
  - Find keywords you can actually rank for
  - Consider search intent

- **Ignore user intent**
  - "Vietnamese coffee" vs "coffee delivery"
  - Different intents, different keywords

- **Neglect mobile keywords**
  - Mobile searches differ from desktop
  - Voice searches (longer, more conversational)

- **Forget to test changes**
  - Use Google Rich Results Test
  - Check title/description length
  - Verify formatting in search results

---

## Tools & Resources

### Keyword Research

- **Google Keyword Planner**
  - https://ads.google.com/home/tools/keyword-planner/
  - Free, official Google tool
  - Best for search volume estimates

- **Ahrefs Keywords Explorer**
  - https://ahrefs.com/keywords-explorer
  - Paid tool, very comprehensive
  - Great for competitor analysis

- **SEMrush**
  - https://www.semrush.com/
  - All-in-one SEO platform
  - Keyword research, tracking, analytics

- **Ubersuggest**
  - https://ubersuggest.com/
  - Affordable alternative
  - Keyword ideas and competition analysis

### SEO Testing

- **Google Search Console**
  - https://search.google.com/search-console
  - Official Google tool
  - Track rankings, impressions, CTR
  - Monitor crawl errors

- **Google Rich Results Test**
  - https://search.google.com/test/rich-results
  - Validate schema markup
  - Preview how content appears in search

- **PageSpeed Insights**
  - https://pagespeed.web.dev/
  - Performance affects SEO
  - Core Web Vitals important for ranking

### Analytics

- **Google Analytics 4**
  - https://analytics.google.com/
  - Track organic traffic
  - Monitor user behavior
  - Identify high-value keywords

- **Bing Webmaster Tools**
  - https://www.bing.com/webmasters
  - Alternative search engine data
  - Similar to Google Search Console

---

## Integration with Build/Deploy

### Updated AGENTS.md

The AGENTS.md file now includes:

```markdown
### SEO Keywords Management

- **Manage keywords**: Edit `SEO-KEYWORDS.md`
- **Update HTML keywords**: Reference SEO-KEYWORDS.md
- **Deployment checklist**: See SEO-KEYWORDS.md
- **See also**: DEPLOYMENT_CHECKLIST_UPDATED.md
```

### Build Commands (Unchanged)

```bash
# Build
npm run build

# Deploy
npm run deploy

# Local test
python -m http.server 8000
```

### Deployment Checklist (Updated)

`DEPLOYMENT_CHECKLIST_UPDATED.md` includes:

- [ ] Review keywords in SEO-KEYWORDS.md
- [ ] Update meta keywords in HTML
- [ ] Check keyword density (1-3%)
- [ ] Test titles/descriptions length
- [ ] Verify Open Graph tags
- [ ] Run: `npm run build && npm run deploy`
- [ ] Submit sitemap to Google Search Console
- [ ] Monitor keywords in Search Console

---

## Maintenance Calendar

### Daily (First week after deployment)
- Check Google Search Console for errors
- Monitor keyword impressions
- Watch for crawl issues

### Weekly
- Review Search Console data
- Check top performing keywords
- Identify keywords needing work

### Monthly
- Full SEO-KEYWORDS.md review
- Update performance data
- Plan next month's keywords
- Competitive analysis

### Quarterly
- Comprehensive keyword audit
- Major strategy review
- Identify new opportunities
- Plan seasonal keywords

### Annually
- Yearly SEO strategy review
- Full content audit
- Update all keywords
- Set new goals

---

## Quick Reference

### Files to Edit

| File | Purpose | When |
|------|---------|------|
| SEO-KEYWORDS.md | Manage all keywords | Monthly |
| /index.html | Home page keywords | When updating |
| /menu/index.html | Menu keywords | When updating |
| /hiring/index.html | Hiring keywords | When updating |
| AGENTS.md | Build commands | When adding new process |

### Key Websites

| Site | Purpose | Frequency |
|------|---------|-----------|
| Google Search Console | Monitor rankings & traffic | Daily |
| PageSpeed Insights | Check performance | Monthly |
| Rich Results Test | Validate schema | Before deploy |
| Keyword Planner | Research keywords | Monthly |

### Commands

```bash
# Build and deploy
npm run build && npm run deploy

# Test locally
python -m http.server 8000

# Check git log
git log --oneline -5
```

---

## Troubleshooting

### Keywords not ranking

1. **Check if indexed**
   - Search Console → Coverage report
   - Is the page indexed?

2. **Check content relevance**
   - Does page content match keyword?
   - Is keyword mentioned in content?

3. **Check competition**
   - Is keyword too competitive?
   - Can you realistically rank?

4. **Check technical SEO**
   - PageSpeed Insights score
   - Mobile-friendly?
   - Schema markup valid?

### Keyword stuffing penalty

1. **Identify problematic pages**
   - Search Console → Manual Actions
   - Check pages with high keyword density

2. **Rewrite naturally**
   - Remove keyword overuse
   - Focus on user experience
   - Aim for 1-3% keyword density

3. **Resubmit**
   - Fix pages
   - Request reconsideration in Search Console

### Search Console errors

1. **Check error type**
   - Coverage: Page not indexed
   - Enhancements: Schema markup issues
   - Security: Malware/hacking issues

2. **Fix the issue**
   - Follow Google's suggested fixes
   - Check site for problems
   - Verify fixes locally first

3. **Request revalidation**
   - Search Console → Request validation
   - Wait for Google to recrawl

---

## Summary

**SEO Keywords Management is now easy:**

1. ✅ Central keyword database (SEO-KEYWORDS.md)
2. ✅ Updated deployment checklist
3. ✅ Clear processes and guidelines
4. ✅ Monthly monitoring workflow
5. ✅ Integration with build/deploy

**Next Steps:**

1. Review SEO-KEYWORDS.md monthly
2. Update keywords as needed
3. Monitor in Google Search Console
4. Deploy changes regularly
5. Track performance

---

**Created:** Nov 19, 2025  
**Commit:** 439c54d  
**Status:** Active & Ready to Use

