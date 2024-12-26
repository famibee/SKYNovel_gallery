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
    "revision": "22fb34225aed593f5f263be1176aea6b"
  }, {
    "url": "web.skynovel_dist_EventMng_js.js",
    "revision": "360bae302ca9016f8321ea2590a69d40"
  }, {
    "url": "web.skynovel_dist_LayerMng_js.js",
    "revision": "869f83d6159b4bcce0763334695d8622"
  }, {
    "url": "web.skynovel_dist_PropParser_js.js",
    "revision": "38899c0a209111a6c45e4e7a5546ee48"
  }, {
    "url": "web.skynovel_dist_ReadState_js.js",
    "revision": "83463ec4072dcda2d363c2ec890b8f1f"
  }, {
    "url": "web.skynovel_dist_ScriptIterator_js.js",
    "revision": "253322556324b5c4a4eab25135250c01"
  }, {
    "url": "web.skynovel_dist_SoundMng_js.js",
    "revision": "f7832432f2366ed44f75dac51439efb7"
  }, {
    "url": "web.skynovel_dist_Variable_js.js",
    "revision": "48ef7da697519c04e5e19348b0236c26"
  }, {
    "url": "web.skynovel_dist_gamepad_js.js",
    "revision": "aa8a3cdaebd5998cac50453d0a3fdccb"
  }, {
    "url": "web.three.js",
    "revision": "e76ca7f34f0e8c9570e5508c3d921521"
  }, {
    "url": "web.vendor.js",
    "revision": "85a9ce5b214e2d75ed2f366a6144c27d"
  }], {
    "directoryIndex": "/"
  });

}));
