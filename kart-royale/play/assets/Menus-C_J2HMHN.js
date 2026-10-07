import{a as e}from"./KartVisual-BWAionSr.js";import{a as t,i as n,n as r,r as i,t as a}from"./Game-DSbmqdnD.js";var o=`kartroyale.controlsSeen`;function s(e){let t=document.createElement(`template`);return t.innerHTML=e.trim(),t.content.firstElementChild}function c(e){return e+(e===1?`st`:e===2?`nd`:e===3?`rd`:`th`)}var l={rainbow:[`#2a1060`,`#ffffff`],harbor:[`#7a3a1a`,`#fff3d6`],frost:[`#123a66`,`#eaf6ff`]},u=new Map;function d(e){let t=u.get(e.id);if(t)return t;let n=document.createElement(`canvas`);n.width=320,n.height=240;let r=n.getContext(`2d`),i=1/0,a=-1/0,o=1/0,s=-1/0;for(let t of e.pos)i=Math.min(i,t.x),a=Math.max(a,t.x),o=Math.min(o,t.z),s=Math.max(s,t.z);let c=Math.min((n.width-44)/(a-i),(n.height-44)/(s-o)),d=(n.width-(a-i)*c)/2,f=(n.height-(s-o)*c)/2,p=t=>[n.width-d-(e.pos[t].x-i)*c,n.height-f-(e.pos[t].z-o)*c],[m,h]=l[e.theme]??l.rainbow;r.lineJoin=r.lineCap=`round`;for(let[t,n]of[[16,m],[9,h]]){r.strokeStyle=n,r.lineWidth=t,r.beginPath();for(let t=0;t<e.N;t+=2){let[n,i]=p(t);t===0||e.gap[t]?r.moveTo(n,i):r.lineTo(n,i)}r.closePath(),r.stroke()}let[g,_]=p(Math.floor(e.startS));r.fillStyle=`#111`,r.fillRect(g-9,_-3,18,6);let v=n.toDataURL();return u.set(e.id,v),v}var f=class{onAction;root;items=[];focus=0;cols=1;constructor(e,t){this.onAction=t,this.root=s(e)}bind(e=`[data-nav]`){return this.items=[...this.root.querySelectorAll(e)],this.items.forEach((e,t)=>{e.addEventListener(`mouseenter`,()=>this.setFocus(t,!1)),e.addEventListener(`click`,()=>{a.unlock(),this.setFocus(t,!1),this.activate()})}),this.setFocus(this.focus,!1),this}setFocus(e,t=!0){this.items.length&&(e=(e+this.items.length)%this.items.length,e!==this.focus&&t&&a.sfx(`menuMove`),this.focus=e,this.items.forEach((t,n)=>t.classList.toggle(`focus`,n===e)))}activate(){let e=this.items[this.focus];e&&e.dataset.kind!==`slider`&&(a.sfx(`menuConfirm`),e.dispatchEvent(new CustomEvent(`activate`)))}handle(e){let t=this.items[this.focus];if(t?.dataset.kind===`slider`&&(e===`left`||e===`right`)){let n=t.querySelector(`input`);n.value=String(Math.max(0,Math.min(100,Number(n.value)+(e===`left`?-10:10)))),n.dispatchEvent(new Event(`input`)),a.sfx(`menuMove`);return}let n=this.items.length;if(this.cols>1&&(e===`up`||e===`down`)){let t=this.focus+(e===`up`?-this.cols:this.cols);t>=0&&t<n&&this.setFocus(t)}else e===`up`||e===`left`?this.setFocus(this.focus-1):e===`down`||e===`right`?this.setFocus(this.focus+1):e===`confirm`?this.activate():this.onAction?.(e)}on(e,t){return this.root.querySelector(e)?.addEventListener(`activate`,t),this}},p=class{game;panel=null;handler=null;layer;selected=0;selectedTrack=0;resultsShown=!1;note;constructor(e){this.game=e,this.layer=document.createElement(`div`),this.layer.className=`menu-layer`,e.ui.appendChild(this.layer),this.note=s(`<div class="fan-note">Unofficial fan experiment · not affiliated with or endorsed by Nintendo or LeBron James</div>`),e.ui.appendChild(this.note),e.input.onMenu(e=>{let t=this.game.mode===`race`&&!this.resultsShown;e===`hud`&&t&&this.game.toggleHud(),e===`capture`&&t&&!this.game.paused&&this.game.cycleCamera(),e===`camera`&&this.game.mode===`race`&&!this.panel&&this.game.scene?.snapCamera(),this.handler&&this.handler(e)});let t=()=>{a.unlock(),a.music&&!a.music.playing&&(this.game.mode===`race`?a.music.play(`race`,this.game.track.theme):a.music.play(`menu`))};addEventListener(`pointerdown`,t),addEventListener(`keydown`,t),this.selected=Math.max(0,n.findIndex(e=>e.id===`lebron`)),e.hooks.onPlayerFinish=()=>{let e=this.game.raceSerial;setTimeout(()=>{this.game.raceSerial===e&&this.results()},3500)},e.hooks.onRaceComplete=()=>this.refreshResults()}pendingStart=0;show(e){this.pendingStart&&=(clearTimeout(this.pendingStart),0),this.layer.innerHTML=``,this.panel=e,e?(this.layer.appendChild(e.root),this.handler=t=>e.handle(t)):this.handler=null}bar=null;loading(){let e=new f(`<div class="screen loading"><div class="logo small">KART <span>ROYALE</span></div><div class="loadbar"><i></i></div><div class="loadtxt">Warming up the engines…</div></div>`);this.show(e),this.bar=e.root.querySelector(`.loadbar i`)}setProgress(e){this.bar&&(this.bar.style.width=`${Math.round(e*100)}%`)}title(){this.game.mode!==`attract`&&this.game.startAttract(),this.note.style.display=``;let e=new f(`
      <div class="screen title">
        <div class="logo">KART <span>ROYALE</span></div>
        <div class="subtitle">12 racers · 3 courses Grand Prix</div>
        <div class="menu-col">
          <button data-nav class="btn big" id="t-race">Race!</button>
          <button data-nav class="btn" id="t-controls">Controls</button>
          <button data-nav class="btn" id="t-settings">Sound</button>
          ${m(`t-full`)}
        </div>
        <div class="hint">Enter / Space / A to select${g()?`<br/>Best on a computer with a keyboard or a controller (no touch controls yet)`:``}</div>
      </div>`).bind();e.on(`#t-race`,()=>this.select()),e.on(`#t-full`,()=>h(e.root.querySelector(`#t-full`))),e.on(`#t-controls`,()=>this.controls(()=>this.title())),e.on(`#t-settings`,()=>this.settings(()=>this.title())),this.show(e),a.ctx&&a.music?.play(`menu`)}select(){this.game.showMenu(n[this.selected].id),this.note.style.display=`none`;let t=new f(`
      <div class="screen select">
        <div class="sel-title">Choose your driver</div>
        <div class="cards">${n.map((t,n)=>`
      <div class="card ${t.guest?`guest`:``}" data-nav data-i="${n}" style="--c1:${t.color};--c2:${t.color2}">
        <img src="${e(t.portrait)}" alt="${t.name}"/>
        <div class="card-name">${t.name}</div>
        ${t.guest?`<div class="badge">GUEST</div>`:``}
      </div>`).join(``)}</div>
        <div class="plate">
          <div class="plate-kart"></div>
          <div class="plate-name"></div>
          <div class="plate-tag"></div>
          <div class="stats"></div>
        </div>
        <div class="sel-hints"><b>←/→</b> choose <b>Enter</b> race <b>Esc</b> back</div>
      </div>`,e=>{(e===`back`||e===`pause`)&&(a.sfx(`menuBack`),this.title())}).bind();t.focus=this.selected,t.cols=4;let r=()=>{let e=n[t.focus];this.selected=t.focus,this.game.menu?.show(e.id),t.root.querySelector(`.plate-kart`).textContent=e.kartName,t.root.querySelector(`.plate-name`).textContent=e.name,t.root.querySelector(`.plate-tag`).textContent=`${e.weightClass} · ${e.tagline}`;let r=(e,t)=>`<div class="stat"><span>${e}</span><i>${`<b></b>`.repeat(t)}${`<em></em>`.repeat(5-t)}</i></div>`;t.root.querySelector(`.stats`).innerHTML=r(`Speed`,e.bars.speed)+r(`Accel`,e.bars.accel)+r(`Handling`,e.bars.handling)+r(`Weight`,e.bars.weight),t.root.style.setProperty(`--accent`,e.color)},i=t.setFocus.bind(t);t.setFocus=(e,t=!0)=>{i(e,t),r()},t.items.forEach(e=>e.addEventListener(`activate`,()=>{if(this.pendingStart)return;let e=t.focus;this.game.menu?.cheer(),(()=>{try{return localStorage.getItem(o)===`1`}catch{return!1}})(),this.pendingStart=window.setTimeout(()=>{this.pendingStart=0,this.selected=e,this.trackSelect()},650)})),this.show(t),t.setFocus(this.selected,!1)}trackSelect(){this.game.showMenu(n[this.selected].id),this.note.style.display=`none`;let e=new f(`
      <div class="screen tracks">
        <div class="sel-title">Choose a course</div>
        <div class="tcards">${i.map((e,t)=>{let n=this.game.getTrack(e.id);return`
      <div class="tcard theme-${e.theme}" data-nav data-i="${t}">
        <img src="${d(n)}" alt="${e.name}"/>
        <div class="tcard-name">${e.name}</div>
        <div class="tcard-sub">${e.subtitle}</div>
        <div class="tcard-meta">${(n.length/1e3).toFixed(1)} km · ${e.laps} laps · ${n.jumps.length} jump${n.jumps.length===1?``:`s`}</div>
      </div>`}).join(``)}</div>
        <div class="sel-hints"><b>←/→</b> choose <b>Enter</b> race <b>Esc</b> back</div>
      </div>`,e=>{(e===`back`||e===`pause`)&&(a.sfx(`menuBack`),this.select())}).bind();e.focus=this.selectedTrack,e.items.forEach(t=>t.addEventListener(`activate`,()=>{this.selectedTrack=e.focus,(()=>{try{return localStorage.getItem(o)===`1`}catch{return!1}})()?this.go():this.controls(()=>this.trackSelect(),!0)})),this.show(e),e.setFocus(this.selectedTrack,!1)}go(){let e=n[this.selected].id;this.resultsShown=!1,this.game.startRace(e,void 0,i[this.selectedTrack].id),this.attachRace()}attachRace(){this.note.style.display=`none`,this.show(null),this.handler=e=>{e===`pause`&&!this.resultsShown&&this.pause()}}controls(e,t=!1){let n=e=>`<kbd>${e}</kbd>`,r=(e,t,n)=>`<tr><td>${e}</td><td>${t}</td><td>${n}</td></tr>`,i=this.game.input.gamepadName?`<div class="pad-ok">Controller detected: ${this.game.input.gamepadName.slice(0,40)}</div>`:`<div class="pad-ok dim">Connect a controller and press any button to use it</div>`,s=new f(`
      <div class="screen controls">
        <div class="sel-title">Controls</div>
        <table class="ctl">
          <tr><th></th><th>Keyboard</th><th>Controller</th></tr>
          ${r(`Steer`,n(`A`)+n(`D`)+` or `+n(`←`)+n(`→`),`Left stick`)}
          ${r(`Accelerate`,n(`W`)+` or `+n(`↑`),`A / RT`)}
          ${r(`Brake / reverse`,n(`S`)+` or `+n(`↓`),`B / LT`)}
          ${r(`Hop &amp; drift (hold, steer)`,n(`Space`)+` or `+n(`Shift`),`RB / X`)}
          ${r(`Use item: shells &amp; bob-ombs go ahead (hold ↓ to aim back), bananas drop behind`,n(`E`)+` or `+n(`K`),`LB (stick ↑ lobs a banana)`)}
          ${r(`Look behind`,n(`Q`),`—`)}
          ${r(`Reset camera`,n(`C`),`Y`)}
          ${r(`Hero camera`,n(`F`),`—`)}
          ${r(`Hide HUD`,n(`H`),`Back`)}
          ${r(`Pause`,n(`Esc`)+` or `+n(`P`),`Start`)}
        </table>
        <div class="tips">Tip: hold <b>Accelerate</b> just after <b>2</b> for a rocket start. Drift longer for <span class="c1">blue</span> → <span class="c2">orange</span> → <span class="c3">purple</span> sparks, then release for a boost.</div>
        ${i}
        <div class="menu-row">
          ${t?`<button data-nav class="btn big" id="c-go">Start race</button>`:``}
          <button data-nav class="btn" id="c-back">Back</button>
        </div>
      </div>`,t=>{(t===`back`||t===`pause`)&&(a.sfx(`menuBack`),e())}).bind();s.on(`#c-go`,()=>{try{localStorage.setItem(o,`1`)}catch{}this.go()}),s.on(`#c-back`,e),this.show(s)}settings(e){let t=a.vol,n=(e,t,n)=>`<div class="slider" data-nav data-kind="slider" id="${e}"><span>${t}</span><input type="range" min="0" max="100" step="5" value="${Math.round(n*100)}"/><em>${Math.round(n*100)}</em></div>`,r=new f(`
      <div class="screen settings">
        <div class="sel-title">Sound</div>
        <div class="menu-col wide">
          ${n(`s-master`,`Master`,t.master)}
          ${n(`s-music`,`Music`,t.music)}
          ${n(`s-sfx`,`Effects`,t.sfx)}
          <button data-nav class="btn" id="s-back">Back</button>
        </div>
        <div class="hint">←/→ adjust</div>
      </div>`,t=>{(t===`back`||t===`pause`)&&(a.sfx(`menuBack`),e())}).bind();for(let[e,t]of[[`#s-master`,`master`],[`#s-music`,`music`],[`#s-sfx`,`sfx`]]){let n=r.root.querySelector(e),i=n.querySelector(`input`),o=n.querySelector(`em`);i.addEventListener(`input`,()=>{a.unlock(),a.setVolume(t,Number(i.value)/100),o.textContent=i.value,t===`sfx`&&a.sfx(`menuMove`)})}r.on(`#s-back`,e),this.show(r)}pause(){let e=this.game;e.setPaused(!0);let t=new f(`
      <div class="screen pause">
        <div class="sel-title pause-title">Paused</div>
        <div class="menu-col">
          <button data-nav class="btn big" id="p-resume">Resume</button>
          <button data-nav class="btn" id="p-restart">Restart race</button>
          <button data-nav class="btn" id="p-photo">Photo mode</button>
          <button data-nav class="btn" id="p-controls">Controls</button>
          <button data-nav class="btn" id="p-sound">Sound</button>
          <button data-nav class="btn" id="p-select">Change driver</button>
          <button data-nav class="btn" id="p-title">Quit to title</button>
          ${m(`p-full`)}
        </div>
      </div>`,e=>{(e===`pause`||e===`back`)&&n()}).bind(),n=()=>{e.setPaused(!1),this.attachRace()};t.on(`#p-resume`,n),t.on(`#p-restart`,()=>this.go()),t.on(`#p-photo`,()=>this.photoMode()),t.on(`#p-controls`,()=>this.controls(()=>this.pause())),t.on(`#p-sound`,()=>this.settings(()=>this.pause())),t.on(`#p-select`,()=>this.select()),t.on(`#p-title`,()=>this.title()),t.on(`#p-full`,()=>h(t.root.querySelector(`#p-full`))),this.show(t)}photoMode(){let e=this.game;e.setPhoto(!0);let t=new f(`<div class="screen photo"><div class="photo-hint"><b>Photo mode</b> · ←/→ orbit · ↑/↓ height · Q/E zoom · Esc back</div></div>`,t=>{(t===`pause`||t===`back`)&&(e.setPhoto(!1),this.pause())});this.show(t)}results(){if(this.game.mode!==`race`)return;this.resultsShown=!0,this.game.photo&&(this.game.setPhoto(!1),this.game.scene&&(this.game.scene.camMode=`photo`)),this.game.paused&&this.game.setPaused(!1),this.game.hud&&(this.game.hud.visible=!1);let e=new f(`
      <div class="screen results">
        <div class="res-title"></div>
        <div class="res-table"></div>
        <div class="menu-row">
          <button data-nav class="btn big" id="r-again">Race again</button>
          <button data-nav class="btn" id="r-select">Change driver</button>
          <button data-nav class="btn" id="r-title">Title</button>
        </div>
      </div>`).bind();e.on(`#r-again`,()=>this.go()),e.on(`#r-select`,()=>this.select()),e.on(`#r-title`,()=>this.title()),this.show(e),this.refreshResults();let t=()=>{this.panel===e&&(this.refreshResults(),setTimeout(t,500))};t()}refreshResults(){let n=this.game.world,i=this.layer.querySelector(`.res-table`);if(!n||!i)return;let a=n.race.player,o=this.layer.querySelector(`.res-title`);o.innerHTML=`${c(a.position)} <small>place</small>`,o.dataset.pos=String(a.position),i.innerHTML=n.race.standings.map(n=>{let i=t(n.def.charId),a=n.finished?r(n.finishTime):`<span class="running">Lap ${Math.min(n.laps,n.lap)}…</span>`,o=isFinite(n.bestLap)?r(n.bestLap):`—`;return`<div class="res-row ${n.def.isPlayer?`me`:``}" style="--c1:${i.color}">
        <b class="pos">${n.position}</b><img src="${e(i.portrait)}"/><span class="nm">${i.name}</span>
        <span class="tm">${a}</span><span class="bl">best ${o}</span></div>`}).join(``)}};function m(e){return document.fullscreenEnabled?`<button data-nav class="btn" id="${e}">${document.fullscreenElement?`Exit fullscreen`:`Fullscreen`}</button>`:``}function h(e){let t=()=>{e&&(e.textContent=document.fullscreenElement?`Exit fullscreen`:`Fullscreen`)};(document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()).then(t,t)}function g(){return matchMedia(`(pointer: coarse)`).matches&&!matchMedia(`(hover: hover)`).matches}export{p as MenuFlow};