# Rocket Gym website

The website source and assets are in [`site/`](site/). This is a static, single-page site; it has no build step.

## Preview locally

From the `site/` folder, run:

```powershell
python -m http.server 8765
```

Then open <http://127.0.0.1:8765>.

## Project notes

- [`DESIGN.md`](DESIGN.md) records the visual rules and design decisions.
- [`HANDOVER.md`](HANDOVER.md) describes launch checks and details the gym needs to confirm.
- [`DESIGN-HANDOVER-2026-11-17.md`](DESIGN-HANDOVER-2026-11-17.md) and [`design-audit-2026-11-17.md`](design-audit-2026-11-17.md) record the latest design work and audit.
- [`rocket-gym-web-audit-and-rebuild-plan.md`](rocket-gym-web-audit-and-rebuild-plan.md) contains the research and rebuild plan.
- [`tools/hero-cutout.py`](tools/hero-cutout.py) is the script used to create the stylised hero animation.

The local `Web Assets/` collection and generated `Asset Review/` files are excluded from Git because they contain a large archive of source social-media media. The finished site assets needed to preview the website are included in `site/assets/`.
