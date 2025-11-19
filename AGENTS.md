# AGENTS.md

## Build/Lint/Test Commands

This is a static website project with optimized build and deployment pipeline.

### Build Commands

- **Build for production**: `npm run build`
  - Minifies HTML, CSS, JavaScript
  - Optimizes and copies images
  - Output: `dist/` folder
  - No external dependencies required

- **Build with SEO validation**: `npm run build:seo`
  - Performs standard build
  - Validates SEO keywords on all pages
  - Checks meta tags (title, description, keywords, og:*)
  - Analyzes keyword density (warns if too high/low)
  - Checks title/description length
  - Generates `seo-build-report.json` in dist/
  - Recommended before major deployments
  
- **Deploy to GitHub Pages** (one command): `npm run deploy`
  - Builds production bundle
  - Commits to git
  - Pushes to GitHub (triggers GitHub Pages)
  - Site live in ~2 minutes
  - Windows: `npm run deploy`
  - macOS/Linux: `npm run deploy`

- **Deploy with SEO validation**: `npm run deploy:seo`
  - Builds with SEO keyword validation
  - Commits with SEO validation message
  - Pushes to GitHub
  - Use for content updates and keyword changes
  
- **Force deploy** (if needed): `npm run deploy:force`
  - Same as deploy but force-pushes to git
  - Use only if git history is out of sync

### Local Development

- **Serve locally**: `python -m http.server 8000` (or any static server)
- **View dist folder**: Open `dist/index.html` in browser after build

### Deployment Info

- Hosted on GitHub Pages (main branch serves dist/ folder)
- Custom domain: gate7.vn (via CNAME file)
- HTTPS: Enabled automatically by GitHub Pages
- Build script: `build-simple.js` (zero npm dependencies!)
- See: DEPLOYMENT.md for detailed deployment guide

### SEO Keywords Management

- **Manage keywords**: Edit `SEO-KEYWORDS.md`
  - Central location for all SEO keywords
  - Organized by page and keyword type
  - Includes search volume and difficulty
  - Tracks keyword performance and current status
  
- **Update HTML keywords**: 
  - Edit `<meta name="keywords">` in HTML files
  - Reference SEO-KEYWORDS.md for current keywords
  - Update `<title>` and `<meta description>` tags
  - Update Open Graph tags
  - Target keyword density: 0.5-3%
  
- **SEO Validation Commands**:
  - Validate before deploy: `npm run build:seo`
  - Deploy with validation: `npm run deploy:seo`
  - Check report: `dist/seo-build-report.json`
  
- **Pre-deployment SEO checklist**:
  - [ ] Review/update keywords in SEO-KEYWORDS.md
  - [ ] Update meta keywords in HTML
  - [ ] Check keyword density (0.5-3% target)
  - [ ] Test titles (50-60 chars) & descriptions (150-160 chars)
  - [ ] Verify Open Graph tags
  - [ ] Run validation: `npm run build:seo`
  - [ ] Review SEO warnings from build
  - [ ] Fix SEO issues before deploy
  - [ ] Deploy with: `npm run deploy:seo`
  - [ ] Verify seo-build-report.json generated
  - [ ] Submit sitemap to Google Search Console
  - [ ] Monitor keywords in Search Console
  
- **See also**: 
  - SEO-KEYWORDS.md - Detailed keyword management
  - SEO_BUILD_QUICK_START.md - Quick start workflow
  - SEO_BUILD_IMPLEMENTATION_SUMMARY.md - What's implemented

## Architecture & Codebase Structure

Static HTML/CSS/JavaScript website for Gate 7 Coffee Roastery coming soon page.

- **Root (`index.html`)**: Simple coming soon landing page
- **gate1/**: Full coffee shop website (Roasted Grounds brand)
- **gate2/, gate3/**: Alternative website versions
- **public/**: Email notification coming soon page
- **css/**: Stylesheets with CSS custom properties
- **images/**: Static assets (logos, photos)
- **Other folders**: brand-story, hiring, menu, music, pilot (various content sections)

No backend, databases, or internal APIs. Pure client-side static files.

## Code Style Guidelines

### HTML
- Semantic HTML5 elements
- Proper meta tags and accessibility attributes
- Google Analytics integration with gtag.js

### CSS
- CSS custom properties (variables) for theming
- Modern CSS reset (`box-sizing: border-box`)
- Flexbox/Grid for layouts
- Smooth animations with `cubic-bezier` easing
- Mobile-first responsive design with media queries
- Color scheme: Dark backgrounds (#0B0C06) with golden accent (#C17817)

### JavaScript
- ES6+ features (arrow functions, template literals)
- Vanilla JS, no frameworks
- Event listeners for form handling and scroll interactions
- DOM manipulation for dynamic content updates

### Naming Conventions
- CSS classes: kebab-case (e.g., `animate-text-delay`)
- JavaScript: camelCase for variables/functions
- Files: lowercase with hyphens (e.g., `style-gate7.css`)

### Error Handling
- Basic form validation with user feedback
- Graceful degradation for unsupported features
