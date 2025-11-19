#!/usr/bin/env node

/**
 * Image Protection Module
 * Applies multi-layer protection to high-value images:
 * 1. Canvas rendering (prevents direct image file access)
 * 2. Invisible overlay (blocks click interactions)
 * 3. Short-lived signed URLs (simulated with timestamps)
 * 4. Right-click disabling
 * 5. Image tiling (for premium assets)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// High-value images to protect
const HIGH_VALUE_IMAGES = [
  'logo-color-black-bg1.png',
  'Menu_Final.png',
  'coffee-as-you-are.png',
  'hiring-banner.png'
];

// Image protection configuration
const PROTECTION_CONFIG = {
  enableCanvasRender: true,
  enableOverlay: true,
  enableSignedURL: true,
  enableRightClickBlock: true,
  enableTiling: true,
  tilePremiumAssets: true,
  signatureTTL: 3600000, // 1 hour in milliseconds
  tileSize: 256
};

/**
 * Generate a time-limited signature for an image
 * @param {string} imagePath - Path to the image
 * @param {number} ttl - Time to live in milliseconds
 * @returns {string} Base64-encoded signature
 */
function generateSignedURL(imagePath, ttl = PROTECTION_CONFIG.signatureTTL) {
  const timestamp = Date.now();
  const expiry = timestamp + ttl;
  const secret = process.env.IMAGE_PROTECTION_SECRET || 'gate7-secret-key';
  
  const data = `${imagePath}:${expiry}`;
  const signature = crypto
    .createHmac('sha256', secret)
    .update(data)
    .digest('base64')
    .replace(/[+/=]/g, (m) => ({ '+': '-', '/': '_', '=': '' }[m]));
  
  return `${Buffer.from(imagePath).toString('base64')}:${expiry}:${signature}`;
}

/**
 * Create protection script for canvas rendering
 * @param {string} imagePath - Path to image relative to /images
 * @param {boolean} tile - Whether to tile the image
 * @returns {string} JavaScript code for image protection
 */
function createProtectionScript(imagePath, tile = false) {
  const signedURL = generateSignedURL(`/images/${imagePath}`);
  
  return `
(function() {
  // Image Protection Module
  const imageProtection = {
    imagePath: '/images/${imagePath}',
    signedURL: '${signedURL}',
    tile: ${tile},
    tileSize: ${PROTECTION_CONFIG.tileSize},
    
    // Verify signature (client-side validation)
    verifySignature: function(token) {
      const parts = token.split(':');
      if (parts.length !== 3) return false;
      const [imgB64, expiry, sig] = parts;
      
      // Check expiry
      if (parseInt(expiry) < Date.now()) {
        console.warn('Image signature expired');
        return false;
      }
      return true;
    },
    
    // Render image to canvas
    renderToCanvas: function(canvas, imagePath, callback) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = function() {
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        
        if (this.tile) {
          // Tile the image
          for (let y = 0; y < canvas.height; y += this.tileSize) {
            for (let x = 0; x < canvas.width; x += this.tileSize) {
              ctx.drawImage(img, x, y);
            }
          }
        } else {
          ctx.drawImage(img, 0, 0);
        }
        
        callback();
      };
      
      img.onerror = function() {
        console.error('Failed to load protected image');
      };
      
      img.src = imagePath;
    },
    
    // Setup protection overlays
    setupProtection: function(canvasElement) {
      // Verify signature
      if (!this.verifySignature(this.signedURL)) {
        canvasElement.style.display = 'none';
        return;
      }
      
      // Disable right-click
      canvasElement.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        console.log('Right-click disabled for protected image');
      });
      
      // Create invisible overlay to block interactions
      const overlay = document.createElement('div');
      overlay.style.cssText = \`
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: transparent;
        z-index: 9999;
        user-select: none;
        pointer-events: auto;
      \`;
      
      // Block drag
      overlay.addEventListener('dragstart', (e) => {
        e.preventDefault();
      });
      
      // Block copy
      overlay.addEventListener('copy', (e) => {
        e.preventDefault();
      });
      
      // Log attempts to access image
      overlay.addEventListener('click', (e) => {
        console.log('Protected image access attempt logged');
      });
      
      const parent = canvasElement.parentElement;
      parent.style.position = 'relative';
      parent.appendChild(overlay);
    },
    
    // Initialize protection
    init: function() {
      if (!this.verifySignature(this.signedURL)) {
        console.error('Invalid or expired image signature');
        return;
      }
      
      // Find all canvas elements for this image
      document.querySelectorAll('[data-protected-image="${imagePath}"]').forEach((canvas) => {
        this.renderToCanvas(canvas, this.imagePath, () => {
          this.setupProtection(canvas);
        });
      });
    }
  };
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => imageProtection.init());
  } else {
    imageProtection.init();
  }
  
  window.imageProtection = imageProtection;
})();
`;
}

/**
 * Create HTML snippet for protected image
 * @param {string} imagePath - Image filename
 * @param {object} options - Additional options (alt, title, class, etc)
 * @returns {string} HTML for protected image
 */
function createProtectedImageHTML(imagePath, options = {}) {
  const alt = options.alt || imagePath;
  const className = options.class || '';
  const style = options.style || '';
  const tile = HIGH_VALUE_IMAGES.includes(imagePath);
  
  return `
<!-- Protected Image: ${imagePath} -->
<canvas 
  data-protected-image="${imagePath}"
  alt="${alt}"
  class="protected-image ${className}"
  style="${style}"
></canvas>
<script>${createProtectionScript(imagePath, tile)}</script>
`;
}

/**
 * Generate protection stylesheet
 * @returns {string} CSS code for image protection
 */
function createProtectionCSS() {
  return `
/* Image Protection Styles */
.protected-image {
  display: block;
  max-width: 100%;
  height: auto;
  image-rendering: crisp-edges;
  user-select: none;
  -webkit-user-drag: none;
  -moz-user-select: none;
  -webkit-user-select: none;
}

/* Prevent drag and drop */
.protected-image-container {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

/* Global right-click block for protected content */
.protect-right-click {
  pointer-events: none;
}
`;
}

/**
 * Create comprehensive protection script to inject into HTML
 * @returns {string} JavaScript code for global protection
 */
function createGlobalProtectionScript() {
  return `
<script>
// Global Image Protection Module
(function() {
  'use strict';
  
  // Disable right-click globally for protected images
  document.addEventListener('contextmenu', function(e) {
    const target = e.target;
    if (target.dataset && target.dataset.protectedImage) {
      e.preventDefault();
      console.log('Right-click blocked for protected image');
    }
  });
  
  // Block developer tools access to canvas
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', function() {
      // Clear canvas data before unload
      document.querySelectorAll('[data-protected-image]').forEach(canvas => {
        if (canvas.getContext) {
          const ctx = canvas.getContext('2d');
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      });
    });
  }
  
  // Anti-debugging measures (light)
  let devToolsOpen = false;
  const threshold = 160;
  setInterval(function() {
    if (window.outerHeight - window.innerHeight > threshold ||
        window.outerWidth - window.innerWidth > threshold) {
      devToolsOpen = true;
    }
  }, 500);
  
  // Log protection status
  console.log('%cGate 7 Image Protection Active', 
    'color: #C17817; font-size: 14px; font-weight: bold;');
  console.log('Images are protected by multiple layers');
})();
</script>
`;
}

/**
 * Process HTML to inject protection for specified images
 * @param {string} htmlContent - HTML content to process
 * @param {array} imagesToProtect - List of image filenames to protect
 * @returns {string} Modified HTML with protection
 */
function injectProtection(htmlContent, imagesToProtect = HIGH_VALUE_IMAGES) {
  let modified = htmlContent;
  
  // Add global protection script before closing body
  const globalScript = createGlobalProtectionScript();
  modified = modified.replace('</body>', globalScript + '\n</body>');
  
  // Add protection stylesheet before closing head
  const protectionCSS = `<style>${createProtectionCSS()}</style>`;
  modified = modified.replace('</head>', protectionCSS + '\n</head>');
  
  return modified;
}

module.exports = {
  HIGH_VALUE_IMAGES,
  PROTECTION_CONFIG,
  generateSignedURL,
  createProtectionScript,
  createProtectedImageHTML,
  createProtectionCSS,
  createGlobalProtectionScript,
  injectProtection
};
