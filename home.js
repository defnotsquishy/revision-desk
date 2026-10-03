(() => {
  'use strict';
  const $=id=>document.getElementById(id);
  const views=['home','flashcards','practice','customise','legal'];
  const policies={privacy:'Privacy & your data',cookies:'Cookies & storage',terms:'Using the app',copyright:'Copyright & credits','open-source':'Source & open-source notices'};
  let policy='privacy';
  function show(view,focus=true){
    if(Object.hasOwn(policies,view)){policy=view;view='legal';}
    if(!views.includes(view))view='home';
    for(const name of views)$('view-'+name).hidden=name!==view;
    document.querySelectorAll('[data-policy]').forEach(a=>{a.hidden=a.dataset.policy!==policy;});
    document.querySelectorAll('[data-policy-link]').forEach(a=>{if(view==='legal'&&a.dataset.policyLink===policy)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
    $('legal-title').textContent=policies[policy];
    document.querySelectorAll('[data-view]').forEach(a=>{if(a.dataset.view===view)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
    document.title=({home:'Home',flashcards:'Flashcards',practice:'Paper practice & whiteboard',customise:'Customise Desk',legal:policies[policy]}[view])+' — Revision Desk';
    $('skip-target').href=({home:'#home-title',flashcards:'#study-area',practice:'#practice-title',customise:'#customise-title',legal:'#legal-title'}[view]);
    if(focus)$({home:'home-title',flashcards:'deck-title',practice:'practice-title',customise:'customise-title',legal:'legal-title'}[view]).focus({preventScroll:view!=='legal'});
    if(view==='practice')window.RevisionPractice?.resize();
  }
  function navigate(view){if(location.hash==='#'+view)show(view);else location.hash=view;}
  function route(focus=true){const hash=location.hash.slice(1);const anchors={'home-title':'home','study-area':'flashcards','practice-title':'practice','customise-title':'customise','legal-title':'legal'};show(anchors[hash]||hash,anchors[hash]?false:focus);}
  document.querySelectorAll('[data-view]').forEach(a=>a.addEventListener('click',()=>show(a.dataset.view)));
  document.querySelectorAll('[data-policy-link]').forEach(a=>a.addEventListener('click',()=>show(a.dataset.policyLink)));
  // Pass only the saved colour, never an account identifier or revision data.
  document.querySelectorAll('a[href="games/"],a[href="../games/"],a[href="https://defnotsquishy.github.io/revision-desk/games/"]').forEach(link=>link.addEventListener('click',()=>{
    const accent=document.documentElement.dataset.accent;
    const url=new URL(link.href);
    if(['neutral','blue','violet','mint'].includes(accent))url.searchParams.set('accent',accent);
    link.href=url.href;
  }));
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
  $('nav-whiteboard').addEventListener('click',()=>window.RevisionPractice.whiteboard());
  function counts(){const subjects=window.FLASHCARD_DATA.subjects;return {topics:subjects.reduce((n,s)=>n+s.decks.length,0),cards:subjects.reduce((n,s)=>n+s.decks.reduce((m,d)=>m+d.cards.length,0),0),reviewed:Object.keys(window.RevisionStore.ratings()).length};}
  function summary(){const c=counts();return `${c.topics} topic decks · ${c.cards.toLocaleString('en-GB')} flashcards · ${c.reviewed} reviewed`;}
  function stats(){const c=counts();$('home-summary').textContent=`You’ve got ${c.topics} topics and ${c.cards.toLocaleString('en-GB')} flashcards to choose from. `+(c.reviewed?`You’ve reviewed ${c.reviewed.toLocaleString('en-GB')} ${c.reviewed===1?'card':'cards'} so far.`:'Pick a topic below to get started.');}
  window.addEventListener('revision-data-change',stats);window.addEventListener('hashchange',()=>route());
  window.RevisionHome={show:navigate,summary};stats();route(false);storageChoice();
})();
