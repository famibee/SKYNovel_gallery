function e(){let e=document.createElement(`div`);e.textContent=`DevToolは禁止されています`,e.style.cssText=`
		position: fixed; inset: 0; z-index: 2147483647;
		display: none; align-items: center; justify-content: center;
		background: rgba(0, 0, 0, 0.85); color: white; font-size: 2em;
		text-align: center; pointer-events: none;
	`,document.body.appendChild(e);let t=!1,n=()=>{let n=window.outerWidth-window.innerWidth>160||window.outerHeight-window.innerHeight>160;n!==t&&(t=n,e.style.display=n?`flex`:`none`)};globalThis.addEventListener(`resize`,n),setInterval(n,500),n()}export{e as initDevToolsGuard};