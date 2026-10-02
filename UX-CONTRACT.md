# Profile and science library contract

Requested outcome: a matte-black profile with a picture, supplied science notes converted to recall cards, separate Combined and Triple courses, matched Paper 1 papers, and now private database-backed account information and progress. The latest user request and chosen London location supersede the earlier local-only account stage. Storage and permission authority: `work/CLOUD-STORAGE.md` / `firestore.rules` in the source workspace.

## Canonical UI map

| Capability | Canonical owner | Source of truth | Allowed variants | Verification |
| --- | --- | --- | --- | --- |
| Select/Listbox | native HTML select | index.html + styles.css | OS owns option geometry; app owns labels, 44px trigger, focus and disabled states | Course, tier, badge and library filters; keyboard selection |
| Form | app profile form | profile.js + shared account styles | explicit labels, inline errors, saving lock, no native validation bubbles | Empty name, photo rejection, success, quota failure |
| CRUD | profile draft and app-owned confirmation dialog | profile.js + store.js; Firestore owns signed-in profiles, local key owns guest | Save needs server confirmation when signed in; picture removal requires Save; discard keeps saved profile | Save/reopen, discard, account isolation, external-edit conflict |
| Scrollbar | styles.css | semantic CSS tokens | page scroll on small screens; native dialog overflow | 390px layout, long lists, focus visibility |
| Toast | app.js | shared toast and live status text | transient rating toast; durable profile errors/status | Rating, error and successful save announced |

## Behaviour and privacy

- Profile pictures are centre-cropped, decoded and re-encoded to a 256px JPEG. Accept JPEG/PNG/WebP, at most 5 MB and 16 million pixels. Guest pictures are local; signed-in pictures are saved to an owner-only Firestore document. No user photo URL is public and no Storage bucket is opened.
- store.js is the canonical data owner for profile, ratings and history. Signed-in data is per authenticated UID with owner-only server rules; guest keys remain device-wide. Badges count that scope’s distinct rated cards, not clicks, correct answers or grades. Unlock thresholds are 20/50/100; badges grant no privileges.
- Cloud status is a persistent app-owned live region. Only server confirmation says saved. Offline/unconfirmed rating edits are queued in UID-scoped session storage; closing the session can lose them, with a close/sign-out warning. Retry preserves queued changes. Account switches discard stale callbacks and never copy one account’s cache into another. Guest import requires an app-owned confirmation and adds missing ratings only, never profiles or fabricated historical dates.
- Same-card concurrent edits offer Use account ratings / Keep my changed ratings. Different cards merge in a transaction, with an atomic daily point computed from the server deck. Profile saves use a version check; conflict/error retains the draft and instructs close/reopen rather than silently overwriting. Reset awaits cloud confirmation in its dialog; a failure can leave some ratings reset and others queued, and says so explicitly.
- Cancelling a changed draft asks whether to discard; Save stays disabled during image processing. Storage failure retains the draft. External profile edits block saving until reload so another tab is not silently overwritten.
- Combined and Triple decks have separate IDs and ratings. Foundation excludes Higher-only cards. The Foundation scatter series uses its own denominator and reset scope; common card ratings also appear in Higher, which includes the common syllabus.
- Library filters persist in the URL, with an explicit clear-search control, 12-item pagination, disabled boundaries and a no-match state. Documents are downloads, never described as examination papers.
- Public past-paper entries pair subject/component/tier/series, and link to the board's published PDF rather than rehosting it. The catalogue is not claimed to contain every paper ever issued. Medicine is Edexcel Paper 1; Henry and Cold War are Paper 2.
- Two supplied school plans contain login examples and are excluded from public assets; only safe generic study guidance is displayed. Original organisers are unmodified and may contain errors; authored flashcards correct known mistakes.

## Drawing and route contract

- home.js owns #home, #flashcards and #practice; navigation retains the open deck and drawing. Native hash history supports Back. Unknown hashes fall back to Home. Route document titles are `{Page} — Revision Desk`; focus moves to the destination heading. There are no role-protected navigation pages or inferred 403 states.
- practice.js is the sole drawing owner for PDFs and whiteboards. Normalised coordinates preserve ink across resize/zoom. The eraser removes whole ink strokes; undo/redo retain 50 page snapshots and reset when changing page/document. Clear ink requires confirmation, preserves typed notes and is undoable.
- Drawings, PDF bytes and notes are saved in IndexedDB on this device, under a guest or authenticated UID scope. They are not sent to Firebase. The save label follows transaction completion. A revision check rejects concurrent overwrites, retaining the draft for export/reload. Storage failures keep current work in memory, prevent replacing it with another document, and warn on actual unload.
- Profiles, ratings and graph history remain the separate cloud store's responsibility. The profile accent is draft-only until Save and follows the same UID/version boundary as the name and picture.
- The file picker accepts PDFs up to 20 MB / 200 pages, validates PDF content and renders pixels without executing PDF scripts. Password-protected PDFs needing a password are unsupported. Failed loads retain previous work. Board CORS failures expose an official download link and local-file fallback; imported files are not assumed to match a catalogue mark scheme.
- PDF and PNG exports contain visible pages and ink. Typed notes are included in the validated JSON ink backup. A backup can be restored only to the matching PDF fingerprint (or a whiteboard), after confirmation. PDF files using encryption are exported as rendered page images if regular PDF editing is unsupported.
- Native labelled tool/colour buttons, page/zoom controls and auto-growing notes are keyboard reachable. Drawing itself uses pointer input; Scroll/read restores touch scrolling. Flashcard shortcuts never run in this view. Screen readers can use typed notes and the official PDF's reading tools; the canvas is a visual rendering, not a text-layer PDF reader.


## Verification boundary

## Customise Desk and full-paper extension

- home.js additionally owns #customise and #customise-title. Route titles, heading focus, browser Back and skip links reuse the existing owner; navigation preserves the selected deck and active practice document.
- theme.js is the only appearance preference owner. Its private local key is revision-desk-appearance-v1; it reads the legacy light/dark key on first use, never edits account/guest data. Settings apply immediately and autosave locally. Quota/unavailable storage says settings apply only for now. System theme responds to OS changes. Storage events update other tabs. Restore appearance defaults resets only these preferences, not the saved profile accent, card progress, accounts, PDFs or ink.
- Native labelled radios own theme/density/font selection; native checkboxes own motion/shortcuts. Existing Space/Enter button activation remains available if optional document-level study shortcuts are disabled. Shortcuts never act through input fields, composition, modal dialogs, modifier keys or hidden views. OS reduced motion cannot be overridden.
- The Profile & accent action opens the canonical profile.js modal and its existing Save/Discard/cloud conflict flow. Swatches are explicitly non-interactive illustrations of the available named colours. Device appearance choices do not claim to sync to Firebase.
- The paper picker defaults to All courses unless a validated URL filter exists. It shows 317 unique pairs plus 6 Maths packs and sorts newest series first. Filter reset clears course/subject/tier/paper/search, restores the paper section, persists the URL and focuses Course. Selecting a non-science subject from a science-only filter switches to Other subjects. Empty results never imply no papers exist.
- Maths public coverage includes 66 individual 1MA1 pairs across all three papers and both tiers, four older official ZIP sessions and two sample/specimen PDF packs. History has 22 pairs for 11/B3/P4 only. No Paper 3 option, locked release, older combined-option compatibility or guarantee of every issued paper is invented. PDFs are linked on their original board servers; archive packs require extracting/opening the relevant local PDF. No change to drawing/cloud ownership.

## Verification boundary (continued)

Node tests cover data integrity, scope labels, original-file hashes, unique component/series IDs, all event bindings, profile draft/error/isolation behaviour and historical progress. Browser checks cover real rendering, upload processing, discard/save, filtering, empty states, download links, keyboard and narrow viewport. Link checks validate HTTP success and PDF types; they do not assert every possible exam paper has been found.
