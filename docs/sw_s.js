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
  "precache-manifest.469a9e1ce50c24aa2caa9832f9e032eb.js"
);

workbox.core.setCacheNameDetails({prefix: "SKYNovel Simple Novel"});

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "favicon.ico",
    "revision": "c7b782e839f80f9deaa52ab984e1d482"
  },
  {
    "url": "og_snapshot.jpg",
    "revision": "3695a21055135d8e760e0cb225ef8a18"
  },
  {
    "url": "pwa_mono/icons/icon-128x128.png",
    "revision": "5d9d28d5c16e41cc1afbf9b6213611c1"
  },
  {
    "url": "pwa_mono/icons/icon-144x144.png",
    "revision": "07cd0590ecf1d85360aaf5d32d7fed4e"
  },
  {
    "url": "pwa_mono/icons/icon-152x152.png",
    "revision": "26ed8229ed051d06c6c56f3104a9b126"
  },
  {
    "url": "pwa_mono/icons/icon-192x192.png",
    "revision": "c2b3eada9fab63dabd35bbdb07bfaf85"
  },
  {
    "url": "pwa_mono/icons/icon-384x384.png",
    "revision": "ecb0daceb5eaf233910a4b781ad44637"
  },
  {
    "url": "pwa_mono/icons/icon-512x512.png",
    "revision": "c4f75dd7fa05d6c793e584010b68a0a5"
  },
  {
    "url": "pwa_mono/icons/icon-72x72.png",
    "revision": "c8632baa0fc93f17462152972f696a67"
  },
  {
    "url": "pwa_mono/icons/icon-96x96.png",
    "revision": "391cf70eb021e2750d9a71f4464ae725"
  },
  {
    "url": "pwa_mono/index.html",
    "revision": "acce8c370216a3a1b2f42e2e90f8bf25"
  },
  {
    "url": "pwa_mono/manifest.json",
    "revision": "dff8710a38c16440c4b10f774f1f4cb5"
  },
  {
    "url": "pwa_mono/prj/mat/breakline.5x20.png",
    "revision": "d7d5b944f0457365350b1013748ca6b4"
  },
  {
    "url": "pwa_mono/prj/mat/breakline.json",
    "revision": "5b1dcdb0461a4d7630fddd01c53ab9b1"
  },
  {
    "url": "pwa_mono/prj/mat/breakpage_b.png",
    "revision": "fde3c72b5cc2287080c1a848bc2a8090"
  },
  {
    "url": "pwa_mono/prj/mat/breakpage.json",
    "revision": "013f649551a80cfc0d97ce5139d495a1"
  },
  {
    "url": "pwa_mono/prj/mat/ele1.png",
    "revision": "62d3a16d544858e0566255f833096a2e"
  },
  {
    "url": "pwa_mono/prj/mat/ext_fg.sn",
    "revision": "d5f3083ec713442b13e29c87567faa60"
  },
  {
    "url": "pwa_mono/prj/mat/free29.mp3",
    "revision": "311c4bbe5178882f757f949fd465ac9e"
  },
  {
    "url": "pwa_mono/prj/mat/Lemon.jpg",
    "revision": "560521fc5740bb6c66152e56c1c1ac5a"
  },
  {
    "url": "pwa_mono/prj/mat/log.html",
    "revision": "8478a7c78335c946ad357c5da9527590"
  },
  {
    "url": "pwa_mono/prj/mat/ma.png",
    "revision": "a215b80d25f1923ec911794e2ece156c"
  },
  {
    "url": "pwa_mono/prj/mat/main.sn",
    "revision": "c6139a2127de94e89b053e150a25e8e0"
  },
  {
    "url": "pwa_mono/prj/mat/yun_1657.jpg",
    "revision": "07eee53b6bea8751abe02d8b11f4f714"
  },
  {
    "url": "pwa_mono/prj/mat/yun_5744.jpg",
    "revision": "3165ee36ce6ca0c25ae76e6d643da497"
  },
  {
    "url": "pwa_mono/prj/path.json",
    "revision": "3f41a726d8a9967962278f0fa5c62d5a"
  },
  {
    "url": "pwa_mono/prj/prj.json",
    "revision": "a4852ccefde5fc4d6b6db6ed67796721"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {
  "directoryIndex": "/"
});