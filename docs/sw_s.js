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
  "precache-manifest.9770ae9943621bef36ddc58c2e5913c0.js"
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
    "url": "index_sn.html",
    "revision": "5df9675accb5c4aa4ca39b61dfb5dbb7"
  },
  {
    "url": "icons/icon-128x128.png",
    "revision": "5d9d28d5c16e41cc1afbf9b6213611c1"
  },
  {
    "url": "icons/icon-144x144.png",
    "revision": "07cd0590ecf1d85360aaf5d32d7fed4e"
  },
  {
    "url": "icons/icon-152x152.png",
    "revision": "26ed8229ed051d06c6c56f3104a9b126"
  },
  {
    "url": "icons/icon-192x192.png",
    "revision": "c2b3eada9fab63dabd35bbdb07bfaf85"
  },
  {
    "url": "icons/icon-384x384.png",
    "revision": "ecb0daceb5eaf233910a4b781ad44637"
  },
  {
    "url": "icons/icon-512x512.png",
    "revision": "b20c3c3817ce76abc82680103fbb4bc2"
  },
  {
    "url": "icons/icon-72x72.png",
    "revision": "c8632baa0fc93f17462152972f696a67"
  },
  {
    "url": "icons/icon-96x96.png",
    "revision": "391cf70eb021e2750d9a71f4464ae725"
  },
  {
    "url": "prj/simple_novel/mat/breakline.5x20.png",
    "revision": "d7d5b944f0457365350b1013748ca6b4"
  },
  {
    "url": "prj/simple_novel/mat/breakline.json",
    "revision": "5b1dcdb0461a4d7630fddd01c53ab9b1"
  },
  {
    "url": "prj/simple_novel/mat/breakpage_b.png",
    "revision": "fde3c72b5cc2287080c1a848bc2a8090"
  },
  {
    "url": "prj/simple_novel/mat/breakpage.json",
    "revision": "013f649551a80cfc0d97ce5139d495a1"
  },
  {
    "url": "prj/simple_novel/mat/ele1.png",
    "revision": "62d3a16d544858e0566255f833096a2e"
  },
  {
    "url": "prj/simple_novel/mat/ext_fg.sn",
    "revision": "d5f3083ec713442b13e29c87567faa60"
  },
  {
    "url": "prj/simple_novel/mat/free29.mp3",
    "revision": "311c4bbe5178882f757f949fd465ac9e"
  },
  {
    "url": "prj/simple_novel/mat/Lemon.jpg",
    "revision": "560521fc5740bb6c66152e56c1c1ac5a"
  },
  {
    "url": "prj/simple_novel/mat/log.html",
    "revision": "8478a7c78335c946ad357c5da9527590"
  },
  {
    "url": "prj/simple_novel/mat/ma.png",
    "revision": "a215b80d25f1923ec911794e2ece156c"
  },
  {
    "url": "prj/simple_novel/mat/main.sn",
    "revision": "c6139a2127de94e89b053e150a25e8e0"
  },
  {
    "url": "prj/simple_novel/mat/yun_1657.jpg",
    "revision": "07eee53b6bea8751abe02d8b11f4f714"
  },
  {
    "url": "prj/simple_novel/mat/yun_5744.jpg",
    "revision": "3165ee36ce6ca0c25ae76e6d643da497"
  },
  {
    "url": "prj/simple_novel/path.json",
    "revision": "3f41a726d8a9967962278f0fa5c62d5a"
  },
  {
    "url": "prj/simple_novel/prj.json",
    "revision": "a4852ccefde5fc4d6b6db6ed67796721"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {
  "directoryIndex": "/"
});
