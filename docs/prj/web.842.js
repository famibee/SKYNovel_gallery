"use strict";(self.webpackChunkgallery=self.webpackChunkgallery||[]).push([[842],{7842:(t,e,n)=>{n.r(e),n.d(e,{EventMng:()=>vt});var i=n(4449),r=n(2717),o=n(3653);class s{#t=[];#e=-1;#n=new i.E;destroy(){this.#t=[],this.#e=-1,this.#n.clear()}add(t,e,n){if(this.#t.findIndex((e=>e.btn===t))>=0)return;if(t instanceof i.j)return t.on("pointerdown",(()=>{for(let e=this.#t.length-1;e>=0;--e)if(this.#t[e].btn===t)return void(this.#e=e);this.#e=-1})),void this.#t.push({btn:t,on:e,off:n});this.#n.add(t,"focus",(()=>{for(let e=this.#t.length-1;e>=0;--e)if(this.#t[e].btn===t)return void(this.#e=e);this.#e=-1}));let r=t=>{},o="button"===t.localName||"a"===t.localName?t=>!t.isTrusted&&"Enter"===t.key:t=>"Enter"===t.key;const s=t;switch(s.type??""){case"checkbox":r=()=>s.checked=!s.checked;break;case"":t.querySelectorAll("input[type]").length>0&&(r=e=>this.#i(t,e.key),o=()=>!1);break;case"range":r=t=>{t.isTrusted||("ArrowUp"===t.key?s.stepUp():s.stepDown())};break;case"text":case"textarea":r=t=>{if(t.isTrusted)return;let e=(s.selectionStart??0)+("ArrowUp"===t.key?-1:1);e<0&&(e=0),s.setSelectionRange(e,e)}}this.#n.add(t,"keydown",(e=>{if("ArrowUp"===e.key||"ArrowDown"===e.key||"Enter"===e.key){if(e.stopPropagation(),e.stopImmediatePropagation(),o(e))return void t.dispatchEvent(new MouseEvent("click"));r(e)}}),{passive:!0}),t.hasAttribute("tabindex")||(t.tabIndex=0),this.#t.push({btn:t,on:e,off:n})}remove(t){const e=this.#t.findIndex((e=>e.btn===t));e<0||(this.#t.splice(e,1),0===this.#t.length?this.#e=-1:e<=this.#e&&--this.#e)}#i(t,e){const n=t.querySelectorAll("input[type]"),i=n.length;for(let t=0;t<i;++t)if(n[t].checked){n[(t+i+("ArrowUp"===e?-1:1))%i].checked=!0;break}}isFocus(t){return!(this.#e<0)&&this.#t[this.#e].btn===t}prev(){this.#r();const t=this.#t.length;if(0!==t){--this.#e<0&&(this.#e=t-1);for(let e=t;e>=1;--e){const n=(this.#e+e)%t;if(this.#t[n].on())return this.#e=n,void this.#o(n)}this.#e=-1}}next(){this.#r();const t=this.#t.length;if(0!==t){++this.#e>=t&&(this.#e=0);for(let e=0;e<t;++e){const n=(this.#e+e)%t;if(this.#t[n].on())return this.#e=n,void this.#o(n)}this.#e=-1}}#o=i.C.debugLog?t=>console.log(`👾 <FocusMng idx:${t} btn:%o`,this.#t[t].btn):()=>{};getFocus(){if(this.#e<0)return null;this.#r(),this.#e>=this.#t.length&&(this.#e=0);const t=this.#t[this.#e];return t.on()?t.btn:null}blur(){this.#r(),this.#e=-1,globalThis.focus()}#r(){for(let t=this.#t.length-1;t>=0;--t){const e=this.#t[t];e.btn instanceof i.j&&!e.btn.parent?this.#t.splice(t,1):e.off()}}}var a="top",c="bottom",f="right",l="left",p="auto",d=[a,c,f,l],h="start",u="end",m="viewport",g="popper",v=d.reduce((function(t,e){return t.concat([e+"-"+h,e+"-"+u])}),[]),y=[].concat(d,[p]).reduce((function(t,e){return t.concat([e,e+"-"+h,e+"-"+u])}),[]),b=["beforeRead","read","afterRead","beforeMain","main","afterMain","beforeWrite","write","afterWrite"];function w(t){return t?(t.nodeName||"").toLowerCase():null}function x(t){if(null==t)return window;if("[object Window]"!==t.toString()){var e=t.ownerDocument;return e&&e.defaultView||window}return t}function k(t){return t instanceof x(t).Element||t instanceof Element}function O(t){return t instanceof x(t).HTMLElement||t instanceof HTMLElement}function E(t){return!(typeof ShadowRoot>"u")&&(t instanceof x(t).ShadowRoot||t instanceof ShadowRoot)}const _={name:"applyStyles",enabled:!0,phase:"write",fn:function(t){var e=t.state;Object.keys(e.elements).forEach((function(t){var n=e.styles[t]||{},i=e.attributes[t]||{},r=e.elements[t];!O(r)||!w(r)||(Object.assign(r.style,n),Object.keys(i).forEach((function(t){var e=i[t];!1===e?r.removeAttribute(t):r.setAttribute(t,!0===e?"":e)})))}))},effect:function(t){var e=t.state,n={popper:{position:e.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(e.elements.popper.style,n.popper),e.styles=n,e.elements.arrow&&Object.assign(e.elements.arrow.style,n.arrow),function(){Object.keys(e.elements).forEach((function(t){var i=e.elements[t],r=e.attributes[t]||{},o=Object.keys(e.styles.hasOwnProperty(t)?e.styles[t]:n[t]).reduce((function(t,e){return t[e]="",t}),{});!O(i)||!w(i)||(Object.assign(i.style,o),Object.keys(r).forEach((function(t){i.removeAttribute(t)})))}))}},requires:["computeStyles"]};function D(t){return t.split("-")[0]}var j=Math.max,A=Math.min,L=Math.round;function M(){var t=navigator.userAgentData;return null!=t&&t.brands&&Array.isArray(t.brands)?t.brands.map((function(t){return t.brand+"/"+t.version})).join(" "):navigator.userAgent}function S(){return!/^((?!chrome|android).)*safari/i.test(M())}function T(t,e,n){void 0===e&&(e=!1),void 0===n&&(n=!1);var i=t.getBoundingClientRect(),r=1,o=1;e&&O(t)&&(r=t.offsetWidth>0&&L(i.width)/t.offsetWidth||1,o=t.offsetHeight>0&&L(i.height)/t.offsetHeight||1);var s=(k(t)?x(t):window).visualViewport,a=!S()&&n,c=(i.left+(a&&s?s.offsetLeft:0))/r,f=(i.top+(a&&s?s.offsetTop:0))/o,l=i.width/r,p=i.height/o;return{width:l,height:p,top:f,right:c+l,bottom:f+p,left:c,x:c,y:f}}function C(t){var e=T(t),n=t.offsetWidth,i=t.offsetHeight;return Math.abs(e.width-n)<=1&&(n=e.width),Math.abs(e.height-i)<=1&&(i=e.height),{x:t.offsetLeft,y:t.offsetTop,width:n,height:i}}function R(t,e){var n=e.getRootNode&&e.getRootNode();if(t.contains(e))return!0;if(n&&E(n)){var i=e;do{if(i&&t.isSameNode(i))return!0;i=i.parentNode||i.host}while(i)}return!1}function B(t){return x(t).getComputedStyle(t)}function H(t){return["table","td","th"].indexOf(w(t))>=0}function P(t){return((k(t)?t.ownerDocument:t.document)||window.document).documentElement}function W(t){return"html"===w(t)?t:t.assignedSlot||t.parentNode||(E(t)?t.host:null)||P(t)}function F(t){return O(t)&&"fixed"!==B(t).position?t.offsetParent:null}function N(t){for(var e=x(t),n=F(t);n&&H(n)&&"static"===B(n).position;)n=F(n);return n&&("html"===w(n)||"body"===w(n)&&"static"===B(n).position)?e:n||function(t){var e=/firefox/i.test(M());if(/Trident/i.test(M())&&O(t)&&"fixed"===B(t).position)return null;var n=W(t);for(E(n)&&(n=n.host);O(n)&&["html","body"].indexOf(w(n))<0;){var i=B(n);if("none"!==i.transform||"none"!==i.perspective||"paint"===i.contain||-1!==["transform","perspective"].indexOf(i.willChange)||e&&"filter"===i.willChange||e&&i.filter&&"none"!==i.filter)return n;n=n.parentNode}return null}(t)||e}function q(t){return["top","bottom"].indexOf(t)>=0?"x":"y"}function I(t,e,n){return j(t,A(e,n))}function V(t){return Object.assign({},{top:0,right:0,bottom:0,left:0},t)}function U(t,e){return e.reduce((function(e,n){return e[n]=t,e}),{})}function $(t){return t.split("-")[1]}var K={top:"auto",right:"auto",bottom:"auto",left:"auto"};function Y(t){var e,n=t.popper,i=t.popperRect,r=t.placement,o=t.variation,s=t.offsets,p=t.position,d=t.gpuAcceleration,h=t.adaptive,m=t.roundOffsets,g=t.isFixed,v=s.x,y=void 0===v?0:v,b=s.y,w=void 0===b?0:b,k="function"==typeof m?m({x:y,y:w}):{x:y,y:w};y=k.x,w=k.y;var O=s.hasOwnProperty("x"),E=s.hasOwnProperty("y"),_=l,D=a,j=window;if(h){var A=N(n),M="clientHeight",S="clientWidth";A===x(n)&&"static"!==B(A=P(n)).position&&"absolute"===p&&(M="scrollHeight",S="scrollWidth"),(r===a||(r===l||r===f)&&o===u)&&(D=c,w-=(g&&A===j&&j.visualViewport?j.visualViewport.height:A[M])-i.height,w*=d?1:-1),r!==l&&(r!==a&&r!==c||o!==u)||(_=f,y-=(g&&A===j&&j.visualViewport?j.visualViewport.width:A[S])-i.width,y*=d?1:-1)}var T,C=Object.assign({position:p},h&&K),R=!0===m?function(t,e){var n=t.x,i=t.y,r=e.devicePixelRatio||1;return{x:L(n*r)/r||0,y:L(i*r)/r||0}}({x:y,y:w},x(n)):{x:y,y:w};return y=R.x,w=R.y,d?Object.assign({},C,((T={})[D]=E?"0":"",T[_]=O?"0":"",T.transform=(j.devicePixelRatio||1)<=1?"translate("+y+"px, "+w+"px)":"translate3d("+y+"px, "+w+"px, 0)",T)):Object.assign({},C,((e={})[D]=E?w+"px":"",e[_]=O?y+"px":"",e.transform="",e))}var z={passive:!0},J={left:"right",right:"left",bottom:"top",top:"bottom"};function G(t){return t.replace(/left|right|bottom|top/g,(function(t){return J[t]}))}var X={start:"end",end:"start"};function Z(t){return t.replace(/start|end/g,(function(t){return X[t]}))}function Q(t){var e=x(t);return{scrollLeft:e.pageXOffset,scrollTop:e.pageYOffset}}function tt(t){return T(P(t)).left+Q(t).scrollLeft}function et(t){var e=B(t),n=e.overflow,i=e.overflowX,r=e.overflowY;return/auto|scroll|overlay|hidden/.test(n+r+i)}function nt(t){return["html","body","#document"].indexOf(w(t))>=0?t.ownerDocument.body:O(t)&&et(t)?t:nt(W(t))}function it(t,e){var n;void 0===e&&(e=[]);var i=nt(t),r=i===(null==(n=t.ownerDocument)?void 0:n.body),o=x(i),s=r?[o].concat(o.visualViewport||[],et(i)?i:[]):i,a=e.concat(s);return r?a:a.concat(it(W(s)))}function rt(t){return Object.assign({},t,{left:t.x,top:t.y,right:t.x+t.width,bottom:t.y+t.height})}function ot(t,e,n){return e===m?rt(function(t,e){var n=x(t),i=P(t),r=n.visualViewport,o=i.clientWidth,s=i.clientHeight,a=0,c=0;if(r){o=r.width,s=r.height;var f=S();(f||!f&&"fixed"===e)&&(a=r.offsetLeft,c=r.offsetTop)}return{width:o,height:s,x:a+tt(t),y:c}}(t,n)):k(e)?function(t,e){var n=T(t,!1,"fixed"===e);return n.top=n.top+t.clientTop,n.left=n.left+t.clientLeft,n.bottom=n.top+t.clientHeight,n.right=n.left+t.clientWidth,n.width=t.clientWidth,n.height=t.clientHeight,n.x=n.left,n.y=n.top,n}(e,n):rt(function(t){var e,n=P(t),i=Q(t),r=null==(e=t.ownerDocument)?void 0:e.body,o=j(n.scrollWidth,n.clientWidth,r?r.scrollWidth:0,r?r.clientWidth:0),s=j(n.scrollHeight,n.clientHeight,r?r.scrollHeight:0,r?r.clientHeight:0),a=-i.scrollLeft+tt(t),c=-i.scrollTop;return"rtl"===B(r||n).direction&&(a+=j(n.clientWidth,r?r.clientWidth:0)-o),{width:o,height:s,x:a,y:c}}(P(t)))}function st(t){var e,n=t.reference,i=t.element,r=t.placement,o=r?D(r):null,s=r?$(r):null,p=n.x+n.width/2-i.width/2,d=n.y+n.height/2-i.height/2;switch(o){case a:e={x:p,y:n.y-i.height};break;case c:e={x:p,y:n.y+n.height};break;case f:e={x:n.x+n.width,y:d};break;case l:e={x:n.x-i.width,y:d};break;default:e={x:n.x,y:n.y}}var m=o?q(o):null;if(null!=m){var g="y"===m?"height":"width";switch(s){case h:e[m]=e[m]-(n[g]/2-i[g]/2);break;case u:e[m]=e[m]+(n[g]/2-i[g]/2)}}return e}function at(t,e){void 0===e&&(e={});var n=e,i=n.placement,r=void 0===i?t.placement:i,o=n.strategy,s=void 0===o?t.strategy:o,l=n.boundary,p=void 0===l?"clippingParents":l,h=n.rootBoundary,u=void 0===h?m:h,v=n.elementContext,y=void 0===v?g:v,b=n.altBoundary,x=void 0!==b&&b,E=n.padding,_=void 0===E?0:E,D=V("number"!=typeof _?_:U(_,d)),L=y===g?"reference":g,M=t.rects.popper,S=t.elements[x?L:y],C=function(t,e,n,i){var r="clippingParents"===e?function(t){var e=it(W(t)),n=["absolute","fixed"].indexOf(B(t).position)>=0&&O(t)?N(t):t;return k(n)?e.filter((function(t){return k(t)&&R(t,n)&&"body"!==w(t)})):[]}(t):[].concat(e),o=[].concat(r,[n]),s=o[0],a=o.reduce((function(e,n){var r=ot(t,n,i);return e.top=j(r.top,e.top),e.right=A(r.right,e.right),e.bottom=A(r.bottom,e.bottom),e.left=j(r.left,e.left),e}),ot(t,s,i));return a.width=a.right-a.left,a.height=a.bottom-a.top,a.x=a.left,a.y=a.top,a}(k(S)?S:S.contextElement||P(t.elements.popper),p,u,s),H=T(t.elements.reference),F=st({reference:H,element:M,strategy:"absolute",placement:r}),q=rt(Object.assign({},M,F)),I=y===g?q:H,$={top:C.top-I.top+D.top,bottom:I.bottom-C.bottom+D.bottom,left:C.left-I.left+D.left,right:I.right-C.right+D.right},K=t.modifiersData.offset;if(y===g&&K){var Y=K[r];Object.keys($).forEach((function(t){var e=[f,c].indexOf(t)>=0?1:-1,n=[a,c].indexOf(t)>=0?"y":"x";$[t]+=Y[n]*e}))}return $}function ct(t,e,n){return void 0===n&&(n={x:0,y:0}),{top:t.top-e.height-n.y,right:t.right-e.width+n.x,bottom:t.bottom-e.height+n.y,left:t.left-e.width-n.x}}function ft(t){return[a,f,c,l].some((function(e){return t[e]>=0}))}function lt(t,e,n){void 0===n&&(n=!1);var i=O(e),r=O(e)&&function(t){var e=t.getBoundingClientRect(),n=L(e.width)/t.offsetWidth||1,i=L(e.height)/t.offsetHeight||1;return 1!==n||1!==i}(e),o=P(e),s=T(t,r,n),a={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(i||!i&&!n)&&(("body"!==w(e)||et(o))&&(a=function(t){return t!==x(t)&&O(t)?function(t){return{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}}(t):Q(t)}(e)),O(e)?((c=T(e,!0)).x+=e.clientLeft,c.y+=e.clientTop):o&&(c.x=tt(o))),{x:s.left+a.scrollLeft-c.x,y:s.top+a.scrollTop-c.y,width:s.width,height:s.height}}function pt(t){var e=new Map,n=new Set,i=[];function r(t){n.add(t.name),[].concat(t.requires||[],t.requiresIfExists||[]).forEach((function(t){if(!n.has(t)){var i=e.get(t);i&&r(i)}})),i.push(t)}return t.forEach((function(t){e.set(t.name,t)})),t.forEach((function(t){n.has(t.name)||r(t)})),i}function dt(t){var e;return function(){return e||(e=new Promise((function(n){Promise.resolve().then((function(){e=void 0,n(t())}))}))),e}}var ht={placement:"bottom",modifiers:[],strategy:"absolute"};function ut(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return!e.some((function(t){return!(t&&"function"==typeof t.getBoundingClientRect)}))}function mt(t){void 0===t&&(t={});var e=t,n=e.defaultModifiers,i=void 0===n?[]:n,r=e.defaultOptions,o=void 0===r?ht:r;return function(t,e,n){void 0===n&&(n=o);var r={placement:"bottom",orderedModifiers:[],options:Object.assign({},ht,o),modifiersData:{},elements:{reference:t,popper:e},attributes:{},styles:{}},s=[],a=!1,c={state:r,setOptions:function(n){var a="function"==typeof n?n(r.options):n;f(),r.options=Object.assign({},o,r.options,a),r.scrollParents={reference:k(t)?it(t):t.contextElement?it(t.contextElement):[],popper:it(e)};var l=function(t){var e=pt(t);return b.reduce((function(t,n){return t.concat(e.filter((function(t){return t.phase===n})))}),[])}(function(t){var e=t.reduce((function(t,e){var n=t[e.name];return t[e.name]=n?Object.assign({},n,e,{options:Object.assign({},n.options,e.options),data:Object.assign({},n.data,e.data)}):e,t}),{});return Object.keys(e).map((function(t){return e[t]}))}([].concat(i,r.options.modifiers)));return r.orderedModifiers=l.filter((function(t){return t.enabled})),r.orderedModifiers.forEach((function(t){var e=t.name,n=t.options,i=void 0===n?{}:n,o=t.effect;if("function"==typeof o){var a=o({state:r,name:e,instance:c,options:i});s.push(a||function(){})}})),c.update()},forceUpdate:function(){if(!a){var t=r.elements,e=t.reference,n=t.popper;if(ut(e,n)){r.rects={reference:lt(e,N(n),"fixed"===r.options.strategy),popper:C(n)},r.reset=!1,r.placement=r.options.placement,r.orderedModifiers.forEach((function(t){return r.modifiersData[t.name]=Object.assign({},t.data)}));for(var i=0;i<r.orderedModifiers.length;i++)if(!0!==r.reset){var o=r.orderedModifiers[i],s=o.fn,f=o.options,l=void 0===f?{}:f,p=o.name;"function"==typeof s&&(r=s({state:r,options:l,name:p,instance:c})||r)}else r.reset=!1,i=-1}}},update:dt((function(){return new Promise((function(t){c.forceUpdate(),t(r)}))})),destroy:function(){f(),a=!0}};if(!ut(t,e))return c;function f(){s.forEach((function(t){return t()})),s=[]}return c.setOptions(n).then((function(t){!a&&n.onFirstUpdate&&n.onFirstUpdate(t)})),c}}var gt=mt({defaultModifiers:[{name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(t){var e=t.state,n=t.instance,i=t.options,r=i.scroll,o=void 0===r||r,s=i.resize,a=void 0===s||s,c=x(e.elements.popper),f=[].concat(e.scrollParents.reference,e.scrollParents.popper);return o&&f.forEach((function(t){t.addEventListener("scroll",n.update,z)})),a&&c.addEventListener("resize",n.update,z),function(){o&&f.forEach((function(t){t.removeEventListener("scroll",n.update,z)})),a&&c.removeEventListener("resize",n.update,z)}},data:{}},{name:"popperOffsets",enabled:!0,phase:"read",fn:function(t){var e=t.state,n=t.name;e.modifiersData[n]=st({reference:e.rects.reference,element:e.rects.popper,strategy:"absolute",placement:e.placement})},data:{}},{name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(t){var e=t.state,n=t.options,i=n.gpuAcceleration,r=void 0===i||i,o=n.adaptive,s=void 0===o||o,a=n.roundOffsets,c=void 0===a||a,f={placement:D(e.placement),variation:$(e.placement),popper:e.elements.popper,popperRect:e.rects.popper,gpuAcceleration:r,isFixed:"fixed"===e.options.strategy};null!=e.modifiersData.popperOffsets&&(e.styles.popper=Object.assign({},e.styles.popper,Y(Object.assign({},f,{offsets:e.modifiersData.popperOffsets,position:e.options.strategy,adaptive:s,roundOffsets:c})))),null!=e.modifiersData.arrow&&(e.styles.arrow=Object.assign({},e.styles.arrow,Y(Object.assign({},f,{offsets:e.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-placement":e.placement})},data:{}},_,{name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(t){var e=t.state,n=t.options,i=t.name,r=n.offset,o=void 0===r?[0,0]:r,s=y.reduce((function(t,n){return t[n]=function(t,e,n){var i=D(t),r=[l,a].indexOf(i)>=0?-1:1,o="function"==typeof n?n(Object.assign({},e,{placement:t})):n,s=o[0],c=o[1];return s=s||0,c=(c||0)*r,[l,f].indexOf(i)>=0?{x:c,y:s}:{x:s,y:c}}(n,e.rects,o),t}),{}),c=s[e.placement],p=c.x,d=c.y;null!=e.modifiersData.popperOffsets&&(e.modifiersData.popperOffsets.x+=p,e.modifiersData.popperOffsets.y+=d),e.modifiersData[i]=s}},{name:"flip",enabled:!0,phase:"main",fn:function(t){var e=t.state,n=t.options,i=t.name;if(!e.modifiersData[i]._skip){for(var r=n.mainAxis,o=void 0===r||r,s=n.altAxis,u=void 0===s||s,m=n.fallbackPlacements,g=n.padding,b=n.boundary,w=n.rootBoundary,x=n.altBoundary,k=n.flipVariations,O=void 0===k||k,E=n.allowedAutoPlacements,_=e.options.placement,j=D(_),A=m||(j!==_&&O?function(t){if(D(t)===p)return[];var e=G(t);return[Z(t),e,Z(e)]}(_):[G(_)]),L=[_].concat(A).reduce((function(t,n){return t.concat(D(n)===p?function(t,e){void 0===e&&(e={});var n=e,i=n.placement,r=n.boundary,o=n.rootBoundary,s=n.padding,a=n.flipVariations,c=n.allowedAutoPlacements,f=void 0===c?y:c,l=$(i),p=l?a?v:v.filter((function(t){return $(t)===l})):d,h=p.filter((function(t){return f.indexOf(t)>=0}));0===h.length&&(h=p);var u=h.reduce((function(e,n){return e[n]=at(t,{placement:n,boundary:r,rootBoundary:o,padding:s})[D(n)],e}),{});return Object.keys(u).sort((function(t,e){return u[t]-u[e]}))}(e,{placement:n,boundary:b,rootBoundary:w,padding:g,flipVariations:O,allowedAutoPlacements:E}):n)}),[]),M=e.rects.reference,S=e.rects.popper,T=new Map,C=!0,R=L[0],B=0;B<L.length;B++){var H=L[B],P=D(H),W=$(H)===h,F=[a,c].indexOf(P)>=0,N=F?"width":"height",q=at(e,{placement:H,boundary:b,rootBoundary:w,altBoundary:x,padding:g}),I=F?W?f:l:W?c:a;M[N]>S[N]&&(I=G(I));var V=G(I),U=[];if(o&&U.push(q[P]<=0),u&&U.push(q[I]<=0,q[V]<=0),U.every((function(t){return t}))){R=H,C=!1;break}T.set(H,U)}if(C)for(var K=function(t){var e=L.find((function(e){var n=T.get(e);if(n)return n.slice(0,t).every((function(t){return t}))}));if(e)return R=e,"break"},Y=O?3:1;Y>0&&"break"!==K(Y);Y--);e.placement!==R&&(e.modifiersData[i]._skip=!0,e.placement=R,e.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}},{name:"preventOverflow",enabled:!0,phase:"main",fn:function(t){var e=t.state,n=t.options,i=t.name,r=n.mainAxis,o=void 0===r||r,s=n.altAxis,p=void 0!==s&&s,d=n.boundary,u=n.rootBoundary,m=n.altBoundary,g=n.padding,v=n.tether,y=void 0===v||v,b=n.tetherOffset,w=void 0===b?0:b,x=at(e,{boundary:d,rootBoundary:u,padding:g,altBoundary:m}),k=D(e.placement),O=$(e.placement),E=!O,_=q(k),L=function(t){return"x"===t?"y":"x"}(_),M=e.modifiersData.popperOffsets,S=e.rects.reference,T=e.rects.popper,R="function"==typeof w?w(Object.assign({},e.rects,{placement:e.placement})):w,B="number"==typeof R?{mainAxis:R,altAxis:R}:Object.assign({mainAxis:0,altAxis:0},R),H=e.modifiersData.offset?e.modifiersData.offset[e.placement]:null,P={x:0,y:0};if(M){if(o){var W,F="y"===_?a:l,V="y"===_?c:f,U="y"===_?"height":"width",K=M[_],Y=K+x[F],z=K-x[V],J=y?-T[U]/2:0,G=O===h?S[U]:T[U],X=O===h?-T[U]:-S[U],Z=e.elements.arrow,Q=y&&Z?C(Z):{width:0,height:0},tt=e.modifiersData["arrow#persistent"]?e.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},et=tt[F],nt=tt[V],it=I(0,S[U],Q[U]),rt=E?S[U]/2-J-it-et-B.mainAxis:G-it-et-B.mainAxis,ot=E?-S[U]/2+J+it+nt+B.mainAxis:X+it+nt+B.mainAxis,st=e.elements.arrow&&N(e.elements.arrow),ct=st?"y"===_?st.clientTop||0:st.clientLeft||0:0,ft=null!=(W=H?.[_])?W:0,lt=K+ot-ft,pt=I(y?A(Y,K+rt-ft-ct):Y,K,y?j(z,lt):z);M[_]=pt,P[_]=pt-K}if(p){var dt,ht="x"===_?a:l,ut="x"===_?c:f,mt=M[L],gt="y"===L?"height":"width",vt=mt+x[ht],yt=mt-x[ut],bt=-1!==[a,l].indexOf(k),wt=null!=(dt=H?.[L])?dt:0,xt=bt?vt:mt-S[gt]-T[gt]-wt+B.altAxis,kt=bt?mt+S[gt]+T[gt]-wt-B.altAxis:yt,Ot=y&&bt?function(t,e,n){var i=I(t,e,n);return i>n?n:i}(xt,mt,kt):I(y?xt:vt,mt,y?kt:yt);M[L]=Ot,P[L]=Ot-mt}e.modifiersData[i]=P}},requiresIfExists:["offset"]},{name:"arrow",enabled:!0,phase:"main",fn:function(t){var e,n=t.state,i=t.name,r=t.options,o=n.elements.arrow,s=n.modifiersData.popperOffsets,p=D(n.placement),h=q(p),u=[l,f].indexOf(p)>=0?"height":"width";if(o&&s){var m=function(t,e){return V("number"!=typeof(t="function"==typeof t?t(Object.assign({},e.rects,{placement:e.placement})):t)?t:U(t,d))}(r.padding,n),g=C(o),v="y"===h?a:l,y="y"===h?c:f,b=n.rects.reference[u]+n.rects.reference[h]-s[h]-n.rects.popper[u],w=s[h]-n.rects.reference[h],x=N(o),k=x?"y"===h?x.clientHeight||0:x.clientWidth||0:0,O=b/2-w/2,E=m[v],_=k-g[u]-m[y],j=k/2-g[u]/2+O,A=I(E,j,_),L=h;n.modifiersData[i]=((e={})[L]=A,e.centerOffset=A-j,e)}},effect:function(t){var e=t.state,n=t.options.element,i=void 0===n?"[data-popper-arrow]":n;null!=i&&("string"==typeof i&&!(i=e.elements.popper.querySelector(i))||R(e.elements.popper,i)&&(e.elements.arrow=i))},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]},{name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(t){var e=t.state,n=t.name,i=e.rects.reference,r=e.rects.popper,o=e.modifiersData.preventOverflow,s=at(e,{elementContext:"reference"}),a=at(e,{altBoundary:!0}),c=ct(s,i),f=ct(a,r,o),l=ft(c),p=ft(f);e.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:f,isReferenceHidden:l,hasPopperEscaped:p},e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-reference-hidden":l,"data-popper-escaped":p})}}]});class vt{constructor(t,e,s,a,c,f,l,p,d){if(this.cfg=t,this.hTag=e,this.appPixi=s,this.main=a,this.layMng=c,this.val=f,this.scrItr=p,this.sys=d,e.clear_event=t=>o.R.clear_event(t),e.event=t=>this.#s(t),e.l=t=>this.#n.l(t),e.p=t=>this.#n.p(t),e.s=t=>this.#n.s(t),e.set_cancel_skip=()=>!1,e.set_focus=t=>this.#a(t),e.wait=t=>this.#n.wait(t),e.waitclick=t=>this.#n.waitclick(t),e.page=t=>this.#n.page(t),l.setEvtMng(this),p.setOtherObj(this,c),r.T.setEvtMng(this,d,p),c.setEvtMng(this),d.setFire(((t,e)=>this.#n.fire(t,e))),i.C.isDbg){const t={pause:()=>{if(!this.#n.isWait)return;const t={};p.recodeDesign(t),d.callHook("_enterDesign",t),d.send2Dbg("_enterDesign",t)}};t.attach=t.stopOnEntry=t.stopOnStep=t.stopOnStepIn=t.stopOnStepOut=t.stopOnBackstep=t.pause,d.addHook((e=>t[e]?.()))}(0,i.k)("\n.sn_hint {\n\tbackground-color: #3c3225;\n\tcolor: white;\n\tpadding: 4px 8px;\n\tborder-radius: 4px;\n\tfont-size: 1.2em;\n\tz-index: 10000;\n\tpointer-events: none;\n\tuser-select: none;\n}\n\n.sn_hint_ar,\n.sn_hint_ar::before {\n\tposition: absolute;\n\twidth: 8px;\n\theight: 8px;\n\tbackground: inherit;\n}\n.sn_hint_ar {\n\tvisibility: hidden;\n}\n.sn_hint_ar::before {\n\tvisibility: visible;\n\tcontent: '';\n\ttransform: rotate(45deg);\n}\n\n.sn_hint[data-popper-placement^='top']\t\t> .sn_hint_ar {bottom: -4px;}\n.sn_hint[data-popper-placement^='bottom']\t> .sn_hint_ar {top: -4px;}\n.sn_hint[data-popper-placement^='left']\t\t> .sn_hint_ar {right: -4px;}\n.sn_hint[data-popper-placement^='right']\t> .sn_hint_ar {left: -4px;}\n"),this.main.cvs.parentElement?.insertAdjacentHTML("beforeend",'\n<div class="sn_hint" role="tooltip">\n\t<span>Dummy</span>\n\t<div class="sn_hint_ar" data-popper-arrow></div>\n</div>'),this.#c=document.querySelector(".sn_hint"),this.#f=this.#c.querySelector("span"),this.#l=gt(this.#p,this.#c),this.#c.hidden=!0,s.stage.interactive=!0,i.C.isMobile?s.stage.on("pointerdown",(t=>this.#n.fire("click",t))):this.#t.add(s.stage,"pointerdown",(t=>{switch(t.data.button){case 0:this.#n.fire("click",t);break;case 1:this.#n.fire("middleclick",t)}})),this.#t.add(window,"keydown",(t=>this.#o(t))),this.#t.add(this.main.cvs,"contextmenu",(t=>this.#r(t)));const h=()=>f.setVal_Nochk("tmp","const.sn.navigator.language",navigator.language);this.#t.add(window,"languagechange",(t=>{h(),this.#n.fire("sn:chgNavLang",t),(0,i.l)()})),h();const u=t=>{i.C.isDarkMode=t.matches,f.setVal_Nochk("tmp","const.sn.isDarkMode",i.C.isDarkMode)},m=globalThis.matchMedia("(prefers-color-scheme: dark)");u(m),this.#t.add(m,"change",(t=>{u(t),this.#n.fire("sn:chgDarkMode",t)}));let g=(t,e)=>{};"WheelEvent"in window&&(this.#t.add(this.main.cvs,"wheel",(t=>this.#d(t)),{passive:!0}),this.#i=t=>this.#t.add(t,"wheel",(t=>this.#d(t)),{passive:!0}),g=(t,e)=>t.add(this.main.cvs,"wheel",(t=>{t.isComposing||t.deltaY<=0||(t.stopPropagation(),e())}))),o.R.init((t=>{this.#n?.destroy(),this.#n=t}),a,f,c,p,l,e,this.#e,g,this.#c,t),n.e(203).then(n.bind(n,2203)).then((t=>t.g)).then((({GamepadListener:t})=>{const e=new t({analog:!1,deadZone:.3});i.C.debugLog&&(e.on("gamepad:connected",(t=>console.log(`👺<'gamepad:connected' index:${t.detail.index} id:${t.detail.gamepad.id}`))),e.on("gamepad:disconnected",(t=>console.log(`👺<'gamepad:disconnected' index:${t.detail.index} id:${t.detail.gamepad?.id}`))));const n=["","ArrowUp","","ArrowLeft","","ArrowRight","","ArrowDown",""],r=[0,0];e.on("gamepad:axis",(t=>{if(!document.hasFocus())return;r[t.detail.axis]=t.detail.value;const[e=0,o=0]=r,s=n[3*(o+1)+(e+1)];if(!s)return;const a=this.#e.getFocus();(!a||a instanceof i.j?globalThis:a).dispatchEvent(new KeyboardEvent("keydown",{key:s,bubbles:!0})),a&&!(a instanceof i.j)&&"range"===a.getAttribute("type")&&a.dispatchEvent(new InputEvent("input",{bubbles:!0}))})),e.on("gamepad:button",(t=>{if(document.hasFocus())if(t.detail.button%2==0){const t=this.#e.getFocus();(!t||t instanceof i.j?globalThis:t).dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",bubbles:!0}))}else this.main.cvs.dispatchEvent(new Event("contextmenu"))})),e.start()})),this.#t.add(window,"keyup",(t=>{t.isComposing||t.key in this.#h&&(this.#h[t.key]=0)})),f.defTmp("const.sn.key.alternate",(()=>this.#h.Alt>0)),f.defTmp("const.sn.key.command",(()=>this.#h.Meta>0)),f.defTmp("const.sn.key.control",(()=>this.#h.Control>0)),f.defTmp("const.sn.key.end",(()=>this.#h.End>0)),f.defTmp("const.sn.key.escape",(()=>this.#h.Escape>0)),f.defTmp("const.sn.key.back",(()=>this.#h.GoBack>0))}#t=new i.E;#e=new s;#n;resvFlameEvent(t){this.#t.add(t,"keydown",(t=>this.#o(t))),this.#t.add(t,"contextmenu",(t=>this.#r(t))),this.#i(t)}#i=t=>{};#o(t){t.isComposing||(t.key in this.#h&&(this.#h[t.key]=t.repeat?2:1),this.#n.fire(i.m.modKey(t)+t.key,t))}#r(t){this.#n.fire(this.#u(t)+"rightclick",t),t.preventDefault()}#u(t){return(t.altKey?"alt+":"")+(t.ctrlKey?"ctrl+":"")+(t.metaKey?"meta+":"")+(t.shiftKey?"shift+":"")}#d(t){if(this.#m)return void(this.#g=!0);this.#m=!0,this.#v();const e=this.#u(t)+(t.deltaY>0?"downwheel":"upwheel");this.#n.fire(e,t)}#m=!1;#g=!1;#v(){setTimeout((()=>{if(this.#g)return this.#g=!1,void this.#v();this.#m=!1}),250)}destroy(){for(const t of Array.from(document.getElementsByClassName("sn_hint")))t.parentElement?.removeChild(t);this.#n.destroy(),this.#e.destroy(),this.#t.clear()}fire(t,e){this.#n.fire(t,e)}popLocalEvts(){return o.R.popLocalEvts()}pushLocalEvts(t){o.R.pushLocalEvts(t)}unButton(t){this.#e.remove(t)}button(t,e,n,s,a){!t.fn&&!t.label&&!t.url&&this.main.errScript("fnまたはlabelまたはurlは必須です"),t.fn??=this.scrItr.scriptFn,e.interactive=!0,e.cursor="pointer";const c=t.key?.toLowerCase()??" ",f=(0,i.a)(t,"global",!1);o.R.setEvt2Fnc(f,c,(()=>this.main.resumeByJumpOrCall(t))),e.on("pointerdown",(t=>this.#n.fire(c,t)));const l=t.hint?()=>this.#y(t,e):()=>{},p=()=>{n(),this.#c.hidden=!0},d=()=>(l(),s());if(e.on("pointerover",d),e.on("pointerout",(()=>{this.#e.isFocus(e)?d():p()})),e.on("pointerdown",(()=>{this.#c.hidden=!0;const t=this.#e.getFocus();a(),t instanceof r.B&&t.normal()})),e.on("pointerup",i.C.isMobile?p:()=>{this.#e.isFocus(e)?d():p()}),this.#e.add(e,d,p),t.clickse&&(t.clicksebuf??="SYS",this.cfg.searchPath(t.clickse,i.S.SOUND),e.on("pointerdown",(()=>{this.hTag.playse({fn:t.clickse,buf:t.clicksebuf,join:!1})}))),t.enterse&&(t.entersebuf??="SYS",this.cfg.searchPath(t.enterse,i.S.SOUND),e.on("pointerover",(()=>{this.hTag.playse({fn:t.enterse,buf:t.entersebuf,join:!1})}))),t.leavese&&(t.leavesebuf??="SYS",this.cfg.searchPath(t.leavese,i.S.SOUND),e.on("pointerout",(()=>{this.hTag.playse({fn:t.leavese,buf:t.leavesebuf,join:!1})}))),t.onenter){const n=c+t.onenter.toLowerCase(),i={fn:t.fn,label:t.onenter,call:!0,key:n};o.R.setEvt2Fnc(f,n,(()=>this.main.resumeByJumpOrCall(i))),e.on("pointerover",(t=>this.#n.fire(n,t)))}if(t.onleave){const n=c+t.onleave.toLowerCase(),i={fn:t.fn,label:t.onleave,call:!0,key:n};o.R.setEvt2Fnc(f,n,(()=>this.main.resumeByJumpOrCall(i))),e.on("pointerout",(t=>this.#n.fire(n,t)))}}#p={getBoundingClientRect:(t=0,e=0)=>DOMRect.fromRect({x:t,y:e,width:0,height:0})};#c;#f;#l;#b={placement:"bottom",modifiers:[{name:"flip",options:{fallbackPlacements:["top","bottom"]}}]};#y(t,e){const n=e instanceof r.B?e.getBtnBounds():e.getBounds();if("link"!==t[":タグ名"]){const t=e.parent.parent;n.x+=t.x,n.y+=t.y}if(t.hint){this.#c.style.cssText=`position:${this.#c.style.position}; transform:${this.#c.style.transform};`+(t.hint_style??""),this.#f.style.cssText="",this.#f.textContent=t.hint??"";try{const e=t.hint_opt?{...this.#b,...JSON.parse(t.hint_opt)}:this.#b;this.#l.setOptions(e)}catch(e){console.error((0,i.o)(t,"hint_opt",`dispHint 引数 hint_opt エラー ${e instanceof SyntaxError?e.message:""}`))}this.#p.getBoundingClientRect=()=>DOMRect.fromRect({x:this.sys.ofsLeft4elm+n.x*this.sys.cvsScale,y:this.sys.ofsTop4elm+n.y*this.sys.cvsScale,width:n.width,height:n.height}),this.#l.update(),this.#c.hidden=!1}else this.#c.hidden=!0}hideHint(){this.#c.hidden=!0}cvsResize(){this.hideHint()}#s(t){const e=t.key;if(!e)throw"keyは必須です";const n=e.toLowerCase(),r=(0,i.a)(t,"call",!1),s=(0,i.a)(t,"global",!1);if((0,i.a)(t,"del",!1)){if(t.fn||t.label||r||t.url)throw"fn/label/callとdelは同時指定できません";return o.R.clear_eventer(e,s,n),!1}if(!t.fn&&!t.label&&!t.url)throw"fn,label,url いずれかは必須です";if(t.fn??=this.scrItr.scriptFn,e.startsWith("dom=")){const n=o.R.getHtmlElmList(e);if(0===n.el.length){if((0,i.a)(t,"need_err",!0))throw`HTML内にセレクタ（${n.sel}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;return!1}let r=["click","keydown"];switch(n.el[0].type??""){case"checkbox":case"range":r=["input"];break;case"text":case"textarea":r=["input","change"]}const s=r.length;for(let t=0;t<s;++t){const i=r[t];n.el.forEach((r=>{this.#t.add(r,i,(t=>{if(!this.#n.isWait||this.layMng.getFrmDisabled(n.id)||"keydown"===i&&"Enter"!==t.key)return;const o=r.dataset;for(const[t,e]of Object.entries(o))this.val.setVal_Nochk("tmp",`sn.event.domdata.${t}`,e);this.#n.fire(e,t)})),0===t&&this.#e.add(r,(()=>!!this.#w(r)&&(r.focus(),!0)),(()=>{}))}))}}return o.R.setEvt2Fnc(s,n,(()=>this.main.resumeByJumpOrCall(t))),!1}#w(t){if(null===t.offsetParent)return!1;let e=t;do{if("none"===getComputedStyle(e).display||"false"===e.dataset.focus||e?.disabled)return!1;e=e.parentElement}while(null!==e);return!0}#a(t){const{add:e,del:n,to:r}=t;if(e?.startsWith("dom=")){const n=o.R.getHtmlElmList(e);if(0===n.el.length&&(0,i.a)(t,"need_err",!0))throw`HTML内にセレクタ（${n.sel}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;return n.el.forEach((t=>this.#e.add(t,(()=>!!this.#w(t)&&(t.focus(),!0)),(()=>{})))),!1}if(n?.startsWith("dom=")){const e=o.R.getHtmlElmList(n);if(0===e.el.length&&(0,i.a)(t,"need_err",!0))throw`HTML内にセレクタ（${e.sel}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;return e.el.forEach((t=>this.#e.remove(t))),!1}if(!r)throw"[set_focus] add か to は必須です";switch(r){case"null":this.#e.blur();break;case"next":this.#e.next();break;case"prev":this.#e.prev()}return!1}waitEvent=(t,e,n)=>this.#n.waitEvent(t,e,n);breakEvent(t){this.#n.breakEvent(t)}get isSkipping(){return!!this.#n.isSkipping||Object.keys(this.#h).some((t=>2===this.#h[t]))}#h={Alt:0,Meta:0,Control:0,ArrowDown:0,End:0,Enter:0,Escape:0," ":0,GoBack:0}}}}]);