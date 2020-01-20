/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts(
  "precache-manifest.beb173946c6e6ccb062a43c84d879ba7.js"
);

workbox.core.setCacheNameDetails({prefix: "SKYNovel Gallery"});

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "index_ap.html",
    "revision": "a6f79b51ee847a401532db7362fe11a0"
  },
  {
    "url": "index_aptst.html",
    "revision": "3f90bb81ac78825b257b3724e184936e"
  },
  {
    "url": "index_menu.html",
    "revision": "66531e32e642078290bfbd666631712f"
  },
  {
    "url": "index.html",
    "revision": "5a8391af57495a9a22fac8e87a0d3517"
  },
  {
    "url": "web_cache/all.min.css",
    "revision": "500d1a92f875b1d96d37a3a3f8f0438c"
  },
  {
    "url": "web_cache/bootstrap.min.css",
    "revision": "7cc40c199d128af6b01e74a28c5900b0"
  },
  {
    "url": "web_cache/bootstrap.min.js",
    "revision": "61f338f870fcd0ff46362ef109d28533"
  },
  {
    "url": "web_cache/jquery-3.4.1.slim.min.js",
    "revision": "d9b11ca4d877c327889805b73bb79edd"
  },
  {
    "url": "webfonts/fa-brands-400.ttf",
    "revision": "273dc9bf9778fd37fa61357645d46a28"
  },
  {
    "url": "webfonts/fa-brands-400.woff",
    "revision": "f4920c94c0861c537f72ba36590f6362"
  },
  {
    "url": "webfonts/fa-brands-400.woff2",
    "revision": "822d94f19fe57477865209e1242a3c63"
  },
  {
    "url": "webfonts/fa-regular-400.woff",
    "revision": "a57bcf76c178aee452db7a57b75509b6"
  },
  {
    "url": "webfonts/fa-regular-400.woff2",
    "revision": "9efb86976bd53e159166c12365f61e25"
  },
  {
    "url": "webfonts/fa-solid-900.woff",
    "revision": "93f284548b42ab76fe3fd03a9d3a2180"
  },
  {
    "url": "webfonts/fa-solid-900.woff2",
    "revision": "f6121be597a72928f54e7ab5b95512a1"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {
  "directoryIndex": "/"
});
