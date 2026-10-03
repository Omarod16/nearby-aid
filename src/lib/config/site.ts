/**
 * NearbyAid Core Site Configuration & Constants
 */

import { ServiceCategory } from '@/types/service';

export interface CategoryDefinition {
  id: ServiceCategory;
  title: string;
  shortLabel: string;
  description: string;
  emergencyWarning?: string;
  ariaLabel: string;
}

export const SITE_CONFIG = {
  name: 'NearbyAid',
  domain: 'nearbyaid.co.uk',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://nearbyaid.co.uk',
  tagline: 'Find essential UK services near you — fast, simple, and clear.',
  disclaimers: {
    notNhs: 'NearbyAid is an independent service directory and is not an official NHS service or affiliated with the NHS.',
    noMedicalAdvice: 'NearbyAid does not provide medical advice or symptom triage. In a medical emergency, always call 999.',
    emergencyNumber: '999',
    nonEmergencyHealth: '111',
    nonEmergencyPolice: '101',
    aeClarification: 'A hospital does not always have an A&E department. Only facilities with verified Type 1 or Type 2 emergency departments are marked as A&E.',
  },
} as const;

export const INITIAL_SERVICE_CATEGORIES: CategoryDefinition[] = [
  {
    id: 'hospital_ae',
    title: 'Hospital / A&E',
    shortLabel: 'A&E / Hospital',
    description: 'Accident & Emergency departments for life-threatening conditions, plus acute hospital sites.',
    emergencyWarning: 'For life-threatening emergencies (such as chest pain, severe bleeding, or stroke symptoms), call 999 immediately.',
    ariaLabel: 'Find nearby Hospital or A&E emergency departments',
  },
  {
    id: 'pharmacy',
    title: 'Pharmacy',
    shortLabel: 'Pharmacy',
    description: 'Local chemists for prescriptions, over-the-counter medicines, and minor ailment advice.',
    ariaLabel: 'Find nearby local pharmacies and chemists',
  },
  {
    id: 'gp',
    title: 'GP (Doctor)',
    shortLabel: 'GP Surgery',
    description: 'General Practice doctors surgeries for routine and urgent appointments.',
    ariaLabel: 'Find nearby GP surgeries and primary care centres',
  },
  {
    id: 'dentist',
    title: 'Dentist',
    shortLabel: 'Dentist',
    description: 'NHS and urgent dental surgeries for toothache, dental pain, and emergency access.',
    ariaLabel: 'Find nearby dental surgeries',
  },
  {
    id: 'urgent_treatment_centre',
    title: 'Urgent Treatment Centre (UTC)',
    shortLabel: 'Urgent Treatment',
    description: 'For urgent but non-life-threatening injuries and illnesses (sprains, minor burns, cuts).',
    ariaLabel: 'Find nearby Urgent Treatment Centres and minor injuries units',
  },
];
