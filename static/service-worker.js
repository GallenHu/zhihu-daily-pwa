var cacheName = 'zhihu-daily-pwa';
var dataCacheName = 'articleData-v1';
var filesToCache = [ // prod
  // './',
  '../index.html',
  './fiexible.js',
  './css/app.73e223feb2c96c343912795de0bca320.css',
  './css/app.73e223feb2c96c343912795de0bca320.css.map',
  './img/logo.ff40a13.png',
  './js/app.3c63f24344f9426a4fe4.js',
  './js/app.3c63f24344f9426a4fe4.js.map',
  './js/manifest.e370f10f2255b3022cb9.js',
  './js/manifest.e370f10f2255b3022cb9.js.map',
  './js/vendor.60bd9e52f7d6c2bfecc2.js',
  './js/vendor.60bd9e52f7d6c2bfecc2.js.map'
];
// var filesToCache = [ // dev
//   '/',
//   '/index.html',
//   '/app.js',
//   '/static/fiexible.js',
// ];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');

  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');

  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName || key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );

  /**
   * https://codelabs.developers.google.com/codelabs/your-first-pwapp/#5
   *
   * When the app is complete,
   * self.clients.claim() fixes a corner case in which the app wasn't returning the latest data.
   * You can reproduce the corner case by commenting out the line below and then doing the following steps:
   * 1) load app for first time so that the initial New York City data is shown
   * 2) press the refresh button on the app
   * 3) go offline
   * 4) reload the app.
   * You expect to see the newer NYC data, but you actually see the initial data.
   * This happens because the service worker is not yet activated.
   * self.clients.claim() essentially lets you activate the service worker faster.
   */
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);

  var dataUrl = 'https://zhihu-daily.leanapp.cn/api/';

  if (e.request.url.indexOf(dataUrl) > -1) {
    e.respondWith(
      caches.open(dataCacheName).then(function (cache) {
        return fetch(e.request).then(function (response) {
          cache.put(e.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(function (response) {
        return response || fetch(e.request);
      })
    );
  }
});
