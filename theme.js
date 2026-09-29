try {
  document.documentElement.dataset.theme = localStorage.getItem('revision-desk-theme') === 'light' ? 'light' : 'dark';
} catch (_) { document.documentElement.dataset.theme = 'dark'; }
