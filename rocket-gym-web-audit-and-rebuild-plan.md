# Rocket Gym (formerly The Way Gym) — Web Audit and Rebuild Plan

Living document. Last updated 13 November 2026.
Merges two independent audits (Claude 13 Nov, Codex 11 Nov, each written without seeing the other), then adds follow-up research, Ben's decisions, and an analysis of the downloaded Instagram and Facebook assets.

**Status key:** **Confirmed** = stated by the gym itself (website or its own Instagram captions) or decided by Ben. **[verify]** = from third-party listings, conflicting, or inferred; the gym must confirm before it is published.

Pages were read as text, not viewed, and no speed test has been run.

---

## 1. BLUF

Replace the Wix page with a fast, mobile-first site built around one action: **"Start your free 7-day trial"**, beside **"See the timetable"** on the first screen. Fix the name split (Rocket vs The Way Gym), show a real text timetable, confirmed prices, reviews, coaches and a map, and host it on Cloudflare Pages from GitHub.

The gym's real advantage: a family-run, welcoming gym with serious fighters and coaches, no contracts and low prices. Local rivals mostly present as hard-edged fight clubs. The site should feel like a proper local club, not a fight-night brand.

**Biggest gap found:** the photo library. Almost no photos show the gym floor or a beginner's experience (section 6). A Rocket logo already exists (orange rocket in a circle, bold white "ROCKET GYM" wordmark) but only inside the timetable graphic and the wall banner, so a clean logo file must be requested from the gym. Plan the photo shoot early.

---

## 2. What is confirmed about the business

**Confirmed (gym's own website and Instagram captions)**
- Family-run martial arts and fitness gym in North Bristol since 2010, at Washingpool Farm, Easter Compton, Bristol BS35 5RE, "5 minutes from M5 J16".
- Free 7-day trial, **no contract, no hidden costs**. A taster session with a coach (1-2-1 or small group) is also offered.
- Prices (monthly, direct debit via GoCardless): kids 1 class a week £22; adults 1 class a week £27.50; adults all classes £49.50; gym-only (limited) £35 by enquiry.
- "An abundance of easy, free parking."
- It is a **private gym, not a commercial one**: the gym floor is kept for personal training clients, so "members only" and the £35 tier need careful, plain wording.
- Classes: boxing, kickboxing, MMA, submission grappling, padwork and fitness, kids kickboxing (from age 6) and kids MMA (from age 8), plus personal training and 1-2-1 coaching. Adult classes are for ages 14 and over.
- **Current timetable** (Rocket Gym graphic posted 5 Nov 2026; no Saturday or Sunday classes):

| Day | Kids | Adults (14+) |
|---|---|---|
| Mon | none | 18:30 to 20:00 Boxing |
| Tue | 17:30 to 18:30 MMA, age 8+ | 18:30 to 19:30 Padwork and Fitness |
| Wed | 17:30 to 18:30 Kickboxing, age 10+ | 18:30 to 20:00 MMA |
| Thu | 17:30 to 18:30 Kickboxing, age 6 to 10 | 18:30 to 20:00 Boxing and Kickboxing |
| Fri | none | 09:00 to 10:30 Submission Grappling; 18:00 to 19:00 MMA |

  Bio line on Instagram: "No Growth in Comfort". Instagram has 921 followers.
- A strong, active fight team, though "the majority of our members train just for fun".
- The Fudoshinkan Aikido Club uses the space on Tuesday evenings and is a separate club.
- Closed over Christmas each year, because the landlord uses the building as a function room.
- Hours (Ben's decision): 6am to 9pm, seven days, presented as member access hours.
- Phone 07961 608259, email info@thewaygym.co.uk (still the old brand).

**People (use only with each person's consent; Ben has agreed in principle)**
- Gary Patterson, head coach (kickboxing, boxing; BJJ blue belt; ringside judge for UKMMAF, ISKA and WCA per his public bio). **[verify]**
- Joe Patterson: personal trainer, MMA and kickboxing coach, active fighter.
- Amanda Patterson: personal trainer, fitness classes.
- Other coaches and PTs tagged in 2023 to 2024 posts (BJJ, boxing, PT). Five personal trainers were listed in December 2024, so "six" on the website may be out of date. **[verify]**

**Proof points (from captions)**
- Toby Leigh won a novice boxing title (September 2026).
- Joe Patterson MMA win (2024) and WCA Area Boxing title (2019).
- Fighters regularly compete on local shows.
- Google rating about 5.0 (22 reviews on Studiomaps, 23 on Facebook at 96% recommended). Review totals vary by source, so show the live Google figure.
- Club T-shirts sell at £15.

**Things that look discontinued**
- Yoga, BoxFit and cardio kickboxing appear only in 2019 to 2021 posts. Leave them off the site unless the gym says otherwise. The pads class that replaced them is now the Tuesday "pad session".

**Local competitors:** Trojan Free Fighters (St Jude's), Impact Gym, StandStrong Academy (Brislington), Gracie Barra Bristol, Artemis BJJ, Roger Gracie Bristol. Most lead with fighting intensity and publish timetables as readable pages with free trials. One guide lists Rocket "from £45 a month", so Rocket's real prices are a selling point.

---

## 3. Where the two audits agree

1. The brand name is split between Rocket and The Way Gym across title, URL, email, listings and social handle.
2. The timetable and prices are buried and hard to use on a phone.
3. There is no real trial or enquiry route; the only sign-up buttons go straight to payment.
4. Newcomers, parents, martial artists, gym-only members and PT clients have no separate paths.
5. Proof is under-used: no named coaches, no testimonials, no Google rating shown.
6. The positioning to own is "welcoming, family-run, all levels, since 2010".
7. Build mobile-first, accessible and fast, with the timetable as real text.
8. Redirect the old Wix address, then update Google, Facebook and Instagram.

## 4. Where they differed, and how it was resolved

| Point | Outcome |
|---|---|
| **Timetable content** | Codex extracted a 2026 timetable from the official page; Claude's fetch found only an image. The current Rocket Gym timetable graphic on Instagram (5 Nov 2026) settles it: there is no Wednesday clash any more, and it is an image, so the website must publish it as real text (table in section 2). The Wix timetable and third-party listings are older and should be ignored. **Gym to confirm it is still current.** |
| **Phone number** | Found on directories and Instagram-era listings; not on the official site. Ben confirmed 07961 608259 as the number to show. |
| **Prices** | Settled: £22 / £27.50 / £49.50 / £35. Directory figures of £28 / £50 are rounding. An earlier "£22 unlimited" reading was a mistake. |
| **Hours** | Settled: 6am to 9pm, seven days (member access). |
| **Reviews** | Counts differ by source (22, 23, 5). Use the live Google figure. |
| **Trial terms** | Settled: free, no commitment (a directory claiming membership must be signed first is wrong). |
| **Visual tone** | Compatible: dark charcoal base with one vivid accent, warm off-white sections, no stock images. |
| **Image and consent risk** | Adopted from Codex in full; reinforced by the asset review. |
| **Class ownership** | Aikido is an independent club; timetable labels Rocket-run and independent classes separately. |
| **Tech** | Static site on Cloudflare Pages with a simple editable data file for timetable and prices. |

---

## 5. Problems with the current site

1. No trial or enquiry button or form; paid sign-up links go straight to GoCardless.
2. Timetable is on a separate page, apparently an image, and not on the homepage; it is out of step with the current Rocket Gym timetable posted on Instagram.
3. Brand naming is inconsistent; the copy says "Formally known as" (should be "formerly"). As late as July 2026 Instagram captions still say "The Way Gym" while the handle is rocketgymbristol and the Facebook page is thewaygym.bristol.
4. A Wix advert banner runs across the top and the domain redirects to a wixsite.com address.
5. No phone number, no visible map, unclear "members or by appointment only" wording.
6. No reviews, coach names, class descriptions or PT prices.
7. No first-visit content: what to wear, parking, arrival time, whether a waiver is needed.
8. Long text blocks and small, uncaptioned photo thumbnails.
9. No contract or cancellation summary, even though "no contract" is one of the gym's best selling points.
10. Key audiences have no dedicated path.

---

## 6. Brand and asset findings (Instagram and Facebook downloads)

Full detail and contact sheets are in the `Asset Review` folder (see its README).

**Collections**
- Instagram: 762 images, 122 videos, 511 captioned posts (January 2019 to November 2026).
- Facebook: 1,600 images, no captions. 504 matched Instagram images (Instagram copy kept); 1,064 unique remain after also removing repeats within Facebook.

**Logos and brand**
- **A Rocket logo exists**: an orange rocket inside a white ring, beside a bold white "ROCKET" with a smaller orange "GYM", on black. It appears on the 5 Nov 2026 timetable graphic and on a banner on the gym wall (visible in the 4 Nov 2026 group photo). It is not in the downloads as a standalone file, so a clean copy (ideally vector or transparent PNG) must come from the gym.
- The standalone logo files in the downloads are all **The Way Gym**: an orange and black bold italic wordmark, a square orange version and a wide banner. They are the old brand.
- The old banner carries badges of other organisations (World Combat Association, Pedro Bessa BJJ, a Bristol combat kickboxing crest). Reuse needs permission.
- Palette follows the Rocket brand: black, orange and white.
- Decision (Ben, 13 Nov 2026): use the Rocket logo. The Way Gym appears only as "formerly" in text. (An earlier answer to use The Way Gym logo was made before the Rocket logo was found.)

**Photos and video**
- Instagram: mainly fight nights, team photos and flyers; recent images are high quality (1080 to 1440 px).
- Facebook: mainly 2016 to 2019 events, kids' classes and social nights; medium resolution, undated.
- Very few images show the gym floor, equipment or a beginner's first session. This does not support the "friendly, all levels" message.
- Many photos show children, fight-night guests and members; some carry photographer watermarks. Consent and licence checks are a hard gate.
- Fight posters and flyers are dated and not suitable as site imagery.

**Recommendation:** commission a short photo and video shoot (gym floor, coaches teaching, a beginner's class, kids with parental consent, the building and parking) and use the archive only for the "results and fight team" section.

---

## 7. Positioning and visual direction

**Positioning:** "A proper local gym. Good coaching. A place for everyone to get stronger." Family-run since 2010, with real fighters and coaches behind it, no contracts, and a free week to try.

**Name:** Rocket as the primary name; "formerly The Way Gym" as a short note and FAQ for local recognition and search.

**Look and feel**
- Dark charcoal base with one vivid accent (orange is the gym's existing colour; confirm whether Rocket keeps it), balanced by warm off-white sections.
- One strong display typeface for headings (not Inter or system fonts), tabular figures for prices and times, large tap targets.
- Real photos only. No stock models, no flames or neon, nothing that suggests it is only for experienced fighters.
- Children's photos only with explicit parent or guardian permission.
- Captions that name the activity and level.
- Create a project `DESIGN.md` with these tokens before any build work.

---

## 8. Sitemap and page plan

1. **Home**
2. **Classes**: overview, then Boxing and Kickboxing (including pads sessions), MMA, Jiu Jitsu / No-Gi, and Kids. Each says who it is for, what to expect, age, level and duration.
3. **Timetable**: weekly schedule as real text; list view on phones, week view on larger screens; age band, level, duration, invite-only flags, Rocket-run versus independent club (Aikido), seasonal closures, and a "last checked" date.
4. **The Gym and Personal Training**: the private gym, who it is for, the trainers (consenting individuals only), specialisms, enquiry route and prices if agreed.
5. **Memberships and Trial**: how the free week works, confirmed prices, "no contract", payment route, FAQs.
6. **About Rocket**: family story since 2010, coaching approach, credentials, fighters' results.
7. **Contact and Find Us**: address, map, directions ("5 minutes from M5 J16"), free parking, hours, phone, WhatsApp, email, social links, first-visit guide.

### Homepage, top to bottom

1. Header with Rocket wordmark, compact navigation and a "Start your free 7-day trial" button.
2. Hero: a real action or coach photo. Headline along the lines of "Train your way. Feel at home at Rocket." Supporting line names martial arts, personal training and Easter Compton, North Bristol. Two buttons: trial and timetable.
3. Three entry cards: Martial Arts, Gym and Personal Training, Kids.
4. "New here?" strip: all levels welcome, no contract, free parking, how the trial works.
5. Next classes preview with a day filter and a link to the full timetable.
6. People and proof: coach faces, credentials, specific member quotes, live Google rating.
7. Gallery and fight-team results.
8. Price snapshot using confirmed prices.
9. Location panel with map and parking note.
10. Final trial call to action, contact options and footer.

---

## 9. Features and technical approach

### Priority features

**Must have**
1. Trial enquiry form with five fields or fewer, emailing the gym and sending the visitor an automatic confirmation. It must not claim live booking unless a booking system really exists.
2. Timetable on the homepage and its own page, as text.
3. Phone (07961 608259), WhatsApp and email visible on mobile on every page.
4. Live Google rating plus real review quotes, with permission.
5. Clear hours, and a plain explanation of the private gym and access.
6. Confirmed prices, trial terms and "no contract".

**Should have**
7. First-visit guide: what to wear and bring, parking, arrival time, waiver if there is one.
8. Named coach profiles and credentials.
9. Seasonal closure notice (Christmas) driven from the same data file as the timetable.
10. Local business structured data, page titles and descriptions, a Google Maps route.

**Could have**
11. Online booking or a members' area, only if the gym's existing systems support it.
12. Privacy-friendly analytics for trial submissions, calls, timetable visits and direction clicks.

### Build

- Static site (Astro or plain HTML/CSS), hosted on Cloudflare Pages from a GitHub repository. A push deploys the site.
- Timetable, prices and announcements live in one simple shared sheet or data file the gym can edit; the page shows a "last checked" date.
- Trial form handled by a Cloudflare Pages Function or form service, with spam protection (Turnstile) and clear success and error messages.
- Responsive modern-format images with alt text.
- Permanent redirects from thewaygym.co.uk and the Wix address; every key page has a title and description.
- Targets: loads in under 2 seconds on 4G, Lighthouse 90+ on mobile, WCAG AA contrast, full keyboard access.

---

## 10. Phases

| Phase | Timing | What happens |
|---|---|---|
| 0 | Now | Fix the Google Business listing (name, hours, phone, website link). Free and independent of the new site. |
| 1 | Week 1 | Close the open questions (section 11). Decide the logo. Book the photo shoot. Collect consents and review quotes. Choose usable archive photos from the contact sheets. |
| 2 | Weeks 2 to 3 | Write `DESIGN.md` and copy for each audience (beginners, parents, martial artists, PT prospects). Build mobile-first, trial form first. |
| 3 | Week 4 | Gym checks every fact and link. Test the key journeys on real phones: trial enquiry, timetable, price, directions. Speed and accessibility checks. Redirects and go live. |
| 4 | After launch | Update Facebook, Instagram, Google and the email address with the new site and name. Ask members for Google reviews. Track trial enquiries and adjust. |

## 11. Decisions and open questions

**Decided (Ben, 13 Nov 2026)**
- Name: Rocket Gym, "formerly The Way Gym" as a note and FAQ.
- Trial: free, no commitment (also confirmed by the gym's Instagram).
- Hours: 6am to 9pm, seven days.
- People: Patterson family and the trainers may be named and shown with credentials, subject to each person's consent.
- Prices: £22 / £27.50 / £49.50 / £35.
- Timetable: kept in a simple shared sheet or file the gym edits.
- Contact: trial form plus WhatsApp and phone 07961 608259.
- Domain and Wix account: owned by the gym owners; access can be arranged.

**Also decided (13 Nov 2026, second round)**
- Palette: keep orange, add charcoal and off-white.
- Team shown at launch: Gary, Joe and Amanda Patterson only; others added once they consent.
- Photos: use the best archive photos for now, a shoot later. Adults who are team members or coaches only; no children or fight-night guests until consent exists.
- Timetable: taken from the latest Instagram graphic (section 2), for the gym to check.
- First-visit guide: leave out any waiver or arrive-early rule until confirmed.
- Contact: keep info@thewaygym.co.uk; WhatsApp on 07961 608259.

**Still open**
1. Get a clean Rocket logo file (vector or transparent PNG) from the gym. The logo itself is decided.
2. Confirm the 5 Nov timetable is current, and when the Aikido club meets (not on the Rocket timetable).
3. Whether a health waiver or arrive-early rule applies, and accessibility details.
4. Photo permissions for each chosen photo, and which photographers' images may be reused.
5. Rocket-branded email address, when the domain moves.

## 12. Risks

- **Content delay.** Photos, logo, coach details and a verified timetable are the usual blockers.
- **Half-done rebrand.** Change the name on Google, Facebook, Instagram, the domain and the email together, or search presence splits further.
- **Stale timetable.** Keep it in one editable file and show a "last checked" date.
- **Unverified claims.** Nothing marked **[verify]** goes live until the gym confirms it.
- **Child imagery and consent.** Treat as a hard gate.
- **Third-party badges and photographer work.** Check permission before reuse.
- **Review totals.** Pull the live Google figure; do not hard-code it.

## 13. Limits of this research

- Pages were read as text; neither audit saw the rendered design or measured speed.
- Third-party listings (Rollbook, CombatClub, Studiomaps, directories) disagree on prices, hours and review counts and may be stale.
- Of the 38 contact sheets, only three were viewed; the asset picture above is a sample, not a full review. An earlier version of this plan wrongly said no Rocket logo existed; it was found later on the timetable graphic.
- Individual Instagram posts were searched by keyword, not read end to end.

## Sources

- Official site: https://info43348.wixsite.com/thewaygym, /timetable, /contact
- Instagram account rocketgymbristol (downloaded captions and metadata, 2019 to 2026)
- https://www.rollbook.app/gyms/england/bristol/the-way-gym/
- https://combatclub.io/clubs/united-kingdom/south-gloucestershire/bristol/the-way-gym
- https://studiomaps.app/studio/the-way-gym
- https://www.rogergraciebristol.com/the-ultimate-guide-to-mixed-martial-arts-mma-clubs-in-bristol/
- Competitors: https://www.trojanfreefightersbristol.com/, https://www.impactgymbristol.com/, https://standstrongacademy.co.uk/services/kids-martial-arts-bristol/
- Industry guides cited by the Codex audit (Zarla, Gymdesk, My Personal Trainer Website, Wodify, YAG, The Hangline): design patterns only, not their numerical claims.
