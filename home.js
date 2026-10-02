(() => {
  'use strict';
  const $=id=>document.getElementById(id);
  const views=['home','flashcards','practice','customise'];
  function show(view,focus=true){
    if(!views.includes(view))view='home';
    for(const name of views)$('view-'+name).hidden=name!==view;
    document.querySelectorAll('[data-view]').forEach(a=>{if(a.dataset.view===view)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
    document.title=({home:'Home',flashcards:'Flashcards',practice:'Paper practice & whiteboard',customise:'Customise Desk'}[view])+' — Revision Desk';
    $('skip-target').href=({home:'#home-title',flashcards:'#study-area',practice:'#practice-title',customise:'#customise-title'}[view]);
    if(focus)$({home:'home-title',flashcards:'deck-title',practice:'practice-title',customise:'customise-title'}[view]).focus({preventScroll:true});
    if(view==='practice')window.RevisionPractice?.resize();
  }
  function navigate(view){if(location.hash==='#'+view)show(view);else location.hash=view;}
  function route(focus=true){const hash=location.hash.slice(1);const anchors={'home-title':'home','study-area':'flashcards','practice-title':'practice','customise-title':'customise'};show(anchors[hash]||hash,anchors[hash]?false:focus);}
  document.querySelectorAll('[data-view]').forEach(a=>a.addEventListener('click',()=>show(a.dataset.view)));
  $('home-papers').addEventListener('click',()=>window.RevisionLibrary.open());
  $('nav-papers').addEventListener('click',()=>window.RevisionLibrary.open());
  $('home-whiteboard').addEventListener('click',()=>window.RevisionPractice.whiteboard());
  $('nav-whiteboard').addEventListener('click',()=>window.RevisionPractice.whiteboard());
  function counts(){const subjects=window.FLASHCARD_DATA.subjects;return {topics:subjects.reduce((n,s)=>n+s.decks.length,0),cards:subjects.reduce((n,s)=>n+s.decks.reduce((m,d)=>m+d.cards.length,0),0),reviewed:Object.keys(window.RevisionStore.ratings()).length};}
  function summary(){const c=counts();return `${c.topics} topic decks · ${c.cards.toLocaleString('en-GB')} flashcards · ${c.reviewed} reviewed`;}
  function stats(){const c=counts();$('home-summary').textContent=`You’ve got ${c.topics} topics and ${c.cards.toLocaleString('en-GB')} flashcards to choose from. `+(c.reviewed?`You’ve reviewed ${c.reviewed.toLocaleString('en-GB')} ${c.reviewed===1?'card':'cards'} so far.`:'Pick a topic below to get started.');}
  window.addEventListener('revision-data-change',stats);window.addEventListener('hashchange',()=>route());
  window.RevisionHome={show:navigate,summary};stats();route(false);
})();
