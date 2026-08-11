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

## Iteration 6 (11 Aug 2026) — Third theme + official logo
- Added third theme "Dark Amber" (dark background with yellow/amber accents mirroring the light theme palette); navbar toggle now cycles Dark Emerald → Light Amber → Dark Amber with per-theme icons (Moon/Sun/Sparkles), persisted in localStorage
- Replaced the "S" monogram with the official SignuluOne logo image (https://www.signuluone.com/img/Signing%20Solutions.png) in navbar and footer

## Iteration 7 (11 Aug 2026) — Marquee polish, FAQ nav + real answers, richer flow animation
- Rebuilt editorial marquee: proper separator spacing, translate3d GPU motion, 60s pace, edge fade masks, hover pause; tightened hero bottom gap
- Added FAQ to desktop navbar; replaced all 7 FAQ answers with user's final copy (Win 10/11 64-bit, driver/middleware, Ready-state on expiry, batch layout, export to source/output folder, per-device licensing); refreshed Download installer panel (OS, Token Support, Documents, Processing)
- Rebuilt SigningFlow as "From Folder to Signed PDF, Automatically": 4 phases — select single PDF or folder (drag one or many), connect dongle to PC USB port, app auto-detects mToken and signs batch with staggered statuses + progress, download signed docs (per-file rows + Download all button)

## Iteration 8 (11 Aug 2026) — Overview pictorial flow strip
- Added OverviewFlow ("Select · Connect · Sign · Download") on the Overview page between hero and marquee: 4 pictorial infographic cards (folder+PDF chips, glowing mToken dongle + USB port, stamped PDF with pen badge, signed download tray) with floating accent chips, connecting arrow nodes and hover lift; static/gentle-motion only — How It Works animation deliberately unchanged per user request

## Iteration 9 (11 Aug 2026) — Animated Features section
- Added count-up stats band above the bento grid (100% local processing, 0 uploads, 2 cert types, 4 steps) with scroll-triggered counters
- Each of the 6 feature cards now has a looping micro-animation: SVG signature self-drawing (Single PDF), files stacking (Bulk), radar pulse rings (Local Processing), stamp hopping between corners (Placement), certificate scan line (Certificate Visibility), status pill cycling Ready→Signing→Signed (Clear Status); stats band later removed per user request

## Iteration 10 (11 Aug 2026) — Sitemap and robots
- Added /public/robots.txt (allow all + sitemap reference) and /public/sitemap.xml (root URL entry; sections are hash-based so they index as one page) — both verified live over HTTP

## Iteration 11 (11 Aug 2026) — Section consolidation + renumbering
- Merged sections per user request: Product Interface (+ AppTour) now lives under Overview; Signature Placement and Signing Process now live under How It Works (no longer separate sections/pages)
- Sections reduced 13 → 10; chapters renumbered sequentially (Overview 01, Features 02, How It Works 03, Security 04, Use Cases 05, Testimonials 06, Pricing 07, Download 08, Demo 09, FAQ 10); ChapterHeader watermark made optional and removed from merged subsections; navbar trimmed back to 9 links

## Iteration 12 (11 Aug 2026) — Mobile horizontal-overflow fix
- Fixed mobile (390px) page overflow (scrollWidth 595 → 390): OverviewFlow section got overflow-hidden (800px glow bled out), AppTour FilesPanel hidden below md, invoice capped at 260px on small screens, and html-level overflow-x hidden added as safeguard

## Iteration 13 (11 Aug 2026) — Fourth theme: Corporate Blue
- Added corporate SignuluOne blue theme (white background, royal blue #2563EB accents, deep navy headings — modeled on signuluone.com reference); theme cycle is now Dark Emerald → Light Amber → Dark Amber → Corporate Blue with per-theme icons (Moon/Sun/Sparkles/Palette); button text forced white on blue for contrast

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
