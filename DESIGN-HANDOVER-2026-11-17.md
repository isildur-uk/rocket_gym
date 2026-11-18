# Rocket Gym: design handover for 17 November 2026

This covers one evening of design work on the Rocket Gym site. Read it to pick the design work up where it stopped.

## Where the site is now

The site is one page in `site/`. It is finished to a standard you can show the gym. It is not live. It is saved in a local Git repository with four commits and has never been pushed.

To view it: run `python -m http.server 8765` inside `site/`, then open `http://127.0.0.1:8765`.

Other files that matter:

| File | What it holds |
|---|---|
| `DESIGN.md` | The design rules. Colours, font, motion limits, the list of template tells to keep out, and the decision log. Read this before changing anything visual. |
| `HANDOVER.md` | Launch steps, facts the gym must confirm, and how to remake the hero animation. |
| `design-audit-2026-11-17.md` | The full audit, every research source with its link, and the checks run. |
| `tools/hero-cutout.py` | The script that makes the hero animation. |
| `_unused-site-assets/` | Images and clips the site no longer uses. Kept, not deleted. |

## What the page looks like, top to bottom

1. **Header.** Logo, five links, orange "Free 7-day trial" button. It stays at the top as you scroll. Below 900 pixels wide the links fold into a Menu button.
2. **Hero.** Headline on the left: "Train your way. Feel at home at Rocket." with "at home" in orange. On the right, an animation made from the gym's own kick-drill clip. The two fighters are drawn in orange on near-black, and the Rocket logo sits faintly on the wall behind them. It has a Pause button. On phones the animation sits above the headline.
3. **Four facts.** 7 days free, no contract, free parking, from £22 a month.
4. **Disciplines ticker.** Outlined words that slide sideways as you scroll.
5. **What we teach.** Three plain rows: martial arts, kids' classes, personal training.
6. **New here.** Off-white section with a group photo and four ticked points.
7. **Timetable.** Monday to Friday and Weekend on one row. Filter buttons for All, Adults and Kids. Each class name opens a short description when you hover, tab to it or tap it.
8. **Prices.** Four prices in a row. The all-classes price is marked in orange.
9. **Inside the gym.** A photo carousel that glides on an endless loop, with arrows and a Pause button. Two short clips below it that play when pressed.
10. **Your coaches.** Gary, Joe and Amanda, then one sentence of proof.
11. **Try a week free.** A four-field form that opens WhatsApp or email with the message filled in.
12. **Questions.** Five questions that open and close.
13. **Find us.** Address, map link, hours, phone, email.
14. **Footer.** On phones a bar with Call, WhatsApp and Free trial stays at the bottom of the screen.

## What changed tonight, in order

**Round 1: full audit and rebuild.** The old page had the headline running over the boxer's face, the same layout in every section, a "concept" bar across the top, and a form that sent nothing. All of that was rebuilt. The font moved from Google's servers into the site. A photo with a child in the background was removed. An independent reviewer then checked the code and found seven defects, all fixed.

**Round 2: Ben's first review.** The hero became the kick animation. The timetable went onto one row and gained class descriptions. The footnote under the timetable and the helper line under the form were removed. Ben called the "Next class: Kickboxing, tomorrow 17:30" line an AI-slop tell, so that line and everything like it came out. The list is in `DESIGN.md` under "Template tells to keep out".

**Round 3: logo and carousel.** The Rocket logo was built into the hero animation behind the fighters. The gallery became a carousel.

**Round 4: Ben's correction.** Ben wanted the carousel to move by itself and loop round. It now does.

## Design decisions to keep

1. **One orange, near-black, warm off-white.** No second accent colour, no shadows, no gradients, corners at 4 pixels.
2. **Archivo is the only font.** Wide and heavy for headings, normal for text.
3. **Headings name the section.** "Timetable", "Prices", "Your coaches". No slogans and no small orange labels above them.
4. **Motion is limited to a short list** in `DESIGN.md`. Everything that moves by itself has a Pause button. Everything stops for visitors who ask their device for less motion.
5. **Real Rocket photos and footage only, adults only.** No stock images.
6. **No "concept" labels on the page.** Unconfirmed facts are tracked in `HANDOVER.md`.

## How the hero animation is made

The source is `Web Assets/Instagram/rocketgymbristol/2026-09-09_07-46-32_UTC.mp4`, seconds 5.2 to 9.6. A person-detection model cuts the two fighters out of each frame. They are coloured in the brand orange and placed on near-black, with the logo on the wall behind them. The result is slowed to two-thirds speed and fades at the loop join.

The three commands to remake it are in `HANDOVER.md` under "Hero animation". To change the logo, edit the three numbers at the end of the second command: strength, width and distance from the top. A re-render takes about two minutes.

Plain colour grading was tried first and rejected. It came out dark and muddy.

## Known weak points

1. **The hero is soft on large screens.** The source is 720p phone footage, enlarged about 1.2 times on a desktop. The stylised look hides most of it. A sharper source clip would fix it properly.
2. **The fighters fade out and back in once per loop.** The clip has no matching start and end pose, so a fade was cleaner than a jump.
3. **The same young man is in the hero, the carousel and the trial photo.** The archive has little else. A photo shoot is the real fix.
4. **The class descriptions are invented.** All nine. The gym must rewrite or approve them.
5. **The disciplines ticker is the most template-like thing left.** Ben has seen it and not objected. It is the first thing to cut if the page needs to feel plainer.
6. **The logo is a crop from a timetable graphic.** It has a slight dark fringe. A clean file from the gym is still needed.

## Checks run tonight

46 scripted browser checks pass in a local Chromium preview at phone, tablet and desktop sizes. They cover the menu, timetable filter and descriptions, the form, both Pause buttons, the carousel loop, keyboard use, reduced motion, running with scripts off, and print. Colour contrast was computed for 13 pairs and all pass.

First-screen download is about 410 KB on a phone and 455 KB on desktop. The site makes no requests to any other company's servers.

Not checked: real phones, Safari, Firefox, a Lighthouse score, a screen reader, and whether WhatsApp and email open correctly on a real device.

## What to do next

1. Show the gym the preview and get the six facts and nine class descriptions confirmed. Both lists are in `HANDOVER.md`.
2. Ask the gym for a clean logo file and per-photo permission.
3. Test on a real iPhone and a real Android phone.
4. Create the GitHub repository, connect it to Cloudflare Pages and push. The commands are in `HANDOVER.md`.
5. Once the web address is known, add the share-card image and canonical link, and remove the `noindex` line.
