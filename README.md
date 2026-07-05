# Memoria

A UI concept for **Memoria** — a "memory economy" platform where people license,
share, and experience verified human memories. This repo is the front-end only:
a single React component tree with realistic mock data, no backend.

---

## The idea

Some kinds of knowledge aren't in books — they're in the moment someone lived
through: a first solo flight, a night shift that went sideways, a negotiation
that almost failed. Memoria imagines a product where those moments can be
**captured, verified, licensed, and experienced** by someone else, on terms the
original person sets.

Three ideas the design keeps coming back to:

1. **Consent is the product.** Every memory has an owner who controls who can
   access it, for what purpose, and for how long — not an afterthought bolted
   on to a marketplace.
2. **Memories connect to each other.** The recurring visual motif is a "memory
   network" — a node-link graph where categories and communities are linked by
   shared themes, not a literal brain/circuit AI cliché.
3. **It should feel like a trusted product, not a sci-fi concept.** Premium,
   calm, navy/blue/indigo/purple — closer to Linear or Stripe than a futuristic
   dashboard.

## What's built

| Screen | What it does |
|---|---|
| **Home** | Hero with a mocked "memory player" preview (waveform, scrubber, timestamped highlight), the memory network visual, featured/recommended memories, trending categories |
| **Marketplace** | Browse all memories; filter by category, emotion, skill, duration, language, verified-only |
| **Memory detail** | Description, learning outcomes, emotional profile, timeline, creator info, reviews, related memories; save or "experience" |
| **My Memories** | Creator-side view: revenue, learner counts, license/privacy status per uploaded memory |
| **Library** | Memories you've saved for later |
| **Community** | Browse and join topic communities (e.g. "Frontline Nurses," "Solo Travelers Guild"); each community has its own post feed (with likes and threaded comments), a member list, and memories its members have shared |
| **Privacy & Permissions** | Access tiers (public / licensed-only / private), anonymizing other people in a memory, purpose limits, expiring licenses, and a full activity log |
| **Analytics** | Revenue, learners, and usage charts (bar/line via Recharts) |
| **Settings** | Profile fields and notification toggles |

All of it is interactive — joining a community, liking a post, saving a memory,
toggling a privacy setting, filtering the marketplace — but **nothing persists**.
It's client-side state only; a refresh resets everything.

## How it's implemented

**Single file, one component tree.** `App.jsx` is intentionally one file
(~1,750 lines) containing all data, all screens, and all styling. There's no
router: `App` holds an `active` string in state (`"home"`, `"marketplace"`,
`"community"`, etc.) and renders the matching screen component with a
switch statement. A couple of screens (memory detail, an open community) are
layered on top as "overlay" states (`detailId`, `communityId`) that take
priority over whatever `active` is, so opening a memory from inside a
community and going back returns you to that community, not to a nav tab.

**State lives at the top and flows down.** `App` owns everything that needs to
survive navigating away and back — saved memories, which communities you've
joined, each community's posts — and passes handlers down as props
(`toggleSave`, `onToggleJoin`, `addCommunityPost`, etc.). Screens like
`MarketplaceScreen` or `CommunityDetailScreen` keep their own local UI state
(open filters, which tab is active, draft text in a composer) since that
doesn't need to outlive the screen.

**Data is a handful of plain arrays/objects near the top of the file:**
`MEMORIES`, `COMMUNITIES`, `COMMUNITY_MEMBERS`, `COMMUNITY_POSTS`,
`MY_UPLOADS`, `MONTHLY_ACTIVITY`, `GEO`, etc. Community membership and
category both key off the same `CATEGORIES` list, which is also what drives
the network diagram — so the "memories connect through categories" idea is
structural, not just visual.

**The "memory network" visual (`MemoryNetwork` component)** is hand-built with
SVG `<line>` and `<circle>` elements plotted from a small `NETWORK_NODES` /
`NETWORK_EDGES` array — not a charting library. It's reused in three places
(Home, the Community browse page, inside a community's side panel) with a
`onNodeClick` callback so clicking a node can route into that category's
memories or community.

**Styling is one global `<style>` block** injected at the bottom of `App`,
using plain CSS with custom properties for the palette (`--navy`, `--blue`,
`--indigo`, `--purple`, `--cyan`, etc.) — no Tailwind, no CSS-in-JS library,
no CSS modules. Class names are prefixed `mm-` throughout. Responsive behavior
is handled with three breakpoints (1100px, 760px, 560px); below 760px the
sidebar is hidden by CSS and replaced by a hamburger button that opens
`MobileNavOverlay`, a fixed-position drawer driven by React state (not just a
CSS media query), so it works regardless of how the browser reports viewport
width.

**Icons** come from `lucide-react`; **charts** (the bar/line charts on the
Analytics screen) from `Recharts`. Everything else — cards, badges, toggles,
progress bars, the waveform on the hero — is custom-built with divs and CSS,
not a component library.

## Design system

- **Palette:** navy `#0F172A`, blue `#2563EB`, indigo `#4F46E5`, purple
  `#7C3AED`, cyan `#06B6D4`, plus a light lavender tint (`#EEF2FF`) for subtle
  backgrounds
- **Type:** Manrope for headings, Inter for body/UI — pulled in via a Google
  Fonts `@import` at the top of the style block
- **Motif:** the memory network (see above), plus a simple two-overlapping-circle
  "ripple" mark used as the logo in the sidebar and mobile nav

## Running locally

```bash
npm install
npm run dev
```

Then open the printed local URL. Requires `react`, `react-dom`, `lucide-react`,
and `recharts` as dependencies (see `package.json`).

## Known limitations

- No backend — all data is in-memory and resets on refresh
- No real authentication; the "you" throughout the app is a hardcoded user
  ("Sam Rivera")
- No automated tests
- Some stats (revenue figures, learner counts, market data used elsewhere in
  presentations of this project) are illustrative, not real
