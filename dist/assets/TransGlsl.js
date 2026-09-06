import{d as e}from"./web.js";import{t}from"./Snapshot.js";var n=`
precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float tick;
uniform vec2 resolution;`,r={blur:`${n}
void main() {
	float r = tick * 0.04;	// ぼかし半径（画面比。最大 4%）
	vec2 uv = vTextureCoord;
	vec4 c = texture2D(uSampler, uv) * 0.25;
	c += texture2D(uSampler, uv + vec2( r, 0.0)) * 0.125;
	c += texture2D(uSampler, uv + vec2(-r, 0.0)) * 0.125;
	c += texture2D(uSampler, uv + vec2(0.0,  r)) * 0.125;
	c += texture2D(uSampler, uv + vec2(0.0, -r)) * 0.125;
	c += texture2D(uSampler, uv + vec2( r,  r)) * 0.0625;
	c += texture2D(uSampler, uv + vec2(-r,  r)) * 0.0625;
	c += texture2D(uSampler, uv + vec2( r, -r)) * 0.0625;
	c += texture2D(uSampler, uv + vec2(-r, -r)) * 0.0625;
	c.a *= 1.0 - tick;
	gl_FragColor = c;
}`,mosaic:`${n}
void main() {
	float blocks = mix(160.0, 8.0, tick);	// 縦方向のブロック数：細かい→粗い
	vec2 grid = vec2(blocks * resolution.x / max(resolution.y, 1.0), blocks);
	vec2 uv = (floor(vTextureCoord * grid) + 0.5) / grid;
	vec4 c = texture2D(uSampler, uv);
	c.a *= 1.0 - tick * tick;	// 消え際を少し後ろへ
	gl_FragColor = c;
}`};Object.keys(r);function i(e){return r[e]??e}function a(e,t,n){if(!e||t.length===0)return Promise.resolve();let r=performance.now();return new Promise(i=>{let a=()=>{let o=new Set([...e.querySelectorAll(`img`)].filter(e=>e.complete&&e.naturalWidth>0).map(e=>e.getAttribute(`src`)));t.every(e=>o.has(e))||performance.now()-r>n?i():requestAnimationFrame(a)};a()})}var o=`
attribute vec2 aPos;
varying vec2 vTextureCoord;
void main() {
	vTextureCoord = vec2((aPos.x + 1.0) * 0.5, 1.0 - (aPos.y + 1.0) * 0.5);
	gl_Position = vec4(aPos, 0.0, 1.0);
}`,s=`
precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
void main() { gl_FragColor = texture2D(uSampler, vTextureCoord); }`;function c(e){return new Promise((t,n)=>{let r=new Image;r.onload=()=>t(r),r.onerror=()=>n(Error(`画像が読めません: ${e.slice(0,64)}`)),r.src=e})}function l(e,t,n){let r=e.createShader(t);if(e.shaderSource(r,n),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS)){let t=e.getShaderInfoLog(r);throw e.deleteShader(r),Error(`シェーダのコンパイルに失敗: ${t??``}`)}return r}function u(e,t,n){let r=l(e,e.FRAGMENT_SHADER,n),i=e.createProgram();if(e.attachShader(i,t),e.attachShader(i,r),e.bindAttribLocation(i,0,`aPos`),e.linkProgram(i),e.detachShader(i,r),e.deleteShader(r),!e.getProgramParameter(i,e.LINK_STATUS)){let t=e.getProgramInfoLog(i);throw e.deleteProgram(i),Error(`シェーダのリンクに失敗: ${t??``}`)}return i}function d(e,t){let n=e.createTexture();return e.bindTexture(e.TEXTURE_2D,n),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),t?e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,t):e.texImage2D(e.TEXTURE_2D,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,new Uint8Array([0,0,0,0])),n}async function f(n){let{stageW:r,stageH:i,bgColor:o}=e,s=e=>t({el:n.stageEl,sw:r,sh:i,width:r,height:i,bgColor:o,page:e,aLayNm:null,mime:`image/png`,smoothing:!0});await a(n.stageEl.querySelector(`[data-page="back"]`),n.backSrcs,800);let[l,u]=await Promise.all([s(`fore`),s(`back`)]),[d,f,m]=await Promise.all([c(l),c(u),n.ruleSrc?c(n.ruleSrc).catch(()=>null):Promise.resolve(null)]),h=document.createElement(`canvas`);h.width=r,h.height=i,h.style.cssText=`position:absolute;inset:0;width:100%;height:100%;pointer-events:none`;let g=h.getContext(`webgl`,{premultipliedAlpha:!1,preserveDrawingBuffer:!0,alpha:!0});if(!g)throw Error(`WebGLコンテキストが取得できません`);try{return p(g,h,n,{foreImg:d,backImg:f,ruleImg:m})}catch(e){throw g.getExtension(`WEBGL_lose_context`)?.loseContext(),h.remove(),e}}function p(t,n,r,a){let{stageW:c,stageH:f}=e,{foreImg:p,backImg:m,ruleImg:h}=a,g=l(t,t.VERTEX_SHADER,o),_=u(t,g,s),v=u(t,g,i(r.glslSrc));t.deleteShader(g);let y=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,y),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),t.STATIC_DRAW),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0);let b=d(t,p),x=d(t,m),S=d(t,h);t.viewport(0,0,c,f),t.disable(t.DEPTH_TEST);let C=t.getUniformLocation(_,`uSampler`),w={uSampler:t.getUniformLocation(v,`uSampler`),tick:t.getUniformLocation(v,`tick`),resolution:t.getUniformLocation(v,`resolution`),rule:t.getUniformLocation(v,`rule`),vague:t.getUniformLocation(v,`vague`)},T=e=>{t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.disable(t.BLEND),t.useProgram(_),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,x),t.uniform1i(C,0),t.drawArrays(t.TRIANGLE_STRIP,0,4),t.enable(t.BLEND),t.blendFunc(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA),t.useProgram(v),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,b),w.uSampler&&t.uniform1i(w.uSampler,0),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,S),w.rule&&t.uniform1i(w.rule,1),w.tick&&t.uniform1f(w.tick,e),w.resolution&&t.uniform2f(w.resolution,c,f),w.vague&&t.uniform1f(w.vague,r.vague),t.drawArrays(t.TRIANGLE_STRIP,0,4)},E=0,D=!0,O=()=>{if(!D)return;let e=r.time<=0?1:Math.min((performance.now()-r.t0)/r.time,1);T(e),e<1&&(E=requestAnimationFrame(O))};return T(0),r.holder.appendChild(n),E=requestAnimationFrame(O),()=>{D&&(D=!1,cancelAnimationFrame(E),t.deleteTexture(b),t.deleteTexture(x),t.deleteTexture(S),t.deleteBuffer(y),t.deleteProgram(_),t.deleteProgram(v),t.getExtension(`WEBGL_lose_context`)?.loseContext(),n.remove())}}export{f as runGlslTrans};