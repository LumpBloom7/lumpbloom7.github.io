---
---
var cacheName = 'lumpbloom7-page';
var cacheFiles = [
  "{{site.baseurl}}/assets/img/currentAvatar.png",
  "{{site.baseurl}}/assets/css/style.css",
  "{{site.baseurl}}/index.html",
  "{{site.baseurl}}/404.html",
  "{{site.baseurl}}/offline.html"
]
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(cacheFiles);
    })
  );
});
self.addEventListener('fetch', function(event) {
  event.respondWith(
    // Try the cache
    caches.open(cacheName).then(function(cache) {
      return cache.match(event.request).then(function(response) {
        var fetchPromise = fetch(event.request).then(function(networkResponse) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        })
        return response || fetchPromise;
      }).catch(function() {
        // If both fail, show a generic fallback:
        return caches.match('/offline.html');
      })
    })
  );
});