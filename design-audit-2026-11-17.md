# Rocket Gym: design audit and upgrade (17 November 2026)

Record of what was found, what changed, and the sources behind the decisions. The site lives in `site/`. Design rules are in `DESIGN.md`. Launch items are in `HANDOVER.md`.

## 1. What was wrong

| Area | Finding |
|---|---|
| Hero | Headline ran across the boxer's face and glove on desktop. On phones the text sat on top of the photo, so neither read well. Nothing moved. |
| Rhythm | Every section used the same pattern (small label, capital heading, three hairline columns). The page felt like a template. |
| Trust | An orange "concept" bar, asterisks and a footer note told visitors the page was not real. The trial form said it sent nothing. |
| Photos | One gallery photo showed a child in the background, against the adults-only rule. Images shipped in one large size for every screen. |
| Phone use | No quick way to call or message once you scrolled past the hero. Menu could not be closed with Escape. |
| Tablet | Header links and the trial button wrapped onto two lines between about 760 and 900 pixels wide. |
| Accessibility | No skip link. Outlines of chips, inputs and outline buttons were too faint (about 1.9:1 to 2.6:1; 3:1 is the minimum). Form errors were one shared message, not tied to a field. The arrow character was missing from the font. |
| Speed and privacy | Font loaded from Google's servers (a third-party request, and a known privacy complaint). Hero image was 306 KB for every device. |
| Search and sharing | No share-card tags. Business data used a broad type and a loose hours format. |
| Content | No answer to "is this The Way Gym?", "is there a contract?" or "can I just use the gym?", which the plan lists as must-haves. |

## 2. What changed

1. **Hero rebuilt.** Text and photo now sit side by side on desktop and stack on phones, so the photo is never covered. The headline sizes itself to its column, "at home" carries the orange, lines rise in on load, and a short silent loop of the gym's own Friday pad session plays in the corner on desktop with a Pause button. A "Next class" line under the buttons is worked out from the timetable.
2. **Motion, taken from the Isildur library and rebuilt in plain code.** Disciplines ticker (it moves as you scroll, not by itself), blocks that fade and rise as you scroll, and a photo strip that drifts sideways on desktop (swipeable on phones). All of it stops for anyone who has asked their device for less motion.
3. **Sections given their own shape.** Classes are numbered rows. The timetable marks today. The main price has an orange rule. Coaches and proof are larger. A new "Before your first session" block answers five questions using confirmed facts only.
4. **Trial form works.** It checks each field, then opens WhatsApp or the email app with the message filled in. Nothing is stored by the site.
5. **Phone action bar.** Call, WhatsApp and Free trial stay at the bottom of the screen after the hero, and step aside at the form and footer.
6. **Concept labels removed.** The page reads as a finished site. It still tells search engines not to list it.
7. **Photos.** Child-in-background photo replaced. Three unused, higher-quality shots added (ring sparring, pad work, a member laughing). Every photo now has two to four sizes.
8. **Accessibility.** Skip link, visible focus on dark and light sections, stronger control outlines, per-field error messages, announced filter results, Escape closes the menu, tap targets 44 px or more on the main actions.
9. **Speed and privacy.** Font is hosted with the site. No third-party requests at all. The hero photo a phone downloads fell from 306 KB to between about 100 and 190 KB, depending on how sharp its screen is. Measured first-screen download in the local preview: about 420 KB on a phone and about 510 KB on desktop (which includes the 161 KB hero loop). The old page was about 390 KB plus the Google font files, so total weight is similar while carrying more content and no third-party requests.
10. **Search and sharing.** Share-card tags, a 1200 by 630 share image (`site/assets/og-image.jpg`), and fuller business data (gym type, address, hours, price range, social links).

Files: `site/index.html`, `site/styles.css`, `site/app.js` rewritten. New: `site/assets/img/` (21 sized photos), `site/assets/fonts/archivo-var-latin.woff2`, `site/assets/hero-loop.mp4` and its still, `site/assets/og-image.jpg`. Seven superseded images moved to `_unused-site-assets/` (not deleted).

### Second round, same day (Ben's review of the preview)

1. **Hero replaced with a stylised animation.** Made from the gym's kick-drill clip: the two fighters are cut out with a person-detection model, drawn in brand orange on the page's near-black, slowed down and looped. It plays on phones and desktop with a Pause button; a still shows first and is all that reduced-motion or data-saver visitors get. Plain colour grading was tried first and rejected as dark and muddy.
2. **Timetable on one row** on desktop (three columns on tablets, a list on phones). Each class name opens a short description on hover, focus or tap, and Escape closes it. The descriptions are placeholders.
3. **Template tells removed** after Ben flagged the "Next class" line: that line and the "Today" badge, the small orange labels above every heading, the 01/02/03 numbering, slogan-style headings, the three-big-numbers row, the timetable footnote, the form helper line and an invented photo caption. The list of what to keep out is now in `DESIGN.md`.
4. First-screen download after this round: about 400 KB on a phone, 450 KB on desktop. 37 scripted checks pass.

## 3. Resources used from the Isildur folder

Source: `Isildur/design/gfx/motionsites/` (20 hero concepts) and `Isildur/docs/hero-redesign-brief.md`. Techniques only; no code, fonts or footage copied.

| Technique | Isildur source | Where it is on Rocket |
|---|---|---|
| Word-by-word headline reveal | `wellness_balance_code.md` | Hero headline (by line, no blur) |
| Scrolling ticker | `network_code.md` | Disciplines band under the facts |
| Photo row that moves with scroll | `3d_portfolio_code.md` | "Inside Rocket" strip |
| Staggered fade-in, easing curve | `health_portal_code.md`, `3d_portfolio_code.md` | All sections |
| Oversized uppercase display type | `cargohero_code.md` | Headline, class titles, ticker |
| Video-hero rules (muted, still fallback, defer, reduced motion) | `docs/hero-redesign-brief.md` | Hero loop |
| Photo-first, one-accent restraint | `awesome-design-md/design-md/nike`, `bmw-m` | Overall direction |

Not used: Alliance and Aniron fonts (no commercial web licence), the Argonath and street footage (not Rocket's), the grain overlay (decoration).

## 4. Research sources (all accessed 17 November 2026)

| Source | Decision it informed |
|---|---|
| web.dev, Web Vitals: https://web.dev/articles/vitals | Targets: main image under 2.5 s, layout shift under 0.1 |
| web.dev, Optimize LCP: https://web.dev/articles/optimize-lcp | Hero photo marked high priority and never lazy-loaded |
| web.dev, Preload responsive images: https://web.dev/articles/preload-responsive-images | Hero preload tag carries the same size list as the image |
| web.dev, Optimize CLS: https://web.dev/articles/optimize-cls | Width and height on every image and video; fallback font metrics matched |
| web.dev, Font best practices: https://web.dev/articles/font-best-practices | Self-hosted WOFF2, one variable file, preloaded, font rules inline in the page head |
| web.dev, Image performance: https://web.dev/learn/performance/image-performance | Several sizes per photo with `srcset` and `sizes` |
| web.dev, Lazy-loading video: https://web.dev/articles/lazy-loading-video | Click-to-play clips load nothing until pressed; hero loop loads after the page |
| web.dev, Animations guide: https://web.dev/articles/animations-guide | Only position and opacity are animated |
| web.dev, Viewport units: https://web.dev/blog/viewport-units | Hero height uses the small-viewport unit so phone toolbars do not crop it |
| MDN, prefers-reduced-motion: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion | All motion off when the visitor asks for less |
| MDN, animation-timeline: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-timeline | Too new for older phones, so scroll effects use the widely supported observer instead |
| MDN, env(): https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/env | Phone action bar clears the home-indicator area |
| W3C, Contrast: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html and https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html | Text 4.5:1, control outlines 3:1; `--edge` and `--accent-deep` added |
| W3C, Focus Not Obscured: https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html | Scroll padding for the sticky header and phone bar |
| W3C, Target Size: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html | Nothing under 24 px; main actions 44 px or more |
| W3C, Bypass Blocks: https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html | Skip link |
| W3C, Reflow: https://www.w3.org/WAI/WCAG22/Understanding/reflow.html | Checked at 320 px wide |
| W3C, Animation from Interactions: https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html | Scroll motion can be switched off |
| W3C, Pause, Stop, Hide: https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html | Anything that moves by itself for over 5 seconds needs a pause: the hero loop has a Pause button, and the ticker moves only when the visitor scrolls |
| W3C, Video-only: https://www.w3.org/WAI/WCAG22/Understanding/audio-only-and-video-only-prerecorded.html | Hero loop is silent and has a text description |
| W3C WAI, Forms tutorial: https://www.w3.org/WAI/tutorials/forms/labels/ and https://www.w3.org/WAI/tutorials/forms/notifications/ | Visible labels; errors tied to their field; focus moves to the first error |
| GOV.UK Design System, Error message: https://design-system.service.gov.uk/components/error-message/ | Error wording ("Enter your name", no "please" or "invalid") |
| W3C APG, Button: https://www.w3.org/WAI/ARIA/apg/patterns/button/ | Filter chips keep a fixed label and a pressed state |
| W3C, ARIA22 status messages: https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA22 | Filter result is announced |
| W3C APG, Disclosure navigation: https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/ | Menu button, Escape closes and returns focus |
| Google, Local business data: https://developers.google.com/search/docs/appearance/structured-data/local-business | Address, hours, price range, phone |
| schema.org, ExerciseGym: https://schema.org/ExerciseGym | Most specific business type available (there is no martial-arts type) |
| Google, Review snippets: https://developers.google.com/search/docs/appearance/structured-data/review-snippet | No star-rating markup: a business cannot mark up reviews about itself |
| Open Graph protocol: https://ogp.me/ | Share-card tags; `og:url` and `og:image` wait for the real web address |
| Facebook, Sharing images: https://developers.facebook.com/docs/sharing/webmasters/images/ | Share image at 1200 by 630 |
| ICO, storage and access technologies: https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/what-are-the-pecr-rules/ | The site stores nothing on the device, so no cookie banner (our reading; the page does not say this in so many words) |
| Nielsen Norman Group, Contact pages: https://www.nngroup.com/articles/contact-us-pages/ | Phone and email shown as well as the form; address links to maps; form kept to four fields |
| Nielsen Norman Group, Show the price: https://www.nngroup.com/articles/show-price/ | Prices stay open and plain |
| Nielsen Norman Group, Sticky headers: https://www.nngroup.com/articles/sticky-headers/ | Header kept small and solid |

Not verified by opening the page: the WhatsApp link format (taken from a search summary of WhatsApp's help page; the link pattern is `https://wa.me/447961608259?text=...`). No primary source was found for "sticky phone action bars convert better"; that is a design judgement.

## 5. Checks run (local preview, Chromium, 17 November 2026)

- 39 scripted checks passed: menu open and Escape, timetable filter and announcement, today and next class, form errors and WhatsApp hand-off, question toggles, tap-target sizes, no sideways scroll at 320 px, hero loop plays and pauses on desktop and stays off on phones, skip link, photo strip shows every photo, reduced motion, scripts off, script blocked, print, and the headline at eight widths from 320 to 1920 px with normal and widened text spacing.
- A separate reviewer (not the builder) inspected the code and reproduced issues in a browser. It found seven defects worth fixing and five minor ones. All seven and the minor ones were fixed and re-tested: content that could stay invisible if the script failed or when printing; headline clipped at 320 px; photo strip never reaching its last photo; hidden phone bar still taking keyboard focus; "Next class" line breaking into columns; Pause button announcing a contradictory state; WhatsApp hand-off failing silently in in-app browsers (there is now a fallback and an "Open WhatsApp" link). It confirmed the timetable logic, London-time handling, layout from 320 to 2560 px, contrast and image sizes were correct.
- Screens reviewed by eye at 1440 by 900, 820 by 1180 and 390 by 844.
- Contrast computed for 13 colour pairs; lowest text pair 4.82:1.
- Zero third-party requests.

Not checked: real phones, Safari and Firefox, a Lighthouse score, screen-reader speech, and whether WhatsApp and email open correctly on a real device.
