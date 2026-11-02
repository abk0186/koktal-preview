(function(){
var players=[],seen=new WeakSet(),ready=false;
function isYT(f){return /youtube(-nocookie)?\.com\/embed\//.test(f.src||"")}
function fix(f){var a=f.getAttribute("allow")||"";if(a.indexOf("fullscreen")<0)f.setAttribute("allow",(a?a+"; ":"")+"fullscreen");f.setAttribute("allowfullscreen","");f.removeAttribute("width");f.removeAttribute("height");if(!/enablejsapi=1/.test(f.src)){f.src=f.src+(f.src.indexOf("?")<0?"?":"&")+"enablejsapi=1"}}
function reg(f){if(!ready||seen.has(f)||!isYT(f))return;seen.add(f);fix(f);
 var p=new YT.Player(f,{width:"100%",height:"100%",events:{onStateChange:function(e){if(e.data===YT.PlayerState.PLAYING){players.forEach(function(o){if(o!==p&&o.pauseVideo&&o.getPlayerState&&o.getPlayerState()===1)o.pauseVideo()})}}}});
 players.push(p)}
function scan(){document.querySelectorAll("iframe").forEach(reg)}
window.ktPlayers=players;
var prev=window.onYouTubeIframeAPIReady;
window.onYouTubeIframeAPIReady=function(){ready=true;scan();if(prev)prev();
 new MutationObserver(scan).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:["src"]})};
var s=document.createElement("script");s.src="https://www.youtube.com/iframe_api";document.head.appendChild(s);
})();
(function(){
var cur=null;
function close(){if(!cur)return;var w=cur;cur=null;w.classList.remove("ov");document.documentElement.classList.remove("ovlock");var d=document;if(d.fullscreenElement===w||d.webkitFullscreenElement===w){(d.exitFullscreen||d.webkitExitFullscreen).call(d)}}
function open(w){if(cur)close();cur=w;w.classList.add("ov");document.documentElement.classList.add("ovlock");
 var r=w.requestFullscreen||w.webkitRequestFullscreen;if(r){try{var p=r.call(w);if(p&&p.catch)p.catch(function(){})}catch(e){}}}
function onfs(){var d=document;if(cur&&!(d.fullscreenElement||d.webkitFullscreenElement)&&cur._fs)close();if(cur)cur._fs=!!(d.fullscreenElement||d.webkitFullscreenElement)}
document.addEventListener("fullscreenchange",onfs);document.addEventListener("webkitfullscreenchange",onfs);
document.addEventListener("keydown",function(e){if(e.key==="Escape")close()});
document.querySelectorAll(".yt").forEach(function(w){var f=w.querySelector("iframe");if(!f)return;
 var m=(f.getAttribute("src")||"").match(/embed\/([\w-]{6,})/);
 var c=document.createElement("button");c.type="button";c.className="ytclose";c.setAttribute("aria-label","Жабу / Закрыть");c.textContent="✕";c.onclick=close;w.appendChild(c);
 var x=document.createElement("div");x.className="ytx";
 var b=document.createElement("button");b.type="button";b.innerHTML="⛶ Толық экран / На весь экран";b.onclick=function(){open(w)};x.appendChild(b);
 if(m){var a=document.createElement("a");a.href="https://youtu.be/"+m[1];a.target="_blank";a.rel="noopener";a.textContent="YouTube-та ашу / Открыть в YouTube";x.appendChild(a)}
 w.parentNode.insertBefore(x,w.nextSibling)});
window.ktOverlay={open:open,close:close};
})();
