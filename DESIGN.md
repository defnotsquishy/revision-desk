---
version: alpha
name: Revision Deck
description: A matte-black, compact GCSE study desk with quiet daily progress plotting.
colors:
  ink: '#f2f2f3'
  muted: '#ababaf'
  paper: '#202124'
  surface: '#282a2e'
  line: '#3c3f44'
  accent: '#e4e4e7'
typography:
  body:
    fontFamily: 'Inter, ui-sans-serif, system-ui, Segoe UI, sans-serif'
  question:
    fontFamily: 'Georgia, Times New Roman, serif'
  chart:
    fontFamily: 'ui-monospace, Consolas, monospace'
rounded:
  panel: '0.75rem'
  card: '0.9rem'
spacing:
  compact: '0.75rem'
  panel: '1rem'
components:
  primary-button:
    backgroundColor: '{colors.accent}'
    textColor: '{colors.paper}'
---

## Overview
Product tool for a GCSE student practising recall on Windows. The latest Cognito-style reference evolves matte black into flat charcoal with a centred welcome panel and compact subject table. Keep the text-only Revision Deck identity, real private progress, compact library and serif recall prompts; avoid invented XP, upgrade plans, gradients and spinning cards.

## Colors
Runtime CSS is canonical (Model B): colors.* map directly to same-name --* properties in styles.css under :root[data-theme="dark"]. The app owner maintains both together. White denotes primary actions; semantic green, amber and red distinguish named ratings. Light theme retains the existing palette and hierarchy.

## Typography
System sans for study controls and explanations, Georgia for recall prompts/quotations and the Home greeting, monospace for chart axes. The screenshot-inspired Home and navigation use locally hosted Nunito with system fallback; its SIL OFL text accompanies the asset. English (UK) is the current locale. No network font requests.

The optional account layer loads the pinned Firebase SDK online; guest revision remains independent and works offline.

## Layout
244px library; workspace max 980px. Below 780px the library becomes a horizontal rail and the page uses one document scroll owner. Controls remain at least 44px. Collapsed Progress over time keeps card practice compact. No fixed content height; long answers grow naturally. Graph values have a bounded secondary scroller.

## Elevation & Depth
Flat dark surfaces with borders. Dark --shadow is none. Modal backdrop isolates reset; no decorative glow.

## Shapes
Panels default to 0.75rem, cards 0.9rem. Device preferences offer Square (0.15rem for both) and Rounded (1.25rem panels, 1.5rem cards). CSS owns --desk-panel-radius and --desk-card-radius; Home panels, study cards, settings/preview, policy callouts and the paper frame share them. Controls and status chips retain established shapes.

## Components

profile.js owns the profile draft, image decoding/re-encoding, save/discard confirmation, per-UID scope and practice badges. library.js owns the searchable, paginated past-paper / school-files dialog. Both reuse native dialogs, selects, inline statuses and the established semantic palette. Header actions wrap without clipping; library filter columns collapse on narrow screens. UX-CONTRACT.md records their canonical owners and error/privacy behaviour.

science-cards.js and expanded-cards.js supply 1,560 course-specific cards across 13 topics each for Combined and Triple. Higher-only and Triple-only content is labelled; Foundation excludes Higher-only cards. Each complete deck has 60 cards; Foundation flashcard counts can be smaller. sociology-cards.js supplies six 60-card AQA 8192 decks. The three quiz-*.js additions replace earlier small science/sociology quiz sets with exactly 30 authored questions per topic, retaining stable IDs, explanations and course boundaries. Every science quiz has 30 Foundation-eligible questions; broader Higher written work remains in Flashcards. Existing controls and matte-black tokens are reused. papers-data.js records matched official public PDFs; resources-data.js records 18 unchanged user-supplied files. No school login examples are published.
index.html owns shared markup; app.js owns deck, filter, ratings and reset behavior. history.js owns local daily snapshots and SVG chart rendering. styles.css owns all themes, scrollbars and control states. Native selects deliberately retain OS-owned option geometry and keyboard support. Native HTML dialog owns focus trapping and Escape; app controls naming, contents, initial cancel focus and confirmation. No browser confirm prompts.

auth.js owns a single account form/dialog for sign-in, signup, password reset and verification. Reuse the existing button and native-dialog primitives, palette, borders and focus styles; no rebrand. Fields use explicit labels, app-owned inline errors and first-error focus. Submission is locked while pending; session persistence is browser-session only. Passwords are masked with a reveal control and cleared after submission/close, never logged or manually stored. Account sign-out restores separate guest ratings. Study shortcuts are suppressed while any modal is open or the flashcard view is hidden.

Scatter dots are actual daily snapshots, percentage Know of the entire deck at recording time. Date axis uses actual date spacing; a single day is centred. No fabricated history or exam-score claims. Text values accompany the graph. Prior-day history remains after reset, today's entry updates. Guest ratings keep their existing storage key; signed-in ratings and history use private Firestore data. Storage errors are visible. Theme is saved separately. UI has a 100ms opacity reveal and respects reduced motion.

## Account database evolution

The approved account-saving request supersedes the earlier local-only account stage described above. store.js now owns guest/account data scope, session cache, pending ratings, retry and conflict resolution; cloud.js owns private Firestore transactions and subscriptions. profile.js still owns the draft/upload preparation and shared save/discard UI. auth.js owns authentication only. Cloud status uses existing matte-black tokens and a reserved text region, never new decorative colours. See UX-CONTRACT.md and work/CLOUD-STORAGE.md for authoritative storage/permission behaviour. Guest keys and content are preserved. Signed-in saves distinguish loading, pending, offline, failure, conflict and server-confirmed success; passwords remain entirely with Firebase Authentication.

## Paper practice and home navigation

home.js owns hash navigation, route titles and focus. Home now uses the screenshot-inspired welcome/course dashboard described below, retaining past-paper and whiteboard shortcuts. The drawing view is named Whiteboard with one navigation entry; #practice remains a backwards-compatible alias for #whiteboard. Entering the view does not create or replace a drawing. library.js remains the sole paper-picker owner. practice.js owns one reusable paper/whiteboard workspace; ink-core.js owns normalised strokes; practice-storage.js owns version-checked, UID-partitioned device saving. PDF.js 6.3.289 and pdf-lib 1.17.1 are pinned local vendor assets with licences.

The paper is always white and the surrounding chrome uses the selected theme. Black, blue, red, green, purple and yellow are named ink choices, not rating colours. Pen/highlighter/eraser/scroll tools have text labels and pressed states. Typed notes offer a keyboard alternative. Canvas is the only intentional two-dimensional scroll surface at enlarged zoom; the surrounding page reflows. Export/restore and recoverable clear reuse native app dialogs and statuses.

Optional profile accents map to existing CSS tokens --accent, --accent-dark and --gold. Neutral retains the original palette. Dark blue uses #a4c7ff/#86b4fc, violet #d0b6ff/#ba98fa, mint #9be4c0/#7ed2a9. Light equivalents use #1b56a3/#164784, #7440ae/#60318f, #176b49/#125a3d. Only a saved profile changes the desk; background and semantic rating colours keep their meanings. CSS remains canonical (Model B).

## Workspace and appearance update

The user's October references guide a restrained matte-black settings layout, not a pixel-identical clone. No Aurora gradient, invented score, paid upgrade, billing or non-functional controls are introduced. Existing controls, native dialogs and owner boundaries are retained.

The latest dashboard reference replaces the 214px navigation rail with compact wrapping top navigation at every width. The flashcard deck picker remains a horizontal rail below 1100px. The document owns scrolling; no route inherits a fixed height or clipping. Customise Desk is an additional home.js route, not a separate router. Its live reading preview displays real library/review counts and uses actual current CSS tokens.

theme.js owns device-only appearance preferences: Dark/Light/System, Compact/Default/Comfortable density, Small/Medium/Large text, panel corners, Book/Simple question font, Standard/Roomier reading spacing, Standard/Stronger contrast, reduced motion and flashcard shortcuts. Legacy and older appearance records migrate with defaults without touching progress. Root font sizes are 15/16/18px; --desk-space and --desk-panel-space control named density variants. --desk-question-font maps Book to Georgia and Simple to the existing system sans stack; controls remain sans. --desk-question-leading/--desk-answer-leading are 1.35/1.65 normally and 1.6/1.9 for Roomier. Stronger contrast maps only --line/--muted to #77777e/#c5c5cc in Dark and #747d91/#424b63 in Light; paper pixels, ink and rating colours are unchanged. CSS remains canonical (Model B), with root data attributes set only by theme.js. Controls remain at least 44px; OS reduced motion is always respected. Native radios and checkboxes are labelled; inline status distinguishes saved preferences from unavailable storage. Cross-tab updates follow the same owner. Profile/accent editing opens the existing Save/Discard modal; no second profile-saving mechanism.

papers-complete.js extends the existing public catalogue without changing original records or IDs. The library defaults to All courses, orders latest series first, explains Maths archive formats and confirmed History options, and offers a reset-filter action. Only verified public question/scheme pairs appear; History Paper 3 remains unconfirmed rather than guessed. See SOURCES.md for the reproducible resource checks.

## Do's and Don'ts

The user withdrew FRACTURE on 3 October; its renderer chunks and routes remain retired, with source/build recoverably archived outside the public site. The latest request adds only a small Games navigation heading and a new-tab Canyon Run link, alongside the existing quiet Customise link. The confirmed original is a byte-identical standalone import at /canyon-run/. It keeps its original game styling and keyboard handlers isolated from revision. Visiting revision never loads it; its best-lap key is separate and local. Do not rebuild, restyle or invent game progress for this import.

Policy pages reuse the existing matte-black/light tokens, system type and document scroll. A compact footer leads to five bookmarkable reading pages; quiet bordered callouts distinguish the unresolved privacy draft and the explicit appearance-storage choice. Reading copy is capped at 74ch and wraps long storage identifiers. No new brand palette, consent decoration, fixed-height content or separate router is introduced.

- Multiple choice is the default: 41 decks × 30 questions = 1,230 course-scoped authored questions. Flashcards retains 2,460 cards, 60 in each complete deck. quiz-data.js, quiz-more.js and the three quiz-*.js additions map authored options to stable card IDs; deeper-content.js and expanded-cards.js add English close-reading notes. English reveals separate quotation, meaning, technique and essay use with quiet labels. Choices shuffle on each question visit. One answer locks the question and shows correctness in text plus the explanation; confidence ratings remain explicit and share the existing progress store. Switching mode resets topic and position but preserves search/status. Quiz counts distinguish the 30-question subset from the complete deck and optional topic/status/search filters. Existing palette, serif prompts and control focus styles are reused.
- Keep ratings text-labelled; never rely on colour alone.
- Keep app and graph usable without a network or chart library.
- Preserve stable card IDs and existing user ratings.
- Do not imply reviewed percentage means mastery.
- Do not backfill historical dates for old undated ratings.

## October navigation, backgrounds and private profile

The visible brand is text-only Revision Deck; no top-left logo mark is displayed. Established filenames, account configuration, public URLs and storage keys remain Revision Desk for compatibility. The latest screenshot request authorises a new Home dashboard while unrelated view markup and data remain unchanged.

Background colour is an additional device preference owned only by theme.js. Matte black uses the accepted flat charcoal default; Slate, Midnight, Forest and Plum change only --paper, keeping flat surfaces, semantic rating colours and white PDF pixels. Dark alternatives are #15191e/#101827/#101c18/#1d1422; light alternatives are #edf0f3/#edf2fc/#edf5f0/#f5eef8. Labelled native radios share the existing preview, reset, opt-out and cross-tab behaviour. They do not override the saved profile accent or upload preferences.

The #profile page reuses profile.js committed name/picture and the existing Edit profile & colour modal. Unsaved modal drafts never appear on the page. Account switching uses the existing private UID boundary. Sharing and First Ten community badges are clearly unavailable, not fake controls or awarded previews. The user approved opt-in publishing of nickname/optional picture/bio only; email, study progress and drawings must stay private. The high-risk public-profile branch remains gated on privacy/operator details, eligibility and trusted backend decisions. The already-published privacy draft remains conspicuously a draft rather than an invented final legal notice.

## Screenshot-inspired Home dashboard

Latest user reference: Cognito dashboard screenshot codex-clipboard-75a95b1c-45f8-4dfa-a166-c4f173973bd3.png. Adapt structure rather than identity: a centred 1,100px content area, 248px welcome panel, Georgia greeting, inset progress panel, dashed course divider and bordered compact subject table. The retained app routes require a second compact navigation row. No Cognito branding, avatar, Upgrade button, sample name/year, XP or streak is copied.

Runtime --paper/--surface/--line dark defaults are #202124/#282a2e/#3c3f44, reflected above. Existing appearance, profile accent and semantic colours retain their canonical owners; alternate background choices remain unchanged. Home panel radius/density/font size use existing preferences. Nunito is the Home/navigation display family only. Original generated transparent science PNGs and attributed Font Awesome icons are local assets; see assets/dashboard/ASSETS.md.

home.js derives bounded 3–4 subject rows from the selected course/tier, consumes committed RevisionStore profile and ratings, and owns no new data store. Questions reviewed counts rated quiz-capable cards, not quiz attempts. Flashcard coverage counts any explicit rating; Marked Know is Know/reviewed, not exam performance or mastery. Account loading is indeterminate and never displays another account's metrics. The shared cloud status remains the authoritative save/retry/conflict UI. Native course/tier filters use deskCourse/deskTier URL parameters without changing paper filters. Topics expands a native button-controlled table row; deck links call the validated existing app.js deck/tier owner. At 680px the same table records stack with visible metric labels, all actions retained. Document scrolling remains natural on all routes.

## Topic video directory

The next Cognito reference extends Home with a video section beneath the subject table, not a new route or a cloned course platform. A bordered 150px subject banner reuses the original science art and Georgia heading. Native topic disclosures contain a three-column lesson list (two below 900px, one below 680px). Existing charcoal/light tokens, panel corners, Nunito UI type, focus styles and document scrolling remain canonical; no new global tokens or illustration assets are added. The provider action uses the existing quiet-button variant with the established foreground colour, including visited links.

The four-subject native selector is independent of the saved-card course filter because external Maths resources have no Maths flashcard deck. These are curated Cognito science and 1st Class Maths Edexcel links, not enrolments, watched lessons or a complete specification course. Named Higher-only lessons and fuller-course destinations identify their scope. No fake lesson progress, resume button, paid tier, external thumbnails or tracking player is rendered. See VIDEO-SOURCES.md and UX-CONTRACT.md.
