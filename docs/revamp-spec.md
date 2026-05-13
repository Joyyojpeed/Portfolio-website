# Portfolio Revamp Specification

## Goal
Revamp the existing multi-page React portfolio to match the style and interaction language of `reference.html` while preserving existing portfolio content and route structure.

## Scope
- Routes remain unchanged:
  - `/`
  - `/resume`
  - `/projects`
  - `/contact`
- Existing factual content is preserved:
  - personal name/details
  - education/experience entries
  - skills and categories
  - project list and external links
  - contact details and form endpoint
- Revamp focuses on:
  - visual design system
  - page composition
  - motion and transition behavior
  - route-to-route transition styling

## Design System
### Typography
- Display: `Syne`
- Sans: `DM Sans`
- Mono: `Space Mono`

### Theme Tokens
- Introduce shared light/dark variables for:
  - background layers
  - surface/background cards
  - borders
  - accent blue palette
  - text hierarchy
  - grid overlay color

### Global Effects
- Fixed subtle grid background across app.
- Fixed translucent header with blur.
- Updated scrollbars to match theme tokens.

## Architecture Changes
### App Shell
- `src/App.jsx`
  - Centralized dark/light theme state.
  - Keeps `theme` persistence in `localStorage`.
  - Triggers route transition overlay on pathname changes.
  - Hides page content until transition completes.

### Route Transition Overlay
- `src/assets/TransitionOverlay.jsx`
  - Replaced previous GSAP panel logic with deterministic CSS-keyframed panel wipe.
  - Uses theme-aware gradient panel colors.
  - Includes transition spark/ripple accent from origin coordinates.

### Header
- `src/assets/Header.jsx`
  - Reference-style nav with mono uppercase links.
  - Active-link underline behavior.
  - Theme bulb toggle.
  - Mobile menu with route links + theme toggle + Hire button.
  - Theme ripple animation on toggle.

### Footer
- `src/assets/Footer.jsx`
  - Simplified reference-style footer with preserved links and ownership text.

## Page Specifications
### Home (`src/pages/Home.jsx`)
- Reference hero composition:
  - left: intro, typewriter name, description, CTA buttons, social links
  - right: circular profile with rotating ring, tech pills, availability badge
- Preserved original content:
  - description line
  - CV download behavior
  - social URLs
  - experience counters
- Added marquee row using only existing skill names from resume data.

### Resume (`src/pages/Resume.jsx`)
- Converted to reference-like stacked sections:
  - section header
  - “Why Hire Me?” card
  - education + experience timeline columns
  - skills section with category tabs
  - about details grid
- Preserved all original entries and values.

### Projects (`src/pages/Projects.jsx`)
- Converted from slider to reference-style vertical list cards.
- Preserved project count and content (2 projects only).
- Preserved live and GitHub URLs.
- Added desktop hover preview image card.

### Contact (`src/pages/Contact.jsx`)
- Reference-style two-column layout:
  - left: heading + contact cards
  - right: form card
- Preserved formspree endpoint and submission logic.
- Preserved status messages and contact values.

## Files Updated
- `src/index.css`
- `src/App.jsx`
- `src/assets/Header.jsx`
- `src/assets/Footer.jsx`
- `src/assets/TransitionOverlay.jsx`
- `src/pages/Home.jsx`
- `src/pages/Resume.jsx`
- `src/pages/Projects.jsx`
- `src/pages/Contact.jsx`
- `docs/revamp-spec.md`

## Acceptance Criteria
- Multi-page routing remains operational.
- Reference-inspired visual language is consistently applied across all pages.
- No new portfolio facts/content are introduced.
- Route transitions run reliably between pages.
- Build succeeds with `npm run build`.

## Validation Checklist
1. Verify route navigation on desktop and mobile.
2. Verify theme persistence after refresh.
3. Verify transition overlay appears on every route change.
4. Verify home counters animate once and marquee scrolls.
5. Verify skills category switching on resume.
6. Verify project hover preview appears on desktop pointer devices only.
7. Verify contact form submission success/error handling.
8. Verify responsive behavior at common breakpoints (mobile/tablet/desktop).
