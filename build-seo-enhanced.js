#!/usr/bin/env node

/**
 * Enhanced Static Site Builder with SEO Keyword Validation
 * Minifies HTML, CSS, and JS while validating SEO keywords
 */

const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, 'dist');
const SOURCE_FILES = [
  { src: 'index.html', dest: 'index.html', page: 'Home' },
  { src: 'menu/index.html', dest: 'menu/index.html', page: 'Menu' },
  { src: 'music/spotify.html', dest: 'music/spotify.html', page: 'Music' },
  { src: 'hiring/index.html', dest: 'hiring/index.html', page: 'Hiring' },
  { src: 'hiring/banner.html', dest: 'hiring/banner.html', page: 'Hiring Banner' }
];

const STATIC_FILES = [
  'CNAME',
  'robots.txt',
  'sitemap.xml'
];

const DIRS_TO_COPY = [
  'css',
  'images'
];

// SEO Keywords Configuration
const SEO_CONFIG = {
  'Home': {
    keywords: ['Gate 7 Coffee', 'Vietnamese Coffee', 'Phin Coffee', 'Specialty Coffee', 'Coffee Roastery', 'HCMC', 'Ho Chi Minh', 'Arabica', 'Robusta'],
    minKeywordDensity: 0.5,
    maxKeywordDensity: 3,
    requiredMeta: ['keywords', 'description', 'og:title', 'og:description']
  },
  'Menu': {
    keywords: ['Gate 7 Coffee Menu', 'Vietnamese Coffee', 'Phin Coffee', 'Espresso', 'Matcha', 'Coffee Prices', 'HCMC'],
    minKeywordDensity: 0.5,
    maxKeywordDensity: 3,
    requiredMeta: ['keywords', 'description', 'og:title']
  },
  'Music': {
    keywords: ['Gate 7 Coffee Music', 'Coffee Shop Music', 'Spotify Playlist', 'Ambient Music'],
    minKeywordDensity: 0.5,
    maxKeywordDensity: 2.5,
    requiredMeta: ['keywords', 'description']
  },
  'Hiring': {
    keywords: ['Tuyển dụng Barista', 'Barista Jobs HCM', 'Coffee Jobs Vietnam'],
    minKeywordDensity: 0.5,
    maxKeywordDensity: 2.5,
    requiredMeta: ['keywords', 'description']
  }
};

// Simple HTML minifier
function minifyHTML(content) {
  return content
    .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
    .replace(/\n\s+/g, '\n') // Remove extra whitespace
    .replace(/\s{2,}/g, ' ') // Multiple spaces to single
    .trim();
}

// Simple CSS minifier
function minifyCSS(content) {
  return content
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
    .replace(/\s{2,}/g, ' ') // Multiple spaces to single
    .replace(/\s*([{}:;,>+~])\s*/g, '$1') // Remove spaces around symbols
    .replace(/;}/g, '}') // Remove last semicolon
    .trim();
}

// Simple JS minifier
function minifyJS(content) {
  return content
    .replace(/\/\/.*$/gm, '') // Remove single-line comments
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
    .replace(/\n\s+/g, '\n') // Remove indentation
    .replace(/\s{2,}/g, ' ') // Multiple spaces to single
    .trim();
}

// Validate SEO keywords
function validateSEOKeywords(content, pageName) {
  const config = SEO_CONFIG[pageName];
  if (!config) return { valid: true, warnings: [] };

  const warnings = [];
  const contentLower = content.toLowerCase();
  const textContent = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
  const wordCount = textContent.split(/\s+/).length;

  // Check meta tags
  config.requiredMeta.forEach(metaType => {
    if (metaType.startsWith('og:')) {
      if (!content.includes(`property="${metaType}"`)) {
        warnings.push(`⚠️  Missing Open Graph meta tag: ${metaType}`);
      }
    } else {
      if (!content.includes(`name="${metaType}"`)) {
        warnings.push(`⚠️  Missing meta tag: ${metaType}`);
      }
    }
  });

  // Check keyword density
  config.keywords.forEach(keyword => {
    const keywordLower = keyword.toLowerCase();
    const matches = (contentLower.match(new RegExp(keywordLower, 'g')) || []).length;
    const density = (matches / wordCount) * 100;

    if (density < config.minKeywordDensity && density > 0) {
      warnings.push(`⚠️  Low keyword density for "${keyword}": ${density.toFixed(2)}%`);
    }
    if (density > config.maxKeywordDensity) {
      warnings.push(`⚠️  High keyword density for "${keyword}": ${density.toFixed(2)}% (possible keyword stuffing)`);
    }
  });

  // Check title tag
  const titleMatch = content.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch) {
    const title = titleMatch[1];
    if (title.length > 60) {
      warnings.push(`⚠️  Meta title too long: ${title.length} chars (recommended: 50-60)`);
    } else if (title.length < 30) {
      warnings.push(`⚠️  Meta title too short: ${title.length} chars (recommended: 50-60)`);
    }
  }

  // Check meta description
  const descMatch = content.match(/name="description"\s+content="([^"]*)"/i);
  if (descMatch) {
    const desc = descMatch[1];
    if (desc.length > 160) {
      warnings.push(`⚠️  Meta description too long: ${desc.length} chars (recommended: 150-160)`);
    } else if (desc.length < 120) {
      warnings.push(`⚠️  Meta description too short: ${desc.length} chars (recommended: 150-160)`);
    }
  } else {
    warnings.push(`⚠️  Missing meta description`);
  }

  return {
    valid: warnings.length === 0,
    warnings,
    wordCount,
    keywordStats: config.keywords.map(keyword => ({
      keyword,
      density: ((contentLower.match(new RegExp(keyword.toLowerCase(), 'g')) || []).length / wordCount * 100).toFixed(2)
    }))
  };
}

// Create directory if not exists
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Copy directory recursively
function copyDir(src, dest) {
  ensureDir(dest);
  const files = fs.readdirSync(src);

  files.forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);

    if (fs.statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

// Main build function
function build() {
  console.log('🔨 Building production bundle with SEO validation...\n');

  // Clean dist directory
  if (fs.existsSync(DIST_DIR)) {
    fs.rmSync(DIST_DIR, { recursive: true });
  }
  ensureDir(DIST_DIR);

  let seoErrors = [];
  let seoWarnings = [];

  // Process HTML files
  console.log('📝 Minifying HTML files & validating SEO...');
  SOURCE_FILES.forEach(file => {
    const srcPath = path.join(__dirname, file.src);
    const destPath = path.join(DIST_DIR, file.dest);

    ensureDir(path.dirname(destPath));

    let content = fs.readFileSync(srcPath, 'utf8');
    
    // Validate SEO
    const seoValidation = validateSEOKeywords(content, file.page);
    
    if (!seoValidation.valid) {
      seoWarnings.push({
        file: file.src,
        page: file.page,
        issues: seoValidation.warnings
      });
    }

    content = minifyHTML(content);

    fs.writeFileSync(destPath, content);

    const originalSize = fs.statSync(srcPath).size;
    const minifiedSize = content.length;
    const savings = (((originalSize - minifiedSize) / originalSize) * 100).toFixed(1);

    console.log(`  ✓ ${file.src} (${minifiedSize} bytes, ${savings}% smaller)`);
    
    if (seoValidation.warnings.length > 0) {
      console.log(`    Page: ${file.page}`);
      seoValidation.warnings.forEach(warn => console.log(`    ${warn}`));
    }
  });

  // Copy and minify CSS
  console.log('\n🎨 Processing CSS files...');
  if (fs.existsSync(path.join(__dirname, 'css'))) {
    const cssDir = path.join(DIST_DIR, 'css');
    ensureDir(cssDir);

    const cssFiles = fs.readdirSync(path.join(__dirname, 'css'));
    cssFiles.forEach(file => {
      const srcPath = path.join(__dirname, 'css', file);
      const stat = fs.statSync(srcPath);
      const destPath = path.join(cssDir, file);

      if (stat.isDirectory()) {
        return;
      }

      if (file.endsWith('.css')) {
        let content = fs.readFileSync(srcPath, 'utf8');
        const minified = minifyCSS(content);
        fs.writeFileSync(destPath, minified);

        const originalSize = content.length;
        const minifiedSize = minified.length;
        const savings = (((originalSize - minifiedSize) / originalSize) * 100).toFixed(1);

        console.log(`  ✓ ${file} (${minifiedSize} bytes, ${savings}% smaller)`);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    });
  }

  // Copy images
  console.log('\n🖼️  Copying images...');
  DIRS_TO_COPY.forEach(dir => {
    const srcPath = path.join(__dirname, dir);
    const destPath = path.join(DIST_DIR, dir);

    if (fs.existsSync(srcPath)) {
      copyDir(srcPath, destPath);
      const fileCount = fs.readdirSync(destPath).length;
      console.log(`  ✓ ${dir}/ (${fileCount} files)`);
    }
  });

  // Copy static files
  console.log('\n📋 Copying static files...');
  STATIC_FILES.forEach(file => {
    const srcPath = path.join(__dirname, file);
    if (fs.existsSync(srcPath)) {
      const destPath = path.join(DIST_DIR, file);
      fs.copyFileSync(srcPath, destPath);
      console.log(`  ✓ ${file}`);
    }
  });

  // Calculate totals
  console.log('\n✅ Build complete!\n');

  let totalSize = 0;
  function getSize(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        getSize(filePath);
      } else {
        totalSize += stat.size;
      }
    });
  }

  getSize(DIST_DIR);
  const totalMB = (totalSize / 1024 / 1024).toFixed(2);

  console.log(`📦 Output: ${DIST_DIR}/`);
  console.log(`📊 Total size: ${totalSize} bytes (${totalMB} MB)\n`);

  // SEO Report
  if (seoWarnings.length > 0) {
    console.log('🔍 SEO Validation Report:');
    console.log('========================\n');
    seoWarnings.forEach(warning => {
      console.log(`📄 ${warning.file} (${warning.page} page)`);
      warning.issues.forEach(issue => console.log(`   ${issue}`));
      console.log('');
    });
    console.log('⚠️  Review SEO issues above before final deployment.\n');
  } else {
    console.log('🎉 SEO Validation: All pages passed!\n');
  }

  // Create SEO report file
  const report = {
    timestamp: new Date().toISOString(),
    totalSize: totalSize,
    files: SOURCE_FILES.length,
    seoWarnings: seoWarnings,
    seoPassed: seoWarnings.length === 0
  };

  fs.writeFileSync(
    path.join(DIST_DIR, 'seo-build-report.json'),
    JSON.stringify(report, null, 2)
  );
}

// Run build
try {
  build();
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
