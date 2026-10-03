# NearbyAid

**Domain:** [nearbyaid.co.uk](https://nearbyaid.co.uk)  
**Status:** Setup & Architecture Preparation Complete (Phase 1 Pending)

---

## 1. About NearbyAid

NearbyAid is a simple UK utility website that helps people find essential local services quickly, reliably, and without confusion.

When people require urgent medical attention, a late-night chemist, an emergency dental clinic, or their nearest GP, they are often in high-stress situations or unfamiliar areas. NearbyAid strips away governmental red tape, complex navigation, and slow loading portals to deliver fast, clear, and verified service locations.

### Initial Service Categories:
1. **Hospital / A&E** (strictly verified emergency departments vs general hospital facilities)
2. **Pharmacy** (dispensing chemists, late-night & 100-hour pharmacies)
3. **GP** (General Practice surgeries and primary care clinics)
4. **Dentist** (NHS and emergency dental access)
5. **Urgent Treatment Centre (UTC)** (minor injuries, sprains, and non-life-threatening urgent conditions)

---

## 2. Product Principles

- **Simple beats complicated:** Strip away all friction and unnecessary cognitive load.
- **Mobile-first:** Optimized for fast, one-handed mobile use on the move.
- **Large readable typography:** Highly legible typography suited for older users and deteriorating eyesight.
- **High contrast:** WCAG 2.2 AA / AAA high-contrast standards across all screens.
- **Large buttons:** Minimum 48x48px tap targets with ample spacing to prevent accidental touches.
- **Very few steps:** Postcode or current location &rarr; select service &rarr; instant verified results.
- **Clear language:** Plain English (UK) avoiding medical or administrative jargon.
- **Fast loading:** Lightweight bundle sizes running smoothly on low-bandwidth UK mobile networks.
- **Accessible:** Full keyboard navigability, semantic ARIA roles, and screen-reader support.
- **Trustworthy but never misleading:** Utmost accuracy in listings, contact numbers, and emergency status.

---

## 3. Important Safety & Trust Disclaimers

> [!IMPORTANT]
> - **NearbyAid is NOT an NHS service.**
> - **Never claim that NearbyAid is an official NHS website.**
> - **Never provide medical advice or symptom diagnosis.**
> - **Never confuse a hospital with an A&E department.** (Directing a critically injured patient to a hospital without an emergency department can be fatal.)
> - **A&E must be verified from reliable, authoritative data.**
> - **In an emergency, always instruct users to call 999.** For non-emergency NHS triage, direct to **111.nhs.uk** or call **111**.

---

## 4. Technical Architecture

- **Frontend:** Next.js (App Router), TypeScript (strict), Tailwind CSS
- **Hosting & Infrastructure:** Cloudflare (Pages / Workers)
- **Database (MVP):** Cloudflare D1 (SQLite at the edge)
- **Geocoding & Postcodes:** [postcodes.io](https://postcodes.io) (free, open ONS dataset)
- **Maps:** Mapbox (deferred to Phase 6)
- **Data Ingestion:** NHS Digital ODS & NHS BSA authoritative datasets (deferred to Phase 4 & 5)
- **Source Control:** GitHub (`nearby-aid`)

### Architecture Principle: Adapter / Data-Provider Pattern
The application core does not hard-code external vendor APIs. Instead, it interacts with canonical domain models through provider adapters:
- `NHSAdapter`
- `PharmacyAdapter`
- `GPAdapter`
- `DentistAdapter`
- `PoliceAdapter` (future expansion)
- `OtherServiceAdapter` (future expansion)

---

## 5. Development Roadmap (17 Phases)

We build progressively in strict phases without skipping:

1. **Phase 1 — UI/UX foundation**
2. **Phase 2 — Postcode and location system**
3. **Phase 3 — Database and service search engine**
4. **Phase 4 — NHS / service data integration**
5. **Phase 5 — Verified A&E data**
6. **Phase 6 — Maps**
7. **Phase 7 — Service cards, calls and directions**
8. **Phase 8 — Opening hours / Open Now**
9. **Phase 9 — Accessibility and usability refinement**
10. **Phase 10 — Data quality and reporting**
11. **Phase 11 — SEO**
12. **Phase 12 — Performance**
13. **Phase 13 — Privacy / security**
14. **Phase 14 — Monetization**
15. **Phase 15 — Additional services**
16. **Phase 16 — Testing**
17. **Phase 17 — Production launch**

For the detailed phase plan, see [ROADMAP.md](docs/ROADMAP.md).

---

## 6. Project Documentation Index

- [Project Definition & Core Principles](docs/PROJECT.md)
- [17-Phase Development Roadmap](docs/ROADMAP.md)
- [Technical Architecture & Adapter Design](docs/ARCHITECTURE.md)
- [Authoritative Data Sources & A&E Verification](docs/DATA-SOURCES.md)

---

## 7. Local Development

### Prerequisites
- Node.js v20+ (v22 installed)
- npm v10+

### Setup Commands
```bash
# Clone the repository
git clone https://github.com/<your-username>/nearby-aid.git
cd nearby-aid

# Install dependencies
npm install

# Start local development server
npm run dev

# Run type check and production build
npm run build

# Run linter
npm run lint
```
The development server will run at [http://localhost:3000](http://localhost:3000).
