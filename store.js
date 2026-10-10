// One data owner: guest data stays local; signed-in data belongs only to its UID.
(() => {
  'use strict';
  const guestKey = 'revision-desk-progress-v2';
  const decks = new Map(window.FLASHCARD_DATA.subjects.flatMap(s => s.decks.map(d => [d.id,d])));
  const cards = new Map([...decks.values()].flatMap(d => d.cards.map(c => [c.id,d.id])));
  const retiredCards = new Set([...decks.values()].flatMap(d => d.retiredCardIds || []));
  const validRating = value => ['know','learn','unsure'].includes(value);
  const defaults = () => ({name:'Revision student',photo:'',badge:'Starter',accent:'neutral'});
  const cleanRatings = raw => Object.fromEntries(Object.entries(raw || {}).filter(([id,v]) => cards.has(id) && validRating(v)));
  const cleanHistory = raw => Array.isArray(raw) ? raw.filter(p => p && (decks.has(p.deck) || decks.has(p.deck?.replace(/-foundation$/,''))) && /^\d{4}-\d{2}-\d{2}$/.test(p.date) && Number.isFinite(Date.parse(p.date)) && Number.isInteger(p.known) && Number.isInteger(p.total) && p.total > 0 && p.total <= 60 && p.known >= 0 && p.known <= p.total) : [];
  const cleanProfile = value => value && typeof value.name === 'string' && value.name.trim() && value.name.length <= 32 && typeof value.photo === 'string' && value.photo.length <= 120000 && (!value.photo || /^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/.test(value.photo)) && ['Starter','Bookworm','Consistent','Scholar'].includes(value.badge) ? {name:value.name,photo:value.photo,badge:value.badge,accent:['neutral','blue','violet','mint'].includes(value.accent)?value.accent:'neutral'} : defaults();
  const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
  function localRead(key, fallback) { try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; } catch (_) { return fallback; } }
  let uid = null, generation = 0, adapter = null, connection = null, connectionFactory = null, stop = () => {}, timer;
  let account = empty(), remote = {}, remoteHistory = [], loaded = new Set(), phase = 'guest', failure = '', conflicts = new Set(), flushing = false, profilePending = false, cacheUnavailable = false;
  function empty() { return {ratings:{},history:[],profile:defaults(),version:0,queue:{}}; }
  const cacheKey = owner => 'revision-desk-account-session-v1:'+owner;
  const pending = () => Object.keys(account.queue).length + Number(profilePending);
  const ratings = () => uid ? {...account.ratings} : cleanRatings(localRead(guestKey,{}));
  const history = () => uid ? account.history.map(p => ({...p})) : cleanHistory(localRead('revision-desk-history-v1',[]));
  const profile = () => uid ? {...account.profile} : cleanProfile(localRead('revision-desk-profile-v1:guest',null));
  function cache() {
    if (!uid) return;
    try { sessionStorage.setItem(cacheKey(uid),JSON.stringify(account)); }
    catch (_) { cacheUnavailable=true; }
  }
  function state() { return {uid,phase,pending:pending(),conflicts:conflicts.size,ready:loaded.size===3,message:failure}; }
  function emit(type, origin = 'remote') {
    const token = generation;
    queueMicrotask(() => { if (token === generation) window.dispatchEvent(new CustomEvent('revision-data-change',{detail:{type,origin,...state()}})); });
    renderStatus();
  }
  function renderStatus() {
    const el = document.getElementById('cloud-status'); if (!el) return;
    let text;
    if (!uid) text = 'Guest · saved on this device only. Sign in for private cloud saving.';
    else if (conflicts.size) text = `${conflicts.size} rating changes conflict with another device. Choose which to keep.`;
    else if (failure) text = failure;
    else if (phase === 'loading') text = 'Loading your private account data…';
    else if (pending()) text = `${pending()} changes not yet saved to your account. Keep this window open.${cacheUnavailable?' Local session backup is unavailable.':''}`;
    else if (phase === 'offline') text = 'Offline · showing this session’s copy. Reconnect to confirm cloud saving.';
    else text = 'Saved to your account · built-in progress and profile. Personal-deck save status appears in Flashcard maker.'+(cacheUnavailable?' Local session backup is unavailable.':'');
    el.textContent = text;
    for (const id of ['cloud-retry','cloud-keep-mine','cloud-use-account']) {
      const button = document.getElementById(id); if (!button) continue;
      button.hidden = id === 'cloud-retry' ? !uid || (!failure && phase !== 'offline') : !conflicts.size;
    }
    const importing = document.getElementById('account-import');
    if (importing) { importing.hidden = !uid; importing.disabled = loaded.size!==3 || pending()>0 || !!failure || phase==='offline'; }
  }
  function fail(error) {
    phase = 'error';
    failure = error?.code === 'permission-denied' ? 'Database access was denied. Sign in again; if it continues, the owner must check database rules. Unsaved changes stay in this session.' : 'Cloud saving could not be confirmed. Check your connection and retry. Unsaved changes stay in this session.';
    emit('status');
  }
  function subscribe() {
    const owner = uid, token = generation;
    if (!owner || !adapter) return;
    stop(); loaded = new Set(); phase='loading';failure='';renderStatus();
    clearTimeout(timer);
    timer = setTimeout(() => { if (token===generation && loaded.size!==3) fail(); },12000);
    stop = adapter.subscribe(owner,(type,data,confirmed) => {
      if (token!==generation || owner!==uid) return;
      if (!confirmed) { phase='offline';emit('status');return; }
      loaded.add(type);
      if (type==='ratings') {
        remote=cleanRatings(data);
        const overlay = Object.fromEntries(Object.entries(account.queue).filter(([id])=>cards.has(id)).map(([id,item])=>[id,item.value]));
        account.ratings=cleanRatings({...remote,...overlay});
      } else if (type==='history') {
        remoteHistory=cleanHistory(data);
        const pendingSeries = new Set(Object.values(account.queue).map(item=>item.series+'--'+item.date));
        account.history=cleanHistory(data).filter(p=>!pendingSeries.has(p.deck+'--'+p.date)).concat(account.history.filter(p=>pendingSeries.has(p.deck+'--'+p.date)));
      } else if (type==='profile') {
        account.profile=cleanProfile(data);account.version=Number.isInteger(data?.version)?data.version:0;
      }
      if (loaded.size===3) { clearTimeout(timer);phase='saved';failure=''; }
      cache();emit(type);
      if (loaded.size===3) flush();
    },error => { if (token===generation) fail(error); });
  }
  async function ensureConnection() {
    if (!connection && connectionFactory) connection = connectionFactory();
    const pending = connection;
    try { adapter = await pending; if (uid) subscribe(); }
    catch (_) { if (connection === pending) connection = null; if (uid) fail(); }
  }
  function connect(app, auth) {
    connectionFactory = () => import('./cloud.js?v=medicine-print-20261010').then(module => module.createCloudAdapter(app,auth));
    if (!connection) connection = connectionFactory();
    // A guest can keep revising if the optional online SDK is unavailable.
    connection.catch(() => {});
    if (uid) ensureConnection();
  }
  async function makerAdapter(owner) {
    if(!owner || owner!==uid)throw Error('Sign in to use your account decks.');
    if(!connection && connectionFactory)connection=connectionFactory();
    if(!connection)throw Error('Account saving is not connected. Sign in and retry.');
    let result;
    try { result=await connection; }
    catch(_) { connection=null;throw Error('Cloud connection could not be opened. Check your connection and retry.'); }
    if(owner!==uid)throw Error('Account changed. Reopen your decks.');
    if(!result?.maker)throw Error('Cloud deck saving is unavailable. Reload the updated app.');
    return result.maker;
  }
  function switchUser(next) {
    if (next===uid) return;
    generation++;stop();stop=()=>{};clearTimeout(timer);uid=next;account=empty();remote={};remoteHistory=[];loaded=new Set();conflicts=new Set();flushing=false;profilePending=false;failure='';
    if (!uid) { phase='guest';emit('scope');return; }
    phase='loading';
    try {
      const stored=JSON.parse(sessionStorage.getItem(cacheKey(uid)) || 'null');
      if(stored){account.ratings=cleanRatings(stored.ratings);account.history=cleanHistory(stored.history);account.profile=cleanProfile(stored.profile);account.version=Number.isInteger(stored.version)?stored.version:0;
        for(const [id,item] of Object.entries(stored.queue || {}))if(cards.has(id) && item && (validRating(item.value) || item.value===null) && (validRating(item.base) || item.base===null) && item.deck===cards.get(id) && [item.deck,item.deck+'-foundation'].includes(item.series) && /^\d{4}-\d{2}-\d{2}$/.test(item.date)) account.queue[id]=item;
      }
    } catch (_) {}
    emit('scope');if (connection) ensureConnection();
  }
  function writeRatings(next, series) {
    next=cleanRatings(next);
    if (!uid) { try {
      const retired=Object.fromEntries(Object.entries(localRead(guestKey,{})).filter(([id,value])=>retiredCards.has(id) && validRating(value)));
      localStorage.setItem(guestKey,JSON.stringify({...retired,...next}));emit('ratings','local');return true;
    } catch (_) { return false; } }
    const previous=account.ratings;
    for(const id of new Set([...Object.keys(previous),...Object.keys(next)])) {
      const value=next[id] || null;if(value===(previous[id] || null))continue;
      const old=account.queue[id];
      account.queue[id]={deck:cards.get(id),series:[cards.get(id),cards.get(id)+'-foundation'].includes(series)?series:cards.get(id),date:today(),base:old?old.base:(remote[id] || null),value,operation:crypto.randomUUID()};
    }
    account.ratings=next;
    for(const item of Object.values(account.queue)) {
      const source=decks.get(item.deck);if(!source)continue;
      const selected=source.cards.filter(c=>!item.series.endsWith('-foundation') || c.tier!=='H');
      const point={deck:item.series,date:item.date,known:selected.filter(c=>next[c.id]==='know').length,total:selected.length};
      account.history=account.history.filter(p=>p.deck!==point.deck || p.date!==point.date);account.history.push(point);
    }
    cache();emit('ratings','local');flush();return true;
  }
  async function flush() {
    if (!uid || !adapter || loaded.size!==3 || flushing || conflicts.size || !navigator.onLine || !Object.keys(account.queue).length) return;
    const owner=uid, token=generation;flushing=true;phase='saving';failure='';renderStatus();
    const watchdog=setTimeout(()=>{if(token===generation){failure='Cloud saving is taking longer than expected. Changes are not confirmed; keep this window open and check your connection.';emit('status');}},12000);
    try {
      for(const [id,item] of Object.entries(account.queue)) {
        if(token!==generation || uid!==owner)return;
        const source=decks.get(item.deck);
        const point=await adapter.writeRating(owner,id,item,source.cards.filter(c=>!item.series.endsWith('-foundation') || c.tier!=='H').map(c=>c.id));
        if(token!==generation || uid!==owner)return;
        remote[id]=item.value;
        if(account.queue[id]?.operation===item.operation){delete account.queue[id];if(point){account.history=account.history.filter(p=>p.deck!==point.deck || p.date!==point.date);account.history.push(point);emit('history');}}
        else if(account.queue[id])account.queue[id].base=item.value;
        cache();
      }
      phase='saved';failure='';
    } catch(error) {
      if(token!==generation)return;
      if(error?.code==='revision-conflict') { conflicts.add(error.card);phase='conflict';failure=''; }
      else fail(error);
    } finally {
      clearTimeout(watchdog);
      if(token===generation){flushing=false;cache();emit('status');if(!failure && !conflicts.size && Object.keys(account.queue).length && navigator.onLine)flush();}
    }
  }
  async function saveProfile(value, version) {
    value=cleanProfile(value);
    if(!uid){localStorage.setItem('revision-desk-profile-v1:guest',JSON.stringify(value));emit('profile','save');return;}
    if(!adapter || loaded.size!==3 || !navigator.onLine)throw Error('Cloud is unavailable. Your draft is still here; reconnect and choose Save profile.');
    const owner=uid,token=generation;profilePending=true;renderStatus();
    const operation=crypto.randomUUID();let watchdog;
    try {
      const result=await Promise.race([adapter.writeProfile(owner,value,version,operation),new Promise((_,reject)=>{watchdog=setTimeout(()=>reject(Error('Save was not confirmed. Your draft is still here. Reconnect, then reopen the profile to check whether it arrived before retrying.')),12000);})]);
      if(token!==generation)throw Error('Account changed. The previous account’s save will never be copied into this account.');
      account.profile=value;account.version=result;cache();emit('profile','save');
    } catch(error) {
      if(error?.code==='revision-conflict')throw Error('This profile changed on another device. Your draft is still here; close and reopen to reload the saved profile.');
      if(error?.code==='permission-denied')throw Error('Database access was denied. Your draft is still here; sign in again or ask the owner to check database rules.');
      throw Error(error?.message?.startsWith('Save was not confirmed') || error?.message?.startsWith('Account changed') ? error.message : 'Could not save to your account. Your draft is still here; check your connection and retry.');
    } finally {clearTimeout(watchdog);if(token===generation){profilePending=false;renderStatus();}}
  }
  function resolve(useMine) {
    for(const id of conflicts){if(useMine && account.queue[id])account.queue[id].base=remote[id] || null;else {delete account.queue[id];if(remote[id])account.ratings[id]=remote[id];else delete account.ratings[id];}}
    if(!useMine){const pendingSeries=new Set(Object.values(account.queue).map(item=>item.series+'--'+item.date));account.history=remoteHistory.filter(p=>!pendingSeries.has(p.deck+'--'+p.date)).concat(account.history.filter(p=>pendingSeries.has(p.deck+'--'+p.date)));emit('history');}
    conflicts.clear();cache();emit('ratings');flush();
  }
  function importGuest() {
    if(!uid || loaded.size!==3 || pending())return false;
    const guest=cleanRatings(localRead(guestKey,{})),next=ratings();
    for(const [id,value] of Object.entries(guest))if(!next[id])next[id]=value;
    return writeRatings(next);
  }
  function waitForSaving() {
    if(!uid || !Object.keys(account.queue).length)return Promise.resolve();
    const owner=uid;flush();
    return new Promise((resolve,reject)=>{
      const timeout=setTimeout(()=>finish(Error('Not all changes were confirmed. Remaining changes stay in this session; reconnect and retry.')),15000);
      const check=()=>{if(uid!==owner)finish(Error('Account changed.'));else if(!Object.keys(account.queue).length)finish();else if(failure || conflicts.size || !navigator.onLine)finish(Error('Not all changes were confirmed. Remaining changes stay in this session; reconnect and retry.'));};
      function finish(error){clearTimeout(timeout);window.removeEventListener('revision-data-change',check);error?reject(error):resolve();}
      window.addEventListener('revision-data-change',check);check();
    });
  }
  window.RevisionStore={connect,ratings,history,profile,version:()=>uid?account.version:0,state,writeRatings,saveProfile,importGuest,defaults,waitForSaving,makerAdapter};
  window.addEventListener('revision-account-change',event=>switchUser(event.detail?.uid || null));
  window.addEventListener('online',()=>{if(uid)subscribe();});
  window.addEventListener('offline',()=>{if(uid){phase='offline';emit('status');}});
  window.addEventListener('storage',event=>{if(!uid && [guestKey,'revision-desk-history-v1','revision-desk-profile-v1:guest',null].includes(event.key))emit(event.key?.includes('profile')?'profile':'ratings');});
  window.addEventListener('beforeunload',event=>{if(uid && pending()){event.preventDefault();event.returnValue='';}});
  document.getElementById('cloud-retry')?.addEventListener('click',()=>{if(adapter)subscribe();else ensureConnection();});
  document.getElementById('cloud-keep-mine')?.addEventListener('click',()=>resolve(true));
  document.getElementById('cloud-use-account')?.addEventListener('click',()=>resolve(false));
  renderStatus();
})();
