// Curated product notes; only account-backed reactions are shared.
(() => {
  'use strict';
  const $=id=>document.getElementById(id);
  const releases=[
    {id:'home-real-reactions',date:'2 November 2026 · New',title:'React to an update',copy:'Choose Helpful, Like or More like this. Totals start at zero and count real signed-in choices; your name and profile stay private.'},
    {id:'home-study-only',date:'1 November 2026',title:'A focused revision desk',copy:'The public site now keeps its homepage, flashcards, papers, maths resources and whiteboard together for GCSE study.'},
    {id:'home-cloud-flashcards',date:'5 October 2026',title:'Save your own flashcards',copy:'Sign in, choose Save deck, and your questions, answers, highlights and personal confidence ratings are saved to your private account.'},
    {id:'home-maths-resources',date:'3 October 2026',title:'Maths resources in one place',copy:'Browse Edexcel GCSE Maths and AQA Level 2 Further Maths topic links, with videos, practice and solutions kept on their original sites.'}
  ];
  const choices=[{id:'helpful',label:'Helpful',symbol:'✓'},{id:'like',label:'Like',symbol:'♥'},{id:'more',label:'More like this',symbol:'＋'}];
  const rows=new Map();let generation=0,activeUid=null,connectingUid=null,unsubscribe=null;const busy=new Set();
  const signedIn=()=>window.RevisionStore?.state?.().uid||null;
  const status=text=>{const target=$('updates-status');if(target)target.textContent=text;};
  function node(tag,className,text){const element=document.createElement(tag);if(className)element.className=className;if(text!==undefined)element.textContent=text;return element;}
  function blankRow(){return {counts:null,reaction:'',confirmed:false};}
  function renderItem(item){
    const article=node('article','update-card');article.dataset.updateId=item.id;
    const heading=node('div','update-card-heading');heading.append(node('p','eyebrow',item.date),node('h3','',item.title));
    article.append(heading,node('p','update-card-copy',item.copy));
    const group=node('div','update-reactions');group.setAttribute('role','group');group.setAttribute('aria-label','React to '+item.title);
    for(const choice of choices){
      const button=node('button','button button-quiet update-reaction');button.type='button';button.dataset.reaction=choice.id;
      button.disabled=true;button.setAttribute('aria-pressed','false');button.setAttribute('aria-label',choice.label+': sign in to react');
      button.append(node('span','update-reaction-symbol',choice.symbol),node('span','update-reaction-label',choice.label),node('span','update-reaction-count',''));
      button.addEventListener('click',()=>react(item.id,choice.id));group.append(button);
    }
    article.append(group);rows.set(item.id,{article,counts:null,reaction:'',confirmed:false});return article;
  }
  function render(){
    const uid=activeUid;
    for(const item of releases){
      const row=rows.get(item.id);if(!row)continue;
      for(const button of row.article.querySelectorAll('[data-reaction]')){
        const key=button.dataset.reaction,count=row.counts?.[key],ready=Boolean(uid&&row.confirmed&&Number.isSafeInteger(count));
        const selected=ready&&row.reaction===key,number=button.querySelector('.update-reaction-count');
        number.textContent=ready?count.toLocaleString('en-GB'):'';number.hidden=!ready;
        button.disabled=!ready||busy.has(item.id);button.setAttribute('aria-pressed',String(Boolean(selected)));
        button.setAttribute('aria-label',`${choices.find(choice=>choice.id===key).label}: ${ready?count:'not available'}${selected?'; selected':''}`);
        button.setAttribute('aria-busy',String(busy.has(item.id)));
      }
    }
  }
  function stop(){generation++;unsubscribe?.();unsubscribe=null;activeUid=null;connectingUid=null;busy.clear();for(const row of rows.values())Object.assign(row,blankRow());render();}
  function homeVisible(){return Boolean($('view-home')&&!$('view-home').hidden);}
  async function sync(){
    const uid=signedIn();
    const signIn=$('updates-signin');if(signIn)signIn.hidden=Boolean(uid)||!homeVisible();
    if(!homeVisible()||!uid){if(activeUid||connectingUid)stop();status(uid?'Updates appear on Home.':'Sign in to see real reaction totals and react. Your choice stays private to your account.');return;}
    if(activeUid===uid||connectingUid===uid)return;
    stop();const token=generation,owner=uid;connectingUid=owner;
    for(const row of rows.values())Object.assign(row,blankRow());
    status('Loading real reaction totals from your account…');render();
    try{
      const adapter=await window.RevisionStore.updatesAdapter(owner);
      if(token!==generation||signedIn()!==owner||!homeVisible())return;
      connectingUid=null;activeUid=owner;
      unsubscribe=adapter.subscribe(owner,releases.map(item=>item.id),(id,counts,reaction,confirmed)=>{
        if(token!==generation||activeUid!==owner)return;
        const row=rows.get(id);if(!row)return;
        row.counts=counts;row.reaction=reaction;row.confirmed=confirmed;render();
        const all=[...rows.values()].every(value=>value.confirmed);
        status(all?'Reaction totals show real choices from signed-in accounts. Only totals are shared.':'Waiting for the server to confirm reaction totals…');
      },()=>{
        if(token!==generation||activeUid!==owner)return;
        for(const row of rows.values())row.confirmed=false;
        render();status('Could not load reaction totals. Check your connection and reload Home.');
      });
    }catch(_){
      if(token!==generation)return;connectingUid=null;activeUid=null;render();status('Could not load reaction totals. Sign in again or check your connection.');
    }
  }
  async function react(updateId,reaction){
    const owner=activeUid,row=rows.get(updateId);if(!owner||!row?.confirmed||busy.has(updateId))return;
    busy.add(updateId);render();status('Saving your reaction…');
    try{
      const adapter=await window.RevisionStore.updatesAdapter(owner);
      if(activeUid!==owner)return;
      await adapter.setReaction(owner,updateId,reaction);
      if(activeUid===owner)status('Reaction saved to your account. Only the combined total is shared.');
    }catch(_){if(activeUid===owner)status('Reaction was not confirmed. Your previous choice is unchanged; check your connection and try again.');}
    finally{busy.delete(updateId);render();}
  }
  const list=$('updates-list');if(!list)return;
  list.replaceChildren(...releases.map(renderItem));
  render();
  $('updates-signin')?.addEventListener('click',()=>$('account-button')?.click());
  window.addEventListener('revision-account-change',sync);
  window.addEventListener('revision-data-change',event=>{if(event.detail?.type==='scope')sync();});
  window.addEventListener('revision-view-change',sync);
  sync();
})();
