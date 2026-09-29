(function () {
  'use strict';
  const key = 'revision-desk-history-v1';
  let entries = [];
  let warning = '';
  function read() {
    try {
      const raw = JSON.parse(localStorage.getItem(key) || '[]');
      if (!Array.isArray(raw)) throw new Error('Invalid history');
      entries = raw.filter(p => p && typeof p.deck === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(p.date) && Number.isFinite(Date.parse(p.date)) && Number.isInteger(p.known) && Number.isInteger(p.total) && p.total > 0 && p.known >= 0 && p.known <= p.total);
      warning = entries.length === raw.length ? '' : 'Some damaged graph entries could not be loaded. Your card ratings are separate and unchanged.';
    } catch (_) { warning = 'Graph history could not be loaded. Your card ratings are separate and unchanged.'; }
  }
  read();
  const label = date => new Date(date + 'T12:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const percentage = p => Math.round(p.known / p.total * 100);
  function capture(deck, ratings, now = new Date()) {
    read();
    const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    entries = entries.filter(p => p.deck !== deck.id || p.date !== date);
    if (deck.cards.length) entries.push({ deck: deck.id, date, known: deck.cards.filter(c => ratings[c.id] === 'know').length, total: deck.cards.length });
    try { localStorage.setItem(key, JSON.stringify(entries)); return true; }
    catch (_) { warning = 'Graph changes could not be saved. Keep this window open; check that browser storage is available.'; return false; }
  }
  function render(deck, ratings) {
    const $ = id => document.getElementById(id);
    const known = deck.cards.filter(c => ratings[c.id] === 'know').length;
    $('history-current').textContent = `${deck.cards.length ? Math.round(known / deck.cards.length * 100) : 0}% know`;
    $('history-warning').hidden = !warning;
    $('history-warning').textContent = warning;
    const points = entries.filter(p => p.deck === deck.id).sort((a, b) => a.date.localeCompare(b.date));
    $('history-empty').hidden = points.length > 0;
    $('history-results').hidden = !points.length;
    if (!points.length) return;
    const svg = $('history-chart');
    svg.replaceChildren();
    function node(tag, attrs, text) {
      const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
      Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
      if (text !== undefined) el.textContent = text;
      svg.append(el); return el;
    }
    node('title', { id: 'chart-title' }, `${deck.title}: percentage marked Know by date`);
    node('desc', { id: 'chart-description' }, `${points.length} study days. Full values are available below the graph. Vertical axis 0 to 100 percent; horizontal axis date.`);
    [0, 25, 50, 75, 100].forEach(value => {
      const y = 202 - value * 1.7;
      node('line', { x1: 53, x2: 651, y1: y, y2: y, class: 'chart-grid' });
      node('text', { x: 43, y: y + 4, 'text-anchor': 'end', class: 'chart-label' }, `${value}%`);
    });
    const first = Date.parse(points[0].date), last = Date.parse(points.at(-1).date);
    const x = p => first === last ? 352 : 64 + (Date.parse(p.date) - first) / (last - first) * 575;
    points.forEach(p => {
      const dot = node('circle', { cx: x(p), cy: 202 - p.known / p.total * 170, r: 5, class: 'chart-dot' });
      const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
      title.textContent = `${label(p.date)}: ${percentage(p)}% (${p.known}/${p.total}) know`;
      dot.append(title);
    });
    node('text', { x: first === last ? 352 : 53, y: 229, 'text-anchor': first === last ? 'middle' : 'start', class: 'chart-label' }, label(points[0].date));
    if (first !== last) node('text', { x: 651, y: 229, 'text-anchor': 'end', class: 'chart-label' }, label(points.at(-1).date));
    const latest = points.at(-1);
    $('history-latest').textContent = `Latest: ${percentage(latest)}% know · ${latest.known} of ${latest.total} cards · ${label(latest.date)}. Dates use your computer's local calendar.`;
    $('history-values').replaceChildren(...points.slice().reverse().map(p => {
      const item = document.createElement('li'); item.textContent = `${label(p.date)} — ${percentage(p)}% know (${p.known} of ${p.total} cards)`; return item;
    }));
  }
  window.RevisionHistory = { capture, render, read };
})();
