// Private custom decks. Reuses the existing Firestore instance and authenticated session.
import {collection,doc,query,limit,onSnapshot,getDocFromServer,runTransaction,serverTimestamp} from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js';

export function createMakerCloudAdapter(db,auth) {
  const limits=Object.freeze({decks:50,cards:100,title:80,subject:60,question:1000,answer:4000,highlights:20});
  const fault=(message,code='maker-cloud')=>Object.assign(Error(message),{code});
  const validId=value=>typeof value==='string'&&/^[A-Za-z0-9-]{1,80}$/.test(value);
  const guard=uid=>{if(typeof uid!=='string'||!uid||auth.currentUser?.uid!==uid)throw fault('The account changed. Your draft has not been copied into another account.','maker-account');};
  const key=(uid,id)=>{guard(uid);if(!validId(id))throw fault('This deck identifier is invalid.','maker-validation');return doc(db,'users',uid,'customDecks',id);};
  const millis=value=>typeof value?.toMillis==='function'?value.toMillis():NaN;
  const version=value=>Number.isInteger(value)&&value>=0;
  function ranges(value,text) {
    if(value===undefined)return [];
    if(!Array.isArray(value)||value.length>limits.highlights)throw fault('Use at most 20 highlights per question or answer.','maker-validation');
    let end=0;
    const split=index=>index>0&&index<text.length&&/[\uD800-\uDBFF]/.test(text[index-1])&&/[\uDC00-\uDFFF]/.test(text[index]);
    return Array.from(value,range=>{
      if(!Array.isArray(range)||range.length!==2||!Number.isInteger(range[0])||!Number.isInteger(range[1])||range[0]<end||range[0]<0||range[1]<=range[0]||range[1]>text.length||split(range[0])||split(range[1]))throw fault('A highlight is outside its text, splits a character or overlaps another highlight.','maker-validation');
      end=range[1];return [range[0],range[1]];
    });
  }
  function cleanDeck(value) {
    if(!value||!validId(value.id)||typeof value.title!=='string'||!value.title.trim()||value.title.length>limits.title||typeof value.subject!=='string'||!value.subject.trim()||value.subject.length>limits.subject||typeof value.archived!=='boolean'||!Array.isArray(value.cards)||value.cards.length<1||value.cards.length>limits.cards)throw fault('Use a title, subject and 1–100 cards.','maker-validation');
    const ids=new Set();
    const cards=Array.from(value.cards,card=>{
      if(!card||!validId(card.id)||ids.has(card.id)||typeof card.question!=='string'||!card.question.trim()||card.question.length>limits.question||typeof card.answer!=='string'||!card.answer.trim()||card.answer.length>limits.answer)throw fault('Each card needs a unique identifier, question and answer within the text limits.','maker-validation');
      ids.add(card.id);
      return {id:card.id,question:card.question,answer:card.answer,questionHighlights:ranges(card.questionHighlights,card.question),answerHighlights:ranges(card.answerHighlights,card.answer)};
    });
    return {id:value.id,title:value.title.trim(),subject:value.subject.trim(),archived:value.archived,cards};
  }
  const mask=(ranges,text)=>{const bits=Array(text.length).fill('0');for(const [start,end] of ranges)for(let i=start;i<end;i++)bits[i]='1';return bits.join('');};
  function unmask(value,text) {
    if(typeof value!=='string'||value.length!==text.length||!/^[01]*$/.test(value))throw fault('A cloud highlight could not be read safely.');
    const result=[];let start=-1;
    for(let i=0;i<=value.length;i++){if(value[i]==='1'&&start<0)start=i;else if(value[i]!=='1'&&start>=0){result.push([start,i]);start=-1;}}
    return ranges(result,text);
  }
  function metadata(snapshot) {
    if(!snapshot.exists())return null;
    const row=snapshot.data();
    if(!validId(snapshot.id)||row?.schema!==1||typeof row.title!=='string'||!row.title.trim()||row.title.length>limits.title||typeof row.subject!=='string'||!row.subject.trim()||row.subject.length>limits.subject||typeof row.archived!=='boolean'||!version(row.revision)||row.revision<1||!Array.isArray(row.cardIds)||!row.cardIds.length||row.cardIds.length>limits.cards||row.cardIds.some(id=>!validId(id))||new Set(row.cardIds).size!==row.cardIds.length||!Number.isFinite(millis(row.createdAt))||!Number.isFinite(millis(row.updatedAt))||!validId(row.operation))throw fault('A cloud deck could not be read safely. Your draft is unchanged.');
    return {...row,id:snapshot.id,createdAt:millis(row.createdAt),updatedAt:millis(row.updatedAt)};
  }
  function card(snapshot,id) {
    if(!snapshot.exists())throw fault('A cloud card is missing. Retry; your draft is unchanged.');
    const value=snapshot.data();
    if(typeof value.question!=='string'||typeof value.answer!=='string')throw fault('A cloud card could not be read safely.');
    const clean=cleanDeck({id:'validation',title:'Validation',subject:'Validation',archived:false,cards:[{...value,id,questionHighlights:unmask(value.questionHighlightMask,value.question),answerHighlights:unmask(value.answerHighlightMask,value.answer)}]}).cards[0];
    if(!version(value.contentRevision)||value.contentRevision<1)throw fault('A cloud card version could not be read safely.');
    return {...clean,contentRevision:value.contentRevision};
  }
  function progress(snapshot,contentRevision) {
    if(!snapshot.exists())return null;
    const value=snapshot.data();
    if(!['know','learn','unsure'].includes(value.rating)||!version(value.version)||value.version<1||!version(value.contentRevision)||value.contentRevision<1||!validId(value.operation))throw fault('Cloud practice progress could not be read safely.');
    return value.contentRevision===contentRevision?{rating:value.rating,version:value.version,contentRevision:value.contentRevision}:null;
  }
  const sameContent=(a,b)=>a.question===b.question&&a.answer===b.answer&&JSON.stringify(a.questionHighlights)===JSON.stringify(b.questionHighlights)&&JSON.stringify(a.answerHighlights)===JSON.stringify(b.answerHighlights);
  const validOperation=operation=>{if(!validId(operation))throw fault('This save operation is invalid.','maker-validation');};
  const conflict=kind=>Object.assign(fault(kind==='progress'?'This card’s progress changed on another device. Reload its account progress before retrying.':'This deck changed on another device. Your draft is still here; download a backup or reload the saved copy.','maker-conflict'),{kind});

  function subscribe(uid,next,error) {
    guard(uid);
    let active=true;
    const stop=onSnapshot(query(collection(db,'users',uid,'customDecks'),limit(limits.decks+1)),{includeMetadataChanges:true},snapshot=>{
      if(!active||auth.currentUser?.uid!==uid)return;
      const confirmed=!snapshot.metadata.fromCache&&!snapshot.metadata.hasPendingWrites;
      if(!confirmed){next(null,false);return;}
      try {
        if(snapshot.size>limits.decks)throw fault('The cloud deck limit was exceeded. No account data has been replaced.');
        const rows=snapshot.docs.map(metadata).map(row=>({id:row.id,title:row.title,subject:row.subject,archived:row.archived,revision:row.revision,updatedAt:row.updatedAt,count:row.cardIds.length})).sort((a,b)=>b.updatedAt-a.updatedAt);
        next(rows,true);
      }catch(failure){error(failure);}
    },failure=>{if(active&&auth.currentUser?.uid===uid)error(failure);});
    return ()=>{active=false;stop();};
  }
  async function read(uid,id) {
    const reference=key(uid,id);
    for(let attempt=0;attempt<3;attempt++) {
      const first=metadata(await getDocFromServer(reference));guard(uid);
      if(!first)return null;
      const contents=await Promise.all(first.cardIds.map(async cardId=>{
        const [content,state]=await Promise.all([getDocFromServer(doc(reference,'cards',cardId)),getDocFromServer(doc(reference,'progress',cardId))]);
        guard(uid);const clean=card(content,cardId);return {card:clean,progress:progress(state,clean.contentRevision)};
      }));
      const last=metadata(await getDocFromServer(reference));guard(uid);
      if(!last||last.revision!==first.revision)continue;
      return {id,title:first.title,subject:first.subject,archived:first.archived,revision:first.revision,createdAt:first.createdAt,updatedAt:first.updatedAt,scope:'uid:'+uid,key:'uid:'+uid+':'+id,cards:contents.map(value=>value.card),progress:Object.fromEntries(contents.filter(value=>value.progress).map(value=>[value.card.id,value.progress]))};
    }
    throw fault('This deck kept changing while it loaded. Retry; your draft is unchanged.','maker-conflict');
  }
  async function save(uid,value,expected,operation) {
    const reference=key(uid,value?.id),clean=cleanDeck(value);validOperation(operation);
    if(!version(expected))throw fault('This deck’s saved version is invalid.','maker-validation');
    let observedRegistry=null;
    const commit=()=>runTransaction(db,async transaction=>{
      guard(uid);
      const snapshot=await transaction.get(reference),previous=metadata(snapshot);guard(uid);
      if(previous?.operation===operation) {
        if(previous.revision!==expected+1)throw conflict('deck');
        return;
      }
      if((previous?.revision||0)!==expected)throw conflict('deck');
      const registryRef=doc(db,'users',uid,'settings','makerRegistry');
      const registrySnapshot=previous?null:await transaction.get(registryRef);guard(uid);
      if(registrySnapshot)observedRegistry=registrySnapshot.exists()?JSON.stringify(registrySnapshot.data().ids):'[]';
      const existingIds=previous?.cardIds||[],allIds=[...new Set([...existingIds,...clean.cards.map(item=>item.id)])];
      const existing=await Promise.all(allIds.map(async cardId=>[cardId,await transaction.get(doc(reference,'cards',cardId))]));guard(uid);
      const contents=new Map(existing);
      const rows=clean.cards.map(item=>{
        const before=contents.get(item.id);
        const previousCard=before.exists()?card(before,item.id):null;
        return {...item,contentRevision:previousCard?(sameContent(previousCard,item)?previousCard.contentRevision:previousCard.contentRevision+1):1};
      });
      if(!previous) {
        const registry=registrySnapshot.exists()?registrySnapshot.data():{ids:[]};
        if(!Array.isArray(registry.ids)||registry.ids.some(id=>!validId(id))||new Set(registry.ids).size!==registry.ids.length||registry.ids.length>=limits.decks||registry.ids.includes(clean.id))throw fault('This account already has 50 decks, including archived decks, or its deck registry needs attention.','maker-limit');
        transaction.set(registryRef,{ids:[...registry.ids,clean.id],lastDeck:clean.id,operation,updatedAt:serverTimestamp()});
      }
      const timestamp=serverTimestamp();
      transaction.set(reference,{schema:1,title:clean.title,subject:clean.subject,archived:clean.archived,cardIds:rows.map(item=>item.id),revision:expected+1,operation,createdAt:snapshot.exists()?snapshot.data().createdAt:timestamp,updatedAt:timestamp});
      for(const row of rows) {
        const {id,questionHighlights,answerHighlights,...fields}=row;
        transaction.set(doc(reference,'cards',id),{...fields,questionHighlightMask:mask(questionHighlights,row.question),answerHighlightMask:mask(answerHighlights,row.answer),deckRevision:expected+1,operation,updatedAt:timestamp});
      }
      const remaining=new Set(rows.map(item=>item.id));
      for(const cardId of existingIds)if(!remaining.has(cardId)) {
        transaction.delete(doc(reference,'cards',cardId));transaction.delete(doc(reference,'progress',cardId));
      }
      guard(uid);
    },{maxAttempts:3});
    try{await commit();}
    catch(error) {
      guard(uid);
      // A concurrent revision may be rejected by CAS rules before the SDK retries.
      // Re-read only owner-visible metadata; never silently replace the newer deck.
      if(error?.code!=='permission-denied')throw error;
      const current=metadata(await getDocFromServer(reference));guard(uid);
      if(current?.operation===operation&&current.revision===expected+1)return read(uid,clean.id);
      if((current?.revision||0)!==expected)throw conflict('deck');
      if(!current&&observedRegistry!==null) {
        const registry=await getDocFromServer(doc(db,'users',uid,'settings','makerRegistry'));guard(uid);
        if(JSON.stringify(registry.exists()?registry.data().ids:[])!==observedRegistry)await commit();
        else throw error;
      }else throw error;
    }
    guard(uid);
    // Transaction completion confirms the atomic server commit; read back server timestamps.
    return read(uid,clean.id);
  }
  async function writeProgress(uid,id,cardId,rating,expectedContentRevision,expectedProgressVersion,operation) {
    const reference=key(uid,id);validOperation(operation);
    if(!validId(cardId)||!['know','learn','unsure'].includes(rating)||!version(expectedContentRevision)||expectedContentRevision<1||!version(expectedProgressVersion))throw fault('This practice change is invalid.','maker-validation');
    const commit=()=>runTransaction(db,async transaction=>{
      guard(uid);
      const [deckSnapshot,cardSnapshot,stateSnapshot]=await Promise.all([transaction.get(reference),transaction.get(doc(reference,'cards',cardId)),transaction.get(doc(reference,'progress',cardId))]);guard(uid);
      const deck=metadata(deckSnapshot),content=card(cardSnapshot,cardId),before=stateSnapshot.exists()?stateSnapshot.data():null;
      if(!deck||deck.archived||!deck.cardIds.includes(cardId)||content.contentRevision!==expectedContentRevision)throw conflict('deck');
      if(before?.operation===operation)return {rating:before.rating,version:before.version,contentRevision:before.contentRevision};
      // Stale progress is not inherited by replacement card content, but its version remains CAS-safe.
      const currentVersion=before?.contentRevision===content.contentRevision?(before?.version||0):0;
      if(currentVersion!==expectedProgressVersion)throw conflict('progress');
      const updated={rating,contentRevision:content.contentRevision,version:(before?.version||0)+1,operation,updatedAt:serverTimestamp()};
      transaction.set(doc(reference,'progress',cardId),updated);guard(uid);
      return {rating:updated.rating,version:updated.version,contentRevision:updated.contentRevision};
    },{maxAttempts:3});
    let result;
    try{result=await commit();}
    catch(error) {
      guard(uid);if(error?.code!=='permission-denied')throw error;
      const [latestDeck,latestContent,latestState]=await Promise.all([getDocFromServer(reference),getDocFromServer(doc(reference,'cards',cardId)),getDocFromServer(doc(reference,'progress',cardId))]);guard(uid);
      const currentDeck=metadata(latestDeck),currentContent=card(latestContent,cardId),current=latestState.exists()?latestState.data():null;
      if(!currentDeck||currentDeck.archived||!currentDeck.cardIds.includes(cardId)||currentContent.contentRevision!==expectedContentRevision)throw conflict('deck');
      if(current?.operation===operation)return {rating:current.rating,version:current.version,contentRevision:current.contentRevision};
      if((current?.contentRevision===expectedContentRevision?(current?.version||0):0)!==expectedProgressVersion)throw conflict('progress');
      throw error;
    }
    guard(uid);return result;
  }
  function subscribeProgress(uid,id,next,error) {
    const reference=key(uid,id);let active=true;
    const stop=onSnapshot(query(collection(reference,'progress'),limit(limits.cards+1)),{includeMetadataChanges:true},snapshot=>{
      if(!active||auth.currentUser?.uid!==uid)return;
      if(snapshot.metadata.fromCache||snapshot.metadata.hasPendingWrites){next(null,false);return;}
      try {
        if(snapshot.size>limits.cards)throw fault('The cloud practice limit was exceeded.');
        const rows={};for(const item of snapshot.docs){const value=item.data();if(!validId(item.id)||!['know','learn','unsure'].includes(value.rating)||!version(value.version)||value.version<1||!version(value.contentRevision)||value.contentRevision<1)throw fault('Cloud practice progress could not be read safely.');rows[item.id]={rating:value.rating,version:value.version,contentRevision:value.contentRevision};}
        next(rows,true);
      }catch(failure){error(failure);}
    },failure=>{if(active&&auth.currentUser?.uid===uid)error(failure);});
    return ()=>{active=false;stop();};
  }
  return Object.freeze({limits,subscribe,read,save,writeProgress,subscribeProgress});
}
