# Canyon Run — original standalone import

This is the user's existing **Canyon Run — Dusk Circuit** game, imported without rebuilding or changing its HTML, controls, graphics or gameplay.

- Original artifact: `outputs/Canyon Run.html` in the `2026-09-05/build-a-polished-playable-3d-browser` workspace.
- Imported artifact: `index.html`, 752,747 bytes.
- SHA-256: `32223a0f060507fc2b6c823a27663b0a918f35e621c187676462062f663f5832`.
- Separate page: `/canyon-run/`; this does not restore a Games section.
- All game assets are bundled or generated locally. No external asset service or API key is required.
- The only game-specific storage is the numeric best-lap value in `canyon-run-best-v1`. It stays in this browser, is not account-specific and does not sync to Firebase.
- Optional WebMCP tools expose the current driving session and recovery to the track, not Revision Desk account or study data.

The bundle contains React and React DOM 19.2.6, Three.js 0.180.0 and Lucide React 1.31.0. Original inline licence notices are unchanged; complete dependency notices are retained in `licenses/`. React and Three.js use MIT; Lucide uses ISC and retains its Feather-derived MIT notice.

These dependency licences do not grant a new general licence for the game's original application code or for Revision Desk. No new application-code licence has been assigned by this import.
