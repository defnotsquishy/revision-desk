(() => {
  'use strict';
  const $=id=>document.getElementById(id),owner=window.RevisionAppearance;
  function render(){
    const value=owner.get();
    document.querySelectorAll('[data-preference]').forEach(input=>{input.checked=value[input.dataset.preference]===input.value;});
    $('appearance-shortcuts').checked=value.shortcuts;
    $('appearance-motion').checked=value.motion==='reduce';
    $('appearance-status').textContent=!owner.saved()?'Applied for now, but browser storage is unavailable. These settings may not survive closing the app.':owner.remember()?'Appearance saved on this device. Your account progress is unchanged.':'Applied for this visit. Remembering appearance is off in Cookies & storage. Your revision data is unchanged.';
    $('appearance-accent').textContent='Saved profile accent: '+({neutral:'Neutral',blue:'Blue',violet:'Violet',mint:'Mint'}[document.documentElement.dataset.accent]||'Neutral');
    $('preview-summary').textContent=window.RevisionHome.summary();
  }
  document.querySelectorAll('[data-preference]').forEach(input=>input.addEventListener('change',()=>{if(input.checked)owner.update({[input.dataset.preference]:input.value});}));
  $('appearance-shortcuts').addEventListener('change',event=>owner.update({shortcuts:event.target.checked}));
  $('appearance-motion').addEventListener('change',event=>owner.update({motion:event.target.checked?'reduce':'system'}));
  $('appearance-reset').addEventListener('click',()=>owner.reset());
  $('appearance-profile').addEventListener('click',()=>window.RevisionProfile.open());
  window.addEventListener('revision-appearance-change',render);
  window.addEventListener('revision-data-change',render);
  window.RevisionCustomise={refresh:render};
  render();
})();
