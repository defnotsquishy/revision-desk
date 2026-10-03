# FRACTURE — browser game source

FRACTURE lives in the separate Games workspace. This release is **single-player training beta 0.1**, not online multiplayer. Revision accounts, progress, badges and drawings are unchanged. Original procedural arena, VECTOR character, animations, effects and synthesised sounds; no assets or code from another game.

## Players

Open the website's Games area, choose FRACTURE, then Play training. A modern desktop browser with WebGL 2, keyboard and mouse is required. No installation or development commands are needed. Browser/school restrictions are not bypassed.

## Development

Use Node.js 22.18+ or 24+ and npm. From this folder:

```sh
npm ci
npm run dev
```

Open `http://127.0.0.1:4180/games/fracture/`. The engine loads when Play is pressed. This command was tested on Windows with Node 24.19.0. In the working workspace this folder is `games/`; in the published repository it is `game-source/`. Vite resolves either layout.

```sh
npm run typecheck
npm run lint
npm test
npm run build
```

The build writes `games/fracture/assets/runtime.js` and its engine chunks into the public website, using `../site/` when present or the parent directory in the published checkout. Keep the whole public `games/` directory, including dependency notices, when deploying. Ordinary revision/library/menu visits do not import the engine.

## Structure

`fracture/core` owns the runtime and typed contracts; `combat`, `characters` and `abilities` own pure timed combat and balance; `player`, `physics`, `camera`, `maps`, `effects` and `audio` own rendering adapters; `ui` owns motion policy. Tests cover combat gates, hitboxes, cooldowns, awakening, resets, physics, camera obstruction and ragdoll resource release.

Only development builds expose Spawn dummy, Reset/Heal, Fill awakening, hitbox/collision/physics views and Reload character. These are absent from the production engine.

## Remaining work

Public matchmaking, authoritative remote server, private room codes, multiple original characters, bloom and motion blur are not implemented. Online actions and unsupported graphics controls stay disabled and explain why. Training dummies are passive; incoming damage/blocking rules are tested in the simulation, not demonstrated against an AI opponent. Full Chrome/Edge/Firefox hardware coverage and heap profiling remain to be done.

Game graphics/audio/pins/recents are device-only, never a cloud account or game-progress backup. Shared appearance uses the website theme owner; a validated colour can be carried in navigation without account data. Privacy/operator decisions remain subject to the website's draft notice.

## Source and licences

The original project code has no general reuse licence yet. Public source is not a grant of redistribution rights. Three.js is MIT licensed and Rapier is Apache-2.0 licensed; their unchanged notices accompany the public game under `games/fracture/notices/`. See the website's Source & licences page for the remaining dependencies.
