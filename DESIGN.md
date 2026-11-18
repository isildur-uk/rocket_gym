# DESIGN.md — Rocket Gym (concept site)

Binding contract for every visual artifact in this project. Preset: **C (brand/creative)** with an ops-clean timetable.

## Project tokens
| Token | Value | Use |
|---|---|---|
| `--ink` | `#121212` | Page base, header, footer |
| `--charcoal` | `#1C1C1C` | Raised sections |
| `--line` | `#2E2E2E` | Hairlines on dark |
| `--paper` | `#F4F1EC` | Warm off-white sections |
| `--text` | `#F4F1EC` on dark / `#161616` on paper | Body |
| `--muted` | `#A9A59E` on dark / `#5A564F` on paper | Secondary text |
| `--accent` | `#FF6A0D` | The only accent (Rocket orange) |
| `--accent-ink` | `#121212` | Text on orange (contrast 6.5:1) |
| `--accent-deep` | `#B8440A` | Orange for text and ticks on paper (4.8:1). Same hue, not a second accent |
| `--edge` | `#858585` | Outlines of buttons, chips and inputs on dark (4.6:1 or better; needs 3:1) |

- **Font:** Archivo (variable, width and weight) for everything, self-hosted at `site/assets/fonts/` (Open Font Licence). No Google Fonts request. Headings 800 at wide width, body 400/500. Tabular numerals on prices and times. Never Inter or system-ui as display.
- **Scale:** 14 / 16 / 20 / 28 / 44 / 72 px (fluid with `clamp`). **Grid:** 8px.
- **Radius:** 4px buttons and inputs, 0 on photos. No pill buttons.
- **Shadows:** none. Separation by hairlines and tone.
- **Motion (widened 17 Nov 2026, Ben's instruction to use the Isildur hero and animation techniques):** hover and focus stay at 150 to 200ms ease-out. Also allowed, and nothing else: (1) one headline line-reveal and photo settle on load, (2) fade-and-rise as blocks scroll into view, (3) the disciplines ticker, moved by scrolling and never by itself, (4) the photo strip drifting with scroll on desktop, (5) one short silent loop of real gym footage in the hero, with a visible Pause button, plus a quick fade on the timetable class descriptions. Only `transform` and `opacity` move. Everything is switched off under `prefers-reduced-motion`, the hero loop also on phones and data-saver, and all content is visible with scripts off.

## Voice
Warm, plain and direct. Beginners and parents first, fighters second. "Feel at home" over "fight night".

## Photography
Real Rocket photos and footage only. Every photo ships in two or more sizes (`site/assets/img/name-WIDTH.webp`) with `srcset`; the hero is never lazy-loaded. Adults only at concept stage. No stock, no flames, no neon, no children until consent exists.

## Non-negotiables
- One accent. No blue to purple gradients. No emoji as icons. No floating thin-border plus wide-shadow cards.
- Timetable and prices are real text, never images.
- Mobile first; 16px minimum side gutter; tap targets at least 44px.
- Contrast AA. Visible focus rings. Keyboard accessible.

## Pre-ship checklist
1. Works at 400px width with no horizontal scroll.
2. Every claim is traceable to a source in the plan. Items the gym still has to confirm are tracked in `HANDOVER.md`, not labelled on the page.
3. Would someone instantly say "AI made this"? If yes, rework.
4. Lighthouse mobile 90+; images sized and lazy-loaded below the fold.

## Template tells to keep out (Ben, 17 Nov 2026)
Ben flagged the "Next class: Kickboxing, tomorrow 17:30" line as an AI-slop tell and asked for a sweep. Do not reintroduce any of these:
- Small tracked-uppercase orange labels above headings.
- Computed gadget lines ("Next class…", "Today" badges, live counters).
- 01 / 02 / 03 numbering on lists that are not steps.
- Slogan headings built from two short sentences ("Pick a path. Change your mind later."). Section headings say what the section is: Timetable, Prices, Your coaches.
- Rows of big numbers with a caption under each.
- Fine print and helper notes under a section or form (dates checked, how a button works, invented photo captions).
- Rhythmic triples ("same family, same coaches, same building").

## Decision log
- 17 Nov 2026 (later): hero is now a stylised loop cut from the gym's own kick-drill clip. The two fighters are lifted off the background and drawn in the brand orange on the page's near-black, slowed to two-thirds speed. A still frame loads first; the loop fades in over it on phone and desktop and has a Pause button. Reduced-motion and data-saver visitors get the still only. How to remake it: `tools/hero-cutout.py` (needs Python with PyTorch, torchvision and OpenCV; steps in `HANDOVER.md`). This replaces the earlier sparring photo plus corner clip; that photo moved to the "Inside the gym" strip.
- 17 Nov 2026 (third round): the Rocket logo is built into the hero animation as a faint watermark on the wall behind the fighters, who pass in front of it (30% strength, top of frame). It is part of the video and the still, not a layer in the page.
- 17 Nov 2026 (fourth round, Ben's correction): the photo carousel glides by itself on an endless loop, about 28 pixels a second. It pauses on mouse-over, touch, keyboard focus and a visible Pause button, and the arrows step one photo. Reduced-motion visitors get a still row with working arrows. This replaces motion item (4), the strip drifting with scroll. An earlier same-day version that only moved when pressed was not what Ben meant.
- 17 Nov 2026 (later): timetable shows all days on one row on desktop. Each class name opens a short description on hover, keyboard focus or tap. The descriptions are placeholders written without the gym's input.
- 17 Nov 2026 (later): timetable footnote (date checked, Aikido club, Christmas closure) and the form's helper line removed at Ben's request.
- 17 Nov 2026: motion rule widened (see Motion). Techniques rebuilt in plain HTML/CSS/JS from the Isildur `design/gfx/motionsites` library (word reveal, ticker, scroll-drift photo row, staggered fade-in, video-hero rules). None of that library's fonts, footage or code was copied; Alliance and Aniron fonts there have no commercial web licence and are not used.
- 17 Nov 2026: on-page "concept" bar, asterisks and footer note removed so the page reads as a finished site. `noindex` stays until launch. Unconfirmed facts are listed in `HANDOVER.md`.
- 17 Nov 2026: trial form now opens WhatsApp or the visitor's email app with the message filled in (it sent nothing before). A hosted form with spam protection remains the launch option.
- 17 Nov 2026: gallery photo with a child in the background removed (adults-only rule). Hero crop tightened for the same reason.
