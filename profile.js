(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const defaults = () => ({name:'Revision student',photo:'',badge:'Starter'});
  const badges = [{name:'Starter',min:0},{name:'Bookworm',min:20},{name:'Consistent',min:50},{name:'Scholar',min:100}];
  let uid = null, saved = defaults(), draft = defaults(), dirty = false, processing = false, conflict = false, job = 0;
  const key = () => 'revision-desk-profile-v1:'+(uid || 'guest');
  const status = message => { $('profile-status').textContent = message; };
  function counts() {
    try {
      const progress = JSON.parse(localStorage.getItem('revision-desk-progress-v2') || '{}');
      const ids = new Set(window.FLASHCARD_DATA.subjects.flatMap(s=>s.decks.flatMap(d=>d.cards.map(c=>c.id))));
      const values = Object.entries(progress).filter(([id,value])=>ids.has(id) && ['know','unsure','learn'].includes(value)).map(([,value])=>value);
      return {reviewed:values.length,know:values.filter(v=>v==='know').length};
    } catch (_) { return {reviewed:0,know:0}; }
  }
  function read() {
    saved = defaults();
    try {
      const value = JSON.parse(localStorage.getItem(key()) || 'null');
      if (value && typeof value.name==='string' && value.name.length<=32 && typeof value.photo==='string' && value.photo.length<=120000 && (!value.photo || /^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/.test(value.photo)) && badges.some(b=>b.name===value.badge)) saved = {name:value.name,photo:value.photo,badge:value.badge};
    } catch (_) { status('Your saved profile could not be read. You can create a new one.'); }
  }
  function avatar(element, value, mini=false) {
    element.replaceChildren();
    if (value.photo) { const img = document.createElement('img'); img.src=value.photo; img.alt=mini?'':'Your profile picture'; img.width=mini?28:96; img.height=mini?28:96; element.append(img); }
    else element.textContent = value.name.trim().split(/\s+/).slice(0,2).map(n=>n[0]).join('').toUpperCase() || 'RD';
  }
  function render() {
    const stats = counts();
    const value = $('profile-dialog').open ? draft : saved;
    avatar($('profile-avatar'),value); avatar($('header-avatar'),saved,true);
    $('profile-summary-name').textContent=(value.name || 'Revision student')+' · '+value.badge;
    $('profile-stats').textContent=`${stats.reviewed} cards reviewed · ${stats.know} marked Know · device-wide practice`;
    $('profile-identity').textContent=uid?'Account profile · saved only in this browser':'Guest profile · saved only in this browser';
    $('profile-badge').replaceChildren(...badges.map(b=>{const o=document.createElement('option');o.value=b.name;o.textContent=b.name+(b.min?` · ${b.min} reviewed`:'');o.disabled=stats.reviewed<b.min;return o;}));
    if (!badges.some(b=>b.name===draft.badge && stats.reviewed>=b.min)) draft.badge='Starter';
    $('profile-badge').value=draft.badge;
    $('profile-remove-photo').disabled=!draft.photo || processing;
    $('profile-save').disabled=processing || conflict;
    $('profile-form').setAttribute('aria-busy',String(processing));
  }
  function open() {
    read();draft={...saved};dirty=false;processing=false;conflict=false;$('profile-name').value=draft.name;
    $('profile-photo').value='';$('profile-name-error').textContent='';$('profile-photo-error').textContent='';
    $('profile-name').removeAttribute('aria-invalid');$('profile-photo').removeAttribute('aria-invalid');
    status('Edit your profile, then choose Save profile.');$('profile-dialog').showModal();render();
  }
  function close() {
    if(dirty || processing) {$('profile-discard-dialog').showModal();return;}
    $('profile-dialog').close();
  }
  $('profile-button').addEventListener('click',open);
  $('profile-close').addEventListener('click',close);
  $('profile-cancel').addEventListener('click',close);
  $('profile-dialog').addEventListener('cancel',event=>{event.preventDefault();close();});
  $('profile-dialog').addEventListener('close',()=>{job++;processing=false;dirty=false;draft={...saved};render();});
  $('profile-keep-editing').addEventListener('click',()=> $('profile-discard-dialog').close());
  $('profile-discard').addEventListener('click',()=>{dirty=false;job++;processing=false;$('profile-discard-dialog').close();$('profile-dialog').close();});
  $('profile-name').addEventListener('input',event=>{draft.name=event.target.value;dirty=true;render();});
  $('profile-badge').addEventListener('change',event=>{draft.badge=event.target.value;dirty=true;});
  $('profile-remove-photo').addEventListener('click',()=>{draft.photo='';dirty=true;$('profile-photo').value='';render();status('Picture removed from the draft. Save profile to keep this change.');});
  $('profile-photo').addEventListener('change',async event=>{
    const file=event.target.files?.[0];if(!file)return;
    const token=++job;processing=true;render();status('Preparing picture…');$('profile-photo-error').textContent='';$('profile-photo').removeAttribute('aria-invalid');
    let bitmap;
    try {
      if(!['image/jpeg','image/png','image/webp'].includes(file.type) || !file.size || file.size>5*1024*1024)throw Error('Choose a JPEG, PNG or WebP image no larger than 5 MB.');
      const bytes=new Uint8Array(await file.slice(0,12).arrayBuffer());
      const jpeg=bytes[0]===255 && bytes[1]===216 && bytes[2]===255;
      const png=[137,80,78,71,13,10,26,10].every((b,i)=>bytes[i]===b);
      const webp=String.fromCharCode(...bytes.slice(0,4))==='RIFF' && String.fromCharCode(...bytes.slice(8,12))==='WEBP';
      if(!jpeg && !png && !webp)throw Error('This file is not a supported image. Choose another picture.');
      bitmap=await createImageBitmap(file);
      if(bitmap.width*bitmap.height>16000000)throw Error('Choose an image smaller than 16 million pixels. Resize the original and try again.');
      const canvas=document.createElement('canvas');canvas.width=canvas.height=256;
      const ctx=canvas.getContext('2d');ctx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue('--surface').trim();ctx.fillRect(0,0,256,256);
      const side=Math.min(bitmap.width,bitmap.height);ctx.drawImage(bitmap,(bitmap.width-side)/2,(bitmap.height-side)/2,side,side,0,0,256,256);
      const photo=canvas.toDataURL('image/jpeg',0.82);
      if(photo.length>120000)throw Error('The prepared picture is too large. Choose a simpler or smaller image.');
      if(token!==job)return;
      draft.photo=photo;dirty=true;status(`${file.name}: picture ready. Choose Save profile to keep it.`);
    }catch(error){if(token===job){$('profile-photo-error').textContent=error.message || 'Could not read this picture. Choose another image.';$('profile-photo').setAttribute('aria-invalid','true');status('Picture was not changed. You can retry with another file.');}}
    finally{bitmap?.close();if(token===job){processing=false;render();}}
  });
  $('profile-form').addEventListener('submit',event=>{
    event.preventDefault();if(processing || conflict)return;
    draft.name=$('profile-name').value.trim();
    if(!draft.name || draft.name.length>32){$('profile-name-error').textContent='Enter a display name of 1–32 characters.';$('profile-name').setAttribute('aria-invalid','true');$('profile-name').focus();return;}
    $('profile-name-error').textContent='';$('profile-name').removeAttribute('aria-invalid');
    if(!badges.some(b=>b.name===draft.badge && counts().reviewed>=b.min)){status('Choose an unlocked badge.');return;}
    try{localStorage.setItem(key(),JSON.stringify(draft));saved={...draft};dirty=false;render();status('Profile saved in this browser. No picture was uploaded to the cloud.');}
    catch(_){status('Could not save: browser storage is full or unavailable. Your draft is still here; try a smaller picture or free some browser storage.');}
  });
  window.addEventListener('revision-account-change',event=>{
    const next=event.detail?.uid || null;if(next===uid)return;
    uid=next;job++;processing=false;dirty=false;conflict=false;read();draft={...saved};$('profile-name').value=draft.name;
    if($('profile-dialog').open)status('Account changed. Showing its separate local profile; any unsaved previous draft was discarded.');
    render();
  });
  window.addEventListener('storage',event=>{if(event.key===key()){if(dirty){conflict=true;status('This profile changed in another window. Close and reopen to reload it before making further edits.');render();}else{read();draft={...saved};$('profile-name').value=draft.name;render();}}});
  window.addEventListener('beforeunload',event=>{if(dirty || processing){event.preventDefault();event.returnValue='';}});
  read();render();
})();
