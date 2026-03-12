const CACHE_NAME = 'wakasafe-v1'
const URLS_TO_CACHE = [
  '/',
  '/dashboard',
  '/auth/onboarding',
  '/profile',
  '/settings',
  '/offline.html',
]

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE).catch(() => {
        // Gracefully handle missing files
        return cache.addAll(URLS_TO_CACHE.filter((url) => url !== '/offline.html'))
      })
    })
  )
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Fetch event - cache first, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return
  }

  // Skip API calls - network first for real-time data
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache API responses
          if (response.ok) {
            const clone = response.clone()
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, clone)
            })
          }
          return response
        })
        .catch(() => {
          // Fallback to cache for offline
          return caches.match(event.request)
        })
    )
    return
  }

  // For all other requests - cache first
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version if available
      if (response) {
        return response
      }

      return fetch(event.request)
        .then((response) => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type === 'basic') {
            return response
          }

          const responseToCache = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache)
          })

          return response
        })
        .catch(() => {
          // Offline fallback
          if (event.request.destination === 'document') {
            return caches.match('/offline.html')
          }
        })
    })
  )
})

// Background sync for emergency alerts (if supported)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-sos-alert') {
    event.waitUntil(
      fetch('/api/sos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
    )
  }
})

// Push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New incident reported nearby',
    icon: '/icon-192x192.png',
    badge: '/icon-192x192.png',
    tag: 'incident-alert',
    requireInteraction: false,
  }

  event.waitUntil(self.registration.showNotification('WAKASAFE Alert', options))
})

// Notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus()
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/dashboard')
      }
    })
  )
})
