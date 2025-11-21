// Service Worker - Offline caching & performance
// Version: 2.0.0
// Usage: Registered in main HTML files

const CACHE_NAME = 'gate7-v3';
const CACHE_VERSION = 'v3';
const NETWORK_TIMEOUT = 3000; // 3 second timeout for network requests

// Critical assets to cache on install
const urlsToCache = [
    '/',
    '/index.html',
    '/menu/index.html',
    '/hiring/index.html',
    '/pilot/index.html',
    '/brand-story/index.html',
    // CSS files
    '/css/style-gate7.css',
    '/css/style-menu.css',
    '/css/style-music.css',
    '/css/style-footer.css',
    '/css/style-global.css',
    '/css/style-index.css',
    // JavaScript files
    '/js/language-switcher.js',
    '/js/scroll-animations.js',
    '/js/responsive-images.js',
    // Critical images
    '/images/logo-color-black-bg1.png',
    '/images/logo-only-white.png',
    '/images/logo-only-black.png',
    '/images/coffee-as-you-are.png',
    '/images/coffee-as-you-are-light-gold.png',
    '/images/social-icon-instagram.png',
    '/images/social-icon-facebook.png',
    '/images/social-icon-zalo.png',
    '/images/logo.png',
    '/images/header.png'
];

// Install event - Pre-cache critical assets
self.addEventListener('install', event => {
    console.log('[Service Worker] Installing v2...');
    
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('[Service Worker] Caching app shell');
            return cache.addAll(urlsToCache);
        }).catch(error => {
            console.error('[Service Worker] Cache failed:', error);
        })
    );
    
    // Force the new service worker to activate
    self.skipWaiting();
});

// Activate event - Clean up old caches
self.addEventListener('activate', event => {
    console.log('[Service Worker] Activating...');
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[Service Worker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    
    // Take control of clients immediately
    self.clients.claim();
});

// Helper function - Network with timeout
function fetchWithTimeout(request, timeout = NETWORK_TIMEOUT) {
    return Promise.race([
        fetch(request),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Network timeout')), timeout)
        )
    ]);
}

// Fetch event - Intelligent caching strategy
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Allow CDN requests (jsDelivr, Cloudflare, GitHub) to pass through
    const isCdnRequest = url.hostname.includes('cdn.jsdelivr.net') || 
                         url.hostname.includes('raw.githubusercontent.com') ||
                         url.hostname.includes('cloudflare');
    
    if (isCdnRequest) {
        // Let CDN requests pass through without service worker interception
        return;
    }
    
    // Skip other external requests
    if (url.origin !== location.origin) {
        return;
    }
    
    // Cache first for images and fonts
    if (request.destination === 'image' || request.destination === 'font') {
        event.respondWith(
            caches.match(request).then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                
                return fetchWithTimeout(request)
                    .then(networkResponse => {
                        // Cache successful responses
                        if (networkResponse && networkResponse.status === 200) {
                            const responseClone = networkResponse.clone();
                            caches.open(CACHE_NAME).then(cache => {
                                cache.put(request, responseClone);
                            });
                        }
                        return networkResponse;
                    })
                    .catch(error => {
                        console.error('[Service Worker] Fetch failed for image:', request.url, error);
                        // No cached version and network failed - return blank image
                        return new Response(
                            new Blob([''], { type: 'image/png' }),
                            { status: 404, statusText: 'Not Found' }
                        );
                    });
            })
        );
        return;
    }
    
    // Network first with short timeout for HTML/CSS/JS - fallback to cache
    event.respondWith(
        fetchWithTimeout(request)
            .then(networkResponse => {
                // Cache successful responses
                if (networkResponse && networkResponse.status === 200) {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(request, responseClone);
                    });
                }
                return networkResponse;
            })
            .catch(error => {
                console.error('[Service Worker] Network request failed:', request.url, error.message);
                
                // Try to serve from cache
                return caches.match(request).then(cachedResponse => {
                    if (cachedResponse) {
                        console.log('[Service Worker] Serving from cache:', request.url);
                        return cachedResponse;
                    }
                    
                    // For HTML documents, serve the offline page
                    if (request.destination === 'document') {
                        return caches.match('/index.html').then(indexResponse => {
                            return indexResponse || new Response(
                                '<!DOCTYPE html><html><body><h1>Offline</h1><p>Please check your connection</p></body></html>',
                                { status: 503, headers: { 'Content-Type': 'text/html' } }
                            );
                        });
                    }
                    
                    // For CSS/JS, return empty/minimal response
                    const contentType = request.destination === 'style' ? 'text/css' : 'text/javascript';
                    return new Response(
                        request.destination === 'style' ? '/* Offline */' : '/* Offline */',
                        { status: 503, headers: { 'Content-Type': contentType } }
                    );
                });
            })
    );
});

// Message handling for cache updates
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
