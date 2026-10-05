(() => {
  'use strict';
  const $=id=>document.getElementById(id),storage=window.RevisionMakerStorage,rich=window.RevisionMakerRichText;
  if(!storage||!rich||!$('view-maker'))return;
  const clone=value=>JSON.parse(JSON.stringify(value));
  const currentScope=()=>storage.scope(window.RevisionStore?.state().uid||null);
  let owner=currentScope(),generation=0,listJob=0,job=0,rows=[],draft=null,saved=null,dirty=false,busy=false,conflict=false,visible=false,composing=false;
  let confirmation=null,confirmFocus=null,study=null,studyPosition=0,studyFocus=null;
  let cloudPromise=null,unsubscribe=()=>{},cloudReady=false,saveOperation=null,progressBusy=false,progressPending=0,progressError=false,deviceRows=[];
  const highlightControls=[];
  const signedIn=()=>owner.startsWith('uid:');
  const accountId=()=>signedIn()?owner.slice(4):null;
  const place=()=>signedIn()?'your account':'this device';
  const operation=()=>crypto.randomUUID();
  const status=message=>{$('maker-status').textContent=message;};
  function valid(token,scope){return token===generation&&scope===owner&&scope===currentScope();}
  function bounded(promise){let timer;return Promise.race([promise,new Promise((_,reject)=>{timer=setTimeout(()=>reject(Object.assign(Error('Cloud saving could not be confirmed in time. Your draft is still here. Check the saved copy before retrying; the request may have arrived.'),{code:'maker-unconfirmed'})),15000);})]).finally(()=>clearTimeout(timer));}
  function errorText(error){
    if(['maker-conflict','revision-conflict'].includes(error?.code))return 'This deck changed on another device. Your draft is still here. Download a backup, then reload the saved copy.';
    if(error?.code==='permission-denied')return 'Account access was denied. Your draft is still here. Sign in again; if it continues, the owner must check the database rules.';
    if(error?.code==='unavailable')return 'Cloud saving is unavailable. Your draft is still here. Reconnect and retry, or download a backup.';
    return error?.message||'Could not save. Your draft is still here; download a backup and retry.';
  }
  async function cloud(){
    if(!signedIn())throw Error('Sign in to open your account decks.');
    const token=generation,scope=owner,uid=accountId();
    if(!cloudPromise)cloudPromise=window.RevisionStore.makerAdapter(uid).catch(error=>{if(valid(token,scope))cloudPromise=null;throw error;});
    const adapter=await bounded(cloudPromise);if(!valid(token,scope))throw Error('Account changed. Reopen your decks.');return adapter;
  }
  async function readDeck(scope,id){if(scope!==owner)throw Error('Account changed.');return signedIn()?(await cloud()).read(accountId(),id):storage.read(scope,id);}
  async function writeDeck(scope,value,revision,op){if(scope!==owner)throw Error('Account changed.');return signedIn()?bounded((await cloud()).save(accountId(),value,revision,op)):storage.save(scope,value,revision);}
  function scopeCopy(){
    $('maker-list-title').textContent=signedIn()?'Your account decks':'Your device decks';
    $('maker-save-note').textContent=signedIn()?'Saved decks, highlights and confidence ratings sync privately when you sign in to this account on another device. Choose Save deck and wait for confirmation. PDFs, drawings and appearance settings stay device-only.':'Guest decks stay on this device. Sign in to create cloud-saved decks, or explicitly copy an existing device deck to your account.';
    $('maker-device-import').hidden=!signedIn();
  }
  function button(label,action){const element=document.createElement('button');element.type='button';element.className='button button-quiet';element.textContent=label;element.addEventListener('click',action);return element;}
  function autoGrow(element){element.style.height='auto';element.style.height=Math.max(104,element.scrollHeight||104)+'px';}
  function controls(){
    $('maker-form').setAttribute('aria-busy',String(busy));
    $('maker-new').disabled=busy||rows.length>=storage.limits.decks;
    $('maker-import-file').disabled=busy;
    $('maker-form').querySelectorAll('input,textarea,button').forEach(element=>element.disabled=busy);
    $('maker-save').disabled=busy||conflict;
    $('maker-add-card').disabled=busy||Boolean(draft&&draft.cards.length>=storage.limits.cards);
    $('maker-reload').hidden=!saved||!conflict;
    $('maker-list').querySelectorAll('button').forEach(element=>element.disabled=busy);
    $('maker-device-list').querySelectorAll('button').forEach(element=>element.disabled=busy);
    $('maker-show-device').disabled=busy;
    $('maker-confirm-ok').disabled=busy;$('maker-confirm-cancel').disabled=busy;
    $('maker-confirm-dialog').setAttribute('aria-busy',String(busy));
    highlightControls.forEach(update=>update());
  }
  function clearErrors(){
    $('maker-title-error').textContent='';$('maker-subject-error').textContent='';$('maker-error').textContent='';
    $('maker-form').querySelectorAll('[aria-invalid]').forEach(element=>element.removeAttribute('aria-invalid'));
    $('maker-cards').querySelectorAll('.field-error').forEach(element=>element.textContent='');
  }
  function updateDraftNote(){
    $('maker-draft-note').textContent=dirty?'Unsaved draft. Visiting another section keeps it in this window; download a backup before closing or refreshing.':'Changes stay in this window until you choose Save deck. Visiting another section keeps this draft; closing or refreshing may lose it.';
  }
  function changed(){dirty=true;saveOperation=null;updateDraftNote();}
  function renderCards(focusIndex=-1){
    highlightControls.length=0;
    $('maker-cards').replaceChildren(...draft.cards.map((card,index)=>{
      const fieldset=document.createElement('fieldset');fieldset.className='maker-card-editor';
      const legend=document.createElement('legend');legend.textContent='Card '+(index+1);fieldset.append(legend);
      const actions=document.createElement('div');actions.className='maker-card-heading';
      const remove=button('Remove card '+(index+1),()=>{
        if(busy||!draft)return;
        if(draft.cards.length===1){status('Keep at least one card in your deck. Edit this card instead.');return;}
        const held=draft;
        confirmAction('Remove card '+(index+1)+' from this draft?','The change is not saved yet. Discarding the entire draft restores an existing saved deck.','Remove card',()=>{if(draft!==held)return;draft.cards.splice(index,1);changed();renderCards(Math.min(index,draft.cards.length-1));});
      });
      actions.append(remove);fieldset.append(actions);
      for(const [field,label,max] of [['question','Question',storage.limits.question],['answer','Answer',storage.limits.answer]]){
        const id='maker-card-'+index+'-'+field,labelElement=document.createElement('label'),input=document.createElement('textarea'),error=document.createElement('p');
        labelElement.htmlFor=id;labelElement.textContent=label;input.id=id;input.name=field+'-'+index;input.value=card[field];input.maxLength=max;input.required=true;input.rows=3;input.style.resize='none';input.setAttribute('aria-describedby',id+'-error');
        error.id=id+'-error';error.className='field-error';
        const marks=field+'Highlights',tools=document.createElement('div'),preview=document.createElement('p'),help=document.createElement('p');
        tools.className='maker-highlight-tools';preview.className='maker-text-preview';preview.id=id+'-preview';help.id=id+'-help';help.className='small-copy';help.textContent='Select important text, then highlight it. Editing this text clears its highlights.';
        input.setAttribute('aria-describedby',id+'-error '+help.id);
        const highlight=button('Highlight selection',()=>{if(busy||composing)return;try{card[marks]=rich.addHighlight(input.value,card[marks]||[],input.selectionStart,input.selectionEnd);changed();renderPreview();status('Important text highlighted. Choose Save deck to keep it.');}catch(error){status(errorText(error));}input.focus();});
        highlight.setAttribute('aria-label','Highlight selection in '+label.toLowerCase()+' '+(index+1));
        const clear=button('Clear highlights',()=>{if(busy)return;card[marks]=[];changed();renderPreview();input.focus();});
        clear.setAttribute('aria-label','Clear highlights in '+label.toLowerCase()+' '+(index+1));
        const selection=()=>{highlight.disabled=busy||input.selectionStart===input.selectionEnd;};
        function renderPreview(){rich.render(preview,card[field],card[marks]||[]);preview.hidden=!(card[marks]?.length);clear.disabled=busy||!(card[marks]?.length);selection();}
        highlightControls.push(()=>{clear.disabled=busy||!(card[marks]?.length);selection();});
        input.addEventListener('input',()=>{if(busy)return;card[marks]=rich.editHighlights(card[field],input.value,card[marks]||[]);card[field]=input.value;error.textContent='';input.removeAttribute('aria-invalid');autoGrow(input);changed();renderPreview();});
        for(const event of ['select','keyup','mouseup'])input.addEventListener(event,selection);
        tools.append(highlight,clear);fieldset.append(labelElement,input,tools,help,preview,error);renderPreview();
      }
      return fieldset;
    }));
    $('maker-card-count').textContent=draft.cards.length+' / '+storage.limits.cards+' cards';
    $('maker-cards').querySelectorAll('textarea').forEach(autoGrow);controls();
    if(focusIndex>=0)$('maker-card-'+focusIndex+'-question')?.focus();
  }
  function renderEditor(){
    $('maker-form').hidden=!draft;
    if(!draft){highlightControls.length=0;$('maker-cards').replaceChildren();$('maker-deck-title').value='';$('maker-deck-subject').value='';clearErrors();controls();return;}
    $('maker-editor-title').textContent=saved?'Edit deck':'New deck';
    $('maker-deck-title').value=draft.title;$('maker-deck-subject').value=draft.subject;clearErrors();renderCards();updateDraftNote();controls();
  }
  function createDraft(content={title:'',subject:'',cards:[storage.newCard()]}){
    draft={id:operation(),...storage.validate(content,{draft:true}),archived:false};saved=null;dirty=Boolean(content.title||content.subject||content.cards.some(card=>card.question||card.answer));conflict=false;saveOperation=null;renderEditor();$('maker-deck-title').focus();
    status('New draft. Save deck to keep it in '+place()+', or download a backup.');
  }
  function confirmAction(title,copy,label,action){
    if(busy||$('maker-confirm-dialog').open)return;
    const token=generation,scope=owner;
    confirmFocus=document.activeElement;confirmation=()=>{if(valid(token,scope))return action();};
    $('maker-confirm-title').textContent=title;$('maker-confirm-copy').textContent=copy;$('maker-confirm-ok').textContent=label;
    $('maker-confirm-status').textContent='';
    $('maker-confirm-cancel').textContent=dirty?'Keep editing':'Cancel';$('maker-confirm-dialog').showModal();$('maker-confirm-cancel').focus();
  }
  function replaceDraft(action){
    if(busy)return;
    if(dirty){confirmAction('Discard this draft?','These changes have not been saved. Download a draft backup first if you want to keep them.','Discard draft',()=>{$('maker-confirm-dialog').close();return action();});return;}
    return action();
  }
  function renderList(){
    $('maker-empty').hidden=rows.length>0;
    $('maker-list').replaceChildren(...rows.map(row=>{
      const item=document.createElement('li');item.className='maker-deck-row';
      const content=document.createElement('div'),title=document.createElement('h3'),meta=document.createElement('p');
      title.textContent=row.title;meta.textContent=row.subject+' · '+row.count+' cards'+(row.archived?' · Archived':'')+(signedIn()?' · Private account deck':' · Device only');content.append(title,meta);
      const actions=document.createElement('div');actions.className='maker-deck-actions';
      if(!row.archived){actions.append(button('Practise',()=>openStudy(row.id)),button('Edit',()=>replaceDraft(()=>openDeck(row.id))));}
      actions.append(button('Download backup',()=>exportSaved(row.id)),button(row.archived?'Restore':'Archive',()=>archive(row)));
      item.append(content,actions);return item;
    }));controls();
  }
  async function refreshList(quiet=false){
    const token=generation,scope=owner,request=++listJob;$('maker-list').setAttribute('aria-busy','true');
    scopeCopy();if(!quiet)status('Loading your '+(signedIn()?'account':'device')+' decks…');
    try{
      if(signedIn()){
        const adapter=await cloud();if(!valid(token,scope)||request!==listJob)return;
        unsubscribe();cloudReady=false;
        return await bounded(new Promise((resolve,reject)=>{
          let settled=false;
          unsubscribe=adapter.subscribe(accountId(),(result,confirmed)=>{
            if(!valid(token,scope)||request!==listJob)return;
            if(!confirmed){status('Account decks are not yet confirmed. Reconnect and choose Refresh list.');return;}
            cloudReady=true;rows=result;renderList();
            if(saved&&rows.some(row=>row.id===saved.id&&row.revision>saved.revision)){conflict=true;controls();$('maker-error').textContent='This deck changed on another device. Download your draft backup, then reload the saved copy.';}
            if(!quiet&&!dirty&&!busy)status(rows.length+' account deck'+(rows.length===1?'':'s')+'. Confirmed in private cloud storage.');
            if(!settled){settled=true;resolve();}
          },error=>{if(!valid(token,scope)||request!==listJob)return;cloudReady=false;status(errorText(error));if(!settled){settled=true;reject(error);}});
        }));
      }
      const result=await storage.list(scope);if(!valid(token,scope)||request!==listJob)return;
      rows=result;renderList();
      if(!quiet)status(rows.length+' device deck'+(rows.length===1?'':'s')+'.'+(dirty?' Your unsaved draft is unchanged.':' Sign in for cloud saving.'));
    }catch(error){if(valid(token,scope)&&request===listJob)status(errorText(error));}
    finally{if(valid(token,scope)&&request===listJob)$('maker-list').setAttribute('aria-busy','false');}
  }
  async function openDeck(id,reload=false){
    if(busy)return;const token=generation,scope=owner,request=++job;busy=true;controls();status('Opening saved deck…');
    try{const result=await bounded(readDeck(scope,id));if(!valid(token,scope)||request!==job)return;if(!result||result.archived)throw Error('This deck is unavailable or archived. Refresh the deck list.');saved=result;draft=clone(result);dirty=false;conflict=false;saveOperation=null;renderEditor();$('maker-editor-title').focus();status(reload?'Saved copy reloaded.':'Editing this deck. Choose Save deck to keep changes in '+place()+'.');}
    catch(error){if(valid(token,scope)&&request===job)status(error.message||'Could not open this deck. Your current draft is unchanged.');}
    finally{if(valid(token,scope)&&request===job){busy=false;controls();}}
  }
  function validateForm(){
    clearErrors();let first=null;
    const invalid=(input,error,message)=>{error.textContent=message;input.setAttribute('aria-invalid','true');first ||= input;};
    if(!draft.title.trim()||draft.title.length>storage.limits.title)invalid($('maker-deck-title'),$('maker-title-error'),'Enter a deck title of 1–80 characters.');
    if(!draft.subject.trim()||draft.subject.length>storage.limits.subject)invalid($('maker-deck-subject'),$('maker-subject-error'),'Enter a subject of 1–60 characters.');
    draft.cards.forEach((card,index)=>{for(const field of ['question','answer']){const max=storage.limits[field];if(!card[field].trim()||card[field].length>max)invalid($('maker-card-'+index+'-'+field),$('maker-card-'+index+'-'+field+'-error'),'Enter '+(field==='answer'?'an ':'a ')+field+' of 1–'+max.toLocaleString('en-GB')+' characters.');}});
    if(first){$('maker-error').textContent='Check the labelled fields below before saving.';first.focus();return false;}
    return true;
  }
  async function save(event){
    event.preventDefault();if(!draft||busy||conflict||composing||event.isComposing||!validateForm())return;
    const token=generation,scope=owner,request=++job,value=clone(draft);saveOperation ||= operation();busy=true;controls();status('Saving deck to '+place()+'…');
    try{
      await writeDeck(scope,value,saved?.revision||0,saveOperation);if(!valid(token,scope)||request!==job)return;
      draft=null;saved=null;dirty=false;conflict=false;saveOperation=null;renderEditor();status(signedIn()?'Deck saved to your account. Sign in on another device to open it.':'Deck saved on this device. Sign in to copy it to your account.');await refreshList(true);if(valid(token,scope))$('maker-list-title').focus();
    }catch(error){if(valid(token,scope)&&request===job){conflict=['maker-conflict','revision-conflict'].includes(error.code);$('maker-error').textContent=errorText(error);status('Deck save not confirmed. Your draft is still here.');}}
    finally{if(valid(token,scope)&&request===job){busy=false;controls();}}
  }
  function download(value,title='deck'){
    const raw=storage.backup(value),blob=new Blob([raw],{type:'application/json'}),url=URL.createObjectURL(blob),link=document.createElement('a');
    link.href=url;link.download=(title.replace(/[^a-zA-Z0-9-]/g,'-').slice(0,60)||'deck')+'-backup.json';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  function exportDraft(){if(!draft)return;try{download(draft,draft.title||'draft');status('Draft backup downloaded. This does not save the deck in the app.');}catch(error){status(error.message||'Could not prepare this backup. Your draft is unchanged.');}}
  async function exportSaved(id){
    const token=generation,scope=owner;try{const result=await bounded(readDeck(scope,id));if(!valid(token,scope))return;if(!result)throw Error('Saved deck was not found. Refresh the list.');download(result,result.title);status('Deck backup downloaded. Keep this file private.');}catch(error){if(valid(token,scope))status(errorText(error));}
  }
  async function importBackup(event){
    const file=event.target.files?.[0];event.target.value='';if(!file||busy)return;
    const token=generation,scope=owner,request=++job;busy=true;controls();
    try{if(!file.size||file.size>storage.limits.backup)throw Error('Choose a Revision Deck JSON backup no larger than 4 MB.');const content=storage.parseBackup(await file.text());if(!valid(token,scope)||request!==job)return;busy=false;controls();replaceDraft(()=>createDraft(content));}
    catch(error){if(valid(token,scope)&&request===job)status(error.message||'The backup could not be read. Your current draft is unchanged.');}
    finally{if(valid(token,scope)&&request===job){busy=false;controls();}}
  }
  function archive(row){
    if(dirty&&saved?.id===row.id){replaceDraft(()=>{draft=null;saved=null;dirty=false;conflict=false;renderEditor();archive(row);});return;}
    const token=generation,scope=owner,archived=!row.archived;
    confirmAction((archived?'Archive “':'Restore “')+row.title+'”?',archived?'This hides the deck from practice, but keeps its cards and backup available here. You can restore it.':'This makes the saved deck available for practice again.',''+(archived?'Archive deck':'Restore deck'),async()=>{
      if(!valid(token,scope)||busy)return;const request=++job;busy=true;controls();
      try{const record=await bounded(readDeck(scope,row.id));if(!valid(token,scope)||request!==job)return;if(!record||record.revision!==row.revision)throw Error('This deck changed in another window. Refresh the list and try again.');await writeDeck(scope,{...record,archived},row.revision,operation());if(!valid(token,scope)||request!==job)return;
        if(saved?.id===row.id){draft=null;saved=null;dirty=false;conflict=false;renderEditor();}
        status(archived?'Deck archived. Its saved cards are still available for backup or Restore.':'Deck restored.');await refreshList(true);if(valid(token,scope))$('maker-list-title').focus();
      }catch(error){if(valid(token,scope)&&request===job){const message=errorText(error);status(message);$('maker-confirm-status').textContent=message;return false;}}
      finally{if(valid(token,scope)&&request===job){busy=false;controls();}}
    });
  }
  function renderStudy(){
    progressError=false;
    const card=study.cards[studyPosition];$('maker-study-title').textContent=study.title;$('maker-study-position').textContent='Card '+(studyPosition+1)+' of '+study.cards.length;
    rich.render($('maker-study-question'),card.question,card.questionHighlights);rich.render($('maker-study-answer'),card.answer,card.answerHighlights);$('maker-study-answer').hidden=true;$('maker-study-reveal').textContent='Show answer';$('maker-study-reveal').setAttribute('aria-expanded','false');$('maker-study-previous').disabled=studyPosition===0;$('maker-study-next').disabled=studyPosition===study.cards.length-1;renderConfidence();
  }
  function renderConfidence(){
    if(!study)return;const card=study.cards[studyPosition],entry=study.progress?.[card.id],rating=entry&&entry.contentRevision===card.contentRevision?entry.rating:null;
    $('maker-study-status').textContent=signedIn()?(progressBusy?'Saving confidence to your account…':rating?'Saved confidence: '+({know:'Know',unsure:'Unsure',learn:'Learn again'}[rating])+'.':'No saved confidence for this card yet.'):'Sign in to save confidence across devices. Guest practice does not track progress.';
    for(const value of ['know','unsure','learn']){$('maker-rate-'+value).disabled=!signedIn()||progressBusy||progressError||$('maker-study-answer').hidden;$('maker-rate-'+value).setAttribute('aria-pressed',String(rating===value));}
    $('maker-study-previous').disabled=progressBusy||studyPosition===0;$('maker-study-next').disabled=progressBusy||studyPosition===study.cards.length-1;$('maker-study-reveal').disabled=progressBusy;
    $('maker-study-reload').hidden=!signedIn();$('maker-study-reload').disabled=progressBusy;
  }
  async function rate(value){
    if(!study||!signedIn()||progressBusy||$('maker-study-answer').hidden)return;
    const token=generation,scope=owner,held=study,card=study.cards[studyPosition],entry=study.progress?.[card.id];progressBusy=true;progressPending++;renderConfidence();
    try{const result=await bounded((await cloud()).writeProgress(accountId(),study.id,card.id,value,card.contentRevision,entry?.version||0,operation()));if(!valid(token,scope)||study!==held)return;study.progress ||= {};study.progress[card.id]=result;}
    catch(error){if(valid(token,scope)&&study===held){progressBusy=false;progressError=true;renderConfidence();$('maker-study-status').textContent=errorText(error)+' Choose Reload progress to check the saved copy.';return;}}
    finally{if(valid(token,scope)){progressPending=Math.max(0,progressPending-1);if(study===held&&progressBusy){progressBusy=false;renderConfidence();}}}
  }
  async function openStudy(id){
    if(busy||$('maker-study-dialog').open)return;const token=generation,scope=owner,request=++job;studyFocus=document.activeElement;busy=true;controls();
    try{const result=await bounded(readDeck(scope,id));if(!valid(token,scope)||request!==job)return;if(!result||result.archived)throw Error('This deck is unavailable or archived. Refresh the list.');study=result;studyPosition=0;progressBusy=false;renderStudy();$('maker-study-dialog').showModal();$('maker-study-close').focus();}
    catch(error){if(valid(token,scope))status(error.message||'Could not open this deck for practice.');}
    finally{if(valid(token,scope)&&request===job){busy=false;controls();}}
  }
  function resetScope(){
    const next=currentScope();if(next===owner)return false;
    const lost=dirty;unsubscribe();unsubscribe=()=>{};cloudPromise=null;cloudReady=false;saveOperation=null;progressBusy=false;progressPending=0;deviceRows=[];owner=next;generation++;job++;listJob++;rows=[];draft=null;saved=null;dirty=false;busy=false;conflict=false;composing=false;confirmation=null;study=null;
    confirmFocus=null;studyFocus=null;if($('maker-confirm-dialog').open)$('maker-confirm-dialog').close();if($('maker-study-dialog').open)$('maker-study-dialog').close();
    for(const id of ['maker-study-title','maker-study-position','maker-study-question','maker-study-answer','maker-confirm-title','maker-confirm-copy','maker-card-count'])$(id).textContent='';
    $('maker-study-answer').hidden=true;$('maker-study-reveal').textContent='Show answer';$('maker-study-reveal').setAttribute('aria-expanded','false');
    $('maker-device-list').replaceChildren();scopeCopy();renderEditor();renderList();status('Account changed. Showing its separate '+(signedIn()?'cloud':'device')+' decks.'+(lost?' The previous account’s unsaved draft was cleared.':''));
    if(visible)refreshList(true);return true;
  }
  $('maker-new').addEventListener('click',()=>replaceDraft(()=>createDraft()));
  $('maker-refresh').addEventListener('click',()=>refreshList());
  $('maker-deck-title').addEventListener('input',()=>{if(!draft||busy)return;draft.title=$('maker-deck-title').value;changed();$('maker-title-error').textContent='';$('maker-deck-title').removeAttribute('aria-invalid');});
  $('maker-deck-subject').addEventListener('input',()=>{if(!draft||busy)return;draft.subject=$('maker-deck-subject').value;changed();$('maker-subject-error').textContent='';$('maker-deck-subject').removeAttribute('aria-invalid');});
  $('maker-add-card').addEventListener('click',()=>{if(!draft||busy||draft.cards.length>=storage.limits.cards)return;draft.cards.push(storage.newCard());changed();renderCards(draft.cards.length-1);});
  $('maker-form').addEventListener('submit',save);
  $('maker-form').addEventListener('compositionstart',()=>{composing=true;});
  $('maker-form').addEventListener('compositionend',()=>{composing=false;});
  $('maker-discard').addEventListener('click',()=>replaceDraft(()=>{draft=null;saved=null;dirty=false;conflict=false;renderEditor();status('Draft discarded. Saved decks were not changed.');$('maker-new').focus();}));
  $('maker-export-draft').addEventListener('click',exportDraft);
  $('maker-reload').addEventListener('click',()=>{if(saved)replaceDraft(()=>openDeck(saved.id,true));});
  $('maker-import-file').addEventListener('change',importBackup);
  $('maker-confirm-cancel').addEventListener('click',()=>{confirmation=null;$('maker-confirm-dialog').close();});
  $('maker-confirm-ok').addEventListener('click',async()=>{if(busy)return;const action=confirmation,token=generation;confirmation=null;try{const result=await action?.();if(token!==generation||confirmation)return;if(result===false){confirmation=action;return;}$('maker-confirm-dialog').close();}catch(error){if(token===generation){confirmation=action;$('maker-confirm-status').textContent=errorText(error);}}});
  $('maker-confirm-dialog').addEventListener('cancel',()=>{confirmation=null;});
  $('maker-confirm-dialog').addEventListener('close',()=>{if($('maker-confirm-dialog').open)return;const target=confirmFocus;confirmFocus=null;if(visible){if(target?.isConnected)target.focus();else $('maker-list-title').focus();}});
  $('maker-study-close').addEventListener('click',()=>$('maker-study-dialog').close());
  $('maker-study-dialog').addEventListener('close',()=>{study=null;progressBusy=false;const target=studyFocus;studyFocus=null;if(visible){if(target?.isConnected)target.focus();else $('maker-list-title').focus();}});
  $('maker-study-reveal').addEventListener('click',()=>{if(!study||progressBusy)return;const reveal=$('maker-study-answer').hidden;$('maker-study-answer').hidden=!reveal;$('maker-study-reveal').textContent=reveal?'Hide answer':'Show answer';$('maker-study-reveal').setAttribute('aria-expanded',String(reveal));renderConfidence();});
  $('maker-study-previous').addEventListener('click',()=>{if(study&&studyPosition>0){studyPosition--;renderStudy();}});
  $('maker-study-next').addEventListener('click',()=>{if(study&&studyPosition<study.cards.length-1){studyPosition++;renderStudy();}});
  for(const value of ['know','unsure','learn'])$('maker-rate-'+value).addEventListener('click',()=>rate(value));
  $('maker-study-reload').addEventListener('click',async()=>{if(!study||progressBusy)return;const held=study,token=generation,scope=owner,index=studyPosition;progressBusy=true;progressPending++;renderConfidence();try{const result=await bounded(readDeck(scope,held.id));if(!valid(token,scope)||study!==held)return;if(!result||result.archived)throw Error('This deck is now unavailable. Close practice and refresh the list.');study=result;studyPosition=Math.min(index,result.cards.length-1);progressBusy=false;renderStudy();}catch(error){if(valid(token,scope)&&study===held){progressBusy=false;renderConfidence();$('maker-study-status').textContent=errorText(error);}}finally{if(valid(token,scope))progressPending=Math.max(0,progressPending-1);}});
  $('maker-show-device').addEventListener('click',async()=>{
    if(!signedIn()||busy)return;const token=generation,scope=owner;busy=true;controls();
    try{const [accountRows,guestRows]=await Promise.all([storage.list(scope),storage.list('guest')]);if(!valid(token,scope))return;deviceRows=[...accountRows.map(row=>({...row,scope})),...guestRows.map(row=>({...row,scope:'guest'}))];$('maker-device-list').replaceChildren(...deviceRows.map(row=>{const item=document.createElement('li'),label=document.createElement('p');label.textContent=row.title+' · '+row.subject+' · '+(row.scope==='guest'?'Guest device deck':'Older account device deck');item.append(label,button('Copy to account',()=>confirmAction('Copy “'+row.title+'” to your account?','This uploads its questions, answers and highlights to private cloud storage. Only copy decks you created. The device copy remains unchanged.','Copy to account',async()=>{
      if(busy||!valid(token,scope))return;busy=true;controls();
      try{const record=await storage.read(row.scope,row.id);if(!valid(token,scope))return;if(!record)throw Error('Device deck unavailable. Refresh the device list.');await writeDeck(scope,{...record,archived:false},0,operation());if(!valid(token,scope))return;status('Deck copied to your account. Its device copy is unchanged.');await refreshList(true);}
      catch(error){if(valid(token,scope)){const message=errorText(error);status(message);$('maker-confirm-status').textContent=message;return false;}}finally{if(valid(token,scope)){busy=false;controls();}}
    })));return item;}));if(!deviceRows.length)status('No device decks were found here. Restore a JSON backup to create an account draft.');}
    catch(error){if(valid(token,scope))status(errorText(error));}finally{if(valid(token,scope)){busy=false;controls();}}
  });
  window.addEventListener('revision-account-change',resetScope);
  window.addEventListener('revision-data-change',event=>{if(event.detail?.type==='scope')resetScope();});
  window.addEventListener('beforeunload',event=>{if(dirty||busy||progressPending){event.preventDefault();event.returnValue='';}});
  window.RevisionMaker=Object.freeze({
    onShow(){visible=true;resetScope();$('maker-cards').querySelectorAll('textarea').forEach(autoGrow);return refreshList(dirty||conflict);},
    onHide(){visible=false;confirmation=null;if($('maker-confirm-dialog').open)$('maker-confirm-dialog').close();if($('maker-study-dialog').open)$('maker-study-dialog').close();},
    beforeNavigate(){return true;},
    hasDraft(){return dirty;},
    hasPending(){return busy||progressPending>0;}
  });
  scopeCopy();renderEditor();renderList();
})();
