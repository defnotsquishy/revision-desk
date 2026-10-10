// Public client SDK only. Firebase Authentication owns credentials and sessions.
import {initializeFirestore,memoryLocalCache,collection,doc,onSnapshot,runTransaction,getDocFromServer,serverTimestamp} from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js';
import {createMakerCloudAdapter} from './maker-cloud.js';

export function createCloudAdapter(app,auth) {
  const db=initializeFirestore(app,{localCache:memoryLocalCache()});
  const guard=uid=>{if(auth.currentUser?.uid!==uid){const error=Error('Session changed');error.code='permission-denied';throw error;}};
  const conflict=card=>{const error=Error('Version conflict');error.code='revision-conflict';error.card=card;return error;};
  return {
    maker:createMakerCloudAdapter(db,auth),
    subscribe(uid,next,error) {
      guard(uid);
      const subscriptions=[
        onSnapshot(collection(db,'users',uid,'decks'),{includeMetadataChanges:true},snapshot=>{
          const ratings={};snapshot.forEach(d=>Object.assign(ratings,d.data().ratings || {}));
          next('ratings',ratings,!snapshot.metadata.fromCache && !snapshot.metadata.hasPendingWrites);
        },error),
        onSnapshot(collection(db,'users',uid,'history'),{includeMetadataChanges:true},snapshot=>next('history',snapshot.docs.map(d=>d.data()),!snapshot.metadata.fromCache && !snapshot.metadata.hasPendingWrites),error),
        onSnapshot(doc(db,'users',uid,'settings','profile'),{includeMetadataChanges:true},snapshot=>next('profile',snapshot.exists()?snapshot.data():null,!snapshot.metadata.fromCache && !snapshot.metadata.hasPendingWrites),error)
      ];
      return ()=>subscriptions.forEach(unsubscribe=>unsubscribe());
    },
    async writeRating(uid,card,item,seriesCards) {
      guard(uid);
      // A replaced built-in deck can have a new rating document while keeping
      // its navigation/history identity. Retired records are never rewritten.
      const sourceDeck=window.FLASHCARD_DATA.subjects.flatMap(subject=>subject.decks).find(deck=>deck.id===item.deck);
      const reference=doc(db,'users',uid,'decks',sourceDeck?.cloudRatingScope || item.deck);
      let sawMissing=false;
      const commit=()=>runTransaction(db,async transaction=>{
        guard(uid);
        const snapshot=await transaction.get(reference),data=snapshot.exists()?snapshot.data():{},ratings={...(data.ratings || {})};
        sawMissing=!snapshot.exists();
        const current=ratings[card] || null;
        if(current!==item.base && current!==item.value)throw conflict(card);
        ratings[card]=item.value;
        guard(uid);
        transaction.set(reference,{ratings,lastCard:card,updatedAt:serverTimestamp()});
        // Atomic with its rating, and calculated from the merged server deck.
        const point={deck:item.series,date:item.date,known:seriesCards.filter(id=>ratings[id]==='know').length,total:seriesCards.length};
        transaction.set(doc(db,'users',uid,'history',item.series+'--'+item.date),{...point,updatedAt:serverTimestamp()});
        return point;
      },{maxAttempts:3});
      try {return await commit();}
      catch(error){
        // Two devices can both read a missing deck before its first creation.
        // Rules may reject the stale full-map write before transaction retry.
        // Retry once only after confirming the owner-visible deck now exists.
        guard(uid);
        if(error?.code==='permission-denied' && sawMissing && (await getDocFromServer(reference)).exists())return commit();
        throw error;
      }
    },
    writeProfile(uid,profile,version,operation) {
      guard(uid);
      const reference=doc(db,'users',uid,'settings','profile');
      return runTransaction(db,async transaction=>{
        guard(uid);
        const snapshot=await transaction.get(reference),data=snapshot.exists()?snapshot.data():{version:0};
        if(data.operation===operation)return data.version;
        if(data.version!==version)throw conflict('profile');
        guard(uid);
        transaction.set(reference,{...profile,version:version+1,operation,updatedAt:serverTimestamp()});
        return version+1;
      },{maxAttempts:3});
    }
  };
}
