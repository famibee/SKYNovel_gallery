import{r as e}from"./Fx.js";import{t}from"./fxRegistry.js";var n=`
attribute vec2 aPos;
varying vec2 vTextureCoord;
void main() {
	vTextureCoord = (aPos + 1.0) * 0.5;
	gl_Position = vec4(aPos, 0.0, 1.0);
}`,r=`
precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
void main() { gl_FragColor = texture2D(uSampler, vTextureCoord); }`,i=`
precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float tick;
uniform vec2 resolution;
uniform float progress;`,a={wave:`${i}
uniform float amp;
uniform float freq;
void main() {
	vec2 uv = vTextureCoord;
	uv.x += sin(uv.y * freq * 6.2831853 + tick * 3.0) * (amp / resolution.x);
	gl_FragColor = texture2D(uSampler, uv);
}`,rgbShift:`${i}
uniform float shift;
void main() {
	float d = shift / resolution.x * (0.35 + 0.65 * abs(sin(tick * 2.0)));
	float r = texture2D(uSampler, vTextureCoord + vec2(d, 0.0)).r;
	vec4  g = texture2D(uSampler, vTextureCoord);
	float b = texture2D(uSampler, vTextureCoord - vec2(d, 0.0)).b;
	gl_FragColor = vec4(r, g.g, b, g.a);
}`,snow:`${i}
uniform float amp;
uniform float freq;
// 1 層ぶんの降雪。戻り値は雪片の明るさ（0..1）。scale が大きいほど遠い（細かく淡い）層
float snowLayer(vec2 uv, float scale) {
	float w = smoothstep(1.0, 0.0, -uv.y * (scale / 10.0));	// 画面下ほど濃く
	if (w < 0.1) return 0.0;

	uv   += tick * amp / scale;				// amp＝落下速度の倍率
	uv.y += tick * amp * 2.0 / scale;
	uv.x += sin(uv.y + tick * 0.5) / scale;	// 横ゆらぎ（位相は基準速度）

	uv *= scale;
	vec2 s = floor(uv);
	vec2 f = fract(uv);

	// 元シェーダは未初期化 p を右辺（s + p + scale）で参照＝実質 s + scale。ここは明示。
	vec2 p = 0.5 + 0.35 * sin(11.0 * fract(sin((s + scale) * mat2(7, 3, 6, 5)) * 5.0)) - f;
	// 旧版の k = min(length(p), 3.0) の 3.0 クランプは、p 各成分が [0.15,0.85]-f ∈ (-0.85,0.85]
	//	＝ length(p) ≤ 1.2 で常に効かない死にコード。外した（層数ぶんの min を節約）。
	float k = smoothstep(0.0, length(p), sin(f.x + f.y) * 0.01);
	return k * w;
}
void main() {
	vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);

	// 手前（小さい scale・強い）から freq 個ぶんの層を積む。**freq を超える層は snowLayer を
	//	呼ばない**：freq は uniform ＝全フラグメント同一分岐でワープ分岐が無く丸ごと省ける。
	//	旧版は 7 層を常に計算してから 0 を掛けて捨てていた（freq=3〈既定〉でも 7 層ぶん回っていた）。
	//	freq=3 で 4/7、freq=1 で 1/7 の実効ワークに。端数の層はフェード（min(n-i, 1.0)）。
	float n = clamp(freq, 0.0, 7.0);
	float acc = 0.0;
	if (n > 0.0) acc += snowLayer(uv,  5.0)       * min(n,       1.0);
	if (n > 1.0) acc += snowLayer(uv,  6.0)       * min(n - 1.0, 1.0);
	if (n > 2.0) acc += snowLayer(uv,  8.0)       * min(n - 2.0, 1.0);
	if (n > 3.0) acc += snowLayer(uv, 10.0)       * min(n - 3.0, 1.0);
	if (n > 4.0) acc += snowLayer(uv, 15.0) * 0.8 * min(n - 4.0, 1.0);
	if (n > 5.0) acc += snowLayer(uv, 20.0) * 0.5 * min(n - 5.0, 1.0);
	if (n > 6.0) acc += snowLayer(uv, 30.0) * 0.3 * min(n - 6.0, 1.0);

	float a = clamp(acc, 0.0, 1.0);
	vec4 src = texture2D(uSampler, vTextureCoord);
	gl_FragColor = vec4(mix(src.rgb, vec3(1.0), a), max(src.a, a));
}`,rain:`${i}
uniform float amp;
uniform float freq;
uniform float shift;
float hash(vec2 p) { return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453); }	// snow と同じ流儀
// aspect は 3 層で共通なので呼び出し側で 1 回だけ出して渡す（層内で毎回 div するのをやめた）
float rainLayer(vec2 uv, float aspect, float density, float speed, float tail, float seed) {
	float cols = floor(18.0 + density * 10.0);
	float gx = uv.x * cols * aspect;
	float id = floor(gx);
	float lane = fract(gx) - 0.5;
	float h0 = hash(vec2(id, seed));
	float h1 = hash(vec2(id, seed + 7.0));
	float on = step(h0, clamp(0.08 + density * 0.06, 0.0, 0.9));	// 一部の帯だけ雨脚
	float segs = 1.5 + h1 * 2.5;
	float y = fract(uv.y * segs + tick * speed * (0.7 + h1) + h0 * 6.2831);	// y-up＝+tick で下へ
	float body = smoothstep(tail, 0.0, y) * smoothstep(0.0, 0.02, y);		// 先端が明・上へ尾
	float thin = smoothstep(0.5, 0.0, abs(lane) * (2.4 + density * 0.15));
	return on * body * thin * (0.4 + 0.6 * h0);
}
void main() {
	vec4 src = texture2D(uSampler, vTextureCoord);
	float heavy = clamp((freq - 2.0) / 6.0, 0.0, 1.0);	// 0=弱雨 … 1=豪雨（freq 2→8）
	float tail = clamp(0.05 + shift * 0.02, 0.06, 0.6);
	float aspect = resolution.x / max(resolution.y, 1.0);
	vec2 uv = vTextureCoord;
	uv.x += uv.y * mix(0.06, 0.16, heavy);				// 風のシア（豪雨ほど寝かせる）
	float r = rainLayer(uv, aspect, freq * 0.6, amp * 0.8, tail * 1.4, 11.0)		// 奥
		+ rainLayer(uv, aspect, freq, amp * 1.2, tail, 23.0)						// 中
		+ rainLayer(uv, aspect, freq * 0.5, amp * 1.7, tail * 0.7, 41.0) * mix(0.6, 1.1, heavy);	// 手前
	r = clamp(r, 0.0, 1.0);
	vec3 col = mix(src.rgb, src.rgb * 0.80, heavy);		// 曇天で暗く
	col += vec3(0.03, 0.04, 0.05) * heavy;				// うっすら雨幕
	col += vec3(0.80, 0.86, 1.0) * r * mix(0.5, 0.85, heavy);	// 雨脚のハイライト
	gl_FragColor = vec4(col, src.a);
}`,fireworks:`${i}
uniform float amp;		// 明るさ（未指定=0→標準1.0）
uniform float freq;		// 頭（＝火の粉を撒く親）の数（未指定=0→標準1.0＝32個。上限44個）
uniform float p1;		// 広がり＝落下＝周期の速さ（未指定=0→標準0.25＝約4秒周期）。
						//	"speed"はエンジン予約語（tick倍率。docs/tag.html [add_fx]）なのでここでは使わない
uniform float p2;		// 横位置（0=中央, ±1=炸裂中心がフレーム左右端）。画面幅に対する割合＝解像度・背景サイズ非依存
uniform vec3  color;	// 光の色づけ（未指定=vec3(0)→既定の橙金）

const int MAX_STARS = 44;	// 頭の上限（火の粉の落下地点18×2粒と掛けて最大 44×(2+36) ループ＝アンロール量の頭打ち）
const int EMBER_N   = 18;	// 頭が寿命の間に火の粉を落とす回数（1回につき2粒。等分＝1/EMBER_N life ごと）

// --- ハッシュ乱数（rain_window.sn と同じ流儀。mediump 前提。テクスチャ不要） ---
vec3  h13(float p) {
	// 枝ごと・ノードごとの疑似乱数（元シェーダの iChannel1 の1テクセル分に相当）
	vec3 p3 = fract(vec3(p) * vec3(0.1031, 0.1030, 0.0973));
	p3 += dot(p3, p3.yzx + 33.33);
	return fract((p3.xxy + p3.yzz) * p3.zyx);
}

// 角度→角距離² を mediump でも精度よく出す小道具。d も dir も単位ベクトルなので
//	|d - dir|² = 2(1 - cosθ) ≒ θ²。1 - ct*ct 方式のような ct≈1 での桁落ちが無い。
float ang2(vec3 o, vec3 d, vec3 c) {
	vec3 e = d - normalize(c - o);
	return dot(e, e);
}

// 頭＝燃える先端。芯＋ゆるいハロー（逆二乗グロー）。ハローは残像に見えない程度に絞る。
float headGlow(vec3 o, vec3 d, float s, vec3 c) {
	return s / max(ang2(o, d, c), 3.5e-4);
}

// 火の粉／頭の1粒。放物線の緊密サポート（exp を使わない＝安い。外側は完全に0＝ヘイズが溜まらない）。
//	tight ＝ 1/サポート半径²。大きいほど小さいドット。
float mote(vec3 o, vec3 d, float s, vec3 c, float tight) {
	float q = 1.0 - min(ang2(o, d, c) * tight, 4.0);
	return q <= 0.0 ? 0.0 : s * q * q;
}

// 頭（燃える先端）の、炸裂からの経過 tau（0..1）における位置。
//	点ごとの乱数ベクトル v で放射状に飛び（pop で一気に開く）、あとは重力で落ちる。重い＝速く落ちる。
//	exp／pow は使わず有理式＋放物線で近似（1粒＋火の粉18〜36回/頭 呼ばれるので効く）。
vec3 headPos(vec3 bc, vec3 v, float tau, vec3 r) {
	float x    = max(tau, 0.0);
	float pop  = x / (x + 0.05);								// 一瞬で開く（1-exp の代用・div 1回）
	float rad  = pop * 0.58 * (0.70 + r.x * 0.6);			// 頭ごとに到達半径をばらす
	float fall = x * x * (0.65 + r.z * 1.0);					// 重力＝放物線（pow を排除・落下速度をばらす）
	return bc + v * rad - vec3(0.0, fall, 0.0);
}

// 花火本体。全部の頭（●）が同時に飛び出し、寿命を EMBER_N 等分した固定時刻ごとに、
//	その瞬間の頭の位置へ火の粉（∴∴）を落とす。火の粉の産まれ時刻 tb は life に一切依存しない
//	＝落とした場所に本当に置いて行かれ、頭より“ずっと軽い重力”でゆっくり沈み、各自の寿命で冷えて消える。
vec3 starField(vec3 o, vec3 d, float t, float dens, float spd) {
	float phase = t * spd;
	float life  = fract(phase);					// 0→1 で1発ぶんの寿命
	float seed  = floor(phase);					// 何発目か（発ごとに乱数を変える種）

	// --- 解像度 LOD：背景画像（＝この GLSL の resolution）が広いほど品を落として粒を大きく・明るく ---
	//	実効ワーク ≒ resolution画素数 × nHeads × emberPts × (two?2:1)。ここを一定予算に寄せる。
	float mpx  = (resolution.x * 0.001) * (resolution.y * 0.001);	// メガピクセル（x*y は mediump 桁溢れするので 0.001 ずつ）
	float lod  = clamp((mpx - 0.5) / 3.0, 0.0, 1.0);				// 0.5Mpx(≈XGA)→0 … 3.5Mpx(≈WQHD超)→1
	int   eLod = int(mix(18.0,  8.0, lod));						// 火の粉の落下地点の数
	bool  two  = lod < 0.5;										// 1地点あたり 2粒→1粒
	float gain = mix(1.0, 3.4, lod);							// 減らした分は明るく
	float tK   = mix(1.0, 0.42, lod);							// tight を下げる＝粒を大きく（総発光量を保つ）

	int   n         = int(clamp(mix(32.0, 12.0, lod) * dens, 8.0, float(MAX_STARS)));	// 頭の数
	float dt        = 1.0 / float(EMBER_N);				// 火の粉を落とす間隔（寿命全体を EMBER_N 等分）
	float emberLife = 0.62;							// 火の粉が産まれてから冷え切るまで（life 単位＝長寿命）
	float GSPARK    = 0.20;							// 火の粉の重力（頭の 0.6〜1.55 よりずっと軽い）
	float lifeFade  = 1.0 - smoothstep(0.66, 1.0, life);	// 発全体の終わりで消える（余韻の締め）
	float burstFl   = max(0.0, 1.0 - life * 22.0);		// 炸裂の一瞬だけの中心閃光（exp の代用）
	vec3  bc = vec3(0.0, 0.30, 0.0);					// 炸裂点（画面やや上）

	vec3 sum = vec3(0.0);
	for (int i = 0; i < MAX_STARS; i++) {
		if (i >= n) break;
		vec3  r  = h13(float(i) + seed * 1.37);
		vec3  v  = normalize(r * 2.0 - 1.0);
		float br = 0.55 + 0.9 * r.y;						// 頭ごとの明るさばらつき

		// --- 頭（●）＝現在位置。火の粉より大きく明るい粒 ---
		vec3  hp = headPos(bc, v, life, r);
		float hw = 0.6 + 0.4 * sin(t * 14.0 + r.x * 40.0);	// 頭もちらつく
		sum += mote(o, d, 0.9 * br * hw * lifeFade * mix(1.0, 1.6, lod), hp, 6000.0 * tK) * vec3(1.2, 1.05, 0.72);
		sum += headGlow(o, d, 3.0e-6 * br * lifeFade, hp) * vec3(1.15, 1.0, 0.6);	// ごく淡い芯グロー

		// --- 火の粉（∴）＝固定時刻 tb に落とした細かいドット。tb は life 非依存＝置いて行かれる ---
		for (int j = 0; j < EMBER_N; j++) {
			if (j >= eLod) break;
			vec3  hh  = h13(float(i) * 2.3 + float(j) * 7.9 + seed * 3.0);
			float tb  = (float(j) + 0.15 + hh.z * 0.7) * dt;	// 産まれた固定時刻（life では動かない）
			if (tb > life) break;							// まだ落としていない
			float age = life - tb;							// 産まれてからの経過（増える一方・リセットしない）
			float el  = age / emberLife;					// 0=産まれたて 1=冷え切り
			if (el > 1.0) continue;							// この地点は消えた（後続はまだ生きている）

			vec3  E    = headPos(bc, v, tb, r);				// 落とした場所（固定）＝ここに取り残される
			float sink = GSPARK * age * age + 0.05 * age;	// 火の粉自身の弾道（頭よりずっと緩い落下）
			vec3  base = E - vec3(0.0, sink, 0.0);

			vec3  hh2 = fract(hh * vec3(13.13, 7.77, 19.31) + 0.317);
			vec2  twf = vec2(fract(hh.x * 19.0), fract(hh2.y * 11.0));
			vec2  sn  = 0.5 + 0.5 * sin(t * 36.0 + twf * 100.0);
			vec2  twk = 0.2 + 0.8 * sn * sn;					// 細かい明滅（pow を排除）
			float fb  = (1.0 - el) * (1.0 - el) * lifeFade * 0.22 * br * gain;	// 寿命いっぱいで減光
			float tight = mix(34000.0, 64000.0, el) * tK;	// ピンポイント（LOD で緩める）
			vec3  col   = mix(vec3(1.1, 0.85, 0.4), vec3(0.8, 0.25, 0.06), el);	// 橙→赤へ冷える
			float sp = 0.02 + 0.10 * age;					// 落ちてから少しずつ散る
			sum += mote(o, d, fb * twk.x, base + (hh  - 0.5) * sp, tight) * col;
			if (two) sum += mote(o, d, fb * twk.y, base + (hh2 - 0.5) * sp, tight) * col;
		}
	}

	// 炸裂の中心閃光（全体を一瞬フラッシュ）
	sum += vec3(headGlow(o, d, 1.6e-5 * burstFl, bc)) * vec3(1.2, 1.1, 0.9);
	return sum;
}

void main() {
	vec2 uv = vTextureCoord;
	vec4 base = texture2D(uSampler, uv);

	float bright = amp == 0.0 ? 1.0 : amp;
	float dens   = freq <= 0.0 ? 1.0 : freq;
	float spd    = p1   <= 0.0 ? 0.25 : p1;
	vec3  tint   = dot(color, color) > 0.0001 ? color : vec3(1.25, 1.05, 0.55);	// 既定は橙金

	vec3 o = vec3(0.0, -0.3, -2.0);
	vec2 fragPx = uv * resolution;
	vec2 ray = fragPx * 2.0 - resolution.xy;
	ray.x -= p2 * resolution.x;	// 横位置：画面幅の割合ぶんレイをバイアス（p2=±1 で炸裂中心がフレーム端）。
								//	わずかに斜め視点になる＝平行移動より自然。アスペクト補正不要（x を x で割る比率）
	vec3 d = normalize(vec3(ray, resolution.y * 2.0));

	vec3 g = starField(o, d, tick, dens, spd) * bright;
	vec3 glow = sqrt(clamp(g * tint, 0.0, 4.0));	// ガンマ補正（≒2.0。pow(x,1/2.2) の代用で sqrt 1回）

	// 背景透過：既存レイヤ（base）に加算合成。アルファは背景のものをそのまま使う
	gl_FragColor = vec4(clamp(base.rgb + glow, 0.0, 1.0), base.a);
}`,blur:`${i}
uniform float amp;
const int TAPS = 40;
const float GA = 2.39996323;	// 黄金角
// interleaved gradient noise（Jimenez 2014）。空間コヒーレントな [0,1) ディザ
float ign(vec2 p) { return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715)))); }
void main() {
	float r = amp * clamp(progress, 0.0, 1.0);
	if (r < 0.5) { gl_FragColor = texture2D(uSampler, vTextureCoord); return; }

	vec2  px = 1.0 / resolution;
	float n  = ign(gl_FragCoord.xy);
	float a0 = n * GA;						// ディスクを 1 タップ角ぶん以内で回す（網点ディザ）
	float jr = 0.5 + n;						// 半径も同じ位相で 0.5〜1.5 タップぶんずらす（残り moiré を潰す）
	float gk = -0.5 / (r * r);				// ガウス核（σ = r）
	vec4  sum  = vec4(0.0);					// rgb = Σ rgb·a·w ／ a = Σ a·w
	float wsum = 0.0;						// Σ w
	for (int i = 0; i < TAPS; i++) {
		float fi  = float(i) + jr;
		float rad = sqrt(fi / (float(TAPS) + 1.0)) * (r * 2.0);	// ディスク：外周 2σ・面積等分
		float ang = a0 + fi * GA;						// 黄金角でらせん配置
		vec4  t = texture2D(uSampler, vTextureCoord + vec2(cos(ang), sin(ang)) * rad * px);
		float w = exp(gk * rad * rad);
		sum  += vec4(t.rgb * t.a, t.a) * w;
		wsum += w;
	}
	vec3 rgb = sum.a > 0.0001 ? sum.rgb / sum.a : texture2D(uSampler, vTextureCoord).rgb;
	gl_FragColor = vec4(rgb, sum.a / wsum);
}`,grayscale:`${i}
uniform float amp;
void main() {
	vec4  c = texture2D(uSampler, vTextureCoord);
	float g = dot(c.rgb, vec3(0.299, 0.587, 0.114));
	gl_FragColor = vec4(mix(c.rgb, vec3(g), amp * clamp(progress, 0.0, 1.0)), c.a);
}`,sepia:`${i}
uniform float amp;
void main() {
	vec4 c = texture2D(uSampler, vTextureCoord);
	vec3 s = vec3(
		dot(c.rgb, vec3(0.393, 0.769, 0.189)),
		dot(c.rgb, vec3(0.349, 0.686, 0.168)),
		dot(c.rgb, vec3(0.272, 0.534, 0.131)));
	gl_FragColor = vec4(mix(c.rgb, clamp(s, 0.0, 1.0), amp * clamp(progress, 0.0, 1.0)), c.a);
}`,negative:`${i}
uniform float amp;
void main() {
	vec4 c = texture2D(uSampler, vTextureCoord);
	gl_FragColor = vec4(mix(c.rgb, 1.0 - c.rgb, amp * clamp(progress, 0.0, 1.0)), c.a);
}`,tint:`${i}
uniform float amp;
uniform vec3 color;
void main() {
	vec4 c = texture2D(uSampler, vTextureCoord);
	vec3 t = dot(color, color) > 0.0001 ? color : vec3(0.53333);	// 0x888888/255
	gl_FragColor = vec4(mix(c.rgb, c.rgb * t, amp * clamp(progress, 0.0, 1.0)), c.a);
}`};function o(e){return new Promise((t,n)=>{let r=new Image;r.onload=()=>t(r),r.onerror=()=>n(Error(`画像が読めません: ${e.slice(0,64)}`)),r.src=e})}function s(e,t,n){let r=e.createShader(t);if(e.shaderSource(r,n),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS)){let t=e.getShaderInfoLog(r);throw e.deleteShader(r),Error(`シェーダのコンパイルに失敗: ${t??``}`)}return r}function c(e,t,n){let r=s(e,e.FRAGMENT_SHADER,n),i=e.createProgram();if(e.attachShader(i,t),e.attachShader(i,r),e.bindAttribLocation(i,0,`aPos`),e.linkProgram(i),e.detachShader(i,r),e.deleteShader(r),!e.getProgramParameter(i,e.LINK_STATUS)){let t=e.getProgramInfoLog(i);throw e.deleteProgram(i),Error(`シェーダのリンクに失敗: ${t??``}`)}return i}function l(e,t,n){e.bindTexture(e.TEXTURE_2D,t),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!0),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,n),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1)}function u(e,t,n,r){let i=e.createTexture();return e.bindTexture(e.TEXTURE_2D,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),t?l(e,i,t):e.texImage2D(e.TEXTURE_2D,0,e.RGBA,n,r,0,e.RGBA,e.UNSIGNED_BYTE,null),i}async function d(e){let t=e.source,n;n=typeof t==`function`?t():typeof t==`string`?await o(t):t;let r=typeof t==`function`?t:null,i=Math.max(1,n instanceof HTMLImageElement?n.naturalWidth:n.width),a=Math.max(1,n instanceof HTMLImageElement?n.naturalHeight:n.height),s=e.canvas;s.width=i,s.height=a;let c=s.getContext(`webgl`,{premultipliedAlpha:!1,preserveDrawingBuffer:!0,alpha:!0});if(!c)throw Error(`WebGLコンテキストが取得できません`);try{return f(c,s,e.aFx,n,i,a,e.active,r)}catch(e){throw c.getExtension(`WEBGL_lose_context`)?.loseContext(),e}}function f(d,f,p,m,h,g,_,v){let y=s(d,d.VERTEX_SHADER,n),b=(t,n)=>{let r=c(d,y,t);return{pg:r,fx:n,tex2:null,pausedAccMs:0,pausedAt:0,uSampler:d.getUniformLocation(r,`uSampler`),uTick:d.getUniformLocation(r,`tick`),uRes:d.getUniformLocation(r,`resolution`),uProg:d.getUniformLocation(r,`progress`),uParam:Object.fromEntries(e.map(e=>[e,d.getUniformLocation(r,e)])),uColor:d.getUniformLocation(r,`color`),uTex2:d.getUniformLocation(r,`uTex2`)}},x=e=>{e.tex2&&=(d.deleteTexture(e.tex2.tx),null)},S=e=>{let t=e.fx.texSrc;if(!t)return x(e),null;if(e.tex2?.url===t)return e.tex2.tx;x(e);let n=u(d,null,1,1);return e.tex2={url:t,tx:n},o(t).then(t=>{P&&e.tex2?.tx===n&&l(d,n,t)}).catch(e=>console.error(`[add_fx] tex= の読み込みに失敗: ${String(e)}`)),n},C=e=>{let n=a[e.fx];if(n)return n;let r=t(e.fx);if(r!==void 0)return`${i}\n${r}`;throw Error(`未知の fx: ${e.fx}（[def_fx] 未定義？）`)},w=e=>e.map(e=>e.fx).join(``),T=p.map(e=>b(C(e),e)),E=w(p),D=b(r,{}),O=d.createBuffer();d.bindBuffer(d.ARRAY_BUFFER,O),d.bufferData(d.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),d.STATIC_DRAW),d.enableVertexAttribArray(0),d.vertexAttribPointer(0,2,d.FLOAT,!1,0,0);let k=u(d,m,h,g),A=[0,1].map(()=>{let e=u(d,null,h,g),t=d.createFramebuffer();return d.bindFramebuffer(d.FRAMEBUFFER,t),d.framebufferTexture2D(d.FRAMEBUFFER,d.COLOR_ATTACHMENT0,d.TEXTURE_2D,e,0),{tex:e,fb:t}});d.bindFramebuffer(d.FRAMEBUFFER,null),d.viewport(0,0,h,g),d.disable(d.DEPTH_TEST),d.disable(d.BLEND);let j=(t,n,r,i,a)=>{if(d.bindFramebuffer(d.FRAMEBUFFER,r),d.clearColor(0,0,0,0),d.clear(d.COLOR_BUFFER_BIT),d.useProgram(t.pg),t.uTex2){let e=S(t);e&&(d.activeTexture(d.TEXTURE1),d.bindTexture(d.TEXTURE_2D,e),d.uniform1i(t.uTex2,1))}d.activeTexture(d.TEXTURE0),d.bindTexture(d.TEXTURE_2D,n),t.uSampler&&d.uniform1i(t.uSampler,0),t.uTick&&d.uniform1f(t.uTick,i),t.uRes&&d.uniform2f(t.uRes,h,g),t.uProg&&d.uniform1f(t.uProg,a);for(let n of e){let e=t.uParam[n];e&&d.uniform1f(e,t.fx.params?.[n]??0)}if(t.uColor){let e=t.fx.color??[0,0,0];d.uniform3f(t.uColor,e[0],e[1],e[2])}d.drawArrays(d.TRIANGLE_STRIP,0,4)},M=performance.now(),N=0,P=!0,F=_,I=e=>{N===0!=(e===0)&&(f.dataset.fxRunning=e===0?`0`:`1`),N=e},L=()=>{let e=performance.now(),t=e-M,n=!1;v&&F&&(l(d,k,v()),n=!0);for(let r=0;r<T.length;++r){let i=T[r],a=!i.fx.enabled||!F;a&&i.pausedAt===0?i.pausedAt=e:!a&&i.pausedAt!==0&&(i.pausedAccMs+=e-i.pausedAt,i.pausedAt=0);let o=t-i.pausedAccMs-(i.pausedAt===0?0:e-i.pausedAt),s=i.fx.done===!0||i.fx.time>0&&o>=i.fx.time,c=s&&i.fx.keep===!0;!s&&!a&&(n=!0);let l=r===0?k:A[(r-1)%2].tex,u=s&&i.fx.time>0?i.fx.time:o,d=u/1e3*(i.fx.speed||1),f=i.fx.time>0?Math.min(1,u/i.fx.time):0;i.fx.reverse&&(f=1-f),j(c?i:s?D:i,l,A[r%2].fb,d,f)}return j(D,A[(T.length-1)%2].tex,null,0,0),n},R=()=>{P&&I(L()?requestAnimationFrame(R):0)};return L(),I(requestAnimationFrame(R)),{update(e,t){if(!P)return;F=t;let n=w(e);if(n!==E)try{let t=e.map(e=>b(C(e),e)),r=performance.now()-M,i=new Map(T.map(e=>[e.fx,e]));for(let e of T)d.deleteProgram(e.pg),x(e);for(let n=0;n<t.length;++n){let a=i.get(e[n]);a?(t[n].pausedAccMs=a.pausedAccMs,t[n].pausedAt=a.pausedAt):t[n].pausedAccMs=r}T=t,E=n}catch(e){console.error(`[add_fx] ${String(e)}`)}else for(let t=0;t<T.length;++t){let n=e[t];if(!n)continue;let r=T[t];n.time>0&&n!==r.fx&&!n.done&&(r.pausedAccMs=performance.now()-M,r.pausedAt=0),r.fx=n}N===0&&I(requestAnimationFrame(R))},dispose(){if(P){P=!1,cancelAnimationFrame(N),d.deleteShader(y),d.deleteTexture(k);for(let{tex:e,fb:t}of A)d.deleteTexture(e),d.deleteFramebuffer(t);d.deleteBuffer(O);for(let e of T)d.deleteProgram(e.pg),x(e);d.deleteProgram(D.pg),d.getExtension(`WEBGL_lose_context`)?.loseContext(),v?.dispose?.()}}}}export{d as runFx};