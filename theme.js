/* Device preferences only. Account profile/accent remain owned by store.js. */
(() => {
  'use strict';
  const key='revision-desk-appearance-v1';
  const defaults={theme:'dark',density:'default',font:'medium',motion:'system',shortcuts:true};
  const allowed={theme:['dark','light','system'],density:['compact','default','comfortable'],font:['small','medium','large'],motion:['system','reduce']};
  const media=window.matchMedia?.('(prefers-color-scheme: dark)');
  let value={...defaults},saved=true;
  function normalise(raw){const next={...defaults};if(raw&&typeof raw==='object'){for(const field of Object.keys(allowed))if(allowed[field].includes(raw[field]))next[field]=raw[field];if(typeof raw.shortcuts==='boolean')next.shortcuts=raw.shortcuts;}return next;}
  try {const raw=localStorage.getItem(key);value=raw?normalise(JSON.parse(raw)):{...defaults,theme:localStorage.getItem('revision-desk-theme')==='light'?'light':'dark'};}catch{saved=false;}
  function apply(){const root=document.documentElement;root.dataset.theme=value.theme==='system'?(media?.matches?'dark':'light'):value.theme;root.dataset.density=value.density;root.dataset.font=value.font;root.dataset.motion=value.motion;document.querySelector('meta[name="theme-color"]')?.setAttribute('content',root.dataset.theme==='dark'?'#0c0c0d':'#f7f8fc');}
  function announce(){window.dispatchEvent(new CustomEvent('revision-appearance-change'));}
  function update(patch){value=normalise({...value,...patch});apply();try{localStorage.setItem(key,JSON.stringify(value));saved=true;}catch{saved=false;}announce();}
  window.RevisionAppearance={get:()=>({...value}),saved:()=>saved,update,reset:()=>update(defaults)};
  media?.addEventListener('change',()=>{if(value.theme==='system'){apply();announce();}});
  window.addEventListener('storage',event=>{if(event.key!==key)return;try{value=normalise(event.newValue?JSON.parse(event.newValue):null);saved=true;apply();announce();}catch{saved=false;announce();}});
  apply();
})();
