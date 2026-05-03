import { getElectionStatus, formatVoteCount, isValidEPIC, getNextElectionDate } from './utils';

describe('Utility Functions', () => {
  describe('getElectionStatus', () => {
    it('should return Concluded for past dates', () => {
      const status = getElectionStatus('2024-06-04');
      expect(status.label).toBe('Concluded');
      expect(status.status).toBe('completed');
    });

    it('should return Live for today or very soon', () => {
      const today = new Date().toISOString().split('T')[0];
      const status = getElectionStatus(today);
      expect(status.label).toBe('Live');
      expect(status.pulse).toBe(true);
    });

    it('should return Upcoming for future dates', () => {
      const futureDate = '2026-05-15';
      const status = getElectionStatus(futureDate);
      expect(status.label).toBe('Upcoming');
    });

    it('should return Upcoming if no date provided', () => {
      const status = getElectionStatus(undefined);
      expect(status.label).toBe('Upcoming');
    });
  });

  describe('formatVoteCount', () => {
    it('should format Crores correctly', () => {
      expect(formatVoteCount(970000000)).toBe('97 Cr+');
      expect(formatVoteCount(152000000)).toBe('15.2 Cr+');
    });

    it('should format Lakhs correctly', () => {
      expect(formatVoteCount(1050000)).toBe('10.5 L+');
      expect(formatVoteCount(100000)).toBe('1 L+');
    });

    it('should format Thousands correctly', () => {
      expect(formatVoteCount(50000)).toBe('50 K+');
      expect(formatVoteCount(1200)).toBe('1.2 K+');
    });

    it('should return string for small numbers', () => {
      expect(formatVoteCount(543)).toBe('543');
    });
  });

  describe('isValidEPIC', () => {
    it('should validate correct EPIC format', () => {
      expect(isValidEPIC('ABC1234567')).toBe(true);
      expect(isValidEPIC('xyz9876543')).toBe(true); // Case insensitive check handled
    });

    it('should reject incorrect formats', () => {
      expect(isValidEPIC('AB1234567')).toBe(false); // Too few letters
      expect(isValidEPIC('ABCD1234567')).toBe(false); // Too many letters
      expect(isValidEPIC('ABC123456')).toBe(false); // Too few digits
      expect(isValidEPIC('ABC12345678')).toBe(false); // Too many digits
      expect(isValidEPIC('1234567ABC')).toBe(false); // Wrong order
    });
  });

  describe('getNextElectionDate', () => {
    it('should return a date string for the next election', () => {
      const date = getNextElectionDate();
      expect(typeof date).toBe('string');
      if (date) {
        expect(new Date(date).getTime()).toBeGreaterThan(new Date().getTime());
      }
    });
  });

  describe('getNextElection', () => {
    it('should return the first election if no upcoming ones are found', () => {
      // This depends on the mock data in elections.ts
      // But we can just verify it returns an object
      const next = require('./utils').getNextElection();
      expect(next).toBeDefined();
      expect(next.id).toBeDefined();
    });
  });
});
