(() => {
  'use strict';
  const $=id=>document.getElementById(id),storage=window.RevisionMakerStorage;
  if(!storage||!$('view-maker'))return;
  const clone=value=>JSON.parse(JSON.stringify(value));
  const currentScope=()=>storage.scope(window.RevisionStore?.state().uid||null);
  let owner=currentScope(),generation=0,listJob=0,job=0,rows=[],draft=null,saved=null,dirty=false,busy=false,conflict=false,visible=false,composing=false;
  let confirmation=null,confirmFocus=null,study=null,studyPosition=0,studyFocus=null;
  const status=message=>{$('maker-status').textContent=message;};
  function valid(token,scope){return token===generation&&scope===owner&&scope===currentScope();}
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
  }
  function clearErrors(){
    $('maker-title-error').textContent='';$('maker-subject-error').textContent='';$('maker-error').textContent='';
    $('maker-form').querySelectorAll('[aria-invalid]').forEach(element=>element.removeAttribute('aria-invalid'));
    $('maker-cards').querySelectorAll('.field-error').forEach(element=>element.textContent='');
  }
  function updateDraftNote(){
    $('maker-draft-note').textContent=dirty?'Unsaved draft. Visiting another section keeps it in this window; download a backup before closing or refreshing.':'Changes stay in this window until you choose Save deck. Visiting another section keeps this draft; closing or refreshing may lose it.';
  }
  function changed(){dirty=true;updateDraftNote();}
  function renderCards(focusIndex=-1){
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
        input.addEventListener('input',()=>{if(busy)return;card[field]=input.value;error.textContent='';input.removeAttribute('aria-invalid');autoGrow(input);changed();});
        fieldset.append(labelElement,input,error);
      }
      return fieldset;
    }));
    $('maker-card-count').textContent=draft.cards.length+' / '+storage.limits.cards+' cards';
    $('maker-cards').querySelectorAll('textarea').forEach(autoGrow);controls();
    if(focusIndex>=0)$('maker-card-'+focusIndex+'-question')?.focus();
  }
  function renderEditor(){
    $('maker-form').hidden=!draft;
    if(!draft){$('maker-cards').replaceChildren();$('maker-deck-title').value='';$('maker-deck-subject').value='';clearErrors();controls();return;}
    $('maker-editor-title').textContent=saved?'Edit deck':'New deck';
    $('maker-deck-title').value=draft.title;$('maker-deck-subject').value=draft.subject;clearErrors();renderCards();updateDraftNote();controls();
  }
  function createDraft(content={title:'',subject:'',cards:[{question:'',answer:''}]}){
    draft={id:crypto.randomUUID(),...clone(content),archived:false};saved=null;dirty=Boolean(content.title||content.subject||content.cards.some(card=>card.question||card.answer));conflict=false;renderEditor();$('maker-deck-title').focus();
    status('New draft. Save deck to keep it on this device, or download a backup.');
  }
  function confirmAction(title,copy,label,action){
    if(busy||$('maker-confirm-dialog').open)return;
    const token=generation,scope=owner;
    confirmFocus=document.activeElement;confirmation=()=>{if(valid(token,scope))action();};
    $('maker-confirm-title').textContent=title;$('maker-confirm-copy').textContent=copy;$('maker-confirm-ok').textContent=label;
    $('maker-confirm-cancel').textContent=dirty?'Keep editing':'Cancel';$('maker-confirm-dialog').showModal();$('maker-confirm-cancel').focus();
  }
  function replaceDraft(action){
    if(busy)return;
    if(dirty){confirmAction('Discard this draft?','These changes have not been saved. Download a draft backup first if you want to keep them.','Discard draft',action);return;}
    return action();
  }
  function renderList(){
    $('maker-empty').hidden=rows.length>0;
    $('maker-list').replaceChildren(...rows.map(row=>{
      const item=document.createElement('li');item.className='maker-deck-row';
      const content=document.createElement('div'),title=document.createElement('h3'),meta=document.createElement('p');
      title.textContent=row.title;meta.textContent=row.subject+' · '+row.count+' cards'+(row.archived?' · Archived':'');content.append(title,meta);
      const actions=document.createElement('div');actions.className='maker-deck-actions';
      if(!row.archived){actions.append(button('Practise',()=>openStudy(row.id)),button('Edit',()=>replaceDraft(()=>openDeck(row.id))));}
      actions.append(button('Download backup',()=>exportSaved(row.id)),button(row.archived?'Restore':'Archive',()=>archive(row)));
      item.append(content,actions);return item;
    }));controls();
  }
  async function refreshList(quiet=false){
    const token=generation,scope=owner,request=++listJob;$('maker-list').setAttribute('aria-busy','true');
    if(!quiet)status('Loading your device decks…');
    try{
      const result=await storage.list(scope);if(!valid(token,scope)||request!==listJob)return;
      rows=result;renderList();
      if(!quiet)status(rows.length+' device deck'+(rows.length===1?'':'s')+'.'+(dirty?' Your unsaved draft is unchanged.':' Saved only in this browser, not in the cloud.'));
    }catch(error){if(valid(token,scope)&&request===listJob)status(error.message||'Your device deck list could not be read. Choose Refresh list to retry; your draft is unchanged.');}
    finally{if(valid(token,scope)&&request===listJob)$('maker-list').setAttribute('aria-busy','false');}
  }
  async function openDeck(id,reload=false){
    if(busy)return;const token=generation,scope=owner,request=++job;busy=true;controls();status('Opening saved deck…');
    try{const result=await storage.read(scope,id);if(!valid(token,scope)||request!==job)return;if(!result||result.archived)throw Error('This deck is unavailable or archived. Refresh the deck list.');saved=result;draft=clone(result);dirty=false;conflict=false;renderEditor();$('maker-editor-title').focus();status(reload?'Saved copy reloaded.':'Editing this device deck. Choose Save deck to keep changes.');}
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
    const token=generation,scope=owner,request=++job,value=clone(draft);busy=true;controls();status('Saving deck on this device…');
    try{
      const result=await storage.save(scope,value,saved?.revision||0);if(!valid(token,scope)||request!==job)return;
      draft=null;saved=null;dirty=false;conflict=false;renderEditor();status('Deck saved on this device. It does not sync to your account.');await refreshList(true);if(valid(token,scope))$('maker-list-title').focus();
    }catch(error){if(valid(token,scope)&&request===job){conflict=error.code==='maker-conflict';$('maker-error').textContent=error.message||'Could not save. Your draft is still here; download a backup and retry.';status('Deck not saved. Your draft is still here.');}}
    finally{if(valid(token,scope)&&request===job){busy=false;controls();}}
  }
  function download(value,title='deck'){
    const raw=storage.backup(value),blob=new Blob([raw],{type:'application/json'}),url=URL.createObjectURL(blob),link=document.createElement('a');
    link.href=url;link.download=(title.replace(/[^a-zA-Z0-9-]/g,'-').slice(0,60)||'deck')+'-backup.json';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  function exportDraft(){if(!draft)return;try{download(draft,draft.title||'draft');status('Draft backup downloaded. This does not save the deck in the app.');}catch(error){status(error.message||'Could not prepare this backup. Your draft is unchanged.');}}
  async function exportSaved(id){
    const token=generation,scope=owner;try{const result=await storage.read(scope,id);if(!valid(token,scope))return;if(!result)throw Error('Saved deck was not found. Refresh the list.');download(result,result.title);status('Deck backup downloaded. Keep this file private.');}catch(error){if(valid(token,scope))status(error.message||'Could not prepare this backup.');}
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
      try{const record=await storage.read(scope,row.id);if(!valid(token,scope)||request!==job)return;if(!record||record.revision!==row.revision)throw Error('This deck changed in another window. Refresh the list and try again.');await storage.save(scope,{...record,archived},row.revision);if(!valid(token,scope)||request!==job)return;
        if(saved?.id===row.id){draft=null;saved=null;dirty=false;conflict=false;renderEditor();}
        status(archived?'Deck archived. Its saved cards are still available for backup or Restore.':'Deck restored.');await refreshList(true);if(valid(token,scope))$('maker-list-title').focus();
      }catch(error){if(valid(token,scope)&&request===job)status(error.message||'The deck was not changed. Refresh the list and retry.');}
      finally{if(valid(token,scope)&&request===job){busy=false;controls();}}
    });
  }
  function renderStudy(){
    const card=study.cards[studyPosition];$('maker-study-title').textContent=study.title;$('maker-study-position').textContent='Card '+(studyPosition+1)+' of '+study.cards.length;
    $('maker-study-question').textContent=card.question;$('maker-study-answer').textContent=card.answer;$('maker-study-answer').hidden=true;$('maker-study-reveal').textContent='Show answer';$('maker-study-reveal').setAttribute('aria-expanded','false');$('maker-study-previous').disabled=studyPosition===0;$('maker-study-next').disabled=studyPosition===study.cards.length-1;
  }
  async function openStudy(id){
    if(busy||$('maker-study-dialog').open)return;const token=generation,scope=owner,request=++job;studyFocus=document.activeElement;busy=true;controls();
    try{const result=await storage.read(scope,id);if(!valid(token,scope)||request!==job)return;if(!result||result.archived)throw Error('This deck is unavailable or archived. Refresh the list.');study=result;studyPosition=0;renderStudy();$('maker-study-dialog').showModal();$('maker-study-close').focus();}
    catch(error){if(valid(token,scope))status(error.message||'Could not open this deck for practice.');}
    finally{if(valid(token,scope)&&request===job){busy=false;controls();}}
  }
  function resetScope(){
    const next=currentScope();if(next===owner)return false;
    const lost=dirty;owner=next;generation++;job++;listJob++;rows=[];draft=null;saved=null;dirty=false;busy=false;conflict=false;composing=false;confirmation=null;study=null;
    confirmFocus=null;studyFocus=null;if($('maker-confirm-dialog').open)$('maker-confirm-dialog').close();if($('maker-study-dialog').open)$('maker-study-dialog').close();
    for(const id of ['maker-study-title','maker-study-position','maker-study-question','maker-study-answer','maker-confirm-title','maker-confirm-copy','maker-card-count'])$(id).textContent='';
    $('maker-study-answer').hidden=true;$('maker-study-reveal').textContent='Show answer';$('maker-study-reveal').setAttribute('aria-expanded','false');
    renderEditor();renderList();status('Account changed. Showing its separate device decks.'+(lost?' The previous account’s unsaved draft was cleared.':''));
    if(visible)refreshList(true);return true;
  }
  $('maker-new').addEventListener('click',()=>replaceDraft(()=>createDraft()));
  $('maker-refresh').addEventListener('click',()=>refreshList());
  $('maker-deck-title').addEventListener('input',()=>{if(!draft||busy)return;draft.title=$('maker-deck-title').value;changed();$('maker-title-error').textContent='';$('maker-deck-title').removeAttribute('aria-invalid');});
  $('maker-deck-subject').addEventListener('input',()=>{if(!draft||busy)return;draft.subject=$('maker-deck-subject').value;changed();$('maker-subject-error').textContent='';$('maker-deck-subject').removeAttribute('aria-invalid');});
  $('maker-add-card').addEventListener('click',()=>{if(!draft||busy||draft.cards.length>=storage.limits.cards)return;draft.cards.push({question:'',answer:''});changed();renderCards(draft.cards.length-1);});
  $('maker-form').addEventListener('submit',save);
  $('maker-form').addEventListener('compositionstart',()=>{composing=true;});
  $('maker-form').addEventListener('compositionend',()=>{composing=false;});
  $('maker-discard').addEventListener('click',()=>replaceDraft(()=>{draft=null;saved=null;dirty=false;conflict=false;renderEditor();status('Draft discarded. Saved decks were not changed.');$('maker-new').focus();}));
  $('maker-export-draft').addEventListener('click',exportDraft);
  $('maker-reload').addEventListener('click',()=>{if(saved)replaceDraft(()=>openDeck(saved.id,true));});
  $('maker-import-file').addEventListener('change',importBackup);
  $('maker-confirm-cancel').addEventListener('click',()=>{confirmation=null;$('maker-confirm-dialog').close();});
  $('maker-confirm-ok').addEventListener('click',()=>{const action=confirmation;confirmation=null;$('maker-confirm-dialog').close();action?.();});
  $('maker-confirm-dialog').addEventListener('cancel',()=>{confirmation=null;});
  $('maker-confirm-dialog').addEventListener('close',()=>{const target=confirmFocus;confirmFocus=null;if(visible){if(target?.isConnected)target.focus();else $('maker-list-title').focus();}});
  $('maker-study-close').addEventListener('click',()=>$('maker-study-dialog').close());
  $('maker-study-dialog').addEventListener('close',()=>{study=null;const target=studyFocus;studyFocus=null;if(visible){if(target?.isConnected)target.focus();else $('maker-list-title').focus();}});
  $('maker-study-reveal').addEventListener('click',()=>{if(!study)return;const reveal=$('maker-study-answer').hidden;$('maker-study-answer').hidden=!reveal;$('maker-study-reveal').textContent=reveal?'Hide answer':'Show answer';$('maker-study-reveal').setAttribute('aria-expanded',String(reveal));});
  $('maker-study-previous').addEventListener('click',()=>{if(study&&studyPosition>0){studyPosition--;renderStudy();}});
  $('maker-study-next').addEventListener('click',()=>{if(study&&studyPosition<study.cards.length-1){studyPosition++;renderStudy();}});
  window.addEventListener('revision-account-change',resetScope);
  window.addEventListener('revision-data-change',event=>{if(event.detail?.type==='scope')resetScope();});
  window.addEventListener('beforeunload',event=>{if(dirty||busy){event.preventDefault();event.returnValue='';}});
  window.RevisionMaker=Object.freeze({
    onShow(){visible=true;resetScope();$('maker-cards').querySelectorAll('textarea').forEach(autoGrow);return refreshList(dirty||conflict);},
    onHide(){visible=false;confirmation=null;if($('maker-confirm-dialog').open)$('maker-confirm-dialog').close();if($('maker-study-dialog').open)$('maker-study-dialog').close();},
    beforeNavigate(){return true;},
    hasDraft(){return dirty;}
  });
  renderEditor();renderList();
})();
