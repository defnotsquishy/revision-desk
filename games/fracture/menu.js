import {gameState,bindTheme} from '../state.js';
const $=id=>document.getElementById(id);
bindTheme($('games-theme'));
let session=null,loadController=null,generation=0,timeout=null,loading=false,trigger=null;
const observedCooldowns=new Map();
const dialog=$('fracture-dialog');
function view(name){for(const value of ['menu','loading','error','session'])$('fracture-'+value).hidden=value!==name;document.title=(name==='session'?'Training':name==='loading'?'Loading':name==='error'?'Could not start':'FRACTURE')+' — Revision Desk Games';}
function settingsUI(){const settings=gameState.settings();$('fracture-preset').value=settings.preset;document.querySelectorAll('[data-setting]').forEach(input=>{input.type==='checkbox'?input.checked=settings[input.dataset.setting]:input.value=settings[input.dataset.setting];});$('fracture-resolution-value').textContent=Math.round(settings.resolution*100)+'%';$('fracture-sensitivity-value').textContent=settings.sensitivity.toFixed(1)+'×';$('fracture-volume-value').textContent=Math.round(settings.volume*100)+'%';$('fracture-settings-status').textContent=gameState.available()?'Game settings are saved on this device. Revision data is unchanged.':'Game settings apply for now, but browser storage could not save them.';}
function panel(name){const titles={pause:'Paused',characters:'Characters',help:'Controls',graphics:'Graphics',audio:'Audio'};document.querySelectorAll('[data-menu-panel]').forEach(section=>section.hidden=section.dataset.menuPanel!==name);$('fracture-dialog-title').textContent=titles[name]||'Menu';$('fracture-panel-back').hidden=!session||name==='pause';settingsUI();}
function openPanel(name,button){if(loading)return;trigger=button||trigger;session?.pause();panel(name);if(!dialog.open)dialog.showModal();$('fracture-dialog-close').textContent=session?'Resume':'Close';}
function closePanel(){if(dialog.open)dialog.close();if(session){session.resume();}else trigger?.focus();}
function stopLoad(){generation++;loadController?.abort();loadController=null;clearTimeout(timeout);timeout=null;loading=false;$('fracture-play').disabled=false;}
function leave(){stopLoad();session?.dispose();session=null;if(dialog.open)dialog.close();view('menu');$('fracture-title').focus();}
function fail(message){stopLoad();session?.dispose();session=null;if(dialog.open)dialog.close();$('fracture-error-message').textContent=message;view('error');$('fracture-error-title').focus();}
function frame(value){
  $('fracture-health').value=value.health;
  $('fracture-health').max=value.maxHealth;
  $('fracture-health-text').textContent=Math.ceil(value.health)+' / '+value.maxHealth;
  $('fracture-combat-state').textContent=value.state;
  $('fracture-dummy-health').textContent=Math.ceil(value.dummyHealth)+' / 100';
  $('fracture-stats').hidden=!gameState.settings().stats;
  $('fracture-stats-text').textContent='Damage '+Math.round(value.stats.damage)+' · Hits '+value.stats.hits;
  $('fracture-combo-text').textContent='Combo '+Math.round(value.stats.comboDamage)+' · DPS '+value.stats.dps.toFixed(1);
  $('fracture-fps').textContent=gameState.settings().stats?Math.round(value.fps)+' FPS':'';
  $('fracture-awakening').value=value.awakening;
  $('fracture-awakening-text').textContent=value.awakenedSeconds>0?'AWAKENED · '+Math.ceil(value.awakenedSeconds)+'s remaining':'G · Awakening '+Math.floor(value.awakening)+'%';
  $('fracture-hud').dataset.awakened=String(value.awakenedSeconds>0);
  document.querySelectorAll('[data-ability-slot]').forEach((slot,index)=>{
    const key='ability'+(index+1),remaining=value.cooldowns[key]||0;
    // Measure each actual cooldown rather than mapping all durations to one arbitrary scale.
    const previous=observedCooldowns.get(key);
    const duration=remaining>0&&previous?.name===value.abilities[index]?Math.max(remaining,previous.duration):remaining;
    if(remaining>0)observedCooldowns.set(key,{name:value.abilities[index],duration});
    else observedCooldowns.delete(key);
    slot.querySelector('strong').textContent=value.abilities[index];
    slot.querySelector('span').textContent=remaining>0?remaining.toFixed(1)+'s':'Ready';
    slot.style.setProperty('--cooldown',remaining>0?(remaining/duration*100)+'%':'0%');
  });
  const dash=value.cooldowns.dash||0,special=value.cooldowns.special||0;
  $('fracture-special-text').textContent='Q · Dash '+(dash>0?dash.toFixed(1)+'s':'ready')+'   R · Vector Shift '+(special>0?special.toFixed(1)+'s':'ready');
}
async function play(){if(loading||session)return;const token=++generation;loadController=new AbortController();const signal=loadController.signal;loading=true;$('fracture-play').disabled=true;view('loading');$('fracture-load-stage').textContent='Loading game engine…';$('loading-title').focus();timeout=setTimeout(()=>{if(token===generation)fail('Loading took too long. Check your connection, then try again. You can still return to the Games library.');},45000);try{const engine=await import('./assets/runtime.js');if(signal.aborted||token!==generation)return;view('session');const launched=await engine.launchGame({container:$('fracture-viewport'),settings:gameState.settings(),signal,onStage:stage=>{if(token===generation){view('loading');$('fracture-load-stage').textContent=stage;}},onFrame:frame,onPause:()=>{if(session)openPanel('pause',$('fracture-menu-button'));},onError:message=>{if(token===generation)fail(message);}});if(signal.aborted||token!==generation){launched.dispose();return;}clearTimeout(timeout);timeout=null;loading=false;session=launched;$('fracture-play').disabled=false;gameState.played();view('session');$('fracture-viewport').querySelector('canvas')?.focus();}catch(error){if(token!==generation||signal.aborted)return;fail(error instanceof Error?error.message:'The game could not load. Check your connection and browser graphics support, then try again.');}}
$('fracture-play').addEventListener('click',play);$('fracture-retry').addEventListener('click',play);$('fracture-back').addEventListener('click',leave);$('fracture-cancel-load').addEventListener('click',leave);$('fracture-leave').addEventListener('click',leave);$('fracture-resume').addEventListener('click',closePanel);$('fracture-dialog-close').addEventListener('click',closePanel);$('fracture-menu-button').addEventListener('click',()=>openPanel('pause',$('fracture-menu-button')));$('fracture-panel-back').addEventListener('click',()=>panel('pause'));
$('fracture-reset-training').addEventListener('click',()=>{session?.resetTraining();observedCooldowns.clear();$('fracture-settings-status').textContent='Training player, dummies, damage statistics and props reset. Your revision is unchanged.';});
document.querySelectorAll('[data-open-panel]').forEach(button=>button.addEventListener('click',()=>openPanel(button.dataset.openPanel,button)));
dialog.addEventListener('cancel',event=>{event.preventDefault();closePanel();});
document.querySelectorAll('[data-setting]').forEach(input=>input.addEventListener('input',()=>{const key=input.dataset.setting,value=input.type==='checkbox'?input.checked:Number(input.value);gameState.update({[key]:value,...(['resolution','shadows','particles','effects','shake','ragdolls','destruction'].includes(key)?{preset:'custom'}:{})});session?.updateSettings(gameState.settings());settingsUI();}));
$('fracture-preset').addEventListener('change',event=>{if(event.target.value==='custom')gameState.update({preset:'custom'});else gameState.preset(event.target.value);session?.updateSettings(gameState.settings());settingsUI();});
$('fracture-join-form').addEventListener('submit',event=>event.preventDefault());
window.addEventListener('pagehide',()=>{stopLoad();session?.dispose();session=null;});
settingsUI();view('menu');
