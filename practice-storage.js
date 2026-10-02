// Private on-device documents, partitioned by UID. No exam files are uploaded.
(() => {
  'use strict';
  let dbPromise;
  function db(){return dbPromise ||= new Promise((resolve,reject)=>{const r=indexedDB.open('revision-desk-practice-v1',1);r.onupgradeneeded=()=>r.result.createObjectStore('documents',{keyPath:'key'});r.onsuccess=()=>{r.result.onversionchange=()=>{r.result.close();dbPromise=null;};resolve(r.result);};r.onerror=()=>{dbPromise=null;reject(Error('Device storage is unavailable. Export your ink before leaving.'));};r.onblocked=()=>reject(Error('Close older Revision Desk windows and retry device storage.'));});}
  async function read(key){const database=await db();return new Promise((resolve,reject)=>{const tx=database.transaction('documents','readonly'),r=tx.objectStore('documents').get(key);r.onsuccess=()=>resolve(r.result||null);r.onerror=()=>reject(r.error);});}
  async function list(scope){const database=await db();return new Promise((resolve,reject)=>{const tx=database.transaction('documents','readonly'),rows=[],r=tx.objectStore('documents').openCursor();r.onsuccess=()=>{const cursor=r.result;if(!cursor){resolve(rows.sort((a,b)=>b.updatedAt-a.updatedAt));return;}if(cursor.key.startsWith(scope+':')){const {key,title,kind,updatedAt}=cursor.value;rows.push({key,title,kind,updatedAt});}cursor.continue();};r.onerror=()=>reject(r.error);});}
  async function save(record,expected){const database=await db();return new Promise((resolve,reject)=>{
    const tx=database.transaction('documents','readwrite'),store=tx.objectStore('documents');let failure;
    const r=store.get(record.key);r.onsuccess=()=>{if((r.result?.revision||0)!==expected){failure=Error('This practice changed in another window. Export your ink, then reload the saved copy.');failure.code='practice-conflict';tx.abort();return;}store.put({...record,revision:expected+1,updatedAt:Date.now()});};
    tx.oncomplete=()=>resolve(expected+1);tx.onabort=()=>reject(failure||Error('Could not save on this device. Your ink is still here; export it before leaving.'));tx.onerror=()=>{};
  });}
  window.RevisionPracticeStorage={read,list,save};
})();
