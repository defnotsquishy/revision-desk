/* The original external game stays cross-origin. No revision data bridge. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const holder = $('no-flag-frame');
  const status = $('no-flag-status');
  let frame = null;

  function closeGame(restoreFocus = false) {
    if (!frame) return;
    frame = null;
    holder.replaceChildren();
    holder.hidden = true;
    $('load-no-flag').disabled = false;
    $('fullscreen-no-flag').disabled = true;
    $('close-no-flag').disabled = true;
    status.textContent = 'Game closed. Your revision work is unchanged. Choose Load No Flag to reopen it.';
    if (document.fullscreenElement === holder) document.exitFullscreen?.().catch(() => {});
    if (restoreFocus) $('load-no-flag').focus();
  }

  $('load-no-flag').addEventListener('click', () => {
    if (frame) return;
    const current = document.createElement('iframe');
    current.title = 'No Flag — original external game';
    // allow-same-origin is safe here only because the fixed URL is a different
    // origin. Never reuse these flags for copied same-origin game code.
    current.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-pointer-lock');
    current.setAttribute('allow', "fullscreen; camera 'none'; microphone 'none'; geolocation 'none'");
    current.setAttribute('allowfullscreen', '');
    current.referrerPolicy = 'no-referrer';
    current.addEventListener('load', () => {
      if (frame !== current) return;
      // A frame load event cannot establish gameplay or server readiness.
      status.textContent = 'Player frame opened. If the game does not appear, use Open original game. Online matches still need a working game server.';
    });
    frame = current;
    $('load-no-flag').disabled = true;
    $('fullscreen-no-flag').disabled = false;
    $('close-no-flag').disabled = false;
    status.textContent = 'Opening the original player below. If it is unavailable or blocked, use Open original game.';
    holder.hidden = false;
    current.src = 'https://noescapefromhere.netlify.app/';
    holder.replaceChildren(current);
  });

  $('close-no-flag').addEventListener('click', () => closeGame(true));
  $('fullscreen-no-flag').addEventListener('click', async () => {
    const current = frame;
    if (!current || $('fullscreen-no-flag').disabled) return;
    $('fullscreen-no-flag').disabled = true;
    try {
      if (!holder.requestFullscreen) throw new Error('Unavailable');
      await holder.requestFullscreen();
      // Closing while the browser is entering fullscreen must not strand an
      // empty holder after the asynchronous request completes.
      if (!frame && document.fullscreenElement === holder) await document.exitFullscreen?.();
    } catch {
      if (frame === current) status.textContent = 'Fullscreen is unavailable. You can keep playing below or use Open original game.';
    } finally {
      if (frame === current) $('fullscreen-no-flag').disabled = false;
    }
  });
  window.RevisionGames = { hide: () => closeGame() };
})();
