# NearbyAid — Authoritative Data Sources & Verification

NearbyAid relies strictly on authoritative, open, and verified UK data sources. This document details each data source, verification criteria, and licensing requirements.

---

## 1. Postcode & Geolocation Data

### **postcodes.io**
- **Purpose:** Postcode validation, normalisation, and latitude/longitude resolution.
- **Source:** Office for National Statistics (ONS) Postcode Directory (ONSPD) and Ordnance Survey Open Names.
- **License:** Open Government Licence (OGL v3.0) and Ordnance Survey OpenData.
- **Protocol:** Public REST API (`https://api.postcodes.io/postcodes/{postcode}`).
- **Key Features:**
  - Free with no mandatory API key.
  - Auto-normalises irregular spacing (e.g. `sw1a1aa` &rarr; `SW1A 1AA`).
  - Provides outward code (`SW1A`) and inward code (`1AA`).
  - Returns WGS84 coordinates (`latitude`, `longitude`), administrative district, and ward.

---

## 2. NHS & Healthcare Data Feeds

### **NHS England Organisation Data Service (ODS)**
- **Purpose:** Canonical registry of NHS healthcare organisations in England and Wales.
- **Data Categories:**
  - Acute NHS Trusts and Hospital sites
  - General Practices (GP surgeries) and branch surgeries
  - Urgent Treatment Centres (UTC) and Minor Injury Units (MIU)
  - NHS dental practices
- **Identifiers:** Unique ODS codes (e.g. Trust codes like `RRV`, Site codes like `RRV01`, GP practice codes like `F84001`).
- **Update Frequency:** Published weekly/monthly by NHS England Digital.

### **NHS Business Services Authority (NHS BSA)**
- **Purpose:** Community Pharmacy and Dental contractor dataset.
- **Data Categories:**
  - Dispensing community pharmacies
  - 100-hour pharmacies and late-night dispensaries
  - NHS dental contract holders

### **NHS.UK / NHS Digital API (Syndication / Service Finder)**
- **Purpose:** Public-facing contact details, operational services, and opening times.
- **Endpoints:** NHS Digital Syndication feeds and FHIR APIs.

---

## 3. Critical Safety: Emergency & A&E Verification Methodology

> [!CAUTION]
> **Safety Imperative: Never confuse a general hospital with an A&E department.**
> Thousands of hospital buildings in the UK are rehabilitation clinics, elective surgery centers, or community care units with **no emergency department**. Sending an emergency patient to a facility without an A&E risks death or severe harm.

### NHS Department Typology & Classification
NearbyAid strictly follows official NHS emergency designations:

| Category | NHS Classification | Facilities & Capabilities | NearbyAid Badge / Handling |
|---|---|---|---|
| **Major A&E** | **Type 1 A&E** | Consultant-led 24/7 service with full resuscitation facilities and acute in-patient beds | **Verified Emergency (A&E)** |
| **Specialist Emergency** | **Type 2 A&E** | Consultant-led single specialty (e.g. eye emergency hospital, dental emergency hospital) | **Specialist Emergency** (explicitly noting specialty) |
| **Urgent Treatment Centre** | **Type 3 / UTC / MIU** | Nurse or GP-led care for minor cuts, sprains, fractures, and urgent non-life-threatening illnesses | **Urgent Treatment Centre (Not A&E)** |
| **General Hospital** | **Acute / Community Hospital** | Outpatient clinics, scheduled surgeries, wards, convalescence | **Hospital Only (No Emergency / A&E)** |

### Verification Protocol
1. Data records imported from NHS sources must include the specific `EmergencyDepartmentType` or ODS role designation.
2. If a hospital site lacks an explicitly verified `Type 1` or `Type 2` classification, it **must not** display an A&E badge.
3. Every A&E card must include the explicit warning: *"For life-threatening emergencies, call 999 immediately."*

---

## 4. Devolved UK Administrations (Expansion)

While the initial MVP targets England and Wales datasets, architecture must accommodate:
- **Scotland:** NHS Scotland / SHOW (Scottish Health on the Web) & Public Health Scotland Open Data.
- **Northern Ireland:** HSC (Health and Social Care) Northern Ireland Open Data.

---

## 5. Other Public Services (Phase 15)

### **Police Stations**
- **Source:** `data.police.uk` (UK Police Open Data API).
- **Attributes:** Station name, public counter opening hours, wheelchair accessibility, emergency vs non-emergency (101) guidance.

### **Public Access Defibrillators (AEDs)**
- **Source:** The Circuit (National Defibrillator Network / British Heart Foundation / NHS) where public partnership agreements allow.

---

## 6. Licensing & Legal Compliance

- **Open Government Licence (OGL v3.0):** Data used from ODS, ONS, and government APIs must carry standard attribution:  
  *Contains public sector information licensed under the Open Government Licence v3.0.*
- **Crown Copyright & Database Rights:** Acknowledge Ordnance Survey and ONS copyright.
- **Trademark Notice:** "NHS" is a registered trademark of the Department of Health and Social Care. NearbyAid is not an NHS service and does not claim official affiliation.
