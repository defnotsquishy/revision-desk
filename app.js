(function () {
  "use strict";
  const data = window.FLASHCARD_DATA;
  const state = { deckId: "macbeth", index: 0, flipped: false, query: "", filter: "all", topic: "all", order: null };
  state.mode = 'quiz';
  let quizAnswered = false;
  let quizOptions = [];
  try { if (window.RevisionAppearance?.remember()!==false && localStorage.getItem('revision-desk-mode') === 'flashcard') state.mode = 'flashcard'; } catch (_) {}
  let saved = {};
  const storageKey = "revision-desk-progress-v2";
  try { saved = JSON.parse(localStorage.getItem(storageKey) || "{}"); } catch (_) { saved = {}; }
  if (!saved || typeof saved !== 'object' || Array.isArray(saved)) saved = {};
  Object.keys(saved).forEach(id => { if (!["know", "unsure", "learn"].includes(saved[id])) delete saved[id]; });
  if (window.RevisionStore) saved = window.RevisionStore.ratings();
  const $ = (id) => document.getElementById(id);
  const allDecks = data.subjects.flatMap((subject) => subject.decks.map((deck) => ({ ...deck, subject })));
  const deck = () => allDecks.find((item) => item.id === state.deckId);
  let course = 'other', scienceTier = 'H';
  const tierCards = () => deck().cards.filter(c => !deck().science || scienceTier !== 'F' || c.tier !== 'H');
  const progressDeck = () => deck().science && scienceTier === 'F' ? {...deck(),id:deck().id+'-foundation',title:deck().title+' · Foundation',cards:tierCards()} : deck();
  const statusFor = (id) => saved[id] || "unseen";
  const filteredCards = () => {
    const cards = tierCards().filter(card => state.mode !== 'quiz' || card.quiz);
    const ordered = state.order ? state.order.map((id) => cards.find((card) => card.id === id)).filter(Boolean) : cards;
    const query = state.query.trim().toLowerCase();
    return ordered.filter((card) => {
      const haystack = [card.question, card.quiz?.question, card.quote, card.answer, card.method, card.exam, ...(card.tags || [])].join(" ").toLowerCase();
      return (!query || haystack.includes(query)) && (state.filter === "all" || statusFor(card.id) === state.filter) && (state.topic === 'all' || (card.tags || []).includes(state.topic));
    });
  };

  function renderNav() {
    $("deck-nav").replaceChildren(...data.subjects.filter(subject => (subject.route || 'other') === course).map(subject => {
      const section = document.createElement('section'); section.className = 'subject-group';
      const title = document.createElement('h3'); title.textContent = subject.name;
      const list = document.createElement('div'); list.className = 'deck-list';
      subject.decks.forEach(item => {
        const button = document.createElement('button'); button.type = 'button'; button.dataset.deck = item.id;
        button.className = `deck-button ${item.id === state.deckId ? 'active' : ''}`;
        button.setAttribute('aria-pressed', String(item.id === state.deckId));
        const name = document.createElement('span'); name.textContent = item.title;
        const count = document.createElement('span'); count.className = 'count'; count.textContent = item.cards.filter(c => scienceTier !== 'F' || !item.science || c.tier !== 'H').length;
        button.append(name, count); list.append(button);
      });
      section.append(title, list); return section;
    }));
  }

  function renderCard() {
    const currentDeck = deck();
    if (!$('view-flashcards')?.hidden) document.title = `${currentDeck.title} — Revision Deck`;
    $("clear-search").hidden = !state.query;
    const quizMode = state.mode === 'quiz';
    $("quiz-mode").setAttribute('aria-pressed', String(quizMode));
    $("flashcard-mode").setAttribute('aria-pressed', String(!quizMode));
    $("mode-description").textContent = quizMode ? `${tierCards().filter(card => card.quiz).length} quiz questions · ${tierCards().length} cards in Flashcards` : `${tierCards().length} flashcards`;
    $("next-button").textContent = quizMode ? 'Next question' : 'Next card';
    $("study-card").hidden = quizMode;
    $("quiz-area").hidden = !quizMode;
    $("rating-group").hidden = quizMode;
    const cards = filteredCards();
    $("subject-label").textContent = currentDeck.subject.name;
    $("deck-title").textContent = currentDeck.title;
    $("deck-description").textContent = currentDeck.description;
    $("study-area").hidden = cards.length === 0;
    $("empty-state").hidden = cards.length !== 0;
    if (!cards.length) {
      const trulyEmpty = currentDeck.cards.length === 0;
      $("empty-eyebrow").textContent = trulyEmpty ? "Content pending" : "No cards found";
      $("empty-title").textContent = trulyEmpty ? "Waiting for your knowledge organiser" : "Try a broader search or filter.";
      $("empty-copy").textContent = trulyEmpty ? "This Henry section is deliberately blank so the exact Edexcel course is not guessed. Add the school organiser when it arrives." : "No cards in this deck match the current search and learning-status filter.";
      $("clear-filters").hidden = trulyEmpty;
    } else {
      $("clear-filters").hidden = false;
    }
    renderProgress();
    if (!cards.length) return;
    state.index = Math.min(state.index, cards.length - 1);
    const card = cards[state.index];
    $("card-number").textContent = `${quizMode ? 'Question' : 'Card'} ${state.index + 1} of ${cards.length}`;
    if (quizMode) renderQuiz(card);
    $("card-question").textContent = card.question;
    $("card-quote").textContent = card.quote || "";
    $("card-answer").textContent = card.answer;
    $("card-method").textContent = card.method || '';
    $("card-method-block").hidden = !card.method;
    $("card-exam").textContent = card.exam ? `${card.method ? 'Use it in an essay' : 'Exam use'}: ${card.exam}` : "";
    ['card-tags-front', 'card-tags-back'].forEach(id => $(id).replaceChildren(...(card.tags || []).map(tag => {
      const span = document.createElement('span'); span.className = 'tag'; span.textContent = tag; return span;
    })));
    const status = statusFor(card.id);
    $("current-status").className = `status-pill ${status === "unseen" ? "" : status}`;
    $("current-status").textContent = status === "unseen" ? "Not studied" : status[0].toUpperCase() + status.slice(1);
    state.flipped = false;
    $("study-card").classList.remove("flipped");
    $("study-card").setAttribute("aria-label", "Flashcard question. Press Enter or Space to reveal the answer.");
    document.querySelector(".card-front").setAttribute("aria-hidden", "false");
    document.querySelector(".card-back").setAttribute("aria-hidden", "true");
  }

  function renderQuiz(card) {
    quizAnswered = false;
    $("quiz-question").textContent = card.quiz.question;
    $("quiz-feedback").textContent = '';
    $("quiz-feedback").className = 'quiz-feedback';
    $("quiz-explanation").hidden = true;
    quizOptions = card.quiz.options.map((text, index) => ({text, correct: index === 0}));
    for (let i = quizOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [quizOptions[i], quizOptions[j]] = [quizOptions[j], quizOptions[i]];
    }
    $("quiz-options").replaceChildren(...quizOptions.map((option, index) => {
      const button = document.createElement('button'); button.type = 'button'; button.className = 'quiz-option';
      const letter = document.createElement('span'); letter.className = 'option-letter'; letter.textContent = 'ABCD'[index];
      const text = document.createElement('span'); text.textContent = option.text;
      button.append(letter, text); button.addEventListener('click', () => answerQuiz(index)); return button;
    }));
  }
  function answerQuiz(index) {
    if (state.mode !== 'quiz' || quizAnswered || !quizOptions[index]) return;
    const card = filteredCards()[state.index];
    if (!card) return;
    quizAnswered = true;
    const correct = quizOptions[index].correct;
    Array.from($("quiz-options").children).forEach((button, i) => {
      button.setAttribute('aria-disabled', 'true');
      if (quizOptions[i].correct) button.classList.add('is-correct');
      if (i === index) button.classList.add(correct ? 'is-selected-correct' : 'is-wrong');
    });
    $("quiz-feedback").textContent = correct ? 'Correct — nice work.' : `Not quite. Correct answer: ${card.quiz.options[0]}`;
    $("quiz-feedback").classList.add(correct ? 'correct' : 'incorrect');
    $("quiz-answer").textContent = card.answer;
    $("quiz-quote").textContent = card.quote || '';
    $("quiz-quote").hidden = !card.quote;
    $("quiz-method").textContent = card.method || '';
    $("quiz-method-block").hidden = !card.method;
    $("quiz-exam").textContent = card.exam ? `${card.method ? 'Use it in an essay' : 'Exam use'}: ${card.exam}` : '';
    $("quiz-exam").hidden = !card.exam;
    $("quiz-explanation").hidden = false;
    $("rating-group").hidden = false;
  }
  function setMode(mode) {
    state.mode = mode; state.index = 0; state.topic = 'all'; state.order = null;
    try { if(window.RevisionAppearance?.remember()!==false)localStorage.setItem('revision-desk-mode', mode); } catch (_) {}
    renderTopics(); renderCard();
  }

  function renderProgress() {
    const cards = tierCards();
    const counts = { know: 0, unsure: 0, learn: 0 };
    cards.forEach((card) => { if (counts[statusFor(card.id)] !== undefined) counts[statusFor(card.id)] += 1; });
    const reviewed = counts.know + counts.unsure + counts.learn;
    const percent = cards.length ? Math.round(reviewed / cards.length * 100) : 0;
    $("progress-count").textContent = `${reviewed} of ${cards.length} reviewed`;
    $("progress-percent").textContent = `${percent}%`;
    $("progress-bar").style.width = `${percent}%`;
    $("progress-bar").parentElement.setAttribute("aria-valuenow", String(percent));
    ["know", "unsure", "learn"].forEach((key) => $(`${key}-count`).textContent = counts[key]);
    $("mastered-total").textContent = allDecks.flatMap((d) => d.cards).filter((card) => statusFor(card.id) === "know").length;
    window.RevisionHistory.render(progressDeck(), saved);
  }

  function renderTopics() {
    const topics = [...new Set(tierCards().filter(card => state.mode !== 'quiz' || card.quiz).flatMap(card => card.tags || []))].sort();
    $("topic-filter").replaceChildren(new Option('All topics', 'all'), ...topics.map(topic => new Option(topic, topic)));
  }
  function selectDeck(id) { state.deckId = id; course = deck().route || 'other'; $("course-filter").value = course; $("science-tier-control").hidden = course === 'other'; state.index = 0; state.query = ""; state.filter = "all"; state.topic = 'all'; state.order = null; $("search-input").value = ""; $("status-filter").value = "all"; renderTopics(); renderNav(); renderCard(); }
  function move(delta) { const cards = filteredCards(); if (!cards.length) return; state.index = (state.index + delta + cards.length) % cards.length; renderCard(); if (state.mode === 'quiz') $("quiz-question").focus({preventScroll: true}); }
  function flip() { if (!filteredCards().length) return; state.flipped = !state.flipped; $("study-card").classList.toggle("flipped", state.flipped); document.querySelector(".card-front").setAttribute("aria-hidden", String(state.flipped)); document.querySelector(".card-back").setAttribute("aria-hidden", String(!state.flipped)); $("study-card").setAttribute("aria-label", state.flipped ? "Flashcard answer. Press Enter or Space to return to the question." : "Flashcard question. Press Enter or Space to reveal the answer."); }
  function persist() { if (window.RevisionStore) { const stored=window.RevisionStore.writeRatings(saved,progressDeck().id); if(!stored)toast('Storage is unavailable. Progress is kept for this session only.'); return stored; } try { localStorage.setItem(storageKey, JSON.stringify(saved)); return true; } catch (_) { toast('Storage is unavailable. Progress is kept for this session only.'); return false; } }
  function rate(rating) { if (state.mode === 'quiz' && !quizAnswered) return false; const card = filteredCards()[state.index]; if (!card) return; saved[card.id] = rating; const stored = persist(); if (stored) { window.RevisionHistory.capture(progressDeck(), saved); toast(`Marked “${rating}”`); } const cards = filteredCards(); if (cards.some(item => item.id === card.id)) state.index = (state.index + 1) % cards.length; else state.index = cards.length ? state.index % cards.length : 0; renderCard(); if (state.mode === 'quiz') { if (cards.length) $("quiz-question").focus({preventScroll:true}); else $("clear-filters").focus(); } return stored; }
  let toastTimer;
  function toast(message) { $("toast").textContent = message; $("toast").classList.add("show"); clearTimeout(toastTimer); toastTimer = setTimeout(() => $("toast").classList.remove("show"), 1600); }

  $("deck-nav").addEventListener("click", (event) => { const button = event.target.closest("[data-deck]"); if (button) { selectDeck(button.dataset.deck); document.querySelector(`[data-deck="${state.deckId}"]`).focus({preventScroll: true}); } });
  $("study-card").addEventListener("click", flip);
  $("quiz-mode").addEventListener("click", () => setMode('quiz'));
  $("flashcard-mode").addEventListener("click", () => setMode('flashcard'));
  $("prev-button").addEventListener("click", () => move(-1));
  $("next-button").addEventListener("click", () => move(1));
  document.querySelectorAll("[data-rating]").forEach((button) => button.addEventListener("click", () => rate(button.dataset.rating)));
  function search(event) { if (event.isComposing) return; state.query = event.target.value; state.index = 0; renderCard(); }
  $("search-input").addEventListener("input", search);
  $("search-input").addEventListener("compositionend", search);
  $("clear-search").addEventListener("click", () => { state.query = ""; state.index = 0; $("search-input").value = ""; renderCard(); $("search-input").focus(); });
  $("status-filter").addEventListener("change", (event) => { state.filter = event.target.value; state.index = 0; renderCard(); });
  $("clear-filters").addEventListener("click", () => { state.query = ""; state.filter = "all"; state.topic = 'all'; state.index = 0; $("search-input").value = ""; $("status-filter").value = "all"; $("topic-filter").value = 'all'; renderCard(); });
  $("topic-filter").addEventListener('change', event => { state.topic = event.target.value; state.index = 0; renderCard(); });
  function renderTheme() { const dark = document.documentElement.dataset.theme === 'dark'; $("theme-toggle").textContent = dark ? 'Light mode' : 'Dark mode'; $("theme-toggle").setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode'); }
  $("theme-toggle").addEventListener('click', () => { window.RevisionAppearance.update({theme:document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'}); });
  window.addEventListener('revision-appearance-change',renderTheme);
  $("shuffle-button").addEventListener("click", () => { const shuffled = deck().cards.map((card) => card.id); for (let i = shuffled.length - 1; i > 0; i -= 1) { const j = Math.floor(Math.random() * (i + 1)); [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; } state.order = shuffled; state.index = 0; renderCard(); toast("Deck shuffled"); });
  $("reset-button").addEventListener("click", () => { $("reset-copy").textContent = `All ${tierCards().length} ratings in ${progressDeck().title} will become Not studied. This cannot be undone. Previous days on your graph stay; today's point becomes 0%. Ratings outside this selection are unchanged.`; $('reset-status').textContent='';$('cancel-reset').textContent='Keep ratings';$("reset-dialog").showModal(); });
  $('reset-dialog').addEventListener('cancel',event=>{if($('confirm-reset').disabled)event.preventDefault();});
  $("cancel-reset").addEventListener("click", () => $("reset-dialog").close());
  $("confirm-reset").addEventListener("click", async () => {
    if ($('confirm-reset').disabled) return;
    tierCards().forEach((card) => delete saved[card.id]); const stored = persist();
    if (stored) window.RevisionHistory.capture(progressDeck(), saved); renderCard();
    if(window.RevisionStore?.state().uid && stored) {
      $('confirm-reset').disabled=true;$('cancel-reset').disabled=true;$('reset-dialog').setAttribute('aria-busy','true');$('reset-status').textContent='Confirming reset with your account…';
      try { await window.RevisionStore.waitForSaving();$('reset-dialog').close();toast('Deck ratings reset in your account'); }
      catch(error){$('reset-status').textContent=error.message;$('cancel-reset').textContent='Close';}
      finally{$('confirm-reset').disabled=false;$('cancel-reset').disabled=false;$('reset-dialog').setAttribute('aria-busy','false');}
    } else { $("reset-dialog").close(); if (stored) toast("Deck ratings reset"); }
  });
  document.addEventListener("keydown", (event) => { if (window.RevisionAppearance?.get().shortcuts===false || document.getElementById('view-flashcards')?.hidden || event.isComposing || event.ctrlKey || event.altKey || event.metaKey || document.querySelector('dialog[open]') || ["INPUT", "SELECT", "TEXTAREA"].includes(document.activeElement.tagName)) return; if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); } if (event.key === "ArrowRight") { event.preventDefault(); move(1); } if (["1", "2", "3"].includes(event.key)) rate({ "1": "learn", "2": "unsure", "3": "know" }[event.key]); });

  renderTheme();
  renderTopics();
  renderNav();
  renderCard();
  $("course-filter").addEventListener('change', event => {
    course = event.target.value; $("science-tier-control").hidden = course === 'other';
    selectDeck(allDecks.find(d => (d.route || 'other') === course).id);
  });
  $("science-tier").addEventListener('change', event => {
    scienceTier = event.target.value; state.index = 0; state.topic = 'all'; state.order = null;
    renderTopics(); renderNav(); renderCard();
  });

  // Dashboard launchers use the existing deck/filter owner; no second study state.
  window.RevisionApp={openDeck(id,tier){
    if(!allDecks.some(item=>item.id===id))return false;
    if(['F','H'].includes(tier)){scienceTier=tier;$("science-tier").value=tier;}
    selectDeck(id);return true;
  }};

  window.addEventListener('storage', event => {
    if (window.RevisionStore?.state().uid) return;
    if (event.key === storageKey || event.key === null) {
      try {
        const next = JSON.parse(localStorage.getItem(storageKey) || '{}');
        if (next && typeof next === 'object' && !Array.isArray(next)) saved = Object.fromEntries(Object.entries(next).filter(([,value]) => ['know','learn','unsure'].includes(value)));
      } catch (_) { toast('Could not reload ratings from the other window.'); }
    }
    if (event.key === storageKey || event.key === 'revision-desk-history-v1' || event.key === null) { window.RevisionHistory.read(); renderCard(); }
  });
  window.addEventListener('revision-data-change',event=>{
    const {type,origin}=event.detail || {};
    if(type==='scope' || (type==='ratings' && origin!=='local')) {
      saved=window.RevisionStore.ratings();window.RevisionHistory.read();
      if(type==='scope'){state.index=0;renderCard();}else renderProgress();
    } else if(type==='history') {window.RevisionHistory.read();renderProgress();}
  });

  const context = document.modelContext;
  if (context?.registerTool) {
    const register = (tool) => { try { Promise.resolve(context.registerTool(tool)).catch(() => {}); } catch (_) {} };
    register({ name: "open_revision_deck", title: "Open revision deck", description: "Open a GCSE flashcard deck by its stable deck ID.", inputSchema: { type: "object", properties: { deckId: { type: "string", enum: allDecks.map((item) => item.id) } }, required: ["deckId"], additionalProperties: false }, annotations: { readOnlyHint: false, untrustedContentHint: false }, execute(input) { if (!input || !allDecks.some((item) => item.id === input.deckId)) throw new Error("Unknown deck ID"); selectDeck(input.deckId); window.RevisionHome?.show('flashcards'); return { deckId: state.deckId, title: deck().title, cards: deck().cards.length }; } });
    register({ name: "read_revision_progress", title: "Read revision progress", description: "Read progress totals for the currently open deck.", inputSchema: { type: "object", properties: {}, additionalProperties: false }, annotations: { readOnlyHint: true, untrustedContentHint: false }, execute() { const counts = { know: 0, unsure: 0, learn: 0, unseen: 0 }; deck().cards.forEach((card) => { counts[statusFor(card.id)] += 1; }); return { deckId: state.deckId, total: deck().cards.length, ...counts }; } });
    register({ name: "rate_current_flashcard", title: "Rate current flashcard", description: "Rate the visible flashcard and advance. Guest ratings save locally; signed-in ratings are queued for private cloud saving.", inputSchema: { type: "object", properties: { rating: { type: "string", enum: ["know", "unsure", "learn"] } }, required: ["rating"], additionalProperties: false }, annotations: { readOnlyHint: false, untrustedContentHint: false }, execute(input) { if (!input || !["know", "unsure", "learn"].includes(input.rating)) throw new Error("Rating must be know, unsure or learn"); const current = filteredCards()[state.index]; if (!current || document.getElementById('view-flashcards')?.hidden) throw new Error("No flashcard is currently visible"); const ratedId = current.id; const accepted = rate(input.rating); return { cardId: ratedId, rating: input.rating, accepted, saving:window.RevisionStore?.state() || {phase:'guest'} }; } });
  }
})();
