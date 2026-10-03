// Private, bounded custom decks on this device. No Firebase or built-in rating writes.
(() => {
  'use strict';
  const limits=Object.freeze({decks:50,cards:100,title:80,subject:60,question:1000,answer:4000,backup:4000000});
  const clone=value=>JSON.parse(JSON.stringify(value));
  const fault=(message,code)=>Object.assign(Error(message),{code});
  const text=(value,max)=>typeof value==='string'&&value.length<=max;
  const validScope=value=>typeof value==='string'&&(value==='guest'||/^uid:[^\x00-\x1f]{1,256}$/.test(value));
  const validId=value=>typeof value==='string'&&/^[a-zA-Z0-9-]{1,80}$/.test(value);
  function scope(uid){if(uid===null||uid===undefined||uid==='')return 'guest';const value='uid:'+uid;if(typeof uid!=='string'||!validScope(value))throw fault('The account scope could not be read. Sign out and retry.','maker-scope');return value;}
  function validate(value,{draft=false}={}){
    if(!value||!text(value.title,limits.title)||!text(value.subject,limits.subject)||!Array.isArray(value.cards)||!value.cards.length||value.cards.length>limits.cards)throw fault('Use a title up to 80 characters, a subject up to 60 characters and 1–100 cards.','maker-validation');
    const cards=value.cards.map(card=>{
      if(!card||!text(card.question,limits.question)||!text(card.answer,limits.answer)||(!draft&&(!card.question.trim()||!card.answer.trim())))throw fault('Give every card a question (up to 1,000 characters) and an answer (up to 4,000 characters).','maker-validation');
      return {question:card.question,answer:card.answer};
    });
    if(!draft&&(!value.title.trim()||!value.subject.trim()))throw fault('Enter a deck title and subject before saving.','maker-validation');
    return {title:value.title.trim(),subject:value.subject.trim(),cards};
  }
  function recordValid(value,owner,id){
    if(!value||value.scope!==owner||value.id!==id||value.key!==owner+':'+id||!Number.isInteger(value.revision)||value.revision<1||typeof value.archived!=='boolean'||!Number.isFinite(value.createdAt)||!Number.isFinite(value.updatedAt))return false;
    try{validate(value);return true;}catch(_){return false;}
  }
  let dbPromise;
  function database(){
    if(dbPromise)return dbPromise;
    dbPromise=new Promise((resolve,reject)=>{
      let request,settled=false;
      const fail=message=>{if(settled)return;settled=true;dbPromise=null;reject(fault(message,'maker-storage'));};
      try{request=indexedDB.open('revision-desk-maker-v1',1);}catch(_){fail('Device storage is unavailable. Your draft is still here; download a backup before closing.');return;}
      request.onupgradeneeded=()=>request.result.createObjectStore('decks',{keyPath:'key'});
      request.onerror=()=>fail('Device storage is unavailable. Your draft is still here; download a backup before closing.');
      request.onblocked=()=>fail('Close older Revision Deck windows, then retry. Your draft is still here.');
      request.onsuccess=()=>{if(settled){request.result.close();return;}settled=true;const db=request.result;db.onversionchange=()=>{db.close();dbPromise=null;};resolve(db);};
    });
    // A synchronous open failure must not leave a rejected promise cached forever.
    dbPromise.catch(()=>{dbPromise=null;});
    return dbPromise;
  }
  function assertKey(owner,id){if(!validScope(owner)||!validId(id))throw fault('This deck could not be opened. Return to your device deck list.','maker-validation');}
  async function list(owner){
    if(!validScope(owner))throw fault('This account scope is invalid.','maker-scope');
    const db=await database();
    return new Promise((resolve,reject)=>{
      const tx=db.transaction('decks','readonly'),rows=[];let failure;
      const request=tx.objectStore('decks').openCursor();
      request.onsuccess=()=>{const cursor=request.result;if(!cursor)return;const row=cursor.value;
        if(row?.scope===owner){if(rows.length>=limits.decks||!recordValid(row,owner,row.id)){failure=fault('A saved deck could not be read safely. Your current draft is unchanged.','maker-storage');tx.abort();return;}rows.push({id:row.id,title:row.title,subject:row.subject,archived:row.archived,revision:row.revision,updatedAt:row.updatedAt,count:row.cards.length});}
        cursor.continue();
      };
      tx.oncomplete=()=>resolve(rows.sort((a,b)=>b.updatedAt-a.updatedAt));
      tx.onabort=()=>reject(failure||fault('The device deck list could not be read. Retry; your draft is unchanged.','maker-storage'));
      tx.onerror=()=>{};
    });
  }
  async function read(owner,id){
    assertKey(owner,id);const db=await database();
    return new Promise((resolve,reject)=>{
      const tx=db.transaction('decks','readonly');let result=null,failure;
      const request=tx.objectStore('decks').get(owner+':'+id);
      request.onsuccess=()=>{if(!request.result)return;if(!recordValid(request.result,owner,id)){failure=fault('This saved deck could not be read safely. Download your current draft before leaving.','maker-storage');tx.abort();return;}result=clone(request.result);};
      tx.oncomplete=()=>resolve(result);
      tx.onabort=()=>reject(failure||fault('The saved deck could not be opened. Retry; your draft is unchanged.','maker-storage'));
      tx.onerror=()=>{};
    });
  }
  async function save(owner,value,expected){
    assertKey(owner,value?.id);const clean=validate(value);
    if(!Number.isInteger(expected)||expected<0||typeof value.archived!=='boolean')throw fault('This deck’s saved version is invalid. Download your draft and reload the saved copy.','maker-validation');
    const db=await database();
    return new Promise((resolve,reject)=>{
      const tx=db.transaction('decks','readwrite'),store=tx.objectStore('decks');let result,failure;
      const stop=(message,code)=>{failure=fault(message,code);tx.abort();};
      const request=store.get(owner+':'+value.id);
      request.onsuccess=()=>{
        const previous=request.result;
        if(previous&&!recordValid(previous,owner,value.id)){stop('The saved deck could not be read safely. Your draft is still here.','maker-storage');return;}
        if((previous?.revision||0)!==expected){stop('This deck changed in another window. Your draft is still here; download a backup, then reload the saved copy.','maker-conflict');return;}
        const commit=()=>{result={...clean,key:owner+':'+value.id,scope:owner,id:value.id,archived:value.archived,revision:expected+1,createdAt:previous?.createdAt||Date.now(),updatedAt:Date.now()};store.put(result);};
        if(previous){commit();return;}
        let count=0;const cursorRequest=store.openCursor();
        cursorRequest.onsuccess=()=>{const cursor=cursorRequest.result;if(!cursor){commit();return;}if(cursor.value?.scope===owner&&++count>=limits.decks){stop('This scope already has 50 device decks, including archived decks. Download backups or edit an existing deck.','maker-limit');return;}cursor.continue();};
      };
      tx.oncomplete=()=>resolve(clone(result));
      tx.onabort=()=>reject(failure||fault('Could not save on this device: storage is full or unavailable. Your draft is still here; download a backup and retry.','maker-storage'));
      tx.onerror=()=>{};
    });
  }
  function backup(value){const clean=validate(value,{draft:true});return JSON.stringify({format:'revision-deck-maker',version:1,...clean},null,2);}
  function parseBackup(raw){if(typeof raw!=='string'||raw.length>limits.backup)throw fault('Choose a Revision Deck JSON backup no larger than 4 MB.','maker-validation');let value;try{value=JSON.parse(raw);}catch(_){throw fault('This is not a readable JSON backup. Choose a Revision Deck deck backup.','maker-validation');}if(value?.format!=='revision-deck-maker'||value.version!==1)throw fault('Choose a Revision Deck maker backup, version 1.','maker-validation');return validate(value,{draft:true});}
  window.RevisionMakerStorage=Object.freeze({limits,scope,validate,list,read,save,backup,parseBackup});
})();
