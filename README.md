# Revision Desk

A matte-black GCSE revision desk with 2,460 flashcards: 60 in each of 41 topic decks for English Literature, Edexcel History, AQA Geography Paper 1, AQA Sociology, Combined Science Trilogy and Triple Science.

## Science, profile and paper library

Science has 1,560 course-specific cards across B1–B4, C1–C5 and P1–P4, with separate Combined and Triple decks and Higher-only labels. Choose Foundation to hide Higher-only cards. Every science deck has 60 cards in Higher; Foundation subsets can be smaller. Existing ratings and cards retain their IDs.

Sociology adds 360 cards in six AQA 8192 decks: Introduction, Research Methods, Families, Education, Crime and Deviance, and Social Stratification. Original explanations draw on all eight supplied sociology files. They include concepts, named studies, application and evaluation, with theories attributed and undated statistics omitted. Select **English, Humanities & Sociology** in Course, then your sociology deck. These are revision flashcards, not predicted exam questions.

Profile saves a name, square picture, accent colour and practice badge. Signed-in profiles use private Firestore storage; guests save in this browser. Pictures are re-encoded to a small JPEG with original metadata removed. Neutral, Blue, Violet and Mint accents retain the matte-black background. Rating 20/50/100 distinct cards unlocks badges. Save applies changes; cancel/close asks before discarding a changed draft.

Papers & files includes 186 matched pairs: the original 106 Paper 1 pairs, 66 Edexcel GCSE Maths 1MA1 pairs covering Papers 1–3 and both tiers, and 14 AQA Sociology 8192 pairs covering Papers 1–2. Search/filter by course, subject, tier, paper and series. Six official Maths packs add 2017/2018 sessions and sample/specimen assessments. Every standalone question paper is paired with the same component/tier/series mark scheme. Locked or unreleased papers are excluded; official directories link to further formats and releases. PDFs stay on the board's servers.

## Draw on papers and whiteboard

Use **Past papers → Draw on paper**, or **My practice → Open a PDF** for a downloaded file. If the board blocks embedded viewing, download its question paper first and select that PDF locally. The app accepts PDFs up to 20 MB and 200 pages. PDFs that require an opening password are unsupported.

Write with a pen or highlighter in six colours, erase ink strokes, undo/redo, move between pages and zoom. **Whiteboard** opens blank or squared working paper. Typed page notes are a keyboard alternative. Drawings and PDFs save on this device in the current guest/account scope; they do not sync to the cloud. **Resume saved practice** returns to unfinished work. Export an ink-and-notes backup and keep the original PDF too, especially before clearing browser data. A matching PDF fingerprint prevents restoring answers onto the wrong paper.

**Download written PDF** includes all pages and visible ink; PDFs that cannot be edited directly become a flattened page-image copy. **Save page image** exports the current page. Typed notes are included in the ink backup. Clear page ink is undoable while the document stays open; undo history resets when changing pages/documents. Concurrent saves from another window are detected rather than silently overwritten.

Your science files contains 18 unchanged original school downloads. Two supplied study plans contain school-login examples and are excluded from public assets; safe study guidance is summarised. The Energy KO PDFs are identical. Original organisers can contain errors or Triple/Higher material: use labelled, corrected flashcards, the official specifications and teacher guidance. See SOURCES.md and UX-CONTRACT.md.

## Accounts and cloud saving

Use Sign in to create an email/password account, sign in, request a password reset or verify your email. Firebase manages credentials; choose a fresh unique password privately. Login lasts for the browser session. Private Firestore records in London hold each signed-in person's profile, card ratings and daily graph. Guest data stays separate and is imported only through the explicit Import guest ratings action. Wait for **Saved to your account** before closing: offline queued ratings survive only the current browser session. Profile errors retain the draft; same-card and profile conflicts are shown explicitly. Guest revision and locally saved paper practice work offline in the Windows app.

## Run it

### Windows app

Double-click **Revision Desk** on the Desktop or in the Start menu. You can also double-click **Launch Revision Desk.vbs** in this folder. It starts a hidden local server and opens Microsoft Edge in a separate app window without browser tabs. It works offline and does not need Codex, Python or an internet connection to run. Edge must be installed. A bundled Node runtime powers the local server.

Keep this folder in its current location so the shortcuts continue to work. The server listens only on this computer and remains running in the background for fast reopening. Rebooting stops it; launching the app starts it again. To stop it manually, use Task Manager to end only the node.exe process whose command line points to this folder's server.cjs.

Progress belongs to the browser profile and address. Edge and the Codex preview have separate storage, so progress from the preview will not automatically appear in Edge. Theme and ratings persist when reopening in the same profile. This update preserves the existing progress storage key.

### Browser option

No installation or build step is needed. Either:

1. Visit the published GitHub Pages website, or
2. From this folder, run `node server.cjs` and visit `http://localhost:4173`.

Use a local server rather than opening index.html as a file: PDF workers and account modules require an HTTP(S) origin.

## Portable Windows copy

To copy or upload the app, use `Revision Desk - Windows.zip` from the parent outputs folder. Extract **all** files into one folder on the destination PC, then double-click `Launch Revision Desk.vbs`. Do not run it from inside the ZIP. Microsoft Edge is required; Codex and an internet connection are not. The ZIP contains the app and flashcards, not your browser's saved ratings or graph history. Desktop/Start menu shortcuts on this PC point to this installed folder.

## Daily scatter graph

Open **Progress over time** underneath the deck totals. Each dot is that deck's latest saved percentage marked Know on a local calendar day. Multiple ratings on the same day update that day's dot. Come back on another day to add a new dot. There is no invented history for older ratings, and this is not an exam-score prediction. **Read graph values** provides the same data as text.

Reset deck clears only the selected deck's ratings after confirmation. Earlier graph dates stay; today's point updates. Guest data and paper drawings can be lost if browser site data is cleared; signed-in profiles and card progress remain in private cloud storage.

## Keyboard controls

Multiple choice is the default study mode: 270 authored questions across the original nine decks, plus smaller science quick-recall subsets and 27 sociology questions. Select **Flashcards** for all 60 cards in a topic. Written calculations, practical explanations and extended evaluation remain in Flashcards; they are not auto-converted into guessed multiple-choice answers. The mode selector shows actual quiz/card counts. English reveals include the quotation, meaning, writer's technique and essay use. After answering, use Learn, Unsure or Know to save your confidence and advance. Next question skips without changing your rating. Correct quiz answers do not automatically count as mastery. Topic filters show only topics available in the selected mode.

- Focus a card and press **Enter** or **Space** to flip it.
- Press **Left Arrow** or **Right Arrow** to move between cards when not typing in search.
- Press **1** for Learn, **2** for Unsure, or **3** for Know.
- All controls are reachable by **Tab** and include visible focus styles.

## Add or edit cards

The initial content lives in `data.js`; the expanded History and Geography cards live in `extra-cards.js`, and Edexcel B3 content lives in `henry-cards.js`. A card in `data.js` has this shape:

```js
{
  id: "unique-id",
  question: "The prompt shown on the front",
  quote: "A quotation or key fact",
  answer: "Concise analysis or explanation",
  exam: "How to use it in an exam",
  tags: ["character", "theme"]
}
```

Add cards inside the relevant deck's `cards` array. Keep every `id` unique because saved progress uses it as the key.

`sociology-cards.js` owns the six sociology decks. `expanded-cards.js` appends original application and close-reading questions to the existing decks, without replacing any old cards. Preserve row order and IDs after publishing. The 60-card target applies to each complete deck, not every optional Geography topic or Foundation subset. The progress graph keeps historical denominators as recorded; new cards are initially unrated and do not erase earlier work.

The Henry deck now follows **Edexcel B3: Henry VIII and his ministers, 1509–40**, as requested from the specification. Its internal deck ID remains `henry-pending` for compatibility, but it is populated and no longer displayed as pending. Geography option cards are labelled so school choices can be adjusted.

Expanded cards use rows of `[question, key fact, explanation, exam practice, topic]`. Append rows rather than inserting or reordering them because expanded card IDs use their row number. See `SOURCES.md` for specification links and course-option notes.

Dark mode is the default. The top-right button switches themes and remembers the choice. Cards reveal with a brief fade; reduced-motion preferences disable that fade. Use Topic to select a period, physical process or optional Geography unit.
