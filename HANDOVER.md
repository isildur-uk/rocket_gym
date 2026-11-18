# Rocket Gym: handover (updated 17 Nov 2026)

## Where things stand
The site had a full design audit and upgrade on 17 Nov 2026. It is checked on desktop, tablet and phone sizes in a local preview. It is not live and not in git yet.

- Site: `site/` (index.html, styles.css, app.js, assets/). To view it, run `python -m http.server 8765` inside `site/` and open `http://127.0.0.1:8765`. Opening index.html directly also works.
- Audit, changes, sources and checks: `design-audit-2026-11-17.md`.
- Plan and decisions: `rocket-gym-web-audit-and-rebuild-plan.md`.
- Design rules: `DESIGN.md` (orange #ff6a0d on near-black, Archivo font, no shadows; motion rule and decision log updated 17 Nov).
- Asset review record: `Asset Review/`. Source photos and all 122 videos: `Web Assets/`.
- `_unused-site-assets/`: seven images the site no longer uses. Safe to delete once you are happy.

## Decisions already made (don't re-ask)
Name Rocket Gym (with "formerly The Way Gym" note) · free no-commitment trial · hours 6am to 9pm · official prices (£22 / £27.50 / £49.50 / £35) · orange palette kept · team shown: Gary, Joe, Amanda · adults and coaches only in photos · contact: form + WhatsApp 07961 608259 + phone, email info@thewaygym.co.uk · waiver left out · Rocket logo (cropped from the timetable graphic).

Added 17 Nov: restrained motion allowed (see `DESIGN.md`) · no "concept" labels on the page · trial form opens WhatsApp or email with the message filled in · font hosted with the site.

## Facts on the page the gym must confirm before launch
These were marked with * on the old page. They now read as plain statements, so check each one.
1. "5.0 on Google, from 22 member reviews" (coaches section). Use the live Google figure.
2. Amanda's role text, and Gary's "judged ringside for national governing bodies".
3. Hours: 6am to 9pm, seven days, for members.
4. Gym access at £35 a month, limited places.
5. Email address info@thewaygym.co.uk (still the old brand).
6. Timetable (checked 13 Nov 2026 against the 5 Nov graphic) and the Aikido time.

7. **Class descriptions in the timetable are made up.** The nine short descriptions that appear when you hover or tap a class name were written as placeholders on 17 Nov 2026. The gym must rewrite or approve each one (for example whether sparring is optional, and the "no contact to the head" line for kids).
8. The timetable no longer mentions the Aikido club or the Christmas closure (removed 17 Nov at Ben's request). Add a closure notice nearer the time if wanted.

## Hero animation (added 17 Nov 2026)
The hero is a stylised loop made from the gym's kick-drill clip (`Web Assets/Instagram/rocketgymbristol/2026-09-09_07-46-32_UTC.mp4`, seconds 5.2 to 9.6). Files: `site/assets/hero-kick-640.mp4` (desktop, 214 KB), `hero-kick-400.mp4` (phones, 159 KB), `hero-kick-still.webp` (first frame shown, 9 KB).

To remake it from another clip:
1. Cut square frames: `ffmpeg -ss 5.2 -t 4.4 -i <clip>.mp4 -vf "crop=640:640:40:420" in/f%04d.png`
2. Cut out the people, colour them and put the logo on the wall behind them: `python tools/hero-cutout.py in out site/assets/logo-rocket.png 0.30 540 96` (the last three numbers are logo strength, width and distance from the top in pixels; leave the logo arguments off for no watermark; downloads a 233 MB person-detection model the first time; uses the graphics card if there is one).
3. Encode: `ffmpeg -framerate 20 -i out/o%04d.png -vf "noise=alls=5:allf=t,format=yuv420p" -c:v libx264 -crf 28 -preset veryslow -movflags +faststart hero-kick-640.mp4` (add `scale=400:400,` at the start of the filter for the phone file).

The same young man is the kicker in this clip, and the pad holder is the coach; both need the same photo permission as the stills.

## Open items needing the gym
1. Clean Rocket logo file (vector or transparent PNG).
2. Health waiver / arrive-early rule, and accessibility info.
3. Photo permissions per photo before launch. The same young man appears in the hero, the strip and the trial photo.
4. Rocket-branded email on the domain move.
5. Fresh photo shoot: everyday classes, women and mixed groups.

## Before a real launch
1. Remove the `noindex` line in `site/index.html`.
2. Once the web address is known, add `og:url`, `og:image` (the file is ready at `site/assets/og-image.jpg`) and a canonical link, all as full addresses.
3. Decide whether to keep the WhatsApp/email form or move to a hosted form with spam protection.
4. Test on real phones (iPhone Safari and Android Chrome), and run a speed check on the live address.

## To take it live (Ben runs it)
`site/` is now a local git repository on branch `main` with a first commit (17 Nov 2026). It has no remote, so nothing has left this machine. A `_headers` file sets caching and basic security headers for Cloudflare Pages.

1. Create an empty GitHub repository (suggested name `rocket-gym`) and connect it to a Cloudflare Pages project.
2. First push, with your repository address filled in:
   `cd "C:\Users\44752\Documents\Claude\Projects\Rocket Gym\site"; git remote add origin https://github.com/<account>/rocket-gym.git; git push -u origin main`
3. Every later update:
   `cd "C:\Users\44752\Documents\Claude\Projects\Rocket Gym\site"; git add -A; git commit -m "<what changed>"; git push`

Decisions taken 17 Nov 2026 on Ben's say-so ("you make the decisions"): concept labels stay off the page; the WhatsApp/email form is the launch form.

Never Vercel.
