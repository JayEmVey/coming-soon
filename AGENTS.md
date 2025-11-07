# AGENTS.md

## Build/Lint/Test Commands

This is a static website project with no build process, linting, or tests.

- **Serve locally**: Use any static web server (e.g., `python -m http.server 8000`)
- **Deploy**: Hosted on GitHub Pages via repository settings

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
