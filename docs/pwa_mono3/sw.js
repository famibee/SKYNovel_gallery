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
  "precache-manifest.3d8f159ebabe66cb5f86dceb73c0e303.js"
);

workbox.core.setCacheNameDetails({prefix: "SKYNovel Simple Novel3"});

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "index.html",
    "revision": "77b28fa09037cbc57fb9f4244f1daee2"
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
    "revision": "c4f75dd7fa05d6c793e584010b68a0a5"
  },
  {
    "url": "icons/icon-72x72.png",
    "revision": "c8632baa0fc93f17462152972f696a67"
  },
  {
    "url": "icons/icon-96x96.png",
    "revision": "391cf70eb021e2750d9a71f4464ae725"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {
  "directoryIndex": "/"
});
