# SignuluOne BulkSigner — Marketing Landing Page

## Original Problem Statement
Design a complete HTML marketing webpage for SignuluOne BulkSigner — a Windows desktop application for signing individual PDFs or entire folders of PDFs using an mToken USB DSC (Class 3 Digital Signature Certificate) — without missing any content, using latest design trends, pictorial/presentational formats and digital-marketing strategies.

## User Personas
- Compliance/finance teams at Indian businesses holding Class 3 DSCs who sign agreements, certificates and reports in volume
- IT/procurement evaluators comparing licence bands for multiple desktops
- Business owners requesting a demo before purchase

## Architecture
- Frontend-only React SPA (user explicitly chose "front-end mock, no backend" for the demo form)
- React 19 + Tailwind + framer-motion + lenis (smooth scrolling) + sonner (toasts) + lucide-react icons
- Component-per-section structure under `/app/frontend/src/components/`
- Backend left as stock FastAPI template (no endpoints needed)

## Implemented (11 Aug 2026)
- Kinetic hero with masked line-by-line H1 reveal, parallax product UI mockup (file statuses, certificate card, signature stamp, floating "private key" card)
- Editorial slow marquee ribbon
- Numbered chapter (01–12) section markers with outlined stroke numerals
- Features bento grid (6 core benefits)
- Interactive product-interface tabs: Select Documents (add/remove files), Configure Signature, Sign and Export
- How It Works — 4 numbered steps
- Interactive Signature Studio: live signature stamp on PDF canvas controlled by page select, horizontal/vertical sliders, width/height inputs, apply button with toast
- Signing Process table (5 files, statuses Signed/Signing/Ready/Token Required/Failed) + status info cards + token/certificate alert cards
- Security section: 4 pillars + 4 compliance commitments (PAdES, key stays on token, etc.)
- Use Cases — 6 team scenarios
- Pricing: 4 tiers (Basic ₹2,200 / Pro ₹1,800 Most Popular / Business ₹1,500 / Enterprise ₹1,000) + live licence cost estimator with recommended plan and annual subtotal
- Download section with installer details panel
- Demo request form (MOCKED front-end only, success state + toast), contact cards (sales@signuluone.com, +91 90000 00000)
- FAQ accordion (7 questions)
- Footer with final CTA and link columns
- Grain texture overlay, emerald glow bleeds, glassmorphism, Cabinet Grotesk / Outfit / JetBrains Mono typography

## Iteration 2 (11 Aug 2026) — SEO + section-wise navigation
- Converted single-scroll page to section-wise navigation: 12 sections (overview, features, product, how-it-works, signature, process, security, use-cases, pricing, download, demo, faq), one visible at a time with animated transitions, hash-based URLs, per-section document titles, active-state navbar with Security added, full mobile menu listing all 12 sections, mobile bottom pager (prev/next)
- SEO meta boost: description, keywords, robots, canonical, Open Graph + Twitter card tags, SoftwareApplication JSON-LD with INR offers, and a real 1200×630 og-image.png captured from the hero
- Removed lenis smooth-scroll (no longer a long-scroll page)

## Iteration 3 (11 Aug 2026) — Light theme + animated app tour
- Added switchable light "amber" theme (cream background, amber accents — modeled on user's reference) alongside the default dark emerald theme; Sun/Moon toggle in navbar (desktop + mobile), persisted in localStorage, implemented via a .theme-light CSS override layer (no component rewrites)
- Added AppTour inside the Product Interface section: auto-playing animated recreation of the real DSC BulkSigner app screens (Drag to Sign with animated signature chip, Signature Placed with Class 3 Organization stamp, Dashboard with stats/activity/token info), crossfading every ~5.6s with clickable step pills and progress bars; screens recreated in DOM (user's exact screenshots not used, per request)

## Iteration 4 (11 Aug 2026) — Testimonials + hero headline change
- Hero H1 changed to "Sign Multiple PDFs with Your USB DSC"
- New Testimonials section (chapter 09, between Use Cases and Pricing; later chapters renumbered): "Word from Our Clients" with 3 dummy testimonial cards (AP High Court, HMWSB, Heritage Foods personas) and a 10-tile happy-clients logo strip of dummy AP/Telangana customers (AP High Court, HMWSB, Heritage Foods, APTRANSCO, TSRTC, Singareni Collieries, APEPDCL, TSSPDCL, APIIC, Kamineni Hospitals) with monogram badges; "Clients" added to navbar

## Iteration 5 (11 Aug 2026) — Animated signing flow in How It Works
- Added SigningFlow ("Watch One PDF Travel Through BulkSigner") below the step cards: auto-playing 4-phase pictorial animation (Inbox PDF drop → signature chip positions on page → mToken USB dongle slides in, LED pulses, "Signing…" progress bar, stamp lands → signed PDF moves to Output with check badge), cycling every ~3.2s with clickable phase pills and live captions; fully DOM-drawn (no real images/screens used) and theme-aware

## Backlog
- P0: none blocking
- P1: Wire demo form to backend (DB + email notification), real installer download link
- P2: Blog/SEO content pages, testimonials, logo strip, multi-language support

## Verification
- Hero, features, table, pricing, footer visually verified via screenshots
- Signature studio slider interaction verified (stamp moves live)
- Estimator verified (25 licences → Business, ₹1,500, ₹37,500)
- Demo form submit → success panel + toast verified
- FAQ accordion toggle verified
