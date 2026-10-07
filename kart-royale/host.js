(() => {
  'use strict';
  const byId = id => document.getElementById(id);
  const frame = byId('game-frame'), stage = byId('game-stage'), status = byId('player-status');
  let timer, started = false, serial = 0;
  function launch() {
    clearTimeout(timer);
    started = true;
    byId('launch-panel').hidden = true;
    frame.hidden = false;
    byId('fullscreen-game').disabled = false;
    byId('reload-game').disabled = false;
    status.textContent = 'Loading the original game and models…';
    frame.src = 'play/?session=' + (++serial);
    frame.focus();
    timer = setTimeout(() => { status.textContent = 'Still waiting for the game. Check your connection, then use Restart game to try again.'; }, 60000);
  }
  byId('play-game').addEventListener('click', launch);
  byId('reload-game').addEventListener('click', launch);
  window.addEventListener('message', event => {
    // Only status from this opaque-origin frame is accepted. There is no data bridge.
    if (!started || event.source !== frame.contentWindow || event.origin !== 'null' || event.data?.scope !== 'kart-royale-status') return;
    if (event.data.type === 'ready') {
      clearTimeout(timer);
      status.textContent = 'Game ready. Click inside to use your keyboard.';
    } else if (event.data.type === 'failed') {
      clearTimeout(timer);
      status.textContent = 'The game couldn’t start. Check the message in the player, or use Restart game. WebGL 2 is required.';
    }
  });
  byId('fullscreen-game').addEventListener('click', async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await stage.requestFullscreen();
      frame.focus();
    } catch { status.textContent = 'Fullscreen isn’t available here. You can still play in this window.'; }
  });
  document.addEventListener('fullscreenchange', () => { byId('fullscreen-game').textContent = document.fullscreenElement ? 'Exit fullscreen' : 'Fullscreen'; });
  window.addEventListener('pagehide', () => clearTimeout(timer));
})();
