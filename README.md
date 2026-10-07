# Revision Deck

[Open the website](https://defnotsquishy.github.io/revision-desk/#home) · [Flashcard Maker](https://defnotsquishy.github.io/revision-desk/#maker) · [Maths resources](https://defnotsquishy.github.io/revision-desk/#maths) · [Privacy](https://defnotsquishy.github.io/revision-desk/#privacy)

Created by **nathanyu** — [GitHub: defnotsquishy](https://github.com/defnotsquishy).

A matte-black GCSE revision desk with 2,460 flashcards and 1,230 multiple-choice questions: 60 flashcards and 30 questions in each of 41 topic decks for English Literature, Edexcel History, AQA Geography Paper 1, AQA Sociology, Combined Science Trilogy and Triple Science. The visible brand is Revision Deck; existing Revision Desk URLs, shortcuts and storage keys are retained for compatibility.

Sign in with the same account on another supported device to open your saved profile, built-in study progress, personal flashcard decks, highlights and personal-card confidence ratings. Wait for a confirmed save. Guest work, PDFs, whiteboards, drawings, appearance preferences and Canyon Run's best lap stay on the device where they were made; this release does not enable paid file storage.

## Original Canyon Run

FRACTURE was removed at the user's request and stays retired. The original Canyon Run from “Build 3D canyon driving game” is an unchanged, self-contained driving page at `/canyon-run/`, linked from the [Games section](https://defnotsquishy.github.io/revision-desk/#games) and Customise Desk. No game stats or embedded renderer appear in revision.

WASD/arrows drive, Space brakes and R recovers. A modern WebGL-capable desktop browser is needed. Only the best lap is stored locally in `canyon-run-best-v1`; it does not sync to Firebase or affect revision. The standalone HTML retains its original inline notices, and full React/React DOM/Three MIT and Lucide ISC/Feather notices are in `canyon-run/licenses/`. The Windows copy opens the public HTTPS game and needs internet for that link; existing local revision remains offline-capable.

## Science, profile and paper library

Science has 1,560 course-specific cards across B1–B4, C1–C5 and P1–P4, with separate Combined and Triple decks and Higher-only labels. Choose Foundation to hide Higher-only cards. Every science deck has 60 cards in Higher; Foundation subsets can be smaller. Existing ratings and cards retain their IDs.

Sociology adds 360 cards in six AQA 8192 decks: Introduction, Research Methods, Families, Education, Crime and Deviance, and Social Stratification. Original explanations draw on all eight supplied sociology files. They include concepts, named studies, application and evaluation, with theories attributed and undated statistics omitted. Select **English, Humanities & Sociology** in Course, then your sociology deck. These are revision flashcards, not predicted exam questions.

Your profile displays your saved name and square picture, and opens the existing form for accent colour and practice badge. Signed-in profiles use private Firestore storage; guests save in this browser. Pictures are re-encoded to a small JPEG with original metadata removed. Neutral, Blue, Violet and Mint accents are separate from background choices. Rating 20/50/100 distinct cards unlocks existing practice badges. Save applies changes; cancel/close asks before discarding a changed draft. Public profile sharing and the First Ten community badge are not launched. Future public profiles require explicit opt-in and will not expose email, progress or drawings.

Choose **Past papers** in the website navigation to open Papers & files. It includes 354 unique matched pairs, including 66 Edexcel GCSE Maths 1MA1 pairs (Papers 1–3, both tiers), 14 AQA Sociology pairs (Papers 1–2), 22 History pairs for Medicine, Henry VIII and Cold War, 12 AQA Level 2 Further Maths 8365 pairs, and 19 AQA GCSE English Language 8700 pairs with matching source-text inserts. AQA English Literature 8702, Combined Trilogy and Triple Biology/Chemistry/Physics Papers 1 and 2, and Geography Papers 1–3 are included. Historic formats and updated 2026 English Language specimens are labelled; specimens are not 2026 past papers. Six official Maths packs add 2017/2018 sessions and sample/specimen assessments. Search/filter by course, subject, tier, paper and series, or use Show all public papers to clear filters. Every standalone question paper is paired with the same component/tier/series scheme. Locked or unreleased papers are excluded; History Paper 3 is not assumed because your school option is unconfirmed. Official directories link to further formats and releases. PDFs stay on the board's servers.

## Kart Royale — project by nathanyu

[Play Kart Royale](https://defnotsquishy.github.io/revision-desk/kart-royale/) or find it in [Games](https://defnotsquishy.github.io/revision-desk/#games). The complete supplied browser build is hosted under this website, not redirected to Agora: 12 racers, three courses and ten items. Keyboard/controller, modern desktop browser and WebGL 2 required. The first web load is about 40 MB.

The player loads the game only after Play, in an opaque-origin sandbox without revision-account/storage access. It has fullscreen, restart, controls and credits. There is no multiplayer, cloud game saving or study reward. Volume/help preferences are session-only in the isolated player. The separate **Kart Royale - Windows App.zip** contains the same assets, a licensed Node runtime and a hidden launcher opening an Edge app window, without changing the Revision Desk app. Extract the whole folder and double-click **Launch Kart Royale.vbs**; don't open the raw game HTML as a file.

The export is a compiled build, not the editable source project. Gameplay bundles/assets are unchanged; the entry adds a fixed readiness/error bridge. Its original unofficial fan-game disclaimer is preserved. Character assets and names belong to their respective owners; the export supplies neither a whole-game open-source licence nor evidence of rights to redistribute those assets. Project credit is not an ownership claim over third-party material. Included library/font licences are in [Kart Royale dependency notices](https://defnotsquishy.github.io/revision-desk/kart-royale/NOTICES.txt).

## Maths resources

[Maths resources](https://defnotsquishy.github.io/revision-desk/#maths) contains all 106 topics in the checked 1st Class Maths Edexcel GCSE directory, grouped into six sections, plus 23 AQA Level 2 Further Maths topics in seven sections. Each topic links to an explanation video, practice questions and worked solutions; Further Maths uses solution videos. Three revision booklets are linked. GCSE provider-grade filters, course/section selection, search and 12-row pagination keep the list manageable. Further Maths is untiered. These are the provider's checked directory rows, not a promise of every channel upload or future release; resources remain on their original provider's service.

## Make your own flashcards

[Flashcard Maker](https://defnotsquishy.github.io/revision-desk/#maker) lets you create, edit, practise, archive/restore and download/restore private question-and-answer decks. There are up to 50 saved decks per account or local scope, including archived decks, with up to 100 cards each. Choose **Save deck** and wait for confirmation: signed-in decks save to your private Firebase account, while guest decks save only in this browser.

To keep a deck made before this update, sign in, choose **Show device decks**, then explicitly confirm **Copy to account**. Only copy work you made yourself. The original device copy stays unchanged; signing in does not upload it automatically. Restoring a JSON backup creates a new unsaved draft and needs Save before it becomes an account deck.

Select important words in a question or answer and choose **Highlight selection**. A yellow preview and the practice view show your marked passages. Clear highlights removes that field's marks; editing its text clears those marks to avoid highlighting the wrong words. Highlights are plain-text ranges, not executable HTML, and are included in saves and backups.

In signed-in practice, reveal the answer, then choose **Learn again**, **Unsure** or **Know** to save that personal card's confidence across devices. This is separate from built-in deck totals, graphs and badges; guest personal-card practice does not track confidence. Editing a card's text or highlights makes its previous confidence inapplicable to the new content. Concurrent changes show a conflict and offer reloading the saved copy instead of silently overwriting it.

Visiting another section keeps an unsaved draft in this window. Refreshing, closing or changing accounts can lose it: download a draft backup first. Signed-in personal decks need a connection for opening and saving; there is no persistent custom-deck offline cache or retry outbox. JSON backups are limited to 4 MB and contain deck text, card identifiers and highlights, not sign-in credentials or confidence history. Archiving hides a deck from practice but does not delete it.

## Customise Desk

Use **Customise Desk** in the navigation for Dark/Light/System theme, Matte black/Slate/Midnight/Forest/Plum background, density, text size, Square/Soft/Rounded panel corners, Book/Simple question font, Standard/Roomier reading spacing, stronger interface contrast, reduced motion and optional flashcard shortcuts. The live preview reflects these choices. Changes apply immediately and save on this device, separately from accounts and progress. Your Windows reduced-motion preference is always respected. **Edit profile & colour** opens the existing profile form: choose Neutral, Blue, Violet or Mint and Save profile to apply your accent. Signed-in profile colours follow your account; layout preferences do not. Restore appearance defaults never resets your cards or drawings.

## Draw on papers and whiteboard

Use **Past papers → Draw on paper**, or **Whiteboard → Open a PDF** for a downloaded file. There is one Whiteboard navigation entry; returning to it keeps the open paper or board. If the board blocks embedded viewing, download its question paper first and select that PDF locally. The app accepts PDFs up to 20 MB and 200 pages. PDFs that require an opening password are unsupported.

Write with a pen or highlighter in six colours, erase ink strokes, undo/redo, move between pages and zoom. **New whiteboard** creates blank or squared working paper. Typed page notes are a keyboard alternative. Drawings and PDFs save on this device in the current guest/account scope; they do not sync to the cloud. **Resume saved practice** returns to unfinished work. Export an ink-and-notes backup and keep the original PDF too, especially before clearing browser data. A matching PDF fingerprint prevents restoring answers onto the wrong paper.

**Download written PDF** includes all pages and visible ink; PDFs that cannot be edited directly become a flattened page-image copy. **Save page image** exports the current page. Typed notes are included in the ink backup. Clear page ink is undoable while the document stays open; undo history resets when changing pages/documents. Concurrent saves from another window are detected rather than silently overwritten.

Your science files contains 18 unchanged original school downloads. Two supplied study plans contain school-login examples and are excluded from public assets; safe study guidance is summarised. The Energy KO PDFs are identical. Original organisers can contain errors or Triple/Higher material: use labelled, corrected flashcards, the official specifications and teacher guidance. See SOURCES.md and UX-CONTRACT.md.

## Accounts and cloud saving

Use Sign in to create an email/password account, sign in, request a password reset or verify your email. Firebase manages credentials; choose a fresh unique password privately. Login lasts for the browser session. Private Firestore records in London hold each signed-in person's profile, built-in card ratings and daily graph, plus saved personal decks/highlights/confidence. Guest data stays separate: Import guest ratings copies missing built-in ratings only; personal decks have their own explicit Copy to account action. Wait for **Saved to your account** before closing built-in revision: its offline queued ratings survive only the current browser session. Personal-deck saves instead need a confirmed online transaction; failed or unconfirmed saves keep the draft in this window for retry or backup. Profile errors retain the draft; same-card, deck and profile conflicts are shown explicitly. Guest revision and locally saved paper practice work offline in the Windows app.

## Run it

### Windows app

Double-click **Revision Desk** on the Desktop or in the Start menu. You can also double-click **Launch Revision Desk.vbs** in this folder. It starts a hidden local server and opens Microsoft Edge in a separate app window without browser tabs. It works offline and does not need Codex, Python or an internet connection to run. Edge must be installed. A bundled Node runtime powers the local server.

Keep this folder in its current location so the shortcuts continue to work. The server listens only on this computer and remains running in the background for fast reopening. Rebooting stops it; launching the app starts it again. To stop it manually, use Task Manager to end only the node.exe process whose command line points to this folder's server.cjs.

Guest progress and device-only work belong to the browser profile and address; different browsers have separate local storage. Signed-in saved profiles, revision progress and personal decks follow the same account across the website and Windows app when connected. Appearance and practice files remain local. This update preserves the existing guest-progress storage key.

### Browser option

No installation or build step is needed: [open the published website](https://defnotsquishy.github.io/revision-desk/). The Windows launcher is the separate option for local guest revision; opening `index.html` directly as a file does not support PDF workers or account modules.

## Portable Windows copy

To copy or upload the app, use `Revision Desk - Windows.zip` from the parent outputs folder. Extract **all** files into one folder on the destination PC, then double-click `Launch Revision Desk.vbs`. Do not run it from inside the ZIP. Microsoft Edge is required; Codex and an internet connection are not. The ZIP contains the app and flashcards, not your browser's saved ratings or graph history. Desktop/Start menu shortcuts on this PC point to this installed folder.

## Daily scatter graph

Open **Progress over time** underneath the deck totals. Each dot is that deck's latest saved percentage marked Know on a local calendar day. Multiple ratings on the same day update that day's dot. Come back on another day to add a new dot. There is no invented history for older ratings, and this is not an exam-score prediction. **Read graph values** provides the same data as text.

Reset deck clears only the selected deck's ratings after confirmation. Earlier graph dates stay; today's point updates. Guest data and paper drawings can be lost if browser site data is cleared; signed-in profiles and card progress remain in private cloud storage.

## Keyboard controls

Multiple choice is the default study mode: exactly 30 authored questions in each of 41 decks (1,230 course-scoped questions). All science sets retain 30 questions when Foundation is selected, with Combined and Triple appropriately separate. Select **Flashcards** for all 60 cards in a complete topic; Foundation excludes Higher-only cards. Broader written calculations, practical explanations and extended evaluation remain in Flashcards. New science and sociology options are authored against official specifications and published mark schemes, not generated by guessing from paragraphs. The mode selector shows actual quiz/card counts; topic/search/status filters can show a smaller subset. English reveals include the quotation, meaning, writer's technique and essay use. After answering, use Learn, Unsure or Know to save your confidence and advance. Next question skips without changing your rating. Correct quiz answers do not automatically count as mastery.

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

Dark mode is the default. The top-right button switches themes; the choice is remembered unless appearance storage is turned off under Cookies & storage. Cards reveal with a brief fade; reduced-motion preferences disable that fade. Use Topic to select a period, physical process or optional Geography unit.

## Policies, copyright and source

The footer opens bookmarkable Privacy (`#privacy`), Cookies & storage (`#cookies`), use guidance (`#terms`), Copyright (`#copyright`) and source/dependency notices (`#open-source`). They share the existing router and work in the Windows copy too. The source link points to this repository. This public repository currently has no general reuse licence for its original code; third-party dependency licences do not license the entire app or exam materials.

Revision Deck is operated by **nathanyu**. For private access, correction or deletion requests contact [cheesehim21@gmail.com](mailto:cheesehim21@gmail.com); the operator handles requests manually and keeps account data while the account is used. Do not send passwords, sign-in codes or tokens, and do not post account information in public issues. There is no in-app account-deletion button or automatic cloud expiry. The published notice states the current technical facts and confirmed contact/retention criterion; it is not a compliance certification. The operator still needs to confirm the lawful basis, detailed request handling, provider/international-transfer arrangements and appropriate children's privacy assessment. Firestore is in London, but Firebase Authentication processes account data in the United States. Use guidance is not a solicitor-reviewed contract.

The storage choice is owned by `theme.js`. Turning appearance remembering off clears only the appearance/theme/mode values and stops reading/writing them between visits. It retains the explicit on/off choice and does not delete guest progress, profiles, cloud records or IndexedDB drawings. There are no app advertising or analytics integrations. A notice alone does not establish that every storage use is exempt from consent requirements.

Past-paper links use official board servers; the board copyrights and terms remain applicable. Some supplied school science files are hosted as study downloads, without a grant of redistribution rights. Full existing vendor notices accompany PDF.js/pdf-lib assets. The Windows runtime additionally includes `runtime/LICENSE.txt` for Node.js and its dependencies.
