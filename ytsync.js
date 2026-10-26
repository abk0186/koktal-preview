(function(){
var players=[],seen=new WeakSet(),ready=false;
function isYT(f){return /youtube(-nocookie)?\.com\/embed\//.test(f.src||"")}
function fix(f){if(!/enablejsapi=1/.test(f.src)){f.src=f.src+(f.src.indexOf("?")<0?"?":"&")+"enablejsapi=1"}}
function reg(f){if(!ready||seen.has(f)||!isYT(f))return;seen.add(f);fix(f);
 var p=new YT.Player(f,{events:{onStateChange:function(e){if(e.data===YT.PlayerState.PLAYING){players.forEach(function(o){if(o!==p&&o.pauseVideo&&o.getPlayerState&&o.getPlayerState()===1)o.pauseVideo()})}}}});
 players.push(p)}
function scan(){document.querySelectorAll("iframe").forEach(reg)}
window.ktPlayers=players;
var prev=window.onYouTubeIframeAPIReady;
window.onYouTubeIframeAPIReady=function(){ready=true;scan();if(prev)prev();
 new MutationObserver(scan).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:["src"]})};
var s=document.createElement("script");s.src="https://www.youtube.com/iframe_api";document.head.appendChild(s);
})();
