# EDN Renovation Group — Ultra-Premium Cinematic Landing Page

## Original Problem Statement
Build a pixel-perfect, award-winning luxury renovation company landing page for "EDN Renovation Group" that feels like a £10M+ luxury construction brand — calm, immersive, cinematic, conversion-focused. Light Luxury theme (warm white / beige / pure white), bronze accent (#B88A45), serif display (Cormorant Garamond) + Inter body, custom luxury cursor, glassmorphism nav, cinematic loader, parallax hero, scroll-triggered animations throughout.

## User Choices
1. Enquiry form → saved to DB + simple admin view
2. Images → high-quality stock placeholders (user will supply own later)
3. Content → placeholder content from design reference
4. Scope → single-page landing experience

## Architecture
- **Frontend**: React 19 + framer-motion + Tailwind (single-page Landing + /admin route). Custom cursor, scroll progress, cinematic loader.
- **Backend**: FastAPI + MongoDB (Motor). UUID-based docs, ISO timestamps.
- **Design tokens**: tailwind `edn` palette (bronze, warm, beige, ink, muted, divider); fonts serif/sans.

## Implemented (2026-06-17)
- Cinematic 1.5s loading sequence; bronze scroll-progress bar; luxury circular cursor (grows on hover).
- Glassmorphism navigation (transparent → white blur after 80px, spring), logo dark→bronze, bronze CTA, mobile menu.
- Hero: 100vh, infinite slow zoom, parallax + scroll brightness, dust particles, 8s light sweep, staggered reveals, animated trust bar with count-up.
- Sections: Services (6 cards, hover lift/zoom/arrow), Before/After draggable slider, Statistics (count-up), Process (scroll-animated bronze timeline), Showcase (mask reveal), Testimonials (glass cards, star shimmer), Gallery (masonry hover overlays), Contact (glass form, focus underline, magnetic button), Footer.
- Backend: `POST /api/enquiries`, `GET /api/enquiries`; `/admin` lists submissions.
- Tested: 100% backend (pytest) + frontend (Playwright) pass, 0 bugs.

## Backlog (P1/P2)
- P1: Gate `/admin` behind auth/token (currently public, holds PII).
- P1: User to replace stock images with real project photography.
- P2: Add rate-limiting + max-length validation on enquiry POST (spam protection).
- P2: Real Privacy Policy / Terms pages; replace placeholder contact details.
- P2: Email notification to business on new enquiry (Resend/SendGrid).

## Next Tasks
- Await user feedback / real assets, then refine imagery and copy.

## Update (2026-06)
- Replaced 2 duplicate images in Projects gallery (GALLERY in site.js): "Bruntsfield Sash & Glazing" now uses white-framed glazing image (1631048498692-af6262577031); "Grange Villa Renovation" now uses brown brick house exterior (1621983209348-7b5a63f23866). Verified visually — all 8 gallery images now unique.
- PENDING: Contact form email notifications via Resend (needs user API key). Enquiries currently DB-only, viewable at /admin.
- Added cinematic full-screen lightbox to Projects gallery: click any tile or "View All Projects" to open a full-size viewer with prev/next, keyboard nav (Esc/arrows), image counter, and body-scroll lock. z-[9995] to sit above nav.
