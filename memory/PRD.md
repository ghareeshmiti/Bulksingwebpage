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
