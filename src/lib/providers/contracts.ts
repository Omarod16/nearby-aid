/**
 * NearbyAid Provider Adapter Contracts
 *
 * NOTE: These are architectural contract declarations.
 * They will be progressively implemented in their respective roadmap phases:
 * - Phase 3 & 4: NHSAdapter, PharmacyAdapter, GPAdapter, DentistAdapter
 * - Phase 5: A&E Verification logic
 * - Phase 15: PoliceAdapter, OtherServiceAdapter
 *
 * DO NOT IMPLEMENT UPSTREAM APIS YET.
 */

import { ServiceProviderAdapter } from '@/types/provider';

export interface INHSAdapter extends ServiceProviderAdapter {
  readonly id: 'nhs_adapter';
}

export interface IPharmacyAdapter extends ServiceProviderAdapter {
  readonly id: 'pharmacy_adapter';
}

export interface IGPAdapter extends ServiceProviderAdapter {
  readonly id: 'gp_adapter';
}

export interface IDentistAdapter extends ServiceProviderAdapter {
  readonly id: 'dentist_adapter';
}

export interface IPoliceAdapter extends ServiceProviderAdapter {
  readonly id: 'police_adapter';
}

export interface IOtherServiceAdapter extends ServiceProviderAdapter {
  readonly id: 'other_service_adapter';
}
