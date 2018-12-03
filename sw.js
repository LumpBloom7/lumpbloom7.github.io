var cacheName = 'lumpbloom7-blog';
var cacheFiles = [
  "/assets/img/currentAvatar.png",
  "/assets/css/style.css",
  "/index.html",
  "/404.html",
  "/offline.html"]

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(cacheName).then(function(cache) {
      return cache.match(event.request).then(function(response) {
        var fetchPromise = fetch(event.request).then(function(networkResponse) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        })
        return response || fetchPromise;
      })
    })
  );
});