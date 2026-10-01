# Revision Desk

A matte-black GCSE revision desk with 1,231 flashcards for English Literature, Edexcel History, AQA Geography Paper 1, Combined Science Trilogy and Triple Science.

## Science, profile and paper library

Science adds 905 course-specific cards across B1–B4, C1–C5 and P1–P4, with separate Combined and Triple decks and Higher-only labels. Choose Foundation to hide Higher-only cards. Every science deck has at least 30 cards in Higher; Foundation subsets can be smaller. Existing ratings and cards retain their IDs.

Profile saves a name, square picture and practice badge in this browser only. Pictures are re-encoded to a small JPEG with original metadata removed; no Firebase Storage upload occurs. Signed-in UIDs and guests have separate local profiles, but ratings and graphs remain device-wide. Rating 20/50/100 distinct cards unlocks badges, not exam grades. Save commits changes; cancel/close asks before discarding a changed draft.

Papers & files contains 106 matched official public Paper 1 pairs with mark schemes: AQA Science/Biology/Chemistry/Physics/English Literature/Geography and Edexcel Medicine (June 2023/2024). Search/filter by course, subject, tier and series. PDFs open on the board's published resources and need internet. This is a catalogue of verified public pairs, not every paper ever issued; official directory links cover other years and accessible formats. Henry and Cold War belong to Edexcel Paper 2, not this Paper 1 catalogue.

Your science files contains 18 unchanged original school downloads. Two supplied study plans contain school-login examples and are excluded from public assets; safe study guidance is summarised. The Energy KO PDFs are identical. Original organisers can contain errors or Triple/Higher material: use labelled, corrected flashcards, the official specifications and teacher guidance. See SOURCES.md and UX-CONTRACT.md.

## Accounts (stage 1)

Use Sign in to create an email/password account, sign in, request a password reset or verify your email. Firebase handles authentication; choose a fresh unique password privately. Login lasts for the browser session. Authentication needs internet access, but guest revision remains available offline. Ratings and graph history are still device-only and are not linked to or uploaded to your account yet. Cloud progress migration is the next stage. Signing out leaves device ratings unchanged. Do not treat an account on a shared browser as a separate progress profile yet.

## Run it

### Windows app

Double-click **Revision Desk** on the Desktop or in the Start menu. You can also double-click **Launch Revision Desk.vbs** in this folder. It starts a hidden local server and opens Microsoft Edge in a separate app window without browser tabs. It works offline and does not need Codex, Python or an internet connection to run. Edge must be installed. A bundled Node runtime powers the local server.

Keep this folder in its current location so the shortcuts continue to work. The server listens only on this computer and remains running in the background for fast reopening. Rebooting stops it; launching the app starts it again. To stop it manually, use Task Manager to end only the node.exe process whose command line points to this folder's server.cjs.

Progress belongs to the browser profile and address. Edge and the Codex preview have separate storage, so progress from the preview will not automatically appear in Edge. Theme and ratings persist when reopening in the same profile. This update preserves the existing progress storage key.

### Browser option

No installation or build step is needed. Either:

1. Open `index.html` directly in a modern browser, or
2. From this folder, run `python -m http.server 4173` and visit `http://localhost:4173`.

The second option is recommended. Progress is saved in the browser's local storage on that device.

## Portable Windows copy

To copy or upload the app, use `Revision Desk - Windows.zip` from the parent outputs folder. Extract **all** files into one folder on the destination PC, then double-click `Launch Revision Desk.vbs`. Do not run it from inside the ZIP. Microsoft Edge is required; Codex and an internet connection are not. The ZIP contains the app and flashcards, not your browser's saved ratings or graph history. Desktop/Start menu shortcuts on this PC point to this installed folder.

## Daily scatter graph

Open **Progress over time** underneath the deck totals. Each dot is that deck's latest saved percentage marked Know on a local calendar day. Multiple ratings on the same day update that day's dot. Come back on another day to add a new dot. There is no invented history for older ratings, and this is not an exam-score prediction. **Read graph values** provides the same data as text.

Reset deck clears only the selected deck's ratings after confirmation. Earlier graph dates stay; today's point updates to zero. All data is local to your browser profile and can be lost if browser site data is cleared. Keep using the same shortcut/profile for consistent progress.

## Keyboard controls

Multiple choice is the default study mode: 270 authored questions across the original nine decks, plus smaller science quick-recall subsets. Written science calculations, practical explanations and evaluation remain in Flashcards. The mode selector shows actual quiz/card counts. English reveals include the quotation, meaning, writer's technique and essay use. After answering, use Learn, Unsure or Know to save your confidence and advance. Next question skips without changing your rating. Correct quiz answers do not automatically count as mastery. Topic filters show only topics available in the selected mode.

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

The Henry deck now follows **Edexcel B3: Henry VIII and his ministers, 1509–40**, as requested from the specification. Its internal deck ID remains `henry-pending` for compatibility, but it is populated and no longer displayed as pending. Geography option cards are labelled so school choices can be adjusted.

Expanded cards use rows of `[question, key fact, explanation, exam practice, topic]`. Append rows rather than inserting or reordering them because expanded card IDs use their row number. See `SOURCES.md` for specification links and course-option notes.

Dark mode is the default. The top-right button switches themes and remembers the choice. Cards reveal with a brief fade; reduced-motion preferences disable that fade. Use Topic to select a period, physical process or optional Geography unit.
