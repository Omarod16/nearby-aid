/**
 * NearbyAid Location and Geocoding Types
 */

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface UKPostcodeResult {
  postcode: string;
  normalizedPostcode: string; // e.g. "SW1A 1AA"
  outwardCode: string; // e.g. "SW1A"
  inwardCode: string; // e.g. "1AA"
  latitude: number;
  longitude: number;
  country: string;
  adminDistrict?: string;
  adminWard?: string;
}

export interface SpatialSearchParams {
  latitude: number;
  longitude: number;
  radiusMiles?: number;
  limit?: number;
}
