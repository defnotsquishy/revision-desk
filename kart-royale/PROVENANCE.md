# Kart Royale dependency licence provenance

Collected on 2026-10-07 using read-only inspection of the supplied export and primary upstream sources. No game JavaScript or WebAssembly was executed and no dependencies were installed.

Input archive: user-supplied `kart-royale-web.zip`  
SHA-256: `bdb4291da75731b91cd5fc40b73b6ac6682af49ce4285d752b87339db3d9e076`

## Licence files

The four files below are byte-for-byte copies of their upstream UTF-8 text files, including copyright notices and trailing newlines. Their local SHA-256 hashes were checked against the retrieved upstream bytes.

| Local file | Immutable primary source | SHA-256 |
| --- | --- | --- |
| `three-LICENSE.txt` | [Three.js r186 licence](https://raw.githubusercontent.com/mrdoob/three.js/9b4a2ac29c63ccb43fd51c5661f2f873ac2c39b8/LICENSE) | `8b378ebe60e2fe500158cb0ac71cb5e8b7d92953c2abcc63a0eb90499653b5bc` |
| `draco-LICENSE.txt` | [Draco 1.5.6 licence](https://raw.githubusercontent.com/google/draco/9f856abaafb4b39f1f013763ff061522e0261c6f/LICENSE) | `d3709b0fb4b8a94bbb1d02b8a2e484f258b0d9c5c5a01f940391f3fe662cd1a4` |
| `Fredoka-OFL.txt` | [Google Fonts Fredoka licence](https://raw.githubusercontent.com/google/fonts/5e8a3ba899557829a76cfdac30fa512bda91d7ca/ofl/fredoka/OFL.txt) | `5c9e7eee5c6b25f4b05b8d53b2e470ea4962f9ced742d044a98f7d95d1375bab` |
| `LilitaOne-OFL.txt` | [Google Fonts Lilita One licence](https://raw.githubusercontent.com/google/fonts/5e8a3ba899557829a76cfdac30fa512bda91d7ca/ofl/lilitaone/OFL.txt) | `255d5debbb80eb2ea762644311f266a279e8778f00156655a516e2b7781a63e1` |

The complete upstream Draco licence file includes additional licence sections for `docs/assets/js/ASCIIMathML.js` and `docs/assets/css/pygments/*`. Those documentation files were not observed in the export; the upstream text is retained in full rather than edited. The Draco 1.5.6 repository root has a `LICENSE` file and no separate root `NOTICE` file. The Draco copyright attribution comes from the [1.5.6 source header](https://raw.githubusercontent.com/google/draco/9f856abaafb4b39f1f013763ff061522e0261c6f/src/draco/core/draco_types.h).

## Three.js evidence

`assets/KartVisual-BWAionSr.js` contains the revision marker `revision:` followed by the literal `186`, and assigns the same literal to `window.__THREE__`. This identifies Three.js revision 186 in the bundle. The upstream annotated `r186` tag resolves to commit `9b4a2ac29c63ccb43fd51c5661f2f873ac2c39b8`.

This is a version-marker match, not a byte comparison of the minified Three.js portion: the export contains application and dependency code in the same bundle.

## Draco evidence

Every Draco JavaScript and WebAssembly entry in the export matches the corresponding upstream binary exactly by SHA-256. Two copies of each glTF wrapper/WASM file are present under different export paths.

| Export path(s) | Google-hosted Draco 1.5.6 file | SHA-256 |
| --- | --- | --- |
| `assets/draco_decoder-fzg4nYZr.js` | [draco_decoder.js](https://www.gstatic.com/draco/versioned/decoders/1.5.6/draco_decoder.js) | `30e4d486fa020737af10e3c56197693e5b904bdc05b8bfa5d7b06751dec6da04` |
| `assets/draco_decoder-C32yEggz.wasm` | [draco_decoder.wasm](https://www.gstatic.com/draco/versioned/decoders/1.5.6/draco_decoder.wasm) | `c55a594e8ffd18426d36b27fea9618af3df5e173640a3e56d46f09d76f0574f2` |
| `assets/draco_wasm_wrapper-DxJM36Ib.js` | [draco_wasm_wrapper.js](https://www.gstatic.com/draco/versioned/decoders/1.5.6/draco_wasm_wrapper.js) | `e8049906ef3f8f75d3456c22a3f31bfdfe5b5b5bd09ccdec613b9e9a49d554d8` |
| `draco/draco_decoder.js` | [draco_decoder_gltf.js](https://www.gstatic.com/draco/versioned/decoders/1.5.6/draco_decoder_gltf.js) | `8625489da79a805f4f2a7d511c3e52d8b4085608a9d2a4d5f4f9de5db0aea04f` |
| `assets/draco_decoder-Z1_iN-Ht.wasm`, `draco/draco_decoder.wasm` | [draco_decoder_gltf.wasm](https://www.gstatic.com/draco/versioned/decoders/1.5.6/draco_decoder_gltf.wasm) | `a680d927bed9cb864ddbd63521868891af2bfbe755092761b4837487618df8ac` |
| `assets/draco_wasm_wrapper-fZCQGLGb.js`, `draco/draco_wasm_wrapper.js` | [draco_wasm_wrapper_gltf.js](https://www.gstatic.com/draco/versioned/decoders/1.5.6/draco_wasm_wrapper_gltf.js) | `8bb2952d2ba7d67e1414f8df819410cb0434a666be53f671fff75f68843d76f6` |

The same six files also match the upstream Three.js r186 vendored copies under [`examples/jsm/libs/draco/`](https://github.com/mrdoob/three.js/tree/9b4a2ac29c63ccb43fd51c5661f2f873ac2c39b8/examples/jsm/libs/draco), using the `gltf/` subdirectory for the glTF variants. The [vendored README](https://raw.githubusercontent.com/mrdoob/three.js/9b4a2ac29c63ccb43fd51c5661f2f873ac2c39b8/examples/jsm/libs/draco/README.md) identifies Google Draco and Apache License 2.0. Google documents its versioned hosting in the [Draco README](https://github.com/google/draco/blob/9f856abaafb4b39f1f013763ff061522e0261c6f/README.md).

## Font evidence and coverage

The export contains 24 Fredoka font files: WOFF and WOFF2 pairs for normal weights 400, 500, 600 and 700 in Hebrew, Latin and Latin Extended subsets. It contains four Lilita One files: WOFF and WOFF2 pairs for normal weight 400 in Latin and Latin Extended subsets. `assets/index-BwqaLKo6.css` explicitly associates each WOFF2 file with its WOFF counterpart using matching `@font-face` declarations and the relevant family name.

All 12 Fredoka WOFF files were decompressed as font data and their OpenType `name` tables read. They report version `2.001`, the Fredoka family (including Medium and SemiBold variants), copyright `Copyright 2016 The Fredoka Project Authors (https://github.com/hafontia/Fredoka-One)`, and licence URL `http://scripts.sil.org/OFL`. Their copyright matches the supplied Google Fonts licence exactly.

Both Lilita One WOFF files report version `1.002`, family `Lilita One`, copyright `Copyright (c) 2011 Juan Montoreano (juan@remolacha.biz), with Reserved Font Names "Lilita One"`, and licence URL `http://scripts.sil.org/OFL`. The supplied Google Fonts OFL file uses the same author/year but states `with Reserved Font Name Lilita`. Both the exact upstream OFL text and the bundled copyright/reserved-name notice are retained. No font was renamed or modified.

The Google Fonts licence texts were fetched at repository commit `5e8a3ba899557829a76cfdac30fa512bda91d7ca`, the current upstream snapshot at collection time. The exact package/build source and package version that produced these subset webfonts are not included in the export. WOFF2 name tables were not independently decoded; their family mapping is supported by the export's CSS declarations. The evidence supports the family-specific OFL notices, not an assertion that the webfont binaries are byte-identical to Google Fonts' current TTF files.

## Scope and original disclaimer

This is an inventory and notice collection for the four identified dependency families. It is not an exhaustive source-code dependency audit and does not establish a licence for the game's application code, models, portraits, icons, music, artwork, character names, likenesses, or trademarks.

The export contains no project-wide open-source licence. Its `README.txt` describes it as `KART ROYALE - unofficial fan experiment` and states `Not affiliated with or endorsed by Nintendo or LeBron James.` These notices retain that disclaimer without treating it as a grant of rights.
