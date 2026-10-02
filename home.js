(() => {
  'use strict';
  const $=id=>document.getElementById(id);
  const views=['home','flashcards','practice'];
  function show(view,focus=true){
    if(!views.includes(view))view='home';
    for(const name of views)$('view-'+name).hidden=name!==view;
    document.querySelectorAll('[data-view]').forEach(a=>{if(a.dataset.view===view)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
    document.title=({home:'Home',flashcards:'Flashcards',practice:'Paper practice & whiteboard'}[view])+' — Revision Desk';
    $('skip-target').href=({home:'#home-title',flashcards:'#study-area',practice:'#practice-title'}[view]);
    if(focus)$(view==='home'?'home-title':view==='flashcards'?'deck-title':'practice-title').focus({preventScroll:true});
    if(view==='practice')window.RevisionPractice?.resize();
  }
  function navigate(view){if(location.hash==='#'+view)show(view);else location.hash=view;}
  function route(focus=true){const hash=location.hash.slice(1);const anchors={'home-title':'home','study-area':'flashcards','practice-title':'practice'};show(anchors[hash]||hash,anchors[hash]?false:focus);}
  document.querySelectorAll('[data-view]').forEach(a=>a.addEventListener('click',()=>show(a.dataset.view)));
  $('home-papers').addEventListener('click',()=>window.RevisionLibrary.open());
  $('nav-papers').addEventListener('click',()=>window.RevisionLibrary.open());
  $('home-whiteboard').addEventListener('click',()=>window.RevisionPractice.whiteboard());
  $('nav-whiteboard').addEventListener('click',()=>window.RevisionPractice.whiteboard());
  function stats(){const subjects=window.FLASHCARD_DATA.subjects;const ratings=window.RevisionStore.ratings();$('home-summary').textContent=`${subjects.reduce((n,s)=>n+s.decks.length,0)} topic decks · ${subjects.reduce((n,s)=>n+s.decks.reduce((m,d)=>m+d.cards.length,0),0).toLocaleString('en-GB')} flashcards · ${Object.keys(ratings).length} reviewed`;}
  window.addEventListener('revision-data-change',stats);window.addEventListener('hashchange',()=>route());
  window.RevisionHome={show:navigate};stats();route(false);
})();
