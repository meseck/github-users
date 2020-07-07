import { usernameValidation, calculateNumberOfPages } from '../../global/utils';

describe('Utils', () => {
  describe('usernameValidation', () => {
    it('should check that the username is not longer than 39 characters', () => {
      expect(usernameValidation('a'.repeat(40))).not.toBe('valid');
    });

    it('should check that the username does not begin or end with a hyphen', () => {
      expect(usernameValidation('-invalid-username-')).not.toBe('valid');
    });

    it('should check that the username only consist of letters, numbers and simple hyphens', () => {
      expect(usernameValidation('!@#$%')).not.toBe('valid');
    });

    it('should check that the username has no consecutive hyphens', () => {
      expect(usernameValidation('invalid--username')).not.toBe('valid');
    });

    it('should return "valid" if everthing is fine', () => {
      expect(usernameValidation('valid-username')).toBe('valid');
    });
  });

  describe('calculateNumberOfPages', () => {
    it('should return the correct number of pages', () => {
      expect(calculateNumberOfPages(10, 100)).toBe(1);
      expect(calculateNumberOfPages(1000, 100)).toBe(10);
      expect(calculateNumberOfPages(91, 10)).toBe(10);
      expect(calculateNumberOfPages(90, 10)).toBe(9);
    });
  });
});
