/**
 * Service Provider Adapter Contract
 * 
 * Fundamental Architecture Principle:
 * All external data sources implement this interface. This decouples
 * the user interface and search coordination logic from any specific
 * third-party API or database.
 */

import { ServiceCategory, ServiceEntity, EmergencyVerification } from './service';
import { SpatialSearchParams } from './location';

export interface ServiceSearchQuery extends SpatialSearchParams {
  category?: ServiceCategory;
  openOnly?: boolean;
}

export interface ServiceSearchResult {
  services: ServiceEntity[];
  totalCount: number;
  originLat: number;
  originLon: number;
}

export interface ServiceProviderAdapter {
  /** Unique key identifying the provider (e.g. 'nhs_ods', 'nhs_bsa', 'police_uk') */
  readonly id: string;
  
  /** Human-readable provider name */
  readonly name: string;
  
  /** Categories handled by this adapter */
  readonly supportedCategories: readonly ServiceCategory[];
  
  /** Search for services around a geographic point */
  search(query: ServiceSearchQuery): Promise<ServiceSearchResult>;
  
  /** Retrieve a single service by its identifier */
  getById(id: string): Promise<ServiceEntity | null>;
  
  /** Optional emergency verification check */
  verifyEmergencyClassification?(id: string): Promise<EmergencyVerification>;
}
