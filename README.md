# body temple — app MVP

A clickable prototype of a branded daily-practice app for **Adriana Rizzolo** / [Body Temple Church](https://www.bodytemple.church).

Built from the deep-eggplant-and-gold mockup: *Devotional Flow* hero, journeys rail, moon cycle, live gathering tile. It runs in a browser, works on a phone, and is meant to be walked through live on a call.

---

## Seeing it

**On the web (for screen sharing).** Live here, redeployed on every push to `claude/body-temple-app-mvp-fttuk0`:

### → https://nora-la21.github.io/for-Adriana/

> A Pages site is publicly reachable by anyone with the link, even while the repo
> itself is private. Worth knowing before the link goes out.

**Why the root `index.html` is a committed build artifact.** Pages on this repo is
configured as *deploy from a branch*, which serves the repository root through
Jekyll — it does not run a build. So the root has to already **be** the site.
`npm run bundle` regenerates it, inlining the whole app into that one file.

That means **`index.html` at the root is generated — never edit it by hand.** Edit
the source under `app/`, then run `npm run bundle` and commit the result. The Vite
source template lives at `app/index.html` precisely so it cannot collide with the
published root file.

**Without Pages.** [`prototype/body-temple-prototype.html`](prototype/body-temple-prototype.html) is the whole app inlined into one file. Download it and double-click — no server, no build, no internet needed (it falls back to system fonts offline). Useful as a backup during a call.

GitHub's own file view will *not* render it. It shows HTML source, not a running page. Pages or the downloaded file are the two ways to see it live.

**Running it locally.**

```bash
npm install
npm run dev      # http://localhost:5173
```

On a desktop browser the app renders inside a phone frame with presenter notes beside it. On an actual phone it goes full-bleed and behaves like an installed app.

| script | what it does |
| --- | --- |
| `npm run dev` | dev server with hot reload |
| `npm run build` | production build into `dist/` |
| `npm run bundle` | build, then inline everything into the single-file prototype |
| `npm run typecheck` | TypeScript, no emit |

---

## What it does

**Today** — the mockup screen. A hero practice, the journeys rail, and the next live gathering.

**The practice player** — guided cues on a timed spine with a breath ring, pause/resume, and a completion that writes to the practice log.

**Journeys** — Return to Earth (21 days), Moon Cycle Practice, Temple of Shakti, Sacred Sexuality Series, Body Temple Dance, Unleashed NYC. Session-by-session, with progress kept.

**Cycle** — the real moon phase, computed from the date: illumination, days to full, days to new, and the practices that phase asks for.

**Temple** — live gatherings with their next occurrence resolved from the calendar and the lunar cycle, plus RSVP.

**Altar** — streak, devotion count, minutes, a seven-day row, the practice log, and membership.

**Membership** — Seeker (free), Temple of Shakti ($25/mo), Body Temple ($44/mo). Switching tiers changes what unlocks, so the paywall can be walked end to end.

---

## Two decisions worth naming

**The moon drives the content, not a release calendar.** `app/src/lib/moon.ts` computes the phase, and today's practice is selected from it. This is the thing a Calm-style app structurally cannot copy — its content ships on a publishing schedule. Here the app is different in week three than in week one because the sky is.

**The daily practice is always free.** The hook is the habit; the depth is what gets charged for. Free tier also gets the first three sessions of any journey. Everything past that is gated.

---

## What's real and what isn't

**Real** — Body Temple's programme names, the $44/mo and $25/mo price points and their six-month terms, the membership inclusions ("live, recorded, and yours to keep", 50% off online retreats), Adriana's bio, and the outbound links. Taken from Body Temple's public material and gathered in `app/src/data/brand.ts` and `app/src/data/tiers.ts`.

**Placeholder** — every practice cue, session title and duration. They are written in Body Temple's register to show the structure and pacing, **not** transcribed from Adriana's teaching. Her recordings and her curriculum replace them wholesale. Nothing in `app/src/data/practices.ts` or the session lists in `app/src/data/journeys.ts` should be shown as her words.

**Not built** — accounts, payments, real audio/video, push notifications, offline downloads, native shells. See below.

---

## How it's put together

```
app/src/
  data/        brand, practices, journeys, gatherings, tiers   ← all copy lives here
  lib/
    moon.ts    lunar phase engine
    store.ts   practice state (localStorage, shaped like an API response)
  components/  player, nav, moon disc
  screens/     today, journeys, cycle, temple, altar, membership
  styles/      theme.css (tokens) + app.css
```

No backend, no accounts, no analytics, nothing leaves the device — practice state is `localStorage` under one key. "Reset the demo" on the Altar screen clears it.

`app/src/lib/store.ts` is deliberately written as the shape a real API would return, so going live means swapping `load`/`save` for fetches rather than rewriting the screens. Likewise the player runs on a timer that maps onto an `<audio>` element's `currentTime`.

---

## What production would need

- **Accounts and payments** — Stripe on the web, RevenueCat for App Store / Play billing (Apple takes its cut on in-app subscriptions; the existing $44 membership economics should be checked against that before pricing is set).
- **Media** — hosted audio and video, offline downloads, background playback with lock-screen controls. This is the largest single piece of work.
- **Live gatherings** — streaming or a Zoom handoff, plus a recordings archive.
- **Notifications** — a practice reminder, and a full-moon gathering nudge, which is the retention lever the cycle rail is built for.
- **Native shells** — the app is already a PWA and installs to a home screen. App Store presence is a separate step.
- **Accessibility and content warnings** — the Sacred Sexuality and grief material needs opt-in gating and a way out of a practice mid-session.

---

*Prototype built as a concept piece. Not affiliated with or endorsed by Body Temple Church; all Body Temple names and programme details belong to Adriana Rizzolo.*
