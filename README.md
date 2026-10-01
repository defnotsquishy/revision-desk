# Revision Desk

A matte-black GCSE flashcard website with 326 cards, topic filters and a daily progress scatter graph.

English Literature: Macbeth, A Christmas Carol and An Inspector Calls. Edexcel History: Cold War, Medicine Through Time, and B3 Henry VIII and his ministers (1509–40). AQA Geography Paper 1: Natural Hazards, The Living World and UK Physical Landscapes. See SOURCES.md for course-option notes.

## Use

Sign in opens the Firebase account form: email/password signup, sign-in, password reset and verification. New passwords require at least 8 characters; choose a fresh unique password privately. Sessions last for the browser session. Guest revision is still available. This is stage 1: ratings and graph history are device-only, not account-specific or cloud-synced yet. Signing out does not remove device ratings. Do not assume different accounts on a shared browser have separate progress profiles until the cloud migration stage.

Multiple choice is the default: 270 authored four-option questions (30 per deck). Options shuffle, and choosing one reveals feedback and an explanation. English answers include the quotation, meaning, writer's technique and essay use. Rate Learn, Unsure or Know afterwards to save confidence and advance; Next question skips rating. Flashcards contains 326 cards, at least 30 per deck. The mode selector shows quiz coverage; topic filters follow the selected mode. Existing ratings and graph history are preserved.

Select a deck, reveal a card, then rate it Learn, Unsure or Know. Keyboard: arrows move; 1/2/3 rate; Enter or Space reveals a focused card. Open Progress over time to see daily Know percentages (not predicted exam marks).

Ratings, graph history and theme are stored in this browser on this device. They are not sent to a database and do not sync between devices or with the desktop version. Clearing website data removes saved progress. The initial graph is empty until a card is rated.

## Hosting

Plain static HTML, CSS and JavaScript; no build, server runtime or secret keys. GitHub Pages publishes the main branch's root directory. Keep all files together and retain relative asset URLs so project-path hosting works.
