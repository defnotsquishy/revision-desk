const libraryKey='fracture-library-v1';
const settingsKey='fracture-settings-v1';
const requestedAccent=new URL(location.href).searchParams.get('accent');
const websiteAccent=['neutral','blue','violet','mint'].includes(requestedAccent)?requestedAccent:'neutral';
function gameLink(path){if(websiteAccent==='neutral')return path;const url=new URL(path,location.href);url.searchParams.set('accent',websiteAccent);return url.href;}
const presets={
  low:{resolution:.65,shadows:false,particles:false,effects:true,shake:false,ragdolls:false,destruction:false},
  medium:{resolution:.85,shadows:false,particles:true,effects:true,shake:true,ragdolls:true,destruction:true},
  high:{resolution:1,shadows:true,particles:true,effects:true,shake:true,ragdolls:true,destruction:true},
  ultra:{resolution:1.25,shadows:true,particles:true,effects:true,shake:true,ragdolls:true,destruction:true}
};
const defaults={preset:'medium',...presets.medium,bloom:false,motionBlur:false,sensitivity:1,volume:.35,stats:true};
let available=true;
function read(key,fallback){try{const raw=localStorage.getItem(key);return raw?JSON.parse(raw):fallback;}catch{available=false;return fallback;}}
function write(key,value){try{localStorage.setItem(key,JSON.stringify(value));available=true;return true;}catch{available=false;return false;}}
const bounded=(v,min,max,fallback)=>typeof v==='number'&&Number.isFinite(v)?Math.min(max,Math.max(min,v)):fallback;
export function normaliseSettings(raw){const value={...defaults};if(!raw||typeof raw!=='object')return value;for(const k of ['shadows','particles','effects','shake','ragdolls','destruction','stats'])if(typeof raw[k]==='boolean')value[k]=raw[k];if(['low','medium','high','ultra','custom'].includes(raw.preset))value.preset=raw.preset;value.resolution=bounded(raw.resolution,.5,1.5,defaults.resolution);value.sensitivity=bounded(raw.sensitivity,.2,3,1);value.volume=bounded(raw.volume,0,1,.35);return value;}
let settings=normaliseSettings(read(settingsKey,null));
let library=read(libraryKey,null);
library={pinned:library?.pinned===true,recent:typeof library?.recent==='number'&&Number.isFinite(library.recent)&&library.recent>0&&library.recent<=Date.now()?library.recent:0};
export const gameState={
  link:gameLink,
  library:()=>({...library}),
  pin(enabled){library.pinned=!!enabled;return write(libraryKey,library);},
  played(){library.recent=Date.now();return write(libraryKey,library);},
  settings:()=>({...settings}),
  update(patch){settings=normaliseSettings({...settings,...patch});return write(settingsKey,settings);},
  preset(name){if(!Object.hasOwn(presets,name))return false;settings={...settings,...presets[name],preset:name};return write(settingsKey,settings);},
  available:()=>available
};
export function bindTheme(button){
  document.documentElement.dataset.accent=websiteAccent;
  if(websiteAccent!=='neutral')document.querySelectorAll('a').forEach(link=>{
    const url=new URL(link.getAttribute('href'),location.href),here=new URL(location.href);
    if(url.origin===here.origin&&/\/games(?:\/|$)/.test(url.pathname))link.setAttribute('href',gameLink(url.href));
  });
  function render(){const dark=document.documentElement.dataset.theme==='dark';button.textContent=dark?'Light mode':'Dark mode';button.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');}
  button.addEventListener('click',()=>window.RevisionAppearance.update({theme:document.documentElement.dataset.theme==='dark'?'light':'dark'}));
  window.addEventListener('revision-appearance-change',render);render();
}
