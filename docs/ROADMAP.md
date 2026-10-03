# NearbyAid — Development Roadmap

This roadmap governs the progressive development of NearbyAid.

> [!IMPORTANT]
> **Roadmap Rules:**
> - Build progressively in phases.
> - Do not skip phases.
> - Do not implement future phases early unless strictly required to create a clean foundation.
> - Always complete and verify each phase before advancing.

---

## Overview of Phases

| Phase | Title | Summary / Boundary | Status |
|---|---|---|---|
| **Setup** | Project & Environment Preparation | Environment check, Git & GitHub setup, docs, architecture contracts, build verification | **Completed** |
| **Phase 1** | UI/UX Foundation | Accessible design system, high-contrast theme, responsive layout, search inputs, emergency banner | **Completed** |
| **Phase 2** | Postcode & Location System | UK postcode validation, normalisation, postcodes.io integration, browser geolocation with fallbacks | Pending |
| **Phase 3** | Database & Service Search Engine | Cloudflare D1 schema, local migrations, spatial/distance queries, search indexing | Pending |
| **Phase 4** | NHS / Service Data Integration | Authoritative data ingestion pipeline, data normalization, category mapping | Pending |
| **Phase 5** | Verified A&E Data | Strict verification rules for Emergency Departments vs general hospital sites | Pending |
| **Phase 6** | Maps | Mapbox integration, custom markers, accessible map toggle, list-first fallback | Pending |
| **Phase 7** | Service Cards, Calls & Directions | Actionable service cards, one-tap phone calls, Google Maps / Apple Maps deep links | Pending |
| **Phase 8** | Opening Hours / Open Now | Parsing operating hours, real-time "Open Now / Closes at" indicators, bank holiday awareness | Pending |
| **Phase 9** | Accessibility & Usability Refinement | Full WCAG 2.2 AA/AAA audit, screen reader testing, keyboard navigation, focus management | Pending |
| **Phase 10** | Data Quality & Reporting | Community feedback mechanism ("Report incorrect details"), staleness detection, data health checks | Pending |
| **Phase 11** | SEO | Structured data (Schema.org MedicalOrganization / LocalBusiness), metadata, sitemaps, semantic URLs | Pending |
| **Phase 12** | Performance | Sub-second load times, Cloudflare edge caching, image optimization, zero-layout-shift | Pending |
| **Phase 13** | Privacy & Security | Zero tracking of individual health queries, cookie-less geolocation handling, CSP headers, rate limiting | Pending |
| **Phase 14** | Monetization | Sustainable, ethical funding model (e.g. non-intrusive sponsor listings, affiliate transport/deliveries) without compromising trust | Pending |
| **Phase 15** | Additional Services | Expanding categories: Police stations, emergency dental clinics, public defibrillators (AEDs) | Pending |
| **Phase 16** | Testing | Comprehensive unit, integration, and E2E testing (Playwright/Vitest), cross-browser verification | Pending |
| **Phase 17** | Production Launch | Domain configuration (`nearbyaid.co.uk`), Cloudflare deployment, monitoring, health checks | Pending |

---

## Phase Breakdown

### Phase 1 — UI/UX Foundation
- Establish design tokens (Tailwind CSS configuration) focused on accessibility:
  - Minimum text size 18px body, 24px+ headings.
  - 4.5:1 minimum contrast for body text, 7:1 preferred (WCAG AAA).
  - Prominent emergency alert component ("In an emergency call 999").
  - 5 core service category selectors with large touch targets (Hospital/A&E, Pharmacy, GP, Dentist, UTC).
  - Clear UK disclaimer: "NearbyAid is an independent directory and is not affiliated with the NHS."

### Phase 2 — Postcode and Location System
- UK postcode parsing, regex validation, formatting (e.g. `SW1A 1AA`).
- Integration with postcodes.io (free, open ONS dataset API).
- Browser Geolocation API integration with permission prompt, graceful fallback to postcode input.
- Clear error handling for invalid or unrecognized UK postcodes.

### Phase 3 — Database and Service Search Engine
- Cloudflare D1 database setup (SQLite at the edge).
- Schema definition for services, categories, locations (latitude, longitude), contact numbers, and addresses.
- Geodetic distance calculations (Haversine formula) for radius sorting.
- Edge query optimization.

### Phase 4 — NHS / Service Data Integration
- Integration of authoritative data feeds (NHS Digital ODS, NHS Service Finder).
- Ingestion scripts / scheduled tasks to keep data fresh.
- Normalization into NearbyAid canonical schema.

### Phase 5 — Verified A&E Data
- Distinct segregation between:
  - **Type 1 A&E:** Consultant-led 24/7 emergency service with resuscitation facilities.
  - **Type 2 A&E:** Single-specialty emergency service (e.g. ophthalmology).
  - **Urgent Treatment Centre (UTC) / Minor Injuries Unit (MIU):** Non-emergency urgent care.
  - **General Hospitals without emergency care:** Never display emergency badges for facilities without active A&E.
- Visual verification badges and explicit warnings.

### Phase 6 — Maps
- Mapbox integration with custom high-contrast pins.
- Mobile toggle between "List View" (default) and "Map View".
- Accessible map alternative for screen-reader and keyboard-only users.

### Phase 7 — Service Cards, Calls and Directions
- Accessible card layout with service name, category badge, distance in miles, address.
- `tel:` links formatted for mobile one-tap dialling.
- "Get Directions" buttons linking directly to Google Maps, Apple Maps, and Waze.

### Phase 8 — Opening Hours / Open Now
- Standardized opening hours schema.
- Real-time evaluation of current UK time (including BST/GMT transitions and UK bank holidays).
- Clear status badges: "Open Now", "Closes at [time]", "Closed — opens tomorrow at [time]".

### Phase 9 — Accessibility and Usability Refinement
- Screen reader testing with NVDA/VoiceOver.
- Keyboard navigation testing (Tab, Enter, Escape, Arrow keys).
- Visible focus rings with high contrast.
- Reduced motion support (`prefers-reduced-motion`).

### Phase 10 — Data Quality and Reporting
- User report link: "Is something wrong with this listing?".
- Automated staleness alerts for services whose source data has changed or lapsed.

### Phase 11 — SEO
- Static metadata and dynamic OpenGraph cards.
- Structured schema (`Schema.org/MedicalBusiness`, `LocalBusiness`, `EmergencyService`).
- Postcode and city landing pages for organic discoverability.

### Phase 12 — Performance
- Target 100/100 Lighthouse performance score.
- Edge caching via Cloudflare CDN.
- Minimized JavaScript bundle footprint.

### Phase 13 — Privacy and Security
- No logging or storage of personal medical searches.
- HTTPS-only with HSTS and strict Content Security Policy.
- Rate limiting to protect postcodes and data endpoints from abuse.

### Phase 14 — Monetization
- Ethical, non-interfering revenue streams (e.g. ethical sponsored transit links, voluntary grants/donations).
- Zero selling of health query data.

### Phase 15 — Additional Services
- Expand to Police stations, opticians, public AEDs (defibrillators), and mental health hubs.
- Scotland, Wales, and Northern Ireland regional adaptation.

### Phase 16 — Testing
- End-to-end tests for search flows, postcode lookups, and error cases.
- Automated CI pipeline on GitHub Actions.

### Phase 17 — Production Launch
- Production deployment on Cloudflare.
- Domain `nearbyaid.co.uk` DNS configuration, SSL, and monitoring setup.
