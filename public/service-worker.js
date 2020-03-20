/**
 * @description - workbox progressive
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

/* global workbox */
/* eslint-env worker */

// import local scripts
importScripts('/workbox-v4.3.1/workbox-sw.js');

// dynamic import configuration
workbox.setConfig({
  modulePathPrefix: '/workbox-v4.3.1',
});

// cache detail configuration
workbox.core.setCacheNameDetails({
  prefix: 'reactjs',
});

// logical
workbox.precaching.precacheAndRoute([]);

// handle CDN resource
workbox.routing.registerRoute(
  /^https:\/\/lib\.baomitu\.com/,
  new workbox.strategies.CacheFirst({
    cacheName: 'baomitu',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [200],
      }),
      new workbox.expiration.Plugin({
        maxEntries: 30,
      }),
    ],
  })
);

// handle navigation app-shell
workbox.routing.registerNavigationRoute(
  workbox.precaching.getCacheKeyForURL('/index.html'),
  {
    blacklist: [/static/],
  }
);
