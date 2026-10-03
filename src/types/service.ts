/**
 * NearbyAid Canonical Service Types
 * Defines the core domain models independent of upstream providers.
 */

export type ServiceCategory =
  | 'hospital_ae'
  | 'pharmacy'
  | 'gp'
  | 'dentist'
  | 'urgent_treatment_centre'
  | 'police'
  | 'other';

/**
 * Strict verification classification for emergency departments.
 * CRITICAL: Never confuse a general hospital with an active A&E department.
 */
export type EmergencyVerification =
  | 'verified_major_ae' // NHS Type 1: 24/7 consultant-led with resuscitation facilities
  | 'verified_specialist_ae' // NHS Type 2: Consultant-led single specialty (e.g. eye hospital)
  | 'urgent_treatment_centre' // NHS Type 3 / UTC / MIU: Minor injuries/illness, not full A&E
  | 'hospital_no_emergency' // Hospital site with NO emergency department
  | 'unverified'; // Unconfirmed status (must NOT show emergency badge)

export interface OperatingHoursDay {
  open: string; // HH:mm (24-hour format)
  close: string; // HH:mm (24-hour format)
  is24Hours?: boolean;
}

export interface OperatingSchedule {
  monday?: OperatingHoursDay[];
  tuesday?: OperatingHoursDay[];
  wednesday?: OperatingHoursDay[];
  thursday?: OperatingHoursDay[];
  friday?: OperatingHoursDay[];
  saturday?: OperatingHoursDay[];
  sunday?: OperatingHoursDay[];
  bankHolidays?: OperatingHoursDay[];
}

export interface ServiceAddress {
  line1: string;
  line2?: string;
  townOrCity: string;
  postcode: string;
  county?: string;
}

export interface ServiceEntity {
  id: string; // Unique canonical identifier (e.g. ODS code or uuid)
  name: string;
  category: ServiceCategory;
  address: ServiceAddress;
  latitude: number;
  longitude: number;
  telephone?: string;
  website?: string;
  emergencyVerification: EmergencyVerification;
  openingSchedule?: OperatingSchedule;
  distanceMiles?: number; // Calculated dynamically relative to search origin
  dataSource: string; // e.g. 'nhs_ods', 'nhs_bsa', 'police_uk'
  lastVerifiedAt?: string; // ISO 8601 timestamp
}
