# AGENTS.md - Development Guidelines

## Build & Deploy Commands

### Build
```bash
npm run build
```
Minifies HTML, CSS, JavaScript. Output in `dist/` folder.

### Build with SEO Validation
```bash
npm run build:seo
```
Validates SEO keywords and generates `seo-build-report.json`.

### Deploy (Auto-deployment to GitHub Pages)
```bash
npm run deploy
```
Builds and pushes to GitHub. Site live in ~2 minutes.

### Deploy with SEO Validation
```bash
npm run deploy:seo
```
Validates SEO before deploying.

### Deploy with Protection
```bash
npm run deploy:protect
```
Builds with enhanced protection.

### Force Deploy (Rare)
```bash
npm run deploy:force
```
Force-push to git (only if git history is out of sync).

### Generate Responsive Images
```bash
npm run generate:responsive
```
Creates WebP variants for mobile/tablet/desktop.

## Local Development

```bash
python -m http.server 8000
# Visit: http://localhost:8000
```

## Code Style

### HTML
- Semantic HTML5
- Proper meta tags and accessibility
- Alt text on all images

### CSS
- CSS custom properties for theming
- Mobile-first responsive design
- Color scheme: Dark backgrounds (#0B0C06) with golden accent (#C17817)

### JavaScript
- ES6+ vanilla JS (no frameworks)
- Event listeners and DOM manipulation
- Progressive enhancement

### Naming
- CSS classes: kebab-case (`animate-text-delay`)
- JS variables: camelCase
- Files: lowercase with hyphens (`style-gate7.css`)

## Project Structure

```
├── index.html              # Home page
├── menu/index.html        # Menu page
├── music/spotify.html     # Spotify manager
├── css/style-gate7.css    # Stylesheet
├── images/                # Assets + responsive variants
├── js/                    # JavaScript utilities
├── build-simple.js        # Zero-dep build script
├── SEO-KEYWORDS.md        # Keyword management
├── package.json           # npm config
└── README.md              # Full documentation
```

## SEO Workflow

1. Update keywords in SEO-KEYWORDS.md
2. Update meta tags in HTML files
3. Run validation: `npm run build:seo`
4. Review seo-build-report.json
5. Deploy: `npm run deploy:seo`

See README.md for complete documentation.
