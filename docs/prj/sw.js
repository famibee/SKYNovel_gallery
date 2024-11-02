/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-7707f474'], (function (workbox) { 'use strict';

  workbox.setCacheNameDetails({
    prefix: "SKYNovel Gallery"
  });
  self.skipWaiting();
  workbox.clientsClaim();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "web.main.js",
    "revision": "c0d1a44dfb39739b65c93ccc50de38f5"
  }, {
    "url": "web.skynovel.js",
    "revision": "cb336056c3580592919114676424a7aa"
  }, {
    "url": "web.three.js",
    "revision": "e76ca7f34f0e8c9570e5508c3d921521"
  }, {
    "url": "web.vendor.js",
    "revision": "3f376068888fb20293cb914d46cf5912"
  }, {
    "url": "web.vendors-node_modules_famibee_skynovel_dist_SoundMng_js.js",
    "revision": "1bfc0628157dccc80ec9ce6eaf8cec33"
  }, {
    "url": "web.vendors-node_modules_famibee_skynovel_dist_gamepad_js.js",
    "revision": "dd5543b82644af1ab7f1393e63bf3ce7"
  }], {
    "directoryIndex": "/"
  });

}));
