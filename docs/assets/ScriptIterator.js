import{G as w,C as $,A as L,S as v,t as T,f as y,h as _,a as d,L as N,D as m,b as I}from"./web.js";import{o as E}from"./RubySpliter.js";import{O as S,a as P}from"./ReadState.js";import{i as O}from"./CmnTween.js";import"../web.js";class x{constructor(t="",s=0,i={":hEvt1Time":{},":hMp":{},":lenIfStk":1}){this.fn=t,this.idx=s,this.csArg=i}toString=()=>`[fn:${this.fn}, idx:${this.idx}, csArg:${this.csArg}]`}class p{constructor(t,s,i,h,o,n,c){this.cfg=t,this.hTag=s,this.main=i,this.val=h,this.prpPrs=o,this.sndMng=n,this.sys=c,s.let_ml=e=>this.#X(e),s.endlet_ml=()=>!1,s.dump_stack=()=>this.#q(),s.dump_script=e=>this.#Q(e),s.else=s.elsif=s.endif=()=>this.#Z(),s.if=e=>this.#tt(e),s.call=e=>this.#st(e),s.jump=e=>this.#it(e),s.pop_stack=e=>this.#et(e),s.return=e=>this.#M(e),s.bracket2macro=e=>this.#ut(e),s.char2macro=e=>this.#pt(e),s.endmacro=e=>this.#M(e),s.macro=e=>this.#mt(e),s.load=e=>this.#gt(e),s.reload_script=e=>this.#kt(e),s.record_place=()=>this.#bt(),s.save=e=>this.#vt(e),t.oCfg.debug.token&&(this.#V=e=>{e.trim()!==""&&console.log(`🌱 トークン fn:${this.#i} idx:${this.#t} ln:${this.#e} token【${e}】`)}),h.defTmp("const.sn.aIfStk.length",()=>this.#a.length),h.defTmp("const.sn.vctCallStk.length",()=>this.#h.length),this.#c=new w(t);const f=t.oCfg.init.escape;if(this.#c.setEscape(f),E.setEscape(f),$.isDbg){c.addHook((a,r)=>this.#v[a]?.(r)),this.isBreak=this.#J;const e=this.analyzeInit;this.analyzeInit=()=>{this.analyzeInit=()=>{},this.sys.send2Dbg("hi",{})},this.#v.auth=a=>{const r=a.hBreakpoint.hFn2hLineBP;for(const[l,u]of Object.entries(r))this.#I(l,u);p.#p={};for(const l of a.hBreakpoint.aFunc)p.#p[l.name]=1;if(a.stopOnEntry){for(;;){let l=this.nextToken();if(!l)break;const u=l.charCodeAt(0);if(u===91||u===38||u===42&&l.length===1)break;u===10&&(this.#e+=l.length)}this.sys.callHook("stopOnEntry",{}),this.analyzeInit=e,this.analyzeInit()}else this.noticeWait=()=>{this.noticeWait=()=>{},this.sys.callHook("stopOnEntry",{})},this.analyzeInit=e,this.analyzeInit()}}else this.recodeDesign=()=>{};t.oCfg.debug.tag&&(this.#A=e=>console.log(`🌲 タグ解析 fn:${this.#i} idx:${this.#t} ln:${this.#e} %c[${e} %o]`,"background-color:#30B;",this.#r.hPrm))}#s={aToken:[""],len:1,aLNum:[1]};#i="";get scriptFn(){return this.#i}#t=0;subIdxToken(){--this.#t}#e=0;get lineNum(){return this.#e}addLineNum=t=>this.#e+=t;jumpJustBefore(){this.#f(this.#i,"",--this.#t)}#h=[];#c;#r=new L;noticeWait=()=>{};#I(t,s){p.#y[this.#k(t)]=s}destroy(){this.isBreak=()=>!1}#v={disconnect:()=>{p.#y={},p.#p={},this.isBreak=()=>!1,this.#v.continue({}),this.#n=0},restart:()=>this.isBreak=()=>!1,add_break:t=>this.#I(t.fn,t.o),data_break:t=>{this.#n===0&&(this.#n=1,this.main.setLoop(!1,`変数 ${t.dataId}【${t.old_v}】→【${t.new_v}】データブレーク`),this.sys.callHook("stopOnDataBreakpoint",{}),this.sys.send2Dbg("stopOnDataBreakpoint",{}))},set_func_break:t=>{p.#p={};for(const s of t.a)p.#p[s.name]=1;this.sys.send2Dbg(t.ri,{})},stack:t=>this.sys.send2Dbg(t.ri,{a:this.#U()}),eval:t=>{this.sys.send2Dbg(t.ri,{v:this.prpPrs.parse(t.txt)})},continue:()=>{this.#T()||(this.#t-=this.#b,this.#n=3,this.main.setLoop(!0),this.main.resume())},stepover:t=>this.#E(t),stepin:()=>{if(this.#T())return;const t=this.#s.aToken[this.#t-this.#b];this.sys.callHook(`stopOnStep${this.#N.test(t??"")?"In":""}`,{}),this.#t-=this.#b,this.#n=this.#n===1?4:5,this.main.setLoop(!0),this.main.resume()},stepout:t=>{this.#T()||(this.#h.length>0?this.#P(!0):this.#E(t))},pause:()=>{this.#n=4,this.main.setLoop(!1,"一時停止"),this.sys.send2Dbg("stopOnStep",{})},stopOnEntry:()=>{this.#n=4,this.main.setLoop(!1,"一時停止"),this.sys.send2Dbg("stopOnEntry",{})}};#g=t=>this.cfg.searchPath(t,v.SCRIPT);static#G=/(.+)\/crypto_prj\/([^\/]+)\/[^\.]+(\.\w+)/;#k=t=>(this.sys.pathBaseCnvSnPath4Dbg+this.#g(t)).replace(p.#G,`$1/prj/$2/${this.#i}$3`);cnvPath4Dbg=t=>this.sys.pathBaseCnvSnPath4Dbg+t.replace("/crypto_prj/","/prj/");#E(t){if(this.#T())return;const s=this.#s.aToken[this.#t-this.#b];this.#N.test(s??"")?this.#P(!1):(this.sys.callHook("stopOnStep",{}),this.#v.stepin(t))}#P(t){this.sys.callHook(`stopOnStep${t?"Out":""}`,{}),this.#O=this.#h.length-(t?1:0),this.#t-=this.#b,this.#n=t?7:6,this.main.setLoop(!0),this.main.resume()}#O=0;get#b(){return this.#n===2||this.#n===4?1:0}#T(){return this.#t<this.#s.len?!1:(this.sys.callHook("stopOnEntry",{}),this.main.setLoop(!1,"スクリプト終端です"),!0)}static#y={};static#p={};#n=0;isBreak=t=>!1;#J(t){switch(this.#n){case 6:this.#_(),this.#n=7;break;case 7:if(this.#h.length!==this.#O)break;return this.#n=4,this.main.setLoop(!1,"ステップ実行"),this.sys.send2Dbg("stopOnStep",{}),!0;case 5:this.#_(),this.#n=4;break;case 4:return this.#_(),this.main.setLoop(!1,"ステップ実行"),this.sys.send2Dbg("stopOnStep",{}),!0;case 3:this.#_(),this.#n=0;break;default:if(T(t)in p.#p)return this.#n=2,this.main.setLoop(!1,`関数 ${t} ブレーク`),this.sys.callHook("stopOnBreakpoint",{}),this.sys.send2Dbg("stopOnBreakpoint",{}),!0;{const s=p.#y[this.#k(this.#i)];if(!s)break;const i=s[this.#e];if(!i)break;if(i.condition){if(!this.prpPrs.parse(i.condition))break}else if("hitCondition"in i&&--i.hitCondition>0)break;const h=this.#n===0;this.#n=2,this.main.setLoop(!1,h?(i.condition?"条件":"ヒットカウント")+"ブレーク":"ステップ実行");const o=h?"stopOnBreakpoint":"stopOnStep";this.sys.callHook(o,{}),this.sys.send2Dbg(o,{})}return!0}return!1}#_(){const t=p.#y[y(this.#i)]?.[this.#e];t?.hitCondition&&--t.hitCondition}#U(){const t=this.#n===3?1:0,s=this.#s.aToken[this.#t-1+t],i=this.#k(this.#i),h=T(s),o=h?`[${h}]`:s,n=this.val.getVal("mp:const.sn.macro")??"{}";if(this.#t===0)return[{fn:i,ln:1,col:1,nm:o,ma:n}];const c=this.#l(this.#s,this.#t),f=[{fn:i,ln:c.ln,col:c.col_s+1,nm:o,ma:n}],e=this.#h.length;if(e===0)return f;for(let a=e-1;a>=0;--a){const r=this.#h[a],l=this.#o[r.fn];if(!l)continue;const u=l.aToken[r.idx-1];if(!u)continue;const k=this.#l(l,r.idx),b=T(u);f.push({fn:this.#k(r.fn),ln:k.ln,col:k.col_s+1,nm:b?`[${b}]`:u,ma:r.csArg[":hMp"]["const.sn.macro"]??"{}"})}return f}#A=t=>{};タグ解析(t){const[s,i]=_(t),h=this.hTag[s];if(!h)throw`未定義のタグ【${s}】です`;this.#r.parse(i),this.#A(s);const o=this.#r.hPrm;if(o.cond){const e=o.cond.val;if(!e||e.startsWith("&"))throw"属性condは「&」が不要です";const a=this.prpPrs.parse(e),r=String(a);if(r==="null"||r==="undefined"||!a)return!1}let n={};const c=this.#h.length,f=c===0?{}:this.#h[c-1].csArg;if(this.#r.isKomeParam){if(c===0)throw"属性「*」はマクロのみ有効です";n={...f}}n[":タグ名"]=s;for(const[e,{val:a,def:r}]of Object.entries(o)){let l=a;if(l?.startsWith("%")){if(c===0)throw"属性「%」はマクロ定義内でのみ使用できます（そのマクロの引数を示す簡略文法であるため）";const u=f[l.slice(1)];if(u){n[e]=u;continue}if(r===void 0||r==="null")continue;l=r}if(l=this.prpPrs.getValAmpersand(l??""),l!=="undefined"){n[e]=l;continue}r!==void 0&&(l=this.prpPrs.getValAmpersand(r),l!=="undefined"&&(n[e]=l))}return h(n)}#L;#d;setOtherObj(t,s){this.#L=t,this.#d=s}#X(t){const{name:s}=t;if(!s)throw"nameは必須です";let i="";const h=this.#s.len;for(;this.#t<h&&(i=this.#s.aToken[this.#t],i==="");++this.#t);return t.text=i,t.cast="str",this.hTag.let(t),this.#t+=2,this.#e+=(i.match(/\n/g)??[]).length,!1}#q(){if(this.#t===0)return console.group(`🥟 [dump_stack] スクリプト現在地 fn:${this.#i} line:1 col:0`),console.groupEnd(),!1;const t=this.#l(this.#s,this.#t),s=`スクリプト現在地 fn:${this.#i} line:${t.ln} col:${t.col_s+1}`;console.group(`🥟 [dump_stack] ${s}`);const i=this.#h.length;if(i>0){console.info(s);for(let h=i-1;h>=0;--h){const o=this.#h[h],n=o.csArg[":hMp"],c=n?n[":タグ名"]:void 0,f=o.csArg[":タグ名"]??"",e=this.#l(this.#o[o.fn],o.idx);console.info(`${i-h}つ前のコール元 fn:${o.fn} line:${e.ln} col:${e.col_s+1}`+(c?"（["+c+"]マクロ内）":" ")+`で [${f} ...]をコール`)}}return console.groupEnd(),!1}#l(t,s){const i={ln:1,col_s:0,col_e:0};if(!t)return i;let h=s-1;const o=i.ln=t.aLNum[h];for(;t.aLNum[h]===o;){if(!t.aToken[h].startsWith(`
`)){const n=t.aToken[h].length;i.col_e>0&&(i.col_s+=n),i.col_e+=n}if(--h<0)break}return i}#Q(t){const{set_fnc:s,break_fnc:i}=t;if(!s)throw"set_fncは必須です";if(this.#S=globalThis[s],!this.#S){if(d(t,"need_err",!0))throw`HTML内に関数${s}が見つかりません`;return this.#S=()=>{},!1}if(this.noticeBreak=h=>{this.#C!==this.#i&&(this.#C=this.#i,this.#S(this.#Y[this.#i]??=this.#s.aToken.join(""))),this.#x(this.#e,h)},this.noticeBreak(!0),!i)return!1;if(this.#x=globalThis[i],!this.#x){if(d(t,"need_err",!0))throw`HTML内に関数${i}が見つかりません`;this.#x=()=>{}}return!1}#S=()=>{};#x=()=>{};#C="";#Y={};noticeBreak=t=>{};#D=5;dumpErrForeLine(){if(this.#t===0){console.group(`🥟 Error line (from 0 rows before) fn:${this.#i}`),console.groupEnd();return}let t="";for(let n=this.#t-1;n>=0&&(t=this.#s.aToken[n]+t,!((t.match(/\n/g)??[]).length>=this.#D));--n);const s=t.split(`
`).slice(-this.#D),i=s.length;console.group(`🥟 Error line (from ${i} rows before) fn:${this.#i}`);const h=String(this.#e).length,o=this.#l(this.#s,this.#t);for(let n=0;n<i;++n){const c=this.#e-i+n+1,f=`${String(c).padStart(h," ")}: %c`,e=s[n],a=e.length>75?e.slice(0,75)+"…":e;n===i-1?console.info(f+a.slice(0,o.col_s)+"%c"+a.slice(o.col_s),"color: black; background-color: skyblue;","color: black; background-color: pink;"):console.info(f+a,"color: black; background-color: skyblue;")}console.groupEnd()}#a=[-1];#Z(){const t=this.#a[0];if(!t)throw"this.#aIfStk が異常です";if(t===-1)throw"ifブロック内ではありません";return this.#t=t,this.#a.shift(),!1}#tt(t){const{exp:s}=t;if(!s)throw"expは必須です";if(s.startsWith("&"))throw"属性expは「&」が不要です";let i=0,h=this.prpPrs.parse(s)?this.#t:-1;const o=this.#s.aLNum[this.#t];let n=this.#e-(o||0);const c=this.#s.len;for(;this.#t<c;++this.#t){const f=this.#s.aLNum[this.#t];this.#s.aLNum[this.#t]=(f||0)+n;const e=this.#s.aToken[this.#t];if(!e)continue;const a=e.charCodeAt(0);if(a===10){this.#e+=e.length;continue}if(a!==91)continue;const[r,l]=_(e);if(!(r in this.hTag))throw`未定義のタグ[${r}]です`;switch(this.#r.parse(l),r){case"if":++i;break;case"elsif":if(i>0||h>-1)break;const u=this.#r.hPrm.exp?.val;if(!u)throw"expは必須です";if(u.startsWith("&"))throw"属性expは「&」が不要です";this.prpPrs.parse(u)&&(h=this.#t+1);break;case"else":if(i>0)break;h===-1&&(h=this.#t+1);break;case"endif":if(i>0){--i;break}return h===-1?(++this.#t,this.#s.aLNum[this.#t]+=n):(this.#a.unshift(this.#t+1),this.#t=h,this.#e=this.#s.aLNum[this.#t]),!1}}throw"[endif]がないままスクリプト終端です"}#st(t){d(t,"count",!1)||this.#K();const{fn:s}=t;return s&&this.#g(s),this.#j({...t,":hEvt1Time":this.#L.popLocalEvts()}),d(t,"clear_local_event",!1)&&this.hTag.clear_event({}),this.#f(s,t.label)}#j(t){const s={...t,":hMp":this.val.cloneMp(),":lenIfStk":this.#a.length};this.#s.aLNum[this.#t]=this.#e,this.#B||(s[":resvToken"]="",this.#w()),this.#h.push(new x(this.#i,this.#t,s)),this.#a.unshift(-1)}#it(t){return d(t,"count",!0)||this.#K(),this.#a[0]=-1,this.#f(t.fn,t.label)}#et(t){if(d(t,"clear",!1))this.#h=[];else if(!this.#h.pop())throw"[pop_stack] スタックが空です";return this.#w(),this.#a=[-1],this.val.setMp({}),!1}#M(t){const s=this.#h.pop();if(!s)throw"[return] スタックが空です";const i=s.csArg;this.#a=this.#a.slice(-i[":lenIfStk"]);const h=i[":hMp"];h&&this.val.setMp(h);const o=i[":resvToken"];o?this.nextToken=()=>(this.#w(),o):this.#w(),i[":hEvt1Time"]&&this.#L.pushLocalEvts(i[":hEvt1Time"]);const{fn:n,label:c}=t;return n||c?this.#f(n,c):s.fn in this.#o?(this.#z(s),!1):this.#f(s.fn,"",s.idx)}#B="";#w(){this.#B="",this.nextToken=this.#W}#$="";#f(t="",s="",i=0){if(!t&&!s&&this.main.errScript("[jump系] fnまたはlabelは必須です"),s?(s.startsWith("*")||this.main.errScript("[jump系] labelは*で始まります"),this.#$=s,this.#$.startsWith("**")||(this.#t=i)):(this.#$="",this.#t=i),!t)return this.analyzeInit(),!1;if(t.includes("@"))throw"[jump系] fn には文字「@」は禁止です";const h=this.#g(t);if(t===this.#i)return this.analyzeInit(),!1;this.#i=t;const o=this.#o[t];if(o)return this.#s=o,this.analyzeInit(),!1;S();const n=new N;let c="";try{c=this.#g(t+"@"),n.add({name:t+":base",url:h}),n.add({name:t,url:c})}catch{n.add({name:t,url:h})}return n.use(async(f,e)=>{try{f.data=await this.sys.dec(f.extension,f.data)}catch(a){this.main.errScript(`[jump系]snロード失敗です fn:${f.name} ${a}`,!1)}e()}).load((f,e)=>{if(c){const a=e[t+":base"].data,r=e[t].data,l=a.split(`
`),u=r.split(`
`),k=l.length,b=u.length;for(let g=0;g<b&&g<k;++g)u[g]||=l[g];e[t].data=u.join(`
`),delete e[t+":base"]}this.nextToken=this.#W,this.#e=1,this.#at(e[t].data),this.hTag.record_place({}),this.analyzeInit(),P()}),!0}analyzeInit(){const t=this.#ot(this.#s,!!this.val.getVal("mp:const.sn.macro.name"),this.#e,this.#$,this.#t);this.#t=t.idx,this.#e=t.ln}nextToken=()=>"";#W(){if(this.#F())return"";this.#ft(),this.#s.aLNum[this.#t]||=this.#e;const t=this.#s.aToken[this.#t];return this.#V(t),++this.#t,t}#V=t=>{};#F(){return this.#t<this.#s.len?!1:(this.main.errScript("スクリプト終端です"),!0)}#ht=/(\*{2,})([^\|]*)/;#nt=/^\[macro\s/;#H=/^\[endmacro[\s\]]/;#ot(t,s,i,h,o){const n=t.aToken.length;if(!h){if(this.#F())return{idx:o,ln:i};if(t.aLNum[o])i=t.aLNum[o];else{i=1;for(let a=0;a<o;++a){t.aLNum[a]||=i;const r=t.aToken[a];r.startsWith(`
`)?i+=r.length:i+=(r.match(/\n/g)??[]).length}t.aLNum[o]=i}return{idx:o,ln:i}}t.aLNum[0]=1;const c=h.match(this.#ht);if(c){h=c[1];let a=o;switch(c[2]){case"before":for(;t.aToken[--a]!==h;)a===0&&m.myTrace("[jump系 無名ラベルbefore] "+i+"行目以前で"+(s?"マクロ内に":"")+"ラベル【"+h+"】がありません","ET"),s&&t.aToken[a].search(this.#nt)>-1&&m.myTrace("[jump系 無名ラベルbefore] マクロ内にラベル【"+h+"】がありません","ET");return{idx:a+1,ln:t.aLNum[a]};case"after":for(;t.aToken[++a]!==h;)a===n&&m.myTrace("[jump系 無名ラベルafter] "+i+"行目以後でマクロ内にラベル【"+h+"】がありません","ET"),t.aToken[a].search(this.#H)>-1&&m.myTrace("[jump系 無名ラベルafter] "+i+"行目以後でマクロ内にラベル【"+h+"】がありません","ET");return{idx:a+1,ln:t.aLNum[a]};default:m.myTrace("[jump系] 無名ラベル指定【label="+h+"】が間違っています","ET")}}i=1;const f=new RegExp("^"+h.replaceAll("*","\\*")+"(?=\\s|;|\\[|\\||$)");let e=!1;for(let a=0;a<n;++a){t.aLNum[a]||=i;const r=t.aToken[a];if(e){this.#c.testTagEndLetml(r)?e=!1:i+=(r.match(/\n/g)??[]).length;continue}const l=r.charCodeAt(0);if(l===10){i+=r.length;continue}if(l===42){if(r.search(f)>-1)return{idx:a+1,ln:i};continue}l===91&&(i+=(r.match(/\n/g)??[]).length,this.#c.testTagLetml(r)&&(e=!0))}throw e?"[let_ml]の終端・[endlet_ml]がありません":(m.myTrace(`[jump系] ラベル【${h}】がありません`,"ET"),"Dummy")}#o=Object.create(null);#at(t){let s="";try{s="ScriptIterator.resolveScript";const i=this.#c.resolveScript(t);s="ScriptIterator.replaceScript_Wildcard",this.#lt(i),this.#o[this.#i]=this.#s=i}catch(i){i instanceof Error?s+=`例外 mes=${i.message}(${i.name})`:s=String(i),this.main.errScript(s,!1)}this.val.touchAreaKidoku(this.#i)}#z(t){this.#i=t.fn,this.#t=t.idx;const s=this.#o[this.#i];s&&(this.#s=s),this.#e=this.#s.aLNum[t.idx]}#rt=/^\[(call|loadplugin)\s/;#ct=/\bfn\s*=\s*[^\s\]]+/;#lt(t){for(let s=t.len-1;s>=0;--s){const i=t.aToken[s];if(!this.#rt.test(i))continue;const[h,o]=_(i);this.#r.parse(o);const n=this.#r.hPrm.fn;if(!n)continue;const{val:c}=n;if(!c||!c.endsWith("*"))continue;t.aToken.splice(s,1,"	","; "+i),t.aLNum.splice(s,1,NaN,NaN);const f=h==="loadplugin"?v.CSS:v.SN,e=this.cfg.matchPath("^"+c.slice(0,-1)+".*",f);for(const a of e){const r=i.replace(this.#ct,"fn="+decodeURIComponent(y(a[f])));t.aToken.splice(s,0,r),t.aLNum.splice(s,0,NaN)}}t.len=t.aToken.length}#ft(){const t=this.val.touchAreaKidoku(this.#i);if(this.#h.length>0){t.record(this.#t);return}this.#m=t.search(this.#t),this.val.setVal_Nochk("tmp","const.sn.isKidoku",this.#m),!this.#m&&t.record(this.#t)}#m=!1;get isKidoku(){return this.#m}#K(){this.val.getAreaKidoku(this.#i)?.erase(this.#t),this.#m=!1}get isNextKidoku(){let t=this.#i,s=this.#t,i=this.#s.len;if(this.#h.length>0){const o=this.#h[0];t=o.fn,s=o.idx;const n=this.#o[t];n&&(i=n.len)}const h=this.val.getAreaKidoku(t);return s===i?!1:h.search(s)}get normalWait(){return this.#m?this.val.tagCh_doWait_Kidoku?this.val.tagCh_msecWait_Kidoku:0:this.val.tagCh_doWait?this.val.tagCh_msecWait:0}#ut(t){return this.#c.bracket2macro(t,this.hTag,this.#s,this.#t),!1}#pt(t){return this.#c.char2macro(t,this.hTag,this.#s,this.#t),!1}#dt=/["'#;\\]　]+/;#mt(t){const{name:s}=t;if(!s)throw"nameは必須です";if(s in this.hTag)throw`[${s}]はタグかすでに定義済みのマクロです`;if(this.#dt.test(s))throw`[${s}]はマクロ名として異常です`;const i=this.#e,h=new x(this.#i,this.#t);for(this.#R+="|"+s,this.#N=new RegExp(`\\[(${this.#R})\\b`),this.hTag[s]=o=>(o.design_unit=t.design_unit,this.#j(o),this.val.setMp(o),this.val.setVal_Nochk("mp","const.sn.macro",JSON.stringify({name:t.name})),this.val.setVal_Nochk("mp","const.sn.me_call_scriptFn",this.#i),this.#e=i,this.#z(h),!1);this.#t<this.#s.len;++this.#t){this.#s.aLNum[this.#t]||=this.#e;const o=this.#s.aToken[this.#t];if(o.search(this.#H)>-1)return++this.#t,!1;const n=o.charCodeAt(0);n===10?this.#e+=o.length:n===91&&(this.#e+=(o.match(/\n/g)??[]).length)}throw`マクロ[${s}]定義の終端・[endmacro]がありません`}#R="call";#N=/\[(call)\b/;#gt(t){if("fn"in t!="label"in t)throw"fnとlabelはセットで指定して下さい";const s=I(t,"place",0),i=this.val.getMark(s);return this.loadFromMark(t,i,2)}loadFromMark(t,s,i=0){this.hTag.clear_event({}),this.val.mark2save(s),this.val.setMp({}),this.#d.recPagebreak();let h=[];i!==1&&(h=this.sndMng.playLoopFromSaveObj(i===2)),d(t,"do_rec",!0)&&(this.#u={hSave:this.val.cloneSave(),hPages:{...s.hPages},aIfStk:[...s.aIfStk]});const o={enabled:this.val.getVal("save:const.sn.autowc.enabled"),text:this.val.getVal("save:const.sn.autowc.text"),time:Number(this.val.getVal("save:const.sn.autowc.time"))};this.hTag.autowc(o),this.#a=[...this.#u.aIfStk],this.#h=[],O.stopAllTw();const n=Promise.allSettled([...h,...this.#d.playback(this.#u.hPages)]).then(()=>this.#d.cover(!1)).catch(l=>console.error("fn:ScriptIterator.ts loadFromMark e:%o",l)),{index:c,fn:f}=t;if(c)return n.then(()=>this.#f(f,"",c)),!0;this.#d.cover(!0),S();const e=String(this.val.getVal("save:const.sn.scriptFn")),a=Number(this.val.getVal("save:const.sn.scriptIdx"));delete this.#o[e];const{label:r}=t;return r?n.then(()=>{this.#i=e,this.#t=a,this.hTag.call({fn:f,label:r})}):n.then(()=>this.#f(e,"",a)),!0}#kt(t){const s=this.val.getMark(0);delete this.#o[y(s.hSave["const.sn.scriptFn"])];const i={};for(const h in this.#o)try{this.#g(h+"@")}catch{i[h]=this.#o[h]}return this.#o=i,t.do_rec=!1,this.loadFromMark(t,s,1)}#u={hSave:{},hPages:{},aIfStk:[-1]};#bt(){if(this.main.isDestroyed())return!1;const{fn:t,idx:s}=this.nowScrIdx();return this.val.setVal_Nochk("save","const.sn.scriptFn",t),this.val.setVal_Nochk("save","const.sn.scriptIdx",s),this.#u={hSave:this.val.cloneSave(),hPages:this.#d.record(),aIfStk:this.#a.slice(this.#h.length)},!1}nowScrIdx(){if(this.#h.length===0)return{fn:this.#i,idx:this.#t};const t=this.#h[0];return{fn:t.fn,idx:t.idx}}nowMark(){return{...this.#u}}nowScrFnLn(){const{fn:t,idx:s}=this.nowScrIdx(),i=this.#o[t],h=this.#l(i,s);return{fn:t,...h}}#vt(t){if(!("place"in t))throw"placeは必須です";const s=Number(t.place);delete t[":タグ名"],delete t.place,t.text=t.text??"",this.#u.json=t,this.val.setMark(s,this.#u);const i=Number(this.val.getVal("sys:const.sn.save.place"));return s===i&&this.val.setVal_Nochk("sys","const.sn.save.place",i+1),!1}recodeDesign(t){let s="",i=0;const h=this.#h.length;if(t.design_unit&&h>0){const f=this.#h[0];s=f.fn,i=f.idx}else s=this.#i,i=this.#t;t[":path"]=this.#k(s);const o=this.#o[s],n=this.#l(o,i);t[":ln"]=n.ln,t[":col_s"]=n.col_s,t[":col_e"]=n.col_e;const c=i-1;t[":idx_tkn"]=c,t[":token"]=o.aToken[c],this.sys.send2Dbg("_recodeDesign",t)}replace(t,s){this.#s.aToken[t]=s}}export{p as ScriptIterator};