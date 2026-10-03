# NearbyAid — Project Definition & Principles

**Domain:** `nearbyaid.co.uk`  
**Working Title:** NearbyAid  
**Repository:** `nearby-aid`

---

## 1. What NearbyAid Is

NearbyAid is a simple, ultra-accessible UK utility website designed to help anyone find essential local services quickly and reliably.

When people need emergency care, a pharmacy late at night, an urgent dental appointment, or a local GP, they are often stressed, anxious, in pain, or in unfamiliar surroundings. NearbyAid strips away clutter, government jargon, slow-loading portals, and unnecessary clicks to answer one single question:

> **"Where is the nearest service I need right now, how do I get there, and is it open?"**

---

## 2. Who It Is For

NearbyAid is engineered for all UK residents and visitors, with deliberate design priority given to:

1. **Older Adults:** Large typography, high contrast, uncluttered layouts, intuitive terminology, and zero confusing multi-step forms.
2. **People in Urgent or High-Stress Situations:** Minimal cognitive load. Clear distinction between life-threatening emergencies (999), urgent care (UTC/111), and routine services.
3. **People with Low Digital Literacy or Disabilities:** Clear screen-reader semantics, full keyboard navigation, WCAG 2.2 AA/AAA compliance, large touch targets (min 48x48px).
4. **Mobile Users on Slow Connections:** Fast-loading, lightweight pages that perform flawlessly on low-bandwidth 3G/4G connections across rural and urban UK.

---

## 3. Initial Service Categories

The launch roadmap focuses on 5 core essential services:

1. **Hospital / A&E** — Critical distinction between emergency A&E departments and general hospital buildings.
2. **Pharmacy** — Community chemists for prescription dispensing, minor ailments, and emergency contraception.
3. **GP (General Practice)** — Local doctors' surgeries and primary health centres.
4. **Dentist** — NHS and emergency dental services.
5. **Urgent Treatment Centre (UTC)** — Minor injuries, sprains, urgent cuts, and non-life-threatening urgent conditions.

*Future categories (Phase 15): Police stations, opticians, public defibrillators (AEDs), public mental health crisis points.*

---

## 4. Product Principles

- **Simple beats complicated:** Every feature must earn its place. If a feature adds friction to finding care, it does not belong.
- **Mobile-first:** Over 80% of urgent searches happen on mobile devices on the go. Desktop is an expansion of mobile simplicity.
- **Large readable typography:** Default font sizing must be comfortably legible for deteriorating eyesight without zooming.
- **High contrast:** Strict contrast ratios exceeding WCAG AAA standards where feasible, avoiding subtle greys.
- **Large buttons:** Tap targets must be at least 48x48px with generous spacing to avoid mis-taps under shaking hands or impaired motor skills.
- **Very few steps:** Postcode or geolocation &rarr; select service &rarr; instant list of verified nearby locations with phone and map directions.
- **Clear language:** Plain English (UK spelling). No clinical acronyms without plain explanations (e.g. explain what an Urgent Treatment Centre treats vs A&E).
- **Fast loading:** Zero heavy client bundles. Core searches should render in milliseconds.
- **Accessible:** Semantic HTML, ARIA live regions for search updates, visible focus outlines, and responsive zoom support up to 200%.
- **Trustworthy but never misleading:** Data accuracy is paramount. Users are making health-impacting decisions based on our listings.

---

## 5. Critical Safety & Trust Rules

NearbyAid operates under non-negotiable safety guardrails:

> [!IMPORTANT]
> 1. **NearbyAid is NOT an NHS service.**  
>    NearbyAid is an independent utility website. We must never use the official NHS logo in a way that suggests ownership or endorsement.
> 2. **Never claim NearbyAid is an official NHS website.**  
>    Clear, unambiguous disclaimers must be present across headers and footers.
> 3. **Never provide medical advice or symptom diagnosis.**  
>    NearbyAid is a directory and location utility, never a triage or diagnostic tool.
> 4. **Emergency Escalation Prominence:**  
>    If someone is experiencing life-threatening symptoms (chest pain, stroke symptoms, severe bleeding, loss of consciousness), the interface must prominently display a call to **999**. For non-emergency medical advice, users are directed to **111.nhs.uk** or calling **111**.
> 5. **Never confuse a hospital with an A&E department:**  
>    A hospital building does NOT necessarily have an open Accident & Emergency department. Directing a critically ill patient to a community hospital without an A&E is dangerous. NearbyAid must only flag verified Type 1 / Type 2 Emergency Departments as A&E.
> 6. **A&E verification:**  
>    A&E status must be verified against official authoritative NHS data feeds and clearly labeled.
