"# Sweat & Save — PRD

## Project Overview
**App Name:** Sweat & Save  
**Type:** Marketing/Content Website  
**URL:** https://sweat-save.preview.emergentagent.com  
**Last Updated:** Feb 2026

## Problem Statement
Create a modern, responsive website called \"Sweat & Save\" focused on personal finance, fitness, and health. Features: Hero section with tagline \"Build Strength. Build Wealth.\", newsletter CTA, content sections for Fitness/Finance/Wellness, a Blog combining finance and fitness articles, and a Contact page with newsletter signup, social media links, and contact form.

## Target Audience
Health-conscious individuals aged 20-40 interested in improving both fitness and personal finances simultaneously.

## Architecture
- **Frontend:** React (CRA + CRACO), React Router v7, Tailwind CSS, framer-motion animations
- **Backend:** FastAPI (Python), MongoDB (Motor async driver)
- **Design:** Neo-brutalist style, Outfit (headings) + Manrope (body) fonts
- **Color Palette:** Orange (#f97316) = Fitness, Emerald (#10b981) = Finance, Blue (#2563eb) = Wellness

## Pages Implemented
| Page | Route | Status |
|------|--------|--------|
| Home | / | ✅ |
| Fitness | /fitness | ✅ |
| Finance | /finance | ✅ |
| Wellness | /wellness | ✅ |
| Blog | /blog | ✅ |
| Contact | /contact | ✅ |

## Backend API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/ | Health check |
| POST | /api/newsletter | Subscribe to newsletter |
| GET | /api/newsletter/subscribers | List all subscribers |
| POST | /api/contact | Submit contact form |
| GET | /api/contact/submissions | List all submissions |

## Features Implemented
- Hero section with runner background image, animated stats, dual CTA buttons
- Orange ticker marquee strip with motivational phrases
- 3 featured section cards (Fitness/Finance/Wellness) with hover animations
- Latest blog preview (3 posts)
- Homepage newsletter CTA section
- Fitness page: 4 workout routine cards, 3 community challenges, 3 motivational quotes
- Finance page: 6 money tips cards, 6-step investing roadmap, 50/30/20 budget visual
- Wellness page: 6 science-backed tips, 3 healthy recipes with macros, 4 mental health tips
- Blog page: Featured article, 5 additional cards, category filter tabs, article modal
- Contact page: Newsletter signup, 4 social media links, full contact form
- Neo-brutalist card design: hover lift + hard shadow
- Sticky navbar with scroll detection, underline hover animations
- Mobile-responsive hamburger menu
- framer-motion staggered scroll reveals on all sections
- MongoDB persistence for newsletter subscribers and contact form submissions

## Content (Mock Data)
- 6 blog articles in `/frontend/src/data/blogData.js`
- 4 workout routines
- 6 finance tips
- 6 wellness tips
- 3 healthy recipes with macro breakdowns

## Test Results (Feb 2026)
- Backend: 100% (8/8 tests passed)
- Frontend: 100% (all 6 pages, navigation, forms verified)

## Prioritized Backlog

### P0 (Critical - done)
- [x] All 6 pages implemented
- [x] Newsletter API + Contact API
- [x] Responsive mobile design
- [x] Blog article modal

### P1 (Next sprint)
- [ ] Admin dashboard to view subscribers and messages
- [ ] Blog search functionality
- [ ] Pagination for blog articles
- [ ] RSS feed

### P2 (Future)
- [ ] Email integration (SendGrid/Resend) for newsletter delivery
- [ ] User accounts / saved articles
- [ ] Dark mode toggle
- [ ] Article commenting system
- [ ] Progress tracker for fitness challenges

## Next Tasks
1. Add email delivery integration (SendGrid/Resend) to actually send newsletters
2. Build admin panel to manage newsletter subscribers and contact submissions
3. Add more blog articles and content
4. Implement blog search and pagination
"

Summary: Summary: ## Sweat & Save Website MVP Complete

Built a full 6-page marketing website: Home, Fitness, Finance, Wellness, Blog, Contact — all responsive, with neo-brutalist design (orange/emerald/blue palette, Outfit + Manrope fonts, hard-shadow hover cards)
Backend: FastAPI + MongoDB with POST /api/newsletter (email collection) and POST /api/contact (contact form) — both tested and working
Key features: animated hero with runner background + ticker strip, framer-motion scroll reveals, blog article modal with filter tabs, 50/30/20 budget visual, recipe macro cards, fitness challenge cards, and social media links
Test Results: Backend 100% (8/8) · Frontend 100% — all pages, nav, forms, and modals verified ✅

Next Action Items:

P1: Add email delivery (e.g., Resend/SendGrid) to actually send newsletters to subscribers
P1: Build a simple admin panel to view contact submissions and subscriber list
P2: Add more blog articles + search/pagination
Potential improvement: Would you like to add an email delivery integration (like Resend) so newsletter subscribers get a real welcome email and weekly digest? That would turn this into a fully functional community-building tool!