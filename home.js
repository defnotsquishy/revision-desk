(() => {
  'use strict';
  const $=id=>document.getElementById(id);
  const views=['home','flashcards','practice','customise','profile','legal'];
  const policies={privacy:'Privacy & your data',cookies:'Cookies & storage',terms:'Using the app',copyright:'Copyright & credits','open-source':'Source & open-source notices'};
  let policy='privacy';
  function show(view,focus=true){
    if(view==='whiteboard')view='practice';
    if(Object.hasOwn(policies,view)){policy=view;view='legal';}
    if(!views.includes(view))view='home';
    for(const name of views)$('view-'+name).hidden=name!==view;
    document.querySelectorAll('[data-policy]').forEach(a=>{a.hidden=a.dataset.policy!==policy;});
    document.querySelectorAll('[data-policy-link]').forEach(a=>{if(view==='legal'&&a.dataset.policyLink===policy)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
    $('legal-title').textContent=policies[policy];
    document.querySelectorAll('[data-view]').forEach(a=>{if(a.dataset.view===view)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
    document.title=({home:'Home',flashcards:'Flashcards',practice:'Whiteboard',customise:'Customise Desk',profile:'Your profile',legal:policies[policy]}[view])+' — Revision Deck';
    $('skip-target').href=({home:'#home-title',flashcards:'#study-area',practice:'#practice-title',customise:'#customise-title',profile:'#profile-page-title',legal:'#legal-title'}[view]);
    if(focus)$({home:'home-title',flashcards:'deck-title',practice:'practice-title',customise:'customise-title',profile:'profile-page-title',legal:'legal-title'}[view]).focus();
    if(view==='practice')window.RevisionPractice?.resize();
  }
  function navigate(view){const hash=view==='practice'?'whiteboard':view;if(location.hash==='#'+hash)show(view);else location.hash=hash;}
  function route(focus=true){const hash=location.hash.slice(1);const anchors={'home-title':'home','study-area':'flashcards','practice-title':'practice','customise-title':'customise','profile-page-title':'profile','legal-title':'legal'};show(anchors[hash]||hash,anchors[hash]?false:focus);}
  document.querySelectorAll('[data-view]').forEach(a=>a.addEventListener('click',()=>show(a.dataset.view)));
  document.querySelectorAll('[data-policy-link]').forEach(a=>a.addEventListener('click',()=>show(a.dataset.policyLink)));
  function storageChoice(){
    const owner=window.RevisionAppearance;
    $('cookie-remember-appearance').checked=owner.remember();
    $('cookie-choice-status').textContent=!owner.saved()?'Your choice applies for now, but browser storage could not save it. It may not survive closing the app.':owner.remember()?'Remembering is on. Appearance and study mode can be saved between visits.':'Remembering is off. Appearance and study mode are not saved between visits. Your revision data is unchanged.';
  }
  $('cookie-remember-appearance').addEventListener('change',event=>window.RevisionAppearance.setRemember(event.target.checked));
  window.addEventListener('revision-appearance-change',storageChoice);
  $('home-papers').addEventListener('click',()=>window.RevisionLibrary.open());
  $('nav-papers').addEventListener('click',()=>window.RevisionLibrary.open());
  $('home-whiteboard').addEventListener('click',()=>window.RevisionPractice.whiteboard());
  $('profile-page-edit').addEventListener('click',()=>window.RevisionProfile.open());
  function counts(){const subjects=window.FLASHCARD_DATA.subjects;return {topics:subjects.reduce((n,s)=>n+s.decks.length,0),cards:subjects.reduce((n,s)=>n+s.decks.reduce((m,d)=>m+d.cards.length,0),0),reviewed:Object.keys(window.RevisionStore.ratings()).length};}
  function summary(){const c=counts();return `${c.topics} topic decks · ${c.cards.toLocaleString('en-GB')} flashcards · ${c.reviewed} reviewed`;}
  const courseNames={other:'Other subjects',combined:'Combined Science',triple:'Triple Science'};
  const subjectNames={english:'English Literature',history:'History',geography:'Geography',sociology:'Sociology',biology:'Biology',chemistry:'Chemistry',physics:'Physics'};
  const expanded=new Set();
  function dashboard(selectedCourse='other',selectedTier='H'){
    const course=Object.hasOwn(courseNames,selectedCourse)?selectedCourse:'other',tier=selectedTier==='F'?'F':'H';
    const state=window.RevisionStore.state?.() || {phase:'guest'};
    const loading=Boolean(state.uid&&state.phase==='loading');
    const ratings=loading?{}:window.RevisionStore.ratings(),groups=new Map();
    for(const subject of window.FLASHCARD_DATA.subjects){
      if((subject.route||'other')!==course)continue;
      for(const deck of subject.decks){
        const id=deck.science?deck.science.toLowerCase():subject.id;
        if(!groups.has(id))groups.set(id,{id,title:subjectNames[id]||subject.name,decks:[],cards:[]});
        const row=groups.get(id);row.decks.push(deck);row.cards.push(...deck.cards.filter(card=>!deck.science||tier!=='F'||card.tier!=='H'));
      }
    }
    function metrics(cards){
      const reviewed=cards.filter(c=>['know','unsure','learn'].includes(ratings[c.id])).length;
      const know=cards.filter(c=>ratings[c.id]==='know').length,questions=cards.filter(c=>c.quiz);
      return {total:cards.length,questions:questions.length,reviewed:loading?null:reviewed,know:loading?null:know,questionsReviewed:loading?null:questions.filter(c=>['know','unsure','learn'].includes(ratings[c.id])).length,confidence:!loading&&reviewed?Math.round(100*know/reviewed):null};
    }
    const subjects=[...groups.values()].map(row=>({...row,...metrics(row.cards),subtitle:course==='other'?(row.id==='history'?'GCSE · Edexcel':row.id==='sociology'||row.id==='english'?'GCSE · AQA':'GCSE · Paper 1 topics'):`GCSE · AQA · ${course==='combined'?'Combined':'Triple'} · ${tier==='F'?'Foundation':'Higher'}`}));
    return {course,tier,loading,subjects,...metrics(subjects.flatMap(row=>row.cards))};
  }
  function selection(){
    const params=new URLSearchParams(location.search||'');
    return {course:Object.hasOwn(courseNames,params.get('deskCourse'))?params.get('deskCourse'):'other',tier:params.get('deskTier')==='F'?'F':'H'};
  }
  function selectCourse(){
    const url=new URL(location.href||'http://localhost/');
    url.searchParams.set('deskCourse',$('home-course').value);url.searchParams.set('deskTier',$('home-tier').value);
    window.history?.replaceState(null,'',url);expanded.clear();stats();
  }
  function node(tag,className,text){const el=document.createElement(tag);if(className)el.className=className;if(text!==undefined)el.textContent=text;return el;}
  function stats(){
    const selected=selection(),data=dashboard(selected.course,selected.tier),profile=window.RevisionStore.profile?.() || {name:'Revision student',photo:''};
    $('home-course').value=data.course;$('home-tier').value=data.tier;$('home-tier-control').hidden=data.course==='other';
    $('home-title').textContent=data.loading?'Getting your desk ready…':profile.name==='Revision student'?'Hey, welcome back.':`Hey, ${profile.name}.`;
    $('home-identity').textContent=data.loading?'Loading your private account…':window.RevisionStore.state?.().uid?'Your private revision workspace':'Your revision workspace';
    const avatar=$('home-avatar');avatar.replaceChildren();
    if(!data.loading&&profile.photo){const img=node('img');img.src=profile.photo;img.alt='';img.width=96;img.height=96;avatar.append(img);}
    else avatar.textContent=data.loading?'':profile.name.trim().split(/\s+/).slice(0,2).map(n=>n[0]).join('').toUpperCase()||'RD';
    $('home-subject-count').textContent=`${data.subjects.length} subjects`;
    $('home-scope').textContent=courseNames[data.course];$('home-topic-count').textContent=`${data.subjects.reduce((n,s)=>n+s.decks.length,0)} topic decks`;
    $('home-progress-copy').textContent=data.loading?'Loading your ratings…':data.reviewed?`${data.reviewed.toLocaleString('en-GB')} / ${data.total.toLocaleString('en-GB')} cards reviewed`:'Ready for your next topic';
    if(data.loading)$('home-progress').removeAttribute('value');else $('home-progress').value=data.total?Math.round(100*data.reviewed/data.total):0;
    $('home-progress-note').textContent=data.loading?'Your figures will appear when your account has loaded.':'Reviewed means you’ve rated a card, not mastered it.';
    $('home-summary').textContent='Questions and flashcards share the same card rating. Marked Know is your confidence, not an exam score.';
    const focused=document.activeElement?.dataset?.homeFocusKey;
    const rows=[];
    for(const subject of data.subjects){
      const row=node('tr'),identity=node('th');identity.scope='row';const subjectBlock=node('div','dashboard-subject');
      const art=window.RevisionDashboardArt?.[subject.id];
      if(art){const img=node('img','dashboard-subject-art');img.src=art;img.alt='';img.width=48;img.height=48;subjectBlock.append(img);}
      const copy=node('div');copy.append(node('strong','',subject.title),node('small','',subject.subtitle));subjectBlock.append(copy);identity.append(subjectBlock);
      const questions=node('td','dashboard-metric');questions.dataset.label='Questions reviewed';questions.append(node('span','',`${data.loading?'…':subject.questionsReviewed} / ${subject.questions}`));
      const cards=node('td','dashboard-metric');cards.dataset.label='Flashcards / marked Know';cards.append(node('span','',`${data.loading?'…':subject.reviewed} / ${subject.total}`));
      const confidence=node('span','dashboard-confidence',subject.confidence===null?'—':`${subject.confidence}%`);confidence.setAttribute('aria-label',subject.confidence===null?'No confidence rating yet':`${subject.confidence}% of reviewed cards marked Know`);cards.append(confidence);
      const action=node('td','dashboard-row-action'),button=node('button','button button-quiet','Topics');button.type='button';button.dataset.homeFocusKey=subject.id;
      const key=data.course+'-'+subject.id,open=expanded.has(key),detailId='home-topics-'+subject.id;
      button.setAttribute('aria-label',`Choose ${subject.title} topic`);button.setAttribute('aria-expanded',String(open));button.setAttribute('aria-controls',detailId);
      const details=node('tr','dashboard-topic-row');details.id=detailId;details.hidden=!open;const cell=node('td');cell.colSpan=4;
      const list=node('ul','dashboard-topics');for(const deck of subject.decks){const item=node('li'),link=node('a','button button-quiet',deck.title);link.href='#flashcards';link.dataset.homeFocusKey=deck.id;link.addEventListener('click',()=>window.RevisionApp.openDeck(deck.id,data.tier));item.append(link);list.append(item);}cell.append(list);details.append(cell);
      button.addEventListener('click',()=>{const next=!expanded.has(key);if(next)expanded.add(key);else expanded.delete(key);details.hidden=!next;button.setAttribute('aria-expanded',String(next));});
      action.append(button);row.append(identity,questions,cards,action);rows.push(row,details);
    }
    $('home-subjects').replaceChildren(...rows);
    if(focused)document.querySelector(`[data-home-focus-key="${focused}"]`)?.focus({preventScroll:true});
  }
  $('home-course').addEventListener('change',selectCourse);$('home-tier').addEventListener('change',selectCourse);
  // Public, curated external links only. No players, requests or watch tracking.
  let videoPanels=[];
  function videoSubject(){const selected=new URLSearchParams(location.search||'').get('deskVideoSubject');return Object.hasOwn(window.REVISION_VIDEO_LESSONS||{},selected)?selected:'biology';}
  function videoExpandLabel(){const allOpen=videoPanels.length>0&&videoPanels.every(panel=>panel.open);$('home-video-expand').textContent=allOpen?'Collapse all topics':'Expand all topics';$('home-video-expand').disabled=!videoPanels.length;}
  function videoLessons(){
    const catalogue=window.REVISION_VIDEO_LESSONS;if(!catalogue)return;
    const id=videoSubject(),subject=catalogue[id];$('home-video-subject').value=id;
    $('home-video-name').textContent=subject.title;$('home-video-scope').textContent=subject.scope;
    $('home-video-provider').href=subject.url;$('home-video-provider').replaceChildren(node('span','',subject.providerLabel||'Browse '+subject.provider),node('span','sr-only',' (opens in a new tab)'));
    const art=$('home-video-art');art.replaceChildren();const asset=window.RevisionDashboardArt?.[id];
    if(asset){const img=node('img');img.src=asset;img.alt='';img.width=72;img.height=72;art.append(img);}art.hidden=!asset;
    $('home-video-count').textContent=`${subject.topics.length} topics · ${subject.topics.reduce((n,topic)=>n+topic.lessons.length,0)} linked lessons · ${subject.provider}`;
    videoPanels=subject.topics.map((topic,index)=>{
      const panel=node('details','video-topic');panel.open=index===0;
      const summary=node('summary');summary.append(node('strong','',topic.title),node('span','video-topic-count',`${topic.lessons.length} lessons`));panel.append(summary);
      const list=node('ul','video-lesson-grid');
      for(const lesson of topic.lessons){
        const item=node('li'),link=node('a','video-lesson-link');link.href=lesson.url;link.target='_blank';link.rel='noopener noreferrer';
        link.append(node('strong','',lesson.title),node('small','',`${subject.provider} · ${lesson.higher?'Higher only':lesson.note||'GCSE lesson'}`),node('span','sr-only',' (opens in a new tab)'));item.append(link);list.append(item);
      }
      panel.append(list);panel.addEventListener('toggle',videoExpandLabel);return panel;
    });$('home-video-topics').replaceChildren(...videoPanels);videoExpandLabel();
  }
  $('home-video-subject').addEventListener('change',()=>{const url=new URL(location.href||'http://localhost/');const value=$('home-video-subject').value;if(!Object.hasOwn(window.REVISION_VIDEO_LESSONS||{},value))return;url.searchParams.set('deskVideoSubject',value);window.history?.replaceState(null,'',url);videoLessons();});
  $('home-video-expand').addEventListener('click',()=>{const next=!videoPanels.every(panel=>panel.open);videoPanels.forEach(panel=>{panel.open=next;});videoExpandLabel();});
  window.addEventListener('popstate',videoLessons);videoLessons();
  window.addEventListener('popstate',stats);
  window.addEventListener('revision-data-change',stats);window.addEventListener('hashchange',()=>route());
  window.RevisionHome={show:navigate,summary,dashboard};stats();route(false);storageChoice();
})();
