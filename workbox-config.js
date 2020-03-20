module.exports = {
  globDirectory: 'dist/client/',
  globPatterns: ['**/*.{html,ico,js,jpg,gif,css}'],
  // ignore workbox local files
  globIgnores: ['workbox-v4.3.1/*.js'],
  // content hash files with long cache control never need cache bust
  dontCacheBustURLsMatching: /\.\w{8}\./,
  // source
  swSrc: 'public/service-worker.js',
  swDest: 'dist/client/service-worker.js',
};
