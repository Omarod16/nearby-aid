import test from 'node:test';
import assert from 'node:assert/strict';

import {
  isValidUKPostcodeFormat,
  formatUKPostcode,
  queryMockServices,
} from '../src/lib/services/mockServiceCoordinator.ts';
import { MOCK_SERVICES } from '../src/data/mockServices.ts';

test('UK Postcode format validation', () => {
  assert.equal(isValidUKPostcodeFormat('SW1A 1AA'), true);
  assert.equal(isValidUKPostcodeFormat('sw1a1aa'), true);
  assert.equal(isValidUKPostcodeFormat('SE1 7EH'), true);
  assert.equal(isValidUKPostcodeFormat('M1 1AE'), true);
  assert.equal(isValidUKPostcodeFormat('B1 1BB'), true);
  assert.equal(isValidUKPostcodeFormat('W1D 3HZ'), true);

  // Invalid formats
  assert.equal(isValidUKPostcodeFormat(''), false);
  assert.equal(isValidUKPostcodeFormat('12345'), false);
  assert.equal(isValidUKPostcodeFormat('ABCDEFG'), false);
  assert.equal(isValidUKPostcodeFormat('LONDON'), false);
});

test('UK Postcode formatting', () => {
  assert.equal(formatUKPostcode('sw1a1aa'), 'SW1A 1AA');
  assert.equal(formatUKPostcode('se17eh'), 'SE1 7EH');
  assert.equal(formatUKPostcode('SW1A 1AA'), 'SW1A 1AA');
});

test('Safety: Phone numbers must never use real emergency numbers and must use Ofcom drama ranges', () => {
  for (const service of MOCK_SERVICES) {
    if (service.telephone) {
      assert.notEqual(service.telephone, '999', 'Service phone must never be 999');
      assert.notEqual(service.telephone, '111', 'Service phone must never be 111');
      assert.notEqual(service.telephone, '911', 'Service phone must never be 911');
      assert.match(
        service.telephone,
        /^020 7946/,
        `Service ${service.name} phone must use Ofcom drama number prefix 020 7946`
      );
    }
  }
});

test('Safety: Hospital A&E verification strictly separates A&E from general hospital sites', () => {
  const stThomas = MOCK_SERVICES.find((s) => s.id === 'mock-hosp-001');
  assert.ok(stThomas, 'St Thomas exists');
  assert.equal(stThomas.emergencyVerification, 'verified_major_ae');

  const guysHospital = MOCK_SERVICES.find((s) => s.id === 'mock-hosp-002');
  assert.ok(guysHospital, 'Guys hospital exists');
  assert.equal(guysHospital.emergencyVerification, 'hospital_no_emergency');
});

test('Geographic coordinates are within valid UK bounding box', () => {
  for (const service of MOCK_SERVICES) {
    assert.ok(
      service.latitude >= 49 && service.latitude <= 61,
      `Latitude ${service.latitude} must be within UK bounds (49 - 61)`
    );
    assert.ok(
      service.longitude >= -8 && service.longitude <= 2,
      `Longitude ${service.longitude} must be within UK bounds (-8 - 2)`
    );
  }
});

test('Mock Service Coordinator query results and category filtering', async () => {
  const allResult = await queryMockServices({ category: 'all' });
  assert.ok(allResult.totalCount >= 10, 'Expected at least 10 services total');

  const pharmacyResult = await queryMockServices({ category: 'pharmacy' });
  assert.ok(pharmacyResult.totalCount >= 2, 'Expected at least 2 pharmacies');
  for (const s of pharmacyResult.services) {
    assert.equal(s.category, 'pharmacy');
  }

  const gpResult = await queryMockServices({ category: 'gp' });
  assert.ok(gpResult.totalCount >= 2, 'Expected at least 2 GPs');
  for (const s of gpResult.services) {
    assert.equal(s.category, 'gp');
  }

  const dentistResult = await queryMockServices({ category: 'dentist' });
  assert.ok(dentistResult.totalCount >= 2, 'Expected at least 2 dentists');
  for (const s of dentistResult.services) {
    assert.equal(s.category, 'dentist');
  }

  const utcResult = await queryMockServices({ category: 'urgent_treatment_centre' });
  assert.ok(utcResult.totalCount >= 2, 'Expected at least 2 UTCs');
  for (const s of utcResult.services) {
    assert.equal(s.category, 'urgent_treatment_centre');
  }
});

test('Mock Service Coordinator handles empty and error states', async () => {
  const noResult = await queryMockServices({ postcode: 'NO_RESULTS' });
  assert.equal(noResult.totalCount, 0);

  await assert.rejects(
    async () => {
      await queryMockServices({ postcode: 'TRIGGER_ERROR' });
    },
    { message: /Simulated upstream network error/ }
  );
});
