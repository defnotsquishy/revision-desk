// Host integration only: fixed readiness/error notices, never account data.
(() => {
  'use strict';
  let sentReady = false, sentFailed = false;
  const send = type => window.parent.postMessage({scope:'kart-royale-status',type}, '*');
  const check = () => {
    if (!sentFailed && document.querySelector('.fatal')) { sentFailed = true; send('failed'); }
    if (!sentReady && !sentFailed && document.querySelector('canvas') && document.querySelector('.screen.title, .screen.select, .hud')) { sentReady = true; send('ready'); }
  };
  new MutationObserver(check).observe(document.documentElement,{childList:true,subtree:true});
  window.addEventListener('error', () => { if (!sentReady && !sentFailed) { sentFailed = true; send('failed'); } });
})();
