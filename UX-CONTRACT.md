# Profile and science library contract

Requested outcome: a matte-black profile with a picture, supplied science notes converted to recall cards, separate Combined and Triple courses, and matched Paper 1 papers. No cloud photo storage or progress migration is introduced in this release.

## Canonical UI map

| Capability | Canonical owner | Source of truth | Allowed variants | Verification |
| --- | --- | --- | --- | --- |
| Select/Listbox | native HTML select | index.html + styles.css | OS owns option geometry; app owns labels, 44px trigger, focus and disabled states | Course, tier, badge and library filters; keyboard selection |
| Form | app profile form | profile.js + shared account styles | explicit labels, inline errors, saving lock, no native validation bubbles | Empty name, photo rejection, success, quota failure |
| CRUD | profile draft and app-owned confirmation dialog | profile.js; local browser profile key per UID/guest | Save commits draft; picture removal requires Save; discard keeps saved profile | Save/reopen, discard, account isolation, external-edit conflict |
| Scrollbar | styles.css | semantic CSS tokens | page scroll on small screens; native dialog overflow | 390px layout, long lists, focus visibility |
| Toast | app.js | shared toast and live status text | transient rating toast; durable profile errors/status | Rating, error and successful save announced |

## Behaviour and privacy

- Profile pictures are centre-cropped, decoded, re-encoded to a 256px JPEG and saved locally. Accept JPEG/PNG/WebP, at most 5 MB and 16 million pixels. No user photo URL is public and no Storage bucket is opened.
- Profile name/photo/badge use a separate local key per signed-in UID or guest. Ratings remain device-wide; badges count distinct rated cards, not clicks, correct answers or grades. Unlock thresholds are 20/50/100.
- Cancelling a changed draft asks whether to discard; Save stays disabled during image processing. Storage failure retains the draft. External profile edits block saving until reload so another tab is not silently overwritten.
- Combined and Triple decks have separate IDs and ratings. Foundation excludes Higher-only cards. The Foundation scatter series uses its own denominator and reset scope; common card ratings also appear in Higher, which includes the common syllabus.
- Library filters persist in the URL, with an explicit clear-search control, 12-item pagination, disabled boundaries and a no-match state. Documents are downloads, never described as examination papers.
- Public past-paper entries pair subject/component/tier/series, and link to the board's published PDF rather than rehosting it. The catalogue is not claimed to contain every paper ever issued. Medicine is Edexcel Paper 1; Henry and Cold War are Paper 2.
- Two supplied school plans contain login examples and are excluded from public assets; only safe generic study guidance is displayed. Original organisers are unmodified and may contain errors; authored flashcards correct known mistakes.

## Verification boundary

Node tests cover data integrity, scope labels, original-file hashes, unique component/series IDs, all event bindings, profile draft/error/isolation behaviour and historical progress. Browser checks cover real rendering, upload processing, discard/save, filtering, empty states, download links, keyboard and narrow viewport. Link checks validate HTTP success and PDF types; they do not assert every possible exam paper has been found.
