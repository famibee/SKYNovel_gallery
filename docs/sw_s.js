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
  "precache-manifest.94bd993ecd18ca0f7a47e492f3ae66da.js"
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
    "url": "index_sn.html",
    "revision": "25b0d8940f6725e284e66f1a7850f0d2"
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
    "url": "prj/simple_novel/mat/akir_015.mp3",
    "revision": "c4834a563fcd13e33c5025a28b19a5ca"
  },
  {
    "url": "prj/simple_novel/mat/akir_016.mp3",
    "revision": "3ca9532abf80e459d2defe0f78b644c7"
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
    "url": "prj/simple_novel/mat/log.html",
    "revision": "8478a7c78335c946ad357c5da9527590"
  },
  {
    "url": "prj/simple_novel/mat/main.sn",
    "revision": "329f1541820ada45f89426160165b661"
  },
  {
    "url": "prj/simple_novel/mat/nori_008.mp3",
    "revision": "fdfeac6f7aa07508e247c252e468e1a8"
  },
  {
    "url": "prj/simple_novel/mat/nori_009.mp3",
    "revision": "d6fd85c08aa38ff69dc8f56be276574f"
  },
  {
    "url": "prj/simple_novel/mat/nori_010.mp3",
    "revision": "b03496e3fecf1df0562d8716894e8413"
  },
  {
    "url": "prj/simple_novel/mat/SourceHanSansJP-Normal.otf",
    "revision": "1b429b31af800d6c28c10c871460fe3a"
  },
  {
    "url": "prj/simple_novel/path.json",
    "revision": "3ecd5dfe827ef04ea7256416f959a5f7"
  },
  {
    "url": "prj/simple_novel/prj.json",
    "revision": "a4852ccefde5fc4d6b6db6ed67796721"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {
  "directoryIndex": "/"
});
