---
version: alpha
name: Revision Desk
description: A matte-black, compact GCSE study desk with quiet daily progress plotting.
colors:
  ink: '#f2f2f3'
  muted: '#ababaf'
  paper: '#0c0c0d'
  surface: '#19191b'
  line: '#38383c'
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
Product tool for a GCSE student practising recall on Windows. User-requested matte black replaces the earlier blue-purple dark palette. A compact library and serif flashcard are the signature; avoid dashboard decoration, gradients in dark mode, and spinning cards.

## Colors
Runtime CSS is canonical (Model B): colors.* map directly to same-name --* properties in styles.css under :root[data-theme="dark"]. The app owner maintains both together. White denotes primary actions; semantic green, amber and red distinguish named ratings. Light theme retains the existing palette and hierarchy.

## Typography
System sans for controls and explanations, Georgia for recall prompts and quotations, monospace for chart axes. English (UK) is the current locale. No network fonts or runtime dependencies.

The optional account layer loads the pinned Firebase SDK online; guest revision remains independent and works offline.

## Layout
244px library; workspace max 980px. Below 780px the library becomes a horizontal rail and the page uses one document scroll owner. Controls remain at least 44px. Collapsed Progress over time keeps card practice compact. No fixed content height; long answers grow naturally. Graph values have a bounded secondary scroller.

## Elevation & Depth
Flat dark surfaces with borders. Dark --shadow is none. Modal backdrop isolates reset; no decorative glow.

## Shapes
Panels use 0.75rem, cards 0.9rem, controls follow established rounded shapes. Status chips remain pills.

## Components

profile.js owns the local profile draft, image decoding/re-encoding, save/discard confirmation, per-UID scope and practice badges. library.js owns the searchable, paginated Paper 1 / school-files dialog. Both reuse native dialogs, selects, inline statuses and the established semantic palette. Header actions wrap without clipping; library filter columns collapse on narrow screens. UX-CONTRACT.md records their canonical owners and error/privacy behaviour.

science-cards.js and expanded-cards.js supply 1,560 course-specific cards across 13 topics each for Combined and Triple. Higher-only and Triple-only content is labelled; Foundation excludes Higher-only cards. science-quizzes.js provides a smaller quick-recall subset, while written calculations/practical explanations remain in Flashcards. Each complete deck has 60 cards; Foundation counts can be smaller. sociology-cards.js supplies six 60-card AQA 8192 decks with a smaller authored quiz subset. Existing controls and matte-black tokens are reused, with no new navigation or interaction pattern. papers-data.js records matched official public PDFs; resources-data.js records 18 unchanged user-supplied files. No school login examples are published.
index.html owns shared markup; app.js owns deck, filter, ratings and reset behavior. history.js owns local daily snapshots and SVG chart rendering. styles.css owns all themes, scrollbars and control states. Native selects deliberately retain OS-owned option geometry and keyboard support. Native HTML dialog owns focus trapping and Escape; app controls naming, contents, initial cancel focus and confirmation. No browser confirm prompts.

auth.js owns a single account form/dialog for sign-in, signup, password reset and verification. Reuse the existing button and native-dialog primitives, palette, borders and focus styles; no rebrand. Fields use explicit labels, app-owned inline errors and first-error focus. Submission is locked while pending; session persistence is browser-session only. Passwords are masked with a reveal control and cleared after submission/close, never logged or manually stored. The dialog clearly labels progress as device-only until cloud migration is implemented; account sign-out does not delete guest ratings. Study shortcuts are suppressed while any modal is open.

Scatter dots are actual daily snapshots, percentage Know of the entire deck at recording time. Date axis uses actual date spacing; a single day is centred. No fabricated history or exam-score claims. Text values accompany the graph. Prior-day history remains after reset, today's entry updates. Ratings keep their existing storage key. No cloud sync; storage errors are visible. Theme is saved separately. UI has a 100ms opacity reveal and respects reduced motion.

## Do's and Don'ts
- Multiple choice is the default, retaining 270 authored questions in the original nine decks plus smaller science and sociology subsets. Flashcards contains 2,460 cards, 60 in each complete deck. quiz-data.js and quiz-more.js map authored options to stable card IDs; deeper-content.js and expanded-cards.js add English close-reading notes. English reveals separate quotation, meaning, technique and essay use with quiet labels. Choices shuffle on each question visit. One answer locks the question and shows correctness in text plus the explanation; confidence ratings remain explicit and share the existing progress store. Switching mode resets topic and position but preserves search/status. Quiz counts clearly distinguish the subset from the complete deck. Existing palette, serif prompts and control focus styles are reused; no new design tokens.
- Keep ratings text-labelled; never rely on colour alone.
- Keep app and graph usable without a network or chart library.
- Preserve stable card IDs and existing user ratings.
- Do not imply reviewed percentage means mastery.
- Do not backfill historical dates for old undated ratings.
