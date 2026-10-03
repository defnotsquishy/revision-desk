# Dashboard assets

Science PNG illustrations were made with the built-in image-generation tool. Prompts: original small transparent educational subject illustration, readable at 40px; Physics purple rocket with yellow trail; Chemistry mint bubbling glass flask; Biology green leafy seedling in an ochre pot. No logos, text or copied Cognito artwork. The selected PNGs were mechanically downscaled to 128px with alpha preserved by work/prepare-dashboard-art.ps1.

Other subject icons use Font Awesome 6.x free solid icons (book-open, landmark, earth-americas, users), downloaded from the official FortAwesome/Font-Awesome repository on 3 October 2026. Geometry is unchanged; the generated data-URI manifest adds colour. Icons are CC BY 4.0; see Font-Awesome-LICENSE.txt. https://github.com/FortAwesome/Font-Awesome

Nunito was downloaded from the official google/fonts ofl/nunito directory on 3 October 2026. SIL Open Font License: Nunito-OFL.txt. The original variable TTF is used without glyph changes. https://github.com/google/fonts/tree/main/ofl/nunito

work/build-dashboard-assets.cjs reproducibly creates dashboard-art.js from these assets. Images are data URIs so the installed Windows server needs no new image routes.
