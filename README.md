# reactjs

![Build Status](https://img.shields.io/travis/coco-template/reactjs/master.svg?style=flat)
[![Coverage Status](https://coveralls.io/repos/github/coco-template/reactjs/badge.svg?branch=master)](https://coveralls.io/github/coco-template/reactjs?branch=master)
![David](https://img.shields.io/david/coco-template/reactjs.svg)
![David](https://img.shields.io/david/dev/coco-template/reactjs.svg)
[![Greenkeeper badge](https://badges.greenkeeper.io/coco-template/reactjs.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io//test/github/coco-template/reactjs/badge.svg?targetFile=package.json)](https://snyk.io//test/github/coco-template/reactjs?targetFile=package.json)

create react web application.

## Usage

```shell
# HMR server
npm run dev;

# unit test
npm run test;

# production compile
npm run build;
```

## Attention

### For lower version Android, IOS compatibility, add polyfill in `index.html`:

```html
<script
  crossorigin="anonymous"
  integrity="sha384-Nh3J/XXlxyM3rjLEs3jwkHg5DP/zDvV7p86vEhCCFnYlYrlY7mGzUxRKm+oProPB"
  src="https://lib.baomitu.com/babel-polyfill/7.4.4/polyfill.min.js"
></script>
```

## Sentry

weird hack to install `@sentry/cli` only within CI:

```json
{
  "presentry:setup": "mv yarn.lock yarn.lock.alias; mv package.json package.json.alias",
  "sentry:setup": "yarn add @sentry/cli --ignore-engines",
  "postsentry:setup": "mv yarn.lock.alias yarn.lock; mv package.json.alias package.json"
}
```

ensure release exist，upload artifacts:

```json
{
  "sentry:new": "sentry-cli releases new $npm_package_version",
  "sentry:sourcemaps": "sentry-cli releases files $npm_package_version upload-sourcemaps dist/client/static/script --url-prefix '~/27fc6300/static/script' --validate --no-rewrite"
}
```

after production ready, mark sentry release finalized:

```json
{
  "sentry:publish": "sentry-cli releases finalize $npm_package_version"
}
```

## Workbox

setup service worker with workbox, a few modification needed when webpack output directory, or deploy directory(root directory by default) changed.

+ `workbox-config.js` - `globDirectory`, `swDest` should match output directory
+ `package.json` - script `workbox:copy` should match output directory
+ `main.tsx` - service worker path should match deploy directory
+ `service-worker.js` - import script `workbox` lib, navigation route should match deploy directory

## Contact

hjj491229492@hotmail.com

## License

MIT
